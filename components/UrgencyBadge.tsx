import type { Urgency } from '@/lib/leads-store';
import { t, type Lang } from '@/lib/i18n';

interface UrgencyBadgeProps {
  urgency: Urgency;
  lang?: Lang;
  show?: boolean;
}

export function UrgencyBadge({ urgency, lang = 'sv', show = true }: UrgencyBadgeProps) {
  if (!show) return null;

  if (urgency === 'urgent') {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-semibold text-red-700">
        <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
        {t('urgent', lang)}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-semibold text-gray-600">
      <span className="h-1.5 w-1.5 rounded-full bg-gray-400" />
      {t('normal', lang)}
    </span>
  );
}
