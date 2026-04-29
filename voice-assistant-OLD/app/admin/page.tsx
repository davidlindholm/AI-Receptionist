"use client";

import { useState } from "react";
import Link from "next/link";
import { COMPANIES } from "@/lib/companies";
import { t, type Lang } from "@/lib/i18n";

const swedenCompanies = COMPANIES.filter((c) => (c.language ?? "sv") === "sv");
const mexicoCompanies = COMPANIES.filter((c) => c.language === "es");

export default function AdminPage() {
  const [lang, setLang] = useState<Lang>("sv");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-5xl px-6 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {t("adminTitle", lang)}
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              {t("adminSubtitle", lang)}
            </p>
          </div>

          {/* Language toggle */}
          <div className="flex items-center bg-gray-100 rounded-full p-1">
            <button
              onClick={() => setLang("sv")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                lang === "sv"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <span className="text-base">🇸🇪</span> SV
            </button>
            <button
              onClick={() => setLang("es")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                lang === "es"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <span className="text-base">🇲🇽</span> ES
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-8 space-y-10">
        {/* Global dashboard link */}
        <div className="rounded-lg bg-white border border-gray-200 p-4 flex items-center justify-between shadow-sm">
          <div>
            <p className="font-semibold text-gray-900 text-sm">
              {t("globalDashboard", lang)}
            </p>
            <p className="text-xs text-gray-500 mt-0.5">
              {t("globalDashboardSub", lang)}
            </p>
          </div>
          <Link
            href="/dashboard"
            className="rounded-lg bg-gray-800 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700 transition-colors"
          >
            Dashboard →
          </Link>
        </div>

        {/* 🇸🇪 Sweden — shown first when SV, second when ES */}
        {lang === "es" && (
          <MexicoSection companies={mexicoCompanies} lang={lang} />
        )}

        <section>
          <h2 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-gray-400 mb-3">
            <span className="text-base">🇸🇪</span>
            {t("sweden", lang)} ({swedenCompanies.length} {t("companies", lang).toLowerCase()})
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {swedenCompanies.map((company) => (
              <CompanyCard key={company.slug} company={company} />
            ))}
          </div>
        </section>

        {/* 🇲🇽 Mexico — shown first when ES, second when SV */}
        {lang !== "es" && (
          <MexicoSection companies={mexicoCompanies} lang={lang} />
        )}
      </main>
    </div>
  );
}

function MexicoSection({
  companies,
  lang,
}: {
  companies: (typeof COMPANIES);
  lang: Lang;
}) {
  return (
    <section>
      <h2 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-gray-400 mb-3">
        <span className="text-base">🇲🇽</span>
        {t("mexico", lang)} ({companies.length} {t("companies", lang).toLowerCase()})
      </h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {companies.map((company) => (
          <CompanyCard key={company.slug} company={company} />
        ))}
      </div>
    </section>
  );
}

function CompanyCard({ company }: { company: (typeof COMPANIES)[number] }) {
  return (
    <div className="rounded-xl bg-white border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {/* Colour accent bar */}
      <div className="h-1.5" style={{ backgroundColor: company.accentColor }} />

      <div className="p-5">
        {/* Industry badge */}
        <span
          className="inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold text-white mb-3"
          style={{ backgroundColor: company.accentColor }}
        >
          {company.industry}
        </span>

        <h3 className="font-bold text-gray-900 text-[15px] leading-tight mb-1">
          {company.name}
        </h3>
        <p className="text-xs text-gray-500 mb-4 leading-relaxed">
          {company.description}
        </p>

        <div className="flex gap-2">
          <Link
            href={company.demoPath}
            className="flex-1 text-center rounded-lg border border-gray-200 px-3 py-2 text-sm
                       font-medium text-gray-600 hover:bg-gray-50 transition-colors"
          >
            Demo
          </Link>
          <Link
            href={`/dashboard/${company.slug}`}
            className="flex-1 text-center rounded-lg px-3 py-2 text-sm font-medium text-white transition-colors"
            style={{ backgroundColor: company.primaryColor }}
          >
            Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
