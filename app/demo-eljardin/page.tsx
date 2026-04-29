import { BusinessLandingPage, type BusinessConfig } from "@/components/BusinessLandingPage";

const eljardinConfig: BusinessConfig = {
  brand: {
    name: "El Jardín Restaurante",
    short: "J",
    logoText: "El Jardín",
    phone: "+34 91 555 12 34",
    email: "reservas@eljardin.es",
    address: "Calle de la Flora 23, 28013 Madrid",
    addressShort: "Calle de la Flora 23, Madrid",
    cityRegion: "Madrid",
  },
  colors: {
    primary: "#b45309",
    accent: "#dc2626",
    accentHover: "#b91c1c",
  },
  hero: {
    image: "https://picsum.photos/seed/eljardin-hero/1920/1080",
    eyebrow: "El Jardín Restaurante",
    title: "Cocina mediterránea con alma",
    body: "Sabores auténticos del Mediterráneo en el corazón de Madrid. Ingredientes frescos de temporada, preparados con pasión y servidos en un ambiente acogedor. Abiertos para almuerzos, cenas y eventos privados.",
    cta: "Reservar mesa",
  },
  about: {
    leftTitle: "Nuestra filosofía",
    leftParagraphs: [
      "En El Jardín creemos que la buena cocina empieza con los mejores ingredientes. Trabajamos con productores locales y mercados de cercanía para ofrecer platos que reflejan la riqueza del Mediterráneo.",
      "Nuestro chef ejecutivo combina técnicas clásicas con toques contemporáneos, creando una experiencia gastronómica que sorprende en cada visita.",
      "Cada plato cuenta una historia — de la huerta a tu mesa, con respeto por la tradición y creatividad en la presentación.",
    ],
    rightTitle: "Un espacio único en Madrid",
    rightParagraphs: [
      "Ubicados en el barrio histórico de Madrid, nuestro restaurante combina la elegancia de un palacete restaurado con la calidez de un jardín interior que da nombre al local.",
      "Disponemos de salones privados para eventos, una terraza ajardinada y una bodega con más de 200 referencias de vinos españoles e internacionales.",
      "¿Quieres celebrar algo especial? Contáctanos y diseñaremos un menú a medida para tu evento.",
    ],
  },
  services: {
    sectionTitle: "Nuestras experiencias",
    sectionSubtitle: "Gastronomía, eventos y momentos inolvidables",
    items: [
      {
        img: "https://picsum.photos/seed/eljardin-s1/800/600",
        title: "Menú del día",
        desc: "Almuerzo ejecutivo de lunes a viernes con entrante, principal, postre y bebida — cocina de mercado a precio accesible.",
      },
      {
        img: "https://picsum.photos/seed/eljardin-s2/800/600",
        title: "Carta de temporada",
        desc: "Platos elaborados con productos de temporada que cambian cada trimestre, reflejando lo mejor de cada estación.",
      },
      {
        img: "https://picsum.photos/seed/eljardin-s3/800/600",
        title: "Eventos privados",
        desc: "Salones exclusivos para bodas, cumpleaños, reuniones de empresa y celebraciones con menús personalizados.",
      },
      {
        img: "https://picsum.photos/seed/eljardin-s4/800/600",
        title: "Catering",
        desc: "Servicio de catering para eventos en tu ubicación — desde cócteles y canapés hasta banquetes completos.",
      },
      {
        img: "https://picsum.photos/seed/eljardin-s5/800/600",
        title: "Cenas maridaje",
        desc: "Experiencias gastronómicas con maridaje de vinos seleccionados por nuestro sommelier para cada plato.",
      },
      {
        img: "https://picsum.photos/seed/eljardin-s6/800/600",
        title: "Terraza y jardín",
        desc: "Disfruta de nuestro jardín interior y terraza climatizada — el rincón perfecto para una comida al aire libre en Madrid.",
      },
    ],
  },
  dialog: {
    title: "Una experiencia que va más allá del plato",
    paragraphs: [
      "En El Jardín cada detalle importa: desde la selección de ingredientes hasta el servicio en mesa. Queremos que cada visita sea memorable.",
      "Reserva tu mesa o cuéntanos qué necesitas — estaremos encantados de ayudarte a planificar tu próxima experiencia gastronómica.",
    ],
    bullets: [
      "Ingredientes frescos de productores locales",
      "Salones privados hasta 80 personas",
      "Carta de vinos con más de 200 referencias",
      "Menús personalizados para eventos",
    ],
    teamImage: "https://picsum.photos/seed/eljardin-team/1200/720",
    quote: "La buena cocina es el lenguaje universal de la hospitalidad",
    ownerName: "Carlos Mendoza",
    ownerTitle: "Chef ejecutivo, El Jardín Restaurante",
  },
  quoteForm: {
    intro: "¿Deseas hacer una reservación, planificar un evento o conocer nuestro menú? Contáctanos y te responderemos a la brevedad.",
    serviceOptions: [
      "Reservación de mesa",
      "Evento privado",
      "Catering",
      "Cena maridaje",
      "Menú personalizado",
      "Otra consulta",
    ],
  },
  aiSection: {
    title: "Nunca perdemos una reservación",
    body: "Nuestra recepcionista virtual atiende tus llamadas al instante — ya sea de madrugada o durante el servicio. Recoge tus datos y nos avisa de inmediato. Tú no esperas, nosotros no perdemos clientes.",
    bullets: [
      "Responde en español las 24 horas",
      "Gestiona reservaciones y consultas",
      "Envía notificación al equipo al instante",
      "Siempre recibes una respuesta rápida",
    ],
  },
  footer: {
    certs: ["Restaurante registrado", "Sanidad alimentaria", "Licencia de terraza", "Seguro de responsabilidad"],
    year: 2026,
  },
  slug: "eljardin",
  agentId: "assistant-86028a93-29e4-4dc7-9327-7569fd198db6",
  language: "es",
};

export default function DemoElJardinPage() {
  return <BusinessLandingPage config={eljardinConfig} />;
}
