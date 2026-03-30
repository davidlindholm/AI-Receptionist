import { getLeadById } from "@/lib/leads-store";
import { UrgencyBadge } from "@/components/UrgencyBadge";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat("sv-SE", {
    dateStyle: "long",
    timeStyle: "short",
  }).format(new Date(date));
}

export default function CallDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const lead = getLeadById(params.id);
  if (!lead) notFound();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-3xl px-4 py-5 flex items-center gap-4">
          <Link
            href="/dashboard"
            className="text-sm text-gray-500 hover:text-gray-900"
          >
            ← Tillbaka
          </Link>
          <h1 className="text-xl font-bold text-gray-900">Samtalsdetaljer</h1>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-8 space-y-6">
        {/* Lead info card */}
        <section className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                {lead.caller_name ?? "Okänd uppringare"}
              </h2>
              <p className="text-sm text-gray-500">{lead.caller_phone}</p>
            </div>
            <UrgencyBadge urgency={lead.urgency} />
          </div>

          <dl className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
            <div>
              <dt className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                Tjänst
              </dt>
              <dd className="mt-1 text-sm text-gray-800">
                {lead.service_type ?? "—"}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                Status
              </dt>
              <dd className="mt-1 text-sm text-gray-800 capitalize">
                {lead.status}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                Tid
              </dt>
              <dd className="mt-1 text-sm text-gray-800">
                {formatDateTime(lead.created_at)}
              </dd>
            </div>
          </dl>

          {lead.summary && (
            <div className="mt-4 rounded-md bg-gray-50 p-3">
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">
                Sammanfattning
              </p>
              <p className="text-sm text-gray-700">{lead.summary}</p>
            </div>
          )}
        </section>

        {/* Recording */}
        {lead.recording_url && (
          <section className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">
              Inspelning
            </h3>
            <audio controls className="w-full" src={lead.recording_url}>
              Din webbläsare stödjer inte ljuduppspelning.
            </audio>
            <a
              href={lead.recording_url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block text-xs text-indigo-600 hover:underline"
            >
              Öppna inspelning i ny flik
            </a>
          </section>
        )}

        {/* Transcript */}
        {lead.transcript && (
          <section className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">
              Transkribering
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
