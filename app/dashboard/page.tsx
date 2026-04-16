import { getLeads } from "@/lib/leads-store";
import { CallCard } from "@/components/CallCard";
import { SimulateButton } from "@/components/SimulateButton";
import { ClearButton } from "@/components/ClearButton";
import { getCompany } from "@/lib/companies";
import type { Lang } from "@/lib/i18n";

// Re-render on every request so new calls show immediately
export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const leads = await getLeads();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-4xl px-4 py-5 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">AI Receptionist</h1>
            <p className="text-sm text-gray-500">
              {leads.length === 0
                ? "Inga samtal ännu"
                : `${leads.length} samtal totalt`}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <ClearButton />
            <SimulateButton />
          </div>
        </div>
      </header>

      {/* Call list */}
      <main className="mx-auto max-w-4xl px-4 py-8">
        {leads.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="space-y-3">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-400">
              Senaste samtal
            </h2>
            {leads.map((lead) => {
              const company = lead.company_slug
                ? getCompany(lead.company_slug)
                : undefined;
              const lang: Lang = company?.language ?? "sv";
              const showUrgency = company?.hasUrgency !== false;
              return (
                <CallCard
                  key={lead.id}
                  lead={lead}
                  lang={lang}
                  showUrgency={showUrgency}
                />
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="mb-4 text-5xl">📞</div>
      <h2 className="text-lg font-semibold text-gray-700">Inga samtal ännu</h2>
      <p className="mt-1 text-sm text-gray-500 max-w-sm">
        Samtal som tas emot via Telnyx visas här direkt. Klicka på{" "}
        <span className="font-medium">&quot;Simulera samtal&quot;</span> för att testa
        flödet utan ett riktigt telefonsamtal.
      </p>
    </div>
  );
}
