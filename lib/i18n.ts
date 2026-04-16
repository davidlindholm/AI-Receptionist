/**
 * Lightweight i18n — keyed UI strings for Swedish (default) and Spanish.
 * Used by BusinessLandingPage, dashboard pages, and shared components.
 */

export type Lang = "sv" | "es";

const strings = {
  // ── Landing page ──────────────────────────────────────────────────────
  requestQuote:      { sv: "Begär offert",              es: "Solicitar cotización" },
  home:              { sv: "Hem",                       es: "Inicio" },
  aboutUs:           { sv: "Om oss",                    es: "Nosotros" },
  services:          { sv: "Tjänster",                  es: "Servicios" },
  contact:           { sv: "Kontakt",                   es: "Contacto" },
  readMore:          { sv: "Läs mer",                   es: "Leer más" },
  formName:          { sv: "Namn",                      es: "Nombre" },
  formNamePh:        { sv: "Anna Lindgren",             es: "María García" },
  formEmail:         { sv: "E-post",                    es: "Correo electrónico" },
  formEmailPh:       { sv: "anna@example.se",           es: "maria@ejemplo.com" },
  formPhone:         { sv: "Telefon",                   es: "Teléfono" },
  formPhonePh:       { sv: "070-000 00 00",             es: "+34 600 000 000" },
  formServiceLabel:  { sv: "Jag vill ha hjälp med:",    es: "Necesito ayuda con:" },
  formServicePh:     { sv: "Välj tjänst...",            es: "Seleccionar servicio..." },
  formOther:         { sv: "Annat",                     es: "Otro" },
  formMessage:       { sv: "Meddelande",                es: "Mensaje" },
  formMessagePh:     { sv: "Beskriv kortfattat vad du behöver hjälp med...",
                       es: "Describe brevemente en qué necesitas ayuda..." },
  formConsent:       { sv: "Samtycker till att mina personuppgifter behandlas enligt integritetspolicyn.",
                       es: "Acepto que mis datos personales sean tratados según la política de privacidad." },
  formSubmit:        { sv: "Skicka offertförfrågan",    es: "Enviar solicitud" },
  contactDirect:     { sv: "Kontakta oss direkt",       es: "Contáctanos directamente" },
  contactDirectSub:  { sv: "Föredrar du att ringa eller maila?",
                       es: "¿Prefieres llamar o enviar un correo?" },
  phone:             { sv: "Telefon",                   es: "Teléfono" },
  email:             { sv: "E-post",                    es: "Correo" },
  address:           { sv: "Adress",                    es: "Dirección" },
  aiReceptionist:    { sv: "AI-receptionist — alltid tillgänglig",
                       es: "Recepcionista IA — siempre disponible" },
  liveDemo:          { sv: "Livedemonstration",         es: "Demostración en vivo" },
  liveDemoSub:       { sv: "Tryck på knappen och tala direkt med AI-receptionisten",
                       es: "Pulsa el botón y habla directamente con la recepcionista IA" },
  contactTitle:      { sv: "Kontakt",                   es: "Contacto" },
  contactSub:        { sv: "Vi finns här för dig",      es: "Estamos aquí para ti" },
  phoneHours:        { sv: "Dygnet runt vid akuta ärenden",
                       es: "Las 24 horas para urgencias" },
  emailResponse:     { sv: "Svar inom 1 arbetsdag",     es: "Respuesta en 1 día hábil" },
  officeHours:       { sv: "Öppet mån–fre 07–17",       es: "Lunes a viernes 07–17" },
  certsTitle:        { sv: "Certifieringar & information",
                       es: "Certificaciones e información" },
  allRights:         { sv: "Alla rättigheter förbehållna.",
                       es: "Todos los derechos reservados." },
  cookies:           { sv: "Cookies & Integritetspolicy",
                       es: "Cookies y Política de Privacidad" },

  // ── Call detail page ───────────────────────────────────────────────────
  back:              { sv: "← Tillbaka",          es: "← Volver" },
  callDetails:       { sv: "Samtalsdetaljer",     es: "Detalles de llamada" },
  unknownCaller:     { sv: "Okänd uppringare",    es: "Llamante desconocido" },
  service:           { sv: "Tjänst",              es: "Servicio" },
  status:            { sv: "Status",              es: "Estado" },
  time:              { sv: "Tid",                 es: "Hora" },
  summary:           { sv: "Sammanfattning",      es: "Resumen" },
  recording:         { sv: "Inspelning",          es: "Grabación" },
  openRecording:     { sv: "Öppna inspelning i ny flik", es: "Abrir grabación en nueva pestaña" },
  transcript:        { sv: "Transkribering",      es: "Transcripción" },
  audioNotSupported: { sv: "Din webbläsare stödjer inte ljuduppspelning.",
                       es: "Tu navegador no soporta reproducción de audio." },
  urgent:            { sv: "Brådskande",          es: "Urgente" },
  normal:            { sv: "Normal",              es: "Normal" },
  callsTotal:        { sv: "samtal totalt",       es: "llamadas en total" },

  // ── Dashboard ─────────────────────────────────────────────────────────
  noCalls:           { sv: "Inga samtal ännu",          es: "Sin llamadas aún" },
  callsFiltered:     { sv: "samtal — filtrerat på företag",
                       es: "llamadas — filtrado por empresa" },
  showDemo:          { sv: "Visa demo →",               es: "Ver demo →" },
  showingOnly:       { sv: "Visar endast samtal från",  es: "Mostrando solo llamadas de" },
  taggedVia:         { sv: "Inkommande samtal taggas via webhook-URL:ens",
                       es: "Las llamadas entrantes se etiquetan vía webhook-URL" },
  latestCalls:       { sv: "Senaste samtal",            es: "Llamadas recientes" },
  emptyMatchPre:     { sv: "Samtal som matchas mot",    es: "Las llamadas que coincidan con" },
  emptyMatchPost:    { sv: "visas här. Klicka på",      es: "se mostrarán aquí. Haz clic en" },
  emptyMatchEnd:     { sv: "för att testa flödet.",     es: "para probar el flujo." },

  // ── Buttons ───────────────────────────────────────────────────────────
  simulating:        { sv: "Simulerar…",                es: "Simulando…" },
  simulateCall:      { sv: "Simulera samtal",           es: "Simular llamada" },
  clearing:          { sv: "Rensar…",                   es: "Borrando…" },
  clearCalls:        { sv: "Rensa samtal",              es: "Borrar llamadas" },
  clearConfirm:      { sv: "Rensa alla samtal?",        es: "¿Borrar todas las llamadas?" },
} as const;

export type StringKey = keyof typeof strings;

/** Get a translated string. Falls back to Swedish if key is missing. */
export function t(key: StringKey, lang: Lang = "sv"): string {
  return strings[key]?.[lang] ?? strings[key]?.sv ?? key;
}

/** Get the full dictionary for a language (for passing to client components). */
export function getStrings(lang: Lang): Record<StringKey, string> {
  const result = {} as Record<StringKey, string>;
  for (const key of Object.keys(strings) as StringKey[]) {
    result[key] = strings[key][lang] ?? strings[key].sv;
  }
  return result;
}
