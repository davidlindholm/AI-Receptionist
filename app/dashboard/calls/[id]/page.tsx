import { getLeadById } from "@/lib/leads-store";
import { UrgencyBadge } from "@/components/UrgencyBadge";
import { getCompany } from "@/lib/companies";
import { t, type Lang } from "@/lib/i18n";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

function formatDateTime(date: Date, lang: Lang): string {
  return new Intl.DateTimeFormat(lang === "es" ? "es-MX" : "sv-SE", {
    dateStyle: "long",
    timeStyle: "short",
  }).format(new Date(date));
}

export default async function CallDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const lead = await getLeadById(params.id);
  if (!lead) notFound();

  const company = lead.company_slug ? getCompany(lead.company_slug) : undefined;
  const lang: Lang = company?.language ?? "sv";
  const showUrgency = company?.hasUrgency !== false;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-3xl px-4 py-5 flex items-center gap-4">
          <Link
            href="/dashboard"
            className="text-sm text-gray-500 hover:text-gray-900"
          >
            {t("back", lang)}
          </Link>
          <h1 className="text-xl font-bold text-gray-900">{t("callDetails", lang)}</h1>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-8 space-y-6">
        {/* Lead info card */}
        <section className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                {lead.caller_name ?? t("unknownCaller", lang)}
              </h2>
              <p className="text-sm text-gray-500">{lead.caller_phone}</p>
            </div>
            <UrgencyBadge urgency={lead.urgency} lang={lang} show={showUrgency} />
          </div>

          <dl className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
            <div>
              <dt className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                {t("service", lang)}
              </dt>
              <dd className="mt-1 text-sm text-gray-800">
                {lead.service_type ?? "—"}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                {t("status", lang)}
              </dt>
              <dd className="mt-1 text-sm text-gray-800 capitalize">
                {lead.status}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                {t("time", lang)}
              </dt>
              <dd className="mt-1 text-sm text-gray-800">
                {formatDateTime(lead.created_at, lang)}
              </dd>
            </div>
          </dl>

          {lead.summary && (
            <div className="mt-4 rounded-md bg-gray-50 p-3">
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">
                {t("summary", lang)}
              </p>
              <p className="text-sm text-gray-700">{lead.summary}</p>
            </div>
          )}
        </section>

        {/* Recording */}
        {lead.recording_url && (
          <section className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">
              {t("recording", lang)}
            </h3>
            <audio controls className="w-full" src={lead.recording_url}>
              {t("audioNotSupported", lang)}
            </audio>
            <a
              href={lead.recording_url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block text-xs text-indigo-600 hover:underline"
            >
              {t("openRecording", lang)}
            </a>
          </section>
        )}

        {/* Transcript */}
        {lead.transcript && (
          <section className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">
              {t("transcript", lang)}
            </h3>
            <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
              {lead.transcript}
            </p>
          </section>
        )}
      </main>
    </div>
  );
}
