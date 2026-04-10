import { BusinessLandingPage, type BusinessConfig } from "@/components/BusinessLandingPage";

const vaktnordenConfig: BusinessConfig = {
  brand: {
    name: "Vaktnorden Bevakning AB",
    short: "V",
    logoText: "Vaktnorden",
    phone: "08-555 67 89",
    email: "info@vaktnorden.se",
    address: "Vaktgatan 18, 118 40 Stockholm",
    addressShort: "Vaktgatan 18, Stockholm",
    cityRegion: "Stockholm",
  },
  colors: {
    primary: "#1e3a8a",
    accent: "#ca8a04",
    accentHover: "#a16207",
  },
  hero: {
    image: "https://picsum.photos/seed/vaktnorden-hero/1920/1080",
    eyebrow: "Vaktnorden Bevakning AB",
    title: "Trygghet och säkerhet i Stockholm",
    body: "Trygghetsbevakning, vaktmästeri och larmuttryckning för bostäder, företag och evenemang. Vi är certifierade väktare med fokus på personlig service och hög närvaro.",
    cta: "Kontakta oss",
  },
  about: {
    leftTitle: "Erfaren bevakningsfirma",
    leftParagraphs: [
      "På Vaktnorden har vi mångårig erfarenhet inom bevakning och säkerhet. Vi erbjuder skräddarsydda lösningar för både privatpersoner och företag.",
      "Våra väktare är certifierade enligt Länsstyrelsens krav och utbildade för att hantera alla typer av situationer — från löpande tillsyn till akuta händelser.",
      "Trygghet, professionalism och personlig service är våra ledord. Vi finns där för dig — alltid.",
    ],
    rightTitle: "Lokal aktör i Stockholm",
    rightParagraphs: [
      "Som en lokal bevakningsfirma i Stockholm har vi god kännedom om regionen och samarbetar med polis, fastighetsägare och företag i hela länet.",
      "Vi har personal i beredskap dygnet runt och rycker ut snabbt vid larm — vår responstid är bland de bästa i branschen.",
      "Vill du veta mer om hur vi kan stärka din säkerhet? Hör av dig så berättar vi gärna mer om våra tjänster.",
    ],
  },
  services: {
    sectionTitle: "Våra bevakningstjänster",
    sectionSubtitle: "Trygghet och säkerhet under ett tak",
    items: [
      {
        img: "https://picsum.photos/seed/vaktnorden-s1/800/600",
        title: "Trygghetsbevakning",
        desc: "Säker och kontinuerlig bevakning av fastigheter, områden och anläggningar — för en tryggare vardag och företagsmiljö.",
      },
      {
        img: "https://picsum.photos/seed/vaktnorden-s2/800/600",
        title: "Vaktmästeri",
        desc: "Personlig vaktmästarservice för fastigheter och företag — vi tar hand om det praktiska så att du kan fokusera på annat.",
      },
      {
        img: "https://picsum.photos/seed/vaktnorden-s3/800/600",
        title: "Områdesbevakning",
        desc: "Patrullering av bostadsområden, parkeringar och industrifastigheter — synlig närvaro som avskräcker och tryggar.",
      },
      {
        img: "https://picsum.photos/seed/vaktnorden-s4/800/600",
        title: "Larmuttryckning",
        desc: "Snabb och professionell respons vid larm dygnet runt — våra väktare är på plats inom minuter och hanterar situationen säkert.",
      },
      {
        img: "https://picsum.photos/seed/vaktnorden-s5/800/600",
        title: "Evenemangsbevakning",
        desc: "Säkerhet vid arrangemang, mässor och konserter — vi planerar och genomför bevakningen så att alla kan känna sig trygga.",
      },
      {
        img: "https://picsum.photos/seed/vaktnorden-s6/800/600",
        title: "Värdetransporter",
        desc: "Säker transport av värdesaker, kontanter och dokument med våra utbildade väktare och bepansrade fordon.",
      },
    ],
  },
  dialog: {
    title: "Pålitlig och professionell bevakning",
    paragraphs: [
      "När du anlitar Vaktnorden får du en trygg och professionell bevakning där säkerhet och diskretion är våra främsta värden. Vi arbetar lyhört och målinriktat.",
      "Hör av dig om du vill veta mer om hur vi kan hjälpa dig att skapa en tryggare miljö för dig, dina anhöriga eller dina kunder och anställda.",
    ],
    bullets: [
      "Certifierade och utbildade väktare",
      "Kostnadsfri säkerhetsbedömning",
      "Jourtjänst med snabb responstid",
      "Skräddarsydda lösningar för dina behov",
    ],
    teamImage: "https://picsum.photos/seed/vaktnorden-team/1200/720",
    quote: "Trygghet börjar med närvaro — vi finns där för dig",
    ownerName: "Karl Vaktström",
    ownerTitle: "Grundare, Vaktnorden Bevakning AB",
  },
  quoteForm: {
    intro: "Önskar du ta del av priser och mer detaljerade uppgifter kring våra tjänster är du välkommen att kontakta oss.",
    serviceOptions: [
      "Trygghetsbevakning",
      "Vaktmästeri",
      "Områdesbevakning",
      "Larmuttryckning",
      "Evenemangsbevakning",
      "Värdetransporter",
    ],
  },
  aiSection: {
    title: "Vi missar aldrig ett samtal",
    body: "Vår AI-receptionist svarar direkt — oavsett om det är mitt på natten eller om vi är ute på uppdrag. Den samlar in dina uppgifter och meddelar oss omedelbart. Du slipper vänta, vi slipper missa kunder.",
    bullets: [
      "Svarar på svenska dygnet runt",
      "Identifierar brådskande ärenden automatiskt",
      "Skickar notifiering till oss direkt",
      "Du får alltid en snabb återkoppling",
    ],
  },
  footer: {
    certs: ["Auktoriserad bevakningsfirma", "Länsstyrelsen", "F-skattsedel", "SSF Stöldskyddsföreningen"],
    year: 2026,
  },
  slug: "vaktnorden",
  agentId: "assistant-0bb93f30-bfff-427f-945b-a886ed009f0c",
};

export default function DemoVaktnordenPage() {
  return <BusinessLandingPage config={vaktnordenConfig} />;
}
