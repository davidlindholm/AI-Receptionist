import { BusinessLandingPage, type BusinessConfig } from "@/components/BusinessLandingPage";

const salvadentConfig: BusinessConfig = {
  brand: {
    name: "Salvadent A.C.",
    short: "S",
    logoUrl: "/salvadent/logo.png",
    logoText: "Salvadent",
    phone: "+52 55 8104 5248",
    email: "contacto@salvadent.com.mx",
    address: "Carlota #89, Col Guadalupe Tepeyac, CDMX",
    addressShort: "Carlota #89, CDMX",
    cityRegion: "Ciudad de México",
  },
  colors: {
    primary: "#1a2340",
    accent: "#65c0b9",
    accentHover: "#4fada6",
  },
  hero: {
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1920&q=80",
    eyebrow: "Salvadent A.C.",
    title: "Prevención que cuida tu vida",
    body: "Asociación civil mexicana dedicada a fomentar la cultura de la prevención. Atención médica integral, odontología, rehabilitación y programas de salud a costos accesibles, con un equipo multidisciplinario comprometido contigo.",
    cta: "Agendar consulta",
  },
  about: {
    leftTitle: "Una asociación civil con propósito",
    leftParagraphs: [
      "Salvadent A.C. está integrada por un equipo multidisciplinario de especialistas certificados, apasionados por mejorar la calidad de vida de las personas mediante la prevención de enfermedades.",
      "Trabajamos con la filosofía de lograr una vida plena a bajo costo, a través de herramientas de promoción y educación que acercan la salud a más mexicanos.",
      "Nuestro propósito es invitar a las personas a cambiar los malos hábitos y a detectar a tiempo las enfermedades crónico-degenerativas que afectan a millones en México.",
    ],
    rightTitle: "Salud integral, accesible y cercana",
    rightParagraphs: [
      "Ofrecemos consultas de medicina general y de especialidad, odontología integral, rehabilitación física, terapias alternativas, medicina homeopática, laboratorio y estudios de gabinete.",
      "Realizamos campañas y ferias de salud para detectar a tiempo enfermedades como diabetes, enfermedades del corazón y problemas bucales —las principales causas de mortalidad en el país.",
      "Y con Salvacard, nuestro programa de membresía, reducimos significativamente el costo de los servicios médicos para individuos, familias y empresas.",
    ],
  },
  services: {
    sectionTitle: "Nuestros servicios y programas",
    sectionSubtitle: "Atención integral para ti y tu familia",
    items: [
      {
        img: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=800&h=600&fit=crop&q=80",
        title: "Medicina general y de especialidad",
        desc: "Consultas con médicos certificados para diagnóstico, tratamiento y seguimiento — desde la atención cotidiana hasta especialidades.",
      },
      {
        img: "https://images.unsplash.com/photo-1629909615184-73e5e933c6f1?w=800&h=600&fit=crop&q=80",
        title: "Odontología integral",
        desc: "Programa Recupera tu Sonrisa — atendemos caries, gingivitis, periodontitis, halitosis y más, con enfoque preventivo y restaurador.",
      },
      {
        img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop&q=80",
        title: "Rehabilitación física",
        desc: "Intervenciones encaminadas a optimizar tu funcionamiento físico y reducir cualquier afección o discapacidad que limite tu día a día.",
      },
      {
        img: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&h=600&fit=crop&q=80",
        title: "Terapias alternativas y homeopatía",
        desc: "Complementa tu salud con tratamientos que reducen el estrés, alivian infecciones y apoyan enfermedades crónico-degenerativas.",
      },
      {
        img: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=800&h=600&fit=crop&q=80",
        title: "Laboratorio y gabinete",
        desc: "Estudios diagnósticos para detección oportuna — porque atender a tiempo brinda mayor eficacia en cualquier tratamiento.",
      },
      {
        img: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=800&h=600&fit=crop&q=80",
        title: "Salvacard — Membresía",
        desc: "Reduce los costos de tus servicios médicos. Tres modalidades: Individual, PLUS Familiar y COLLECT Empresarial.",
      },
    ],
  },
  dialog: {
    title: "La prevención es la mejor inversión en tu salud",
    paragraphs: [
      "En Salvadent creemos que la mayoría de las causas de muerte en México son enfermedades prevenibles. Por eso ponemos al alcance de todos campañas, estudios periódicos y atención cercana a costos accesibles.",
      "Acércate, agenda una valoración o pregunta por Salvacard — el equipo te acompañará paso a paso para cuidar tu salud y la de tu familia.",
    ],
    bullets: [
      "Equipo multidisciplinario certificado",
      "Tratamientos integrales a costos accesibles",
      "Detección oportuna de enfermedades",
      "Atención cálida y centrada en la persona",
    ],
    teamImage: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&h=720&fit=crop&q=80",
    quote: "Lograr una vida plena no debería ser un lujo, sino una posibilidad para todos.",
    ownerName: "Equipo Salvadent",
    ownerTitle: "Asociación Civil",
  },
  quoteForm: {
    intro: "¿Quieres agendar una cita, conocer más de Salvacard o preguntar por uno de nuestros programas? Déjanos tus datos y un miembro del equipo se pondrá en contacto contigo a la brevedad.",
    serviceOptions: [
      "Cita médica general",
      "Odontología",
      "Rehabilitación física",
      "Terapia alternativa / Homeopatía",
      "Laboratorio y estudios",
      "Información sobre Salvacard",
    ],
  },
  aiSection: {
    title: "Atendemos cuando lo necesitas",
    body: "Nuestra recepcionista virtual contesta tus llamadas al instante, las 24 horas. Toma tus datos, agenda tu cita y, si es una urgencia, da aviso de inmediato al equipo. Tú no esperas, nosotros no perdemos contacto contigo.",
    bullets: [
      "Responde en español las 24 horas",
      "Agenda citas y resuelve dudas sobre Salvacard",
      "Detecta urgencias y notifica al equipo al instante",
      "Información clara sobre nuestros 8 programas de salud",
    ],
  },
  footer: {
    certs: [
      "Asociación civil registrada",
      "Equipo multidisciplinario certificado",
      "Tratamientos a costos accesibles",
      "Atención integral en CDMX",
    ],
    year: 2026,
  },
  slug: "salvadent",
  agentId: "assistant-34f56af0-59af-4cf9-9e3e-22824fa3d033",
  language: "es",
};

export default function DemoSalvadentPage() {
  return <BusinessLandingPage config={salvadentConfig} />;
}
