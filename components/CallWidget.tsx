"use client";

import { useState } from "react";

type WidgetState = "idle" | "calling" | "done" | "error";

interface LeadResult {
  caller_name: string | null;
  service_type: string | null;
  urgency: string;
  summary: string | null;
  id: string;
}

export function CallWidget() {
  const [state, setState] = useState<WidgetState>("idle");
  const [result, setResult] = useState<LeadResult | null>(null);

  async function handleDemo() {
    setState("calling");
    setResult(null);
    try {
      const res = await fetch("/api/test/simulate-call", { method: "POST" });
      if (!res.ok) throw new Error("Failed");
      const data = await res.json();
      setResult(data.lead);
      setState("done");
    } catch {
      setState("error");
    }
  }

  function reset() {
    setState("idle");
    setResult(null);
  }

  if (state === "idle") {
    return (
      <div className="flex flex-col items-center gap-4">
        <button
          onClick={handleDemo}
          className="group relative flex h-24 w-24 items-center justify-center rounded-full bg-blue-600 shadow-lg shadow-blue-500/30 transition hover:bg-blue-700 hover:scale-105 active:scale-95"
        >
          <svg className="h-10 w-10 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.45 11.45 0 003.58.57 1 1 0 011 1V21a1 1 0 01-1 1A17 17 0 013 5a1 1 0 011-1h3.5a1 1 0 011 1 11.45 11.45 0 00.57 3.58 1 1 0 01-.25 1.01l-2.2 2.2z"/>
          </svg>
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex h-4 w-4 rounded-full bg-green-500"></span>
          </span>
        </button>
        <div className="text-center">
          <p className="font-semibold text-gray-800">Testa AI-receptionisten</p>
          <p className="text-sm text-gray-500">Klicka för att simulera ett samtal</p>
        </div>
      </div>
    );
  }

  if (state === "calling") {
    return (
      <div className="flex flex-col items-center gap-4">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-100">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
        </div>
        <div className="text-center">
          <p className="font-semibold text-gray-800">Simulerar samtal…</p>
          <p className="text-sm text-gray-500">AI-receptionisten tar emot</p>
        </div>
      </div>
    );
  }

  if (state === "error") {
    return (
      <div className="flex flex-col items-center gap-4">
        <div className="rounded-lg bg-red-50 border border-red-200 p-4 text-center">
          <p className="text-red-700 font-medium">Något gick fel</p>
          <p className="text-sm text-red-500 mt-1">Kontrollera att servern körs</p>
        </div>
        <button onClick={reset} className="text-sm text-blue-600 hover:underline">
          Försök igen
        </button>
      </div>
    );
  }

  // done
  return (
    <div className="w-full max-w-sm">
      <div className="rounded-xl border border-green-200 bg-green-50 p-5">
        <div className="flex items-center gap-2 mb-3">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500">
            <svg className="h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </span>
          <p className="font-semibold text-green-800">Samtal avslutat — lead sparat!</p>
        </div>

        <dl className="space-y-1.5 text-sm">
          <div className="flex justify-between">
            <dt className="text-gray-500">Namn</dt>
            <dd className="font-medium text-gray-800">{result?.caller_name ?? "Okänt"}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-500">Tjänst</dt>
            <dd className="font-medium text-gray-800">{result?.service_type ?? "Okänt"}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-500">Prioritet</dt>
            <dd>
              {result?.urgency === "urgent" ? (
                <span className="font-semibold text-red-600">🚨 Brådskande</span>
              ) : (
                <span className="font-medium text-gray-700">Normal</span>
              )}
            </dd>
          </div>
        </dl>

        {result?.summary && (
          <p className="mt-3 text-xs text-gray-500 border-t border-green-200 pt-3 line-clamp-3">
            {result.summary}
          </p>
        )}
      </div>

      <div className="mt-3 flex gap-2">
        <a
          href={`/dashboard/calls/${result?.id}`}
          className="flex-1 rounded-lg bg-blue-600 py-2 text-center text-sm font-semibold text-white hover:bg-blue-700"
        >
          Se i dashboard →
        </a>
        <button
          onClick={reset}
          className="rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50"
        >
          Igen
        </button>
      </div>
    </div>
  );
}
