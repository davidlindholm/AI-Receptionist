import { TelnyxWidget } from "@/components/TelnyxWidget";
import Link from "next/link";

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">

      {/* ── Navigation ───────────────────────────────────────────── */}
      <nav className="sticky top-0 z-50 border-b border-gray-100 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🔧</span>
            <span className="text-lg font-bold text-gray-900">Nilssons VVS</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            <a href="#tjanster" className="hover:text-blue-600">Tjänster</a>
            <a href="#om-oss" className="hover:text-blue-600">Om oss</a>
            <a href="#recensioner" className="hover:text-blue-600">Recensioner</a>
            <a href="#kontakt" className="hover:text-blue-600">Kontakt</a>
          </div>
          <a
            href="tel:+46400000000"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            📞 040-000 00 00
          </a>
        </div>
      </nav>

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-blue-600 to-blue-800 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 h-72 w-72 rounded-full bg-white blur-3xl" />
          <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-blue-300 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-6xl px-6 py-24 md:py-32">
          <div className="max-w-2xl">
            <span className="inline-block rounded-full bg-white/20 px-3 py-1 text-sm font-medium mb-6">
              ✅ Auktoriserad VVS-firma sedan 1994
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
              Din pålitliga<br />VVS-partner i<br />Malmö
            </h1>
            <p className="mt-6 text-lg text-blue-100 max-w-xl">
              Vi utför rörarbeten, installerar värmepumpar och solceller för privatpersoner
              och företag. Snabbt, tryggt och alltid till rätt pris.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#ai-receptionist"
                className="rounded-xl bg-white px-6 py-3 font-semibold text-blue-700 hover:bg-blue-50 transition"
              >
                Testa AI-receptionisten
              </a>
              <a
                href="#tjanster"
                className="rounded-xl border border-white/40 px-6 py-3 font-semibold text-white hover:bg-white/10 transition"
              >
                Våra tjänster →
              </a>
            </div>
            <div className="mt-10 flex flex-wrap gap-6 text-sm text-blue-100">
              <span>✓ Kostnadsfri offert</span>
              <span>✓ F-skattsedel</span>
              <span>✓ Rot-avdrag</span>
              <span>✓ 5 års garanti</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Quick stats ──────────────────────────────────────────── */}
      <section className="border-b border-gray-100 bg-gray-50">
        <div className="mx-auto max-w-6xl px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: "30+", label: "År i branschen" },
            { value: "2 400+", label: "Nöjda kunder" },
            { value: "4.9 ★", label: "Snittbetyg" },
            { value: "24/7", label: "Jour vid akuta ärenden" },
          ].map((s) => (
            <div key={s.label}>
              <p className="text-3xl font-extrabold text-blue-600">{s.value}</p>
              <p className="mt-1 text-sm text-gray-500">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Services ─────────────────────────────────────────────── */}
      <section id="tjanster" className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">Våra tjänster</h2>
        <p className="text-center text-gray-500 mb-12">Allt inom VVS under ett tak</p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: "🚿",
              title: "Rörarbeten & VVS",
              desc: "Stambyten, badrumsrenoveringar, läckagejakt och reparationer av alla slag.",
            },
            {
              icon: "♨️",
              title: "Värmepumpar",
              desc: "Installation och service av luft/vatten-, berg- och luftvärmepumpar.",
            },
            {
              icon: "☀️",
              title: "Solceller",
              desc: "Kompletta solenergisystem anpassade för ditt hus eller din fastighet.",
            },
            {
              icon: "💨",
              title: "Ventilation",
              desc: "FTX-system, tillufts- och frånluftsaggregat, injustering och service.",
            },
          ].map((s) => (
            <div
              key={s.title}
              className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-md transition"
            >
              <div className="text-4xl mb-4">{s.icon}</div>
              <h3 className="font-bold text-gray-900 mb-2">{s.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Why us ───────────────────────────────────────────────── */}
      <section id="om-oss" className="bg-blue-50 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Varför välja Nilssons VVS?
              </h2>
              <p className="text-gray-500 mb-8 leading-relaxed">
                Vi har hjälpt malmöbor med sina VVS-behov i över 30 år. Hos oss
                får du alltid ett ärligt pris, en certifierad hantverkare och en
                garanti på utfört arbete.
              </p>
              <ul className="space-y-4">
                {[
                  { icon: "🏅", text: "Auktoriserade och certifierade installatörer" },
                  { icon: "📋", text: "Kostnadsfri besiktning och offert" },
                  { icon: "💰", text: "Rot-avdrag på allt arbete i hemmet" },
                  { icon: "🚨", text: "Akutjour dygnet runt, alla dagar" },
                  { icon: "🔒", text: "5 års garanti på allt utfört arbete" },
                ].map((p) => (
                  <li key={p.text} className="flex items-start gap-3">
                    <span className="text-xl">{p.icon}</span>
                    <span className="text-gray-700">{p.text}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl bg-white border border-blue-100 p-8 shadow-sm">
              <p className="text-lg font-semibold text-gray-800 mb-2">
                "Vi svarar alltid — även när vi är ute på jobb"
              </p>
              <p className="text-gray-500 leading-relaxed">
                Vår AI-receptionist tar emot ditt samtal, samlar in dina uppgifter
                och ser till att rätt person återkommer till dig så snart som möjligt.
                Ingen telefonkö, ingen väntetid.
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                  N
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Nilsson, ägare</p>
                  <p className="text-sm text-gray-500">Nilssons VVS AB</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────────────── */}
      <section id="recensioner" className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">Vad våra kunder säger</h2>
        <p className="text-center text-gray-500 mb-12">Över 2 400 nöjda kunder i Malmöregionen</p>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              name: "Anna Lindgren",
              location: "Limhamn",
              rating: 5,
              text: "Snabb och professionell service. Ringte på morgonen och de var hos oss redan på eftermiddagen. Löste läckaget snabbt och städade efter sig. Kan varmt rekommendera!",
            },
            {
              name: "Erik Johansson",
              location: "Husie",
              rating: 5,
              text: "Installerade värmepump hos oss och är jättenöjda. Bra pris, trevligt folk och jobbet gjordes på utsatt tid. AI-receptionisten tog emot mitt samtal direkt när jag ringde.",
            },
            {
              name: "Maria Svensson",
              location: "Centrum",
              rating: 5,
              text: "Totalrenoverade badrummet med Nilssons VVS. Hög kvalitet på allt arbete och tydlig kommunikation hela vägen. Solcelleranläggningen de installerade sparar oss mycket pengar.",
            },
          ].map((r) => (
            <div key={r.name} className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: r.rating }).map((_, i) => (
                  <span key={i} className="text-yellow-400">★</span>
                ))}
              </div>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">"{r.text}"</p>
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm">
                  {r.name[0]}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">{r.name}</p>
                  <p className="text-xs text-gray-400">{r.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── AI Receptionist Demo ─────────────────────────────────── */}
      <section id="ai-receptionist" className="bg-gradient-to-br from-gray-900 to-blue-950 text-white py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block rounded-full bg-blue-500/20 border border-blue-400/30 px-3 py-1 text-sm font-medium text-blue-300 mb-6">
                🤖 AI-receptionist — alltid tillgänglig
              </span>
              <h2 className="text-3xl font-bold mb-4">
                Vi missar aldrig ett samtal
              </h2>
              <p className="text-gray-300 leading-relaxed mb-6">
                Vår AI-receptionist svarar direkt — oavsett om det är mitt på natten
                eller om vi är mitt i ett jobb. Den samlar in dina uppgifter och
                meddelar oss omedelbart. Du slipper vänta, vi slipper missa kunder.
              </p>
              <ul className="space-y-3 text-sm text-gray-300">
                {[
                  "Svarar på svenska dygnet runt",
                  "Identifierar brådskande ärenden automatiskt",
                  "Skickar notifiering till oss direkt",
                  "Du får alltid ett snabbt återkoppling",
                ].map((p) => (
                  <li key={p} className="flex items-center gap-2">
                    <span className="text-blue-400">✓</span> {p}
                  </li>
                ))}
              </ul>
            </div>

            {/* Widget */}
            <div className="flex justify-center">
              <div className="rounded-2xl bg-white/10 backdrop-blur border border-white/20 p-8 w-full max-w-sm">
                <p className="text-center text-sm font-medium text-blue-200 mb-6 uppercase tracking-wide">
                  Livedemonstration
                </p>
                <div className="flex justify-center">
                  <TelnyxWidget />
                </div>
                <p className="mt-6 text-center text-xs text-gray-400">
                  Tryck på knappen och tala direkt med AI-receptionisten —
                  precis som ett riktigt telefonsamtal
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Contact ──────────────────────────────────────────────── */}
      <section id="kontakt" className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">Kontakta oss</h2>
        <p className="text-center text-gray-500 mb-12">Vi finns här för dig — ring, maila eller besök oss</p>

        <div className="grid md:grid-cols-3 gap-6 text-center">
          {[
            { icon: "📞", title: "Telefon", value: "040-000 00 00", sub: "Dygnet runt vid akuta ärenden" },
            { icon: "📧", title: "E-post", value: "info@nilssonsvvs.se", sub: "Svar inom 1 arbetsdag" },
            { icon: "📍", title: "Adress", value: "Storgatan 12, Malmö", sub: "Öppet mån–fre 07–17" },
          ].map((c) => (
            <div key={c.title} className="rounded-2xl border border-gray-100 bg-gray-50 p-6">
              <div className="text-3xl mb-3">{c.icon}</div>
              <p className="font-semibold text-gray-900">{c.title}</p>
              <p className="mt-1 text-blue-600 font-medium">{c.value}</p>
              <p className="mt-1 text-sm text-gray-400">{c.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────── */}
      <footer className="border-t border-gray-100 bg-gray-50">
        <div className="mx-auto max-w-6xl px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <span>🔧</span>
            <span className="font-semibold text-gray-600">Nilssons VVS AB</span>
            <span>· Org.nr 556000-0000</span>
          </div>
          <p>© 2026 Nilssons VVS. Alla rättigheter förbehållna.</p>
          <Link href="/dashboard" className="text-blue-500 hover:underline">
            Admin dashboard →
          </Link>
        </div>
      </footer>

    </div>
  );
}
