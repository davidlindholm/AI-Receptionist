import Link from "next/link";
import { COMPANIES } from "@/lib/companies";

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-5xl px-6 py-6">
          <h1 className="text-2xl font-bold text-gray-900">Growth Network System — Admin</h1>
          <p className="text-sm text-gray-500 mt-1">
            Alla demowebbplatser och deras respektive dashboards
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-8 space-y-6">

        {/* Global dashboard link */}
        <div className="rounded-lg bg-white border border-gray-200 p-4 flex items-center justify-between shadow-sm">
          <div>
            <p className="font-semibold text-gray-900 text-sm">Alla samtal (global dashboard)</p>
            <p className="text-xs text-gray-500 mt-0.5">Visar samtliga leads oavsett tjänstetyp</p>
          </div>
          <Link
            href="/dashboard"
            className="rounded-lg bg-gray-800 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700 transition-colors"
          >
            Dashboard →
          </Link>
        </div>

        {/* Company cards */}
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-3">
            Företag ({COMPANIES.length})
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {COMPANIES.map((company) => (
              <div
                key={company.slug}
                className="rounded-xl bg-white border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
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
            ))}
          </div>
        </div>

      </main>
    </div>
  );
}
