"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface SimulateButtonProps {
  /** When set, the simulated lead is tagged with this company slug. */
  companySlug?: string;
}

export function SimulateButton({ companySlug }: SimulateButtonProps = {}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSimulate() {
    setLoading(true);
    try {
      await fetch("/api/test/simulate-call", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(companySlug ? { company_slug: companySlug } : {}),
      });
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleSimulate}
      disabled={loading}
      className="rounded-md bg-indigo-600 px-3.5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    >
      {loading ? "Simulerar…" : "Simulera samtal"}
    </button>
  );
}
