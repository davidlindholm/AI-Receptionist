import { notFound } from "next/navigation";
import Link from "next/link";
import { getCompany, type Company } from "@/lib/companies";
import { getLeadsByCompanySlug } from "@/lib/leads-store";
import { t, type Lang } from "@/lib/i18n";
import { CallCard } from "@/components/CallCard";
import { SimulateButton } from "@/components/SimulateButton";
import { ClearButton } from "@/components/ClearButton";

export const dynamic = "force-dynamic";

interface Props {
  params: { slug: string };
}

export default async function CompanyDashboardPage({ params }: Props) {
  const company = getCompany(params.slug);
  if (!company) notFound();

  const leads = await getLeadsByCompanySlug(company.slug);
  const lang: Lang = company.language ?? "sv";

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-4xl px-4 py-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              {/* Industry badge */}
              <div className="flex items-center gap-2 mb-1">
                <span
                  className="inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold text-white"
                  style={{ backgroundColor: company.accentColor }}
                >
                  {company.industry}
                </span>
              </div>
              <h1 className="text-xl font-bold text-gray-900">{company.name}</h1>
              <p className="text-sm text-gray-500 mt-0.5">
                {leads.length === 0
                  ? t("noCalls", lang)
                  : `${leads.length} ${t("callsFiltered", lang)} "${company.name}"`}
              </p>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              <Link
                href={company.demoPath}
                className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium
                           text-gray-600 hover:bg-gray-50 transition-colors"
              >
                {t("showDemo", lang)}
              </Link>
              <ClearButton lang={lang} />
              <SimulateButton companySlug={company.slug} lang={lang} />
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-4xl px-4 py-8">

        {/* Color accent bar */}
        <div
          className="mb-6 rounded-lg p-4 border"
          style={{
            backgroundColor: `${company.primaryColor}0f`,
            borderColor: `${company.primaryColor}30`,
          }}
        >
          <p className="text-sm font-medium" style={{ color: company.primaryColor }}>
            {company.description}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {t("showingOnly", lang)} <strong>{company.name}</strong>.
            {" "}{t("taggedVia", lang)} <code>?slug={company.slug}</code>.
          </p>
        </div>

        {leads.length === 0 ? (
          <EmptyState company={company} lang={lang} />
        ) : (
          <div className="space-y-3">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-400">
              {t("latestCalls", lang)}
            </h2>
            {leads.map((lead) => (
              <CallCard
                key={lead.id}
                lead={lead}
                lang={lang}
                showUrgency={company.hasUrgency !== false}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

function EmptyState({ company, lang }: { company: Company; lang: Lang }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="mb-4 text-5xl">📞</div>
      <h2 className="text-lg font-semibold text-gray-700">{t("noCalls", lang)}</h2>
      <p className="mt-1 text-sm text-gray-500 max-w-sm">
        {t("emptyMatchPre", lang)}{" "}
        <span className="font-medium">&ldquo;{company.serviceType}&rdquo;</span>{" "}
        {t("emptyMatchPost", lang)}{" "}
        <span className="font-medium">&ldquo;{t("simulateCall", lang)}&rdquo;</span>{" "}
        {t("emptyMatchEnd", lang)}
      </p>
    </div>
  );
}
