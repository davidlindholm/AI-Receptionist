"use client";

import { useEffect } from "react";
import Script from "next/script";

declare global {
  interface Window {
    __openTelnyxWidget?: () => void;
  }
  namespace JSX {
    interface IntrinsicElements {
      "telnyx-ai-agent": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          "agent-id"?: string;
          environment?: string;
        },
        HTMLElement
      >;
    }
  }
}

export function TelnyxWidgetController({ agentId }: { agentId: string }) {
  useEffect(() => {
    let poll: ReturnType<typeof setInterval>;

    const setup = (): boolean => {
      const el = document.querySelector("telnyx-ai-agent") as HTMLElement & {
        open?: () => void;
      };
      // Wait until custom element has upgraded and shadow DOM is attached
      if (!el || !el.shadowRoot) return false;

      // React 18 doesn't always serialize hyphenated props to HTML attributes
      // for custom elements. Force the attribute so the widget script reads
      // the right agent on every render.
      if (el.getAttribute("agent-id") !== agentId) {
        el.setAttribute("agent-id", agentId);
      }

      window.__openTelnyxWidget = () => {
        // Unlock browser audio context immediately on user gesture —
        // this prevents the first 200-500ms of speech from being cut off
        try {
          const ctx = new AudioContext();
          ctx.resume().catch(() => {});
        } catch (_) {}

        if (typeof el.open === "function") {
          el.open();
          return;
        }
        // Find the launcher button and click it directly —
        // no display manipulation, which could confuse the widget
        const btn = el.shadowRoot?.querySelector<HTMLButtonElement>("button");
        btn?.click();
      };

      return true;
    };

    // Poll every 100ms until the shadow DOM is ready.
    // MutationObserver can't observe shadow DOM attachment reliably.
    if (!setup()) {
      poll = setInterval(() => {
        if (setup()) clearInterval(poll);
      }, 100);
    }

    // Global click delegation — any element with data-open-widget triggers the widget
    const handleClick = (e: MouseEvent) => {
      if (!(e.target as Element).closest("[data-open-widget]")) return;
      e.preventDefault();
      window.__openTelnyxWidget?.();
    };
    document.addEventListener("click", handleClick);

    return () => {
      clearInterval(poll);
      document.removeEventListener("click", handleClick);
    };
  }, [agentId]);

  return (
    <>
      <Script
        src="https://unpkg.com/@telnyx/ai-agent-widget@next"
        strategy="afterInteractive"
      />
      {/*
        Widget is positioned off-screen — fully rendered and initialized,
        but invisible. We never touch the button's display property, so
        clicks on it are always processed correctly by the browser.
      */}
      <div
        aria-hidden="true"
        style={{ position: "fixed", left: "-9999px", bottom: 0, zIndex: -1 }}
      >
        <telnyx-ai-agent agent-id={agentId} environment="production" />
      </div>
    </>
  );
}
