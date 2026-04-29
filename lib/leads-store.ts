/**
 * Leads store backed by Supabase (Postgres).
 * All functions are async — same public interface as the former Vercel KV adapter.
 */
import { createClient } from "@supabase/supabase-js";

export type Urgency = "urgent" | "normal";
export type CallStatus = "in_progress" | "completed" | "missed";

export interface Lead {
  id: string;
  call_control_id: string;
  caller_phone: string;
  caller_name: string | null;
  service_type: string | null;
  company_slug: string | null;
  urgency: Urgency;
  summary: string | null;
  transcript: string | null;
  recording_url: string | null;
  status: CallStatus;
  created_at: Date;
  completed_at: Date | null;
}

function getClient() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  return createClient(url, key);
}

function rowToLead(row: Record<string, unknown>): Lead {
  return {
    id: row.id as string,
    call_control_id: row.call_control_id as string,
    caller_phone: row.caller_phone as string,
    caller_name: (row.caller_name as string | null) ?? null,
    service_type: (row.service_type as string | null) ?? null,
    company_slug: (row.company_slug as string | null) ?? null,
    urgency: (row.urgency as Urgency) ?? "normal",
    summary: (row.summary as string | null) ?? null,
    transcript: (row.transcript as string | null) ?? null,
    recording_url: (row.recording_url as string | null) ?? null,
    status: (row.status as CallStatus) ?? "completed",
    created_at: new Date(row.created_at as string),
    completed_at: row.completed_at ? new Date(row.completed_at as string) : null,
  };
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/** All completed leads, newest first. */
export async function getLeads(): Promise<Lead[]> {
  const sb = getClient();
  const { data, error } = await sb
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []).map(rowToLead);
}

/** All leads belonging to a single company, newest first. */
export async function getLeadsByCompanySlug(companySlug: string): Promise<Lead[]> {
  const sb = getClient();
  const { data, error } = await sb
    .from("leads")
    .select("*")
    .eq("company_slug", companySlug)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []).map(rowToLead);
}

/** Single lead by id. */
export async function getLeadById(id: string): Promise<Lead | undefined> {
  const sb = getClient();
  const { data, error } = await sb
    .from("leads")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) throw error;
  return data ? rowToLead(data) : undefined;
}

/** Start tracking an in-progress call. */
export async function startCall(
  callControlId: string,
  callerPhone: string,
  companySlug: string | null
): Promise<void> {
  const sb = getClient();
  const { error } = await sb.from("active_calls").upsert({
    call_control_id: callControlId,
    id: crypto.randomUUID(),
    caller_phone: callerPhone,
    company_slug: companySlug,
    status: "in_progress",
    created_at: new Date().toISOString(),
  });
  if (error) throw error;
}

/** Update fields on an in-progress call (transcript, recording_url, etc.). */
export async function updateActiveCall(
  callControlId: string,
  fields: Partial<Lead>
): Promise<void> {
  const sb = getClient();
  const update: Record<string, unknown> = { ...fields };
  // Remove undefined values so we don't overwrite existing data with null
  for (const k of Object.keys(update)) {
    if (update[k] === undefined) delete update[k];
  }
  const { error } = await sb
    .from("active_calls")
    .update(update)
    .eq("call_control_id", callControlId);
  if (error) throw error;
}

/** Finalise a call: merge enriched fields, persist to leads table. */
export async function finaliseCall(
  callControlId: string,
  enriched: Partial<Lead>
): Promise<Lead | null> {
  const sb = getClient();

  const { data: active, error: fetchErr } = await sb
    .from("active_calls")
    .select("*")
    .eq("call_control_id", callControlId)
    .maybeSingle();
  if (fetchErr) throw fetchErr;
  if (!active) return null;

  const lead: Lead = {
    id: (active.id as string) ?? crypto.randomUUID(),
    call_control_id: callControlId,
    caller_phone: (active.caller_phone as string) ?? "unknown",
    caller_name: enriched.caller_name ?? (active.caller_name as string | null) ?? null,
    service_type: enriched.service_type ?? (active.service_type as string | null) ?? null,
    company_slug:
      enriched.company_slug ?? (active.company_slug as string | null) ?? null,
    urgency: enriched.urgency ?? (active.urgency as Urgency) ?? "normal",
    summary: enriched.summary ?? (active.summary as string | null) ?? null,
    transcript: enriched.transcript ?? (active.transcript as string | null) ?? null,
    recording_url: enriched.recording_url ?? (active.recording_url as string | null) ?? null,
    status: "completed",
    created_at: active.created_at ? new Date(active.created_at as string) : new Date(),
    completed_at: new Date(),
  };

  const { error: insertErr } = await sb.from("leads").insert({
    ...lead,
    created_at: lead.created_at.toISOString(),
    completed_at: lead.completed_at!.toISOString(),
  });
  if (insertErr) throw insertErr;

  const { error: delErr } = await sb
    .from("active_calls")
    .delete()
    .eq("call_control_id", callControlId);
  if (delErr) throw delErr;

  return lead;
}

/** Add a lead directly (used by the simulate endpoint in dev). */
export async function addLead(lead: Lead): Promise<void> {
  const sb = getClient();
  const { error } = await sb.from("leads").insert({
    ...lead,
    created_at: lead.created_at.toISOString(),
    completed_at: lead.completed_at?.toISOString() ?? null,
  });
  if (error) throw error;
}

/** Clear all leads and active calls (used by the clear endpoint). */
export async function clearLeads(): Promise<void> {
  const sb = getClient();
  const [r1, r2] = await Promise.all([
    sb.from("leads").delete().neq("id", "00000000-0000-0000-0000-000000000000"),
    sb.from("active_calls").delete().neq("call_control_id", ""),
  ]);
  if (r1.error) throw r1.error;
  if (r2.error) throw r2.error;
}
