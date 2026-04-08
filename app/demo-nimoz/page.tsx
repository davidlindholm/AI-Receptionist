import { TelnyxWidgetController } from "@/components/TelnyxWidgetController";
import Link from "next/link";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

// ─── Nimoz exact assets ───────────────────────────────────────────────────────
const HERO_IMG    = "https://www.nimoz.se/uploads/fMjSNHBg/912x0_2560x0/el__msi___jpg.webp";
const IMG_LADDBOX = "https://www.nimoz.se/uploads/8QIOwMSi/768x0_800x0/ladda-elbil-800x600__msi___jpg.webp";
const IMG_SMART   = "https://www.nimoz.se/uploads/hhvslHj7/768x0_800x0/mobilstyrning-800x600__msi___jpg.webp";
const IMG_EL      = "https://www.nimoz.se/uploads/392Ia9SG/768x0_800x0/installation-800x600__msi___jpg.webp";
const IMG_ENERGY  = "https://www.nimoz.se/uploads/QOBBZ2Aq/768x0_800x0/el-2-800x600__msi___jpg.webp";
const IMG_INDUST  = "https://www.nimoz.se/uploads/eAu39ZdH/768x0_1024x0/el_195__msi___jpg.webp";
const IMG_CAMERA  = "https://www.nimoz.se/uploads/6seCxR0h/768x0_1024x0/olena-bohovyk-PLMJD95IN_0-unsplash_808__msi___jpg.webp";
const IMG_TEAM    = "https://www.nimoz.se/uploads/KPBC3zSN/768x0_640x0/IMG_3567_164__msi___jpg.webp";

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

// ─── Data ─────────────────────────────────────────────────────────────────────

const services = [
  {
    img: IMG_LADDBOX,
    title: "Laddbox",
    desc: "Vi installerar laddstationer och laddboxar för både privatpersoner och företag, vilket ger dig möjlighet att ta steget mot en grönare framtid och köra elbil på ett mer hållbart sätt.",
  },
  {
    img: IMG_SMART,
    title: "Smarthome",
    desc: "Vi hjälper dig med installation av smarthome-lösningar, vilket ger dig full kontroll över ditt hem direkt från mobilen — belysning, ventilation, övervakningssystem och mycket mer.",
  },
  {
    img: IMG_EL,
    title: "Felsökning och elinstallationer",
    desc: "Det är knappast något vi inte har möjlighet att lösa. Vi hjälper till med allt från enklare serviceuppdrag till mer avancerade projekt där ett kvalificerat tekniskt utförande krävs.",
  },
  {
    img: IMG_ENERGY,
    title: "Energilagring",
    desc: "Optimera elpriset och lagra din el på det bästa sättet. När du har solceller kan du passa på att få ett batteri installerat som laddas av solcellerna och används när det behövs.",
  },
  {
    img: IMG_INDUST,
    title: "Industrielektriker",
    desc: "Våra elektriker har den kompetens som krävs för att installera och underhålla elanläggningar i din verksamhet. Vi säkerställer pålitlig elförsörjning och optimal belysning.",
  },
  {
    img: IMG_CAMERA,
    title: "Kameraövervakning",
    desc: "Letar du efter en effektiv övervakningslösning för ditt hem, kontor eller industrilokal? Vi utformar och installerar en skräddarsydd kameraövervakningslösning som passar dina behov.",
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DemoNimozPage() {
  return (
    <div className={`${poppins.className} min-h-screen bg-white text-[#2b2e33]`}>

      {/* ── Top bar — exactly like nimoz.se ────────────────────────────────── */}
      <div className="bg-white border-b border-[#edf0f7] text-[13px] text-[#2b2e33]">
        <div className="mx-auto max-w-6xl w-full flex items-center justify-between px-6 py-2">
          <button data-open-widget
            className="flex items-center gap-1.5 hover:text-[#018bd3] transition-colors cursor-pointer">
            <IconMail className="w-3.5 h-3.5" /> Begär offert
          </button>
          <button data-open-widget
            className="flex items-center gap-1.5 hover:text-[#018bd3] transition-colors font-semibold cursor-pointer">
            <IconPhone className="w-3.5 h-3.5" /> 073-248 39 79
          </button>
        </div>
      </div>

      {/* ── Navigation ─────────────────────────────────────────────────────── */}
      <nav className="sticky top-0 z-50 bg-white shadow-sm border-b border-[#edf0f7]">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">

          {/* Logo */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://www.nimoz.se/uploads/s2bCGZix/nimoz__msi___png.png"
            alt="Nimoz Elinstallation AB"
            className="h-14 w-auto"
          />

          {/* Links */}
          <div className="hidden md:flex items-center gap-8 text-[15px] font-semibold text-[#2b2e33]">
            <a href="#" className="text-[#018bd3]">Hem</a>
            <a href="#elektriker" className="hover:text-[#018bd3] transition-colors">Elektriker</a>
            <a href="#tjanster"   className="hover:text-[#018bd3] transition-colors">Tjänster</a>
            <a href="#kontakt"    className="hover:text-[#018bd3] transition-colors">Kontakt</a>
          </div>

          {/* CTA */}
          <button data-open-widget
            className="rounded-[10px] bg-[#229380] px-5 py-2.5 text-sm font-semibold text-white
                       hover:bg-[#1fad94] transition-colors cursor-pointer">
            Begär offert
          </button>
        </div>
      </nav>

      {/* ── Hero — full bleed photo with dark overlay, nimoz.se layout ─────── */}
      <section
        className="relative text-white"
        style={{
          backgroundImage: `url(${HERO_IMG})`,
          backgroundSize: "cover",
          backgroundPosition: "50% 50%",
          backgroundRepeat: "no-repeat",
          paddingTop: "200px",
          paddingBottom: "160px",
        }}
      >
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(0,0,0,0.55)" }} />
        <div className="relative mx-auto max-w-6xl px-6">
          <p className="text-[15px] font-semibold text-white/80 mb-3">Nimoz Elinstallation</p>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight max-w-xl mb-6">
            Din elektriker i Jämtland
          </h1>
          <p className="text-[17px] text-white/80 max-w-xl leading-relaxed mb-8">
            När det gäller el är det oss på Nimoz du ska kontakta – vi har lång och bred
            erfarenhet från det mesta inom elinstallation. Vi hjälper dig med allt från
            enklare serviceåtgärder till mer tekniska uppdrag. Vi utgår från Strömsunds
            kommun, men erbjuder våra tjänster till kunder i hela Jämtlands län!
          </p>
          <button data-open-widget
            className="inline-block rounded-[10px] bg-white text-[#2b2e33] font-semibold
                       px-7 py-3.5 hover:bg-[#edf0f7] transition-colors text-[15px] cursor-pointer">
            Kontakta oss
          </button>
        </div>
      </section>

      {/* ── About two-col — nimoz.se "Erfaren / Lokal aktör" ──────────────── */}
      <section id="elektriker" className="bg-white py-16 border-b border-[#edf0f7]">
        <div className="mx-auto max-w-6xl px-6 grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold text-[#2b2e33] mb-4">Erfaren elektriker</h2>
            <p className="text-[#2b2e33] text-[17px] leading-relaxed mb-3">
              På Nimoz har vi mångårig erfarenhet som elektriker och vi erbjuder ett brett
              utbud av tjänster inom elinstallation.
            </p>
            <p className="text-[#2b2e33] text-[17px] leading-relaxed mb-3">
              Våra skickliga och yrkeskunniga elektriker har stor vana av att utföra alla
              typer av eljobb och jobbar alltid med säkerheten i fokus.
            </p>
            <p className="text-[#2b2e33] text-[17px] leading-relaxed">
              Precision, noggrannhet och stor yrkesskicklighet är ledande ord i vår
              verksamhet. Anlita oss och du är garanterad förstklassig service och
              en trygg elinstallation.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-[#2b2e33] mb-4">Lokal aktör</h2>
            <p className="text-[#2b2e33] text-[17px] leading-relaxed mb-3">
              Som en professionell och seriös elfirma i Jämtland har vi med åren skapat ett
              stort kontaktnät och vi månar starkt om att samarbeta på lokal nivå.
            </p>
            <p className="text-[#2b2e33] text-[17px] leading-relaxed mb-3">
              Idag erbjuder vi våra tjänster till kunder inom hela Jämtlands län där vi
              har vårt huvudsäte i Strömsunds kommun.
            </p>
            <p className="text-[#2b2e33] text-[17px] leading-relaxed">
              Vi räknar med olika typer av samarbeten med andra aktörer såsom Storåns Energi
              och har möjlighet till jouravtal för specifika kunder. Vill du veta mer om oss
              som elfirma? Hör av dig så berättar våra elektriker mer!
            </p>
          </div>
        </div>
      </section>

      {/* ── Services — image cards like nimoz.se ───────────────────────────── */}
      <section id="tjanster" className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-6">

          <h2 className="text-3xl font-bold text-[#2b2e33] mb-2">Våra elektrikertjänster</h2>
          <p className="text-[#2b2e33]/50 text-[17px] mb-10">
            Allt inom el och elinstallation under ett tak
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map(({ img, title, desc }) => (
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
                                   text-[#018bd3] group-hover:gap-2.5 transition-all">
                    Läs mer <IconArrow className="w-3.5 h-3.5" />
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
              <h2 className="text-3xl font-bold text-[#2b2e33] mb-4">Dialog och kundkontakt</h2>
              <p className="text-[#2b2e33]/70 text-[17px] leading-relaxed mb-4">
                När du anlitar elektriker på Nimoz kan du lita på en trygg service
                där transparens är A och O. Vi för alltid en nära dialog med våra kunder
                före, under och efter utförandet.
              </p>
              <p className="text-[#2b2e33]/70 text-[17px] leading-relaxed mb-8">
                Det ska helt enkelt kännas tryggt att anlita Nimoz och från vår sida
                sätter vi stort värde i en nära och personlig kundkontakt. Hör av dig
                om du önskar veta mer om våra tjänster och hur vi jobbar.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Auktoriserade och certifierade elektriker",
                  "Kostnadsfri offert och besiktning",
                  "Jouravtal för privat- och företagskunder",
                  "5 års garanti på utfört arbete",
                ].map((text) => (
                  <li key={text} className="flex items-start gap-3">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-[#229380] flex items-center
                                     justify-center shrink-0">
                      <IconCheck className="w-3 h-3 text-white" />
                    </span>
                    <span className="text-[#2b2e33] text-[15px]">{text}</span>
                  </li>
                ))}
              </ul>
              <button data-open-widget
                className="inline-block rounded-[10px] bg-[#229380] px-6 py-3 font-semibold
                           text-white text-[15px] hover:bg-[#1fad94] transition-colors cursor-pointer">
                Begär offert
              </button>
            </div>
            <div>
              <div className="rounded-lg overflow-hidden mb-6 shadow-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={IMG_TEAM} alt="Nimoz Elinstallation"
                  className="w-full h-72 object-cover" />
              </div>
              <div className="bg-white rounded-lg p-6 border border-[#edf0f7] shadow-sm">
                <blockquote className="text-[17px] font-semibold text-[#2b2e33] leading-relaxed mb-4
                                       border-l-4 border-[#229380] pl-4">
                  "Vi svarar alltid — även när vi är ute på jobb"
                </blockquote>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-[#018bd3] flex items-center justify-center
                                  text-white font-bold text-sm shrink-0">N</div>
                  <div>
                    <p className="font-semibold text-[#2b2e33] text-[15px]">Nimoz, ägare</p>
                    <p className="text-[13px] text-[#2b2e33]/50">Nimoz Elinstallation AB</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Quote form — nimoz.se layout ───────────────────────────────────── */}
      <section id="offert" className="bg-white py-16">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-3xl font-bold text-[#2b2e33] mb-2">Begär offert</h2>
          <p className="text-[#2b2e33]/50 text-[17px] mb-10">
            Önskar du ta del av priser och mer detaljerade uppgifter kring våra tjänster
            är du välkommen att kontakta oss.
          </p>

          <div className="bg-white rounded-lg shadow-md overflow-hidden border border-[#edf0f7]
                          grid md:grid-cols-[3fr_2fr]">

            {/* Form */}
            <form className="p-8 md:p-10 space-y-5">
              <div>
                <label className="block text-[14px] font-semibold text-[#2b2e33] mb-1.5">Namn</label>
                <input type="text" placeholder="Anna Lindgren"
                  className="w-full rounded-[10px] border border-[#edf0f7] bg-[#f8fafc] px-4 py-3
                             text-[15px] placeholder:text-[#2b2e33]/30
                             focus:outline-none focus:border-[#018bd3] focus:ring-2 focus:ring-[#018bd3]/20 transition" />
              </div>
              <div>
                <label className="block text-[14px] font-semibold text-[#2b2e33] mb-1.5">
                  E-post <span className="text-red-400">*</span>
                </label>
                <input type="email" placeholder="anna@example.se"
                  className="w-full rounded-[10px] border border-[#edf0f7] bg-[#f8fafc] px-4 py-3
                             text-[15px] placeholder:text-[#2b2e33]/30
                             focus:outline-none focus:border-[#018bd3] focus:ring-2 focus:ring-[#018bd3]/20 transition" />
              </div>
              <div>
                <label className="block text-[14px] font-semibold text-[#2b2e33] mb-1.5">Telefon</label>
                <input type="tel" placeholder="070-000 00 00"
                  className="w-full rounded-[10px] border border-[#edf0f7] bg-[#f8fafc] px-4 py-3
                             text-[15px] placeholder:text-[#2b2e33]/30
                             focus:outline-none focus:border-[#018bd3] focus:ring-2 focus:ring-[#018bd3]/20 transition" />
              </div>
              <div>
                <label className="block text-[14px] font-semibold text-[#2b2e33] mb-1.5">
                  Jag vill ha hjälp med: <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <select defaultValue=""
                    className="w-full appearance-none rounded-[10px] border border-[#edf0f7] bg-[#f8fafc] px-4 py-3
                               text-[15px] focus:outline-none focus:border-[#018bd3] focus:ring-2 focus:ring-[#018bd3]/20 transition">
                    <option value="" disabled>Välj tjänst...</option>
                    <option>Laddbox</option>
                    <option>Smarthome</option>
                    <option>Felsökning och elinstallationer</option>
                    <option>Energilagring</option>
                    <option>Industrielektriker</option>
                    <option>Kameraövervakning</option>
                    <option>Annat</option>
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
                  Meddelande <span className="text-red-400">*</span>
                </label>
                <textarea rows={4} placeholder="Beskriv kortfattat vad du behöver hjälp med..."
                  className="w-full rounded-[10px] border border-[#edf0f7] bg-[#f8fafc] px-4 py-3
                             text-[15px] placeholder:text-[#2b2e33]/30 resize-none
                             focus:outline-none focus:border-[#018bd3] focus:ring-2 focus:ring-[#018bd3]/20 transition" />
              </div>
              <p className="text-[13px] text-[#2b2e33]/50">
                Samtycker till att mina personuppgifter behandlas enligt integritetspolicyn.
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
                className="w-full rounded-[10px] bg-[#229380] py-3.5 font-semibold text-white text-[15px]
                           hover:bg-[#1fad94] transition-colors">
                Skicka offertförfrågan
              </button>
            </form>

            {/* Sidebar */}
            <div className="bg-[#229380] p-8 md:p-10 text-white flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold mb-2">Kontakta oss direkt</h3>
                <p className="text-white/70 text-[15px] mb-8">Föredrar du att ringa eller maila?</p>
                <div className="space-y-5">
                  {[
                    { Icon: IconPhone, label: "Telefon", value: "073-248 39 79" },
                    { Icon: IconMail,  label: "E-post",  value: "info@nimoz.se" },
                    { Icon: IconPin,   label: "Adress",  value: "Sikås amerikavägen 165, Hammerdal" },
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
                {["Certifierad elfirma", "Auktoriserade elektriker", "Jouravtal tillgängligt"].map((t) => (
                  <p key={t} className="flex items-center gap-2 text-[14px] text-white/80">
                    <IconCheck className="w-4 h-4 shrink-0" /> {t}
                  </p>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── AI Receptionist — on top of hero photo ─────────────────────────── */}
      <section id="ai-receptionist"
        className="relative text-white py-20"
        style={{ backgroundImage: `url(${HERO_IMG})`, backgroundSize: "cover", backgroundPosition: "50% 30%" }}>
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(0,0,0,0.72)" }} />
        <div className="relative mx-auto max-w-6xl px-6">
          <div className="grid md:grid-cols-2 gap-14 items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-[#229380]/30
                               border border-[#229380]/50 px-4 py-1.5 text-sm font-medium
                               text-[#4dd4bf] mb-7">
                <IconRobot className="w-4 h-4" /> AI-receptionist — alltid tillgänglig
              </span>
              <h2 className="text-3xl font-bold mb-4 leading-tight">Vi missar aldrig ett samtal</h2>
              <p className="text-white/80 text-[17px] leading-relaxed mb-7">
                Vår AI-receptionist svarar direkt — oavsett om det är mitt på natten
                eller om vi är mitt i ett jobb. Den samlar in dina uppgifter och
                meddelar oss omedelbart. Du slipper vänta, vi slipper missa kunder.
              </p>
              <ul className="space-y-3">
                {[
                  "Svarar på svenska dygnet runt",
                  "Identifierar brådskande ärenden automatiskt",
                  "Skickar notifiering till oss direkt",
                  "Du får alltid ett snabbt återkoppling",
                ].map((p) => (
                  <li key={p} className="flex items-center gap-3 text-[15px] text-white/80">
                    <span className="w-5 h-5 rounded-full bg-[#229380] flex items-center justify-center shrink-0">
                      <IconCheck className="w-3 h-3 text-white" />
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex justify-center">
              <div className="rounded-lg bg-white/10 border border-white/20 p-8 w-full max-w-sm backdrop-blur-sm text-center">
                <p className="text-[13px] font-semibold text-[#229380] mb-6 uppercase tracking-widest">
                  Livedemonstration
                </p>
                <button data-open-widget
                  className="mx-auto flex items-center justify-center gap-3 rounded-full
                             bg-[#229380] hover:bg-[#1fad94] transition-colors
                             w-20 h-20 cursor-pointer">
                  <IconPhone className="w-8 h-8 text-white" />
                </button>
                <p className="mt-6 text-[13px] text-white/50 leading-relaxed">
                  Tryck på knappen och tala direkt med AI-receptionisten
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Contact ────────────────────────────────────────────────────────── */}
      <section id="kontakt" className="bg-[#edf0f7] py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-3xl font-bold text-[#2b2e33] mb-2">Kontakt</h2>
          <p className="text-[#2b2e33]/50 text-[17px] mb-10">Vi finns här för dig</p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { Icon: IconPhone, title: "Telefon",  value: "073-248 39 79",       sub: "Dygnet runt vid akuta ärenden" },
              { Icon: IconMail,  title: "E-post",   value: "info@nimoz.se", sub: "Svar inom 1 arbetsdag" },
              { Icon: IconPin,   title: "Adress",   value: "Sikås amerikavägen 165, Hammerdal",  sub: "Öppet mån–fre 07–17" },
            ].map(({ Icon, title, value, sub }) => (
              <div key={title}
                className="rounded-lg bg-white border border-[#edf0f7] p-6 shadow-sm text-center
                           hover:shadow-md hover:border-[#018bd3]/20 transition-all duration-200">
                <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-[#018bd3]/10
                                flex items-center justify-center">
                  <Icon className="w-6 h-6 text-[#018bd3]" />
                </div>
                <p className="font-bold text-[#2b2e33] text-[17px]">{title}</p>
                <p className="mt-1.5 text-[#018bd3] font-semibold text-[15px]">{value}</p>
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
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://www.nimoz.se/uploads/s2bCGZix/nimoz__msi___png.png"
                alt="Nimoz Elinstallation AB"
                className="h-14 w-auto brightness-0 invert"
              />
            </div>
            <p className="text-white/50 text-[14px] leading-relaxed mb-4">
              Nimoz Elinstallation<br />
              Sikås amerikavägen 165, 833 49 Hammerdal<br />
              info@nimoz.se · 073-248 39 79
            </p>
            <Link href="/dashboard" className="text-[#229380] text-[14px] hover:underline">
              Admin dashboard →
            </Link>
          </div>
          <div className="md:text-right">
            <p className="text-[13px] font-semibold text-white/40 uppercase tracking-widest mb-4">
              Certifieringar &amp; information
            </p>
            <div className="flex flex-wrap md:justify-end gap-3 mb-6">
              {["Certifierad elfirma", "Elsäkerhetsverket", "Auktoriserad", "Rot-avdrag"].map((cert) => (
                <span key={cert}
                  className="rounded-[10px] bg-white/10 border border-white/10 px-3 py-1.5 text-[13px] text-white/70">
                  {cert}
                </span>
              ))}
            </div>
            <p className="text-white/30 text-[13px]">
              © 2026 Nimoz Elinstallation. Alla rättigheter förbehållna.
            </p>
            <p className="text-white/20 text-[12px] mt-1">Cookies &amp; Integritetspolicy</p>
          </div>
        </div>
      </footer>

      {/* Hidden widget — initialized in DOM, launcher button hidden via JS */}
      <TelnyxWidgetController agentId="assistant-1187a5d8-a489-4e2b-b67c-c817d556df0a" />

    </div>
  );
}
