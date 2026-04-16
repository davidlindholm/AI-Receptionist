"use client";

import { useState, useEffect } from "react";
import { TelnyxWidgetController } from "./TelnyxWidgetController";

export interface NightclubConfig {
  brand: {
    name: string;
    logoText: string;
    logoImage?: string;   // optional real logo image URL
    tagline: string;
    phone: string;
    phoneDisplay: string;
    email: string;
    address: string;
    addressShort: string;
    mapsUrl: string;
    whatsappNumber?: string;
  };
  event: {
    label: string;          // e.g. "GRAN INAUGURACIÓN"
    date: string;           // e.g. "20 DE MARZO 2026"
    artist: string;         // e.g. "Diego Morán"
    festivalName: string;   // e.g. "Festival de la Salsa 2026"
    extraTag?: string;      // e.g. "Mambo Swing"
  };
  hero: {
    image: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  about: {
    title: string;
    paragraphs: string[];
    facts: { label: string; value: string }[];
  };
  promos: {
    day: string;
    title: string;
    desc: string;
    color: "red" | "gold" | "blue";
  }[];
  services: { img: string; title: string; desc: string }[];
  gallery: string[];
  aiSection: {
    title: string;
    body: string;
    bullets: string[];
  };
  footer: {
    year: number;
    links: string[];
  };
  agentId: string;
}

// ── Small helper components ────────────────────────────────────────────────────

function GoldButton({
  children,
  onClick,
  className = "",
  dataAttr,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  dataAttr?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      {...(dataAttr ? { "data-open-widget": "true" } : {})}
      className={`bg-[#f59e0b] hover:bg-[#d97706] text-black font-bold px-6 py-3 rounded-full transition-all duration-200 shadow-lg shadow-amber-900/40 ${className}`}
    >
      {children}
    </button>
  );
}

function OutlineButton({
  children,
  href,
  className = "",
}: {
  children: React.ReactNode;
  href?: string;
  className?: string;
}) {
  const cls = `border-2 border-white/70 hover:border-white text-white hover:bg-white/10 font-semibold px-6 py-3 rounded-full transition-all duration-200 ${className}`;
  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
      </a>
    );
  }
  return <button className={cls}>{children}</button>;
}

const promoGlow: Record<string, string> = {
  red: "border-red-600 shadow-red-900/50",
  gold: "border-amber-500 shadow-amber-900/50",
  blue: "border-blue-500 shadow-blue-900/50",
};

const promoBadge: Record<string, string> = {
  red: "bg-red-600 text-white",
  gold: "bg-amber-500 text-black",
  blue: "bg-blue-500 text-white",
};

// ── Main component ─────────────────────────────────────────────────────────────

export function NightclubLandingPage({ config }: { config: NightclubConfig }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const tel = `tel:${config.brand.phone}`;
  const wa = config.brand.whatsappNumber
    ? `https://wa.me/${config.brand.whatsappNumber.replace(/\D/g, "")}`
    : undefined;

  return (
    <div className="bg-[#0d0d0d] text-[#f9fafb] min-h-screen font-sans">
      <TelnyxWidgetController agentId={config.agentId} />

      {/* ── NAV ─────────────────────────────────────────────────────────────── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-black/90 backdrop-blur-md shadow-lg shadow-black/60"
            : "bg-gradient-to-b from-black/70 to-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          {/* Logo */}
          {config.brand.logoImage ? (
            <img
              src={config.brand.logoImage}
              alt={config.brand.name}
              className="h-12 w-auto object-contain"
            />
          ) : (
            <div className="flex flex-col leading-none">
              <span className="text-lg font-extrabold tracking-tight bg-gradient-to-r from-red-500 via-amber-400 to-blue-400 bg-clip-text text-transparent">
                {config.brand.logoText}
              </span>
              <span className="text-[10px] font-semibold tracking-[0.2em] text-white/50 uppercase">
                Latin Room
              </span>
            </div>
          )}

          {/* Nav links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-white/70">
            {["Inicio", "Nosotros", "Eventos", "Promociones", "Contacto"].map((l) => (
              <a
                key={l}
                href={`#${l.toLowerCase()}`}
                className="hover:text-amber-400 transition-colors"
              >
                {l}
              </a>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <a
              href={tel}
              className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-amber-400 hover:text-amber-300"
            >
              <span>📞</span> {config.brand.phoneDisplay}
            </a>
            <GoldButton className="text-sm py-2 px-4" dataAttr>
              Reservar mesa
            </GoldButton>
          </div>
        </div>
      </header>

      {/* ── HERO ───────────────────────────────────────────────────────────── */}
      <section
        id="inicio"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `url(${config.hero.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Dark overlay with subtle vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto pt-24">
          {/* Eyebrow */}
          <p className="text-xs sm:text-sm font-bold tracking-[0.3em] text-amber-400 uppercase mb-4">
            {config.event.label}
          </p>

          {/* Date — hero headline */}
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-extrabold leading-none mb-4 bg-gradient-to-r from-red-500 via-amber-400 to-blue-400 bg-clip-text text-transparent drop-shadow-2xl">
            {config.event.date}
          </h1>

          {/* Club name */}
          <p className="text-xl sm:text-2xl font-semibold text-white/90 mb-2">
            {config.hero.subtitle}
          </p>

          {/* Artist */}
          <p className="text-base sm:text-lg text-white/60 mb-8">
            Artista estelar:{" "}
            <span className="text-amber-400 font-bold">{config.event.artist}</span>
            {config.event.extraTag && (
              <> &bull; <span className="text-blue-400">{config.event.extraTag}</span></>
            )}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <GoldButton className="text-base py-3.5 px-8" dataAttr>
              🎉 {config.hero.ctaPrimary}
            </GoldButton>
            <OutlineButton href={tel} className="text-base py-3.5 px-8">
              📞 {config.hero.ctaSecondary}
            </OutlineButton>
          </div>
        </div>

        {/* Scroll arrow */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-white/40">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* ── INAUGURATION BANNER ─────────────────────────────────────────────── */}
      <section
        id="eventos"
        className="relative overflow-hidden py-8 px-4"
        style={{ background: "linear-gradient(90deg, #7f1d1d 0%, #dc2626 35%, #b45309 65%, #f59e0b 100%)" }}
      >
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-4 text-center sm:text-left">
          <div className="text-4xl">🎺</div>
          <div>
            <p className="text-xs font-bold tracking-[0.25em] text-white/70 uppercase">
              {config.event.festivalName}
            </p>
            <p className="text-xl sm:text-2xl font-extrabold text-white">
              Artista Estelar:{" "}
              <span className="text-yellow-200">{config.event.artist}</span>
            </p>
            {config.event.extraTag && (
              <p className="text-sm font-semibold text-white/80 mt-0.5">
                {config.event.extraTag} &bull; {config.event.date}
              </p>
            )}
          </div>
          <div className="text-4xl">🎶</div>
        </div>
      </section>

      {/* ── ABOUT ───────────────────────────────────────────────────────────── */}
      <section id="nosotros" className="py-20 px-4 bg-[#0d0d0d]">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-start">
          {/* Left — text */}
          <div>
            <p className="text-xs font-bold tracking-[0.25em] text-amber-400 uppercase mb-3">
              Sobre nosotros
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-6 leading-tight">
              {config.about.title}
            </h2>
            {config.about.paragraphs.map((p, i) => (
              <p key={i} className="text-white/70 leading-relaxed mb-4">
                {p}
              </p>
            ))}
          </div>

          {/* Right — facts card */}
          <div className="bg-[#111827] rounded-2xl border border-white/10 p-8 grid grid-cols-2 gap-6">
            {config.about.facts.map((f, i) => (
              <div key={i} className="text-center">
                <p className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-red-500 to-amber-400 bg-clip-text text-transparent">
                  {f.value}
                </p>
                <p className="text-xs text-white/50 mt-1 uppercase tracking-wide">{f.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROMOTIONS ──────────────────────────────────────────────────────── */}
      <section id="promociones" className="py-20 px-4 bg-[#111827]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-bold tracking-[0.25em] text-amber-400 uppercase mb-3">
              Noches especiales
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Nuestras promociones
            </h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            {config.promos.map((promo, i) => (
              <div
                key={i}
                className={`relative bg-[#0d0d0d] rounded-2xl border-2 shadow-xl p-8 text-center ${promoGlow[promo.color]}`}
              >
                <span
                  className={`inline-block text-xs font-extrabold tracking-[0.2em] uppercase px-3 py-1 rounded-full mb-4 ${promoBadge[promo.color]}`}
                >
                  {promo.day}
                </span>
                <h3 className="text-xl font-extrabold text-white mb-3">{promo.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{promo.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES GRID ───────────────────────────────────────────────────── */}
      <section className="py-20 px-4 bg-[#0d0d0d]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-bold tracking-[0.25em] text-amber-400 uppercase mb-3">
              Lo que ofrecemos
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Una noche completa
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {config.services.map((s, i) => (
              <div
                key={i}
                className="group bg-[#111827] rounded-2xl border border-white/10 overflow-hidden hover:border-amber-500/50 transition-all duration-300"
              >
                <div
                  className="h-44 bg-center bg-cover transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundImage: `url(${s.img})` }}
                />
                <div className="p-5">
                  <h3 className="font-bold text-white mb-2">{s.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GALLERY ─────────────────────────────────────────────────────────── */}
      <section className="py-20 px-4 bg-[#111827]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-bold tracking-[0.25em] text-amber-400 uppercase mb-3">
              Ambiente
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Vive la experiencia
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {config.gallery.map((img, i) => (
              <div
                key={i}
                className="rounded-2xl overflow-hidden aspect-[4/3] bg-center bg-cover hover:scale-[1.02] transition-transform duration-300"
                style={{ backgroundImage: `url(${img})` }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── AI RECEPTIONIST ─────────────────────────────────────────────────── */}
      <section className="py-20 px-4 bg-[#0d0d0d]">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs font-bold tracking-[0.25em] text-amber-400 uppercase mb-3">
              Asistente virtual 24/7
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 leading-tight">
              {config.aiSection.title}
            </h2>
            <p className="text-white/70 leading-relaxed mb-6">{config.aiSection.body}</p>
            <ul className="space-y-3">
              {config.aiSection.bullets.map((b, i) => (
                <li key={i} className="flex items-start gap-3 text-white/80 text-sm">
                  <span className="mt-0.5 w-5 h-5 rounded-full bg-amber-500 flex items-center justify-center flex-shrink-0 text-black font-bold text-xs">
                    ✓
                  </span>
                  {b}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-[#111827] rounded-2xl border border-amber-500/30 p-8 text-center shadow-xl shadow-amber-900/20">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-600 to-amber-500 flex items-center justify-center mx-auto mb-4 text-2xl shadow-lg">
              🎙️
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Pedro — Asistente de voz</h3>
            <p className="text-white/60 text-sm mb-6">
              Responde al instante, incluso a las 2am. Toma reservaciones y consultas cuando el equipo no puede.
            </p>
            <GoldButton className="w-full text-base py-3.5" dataAttr>
              🎤 Llamar ahora
            </GoldButton>
          </div>
        </div>
      </section>

      {/* ── CONTACT ─────────────────────────────────────────────────────────── */}
      <section id="contacto" className="py-20 px-4 bg-[#111827]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-bold tracking-[0.25em] text-amber-400 uppercase mb-3">
              Encuéntranos
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Contacto y ubicación
            </h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 mb-10">
            {/* Phone */}
            <a
              href={tel}
              className="bg-[#0d0d0d] rounded-2xl border border-white/10 hover:border-amber-500/50 p-6 text-center transition-all group"
            >
              <div className="text-3xl mb-3">📞</div>
              <p className="text-xs text-white/50 uppercase tracking-wide mb-1">Teléfono</p>
              <p className="font-bold text-amber-400 group-hover:text-amber-300">
                {config.brand.phoneDisplay}
              </p>
            </a>

            {/* Maps */}
            <a
              href={config.brand.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#0d0d0d] rounded-2xl border border-white/10 hover:border-amber-500/50 p-6 text-center transition-all group"
            >
              <div className="text-3xl mb-3">📍</div>
              <p className="text-xs text-white/50 uppercase tracking-wide mb-1">Dirección</p>
              <p className="font-semibold text-white/80 text-sm leading-relaxed group-hover:text-white">
                {config.brand.addressShort}
              </p>
            </a>

            {/* WhatsApp */}
            {wa ? (
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#0d0d0d] rounded-2xl border border-white/10 hover:border-green-500/50 p-6 text-center transition-all group"
              >
                <div className="text-3xl mb-3">💬</div>
                <p className="text-xs text-white/50 uppercase tracking-wide mb-1">WhatsApp</p>
                <p className="font-bold text-green-400 group-hover:text-green-300">
                  Escríbenos
                </p>
              </a>
            ) : (
              <div className="bg-[#0d0d0d] rounded-2xl border border-white/10 p-6 text-center">
                <div className="text-3xl mb-3">✉️</div>
                <p className="text-xs text-white/50 uppercase tracking-wide mb-1">Email</p>
                <p className="font-semibold text-white/80 text-sm">{config.brand.email}</p>
              </div>
            )}
          </div>

          {/* Address + maps button */}
          <div className="bg-[#0d0d0d] rounded-2xl border border-white/10 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-xs text-white/50 uppercase tracking-wide mb-1">Dirección completa</p>
              <p className="text-white/80 font-medium">{config.brand.address}</p>
            </div>
            <a
              href={config.brand.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 bg-[#f59e0b] hover:bg-[#d97706] text-black font-bold px-5 py-2.5 rounded-full text-sm transition-all"
            >
              Ver en Google Maps →
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────────────────── */}
      <footer className="bg-black border-t border-white/10 py-10 px-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left">
            {config.brand.logoImage ? (
              <img
                src={config.brand.logoImage}
                alt={config.brand.name}
                className="h-14 w-auto object-contain mx-auto sm:mx-0"
              />
            ) : (
              <p className="text-lg font-extrabold bg-gradient-to-r from-red-500 via-amber-400 to-blue-400 bg-clip-text text-transparent">
                {config.brand.logoText}
              </p>
            )}
            <p className="text-xs text-white/40 mt-1">Latin Room — Querétaro, México</p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 text-xs text-white/40">
            {config.footer.links.map((l, i) => (
              <span key={i}>{l}</span>
            ))}
          </div>

          <p className="text-xs text-white/30">
            © {config.footer.year} {config.brand.name}
          </p>
        </div>
      </footer>
    </div>
  );
}
