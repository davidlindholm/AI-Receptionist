import { BusinessLandingPage, type BusinessConfig } from "@/components/BusinessLandingPage";

const rormastarnaConfig: BusinessConfig = {
  brand: {
    name: "Rörmästarna AB",
    short: "R",
    logoText: "Rörmästarna",
    phone: "08-555 12 34",
    email: "info@rormastarna.se",
    address: "Industrigatan 14, 112 67 Stockholm",
    addressShort: "Industrigatan 14, Stockholm",
    cityRegion: "Stockholm",
  },
  colors: {
    primary: "#0369a1",
    accent: "#0d9488",
    accentHover: "#0f766e",
  },
  hero: {
    image: "https://picsum.photos/seed/rormastarna-hero/1920/1080",
    eyebrow: "Rörmästarna AB",
    title: "Din VVS-partner i Stockholm",
    body: "Akut VVS-jour, avloppsspolning, relining och fuktskadesanering. Vi är auktoriserade VVS-montörer med över 25 års erfarenhet av allt från enklare reparationer till stambyten och stora projekt.",
    cta: "Kontakta oss",
  },
  about: {
    leftTitle: "Erfaren VVS-firma",
    leftParagraphs: [
      "På Rörmästarna har vi mångårig erfarenhet inom VVS och vi erbjuder ett komplett utbud av tjänster för både privatpersoner och företag.",
      "Våra auktoriserade VVS-montörer arbetar alltid enligt branschreglerna Säker Vatten och garanterar ett tryggt och professionellt utfört arbete.",
      "Precision, kvalitet och kundnöjdhet är ledord i vår verksamhet. Anlita oss och du är garanterad förstklassig service.",
    ],
    rightTitle: "Lokal aktör i Stockholm",
    rightParagraphs: [
      "Som en seriös VVS-firma i Stockholmsregionen har vi byggt upp ett stort kontaktnät och samarbetar gärna med fastighetsägare och bostadsrättsföreningar.",
      "Vi erbjuder våra tjänster i hela Stockholms län med utgångspunkt från vår verkstad i centrala Stockholm.",
      "Vill du veta mer om hur vi kan hjälpa dig? Hör av dig så berättar våra rörmokare gärna mer om våra tjänster och arbetssätt.",
    ],
  },
  services: {
    sectionTitle: "Våra VVS-tjänster",
    sectionSubtitle: "Allt inom vatten, värme och sanitet under ett tak",
    items: [
      {
        img: "https://picsum.photos/seed/rormastarna-s1/800/600",
        title: "VVS-jour",
        desc: "Akut VVS-tjänst dygnet runt — vi rycker ut snabbt vid vattenläckor, stopp i avlopp och andra brådskande problem.",
      },
      {
        img: "https://picsum.photos/seed/rormastarna-s2/800/600",
        title: "Avloppsspolning & TV-inspektion",
        desc: "Effektiv rensning av igensatta avlopp och kamerainspektion för att lokalisera och dokumentera fel i ledningarna.",
      },
      {
        img: "https://picsum.photos/seed/rormastarna-s3/800/600",
        title: "Relining",
        desc: "Modern rörrenovering utan schaktning — vi förnyar dina avloppsrör inifrån, snabbt och utan stora ingrepp i fastigheten.",
      },
      {
        img: "https://picsum.photos/seed/rormastarna-s4/800/600",
        title: "Isolering",
        desc: "Värmeisolering av rör, ledningar och kanaler för att minska energiförluster och förebygga frostskador på vintern.",
      },
      {
        img: "https://picsum.photos/seed/rormastarna-s5/800/600",
        title: "Svetsning",
        desc: "Professionell svetsning av stål- och kopparrör för installationer i fastigheter, industri och processanläggningar.",
      },
      {
        img: "https://picsum.photos/seed/rormastarna-s6/800/600",
        title: "Fuktskador",
        desc: "Vi hjälper dig vid skador orsakade av fukt — från utredning och torkning till åtgärder och återställning.",
      },
    ],
  },
  dialog: {
    title: "Trygg och kvalitetssäkrad service",
    paragraphs: [
      "När du anlitar Rörmästarna kan du lita på en trygg service där transparens är A och O. Vi för alltid en nära dialog med våra kunder före, under och efter utförandet.",
      "Det ska helt enkelt kännas tryggt att anlita oss. Hör av dig om du vill veta mer om våra tjänster och hur vi arbetar.",
    ],
    bullets: [
      "Auktoriserade VVS-montörer enligt Säker Vatten",
      "Kostnadsfri offert och besiktning",
      "Jouravtal för privat- och företagskunder",
      "5 års garanti på utfört arbete",
    ],
    teamImage: "https://picsum.photos/seed/rormastarna-team/1200/720",
    quote: "Vi svarar dygnet runt — alltid när du behöver oss",
    ownerName: "Erik Rörmästare",
    ownerTitle: "Grundare, Rörmästarna AB",
  },
  quoteForm: {
    intro: "Önskar du ta del av priser och mer detaljerade uppgifter kring våra tjänster är du välkommen att kontakta oss.",
    serviceOptions: [
      "VVS-jour",
      "Avloppsspolning & TV-inspektion",
      "Relining",
      "Isolering",
      "Svetsning",
      "Fuktskador",
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
    certs: ["Säker Vatten", "Auktoriserad VVS-firma", "F-skattsedel", "Rot-avdrag"],
    year: 2026,
  },
  slug: "rormastarna",
  agentId: "assistant-558150cf-8121-4295-bc67-dfa73f7166e4",
};

export default function DemoRormastarnaPage() {
  return <BusinessLandingPage config={rormastarnaConfig} />;
}
