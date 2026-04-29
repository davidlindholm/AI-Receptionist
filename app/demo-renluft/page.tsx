import { BusinessLandingPage, type BusinessConfig } from "@/components/BusinessLandingPage";

const renluftConfig: BusinessConfig = {
  brand: {
    name: "RenLuft Sanering AB",
    short: "R",
    logoText: "RenLuft",
    phone: "08-555 78 90",
    email: "info@renluft.se",
    address: "Saneringsvägen 9, 119 80 Stockholm",
    addressShort: "Saneringsvägen 9, Stockholm",
    cityRegion: "Stockholm",
  },
  colors: {
    primary: "#0e7490",
    accent: "#475569",
    accentHover: "#334155",
  },
  hero: {
    image: "https://picsum.photos/seed/renluft-hero/1920/1080",
    eyebrow: "RenLuft Sanering AB",
    title: "Sanering vid fukt- och vattenskador",
    body: "Akut sanering av fukt- och vattenskador, mögelborttagning och avfuktning av lokaler. Vi är certifierade saneringsteknikrar som hjälper dig att rädda din fastighet — snabbt och effektivt.",
    cta: "Kontakta oss",
  },
  about: {
    leftTitle: "Specialister på sanering",
    leftParagraphs: [
      "På RenLuft har vi specialiserat oss på sanering vid fukt-, vatten- och brandskador. Vi hjälper både privatpersoner och fastighetsägare att återställa skadade utrymmen.",
      "Våra saneringsteknikrar är certifierade och har lång erfarenhet av att hantera komplexa skador med moderna metoder och utrustning.",
      "Snabbhet, noggrannhet och kvalitet är vad vi står för. När en skada har inträffat är varje timme värdefull — vi finns där snabbt.",
    ],
    rightTitle: "Lokal aktör i Stockholm",
    rightParagraphs: [
      "Som en lokal saneringsfirma i Stockholm har vi tillgång till modern utrustning och kan rycka ut dygnet runt vid akuta skador.",
      "Vi samarbetar med försäkringsbolag, fastighetsägare och bostadsrättsföreningar i hela Stockholmsregionen.",
      "Vill du veta mer om hur vi kan hjälpa dig vid en skada? Hör av dig så berättar vi gärna mer om våra metoder och processer.",
    ],
  },
  services: {
    sectionTitle: "Våra saneringstjänster",
    sectionSubtitle: "Effektiv hantering av fukt-, vatten- och brandskador",
    items: [
      {
        img: "https://picsum.photos/seed/renluft-s1/800/600",
        title: "Fuktskadesanering",
        desc: "Hantering av fukt- och mögelskador i bostäder och fastigheter — vi utreder, åtgärdar och förebygger framtida problem.",
      },
      {
        img: "https://picsum.photos/seed/renluft-s2/800/600",
        title: "Vattenskadesanering",
        desc: "Akut sanering vid vattenskador — vi avlägsnar vatten, torkar ut och återställer drabbade ytor till ursprungsskick.",
      },
      {
        img: "https://picsum.photos/seed/renluft-s3/800/600",
        title: "Avfuktning",
        desc: "Industriell avfuktning av källare, källarutrymmen och vinder — för att förebygga mögel och fuktskador på lång sikt.",
      },
      {
        img: "https://picsum.photos/seed/renluft-s4/800/600",
        title: "Mögelsanering",
        desc: "Säker borttagning av mögel med professionella metoder — vi åtgärdar både synligt mögel och dolda angrepp i konstruktioner.",
      },
      {
        img: "https://picsum.photos/seed/renluft-s5/800/600",
        title: "Brandsanering",
        desc: "Sanering efter brand och rök — vi rensar bort sotpartiklar och restaurerar utrymmen så att du kan flytta tillbaka.",
      },
      {
        img: "https://picsum.photos/seed/renluft-s6/800/600",
        title: "Asbestsanering",
        desc: "Säker hantering och bortforsling av asbest enligt gällande regelverk — utfört av certifierade saneringsteknikrar.",
      },
    ],
  },
  dialog: {
    title: "Snabb hjälp när det behövs som mest",
    paragraphs: [
      "När du anlitar RenLuft får du en snabb och pålitlig saneringspartner som tar hand om hela processen — från utredning och åtgärd till slutbesiktning.",
      "Hör av dig om du vill veta mer om hur vi kan hjälpa dig att hantera en skada eller förebygga framtida problem i din fastighet.",
    ],
    bullets: [
      "Certifierade saneringsteknikrar",
      "Kostnadsfri besiktning och utredning",
      "Akut jourtjänst dygnet runt",
      "Samarbete med försäkringsbolag",
    ],
    teamImage: "https://picsum.photos/seed/renluft-team/1200/720",
    quote: "När en skada har skett — varje timme räknas",
    ownerName: "Sara Renström",
    ownerTitle: "Grundare, RenLuft Sanering AB",
  },
  quoteForm: {
    intro: "Önskar du ta del av priser och mer detaljerade uppgifter kring våra tjänster är du välkommen att kontakta oss.",
    serviceOptions: [
      "Fuktskadesanering",
      "Vattenskadesanering",
      "Avfuktning",
      "Mögelsanering",
      "Brandsanering",
      "Asbestsanering",
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
    certs: ["Certifierad saneringsfirma", "Saneringsbranschen", "F-skattsedel", "Försäkringsgodkänd"],
    year: 2026,
  },
  slug: "renluft",
  agentId: "assistant-240abcbf-1a34-481c-99b8-33393d12f3c1",
};

export default function DemoRenluftPage() {
  return <BusinessLandingPage config={renluftConfig} />;
}
