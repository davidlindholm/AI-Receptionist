/**
 * Push the local prompt + per-company settings to a Telnyx AI assistant
 * identified by the assistantId in lib/companies.ts (NOT by name).
 *
 * Use this when:
 *   - The Telnyx assistant was pre-created (e.g. by the user) and its
 *     `name` doesn't exactly match Company.name, so clone-telnyx-agents.ts
 *     would skip it and try to create a duplicate.
 *   - You changed lib/assistants/<slug>.md and want to push the new
 *     prompt to a single tenant without touching the others.
 *
 * Run with:
 *   npx tsx scripts/update-telnyx-agent.ts <slug>
 *
 * Updates: name, instructions, greeting, webhook_url, voice/transcription
 * language (es-MX or sv-SE), idle timeout, hangup tool.
 *
 * Safe to re-run; it's a PATCH, not a create.
 */

import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

import { COMPANIES, type Company } from "../lib/companies";

const WEBHOOK_BASE_URL = "https://growthnetworksystem.com";
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

async function telnyxFetch(
  method: "GET" | "POST",
  path: string,
  body?: Record<string, unknown>
): Promise<unknown> {
  const res = await fetch(`${TELNYX_API_BASE}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${TELNYX_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  if (!res.ok) {
    throw new Error(`Telnyx ${method} ${path} (${res.status}): ${text}`);
  }
  return text ? JSON.parse(text) : {};
}

function buildGreeting(company: Company): string {
  // Strip trailing "." from names that already end with one (e.g. "A.C.")
  // so we don't get a double period in the spoken greeting.
  const displayName = company.name.replace(/\.$/, "");
  if (company.language === "es") {
    const name = company.assistantName ?? "Pedro";
    return `¡Hola! Has contactado a ${displayName}. Yo soy ${name}, ¿en qué puedo ayudarte?`;
  }
  const name = company.assistantName ?? "Martin";
  return `Hej! Du har kommit till ${displayName}. Jag är ${name}, hur kan jag hjälpa dig?`;
}

function buildPayload(company: Company, instructions: string): Record<string, unknown> {
  const payload: Record<string, unknown> = {
    name: company.name,
    instructions,
    greeting: buildGreeting(company),
    webhook_url: `${WEBHOOK_BASE_URL}/api/webhooks/telnyx?slug=${company.slug}`,
    telephony_settings: { user_idle_timeout_secs: 30 },
    tools: [
      {
        type: "hangup",
        hangup: {
          description:
            company.language === "es"
              ? "Utilizar cuando la conversación haya terminado y sea apropiado colgar la llamada."
              : "To be used whenever the conversation has ended and it would be appropriate to hangup the call.",
        },
      },
    ],
  };

  if (company.language === "es") {
    payload.voice_settings = {
      // Daniela - Relaxed Woman (es-MX, Female) — same voice the clone script uses
      voice: "Telnyx.Ultra.5c5ad5e7-1020-476b-8b91-fdcbe9cc313c",
      language_boost: "Spanish",
      language: "es-MX",
    };
    payload.transcription = { language: "es" };
  }

  return payload;
}

async function main() {
  const slug = process.argv[2];
  if (!slug) {
    console.error("Usage: npx tsx scripts/update-telnyx-agent.ts <slug>");
    process.exit(1);
  }

  const company = COMPANIES.find((c) => c.slug === slug);
  if (!company) {
    console.error(`Unknown slug "${slug}". Known: ${COMPANIES.map((c) => c.slug).join(", ")}`);
    process.exit(1);
  }

  const promptPath = resolve(REPO_ROOT, `lib/assistants/${slug}.md`);
  if (!existsSync(promptPath)) {
    console.error(`Missing prompt file: ${promptPath}`);
    process.exit(1);
  }
  const instructions = readFileSync(promptPath, "utf8");

  console.log(`Updating ${company.name} (${company.assistantId})`);
  const payload = buildPayload(company, instructions);
  console.log(`  fields: ${Object.keys(payload).join(", ")}`);

  await telnyxFetch("POST", `/ai/assistants/${encodeURIComponent(company.assistantId)}`, payload);
  console.log("  ✓ updated");
}

main().catch((err) => {
  console.error("\nFatal:", err);
  process.exit(1);
});
