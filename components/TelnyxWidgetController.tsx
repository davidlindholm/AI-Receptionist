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
    const el = document.querySelector("telnyx-ai-agent") as HTMLElement & {
      open?: () => void;
    };
    if (!el) return;

    // Hide the widget's native launcher button once the shadow DOM renders
    const hideLauncher = () => {
      const shadow = el.shadowRoot;
      if (!shadow) return false;
      const btn = shadow.querySelector("button");
      if (!btn) return false;
      btn.style.setProperty("display", "none", "important");
      return true;
    };

    if (!hideLauncher()) {
      // Shadow DOM not ready yet — observe until it is
      const observer = new MutationObserver(() => {
        if (hideLauncher()) observer.disconnect();
      });
      observer.observe(el, { childList: true, subtree: true });
    }

    // Global trigger function — tries open(), shadow click, then element click
    window.__openTelnyxWidget = () => {
      if (typeof el.open === "function") {
        el.open();
        return;
      }
      const shadow = el.shadowRoot;
      if (shadow) {
        const btn = shadow.querySelector("button");
        if (btn) {
          btn.style.removeProperty("display");
          btn.click();
          btn.style.setProperty("display", "none", "important");
          return;
        }
      }
      el.click();
    };

    // Delegate clicks from any element with data-open-widget
    const handleClick = (e: MouseEvent) => {
      const target = (e.target as Element).closest("[data-open-widget]");
      if (target) {
        e.preventDefault();
        window.__openTelnyxWidget?.();
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <>
      <Script
        src="https://unpkg.com/@telnyx/ai-agent-widget@next"
        strategy="afterInteractive"
      />
      <telnyx-ai-agent agent-id={agentId} environment="production" />
    </>
  );
}
