/**
 * Telnyx WhatsApp message sender.
 * Sends a plain text message within the 24-hour conversation window.
 *
 * Required env vars:
 *   TELNYX_API_KEY          — Telnyx API key
 *   WHATSAPP_FROM_NUMBER    — WhatsApp-enabled Telnyx number in E.164 format
 */

const TELNYX_API_BASE = "https://api.telnyx.com/v2";

export async function sendWhatsAppMessage(to: string, body: string): Promise<void> {
  const apiKey = process.env.TELNYX_API_KEY;
  const from = process.env.WHATSAPP_FROM_NUMBER;

  if (!apiKey) throw new Error("TELNYX_API_KEY is not set");
  if (!from) throw new Error("WHATSAPP_FROM_NUMBER is not set");

  // Debug: log exactly what we're sending so we can diagnose 10004 errors.
  console.log(
    `[whatsapp-send] from=${JSON.stringify(from)} len=${from.length} to=${JSON.stringify(to)}`
  );

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
