import { BusinessLandingPage, type BusinessConfig } from "@/components/BusinessLandingPage";

const bosakerConfig: BusinessConfig = {
  brand: {
    name: "BoSäker Fastighetsservice AB",
    short: "B",
    logoText: "BoSäker",
    phone: "08-555 45 67",
    email: "info@bosaker.se",
    address: "Förvaltningsvägen 12, 116 20 Stockholm",
    addressShort: "Förvaltningsvägen 12, Stockholm",
    cityRegion: "Stockholm",
  },
  colors: {
    primary: "#15803d",
    accent: "#0d9488",
    accentHover: "#0f766e",
  },
  hero: {
    image: "https://picsum.photos/seed/bosaker-hero/1920/1080",
    eyebrow: "BoSäker Fastighetsservice AB",
    title: "Din partner för fastighetsservice",
    body: "Akut fastighetsjour, störningshantering, spol- och sugtjänster samt löpande drift och underhåll. Vi tar hand om din fastighet så att du kan fokusera på det som är viktigt.",
    cta: "Kontakta oss",
  },
  about: {
    leftTitle: "Komplett fastighetsservice",
    leftParagraphs: [
      "På BoSäker erbjuder vi en komplett fastighetsservice för bostadsrättsföreningar, fastighetsägare och företag i hela Stockholmsregionen.",
      "Våra serviceteknikrar har lång erfarenhet och kompetens inom alla områden — från akuta utryckningar till löpande drift och förebyggande underhåll.",
      "Tillgänglighet, kvalitet och nöjda kunder är vad vi arbetar för varje dag. Du som kund ska känna dig trygg med oss som leverantör.",
    ],
    rightTitle: "Lokal aktör i Stockholm",
    rightParagraphs: [
      "Som en lokal fastighetsservice i Stockholm finns vi alltid nära. Vi har personal i beredskap dygnet runt och rycker ut snabbt när det behövs.",
      "Vi har skapat långsiktiga samarbeten med många bostadsrättsföreningar och fastighetsägare i regionen.",
      "Vill du veta mer om vad vi kan erbjuda din fastighet? Hör av dig så berättar vi gärna mer.",
    ],
  },
  services: {
    sectionTitle: "Våra fastighetstjänster",
    sectionSubtitle: "Trygg drift och service för din fastighet",
    items: [
      {
        img: "https://picsum.photos/seed/bosaker-s1/800/600",
        title: "Fastighetsjour",
        desc: "Akut fastighetsservice dygnet runt — vi rycker ut snabbt vid läckor, elavbrott och andra problem som kräver omedelbar åtgärd.",
      },
      {
        img: "https://picsum.photos/seed/bosaker-s2/800/600",
        title: "Störningsjour",
        desc: "Professionell hantering av störningar i fastigheten — vi tar hand om ärendet diskret, snabbt och med fokus på trivsel för alla.",
      },
      {
        img: "https://picsum.photos/seed/bosaker-s3/800/600",
        title: "Spol- och sugtjänster",
        desc: "Effektiv spolning av avlopp och sugbilstjänster för slamsugning, ledningsrensning och tömning av brunnar.",
      },
      {
        img: "https://picsum.photos/seed/bosaker-s4/800/600",
        title: "Drift och underhåll",
        desc: "Löpande drift av fastighetens tekniska system — uppvärmning, ventilation, vatten och belysning. Vi håller allt i toppform.",
      },
      {
        img: "https://picsum.photos/seed/bosaker-s5/800/600",
        title: "Trappstädning",
        desc: "Regelbunden städning av allmänna ytor som trapphus, entréer och tvättstugor — för en trivsam miljö året om.",
      },
      {
        img: "https://picsum.photos/seed/bosaker-s6/800/600",
        title: "Snöröjning",
        desc: "Vinterunderhåll och halkbekämpning på gångvägar, parkeringar och innergårdar — så att ingen halkar och allt fungerar.",
      },
    ],
  },
  dialog: {
    title: "Trygg och tillgänglig service",
    paragraphs: [
      "När du anlitar BoSäker får du en pålitlig fastighetsservice där tillgänglighet och tydlig kommunikation är centralt. Vi finns där när du behöver oss.",
      "Hör av dig om du vill veta mer om hur vi kan ta hand om din fastighet och underlätta vardagen för dig.",
    ],
    bullets: [
      "Certifierade serviceteknikrar",
      "Kostnadsfri behovsanalys",
      "Jouravtal med snabb responstid",
      "Långsiktiga avtal med trygghetsgaranti",
    ],
    teamImage: "https://picsum.photos/seed/bosaker-team/1200/720",
    quote: "Vi tar hand om din fastighet — dygnet runt",
    ownerName: "Linda Bosund",
    ownerTitle: "Grundare, BoSäker Fastighetsservice AB",
  },
  quoteForm: {
    intro: "Önskar du ta del av priser och mer detaljerade uppgifter kring våra tjänster är du välkommen att kontakta oss.",
    serviceOptions: [
      "Fastighetsjour",
      "Störningsjour",
      "Spol- och sugtjänster",
      "Drift och underhåll",
      "Trappstädning",
      "Snöröjning",
    ],
  },
  aiSection: {
    title: "Vi missar aldrig ett samtal",
    body: "Vår AI-receptionist svarar direkt — oavsett om det är mitt på natten eller om vi är ute på ett uppdrag. Den samlar in dina uppgifter och meddelar oss omedelbart. Du slipper vänta, vi slipper missa kunder.",
    bullets: [
      "Svarar på svenska dygnet runt",
      "Identifierar brådskande ärenden automatiskt",
      "Skickar notifiering till oss direkt",
      "Du får alltid en snabb återkoppling",
    ],
  },
  footer: {
    certs: ["Auktoriserad fastighetsservice", "F-skattsedel", "Säker arbetsmiljö", "Kvalitetscertifierad"],
    year: 2026,
  },
  slug: "bosaker",
  agentId: "assistant-84b46545-cf19-44a4-b2c3-dc05dac46752",
};

export default function DemoBosakerPage() {
  return <BusinessLandingPage config={bosakerConfig} />;
}
