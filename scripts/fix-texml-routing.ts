/**
 * Fix TeXML routing: create per-agent TeXML apps for all cloned agents.
 *
 * Problem: all cloned agents inherited Nimoz's TeXML app, which has
 * voice_url pointing to Nimoz's assistant. So every call (web widget
 * and phone) routes to Nimoz regardless of the agent-id attribute.
 *
 * Fix: create a separate TeXML app for each cloned agent with voice_url
 * pointing to that agent's own /texml endpoint.
 *
 * Run with:
 *   npx tsx scripts/fix-texml-routing.ts
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

// ---------------------------------------------------------------------------
// HTTP helpers
// ---------------------------------------------------------------------------

async function telnyxGet<T = Record<string, unknown>>(path: string): Promise<T> {
  const res = await fetch(`${TELNYX_API_BASE}${path}`, {
    headers: { Authorization: `Bearer ${TELNYX_API_KEY}` },
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`GET ${path} failed (${res.status}): ${text}`);
  const parsed = JSON.parse(text);
  return (parsed.data ?? parsed) as T;
}

async function telnyxPost<T = Record<string, unknown>>(
  path: string,
  body: Record<string, unknown>
): Promise<T> {
  const res = await fetch(`${TELNYX_API_BASE}${path}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${TELNYX_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`POST ${path} failed (${res.status}): ${text}`);
  const parsed = JSON.parse(text);
  return (parsed.data ?? parsed) as T;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

interface TeXMLApp {
  id: string;
  friendly_name: string;
  voice_url: string;
  voice_fallback_url: string;
  [key: string]: unknown;
}

async function main() {
  console.log("─".repeat(60));
  console.log("Fix TeXML routing — create per-agent TeXML apps");
  console.log("─".repeat(60));

  // 1. Get the Nimoz TeXML app as template
  console.log("\n[1] Fetching Nimoz TeXML app as template…");
  const nimozApp = await telnyxGet<TeXMLApp>(
    "/texml_applications/2933222158169539793"
  );
  console.log(`    ✓ ${nimozApp.friendly_name}`);
  console.log(`    voice_url: ${nimozApp.voice_url}`);

  // 2. List existing TeXML apps so we can skip already-created ones
  console.log("\n[2] Listing existing TeXML apps…");
  const existingApps = await telnyxGet<TeXMLApp[]>("/texml_applications");
  const appsByName = new Map<string, TeXMLApp>();
  if (Array.isArray(existingApps)) {
    for (const app of existingApps) {
      appsByName.set(app.friendly_name, app);
    }
  }
  console.log(`    ✓ ${appsByName.size} existing apps`);

  // 3. For each non-Nimoz agent, create a TeXML app and assign it
  console.log("\n[3] Creating per-agent TeXML apps…");
  const nonNimoz = COMPANIES.filter((c) => c.slug !== "nimoz");

  for (const company of nonNimoz) {
    const assistantId = company.assistantId;
    const appName = `ai-assistant-${assistantId.replace("assistant-", "")}`;
    const voiceUrl = `${TELNYX_API_BASE}/ai/assistants/${assistantId}/texml`;

    console.log(`\n  ▶ ${company.slug} (${assistantId})`);

    // Check if app already exists
    const existing = appsByName.get(appName);
    if (existing) {
      console.log(`    ⏭  TeXML app already exists: ${existing.id}`);
      console.log(`    voice_url: ${existing.voice_url}`);

      // Still assign it to the agent if needed
      const agent = await telnyxGet<Record<string, unknown>>(
        `/ai/assistants/${assistantId}`
      );
      const telephony = agent.telephony_settings as Record<string, unknown> | undefined;
      if (telephony?.default_texml_app_id !== existing.id) {
        console.log(`    ↻ assigning TeXML app to agent…`);
        await telnyxPost(`/ai/assistants/${assistantId}`, {
          telephony_settings: {
            ...telephony,
            default_texml_app_id: existing.id,
          },
        });
        console.log(`    ✓ assigned`);
      }
      continue;
    }

    // Create new TeXML app modelled after Nimoz's
    console.log(`    creating TeXML app: ${appName}`);
    try {
      const newApp = await telnyxPost<TeXMLApp>("/texml_applications", {
        friendly_name: appName,
        voice_url: voiceUrl,
        voice_fallback_url: voiceUrl,
        voice_method: nimozApp.voice_method || "get",
        status_callback_method: "post",
        dtmf_type: nimozApp.dtmf_type || "RFC 2833",
        first_command_timeout: false,
        first_command_timeout_secs: 30,
        anchorsite_override: "Latency",
        inbound: {
          sip_subdomain: assistantId.replace("assistant-", ""),
          sip_subdomain_receive_settings: "from_anyone",
          shaken_stir_enabled: false,
        },
      });

      console.log(`    ✓ created TeXML app: ${newApp.id}`);
      console.log(`    voice_url: ${voiceUrl}`);

      // Assign to agent
      console.log(`    ↻ assigning to agent…`);
      const agent = await telnyxGet<Record<string, unknown>>(
        `/ai/assistants/${assistantId}`
      );
      const telephony = agent.telephony_settings as Record<string, unknown> | undefined;
      await telnyxPost(`/ai/assistants/${assistantId}`, {
        telephony_settings: {
          ...telephony,
          default_texml_app_id: newApp.id,
        },
      });
      console.log(`    ✓ assigned`);
    } catch (err) {
      console.error(`    ✗ failed: ${(err as Error).message}`);
    }
  }

  // 4. Verification
  console.log("\n" + "─".repeat(60));
  console.log("Verification");
  console.log("─".repeat(60));

  for (const company of COMPANIES) {
    const agent = await telnyxGet<Record<string, unknown>>(
      `/ai/assistants/${company.assistantId}`
    );
    const telephony = agent.telephony_settings as Record<string, unknown> | undefined;
    const appId = telephony?.default_texml_app_id || "(none)";
    const webCalls = telephony?.supports_unauthenticated_web_calls ?? false;

    // Check if the TeXML app points to the right assistant
    let routesTo = "?";
    if (appId && appId !== "(none)") {
      try {
        const app = await telnyxGet<TeXMLApp>(
          `/texml_applications/${appId}`
        );
        // Extract assistant id from voice_url
        const match = app.voice_url?.match(/assistants\/(assistant-[^/]+)/);
        routesTo = match?.[1]?.slice(0, 20) + "…" || app.voice_url || "?";
      } catch {
        routesTo = "error";
      }
    }

    const correct =
      routesTo.includes(company.assistantId.slice(0, 20)) ? "✓" : "✗";
    console.log(
      `  ${correct} ${company.slug.padEnd(14)} app=${String(appId).padEnd(22)} routes_to=${routesTo}`
    );
  }

  console.log("\nDone.");
}

main().catch((err) => {
  console.error("\nFatal error:", err);
  process.exit(1);
});
