"use client";

import Script from "next/script";

// Tell TypeScript about the custom element
declare global {
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

export function TelnyxWidget() {
  return (
    <>
      <Script
        src="https://unpkg.com/@telnyx/ai-agent-widget@next"
        strategy="afterInteractive"
      />
      <telnyx-ai-agent
        agent-id="assistant-5364d76a-4c74-49d0-b17d-396ffd8b520f"
        environment="production"
      />
    </>
  );
}
