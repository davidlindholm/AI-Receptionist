import { NightclubLandingPage, type NightclubConfig } from "@/components/NightclubLandingPage";

const config: NightclubConfig = {
  brand: {
    name: "La Casa de la Salsa Latin Room",
    logoText: "La Casa de la Salsa",
    logoImage: "/salsa/logo.png",
    tagline: "Tu mesa, tu ritmo, tu noche",
    phone: "+524428630255",
    phoneDisplay: "442 863 0255",
    email: "info@lacasadelasalsa.mx",
    address: "Prol. Bernardo Quintana 109, Loma Dorada, 76060 Santiago de Querétaro, Qro.",
    addressShort: "Prol. Bernardo Quintana 109, Loma Dorada, Querétaro",
    mapsUrl: "https://maps.app.goo.gl/5o1rpHrMmVjxbJmM7",
    whatsappNumber: process.env.WHATSAPP_FROM_NUMBER,
  },
  hero: {
    image: "/salsa/exterior.png",
    subtitle: "Tu mesa, tu ritmo, tu noche — Querétaro",
    ctaPrimary: "Reservar mesa",
    ctaSecondary: "Llamar ahora",
  },
  about: {
    title: "Orquestas en vivo — Jueves, Viernes y Sábado",
    paragraphs: [
      "La Casa de la Salsa Latin Room es el hogar de la música latina en Querétaro. Cada jueves, viernes y sábado, nuestras orquestas en vivo llenan la pista con salsa, cumbia, bachata y los ritmos más calientes del continente.",
      "Con artistas como Mambo Swing y Nelson Tomasen y los de La Habana, cada noche es un festival. Música en vivo, ambiente vibrante y una pista que no para hasta el amanecer.",
      "Nuestro espacio fue diseñado para vivir la noche en grande: zona VIP, barra completa, pista amplia y un sonido que sientes en el alma desde el primer compás.",
    ],
    facts: [
      { value: "Jue–Sáb", label: "Música en vivo" },
      { value: "Jue–Sáb", label: "Orquestas en vivo" },
      { value: "VIP", label: "Zona exclusiva" },
      { value: "24/7", label: "Asistente virtual" },
    ],
  },
  promos: [
    {
      day: "JUEVES",
      title: "2 por 1 en botellas",
      desc: "Todos los jueves: 2 por 1 en botellas y bebidas participantes. La excusa perfecta para empezar el fin de semana antes.",
      color: "red",
    },
    {
      day: "VIERNES",
      title: "Cumpleañeros gratis",
      desc: "Si es tu cumpleaños, el viernes es tu noche — cover completamente gratis para el festejado. ¡Celebra con todo!",
      color: "gold",
    },
    {
      day: "SIEMPRE",
      title: "Paquetes VIP",
      desc: "Zona VIP con servicio de botella, mesa reservada y atención personalizada para que tu noche sea inolvidable.",
      color: "blue",
    },
  ],
  services: [
    {
      img: "/salsa/exterior.png",
      title: "Orquestas en vivo",
      desc: "Mambo Swing, Nelson Tomasen y los de La Habana y más artistas tocando en vivo cada jueves, viernes y sábado.",
    },
    {
      img: "/salsa/dancesmallimage.png",
      title: "Pista de baile",
      desc: "Amplia pista con el mejor sonido de Querétaro para que bailes sin límites toda la noche.",
    },
    {
      img: "/salsa/twoforonejueves.png",
      title: "Jueves 2 por 1",
      desc: "Botellas y bebidas participantes a mitad de precio todos los jueves. ¡El mejor plan de la semana!",
    },
    {
      img: "/salsa/dancesmallimage.png",
      title: "Bebidas premium",
      desc: "Bar completo con cocteles de autor, botellas premium y las mejores opciones para brindar.",
    },
    {
      img: "/salsa/exterior.png",
      title: "Eventos privados",
      desc: "Organiza tu cumpleaños, despedida o celebración — paquetes personalizados con mesa VIP y servicio exclusivo.",
    },
    {
      img: "/salsa/dancesmallimage.png",
      title: "Viernes de cumpleañeros",
      desc: "Cover gratis para el festejado cada viernes. Avísanos y te preparamos una noche especial.",
    },
  ],
  gallery: [
    "/salsa/exterior.png",
    "/salsa/dancesmallimage.png",
    "/salsa/twoforonejueves.png",
  ],
  aiSection: {
    title: "Pedro te atiende las 24 horas",
    body: "Llámanos o escríbenos cuando quieras — incluso mientras suena la orquesta o fuera de horario. Pedro toma reservaciones, informa sobre cover y promociones, y avisa al equipo de inmediato.",
    bullets: [
      "Te atendemos en español las 24 horas, los 7 días",
      "Reservaciones y consultas de cover",
      "Información sobre orquestas y eventos especiales",
      "Notificación instantánea al equipo",
    ],
  },
  footer: {
    year: 2026,
    links: [
      "Licencia de funcionamiento",
      "Registro sanitario",
      "Aforo regulado",
      "Seguro de responsabilidad",
    ],
  },
  agentId: "assistant-f51ed302-e020-45c1-8bf7-abc1f0345f9d",
};

export default function DemoLaCasaDeLaSalsaPage() {
  return <NightclubLandingPage config={config} />;
}
