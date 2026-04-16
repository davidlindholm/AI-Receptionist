/**
 * Clone the Nimoz Telnyx AI assistant into 7 industry-specific agents.
 *
 * Run with:
 *   npx tsx scripts/clone-telnyx-agents.ts
 *
 * Reads TELNYX_API_KEY from .env.local. The webhook base URL is hardcoded
 * to the user's Vercel deployment so each new agent gets a slug-tagged
 * webhook URL: ?slug={company-slug}.
 *
 * After creating the agents the script:
 *   1. Writes scripts/cloned-agents.json mapping slug → assistant id.
 *   2. Patches each app/demo-{slug}/page.tsx to replace TODO_TELNYX_AGENT_ID
 *      with the real assistant id.
 *   3. Updates the original Nimoz assistant's webhook URL so its calls
 *      land with ?slug=nimoz too (otherwise the per-company dashboard
 *      filter would hide them).
 *
 * The script is idempotent: re-running it after a partial failure looks
 * up existing assistants by name and skips ones that already exist.
 */

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

import { COMPANIES, type Company } from "../lib/companies";

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const NIMOZ_ASSISTANT_ID = "assistant-1187a5d8-a489-4e2b-b67c-c817d556df0a";
const WEBHOOK_BASE_URL = "https://ai-receptionist-two-iota.vercel.app";
const TELNYX_API_BASE = "https://api.telnyx.com/v2";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const REPO_ROOT = resolve(__dirname, "..");

// ---------------------------------------------------------------------------
// .env.local loader (no dotenv dependency)
// ---------------------------------------------------------------------------

function loadEnv() {
  const envPath = resolve(REPO_ROOT, ".env.local");
  if (!existsSync(envPath)) return;
  const text = readFileSync(envPath, "utf8");
  for (const line of text.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    // strip surrounding quotes
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!(key in process.env)) process.env[key] = value;
  }
}

loadEnv();

const TELNYX_API_KEY = process.env.TELNYX_API_KEY;
if (!TELNYX_API_KEY) {
  console.error("ERROR: TELNYX_API_KEY is not set in .env.local");
  process.exit(1);
}

// ---------------------------------------------------------------------------
// Telnyx HTTP helper (modelled after lib/voice-provider/telnyx.ts:24-46)
// ---------------------------------------------------------------------------

async function telnyxFetch<T = unknown>(
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
  path: string,
  body?: Record<string, unknown>
): Promise<T> {
  const url = `${TELNYX_API_BASE}${path}`;
  const res = await fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${TELNYX_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const text = await res.text();
  if (!res.ok) {
    throw new Error(`Telnyx ${method} ${path} failed (${res.status}): ${text}`);
  }
  return text ? (JSON.parse(text) as T) : ({} as T);
}

// ---------------------------------------------------------------------------
// Telnyx assistant CRUD
// ---------------------------------------------------------------------------

interface TelnyxAssistant {
  id?: string;
  assistant_id?: string;
  name?: string;
  instructions?: string;
  greeting?: string;
  webhook_url?: string | null;
  [key: string]: unknown;
}

interface TelnyxResponse<T> {
  data: T;
}

async function getAssistant(id: string): Promise<TelnyxAssistant> {
  // Telnyx returns { data: {...} } for single-resource GETs in some endpoints
  // and a bare object in others — handle both.
  const raw = await telnyxFetch<TelnyxAssistant | TelnyxResponse<TelnyxAssistant>>(
    "GET",
    `/ai/assistants/${encodeURIComponent(id)}`
  );
  if ((raw as TelnyxResponse<TelnyxAssistant>).data) {
    return (raw as TelnyxResponse<TelnyxAssistant>).data;
  }
  return raw as TelnyxAssistant;
}

async function listAssistants(): Promise<TelnyxAssistant[]> {
  const raw = await telnyxFetch<TelnyxResponse<TelnyxAssistant[]> | TelnyxAssistant[]>(
    "GET",
    `/ai/assistants`
  );
  if (Array.isArray(raw)) return raw;
  return (raw as TelnyxResponse<TelnyxAssistant[]>).data ?? [];
}

async function createAssistant(payload: Record<string, unknown>): Promise<TelnyxAssistant> {
  const raw = await telnyxFetch<TelnyxAssistant | TelnyxResponse<TelnyxAssistant>>(
    "POST",
    `/ai/assistants`,
    payload
  );
  if ((raw as TelnyxResponse<TelnyxAssistant>).data) {
    return (raw as TelnyxResponse<TelnyxAssistant>).data;
  }
  return raw as TelnyxAssistant;
}

async function updateAssistant(id: string, payload: Record<string, unknown>): Promise<void> {
  // Telnyx AI Assistants API uses POST on the resource path for updates
  // (PUT also works on some accounts). Try POST first since it's most common.
  await telnyxFetch("POST", `/ai/assistants/${encodeURIComponent(id)}`, payload);
}

// ---------------------------------------------------------------------------
// Per-company greeting
// ---------------------------------------------------------------------------

/**
 * Build the spoken greeting for one company, in the company's language.
 * Always ends with a question so the caller knows to speak.
 */
function buildGreeting(company: Company): string {
  if (company.language === "es") {
    return `¡Hola! Has contactado a ${company.name}. Yo soy Pedro, ¿en qué puedo ayudarte?`;
  }
  return `Hej! Du har kommit till ${company.name}. Jag är Martin, hur kan jag hjälpa dig?`;
}

// ---------------------------------------------------------------------------
// Build the create payload for one company
// ---------------------------------------------------------------------------

/**
 * Strip fields the create endpoint will reject. We start with everything
 * Telnyx returned for Nimoz, override name + instructions + webhook_url, and
 * remove fields that are server-managed.
 */
function buildCreatePayload(
  template: TelnyxAssistant,
  company: Company,
  instructions: string
): Record<string, unknown> {
  const payload: Record<string, unknown> = { ...template };

  // Strip server-managed fields
  const readonly = [
    "id",
    "assistant_id",
    "created_at",
    "updated_at",
    "modified_at",
    "user_id",
    "organization_id",
    "record_type",
    "version_id",
    "version_created_at",
    "version_name",
  ];
  for (const k of readonly) delete payload[k];

  // Remove the shared TeXML app id — cloned agents should NOT inherit
  // Nimoz's TeXML app routing. Web widgets only need
  // supports_unauthenticated_web_calls=true and the correct agent-id.
  if (payload.telephony_settings && typeof payload.telephony_settings === "object") {
    const ts = { ...(payload.telephony_settings as Record<string, unknown>) };
    delete ts.default_texml_app_id;
    payload.telephony_settings = ts;
  }

  // Override the per-company fields
  payload.name = company.name;
  payload.instructions = instructions;
  payload.greeting = buildGreeting(company);
  payload.webhook_url = `${WEBHOOK_BASE_URL}/api/webhooks/telnyx?slug=${company.slug}`;

  // Hang up after 30s of caller silence (nested under telephony_settings)
  if (payload.telephony_settings && typeof payload.telephony_settings === "object") {
    (payload.telephony_settings as Record<string, unknown>).user_idle_timeout_secs = 30;
  } else {
    payload.telephony_settings = { user_idle_timeout_secs: 30 };
  }

  // Always add hangup tool so the bot can end calls after farewell
  const hangupDesc =
    company.language === "es"
      ? "Utilizar cuando la conversación haya terminado y sea apropiado colgar la llamada."
      : "To be used whenever the conversation has ended and it would be appropriate to hangup the call.";
  payload.tools = [
    { type: "hangup", hangup: { description: hangupDesc } },
  ];

  // Override language settings for non-Swedish companies
  if (company.language === "es") {
    if (payload.voice_settings && typeof payload.voice_settings === "object") {
      payload.voice_settings = {
        ...(payload.voice_settings as Record<string, unknown>),
        // Pedro - Formal Speaker (es-MX, Male)
        voice: "Telnyx.Ultra.15d0c2e2-8d29-44c3-be23-d585d5f154a1",
        language_boost: "Spanish",
        language: "es-MX",
      };
    }
    if (payload.transcription && typeof payload.transcription === "object") {
      payload.transcription = {
        ...(payload.transcription as Record<string, unknown>),
        language: "es",
      };
    }
  }

  return payload;
}

// ---------------------------------------------------------------------------
// Patch app/demo-{slug}/page.tsx
// ---------------------------------------------------------------------------

function patchDemoPage(slug: string, assistantId: string): boolean {
  const filePath = resolve(REPO_ROOT, `app/demo-${slug}/page.tsx`);
  if (!existsSync(filePath)) {
    console.warn(`  ⚠ ${filePath} does not exist; skipping patch`);
    return false;
  }
  const original = readFileSync(filePath, "utf8");
  const placeholder = `agentId: "TODO_TELNYX_AGENT_ID"`;
  const replacement = `agentId: "${assistantId}"`;

  if (!original.includes(placeholder)) {
    if (original.includes(`agentId: "${assistantId}"`)) {
      console.log(`  ⏭  ${filePath} already patched`);
      return true;
    }
    console.warn(`  ⚠ ${filePath} has no TODO_TELNYX_AGENT_ID placeholder; skipping`);
    return false;
  }

  const updated = original.replace(placeholder, replacement);
  writeFileSync(filePath, updated, "utf8");
  console.log(`  ✓ patched ${filePath}`);
  return true;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  console.log("─".repeat(60));
  console.log("Cloning Nimoz Telnyx assistant → 7 industry agents");
  console.log("─".repeat(60));

  // 1. Fetch Nimoz template
  console.log(`\n[1/4] Fetching Nimoz template (${NIMOZ_ASSISTANT_ID})…`);
  const template = await getAssistant(NIMOZ_ASSISTANT_ID);
  console.log(`      ✓ name="${template.name}"`);

  // 2. List existing assistants for idempotency check
  console.log(`\n[2/4] Listing existing assistants for idempotency check…`);
  const existing = await listAssistants();
  const existingByName = new Map<string, TelnyxAssistant>();
  for (const a of existing) {
    if (a.name) existingByName.set(a.name, a);
  }
  console.log(`      ✓ ${existing.length} existing assistants`);

  // 3. Clone for each non-Nimoz company
  console.log(`\n[3/4] Creating agents…`);
  const targets = COMPANIES.filter((c) => c.slug !== "nimoz");
  const cloned: Record<string, string> = {};

  for (const company of targets) {
    console.log(`\n  → ${company.slug} (${company.name})`);

    const promptPath = resolve(REPO_ROOT, `lib/assistants/${company.slug}.md`);
    if (!existsSync(promptPath)) {
      console.error(`    ✗ Prompt file missing: ${promptPath}`);
      continue;
    }
    const instructions = readFileSync(promptPath, "utf8");

    let assistant: TelnyxAssistant | undefined = existingByName.get(company.name);
    if (assistant) {
      const id = assistant.id ?? assistant.assistant_id;
      console.log(`    ⏭  already exists: ${id}`);

      // Reconcile drift: webhook URL, greeting, and instructions all get
      // overwritten so a re-run patches earlier mistakes (e.g. cloned
      // agents that still had Nimoz's greeting).
      if (id) {
        const expectedWebhook = `${WEBHOOK_BASE_URL}/api/webhooks/telnyx?slug=${company.slug}`;
        const expectedGreeting = buildGreeting(company);
        const updates: Record<string, unknown> = {};
        if (assistant.webhook_url !== expectedWebhook) {
          updates.webhook_url = expectedWebhook;
        }
        if (assistant.greeting !== expectedGreeting) {
          updates.greeting = expectedGreeting;
        }
        if (assistant.instructions !== instructions) {
          updates.instructions = instructions;
        }
        if (Object.keys(updates).length > 0) {
          console.log(`    ↻ patching: ${Object.keys(updates).join(", ")}`);
          try {
            await updateAssistant(id, updates);
          } catch (err) {
            console.warn(`    ⚠ update failed: ${(err as Error).message}`);
          }
        }
        cloned[company.slug] = id;
      }
      continue;
    }

    const payload = buildCreatePayload(template, company, instructions);
    try {
      assistant = await createAssistant(payload);
    } catch (err) {
      console.error(`    ✗ create failed: ${(err as Error).message}`);
      continue;
    }
    const id = assistant.id ?? assistant.assistant_id;
    if (!id) {
      console.error(`    ✗ create returned no id: ${JSON.stringify(assistant)}`);
      continue;
    }
    cloned[company.slug] = id;
    console.log(`    ✓ created ${id}`);
  }

  // 4. Update Nimoz's webhook URL too (so its dashboard works after the
  //    company_slug filter lands)
  console.log(`\n[4/4] Updating Nimoz webhook URL → ?slug=nimoz`);
  const nimozWebhook = `${WEBHOOK_BASE_URL}/api/webhooks/telnyx?slug=nimoz`;
  if (template.webhook_url !== nimozWebhook) {
    try {
      await updateAssistant(NIMOZ_ASSISTANT_ID, { webhook_url: nimozWebhook });
      console.log(`      ✓ updated`);
    } catch (err) {
      console.warn(`      ⚠ update failed: ${(err as Error).message}`);
    }
  } else {
    console.log(`      ⏭  already correct`);
  }

  // Write summary file
  const summaryPath = resolve(REPO_ROOT, "scripts/cloned-agents.json");
  writeFileSync(summaryPath, JSON.stringify(cloned, null, 2) + "\n", "utf8");
  console.log(`\nWrote ${summaryPath}`);

  // Patch demo pages
  console.log(`\nPatching app/demo-{slug}/page.tsx files…`);
  for (const [slug, id] of Object.entries(cloned)) {
    patchDemoPage(slug, id);
  }

  // Final summary
  console.log("\n" + "─".repeat(60));
  console.log("Summary");
  console.log("─".repeat(60));
  for (const company of targets) {
    const id = cloned[company.slug] ?? "(not created)";
    console.log(`  ${company.slug.padEnd(14)} → ${id}`);
  }
  console.log("\nDone.");
}

main().catch((err) => {
  console.error("\nFatal error:", err);
  process.exit(1);
});
