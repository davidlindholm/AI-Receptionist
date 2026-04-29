import crypto from "crypto";
import type { VoiceProvider, NormalizedCallEvent, VoiceEventType } from "./types";

const TELNYX_API_BASE = "https://api.telnyx.com/v2";

/** Map Telnyx event_type strings to our normalised enum. */
function mapEventType(raw: string): VoiceEventType {
  switch (raw) {
    case "call.initiated":
      return "call_started";
    case "call.answered":
      return "call_answered";
    case "call.transcription":
      return "transcript";
    case "call.recording.saved":
      return "recording_saved";
    case "call.hangup":
      return "call_ended";
    default:
      return "unknown";
  }
}

async function telnyxCommand(
  callControlId: string,
  action: string,
  payload: Record<string, unknown> = {}
): Promise<void> {
  const apiKey = process.env.TELNYX_API_KEY;
  if (!apiKey) throw new Error("TELNYX_API_KEY is not set");

  const url = `${TELNYX_API_BASE}/calls/${encodeURIComponent(callControlId)}/actions/${action}`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Telnyx ${action} failed (${res.status}): ${text}`);
  }
}

export const telnyxProvider: VoiceProvider = {
  /**
   * Verify Telnyx webhook signature using the public key (Ed25519).
   * https://developers.telnyx.com/docs/v2/call-control/receiving-webhooks
   */
  async verifyWebhook(req: Request, rawBody: string): Promise<boolean> {
    const publicKey = process.env.TELNYX_PUBLIC_KEY;
    if (!publicKey) {
      console.warn("[telnyx] TELNYX_PUBLIC_KEY not set — skipping verification");
      return true;
    }

    const signature = req.headers.get("telnyx-signature-ed25519");
    const timestamp = req.headers.get("telnyx-timestamp");

    if (!signature || !timestamp) {
      console.warn("[telnyx] Missing signature or timestamp headers");
      return false;
    }

    try {
      const message = `${timestamp}|${rawBody}`;
      const msgBuffer = Buffer.from(message, "utf8");
      const sigBuffer = Buffer.from(signature, "base64");

      // Node crypto requires an SPKI-wrapped DER key for Ed25519 — not raw bytes.
      // Ed25519 SPKI DER prefix: SEQUENCE { SEQUENCE { OID 1.3.101.112 } BIT STRING }
      const rawKeyBytes = Buffer.from(publicKey, "base64");
      const spkiPrefix = Buffer.from("302a300506032b6570032100", "hex");
      const derKey = Buffer.concat([spkiPrefix, rawKeyBytes]);

      const keyObject = crypto.createPublicKey({
        key: derKey,
        format: "der",
        type: "spki",
      });

      return crypto.verify(null, msgBuffer, keyObject, sigBuffer);
    } catch (err) {
      console.error("[telnyx] Signature verification error:", err);
      return false;
    }
  },

  normalizeEvent(body: unknown): NormalizedCallEvent {
    const b = body as Record<string, unknown>;

    // ── AI Assistant format ──────────────────────────────────────────────────
    // Top-level: { record_type, event_type, payload: { metadata: { call_control_id }, results } }
    if (b.record_type === "event" && b.event_type === "conversation_insight_result") {
      const payload = b.payload as Record<string, unknown>;
      const metadata = payload?.metadata as Record<string, unknown>;
      const results = payload?.results as Array<{ result: string }>;

      const callControlId = metadata?.call_control_id as string;
      if (!callControlId) throw new Error("Missing call_control_id in AI Assistant payload");

      // Extract caller phone — real calls send +E.164, browser tests send a SIP URI
      const rawFrom = (metadata?.from as string) ?? "";
      const callerPhone = rawFrom.startsWith("+")
        ? rawFrom
        : rawFrom.split("@")[0].replace(/[^0-9+]/g, "") || rawFrom;

      // results[0].result is the AI-generated insight/summary of the conversation
      const insightText = results?.[0]?.result ?? "";

      // Telnyx may include the assistant id in metadata under one of several
      // keys depending on the API version — try them all.
      const assistantId =
        (metadata?.assistant_id as string | undefined) ??
        (metadata?.assistantId as string | undefined) ??
        (payload?.assistant_id as string | undefined) ??
        ((payload?.assistant as Record<string, unknown> | undefined)?.id as
          | string
          | undefined);

      return {
        callControlId,
        eventType: "call_ended",
        callerPhone,
        transcript: insightText,
        assistantId,
        rawPayload: body,
      };
    }

    // ── Call Control format ──────────────────────────────────────────────────
    // Top-level: { data: { event_type, payload: { call_control_id, ... } } }
    const data = b.data as Record<string, unknown>;
    const eventType = data?.event_type as string;
    const payload = data?.payload as Record<string, unknown>;

    const callControlId = payload?.call_control_id as string;
    if (!callControlId) {
      throw new Error("Missing call_control_id in Telnyx payload");
    }

    const normalized: NormalizedCallEvent = {
      callControlId,
      eventType: mapEventType(eventType),
      rawPayload: body,
    };

    // call.initiated / call.answered
    if (payload?.from) {
      normalized.callerPhone = payload.from as string;
    }

    // Some Call Control payloads include the AI assistant id
    const ccAssistantId =
      (payload?.assistant_id as string | undefined) ??
      ((payload?.assistant as Record<string, unknown> | undefined)?.id as
        | string
        | undefined);
    if (ccAssistantId) {
      normalized.assistantId = ccAssistantId;
    }

    // call.transcription
    if (eventType === "call.transcription") {
      const td = payload?.transcription_data as Record<string, unknown>;
      normalized.transcript = (td?.transcription_text as string) ?? undefined;
    }

    // call.recording.saved
    if (eventType === "call.recording.saved") {
      const urls = payload?.recording_urls as Record<string, string>;
      normalized.recordingUrl = urls?.mp3 ?? urls?.wav ?? undefined;
    }

    return normalized;
  },

  async answerCall(callControlId: string): Promise<void> {
    // 1. Answer the call
    await telnyxCommand(callControlId, "answer");

    // 2. Play a greeting using Telnyx TTS
    const businessName =
      process.env.DEMO_BUSINESS_NAME ?? "företaget";
    await telnyxCommand(callControlId, "speak", {
      payload: `Hej! Du har kommit till ${businessName}. Vi är ute på jobb just nu. Berätta gärna vad du behöver hjälp med så återkommer vi till dig.`,
      voice: "female",
      language: "sv-SE",
    });

    // 3. Start recording
    await telnyxCommand(callControlId, "record_start", {
      channels: "single",
      format: "mp3",
      play_beep: false,
    });

    // 4. Enable transcription (Swedish)
    await telnyxCommand(callControlId, "transcription_start", {
      language: "sv-SE",
      interim_results: false,
    });
  },
};
