import { BusinessLandingPage, type BusinessConfig } from "@/components/BusinessLandingPage";

const nimozConfig: BusinessConfig = {
  brand: {
    name: "Nimoz Elinstallation AB",
    short: "N",
    logoUrl: "https://www.nimoz.se/uploads/s2bCGZix/nimoz__msi___png.png",
    phone: "073-248 39 79",
    email: "info@nimoz.se",
    address: "Sikås amerikavägen 165, Hammerdal",
    cityRegion: "Jämtland",
  },
  colors: {
    primary: "#018bd3",
    accent: "#229380",
    accentHover: "#1fad94",
  },
  hero: {
    image: "https://www.nimoz.se/uploads/fMjSNHBg/912x0_2560x0/el__msi___jpg.webp",
    eyebrow: "Nimoz Elinstallation",
    title: "Din elektriker i Jämtland",
    body: "När det gäller el är det oss på Nimoz du ska kontakta – vi har lång och bred erfarenhet från det mesta inom elinstallation. Vi hjälper dig med allt från enklare serviceåtgärder till mer tekniska uppdrag. Vi utgår från Strömsunds kommun, men erbjuder våra tjänster till kunder i hela Jämtlands län!",
    cta: "Kontakta oss",
  },
  about: {
    leftTitle: "Erfaren elektriker",
    leftParagraphs: [
      "På Nimoz har vi mångårig erfarenhet som elektriker och vi erbjuder ett brett utbud av tjänster inom elinstallation.",
      "Våra skickliga och yrkeskunniga elektriker har stor vana av att utföra alla typer av eljobb och jobbar alltid med säkerheten i fokus.",
      "Precision, noggrannhet och stor yrkesskicklighet är ledande ord i vår verksamhet. Anlita oss och du är garanterad förstklassig service och en trygg elinstallation.",
    ],
    rightTitle: "Lokal aktör",
    rightParagraphs: [
      "Som en professionell och seriös elfirma i Jämtland har vi med åren skapat ett stort kontaktnät och vi månar starkt om att samarbeta på lokal nivå.",
      "Idag erbjuder vi våra tjänster till kunder inom hela Jämtlands län där vi har vårt huvudsäte i Strömsunds kommun.",
      "Vi räknar med olika typer av samarbeten med andra aktörer såsom Storåns Energi och har möjlighet till jouravtal för specifika kunder. Vill du veta mer om oss som elfirma? Hör av dig så berättar våra elektriker mer!",
    ],
  },
  services: {
    sectionTitle: "Våra elektrikertjänster",
    sectionSubtitle: "Allt inom el och elinstallation under ett tak",
    items: [
      {
        img: "https://www.nimoz.se/uploads/8QIOwMSi/768x0_800x0/ladda-elbil-800x600__msi___jpg.webp",
        title: "Laddbox",
        desc: "Vi installerar laddstationer och laddboxar för både privatpersoner och företag, vilket ger dig möjlighet att ta steget mot en grönare framtid och köra elbil på ett mer hållbart sätt.",
      },
      {
        img: "https://www.nimoz.se/uploads/hhvslHj7/768x0_800x0/mobilstyrning-800x600__msi___jpg.webp",
        title: "Smarthome",
        desc: "Vi hjälper dig med installation av smarthome-lösningar, vilket ger dig full kontroll över ditt hem direkt från mobilen — belysning, ventilation, övervakningssystem och mycket mer.",
      },
      {
        img: "https://www.nimoz.se/uploads/392Ia9SG/768x0_800x0/installation-800x600__msi___jpg.webp",
        title: "Felsökning och elinstallationer",
        desc: "Det är knappast något vi inte har möjlighet att lösa. Vi hjälper till med allt från enklare serviceuppdrag till mer avancerade projekt där ett kvalificerat tekniskt utförande krävs.",
      },
      {
        img: "https://www.nimoz.se/uploads/QOBBZ2Aq/768x0_800x0/el-2-800x600__msi___jpg.webp",
        title: "Energilagring",
        desc: "Optimera elpriset och lagra din el på det bästa sättet. När du har solceller kan du passa på att få ett batteri installerat som laddas av solcellerna och används när det behövs.",
      },
      {
        img: "https://www.nimoz.se/uploads/eAu39ZdH/768x0_1024x0/el_195__msi___jpg.webp",
        title: "Industrielektriker",
        desc: "Våra elektriker har den kompetens som krävs för att installera och underhålla elanläggningar i din verksamhet. Vi säkerställer pålitlig elförsörjning och optimal belysning.",
      },
      {
        img: "https://www.nimoz.se/uploads/6seCxR0h/768x0_1024x0/olena-bohovyk-PLMJD95IN_0-unsplash_808__msi___jpg.webp",
        title: "Kameraövervakning",
        desc: "Letar du efter en effektiv övervakningslösning för ditt hem, kontor eller industrilokal? Vi utformar och installerar en skräddarsydd kameraövervakningslösning som passar dina behov.",
      },
    ],
  },
  dialog: {
    title: "Dialog och kundkontakt",
    paragraphs: [
      "När du anlitar elektriker på Nimoz kan du lita på en trygg service där transparens är A och O. Vi för alltid en nära dialog med våra kunder före, under och efter utförandet.",
      "Det ska helt enkelt kännas tryggt att anlita Nimoz och från vår sida sätter vi stort värde i en nära och personlig kundkontakt. Hör av dig om du önskar veta mer om våra tjänster och hur vi jobbar.",
    ],
    bullets: [
      "Auktoriserade och certifierade elektriker",
      "Kostnadsfri offert och besiktning",
      "Jouravtal för privat- och företagskunder",
      "5 års garanti på utfört arbete",
    ],
    teamImage: "https://www.nimoz.se/uploads/KPBC3zSN/768x0_640x0/IMG_3567_164__msi___jpg.webp",
    quote: "Vi svarar alltid — även när vi är ute på jobb",
    ownerName: "Nimoz, ägare",
    ownerTitle: "Nimoz Elinstallation AB",
  },
  quoteForm: {
    intro: "Önskar du ta del av priser och mer detaljerade uppgifter kring våra tjänster är du välkommen att kontakta oss.",
    serviceOptions: [
      "Laddbox",
      "Smarthome",
      "Felsökning och elinstallationer",
      "Energilagring",
      "Industrielektriker",
      "Kameraövervakning",
    ],
  },
  aiSection: {
    title: "Vi missar aldrig ett samtal",
    body: "Vår AI-receptionist svarar direkt — oavsett om det är mitt på natten eller om vi är mitt i ett jobb. Den samlar in dina uppgifter och meddelar oss omedelbart. Du slipper vänta, vi slipper missa kunder.",
    bullets: [
      "Svarar på svenska dygnet runt",
      "Identifierar brådskande ärenden automatiskt",
      "Skickar notifiering till oss direkt",
      "Du får alltid ett snabbt återkoppling",
    ],
  },
  footer: {
    certs: ["Certifierad elfirma", "Elsäkerhetsverket", "Auktoriserad", "Rot-avdrag"],
    year: 2026,
  },
  slug: "nimoz",
  agentId: "assistant-1187a5d8-a489-4e2b-b67c-c817d556df0a",
};

export default function DemoNimozPage() {
  return <BusinessLandingPage config={nimozConfig} />;
}
