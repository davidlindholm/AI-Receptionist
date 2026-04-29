import type { Lead } from "@/lib/leads-store";

export type NotificationType = "new_lead" | "urgent_call";

/**
 * Send a notification when a call is completed.
 *
 * MVP: logs to console.
 * TODO: replace with 46elks SMS when production-ready.
 *
 * Example 46elks integration:
 *   await fetch("https://api.46elks.com/a1/sms", {
 *     method: "POST",
 *     headers: { Authorization: `Basic ${btoa(`${user}:${pass}`)}` },
 *     body: new URLSearchParams({ from: "AIReceptionist", to: ownerPhone, message }),
 *   });
 */
export async function sendNotification(
  type: NotificationType,
  lead: Lead
): Promise<void> {
  const prefix = type === "urgent_call" ? "🚨 URGENT CALL" : "📞 NEW LEAD";

  console.log(`\n${prefix}`);
  console.log(`  Phone:       ${lead.caller_phone}`);
  console.log(`  Name:        ${lead.caller_name ?? "Unknown"}`);
  console.log(`  Service:     ${lead.service_type ?? "Unknown"}`);
  console.log(`  Urgency:     ${lead.urgency.toUpperCase()}`);
  console.log(`  Summary:     ${lead.summary ?? "—"}`);
  console.log(`  Dashboard:   http://localhost:3000/dashboard/calls/${lead.id}`);
  console.log("");
}
