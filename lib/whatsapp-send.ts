/**
 * Telnyx WhatsApp message sender.
 * Sends a plain text message within the 24-hour conversation window.
 *
 * Required env vars:
 *   TELNYX_API_KEY          — Telnyx API key
 *   WHATSAPP_FROM_NUMBER    — WhatsApp-enabled Telnyx number in E.164 format
 */

const TELNYX_API_BASE = "https://api.telnyx.com/v2";

/**
 * Normalize a phone number to the form WhatsApp/Telnyx expects.
 * Strips the legacy Mexican "1" inserted after country code "52"
 * (e.g. +5215591866408 → +525591866408) since WhatsApp rejects it.
 */
function normalizeWhatsAppNumber(raw: string): string {
  const digits = raw.replace(/^\+/, "");
  if (digits.startsWith("521") && digits.length === 13) {
    return `+52${digits.slice(3)}`;
  }
  return raw.startsWith("+") ? raw : `+${digits}`;
}

export async function sendWhatsAppMessage(to: string, body: string): Promise<void> {
  const apiKey = process.env.TELNYX_API_KEY;
  const rawFrom = process.env.WHATSAPP_FROM_NUMBER;

  if (!apiKey) throw new Error("TELNYX_API_KEY is not set");
  if (!rawFrom) throw new Error("WHATSAPP_FROM_NUMBER is not set");

  const from = normalizeWhatsAppNumber(rawFrom);

  const res = await fetch(`${TELNYX_API_BASE}/messages/whatsapp`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to,
      whatsapp_message: {
        type: "text",
        text: {
          body,
          preview_url: false,
        },
      },
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Telnyx WhatsApp send failed (${res.status}): ${text}`);
  }
}
