import type { Urgency } from "./leads-store";

export interface ExtractedLead {
  caller_name: string | null;
  service_type: string | null;
  urgency: Urgency;
  summary: string | null;
}

// Keywords that indicate urgency (Swedish + English + Spanish)
const URGENT_KEYWORDS = [
  // English
  "emergency",
  "urgent",
  "immediately",
  "broken heating",
  "water leak",
  // Swedish
  "akut",
  "brådskande",
  "omedelbart",
  "läckage",
  "vattenläcka",
  "trasig värmepump",
  "inget vatten",
  "ingen värme",
  "översvämning",
  // Spanish
  "urgente",
  "emergencia",
  "inmediato",
  "de inmediato",
  "lo antes posible",
  "fuga de agua",
  "inundación",
  "sin agua",
  "sin luz",
  "se rompió",
];

// Service type keyword map (Swedish + English + Spanish)
const SERVICE_TYPE_MAP: [RegExp, string][] = [
  // Swedish / English industries
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
  // Spanish industries
  [/club\s*nocturno|discoteca|antro|salsa|noche|cover|pista/i, "Club nocturno"],
  [/reserv(?:a|aci[oó]n)|mesa|restaurante|comida|cena|almuerzo/i, "Restaurante"],
  [/cita|tratamiento|facial|corporal|u[ñn]as|depilaci[oó]n|maquillaje|est[eé]tica|belleza/i, "Estética"],
];

// Simple name extraction: require actual capital first letter so connective words ("och", "att") are excluded.
// The outer pattern is case-insensitive for the trigger phrase; the capture group is not.
const NAME_PATTERNS = [
  // Swedish / English
  /(?:jag heter|mitt namn är|det är|i'm|my name is)\s+([A-ZÅÄÖ][a-zåäö]+(?:\s+[A-ZÅÄÖ][a-zåäö]+)?)/,
  // Spanish
  /(?:me llamo|mi nombre es|soy)\s+([A-ZÁÉÍÓÚÑ][a-záéíóúñ]+(?:\s+[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)?)/,
];

export interface ExtractionOptions {
  /** Company service type — used as fallback when regex doesn't match */
  companyServiceType?: string | null;
  /** If false, urgency is always "normal" (e.g. nightclubs, restaurants) */
  hasUrgency?: boolean;
  /** Company language — "es" skips Swedish/English patterns to avoid false matches */
  language?: string | null;
}

export function extractLeadFromTranscript(
  transcript: string,
  options: ExtractionOptions = {}
): ExtractedLead {
  if (!transcript || transcript.trim() === "") {
    return { caller_name: null, service_type: null, urgency: "normal", summary: null };
  }

  const lower = transcript.toLowerCase();

  // Urgency — skip for businesses where urgency doesn't apply
  const urgency: Urgency =
    options.hasUrgency === false
      ? "normal"
      : URGENT_KEYWORDS.some((kw) => lower.includes(kw.toLowerCase()))
        ? "urgent"
        : "normal";

  // Service type — for Spanish companies, only test the Spanish patterns (last 3 entries)
  // to avoid false matches on Swedish/English patterns (e.g. /el\b/ matching "El cliente")
  const patterns =
    options.language === "es" ? SERVICE_TYPE_MAP.slice(-3) : SERVICE_TYPE_MAP;
  let service_type: string | null = null;
  for (const [pattern, label] of patterns) {
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

  return {
    caller_name,
    service_type: service_type ?? options.companyServiceType ?? null,
    urgency,
    summary,
  };
}
