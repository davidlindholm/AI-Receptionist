/**
 * Registry of all demo companies.
 * Used by the admin page, per-company dashboards, and demo pages.
 */
export interface Company {
  slug: string;
  name: string;
  industry: string;           // Short industry label (shown in dashboards + admin)
  serviceType: string;        // Matches service_type in leads table
  demoPath: string;           // e.g. "/demo-rormastarna"
  primaryColor: string;       // Brand primary colour (hex)
  accentColor: string;        // Brand accent/CTA colour (hex)
  description: string;        // One-line description for admin page
  assistantId: string;        // Telnyx AI Assistant id (used to tag inbound calls)
  language?: "sv" | "es";     // Voice/transcription language (default: "sv")
}

export const COMPANIES: Company[] = [
  {
    slug: "nimoz",
    name: "Nimoz Elinstallation AB",
    industry: "El",
    serviceType: "El",
    demoPath: "/demo-nimoz",
    primaryColor: "#018bd3",
    accentColor: "#229380",
    description: "Elinstallation, laddboxar, smarthome och industrielektriker",
    assistantId: "assistant-1187a5d8-a489-4e2b-b67c-c817d556df0a",
  },
  {
    slug: "rormastarna",
    name: "Rörmästarna AB",
    industry: "VVS",
    serviceType: "VVS",
    demoPath: "/demo-rormastarna",
    primaryColor: "#0369a1",
    accentColor: "#0d9488",
    description: "VVS-jour, avloppsspolning, relining, isolering och fuktskador",
    assistantId: "assistant-558150cf-8121-4295-bc67-dfa73f7166e4",
  },
  {
    slug: "voltaberg",
    name: "Voltaberg El AB",
    industry: "El",
    serviceType: "El",
    demoPath: "/demo-voltaberg",
    primaryColor: "#f59e0b",
    accentColor: "#1f2937",
    description: "Eljour, svagström, elinstallation, laddstationer och belysning",
    assistantId: "assistant-433ea44d-ba67-4569-9705-5ef7578215ea",
  },
  {
    slug: "nordlas",
    name: "NordLås Säkerhet AB",
    industry: "Lås / Säkerhet",
    serviceType: "Lås",
    demoPath: "/demo-nordlas",
    primaryColor: "#475569",
    accentColor: "#dc2626",
    description: "Låsjour, låsbyte, säkerhetsdörrar, larm och nyckelservice",
    assistantId: "assistant-bcc5e597-ccc4-4e6e-9851-5317299dbd2a",
  },
  {
    slug: "bosaker",
    name: "BoSäker Fastighetsservice AB",
    industry: "Fastighetsservice",
    serviceType: "Fastighetsservice",
    demoPath: "/demo-bosaker",
    primaryColor: "#15803d",
    accentColor: "#0d9488",
    description: "Fastighetsjour, störningsjour, spol-sug och drift & underhåll",
    assistantId: "assistant-84b46545-cf19-44a4-b2c3-dc05dac46752",
  },
  {
    slug: "gnagfri",
    name: "GnagFri Skadedjur AB",
    industry: "Skadedjur",
    serviceType: "Skadedjur",
    demoPath: "/demo-gnagfri",
    primaryColor: "#92400e",
    accentColor: "#65a30d",
    description: "Skadedjursjour, rått- och mössbekämpning och servicekontrakt",
    assistantId: "assistant-a9b6620f-7d24-4b7b-9f3f-aa6dd69df797",
  },
  {
    slug: "vaktnorden",
    name: "Vaktnorden Bevakning AB",
    industry: "Bevakning",
    serviceType: "Bevakning",
    demoPath: "/demo-vaktnorden",
    primaryColor: "#1e3a8a",
    accentColor: "#ca8a04",
    description: "Trygghetsbevakning, vaktmästeri, larmuttryckning och värdetransporter",
    assistantId: "assistant-0bb93f30-bfff-427f-945b-a886ed009f0c",
  },
  {
    slug: "renluft",
    name: "RenLuft Sanering AB",
    industry: "Sanering",
    serviceType: "Sanering",
    demoPath: "/demo-renluft",
    primaryColor: "#0e7490",
    accentColor: "#475569",
    description: "Fuktsanering, vattenskadesanering, avfuktning och mögelsanering",
    assistantId: "assistant-240abcbf-1a34-481c-99b8-33393d12f3c1",
  },
  {
    slug: "eljardin",
    name: "El Jardín Restaurante",
    industry: "Restaurante",
    serviceType: "Restaurante",
    demoPath: "/demo-eljardin",
    primaryColor: "#b45309",
    accentColor: "#dc2626",
    description: "Cocina mediterránea, eventos privados, catering y reservaciones",
    assistantId: "assistant-86028a93-29e4-4dc7-9327-7569fd198db6",
    language: "es",
  },
  {
    slug: "belleza-latina",
    name: "Belleza Latina Estética",
    industry: "Estética",
    serviceType: "Estética",
    demoPath: "/demo-belleza-latina",
    primaryColor: "#be185d",
    accentColor: "#7c3aed",
    description: "Tratamientos faciales, corporales, uñas, depilación y maquillaje",
    assistantId: "assistant-3e082d5d-4922-40dd-9203-046fa086a781",
    language: "es",
  },
  {
    slug: "lacasadelasalsa",
    name: "La Casa de la Salsa Latin Room",
    industry: "Club nocturno",
    serviceType: "Club nocturno",
    demoPath: "/demo-lacasadelasalsa",
    primaryColor: "#dc2626",
    accentColor: "#f59e0b",
    description: "Club nocturno de salsa latina en Querétaro — música en vivo, ambiente vibrante",
    assistantId: "TODO_TELNYX_AGENT_ID",
    language: "es",
  },
];

export function getCompany(slug: string): Company | undefined {
  return COMPANIES.find((c) => c.slug === slug);
}

/** Reverse-lookup: Telnyx assistant id → Company. */
export function getCompanyByAssistantId(
  assistantId: string | null | undefined
): Company | undefined {
  if (!assistantId) return undefined;
  return COMPANIES.find((c) => c.assistantId === assistantId);
}
