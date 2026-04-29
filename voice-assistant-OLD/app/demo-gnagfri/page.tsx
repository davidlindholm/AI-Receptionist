import { BusinessLandingPage, type BusinessConfig } from "@/components/BusinessLandingPage";

const gnagfriConfig: BusinessConfig = {
  brand: {
    name: "GnagFri Skadedjur AB",
    short: "G",
    logoText: "GnagFri",
    phone: "08-555 56 78",
    email: "info@gnagfri.se",
    address: "Bekämpningsvägen 5, 117 90 Stockholm",
    addressShort: "Bekämpningsvägen 5, Stockholm",
    cityRegion: "Stockholm",
  },
  colors: {
    primary: "#92400e",
    accent: "#65a30d",
    accentHover: "#4d7c0f",
  },
  hero: {
    image: "https://picsum.photos/seed/gnagfri-hero/1920/1080",
    eyebrow: "GnagFri Skadedjur AB",
    title: "Din skadedjurstekniker i Stockholm",
    body: "Akut skadedjursbekämpning, förebyggande kontroll och servicekontrakt för företag. Vi är certifierade skadedjurstekniker med fokus på effektiva och miljömedvetna lösningar.",
    cta: "Kontakta oss",
  },
  about: {
    leftTitle: "Erfaren skadedjurstekniker",
    leftParagraphs: [
      "På GnagFri har vi specialiserat oss på skadedjurskontroll och bekämpning. Vi hjälper både privatpersoner och företag att bli av med oönskade besökare.",
      "Våra tekniker är certifierade och utbildade enligt branschens krav — vi arbetar effektivt, säkert och med stor respekt för miljön och våra kunder.",
      "Snabbhet, diskretion och hållbara lösningar är våra ledord. Vi tar hand om problemet och förebygger att det kommer tillbaka.",
    ],
    rightTitle: "Lokal aktör i Stockholm",
    rightParagraphs: [
      "Som en lokal skadedjursfirma i Stockholm finns vi nära till hands och rycker ut snabbt när det behövs — dygnet runt vid akuta ärenden.",
      "Vi har långvariga samarbeten med restauranger, livsmedelsbutiker, fastighetsägare och bostadsrättsföreningar i hela Stockholmsregionen.",
      "Vill du veta mer om vad vi kan göra för dig? Hör av dig så berättar vi gärna mer om våra metoder och servicekontrakt.",
    ],
  },
  services: {
    sectionTitle: "Våra skadedjurstjänster",
    sectionSubtitle: "Effektiv kontroll och bekämpning under ett tak",
    items: [
      {
        img: "https://picsum.photos/seed/gnagfri-s1/800/600",
        title: "Skadedjursjour",
        desc: "Akut skadedjurstjänst dygnet runt — vi rycker ut snabbt vid akuta angrepp i hem, restauranger och företagslokaler.",
      },
      {
        img: "https://picsum.photos/seed/gnagfri-s2/800/600",
        title: "Skadedjurskontroll",
        desc: "Förebyggande inspektion och kontroll av fastigheter för att upptäcka tecken på skadedjur innan de blir ett problem.",
      },
      {
        img: "https://picsum.photos/seed/gnagfri-s3/800/600",
        title: "Råttbekämpning",
        desc: "Effektiv hantering av råttor med moderna metoder — vi lokaliserar bon, tätar ingångsvägar och eliminerar problemet säkert.",
      },
      {
        img: "https://picsum.photos/seed/gnagfri-s4/800/600",
        title: "Mössbekämpning",
        desc: "Diskret kontroll av möss i bostäder, kontor och vindar. Vi använder metoder som är effektiva och säkra för dig.",
      },
      {
        img: "https://picsum.photos/seed/gnagfri-s5/800/600",
        title: "Insektssanering",
        desc: "Hantering av kackerlackor, vägglöss, myror och andra insekter — fackmannamässigt och med långsiktig effekt.",
      },
      {
        img: "https://picsum.photos/seed/gnagfri-s6/800/600",
        title: "Servicekontrakt",
        desc: "Löpande övervakning och kontroll för företag inom restaurang, livsmedel, lager och fastighet — för full trygghet året om.",
      },
    ],
  },
  dialog: {
    title: "Diskret och effektiv hjälp",
    paragraphs: [
      "När du anlitar GnagFri kan du lita på en diskret och professionell service där vi tar hand om problemet snabbt och effektivt — utan att störa din vardag.",
      "Hör av dig om du vill veta mer om hur vi kan hjälpa dig att bli av med skadedjur eller förebygga att de kommer tillbaka.",
    ],
    bullets: [
      "Certifierade skadedjurstekniker",
      "Kostnadsfri inspektion och offert",
      "Jouravtal för företag och fastighetsägare",
      "Garanti på utfört arbete",
    ],
    teamImage: "https://picsum.photos/seed/gnagfri-team/1200/720",
    quote: "Vi löser problemet — diskret och effektivt",
    ownerName: "Johan Gnagström",
    ownerTitle: "Grundare, GnagFri Skadedjur AB",
  },
  quoteForm: {
    intro: "Önskar du ta del av priser och mer detaljerade uppgifter kring våra tjänster är du välkommen att kontakta oss.",
    serviceOptions: [
      "Skadedjursjour",
      "Skadedjurskontroll",
      "Råttbekämpning",
      "Mössbekämpning",
      "Insektssanering",
      "Servicekontrakt",
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
    certs: ["Certifierad skadedjurstekniker", "Naturvårdsverket", "F-skattsedel", "Miljöcertifierad"],
    year: 2026,
  },
  slug: "gnagfri",
  agentId: "assistant-a9b6620f-7d24-4b7b-9f3f-aa6dd69df797",
};

export default function DemoGnagfriPage() {
  return <BusinessLandingPage config={gnagfriConfig} />;
}
