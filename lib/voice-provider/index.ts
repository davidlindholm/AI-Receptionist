import type { VoiceProvider } from "./types";
import { telnyxProvider } from "./telnyx";

const providers: Record<string, VoiceProvider> = {
  telnyx: telnyxProvider,
};

/**
 * Returns the VoiceProvider for the given name.
 * Defaults to "telnyx". Swap to "vapi" or "retell" when those adapters are added.
 */
export function getVoiceProvider(
  name: string = process.env.VOICE_PROVIDER ?? "telnyx"
): VoiceProvider {
  const provider = providers[name];
  if (!provider) {
    throw new Error(
      `Unknown voice provider: "${name}". Available: ${Object.keys(providers).join(", ")}`
    );
  }
  return provider;
}

export type { VoiceProvider, NormalizedCallEvent } from "./types";
