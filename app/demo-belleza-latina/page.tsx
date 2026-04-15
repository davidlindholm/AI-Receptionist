import { BusinessLandingPage, type BusinessConfig } from "@/components/BusinessLandingPage";

const bellezaLatinaConfig: BusinessConfig = {
  brand: {
    name: "Belleza Latina Estética",
    short: "B",
    logoText: "Belleza Latina",
    phone: "+34 93 555 67 89",
    email: "citas@bellezalatina.es",
    address: "Passeig de Gràcia 45, 08007 Barcelona",
    addressShort: "Passeig de Gràcia 45, Barcelona",
    cityRegion: "Barcelona",
  },
  colors: {
    primary: "#be185d",
    accent: "#7c3aed",
    accentHover: "#6d28d9",
  },
  hero: {
    image: "https://picsum.photos/seed/belleza-hero/1920/1080",
    eyebrow: "Belleza Latina Estética",
    title: "Tu belleza, nuestra pasión",
    body: "Centro de estética integral en el corazón de Barcelona. Tratamientos faciales, corporales, manicura, depilación y maquillaje profesional. Porque mereces sentirte increíble cada día.",
    cta: "Pedir cita",
  },
  about: {
    leftTitle: "Expertos en belleza",
    leftParagraphs: [
      "En Belleza Latina combinamos las últimas técnicas en estética con productos de alta calidad para ofrecerte resultados visibles desde la primera sesión.",
      "Nuestro equipo de esteticistas certificadas se forma continuamente en las tendencias más avanzadas del sector, desde tratamientos faciales anti-edad hasta técnicas de contorno corporal.",
      "Cada tratamiento se personaliza según tu tipo de piel, tus necesidades y tus objetivos — porque cada persona es única.",
    ],
    rightTitle: "Tu espacio de bienestar",
    rightParagraphs: [
      "Nuestro centro en Passeig de Gràcia ha sido diseñado para que te sientas en un oasis de tranquilidad desde el momento en que cruzas la puerta.",
      "Disponemos de cabinas individuales, zona de relajación y un equipo que te acompaña en cada paso de tu experiencia de belleza.",
      "¿Primera vez con nosotros? Reserva una consulta gratuita y te asesoraremos sobre los tratamientos más adecuados para ti.",
    ],
  },
  services: {
    sectionTitle: "Nuestros tratamientos",
    sectionSubtitle: "Belleza integral para rostro y cuerpo",
    items: [
      {
        img: "https://picsum.photos/seed/belleza-s1/800/600",
        title: "Tratamientos faciales",
        desc: "Limpieza profunda, hidratación, anti-edad y luminosidad — protocolos personalizados para cada tipo de piel.",
      },
      {
        img: "https://picsum.photos/seed/belleza-s2/800/600",
        title: "Tratamientos corporales",
        desc: "Reductores, reafirmantes, drenaje linfático y exfoliaciones — para modelar y cuidar tu cuerpo.",
      },
      {
        img: "https://picsum.photos/seed/belleza-s3/800/600",
        title: "Manicura y pedicura",
        desc: "Manicura clásica, semipermanente, gel y nail art — manos y pies perfectos con los mejores productos.",
      },
      {
        img: "https://picsum.photos/seed/belleza-s4/800/600",
        title: "Depilación",
        desc: "Depilación láser, cera caliente y cera tibia — técnicas profesionales para una piel suave y duradera.",
      },
      {
        img: "https://picsum.photos/seed/belleza-s5/800/600",
        title: "Maquillaje profesional",
        desc: "Maquillaje para eventos, novias, sesiones fotográficas y día a día — realza tu belleza natural.",
      },
      {
        img: "https://picsum.photos/seed/belleza-s6/800/600",
        title: "Masajes",
        desc: "Relajantes, descontracturantes y con piedras calientes — libera tensiones y recupera tu energía.",
      },
    ],
  },
  dialog: {
    title: "Porque cuidarte no es un lujo, es una necesidad",
    paragraphs: [
      "En Belleza Latina creemos que todos merecen sentirse bien consigo mismos. Nuestros tratamientos están diseñados para ofrecer resultados reales en un ambiente de confianza y profesionalismo.",
      "Reserva tu cita o consúltanos sin compromiso — te asesoraremos sobre el tratamiento perfecto para ti.",
    ],
    bullets: [
      "Esteticistas certificadas y en formación continua",
      "Productos de primeras marcas",
      "Consulta inicial gratuita",
      "Bonos y paquetes con descuento",
    ],
    teamImage: "https://picsum.photos/seed/belleza-team/1200/720",
    quote: "La belleza empieza en el momento en que decides ser tú misma",
    ownerName: "Valentina Ríos",
    ownerTitle: "Directora, Belleza Latina Estética",
  },
  quoteForm: {
    intro: "¿Quieres reservar una cita, conocer nuestros tratamientos o recibir asesoramiento personalizado? Escríbenos y te contactaremos enseguida.",
    serviceOptions: [
      "Tratamiento facial",
      "Tratamiento corporal",
      "Manicura / Pedicura",
      "Depilación",
      "Maquillaje profesional",
      "Masaje",
    ],
  },
  aiSection: {
    title: "Nunca perdemos una cita",
    body: "Nuestra recepcionista virtual atiende tus llamadas al instante — ya sea fuera de horario o mientras estamos con otro cliente. Recoge tus datos y nos avisa de inmediato. Tú no esperas, nosotros no perdemos clientes.",
    bullets: [
      "Responde en español las 24 horas",
      "Gestiona citas y consultas automáticamente",
      "Envía notificación al equipo al instante",
      "Siempre recibes una respuesta rápida",
    ],
  },
  footer: {
    certs: ["Centro autorizado", "Esteticistas certificadas", "Productos eco-friendly", "Seguro de responsabilidad"],
    year: 2026,
  },
  slug: "belleza-latina",
  agentId: "assistant-3e082d5d-4922-40dd-9203-046fa086a781",
};

export default function DemoBellezaLatinaPage() {
  return <BusinessLandingPage config={bellezaLatinaConfig} />;
}
