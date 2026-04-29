/**
 * Read-only diagnostic. Fetches each Company.assistantId from Telnyx and
 * prints its current name, greeting, webhook_url, and the first line of
 * the instructions. Use this to confirm whether the cloning script's
 * greeting/instructions PATCHes actually took effect.
 *
 * Run with:
 *   npx tsx scripts/inspect-telnyx-agents.ts
 */

import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

import { COMPANIES } from "../lib/companies";

const TELNYX_API_BASE = "https://api.telnyx.com/v2";

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

async function getAssistant(id: string): Promise<Record<string, unknown>> {
  const res = await fetch(`${TELNYX_API_BASE}/ai/assistants/${encodeURIComponent(id)}`, {
    headers: { Authorization: `Bearer ${TELNYX_API_KEY}` },
  });
  const text = await res.text();
  if (!res.ok) {
    throw new Error(`GET ${id} failed (${res.status}): ${text}`);
  }
  const parsed = JSON.parse(text);
  return parsed.data ?? parsed;
}

async function tryGet(path: string): Promise<unknown> {
  const res = await fetch(`${TELNYX_API_BASE}${path}`, {
    headers: { Authorization: `Bearer ${TELNYX_API_KEY}` },
  });
  const text = await res.text();
  if (!res.ok) {
    return { __error: `${res.status}: ${text.slice(0, 200)}` };
  }
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

async function main() {
  console.log("─".repeat(80));
  console.log("Inspecting Telnyx assistants (read-only)");
  console.log("─".repeat(80));

  // 1) Dump full JSON for ONE assistant (Bosaker) so we can see all fields
  //    including any version metadata.
  const bosaker = COMPANIES.find((c) => c.slug === "bosaker")!;
  console.log(`\n========== FULL DUMP: ${bosaker.slug} ==========`);
  const full = await getAssistant(bosaker.assistantId);
  console.log(JSON.stringify(full, null, 2));
  console.log("\nTop-level keys:", Object.keys(full).join(", "));

  // 2) Probe for version-related endpoints. Print FULL output, no truncation.
  console.log(`\n========== /versions probe (${bosaker.slug}) ==========`);
  for (const path of [
    `/ai/assistants/${bosaker.assistantId}/versions`,
    `/ai/assistants/${bosaker.assistantId}?version=main`,
  ]) {
    const r = await tryGet(path);
    console.log(`\nGET ${path}`);
    console.log(JSON.stringify(r, null, 2));
  }

  // 3) Compare draft greeting vs main greeting for ALL agents
  console.log(`\n========== draft vs main greeting (all agents) ==========`);
  for (const company of COMPANIES) {
    const draft = (await tryGet(
      `/ai/assistants/${company.assistantId}`
    )) as Record<string, unknown>;
    const main = (await tryGet(
      `/ai/assistants/${company.assistantId}?version=main`
    )) as Record<string, unknown>;
    console.log(`\n▶ ${company.slug}`);
    console.log(`  draft greeting: ${draft.greeting ?? "(none)"}`);
    console.log(`  main  greeting: ${main.greeting ?? main.__error ?? "(none)"}`);
    console.log(`  draft version_id: ${draft.version_id ?? "(none)"} (${draft.version_name ?? "?"})`);
    console.log(`  main  version_id: ${main.version_id ?? "(none)"} (${main.version_name ?? "?"})`);
  }

}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
