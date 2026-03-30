import { NextRequest, NextResponse } from "next/server";
import { addLead } from "@/lib/leads-store";
import { extractLeadFromTranscript } from "@/lib/lead-extraction";
import { sendNotification } from "@/lib/notifications";
import type { Lead } from "@/lib/leads-store";


const DEMO_TRANSCRIPTS = [
  "Hej, jag heter Anna Svensson. Jag behöver hjälp med min trasiga värmepump. Det är akut, vi har ingen värme hemma. Bor på Storgatan 12 i Malmö.",
  "Hallå, det är Erik här. Jag undrar om ni kan komma och titta på ett vattenläckage under kökshandfatet. Det läcker ganska mycket, verkar brådskande. Jag bor på Vasagatan 7.",
  "Hej! Jag heter Maria och jag är intresserad av att installera solceller på mitt hus. Inte så bråttom men jag skulle vilja ha en offert. Adressen är Björkvägen 3.",
  "God morgon, Lars Nilsson här. Kranen i badrummet droppar och det håller på att bli ett problem. Kan ni komma och fixa det den här veckan?",
];

export async function POST(req: NextRequest) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Not available" }, { status: 404 });
  }

  let overrides: Partial<Lead> & { transcript?: string } = {};
  try {
    const text = await req.text();
    if (text) overrides = JSON.parse(text);
  } catch {
    // no body is fine
  }

  // Pick a random demo transcript if none provided
  const transcript =
    overrides.transcript ??
    DEMO_TRANSCRIPTS[Math.floor(Math.random() * DEMO_TRANSCRIPTS.length)];

  const extracted = extractLeadFromTranscript(transcript);

  const lead: Lead = {
    id: crypto.randomUUID(),
    call_control_id: `sim_${Date.now()}`,
    caller_phone: overrides.caller_phone ?? "+46701234567",
    caller_name: overrides.caller_name ?? extracted.caller_name,
    service_type: overrides.service_type ?? extracted.service_type,
    urgency: overrides.urgency ?? extracted.urgency,
    summary: overrides.summary ?? extracted.summary,
    transcript,
    recording_url: overrides.recording_url ?? null,
    status: "completed",
    created_at: new Date(),
    completed_at: new Date(),
  };

  await addLead(lead);

  const notifType = lead.urgency === "urgent" ? "urgent_call" : "new_lead";
  await sendNotification(notifType, lead);

  return NextResponse.json({ ok: true, lead }, { status: 201 });
}
