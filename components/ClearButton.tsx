"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { t, type Lang } from "@/lib/i18n";

interface ClearButtonProps {
  /** UI language (default: "sv"). */
  lang?: Lang;
}

export function ClearButton({ lang = "sv" }: ClearButtonProps = {}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleClear() {
    if (!confirm(t("clearConfirm", lang))) return;
    setLoading(true);
    try {
      await fetch("/api/leads/clear", { method: "POST" });
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleClear}
      disabled={loading}
      className="rounded-md border border-gray-300 bg-white px-3.5 py-2 text-sm font-semibold text-gray-600 shadow-sm hover:bg-gray-50 disabled:opacity-60"
    >
      {loading ? t("clearing", lang) : t("clearCalls", lang)}
    </button>
  );
}
