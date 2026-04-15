"use client";

import { TelnyxWidgetController } from "@/components/TelnyxWidgetController";
import { t, type Lang } from "@/lib/i18n";
import Link from "next/link";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

// ─── Config type ──────────────────────────────────────────────────────────────

export interface BusinessConfig {
  brand: {
    name: string;          // Full company name (used in nav, footer, AI section)
    short: string;         // Short label for first-letter avatar (e.g., "N" for Nimoz)
    logoUrl?: string;      // Optional image logo URL; if absent, a text logo is rendered
    logoText?: string;     // Text shown when logoUrl is absent
    phone: string;         // Display + click-to-call value
    email: string;
    address: string;       // Full street address
    addressShort?: string; // Optional shorter address for mobile / footer
    cityRegion: string;    // e.g., "Jämtland", "Stockholm" — used in tagline
  };
  colors: {
    primary: string;       // Link / accent (Nimoz uses #018bd3)
    accent: string;        // CTA buttons (Nimoz uses #229380)
    accentHover: string;   // CTA hover (Nimoz uses #1fad94)
  };
  hero: {
    image: string;
    eyebrow: string;
    title: string;         // Multi-line allowed via \n
    body: string;
    cta: string;
  };
  about: {
    leftTitle: string;
    leftParagraphs: string[];
    rightTitle: string;
    rightParagraphs: string[];
  };
  services: {
    sectionTitle: string;
    sectionSubtitle: string;
    items: { img: string; title: string; desc: string }[];
  };
  dialog: {
    title: string;
    paragraphs: string[];
    bullets: string[];
    teamImage: string;
    quote: string;
    ownerName: string;
    ownerTitle: string;
  };
  quoteForm: {
    intro: string;
    serviceOptions: string[];
  };
  aiSection: {
    title: string;
    body: string;
    bullets: string[];
  };
  footer: {
    certs: string[];
    year: number;
  };
  slug: string;     // Used to build the per-company dashboard link: /dashboard/{slug}
  agentId: string;
  language?: Lang;  // UI language (default: "sv")
}

// ─── Icons ────────────────────────────────────────────────────────────────────

function IconPhone({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
      strokeWidth={1.8} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 6z" />
    </svg>
  );
}
function IconMail({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
      strokeWidth={1.8} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
    </svg>
  );
}
function IconPin({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
      strokeWidth={1.8} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
    </svg>
  );
}
function IconCheck({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
      strokeWidth={2.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
    </svg>
  );
}
function IconArrow({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
      strokeWidth={2} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
    </svg>
  );
}
function IconRobot({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
      strokeWidth={1.8} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M9 3.75H6.912a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H15M2.25 13.5h3.86a2.251 2.251 0 0 1 2.012 1.244l.256.512a2.251 2.251 0 0 0 2.012 1.244h3.218a2.251 2.251 0 0 0 2.012-1.244l.256-.512a2.251 2.251 0 0 1 2.012-1.244h3.866M12 3v8.25m0 0-3-3m3 3 3-3" />
    </svg>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export function BusinessLandingPage({ config }: { config: BusinessConfig }) {
  const { brand, colors, hero, about, services, dialog, quoteForm, aiSection, footer, slug, agentId, language: lang = "sv" } = config;

  return (
    <div className={`${poppins.className} min-h-screen bg-white text-[#2b2e33]`}>

      {/* ── Top bar ────────────────────────────────────────────────────────── */}
      <div className="bg-white border-b border-[#edf0f7] text-[13px] text-[#2b2e33]">
        <div className="mx-auto max-w-6xl w-full flex items-center justify-between px-6 py-2">
          <button data-open-widget
            className="flex items-center gap-1.5 transition-colors cursor-pointer"
            style={{ color: "inherit" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = colors.primary)}
            onMouseLeave={(e) => (e.currentTarget.style.color = "inherit")}>
            <IconMail className="w-3.5 h-3.5" /> {t("requestQuote", lang)}
          </button>
          <button data-open-widget
            className="flex items-center gap-1.5 transition-colors font-semibold cursor-pointer"
            style={{ color: "inherit" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = colors.primary)}
            onMouseLeave={(e) => (e.currentTarget.style.color = "inherit")}>
            <IconPhone className="w-3.5 h-3.5" /> {brand.phone}
          </button>
        </div>
      </div>

      {/* ── Navigation ─────────────────────────────────────────────────────── */}
      <nav className="sticky top-0 z-50 bg-white shadow-sm border-b border-[#edf0f7]">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">

          {/* Logo */}
          {brand.logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={brand.logoUrl}
              alt={brand.name}
              className="h-14 w-auto"
            />
          ) : (
            <span
              className="text-2xl font-extrabold tracking-tight"
              style={{ color: colors.primary }}
            >
              {brand.logoText ?? brand.name}
            </span>
          )}

          {/* Links */}
          <div className="hidden md:flex items-center gap-8 text-[15px] font-semibold text-[#2b2e33]">
            <a href="#" style={{ color: colors.primary }}>{t("home", lang)}</a>
            <a href="#om-oss" className="transition-colors"
              onMouseEnter={(e) => (e.currentTarget.style.color = colors.primary)}
              onMouseLeave={(e) => (e.currentTarget.style.color = "")}>{t("aboutUs", lang)}</a>
            <a href="#tjanster" className="transition-colors"
              onMouseEnter={(e) => (e.currentTarget.style.color = colors.primary)}
              onMouseLeave={(e) => (e.currentTarget.style.color = "")}>{t("services", lang)}</a>
            <a href="#kontakt" className="transition-colors"
              onMouseEnter={(e) => (e.currentTarget.style.color = colors.primary)}
              onMouseLeave={(e) => (e.currentTarget.style.color = "")}>{t("contact", lang)}</a>
          </div>

          {/* CTA */}
          <button data-open-widget
            className="rounded-[10px] px-5 py-2.5 text-sm font-semibold text-white transition-colors cursor-pointer"
            style={{ backgroundColor: colors.accent }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = colors.accentHover)}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = colors.accent)}>
            {t("requestQuote", lang)}
          </button>
        </div>
      </nav>

      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section
        className="relative text-white"
        style={{
          backgroundImage: `url(${hero.image})`,
          backgroundSize: "cover",
          backgroundPosition: "50% 50%",
          backgroundRepeat: "no-repeat",
          paddingTop: "200px",
          paddingBottom: "160px",
        }}
      >
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(0,0,0,0.55)" }} />
        <div className="relative mx-auto max-w-6xl px-6">
          <p className="text-[15px] font-semibold text-white/80 mb-3">{hero.eyebrow}</p>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight max-w-xl mb-6 whitespace-pre-line">
            {hero.title}
          </h1>
          <p className="text-[17px] text-white/80 max-w-xl leading-relaxed mb-8">
            {hero.body}
          </p>
          <button data-open-widget
            className="inline-block rounded-[10px] bg-white text-[#2b2e33] font-semibold
                       px-7 py-3.5 hover:bg-[#edf0f7] transition-colors text-[15px] cursor-pointer">
            {hero.cta}
          </button>
        </div>
      </section>

      {/* ── About two-col ──────────────────────────────────────────────────── */}
      <section id="om-oss" className="bg-white py-16 border-b border-[#edf0f7]">
        <div className="mx-auto max-w-6xl px-6 grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold text-[#2b2e33] mb-4">{about.leftTitle}</h2>
            {about.leftParagraphs.map((p, i) => (
              <p key={i} className="text-[#2b2e33] text-[17px] leading-relaxed mb-3 last:mb-0">{p}</p>
            ))}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-[#2b2e33] mb-4">{about.rightTitle}</h2>
            {about.rightParagraphs.map((p, i) => (
              <p key={i} className="text-[#2b2e33] text-[17px] leading-relaxed mb-3 last:mb-0">{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services ───────────────────────────────────────────────────────── */}
      <section id="tjanster" className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-6">

          <h2 className="text-3xl font-bold text-[#2b2e33] mb-2">{services.sectionTitle}</h2>
          <p className="text-[#2b2e33]/50 text-[17px] mb-10">
            {services.sectionSubtitle}
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.items.map(({ img, title, desc }) => (
              <div key={title}
                className="group rounded-lg overflow-hidden border border-[#edf0f7]
                           hover:shadow-lg transition-all duration-200">
                <div className="overflow-hidden h-48">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img} alt={title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-[#2b2e33] text-[17px] mb-2">{title}</h3>
                  <p className="text-[15px] text-[#2b2e33]/60 leading-relaxed mb-4">{desc}</p>
                  <span className="inline-flex items-center gap-1.5 text-[14px] font-semibold
                                   group-hover:gap-2.5 transition-all"
                    style={{ color: colors.primary }}>
                    {t("readMore", lang)} <IconArrow className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Dialog / about section ─────────────────────────────────────────── */}
      <section className="bg-[#edf0f7] py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-[#2b2e33] mb-4">{dialog.title}</h2>
              {dialog.paragraphs.map((p, i) => (
                <p key={i} className="text-[#2b2e33]/70 text-[17px] leading-relaxed mb-4 last:mb-8">{p}</p>
              ))}
              <ul className="space-y-3 mb-8">
                {dialog.bullets.map((text) => (
                  <li key={text} className="flex items-start gap-3">
                    <span className="mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                      style={{ backgroundColor: colors.accent }}>
                      <IconCheck className="w-3 h-3 text-white" />
                    </span>
                    <span className="text-[#2b2e33] text-[15px]">{text}</span>
                  </li>
                ))}
              </ul>
              <button data-open-widget
                className="inline-block rounded-[10px] px-6 py-3 font-semibold text-white text-[15px] transition-colors cursor-pointer"
                style={{ backgroundColor: colors.accent }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = colors.accentHover)}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = colors.accent)}>
                {t("requestQuote", lang)}
              </button>
            </div>
            <div>
              <div className="rounded-lg overflow-hidden mb-6 shadow-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={dialog.teamImage} alt={brand.name}
                  className="w-full h-72 object-cover" />
              </div>
              <div className="bg-white rounded-lg p-6 border border-[#edf0f7] shadow-sm">
                <blockquote className="text-[17px] font-semibold text-[#2b2e33] leading-relaxed mb-4 pl-4"
                  style={{ borderLeft: `4px solid ${colors.accent}` }}>
                  &ldquo;{dialog.quote}&rdquo;
                </blockquote>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0"
                    style={{ backgroundColor: colors.primary }}>
                    {brand.short}
                  </div>
                  <div>
                    <p className="font-semibold text-[#2b2e33] text-[15px]">{dialog.ownerName}</p>
                    <p className="text-[13px] text-[#2b2e33]/50">{dialog.ownerTitle}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Quote form ─────────────────────────────────────────────────────── */}
      <section id="offert" className="bg-white py-16">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-3xl font-bold text-[#2b2e33] mb-2">{t("requestQuote", lang)}</h2>
          <p className="text-[#2b2e33]/50 text-[17px] mb-10">
            {quoteForm.intro}
          </p>

          <div className="bg-white rounded-lg shadow-md overflow-hidden border border-[#edf0f7]
                          grid md:grid-cols-[3fr_2fr]">

            {/* Form */}
            <form className="p-8 md:p-10 space-y-5">
              <div>
                <label className="block text-[14px] font-semibold text-[#2b2e33] mb-1.5">{t("formName", lang)}</label>
                <input type="text" placeholder={t("formNamePh", lang)}
                  className="w-full rounded-[10px] border border-[#edf0f7] bg-[#f8fafc] px-4 py-3
                             text-[15px] placeholder:text-[#2b2e33]/30
                             focus:outline-none transition" />
              </div>
              <div>
                <label className="block text-[14px] font-semibold text-[#2b2e33] mb-1.5">
                  {t("formEmail", lang)} <span className="text-red-400">*</span>
                </label>
                <input type="email" placeholder={t("formEmailPh", lang)}
                  className="w-full rounded-[10px] border border-[#edf0f7] bg-[#f8fafc] px-4 py-3
                             text-[15px] placeholder:text-[#2b2e33]/30
                             focus:outline-none transition" />
              </div>
              <div>
                <label className="block text-[14px] font-semibold text-[#2b2e33] mb-1.5">{t("formPhone", lang)}</label>
                <input type="tel" placeholder={t("formPhonePh", lang)}
                  className="w-full rounded-[10px] border border-[#edf0f7] bg-[#f8fafc] px-4 py-3
                             text-[15px] placeholder:text-[#2b2e33]/30
                             focus:outline-none transition" />
              </div>
              <div>
                <label className="block text-[14px] font-semibold text-[#2b2e33] mb-1.5">
                  {t("formServiceLabel", lang)} <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <select defaultValue=""
                    className="w-full appearance-none rounded-[10px] border border-[#edf0f7] bg-[#f8fafc] px-4 py-3
                               text-[15px] focus:outline-none transition">
                    <option value="" disabled>{t("formServicePh", lang)}</option>
                    {quoteForm.serviceOptions.map((opt) => (
                      <option key={opt}>{opt}</option>
                    ))}
                    <option>{t("formOther", lang)}</option>
                  </select>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                    strokeWidth={2} stroke="currentColor"
                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#2b2e33]/40">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                  </svg>
                </div>
              </div>
              <div>
                <label className="block text-[14px] font-semibold text-[#2b2e33] mb-1.5">
                  {t("formMessage", lang)} <span className="text-red-400">*</span>
                </label>
                <textarea rows={4} placeholder={t("formMessagePh", lang)}
                  className="w-full rounded-[10px] border border-[#edf0f7] bg-[#f8fafc] px-4 py-3
                             text-[15px] placeholder:text-[#2b2e33]/30 resize-none
                             focus:outline-none transition" />
              </div>
              <p className="text-[13px] text-[#2b2e33]/50">
                {t("formConsent", lang)}
              </p>
              {/* hCaptcha placeholder */}
              <div className="rounded-[10px] border border-[#edf0f7] bg-[#f8fafc] h-[78px] flex items-center
                              justify-center gap-2 text-[13px] text-[#2b2e33]/40">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                  strokeWidth={1.8} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                </svg>
                hCaptcha
              </div>
              <button type="submit"
                className="w-full rounded-[10px] py-3.5 font-semibold text-white text-[15px] transition-colors"
                style={{ backgroundColor: colors.accent }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = colors.accentHover)}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = colors.accent)}>
                {t("formSubmit", lang)}
              </button>
            </form>

            {/* Sidebar */}
            <div className="p-8 md:p-10 text-white flex flex-col justify-between"
              style={{ backgroundColor: colors.accent }}>
              <div>
                <h3 className="text-xl font-bold mb-2">{t("contactDirect", lang)}</h3>
                <p className="text-white/70 text-[15px] mb-8">{t("contactDirectSub", lang)}</p>
                <div className="space-y-5">
                  {[
                    { Icon: IconPhone, label: t("phone", lang), value: brand.phone },
                    { Icon: IconMail,  label: t("email", lang),  value: brand.email },
                    { Icon: IconPin,   label: t("address", lang),  value: brand.addressShort ?? brand.address },
                  ].map(({ Icon, label, value }) => (
                    <div key={label} className="flex items-start gap-3">
                      <Icon className="w-5 h-5 text-white/70 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-[15px]">{label}</p>
                        <p className="text-white/70 text-[14px]">{value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-10 space-y-2 border-t border-white/20 pt-6">
                {footer.certs.slice(0, 3).map((t) => (
                  <p key={t} className="flex items-center gap-2 text-[14px] text-white/80">
                    <IconCheck className="w-4 h-4 shrink-0" /> {t}
                  </p>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── AI Receptionist ────────────────────────────────────────────────── */}
      <section id="ai-receptionist"
        className="relative text-white py-20"
        style={{ backgroundImage: `url(${hero.image})`, backgroundSize: "cover", backgroundPosition: "50% 30%" }}>
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(0,0,0,0.72)" }} />
        <div className="relative mx-auto max-w-6xl px-6">
          <div className="grid md:grid-cols-2 gap-14 items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-medium mb-7"
                style={{
                  backgroundColor: `${colors.accent}4d`,
                  borderColor: `${colors.accent}80`,
                  color: "#ffffff",
                }}>
                <IconRobot className="w-4 h-4" /> {t("aiReceptionist", lang)}
              </span>
              <h2 className="text-3xl font-bold mb-4 leading-tight">{aiSection.title}</h2>
              <p className="text-white/80 text-[17px] leading-relaxed mb-7">
                {aiSection.body}
              </p>
              <ul className="space-y-3">
                {aiSection.bullets.map((p) => (
                  <li key={p} className="flex items-center gap-3 text-[15px] text-white/80">
                    <span className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                      style={{ backgroundColor: colors.accent }}>
                      <IconCheck className="w-3 h-3 text-white" />
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex justify-center">
              <div className="rounded-lg bg-white/10 border border-white/20 p-8 w-full max-w-sm backdrop-blur-sm text-center">
                <p className="text-[13px] font-semibold mb-6 uppercase tracking-widest"
                  style={{ color: colors.accent }}>
                  {t("liveDemo", lang)}
                </p>
                <button data-open-widget
                  className="mx-auto flex items-center justify-center gap-3 rounded-full transition-colors w-20 h-20 cursor-pointer"
                  style={{ backgroundColor: colors.accent }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = colors.accentHover)}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = colors.accent)}>
                  <IconPhone className="w-8 h-8 text-white" />
                </button>
                <p className="mt-6 text-[13px] text-white/50 leading-relaxed">
                  {t("liveDemoSub", lang)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Contact ────────────────────────────────────────────────────────── */}
      <section id="kontakt" className="bg-[#edf0f7] py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-3xl font-bold text-[#2b2e33] mb-2">{t("contactTitle", lang)}</h2>
          <p className="text-[#2b2e33]/50 text-[17px] mb-10">{t("contactSub", lang)}</p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { Icon: IconPhone, title: t("phone", lang),  value: brand.phone, sub: t("phoneHours", lang) },
              { Icon: IconMail,  title: t("email", lang),   value: brand.email, sub: t("emailResponse", lang) },
              { Icon: IconPin,   title: t("address", lang),   value: brand.address, sub: t("officeHours", lang) },
            ].map(({ Icon, title, value, sub }) => (
              <div key={title}
                className="rounded-lg bg-white border border-[#edf0f7] p-6 shadow-sm text-center
                           hover:shadow-md transition-all duration-200">
                <div className="mx-auto mb-4 w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${colors.primary}1a` }}>
                  <span style={{ color: colors.primary }}><Icon className="w-6 h-6" /></span>
                </div>
                <p className="font-bold text-[#2b2e33] text-[17px]">{title}</p>
                <p className="mt-1.5 font-semibold text-[15px]" style={{ color: colors.primary }}>{value}</p>
                <p className="mt-1 text-[13px] text-[#2b2e33]/50">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────────────── */}
      <footer className="bg-[#2b2e33] text-white">
        <div className="mx-auto max-w-6xl px-6 py-12 grid md:grid-cols-2 gap-8">
          <div>
            <div className="mb-4">
              {brand.logoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={brand.logoUrl}
                  alt={brand.name}
                  className="h-14 w-auto brightness-0 invert"
                />
              ) : (
                <span className="text-2xl font-extrabold tracking-tight text-white">
                  {brand.logoText ?? brand.name}
                </span>
              )}
            </div>
            <p className="text-white/50 text-[14px] leading-relaxed mb-4">
              {brand.name}<br />
              {brand.address}<br />
              {brand.email} · {brand.phone}
            </p>
            <Link href={`/dashboard/${slug}`} className="text-[14px] hover:underline" style={{ color: colors.accent }}>
              Dashboard →
            </Link>
          </div>
          <div className="md:text-right">
            <p className="text-[13px] font-semibold text-white/40 uppercase tracking-widest mb-4">
              {t("certsTitle", lang)}
            </p>
            <div className="flex flex-wrap md:justify-end gap-3 mb-6">
              {footer.certs.map((cert) => (
                <span key={cert}
                  className="rounded-[10px] bg-white/10 border border-white/10 px-3 py-1.5 text-[13px] text-white/70">
                  {cert}
                </span>
              ))}
            </div>
            <p className="text-white/30 text-[13px]">
              © {footer.year} {brand.name}. {t("allRights", lang)}
            </p>
            <p className="text-white/20 text-[12px] mt-1">{t("cookies", lang)}</p>
          </div>
        </div>
      </footer>

      {/* Hidden widget — initialized in DOM, launcher button hidden via JS */}
      <TelnyxWidgetController agentId={agentId} />

    </div>
  );
}
