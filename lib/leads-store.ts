/**
 * Leads store backed by Vercel KV (Upstash Redis).
 * All functions are async — swap this file for a Supabase adapter later
 * without touching any other file.
 */
import { kv } from "@vercel/kv";

export type Urgency = "urgent" | "normal";
export type CallStatus = "in_progress" | "completed" | "missed";

export interface Lead {
  id: string;
  call_control_id: string;
  caller_phone: string;
  caller_name: string | null;
  service_type: string | null;
  urgency: Urgency;
  summary: string | null;
  transcript: string | null;
  recording_url: string | null;
  status: CallStatus;
  created_at: Date;
  completed_at: Date | null;
}

// Redis key helpers
const LEADS_LIST = "leads";
const leadKey = (id: string) => `lead:${id}`;
const activeCallKey = (id: string) => `active_call:${id}`;

/** Deserialise a stored lead (restores Date objects). */
function parseLead(raw: unknown): Lead {
  const l = typeof raw === "string" ? JSON.parse(raw) : (raw as Record<string, unknown>);
  return {
    ...l,
    created_at: new Date(l.created_at as string),
    completed_at: l.completed_at ? new Date(l.completed_at as string) : null,
  } as Lead;
}

/** Serialise a lead for storage (Dates → ISO strings). */
function serialiseLead(lead: Lead): string {
  return JSON.stringify({
    ...lead,
    created_at: lead.created_at.toISOString(),
    completed_at: lead.completed_at?.toISOString() ?? null,
  });
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/** All completed leads, newest first. */
export async function getLeads(): Promise<Lead[]> {
  const raw = await kv.lrange(LEADS_LIST, 0, -1);
  return (raw as unknown[]).map(parseLead);
}

/** Single lead by id. */
export async function getLeadById(id: string): Promise<Lead | undefined> {
  const raw = await kv.get(leadKey(id));
  if (!raw) return undefined;
  return parseLead(raw);
}

/** Start tracking an in-progress call. */
export async function startCall(
  callControlId: string,
  callerPhone: string
): Promise<void> {
  const data = {
    id: crypto.randomUUID(),
    call_control_id: callControlId,
    caller_phone: callerPhone,
    status: "in_progress",
    created_at: new Date().toISOString(),
  };
  // Expire after 2 hours in case call_ended never fires
  await kv.set(activeCallKey(callControlId), JSON.stringify(data), { ex: 7200 });
}

/** Update fields on an in-progress call (transcript, recording_url, etc.). */
export async function updateActiveCall(
  callControlId: string,
  fields: Partial<Lead>
): Promise<void> {
  const raw = await kv.get(activeCallKey(callControlId));
  const existing = raw
    ? (typeof raw === "string" ? JSON.parse(raw) : raw)
    : {};
  await kv.set(
    activeCallKey(callControlId),
    JSON.stringify({ ...existing, ...fields }),
    { ex: 7200 }
  );
}

/** Finalise a call: merge enriched fields, persist to leads list. */
export async function finaliseCall(
  callControlId: string,
  enriched: Partial<Lead>
): Promise<Lead | null> {
  const raw = await kv.get(activeCallKey(callControlId));
  if (!raw) return null;

  const active =
    typeof raw === "string" ? JSON.parse(raw) : (raw as Record<string, unknown>);

  const lead: Lead = {
    id: (active.id as string) ?? crypto.randomUUID(),
    call_control_id: callControlId,
    caller_phone: (active.caller_phone as string) ?? "unknown",
    caller_name: enriched.caller_name ?? (active.caller_name as string | null) ?? null,
    service_type:
      enriched.service_type ?? (active.service_type as string | null) ?? null,
    urgency: enriched.urgency ?? (active.urgency as Urgency) ?? "normal",
    summary: enriched.summary ?? (active.summary as string | null) ?? null,
    transcript:
      enriched.transcript ?? (active.transcript as string | null) ?? null,
    recording_url:
      enriched.recording_url ??
      (active.recording_url as string | null) ??
      null,
    status: "completed",
    created_at: active.created_at
      ? new Date(active.created_at as string)
      : new Date(),
    completed_at: new Date(),
  };

  const serialised = serialiseLead(lead);

  await Promise.all([
    kv.lpush(LEADS_LIST, serialised),
    kv.set(leadKey(lead.id), serialised),
    kv.del(activeCallKey(callControlId)),
  ]);

  return lead;
}

/** Add a lead directly (used by the simulate endpoint in dev). */
export async function addLead(lead: Lead): Promise<void> {
  const serialised = serialiseLead(lead);
  await Promise.all([
    kv.lpush(LEADS_LIST, serialised),
    kv.set(leadKey(lead.id), serialised),
  ]);
}

/** Clear all leads and active calls (used by the clear endpoint). */
export async function clearLeads(): Promise<void> {
  await kv.del(LEADS_LIST);
}
