import Link from "next/link";
import { UrgencyBadge } from "./UrgencyBadge";
import type { Lead } from "@/lib/leads-store";

function formatTime(date: Date): string {
  return new Intl.DateTimeFormat("sv-SE", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(date));
}

export function CallCard({ lead }: { lead: Lead }) {
  return (
    <Link
      href={`/dashboard/calls/${lead.id}`}
      className="block rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition hover:border-gray-300 hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="font-semibold text-gray-900 truncate">
              {lead.caller_name ?? lead.caller_phone}
            </p>
            <UrgencyBadge urgency={lead.urgency} />
          </div>
          {lead.caller_name && (
            <p className="text-sm text-gray-500 mt-0.5">{lead.caller_phone}</p>
          )}
          {lead.service_type && (
            <span className="mt-1 inline-block rounded bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700">
              {lead.service_type}
            </span>
          )}
          {lead.summary && (
            <p className="mt-2 text-sm text-gray-600 line-clamp-2">
              {lead.summary}
            </p>
          )}
        </div>
        <div className="shrink-0 text-right">
          <p className="text-xs text-gray-400 whitespace-nowrap">
            {formatTime(lead.created_at)}
          </p>
          <p className="mt-1 text-xs text-gray-400 capitalize">{lead.status}</p>
        </div>
      </div>
    </Link>
  );
}
