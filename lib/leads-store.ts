/**
 * In-memory leads store.
 * Data resets on server restart — swap this module for a Supabase/Prisma
 * adapter later without touching any other file.
 */

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

// Survive Next.js hot-reload in dev by storing on the global object.
const g = global as typeof globalThis & {
  __leads?: Lead[];
  __active_calls?: Map<string, Partial<Lead>>;
};

if (!g.__leads) g.__leads = [];
if (!g.__active_calls) g.__active_calls = new Map();

/** All completed leads, newest first. */
export function getLeads(): Lead[] {
  return [...g.__leads!].reverse();
}

/** Single lead by id. */
export function getLeadById(id: string): Lead | undefined {
  return g.__leads!.find((l) => l.id === id);
}

/** Start tracking an in-progress call. */
export function startCall(callControlId: string, callerPhone: string): void {
  g.__active_calls!.set(callControlId, {
    id: crypto.randomUUID(),
    call_control_id: callControlId,
    caller_phone: callerPhone,
    status: "in_progress",
    created_at: new Date(),
  });
}

/** Update fields on an in-progress call (transcript, recording_url, etc.). */
export function updateActiveCall(
  callControlId: string,
  fields: Partial<Lead>
): void {
  const existing = g.__active_calls!.get(callControlId) ?? {};
  g.__active_calls!.set(callControlId, { ...existing, ...fields });
}

/** Finalise a call: merge enriched fields, move to leads array. */
export function finaliseCall(
  callControlId: string,
  enriched: Partial<Lead>
): Lead | null {
  const active = g.__active_calls!.get(callControlId);
  if (!active) return null;

  const lead: Lead = {
    id: active.id ?? crypto.randomUUID(),
    call_control_id: callControlId,
    caller_phone: active.caller_phone ?? "unknown",
    caller_name: enriched.caller_name ?? active.caller_name ?? null,
    service_type: enriched.service_type ?? active.service_type ?? null,
    urgency: enriched.urgency ?? active.urgency ?? "normal",
    summary: enriched.summary ?? active.summary ?? null,
    transcript: enriched.transcript ?? active.transcript ?? null,
    recording_url: enriched.recording_url ?? active.recording_url ?? null,
    status: "completed",
    created_at: active.created_at ?? new Date(),
    completed_at: new Date(),
  };

  g.__leads!.push(lead);
  g.__active_calls!.delete(callControlId);
  return lead;
}

/** Add a lead directly (used by the simulate endpoint). */
export function addLead(lead: Lead): void {
  g.__leads!.push(lead);
}

/** Clear all leads and active calls. */
export function clearLeads(): void {
  g.__leads = [];
  g.__active_calls = new Map();
}
