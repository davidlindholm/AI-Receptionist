import { BusinessLandingPage, type BusinessConfig } from "@/components/BusinessLandingPage";

const voltabergConfig: BusinessConfig = {
  brand: {
    name: "Voltaberg El AB",
    short: "V",
    logoText: "Voltaberg El",
    phone: "08-555 23 45",
    email: "info@voltaberg.se",
    address: "Strömgatan 7, 113 30 Stockholm",
    addressShort: "Strömgatan 7, Stockholm",
    cityRegion: "Stockholm",
  },
  colors: {
    primary: "#f59e0b",
    accent: "#1f2937",
    accentHover: "#111827",
  },
  hero: {
    image: "https://picsum.photos/seed/voltaberg-hero/1920/1080",
    eyebrow: "Voltaberg El AB",
    title: "Din elektriker i Stockholm",
    body: "Akut eljour, svagströmsinstallationer och kompletta elinstallationer för bostäder, kontor och industri. Vi är auktoriserade elinstallatörer med fokus på säkerhet, kvalitet och tydlig kommunikation.",
    cta: "Kontakta oss",
  },
  about: {
    leftTitle: "Auktoriserad elfirma",
    leftParagraphs: [
      "På Voltaberg har vi lång erfarenhet inom el och elinstallation. Vi utför allt från enklare serviceuppdrag till kompletta nyinstallationer.",
      "Våra elektriker är auktoriserade enligt Elsäkerhetsverkets krav och arbetar alltid enligt gällande branschregler och säkerhetsstandarder.",
      "Vi tror på personlig service, tydliga offerter och hög kvalitet. Du som kund ska känna dig trygg med vårt arbete från start till mål.",
    ],
    rightTitle: "Lokal elfirma i Stockholm",
    rightParagraphs: [
      "Vi är en lokal elfirma med utgångspunkt från Stockholm och utför uppdrag i hela länet — för privatpersoner, företag och bostadsrättsföreningar.",
      "Med flera års branscherfarenhet har vi byggt upp ett stort kontaktnät och samarbetar med både fastighetsägare och byggentreprenörer.",
      "Vill du veta mer om vad vi kan göra för dig? Hör av dig så berättar våra elektriker gärna mer.",
    ],
  },
  services: {
    sectionTitle: "Våra eltjänster",
    sectionSubtitle: "Allt inom el och elinstallation under ett tak",
    items: [
      {
        img: "https://picsum.photos/seed/voltaberg-s1/800/600",
        title: "Eljour",
        desc: "Akut eltjänst dygnet runt — vi rycker ut snabbt vid strömavbrott, brända säkringar och andra brådskande elproblem.",
      },
      {
        img: "https://picsum.photos/seed/voltaberg-s2/800/600",
        title: "Svagström",
        desc: "Installation av lågspänningsystem för larm, kommunikation, brandlarm och datakommunikation i hem och företag.",
      },
      {
        img: "https://picsum.photos/seed/voltaberg-s3/800/600",
        title: "Elinstallation",
        desc: "Kompletta elinstallationer för nybyggnation och renovering — från projektering och dragning till anslutning och dokumentation.",
      },
      {
        img: "https://picsum.photos/seed/voltaberg-s4/800/600",
        title: "Felsökning",
        desc: "Snabb och noggrann diagnostik av elfel — vi hittar orsaken och åtgärdar den, så att du kan känna dig trygg igen.",
      },
      {
        img: "https://picsum.photos/seed/voltaberg-s5/800/600",
        title: "Laddstationer",
        desc: "Installation av laddboxar och laddstationer för elbilar, både för privatpersoner och företag — fackmannamässigt och säkert.",
      },
      {
        img: "https://picsum.photos/seed/voltaberg-s6/800/600",
        title: "Belysning",
        desc: "Modern belysningsdesign och installation för inomhus och utomhus — energieffektivt, snyggt och anpassat efter dina behov.",
      },
    ],
  },
  dialog: {
    title: "Säkerhet och kvalitet i fokus",
    paragraphs: [
      "När du anlitar Voltaberg får du en trygg och säker installation där allt arbete utförs enligt gällande regelverk. Vi dokumenterar och kvalitetssäkrar varje uppdrag.",
      "Vår filosofi är enkel: öppen kommunikation, tydliga priser och hög kvalitet. Det ska kännas tryggt att anlita oss.",
    ],
    bullets: [
      "Auktoriserade elinstallatörer",
      "Kostnadsfri offert och behovsanalys",
      "Jouravtal för privat- och företagskunder",
      "5 års garanti på utfört arbete",
    ],
    teamImage: "https://picsum.photos/seed/voltaberg-team/1200/720",
    quote: "Vi svarar alltid — även när vi är ute på jobb",
    ownerName: "Anna Voltaberg",
    ownerTitle: "Grundare, Voltaberg El AB",
  },
  quoteForm: {
    intro: "Önskar du ta del av priser och mer detaljerade uppgifter kring våra tjänster är du välkommen att kontakta oss.",
    serviceOptions: [
      "Eljour",
      "Svagström",
      "Elinstallation",
      "Felsökning",
      "Laddstationer",
      "Belysning",
    ],
  },
  aiSection: {
    title: "Vi missar aldrig ett samtal",
    body: "Vår AI-receptionist svarar direkt — oavsett om det är mitt på natten eller om vi är mitt i ett jobb. Den samlar in dina uppgifter och meddelar oss omedelbart. Du slipper vänta, vi slipper missa kunder.",
    bullets: [
      "Svarar på svenska dygnet runt",
      "Identifierar brådskande ärenden automatiskt",
      "Skickar notifiering till oss direkt",
      "Du får alltid en snabb återkoppling",
    ],
  },
  footer: {
    certs: ["Auktoriserad elfirma", "Elsäkerhetsverket", "F-skattsedel", "Rot-avdrag"],
    year: 2026,
  },
  slug: "voltaberg",
  agentId: "assistant-433ea44d-ba67-4569-9705-5ef7578215ea",
};

export default function DemoVoltabergPage() {
  return <BusinessLandingPage config={voltabergConfig} />;
}
