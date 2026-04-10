import type { Urgency } from "./leads-store";

export interface ExtractedLead {
  caller_name: string | null;
  service_type: string | null;
  urgency: Urgency;
  summary: string | null;
}

// Keywords that indicate urgency (Swedish + English)
const URGENT_KEYWORDS = [
  "emergency",
  "urgent",
  "immediately",
  "broken heating",
  "water leak",
  "akut",
  "brådskande",
  "omedelbart",
  "läckage",
  "vattenläcka",
  "trasig värmepump",
  "inget vatten",
  "ingen värme",
  "översvämning",
];

// Service type keyword map (Swedish + English)
const SERVICE_TYPE_MAP: [RegExp, string][] = [
  [/värme(pump)?|heat\s*pump/i, "Värmepump"],
  [/solcell|solar/i, "Solceller"],
  [/vvs|rör|plumb|vattenläcka|water\s*leak|kran|tap|toalett|toilet/i, "VVS"],
  [/el\b|electrical|ström|power/i, "El"],
  [/ventilation|fläkt|fan|hvac/i, "Ventilation"],
  [/tak|roof|fasad|facade/i, "Tak/Fasad"],
  [/lås|låsöppning|låssmed|nyckel|locksmith/i, "Lås"],
  [/fastighet|störning|spol-sug|slamsug|fastighetsjour|förvaltning/i, "Fastighetsservice"],
  [/skadedjur|råtta|mus|kackerlacka|insekt|vägglöss|pest/i, "Skadedjur"],
  [/bevakning|väktare|vaktnord|vaktmästeri/i, "Bevakning"],
  [/sanering|fuktsanering|vattenskada|mögel|asbest/i, "Sanering"],
];

// Simple name extraction: require actual capital first letter so connective words ("och", "att") are excluded.
// The outer pattern is case-insensitive for the trigger phrase; the capture group is not.
const NAME_PATTERNS = [
  /(?:jag heter|mitt namn är|det är|i'm|my name is)\s+([A-ZÅÄÖ][a-zåäö]+(?:\s+[A-ZÅÄÖ][a-zåäö]+)?)/,
];

export function extractLeadFromTranscript(transcript: string): ExtractedLead {
  if (!transcript || transcript.trim() === "") {
    return { caller_name: null, service_type: null, urgency: "normal", summary: null };
  }

  const lower = transcript.toLowerCase();

  // Urgency
  const urgency: Urgency = URGENT_KEYWORDS.some((kw) =>
    lower.includes(kw.toLowerCase())
  )
    ? "urgent"
    : "normal";

  // Service type
  let service_type: string | null = null;
  for (const [pattern, label] of SERVICE_TYPE_MAP) {
    if (pattern.test(transcript)) {
      service_type = label;
      break;
    }
  }

  // Caller name
  let caller_name: string | null = null;
  for (const pattern of NAME_PATTERNS) {
    const match = transcript.match(pattern);
    if (match?.[1]) {
      caller_name = match[1].trim();
      break;
    }
  }

  // Summary: first 200 chars of transcript, cleaned up
  const summary =
    transcript.trim().slice(0, 200) +
    (transcript.length > 200 ? "…" : "");

  return { caller_name, service_type, urgency, summary };
}
