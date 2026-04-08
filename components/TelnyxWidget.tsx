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

const DEFAULT_AGENT_ID = "assistant-5364d76a-4c74-49d0-b17d-396ffd8b520f";

export function TelnyxWidget({ agentId = DEFAULT_AGENT_ID }: { agentId?: string }) {
  return (
    <>
      <Script
        src="https://unpkg.com/@telnyx/ai-agent-widget@next"
        strategy="afterInteractive"
      />
      <telnyx-ai-agent
        agent-id={agentId}
        environment="production"
      />
    </>
  );
}
