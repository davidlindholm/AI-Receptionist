"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function ClearButton() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleClear() {
    if (!confirm("Rensa alla samtal?")) return;
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
      {loading ? "Rensar…" : "Rensa samtal"}
    </button>
  );
}
