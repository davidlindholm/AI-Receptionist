/**
 * Batch fix for all Telnyx AI assistants:
 *
 * 1. Assign Spanish insight group to Spanish agents
 * 2. Update greetings on ALL agents (add "How can I help you?")
 * 3. Add hangup tool to ALL agents
 * 4. Set voice language on Spanish agents
 *
 * Run with:
 *   npx tsx scripts/fix-agents-batch.ts
 */

import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

import { COMPANIES } from "../lib/companies";

const TELNYX_API_BASE = "https://api.telnyx.com/v2";
const SPANISH_INSIGHT_GROUP_ID = "85913ad8-f6ba-4602-8ad8-8dad9edc3000";
const NIMOZ_ASSISTANT_ID = "assistant-1187a5d8-a489-4e2b-b67c-c817d556df0a";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const REPO_ROOT = resolve(__dirname, "..");

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
  console.log("Batch fix: insight group, greetings, hangup tool, voice lang");
  console.log("─".repeat(60));

  // Include Nimoz in the list (it's in COMPANIES but let's be explicit)
  const allCompanies = COMPANIES;

  for (const company of allCompanies) {
    const id = company.assistantId;
    if (id === "TODO_TELNYX_AGENT_ID") {
      console.log(`\n⏭  ${company.slug} — no agent ID yet, skipping`);
      continue;
    }

    const lang = company.language ?? "sv";
    console.log(`\n▶ ${company.slug} (${lang}) — ${id}`);

    // Fetch current state
    const current = await getAssistant(id);
    const updates: Record<string, unknown> = {};

    // ── Fix 1: Insight group for Spanish agents ──────────────────────
    if (lang === "es") {
      const currentIG = (current.insight_settings as Record<string, unknown>)
        ?.insight_group_id;
      if (currentIG !== SPANISH_INSIGHT_GROUP_ID) {
        updates.insight_settings = {
          insight_group_id: SPANISH_INSIGHT_GROUP_ID,
        };
        console.log(`  [insight] ${currentIG} → ${SPANISH_INSIGHT_GROUP_ID}`);
      } else {
        console.log(`  [insight] ✓ already correct`);
      }
    }

    // ── Fix 2: Greeting with "How can I help you?" ───────────────────
    const newGreeting =
      lang === "es"
        ? `¡Hola! Has contactado a ${company.name}. En este momento no podemos atenderte personalmente, pero yo puedo ayudarte. ¿En qué puedo ayudarte?`
        : `Hej! Du har kommit till ${company.name}. Vi är ute på jobb just nu, men jag kan hjälpa dig. Hur kan jag hjälpa dig?`;

    if (current.greeting !== newGreeting) {
      updates.greeting = newGreeting;
      console.log(`  [greeting] updated (added question)`);
    } else {
      console.log(`  [greeting] ✓ already correct`);
    }

    // ── Fix 3: Add hangup tool ───────────────────────────────────────
    const currentTools = (current.tools as Array<Record<string, unknown>>) ?? [];
    const hasHangup = currentTools.some((t) => t.type === "hangup");

    if (!hasHangup) {
      const hangupDesc =
        lang === "es"
          ? "Utilizar cuando la conversación haya terminado y sea apropiado colgar la llamada."
          : "To be used whenever the conversation has ended and it would be appropriate to hangup the call.";

      updates.tools = [
        ...currentTools,
        {
          type: "hangup",
          hangup: { description: hangupDesc },
        },
      ];
      console.log(`  [hangup] adding hangup tool`);
    } else {
      console.log(`  [hangup] ✓ already has hangup tool`);
    }

    // ── Fix 4: Voice language for Spanish agents ─────────────────────
    if (lang === "es") {
      const vs = current.voice_settings as Record<string, unknown> | undefined;
      if (vs) {
        // The Portal "Language" dropdown likely maps to a language field
        // in voice_settings. Try setting it alongside language_boost.
        const needsUpdate =
          vs.language_boost !== "Spanish" || vs.language !== "es-MX";

        if (needsUpdate) {
          updates.voice_settings = {
            ...vs,
            language_boost: "Spanish",
            language: "es-MX",
          };
          console.log(`  [voice] setting language to es-MX`);
        } else {
          console.log(`  [voice] ✓ already correct`);
        }
      }
    }

    // ── Apply updates ────────────────────────────────────────────────
    if (Object.keys(updates).length > 0) {
      try {
        await updateAssistant(id, updates);
        console.log(`  ✓ updated`);
      } catch (err) {
        console.error(`  ✗ failed: ${(err as Error).message}`);
      }
    } else {
      console.log(`  ⏭  no changes needed`);
    }
  }

  // ── Verification ─────────────────────────────────────────────────────
  console.log("\n" + "─".repeat(60));
  console.log("Verification");
  console.log("─".repeat(60));

  for (const company of allCompanies) {
    const id = company.assistantId;
    if (id === "TODO_TELNYX_AGENT_ID") continue;

    const a = await getAssistant(id);
    const tools = (a.tools as Array<Record<string, unknown>>) ?? [];
    const hasHangup = tools.some((t) => t.type === "hangup");
    const greeting = (a.greeting as string) ?? "";
    const endsWithQuestion =
      greeting.endsWith("?") ||
      greeting.endsWith("dig?") ||
      greeting.endsWith("ayudarte?");
    const ig = (a.insight_settings as Record<string, unknown>)?.insight_group_id;
    const vs = a.voice_settings as Record<string, unknown> | undefined;

    const lang = company.language ?? "sv";
    const checks = [
      hasHangup ? "✓hangup" : "✗hangup",
      endsWithQuestion ? "✓greeting" : "✗greeting",
    ];
    if (lang === "es") {
      checks.push(
        ig === SPANISH_INSIGHT_GROUP_ID ? "✓insight_es" : "✗insight_es"
      );
      checks.push(
        vs?.language_boost === "Spanish" ? "✓voice_lang" : "✗voice_lang"
      );
    }

    console.log(`  ${company.slug.padEnd(16)} ${checks.join("  ")}`);
  }

  console.log("\nDone.");
}

main().catch((err) => {
  console.error("\nFatal error:", err);
  process.exit(1);
});
