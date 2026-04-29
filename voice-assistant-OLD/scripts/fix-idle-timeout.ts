/**
 * Set user_idle_timeout_secs on all Telnyx AI assistants.
 *
 * When a caller goes silent the bot will wait this many seconds before
 * prompting or hanging up. Without it the call stays open indefinitely.
 *
 * Run with:
 *   npx tsx scripts/fix-idle-timeout.ts
 */

import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

import { COMPANIES } from "../lib/companies";

const TELNYX_API_BASE = "https://api.telnyx.com/v2";
const IDLE_TIMEOUT_SECS = 30;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const REPO_ROOT = resolve(__dirname, "..");

// ---------------------------------------------------------------------------
// .env.local loader
// ---------------------------------------------------------------------------

function loadEnv() {
  const envPath = resolve(REPO_ROOT, ".env.local");
  if (!existsSync(envPath)) return;
  for (const line of readFileSync(envPath, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
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
// HTTP helpers
// ---------------------------------------------------------------------------

async function getAssistant(id: string): Promise<Record<string, unknown>> {
  const res = await fetch(
    `${TELNYX_API_BASE}/ai/assistants/${encodeURIComponent(id)}`,
    { headers: { Authorization: `Bearer ${TELNYX_API_KEY}` } }
  );
  const text = await res.text();
  if (!res.ok) throw new Error(`GET ${id} failed (${res.status}): ${text}`);
  const parsed = JSON.parse(text);
  return parsed.data ?? parsed;
}

async function updateAssistant(
  id: string,
  payload: Record<string, unknown>
): Promise<Record<string, unknown>> {
  const res = await fetch(
    `${TELNYX_API_BASE}/ai/assistants/${encodeURIComponent(id)}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${TELNYX_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );
  const text = await res.text();
  if (!res.ok) {
    throw new Error(`POST ${id} failed (${res.status}): ${text}`);
  }
  const parsed = JSON.parse(text);
  return parsed.data ?? parsed;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  console.log("─".repeat(60));
  console.log(`Setting user_idle_timeout_secs = ${IDLE_TIMEOUT_SECS} on all agents`);
  console.log("─".repeat(60));

  for (const company of COMPANIES) {
    const id = company.assistantId;
    if (id === "TODO_TELNYX_AGENT_ID") {
      console.log(`\n⏭  ${company.slug} — no agent ID yet, skipping`);
      continue;
    }

    console.log(`\n▶ ${company.slug} — ${id}`);

    const current = await getAssistant(id);
    const ts = (current.telephony_settings as Record<string, unknown>) ?? {};
    const currentTimeout = ts.user_idle_timeout_secs;

    if (currentTimeout === IDLE_TIMEOUT_SECS) {
      console.log(`  ✓ already set to ${IDLE_TIMEOUT_SECS}s`);
      continue;
    }

    console.log(`  ${currentTimeout ?? "null"} → ${IDLE_TIMEOUT_SECS}s`);
    try {
      await updateAssistant(id, {
        telephony_settings: { ...ts, user_idle_timeout_secs: IDLE_TIMEOUT_SECS },
      });
      console.log(`  ✓ updated`);
    } catch (err) {
      console.error(`  ✗ failed: ${(err as Error).message}`);
    }
  }

  // Verification
  console.log("\n" + "─".repeat(60));
  console.log("Verification");
  console.log("─".repeat(60));

  for (const company of COMPANIES) {
    const id = company.assistantId;
    if (id === "TODO_TELNYX_AGENT_ID") continue;

    const a = await getAssistant(id);
    const timeout = (a.telephony_settings as Record<string, unknown>)?.user_idle_timeout_secs;
    const ok = timeout === IDLE_TIMEOUT_SECS;
    console.log(
      `  ${company.slug.padEnd(16)} ${ok ? "✓" : "✗"} user_idle_timeout_secs=${timeout}`
    );
  }

  console.log("\nDone.");
}

main().catch((err) => {
  console.error("\nFatal error:", err);
  process.exit(1);
});
