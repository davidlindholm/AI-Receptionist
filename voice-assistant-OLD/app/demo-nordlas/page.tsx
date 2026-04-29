import { BusinessLandingPage, type BusinessConfig } from "@/components/BusinessLandingPage";

const nordlasConfig: BusinessConfig = {
  brand: {
    name: "NordLås Säkerhet AB",
    short: "N",
    logoText: "NordLås",
    phone: "08-555 34 56",
    email: "info@nordlas.se",
    address: "Säkerhetsvägen 22, 114 50 Stockholm",
    addressShort: "Säkerhetsvägen 22, Stockholm",
    cityRegion: "Stockholm",
  },
  colors: {
    primary: "#475569",
    accent: "#dc2626",
    accentHover: "#b91c1c",
  },
  hero: {
    image: "https://picsum.photos/seed/nordlas-hero/1920/1080",
    eyebrow: "NordLås Säkerhet AB",
    title: "Din låssmed och säkerhetspartner",
    body: "Akut låsöppning dygnet runt, byte och installation av lås, säkerhetsdörrar och larm. Vi är certifierade låssmeder med specialisering på trygghet och säkerhet för hem och företag.",
    cta: "Kontakta oss",
  },
  about: {
    leftTitle: "Erfaren låssmed",
    leftParagraphs: [
      "På NordLås har vi specialiserat oss på lås, säkerhetsdörrar och inbrottsskydd. Vi erbjuder helhetslösningar för både privatpersoner och företag.",
      "Våra låssmeder är certifierade och har lång erfarenhet av allt från enklare nyckelproblem till kompletta säkerhetsinstallationer i fastigheter.",
      "Trygghet, snabbhet och pålitlighet är våra ledord. Du som kund ska känna dig säker med vårt arbete.",
    ],
    rightTitle: "Lokal aktör i Stockholm",
    rightParagraphs: [
      "Som en lokal låssmedsfirma i Stockholm finns vi alltid nära till hands — vår jourbil rycker ut snabbt vid akuta ärenden.",
      "Vi erbjuder våra tjänster i hela Stockholms län och samarbetar med fastighetsägare, bostadsrättsföreningar och företag.",
      "Vill du veta mer om hur vi kan stärka din säkerhet? Hör av dig så berättar vi gärna mer om våra lösningar.",
    ],
  },
  services: {
    sectionTitle: "Våra lås- och säkerhetstjänster",
    sectionSubtitle: "Trygghet och säkerhet under ett tak",
    items: [
      {
        img: "https://picsum.photos/seed/nordlas-s1/800/600",
        title: "Låsjour",
        desc: "Akut låsöppning dygnet runt — vi hjälper dig snabbt om du har låst dig ute eller tappat bort dina nycklar.",
      },
      {
        img: "https://picsum.photos/seed/nordlas-s2/800/600",
        title: "Låsbyte & installation",
        desc: "Byte och installation av lås av alla typer — från enklare bostadslås till avancerade säkerhetslås för företag.",
      },
      {
        img: "https://picsum.photos/seed/nordlas-s3/800/600",
        title: "Säkerhetsdörrar",
        desc: "Försäljning och installation av certifierade säkerhetsdörrar — ett av de bästa skydden mot inbrott och oönskade besök.",
      },
      {
        img: "https://picsum.photos/seed/nordlas-s4/800/600",
        title: "Larm & övervakning",
        desc: "Inbrottslarm, brandvarnare och kameraövervakning — vi designar och installerar lösningar som passar dina behov.",
      },
      {
        img: "https://picsum.photos/seed/nordlas-s5/800/600",
        title: "Värdeskåp",
        desc: "Försäljning och installation av värdeskåp och kassaskåp för hem och företag — för säker förvaring av värdesaker.",
      },
      {
        img: "https://picsum.photos/seed/nordlas-s6/800/600",
        title: "Nyckelservice",
        desc: "Nyckelkopiering, nyckelhantering och låscylinderbyte — snabbt och fackmannamässigt utfört av våra låssmeder.",
      },
    ],
  },
  dialog: {
    title: "Trygghet och pålitlighet",
    paragraphs: [
      "När du anlitar NordLås kan du lita på en pålitlig service där säkerhet är vår högsta prioritet. Vi arbetar diskret och professionellt i alla situationer.",
      "Hör av dig om du vill veta mer om hur vi kan hjälpa dig att stärka säkerheten i ditt hem eller företag.",
    ],
    bullets: [
      "Certifierade låssmeder",
      "Kostnadsfri säkerhetsbesiktning",
      "Jouravtal för privat- och företagskunder",
      "5 års garanti på utfört arbete",
    ],
    teamImage: "https://picsum.photos/seed/nordlas-team/1200/720",
    quote: "Vi finns här när du behöver oss som mest",
    ownerName: "Mikael Nordström",
    ownerTitle: "Grundare, NordLås Säkerhet AB",
  },
  quoteForm: {
    intro: "Önskar du ta del av priser och mer detaljerade uppgifter kring våra tjänster är du välkommen att kontakta oss.",
    serviceOptions: [
      "Låsjour",
      "Låsbyte & installation",
      "Säkerhetsdörrar",
      "Larm & övervakning",
      "Värdeskåp",
      "Nyckelservice",
    ],
  },
  aiSection: {
    title: "Vi missar aldrig ett samtal",
    body: "Vår AI-receptionist svarar direkt — oavsett om det är mitt på natten eller om vi är mitt i ett uppdrag. Den samlar in dina uppgifter och meddelar oss omedelbart. Du slipper vänta, vi slipper missa kunder.",
    bullets: [
      "Svarar på svenska dygnet runt",
      "Identifierar brådskande ärenden automatiskt",
      "Skickar notifiering till oss direkt",
      "Du får alltid en snabb återkoppling",
    ],
  },
  footer: {
    certs: ["Certifierad låssmed", "SSF Stöldskyddsföreningen", "F-skattsedel", "Auktoriserad"],
    year: 2026,
  },
  slug: "nordlas",
  agentId: "assistant-bcc5e597-ccc4-4e6e-9851-5317299dbd2a",
};

export default function DemoNordlasPage() {
  return <BusinessLandingPage config={nordlasConfig} />;
}
