import { NextRequest, NextResponse } from "next/server";
import { getVoiceProvider } from "@/lib/voice-provider";
import {
  startCall,
  updateActiveCall,
  finaliseCall,
  addLead,
} from "@/lib/leads-store";
import type { Lead } from "@/lib/leads-store";
import { extractLeadFromTranscript } from "@/lib/lead-extraction";
import { sendNotification } from "@/lib/notifications";
import { getCompany, getCompanyByAssistantId } from "@/lib/companies";

export async function POST(req: NextRequest) {
  // Read raw body first (needed for signature verification)
  const rawBody = await req.text();
  let body: unknown;
  try {
    body = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // First slug source: ?slug= query param. Per-assistant Call Control
  // webhook URLs are configured with this. The shared Insight Group webhook
  // is NOT — those leads are tagged via assistant_id reverse lookup below.
  const slugFromQuery = req.nextUrl.searchParams.get("slug");

  const provider = getVoiceProvider("telnyx");

  // Verify webhook signature
  const valid = await provider.verifyWebhook(req, rawBody);
  if (!valid) {
    console.warn("[webhook/telnyx] Signature verification failed");
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Log the raw payload so we can inspect unknown formats
  console.log("[webhook/telnyx] Raw payload:", JSON.stringify(body, null, 2));

  let event;
  try {
    event = provider.normalizeEvent(body);
  } catch (err) {
    console.error("[webhook/telnyx] Failed to normalize event:", err);
    return NextResponse.json({ error: "Bad payload" }, { status: 400 });
  }

  const { callControlId, eventType, callerPhone, transcript, recordingUrl, assistantId } =
    event;

  // Resolve the company slug for this call. Order:
  //   1. ?slug= query param (per-assistant Call Control webhook URL)
  //   2. assistant_id reverse-lookup against the COMPANIES registry
  //      (works for the shared Insight Group webhook)
  //   3. null — lead falls through to global dashboard only
  const slug =
    slugFromQuery ?? getCompanyByAssistantId(assistantId)?.slug ?? null;
  if (!slug) {
    console.warn(
      `[webhook/telnyx] Could not resolve company slug ` +
        `(query=${slugFromQuery ?? "null"}, assistant_id=${assistantId ?? "null"}) ` +
        `— lead will be untagged`
    );
  }

  console.log(`[webhook/telnyx] ${eventType} — ${callControlId} — slug=${slug ?? "null"}`);

  switch (eventType) {
    case "call_started": {
      await startCall(callControlId, callerPhone ?? "unknown", slug);
      // Answer the call, play greeting, start recording + transcription
      try {
        await provider.answerCall(callControlId);
      } catch (err) {
        console.error("[webhook/telnyx] answerCall failed:", err);
      }
      break;
    }

    case "transcript": {
      if (transcript) {
        await updateActiveCall(callControlId, { transcript });
      }
      break;
    }

    case "recording_saved": {
      if (recordingUrl) {
        await updateActiveCall(callControlId, { recording_url: recordingUrl });
      }
      break;
    }

    case "call_ended": {
      const company = slug ? getCompany(slug) : null;
      const extracted = extractLeadFromTranscript(transcript ?? "", {
        companyServiceType: company?.serviceType,
        hasUrgency: company?.hasUrgency,
        language: company?.language,
      });

      // Try to finalise an in-progress call first (Call Control flow).
      // finaliseCall reads transcript + recording_url from KV (stored by earlier events).
      let lead = await finaliseCall(callControlId, {
        caller_name: extracted.caller_name,
        service_type: extracted.service_type,
        company_slug: slug,
        urgency: extracted.urgency,
        summary: extracted.summary,
        transcript: transcript || null,
        recording_url: recordingUrl ?? null,
      });

      // AI Assistant flow: no prior call_started, so create the lead directly
      if (!lead) {
        const newLead: Lead = {
          id: crypto.randomUUID(),
          call_control_id: callControlId,
          caller_phone: callerPhone ?? "unknown",
          caller_name: extracted.caller_name,
          service_type: extracted.service_type,
          company_slug: slug,
          urgency: extracted.urgency,
          summary: extracted.summary,
          transcript: transcript || null,
          recording_url: recordingUrl ?? null,
          status: "completed",
          created_at: new Date(),
          completed_at: new Date(),
        };
        await addLead(newLead);
        lead = newLead;
      }

      const notifType = lead.urgency === "urgent" ? "urgent_call" : "new_lead";
      await sendNotification(notifType, lead);
      break;
    }

    default:
      console.log(`[webhook/telnyx] Unhandled event type: ${eventType}`);
  }

  // Telnyx expects a 200 response to acknowledge receipt
  return NextResponse.json({ received: true }, { status: 200 });
}
