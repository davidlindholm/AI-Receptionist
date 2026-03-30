/**
 * Voice provider abstraction.
 * Implement this interface for each provider (Telnyx, Retell, Vapi, etc.)
 * so the webhook handler and dashboard never depend on a specific provider.
 */

export type VoiceEventType =
  | "call_started"
  | "call_answered"
  | "transcript"
  | "recording_saved"
  | "call_ended"
  | "unknown";

export interface NormalizedCallEvent {
  /** Provider-specific call identifier used for subsequent API commands. */
  callControlId: string;
  eventType: VoiceEventType;
  /** Caller's phone number (E.164). */
  callerPhone?: string;
  /** Latest transcript text (may be partial until call_ended). */
  transcript?: string;
  /** URL to the call recording. */
  recordingUrl?: string;
  /** Original provider payload, kept for debugging/logging. */
  rawPayload: unknown;
}

export interface VoiceProvider {
  /**
   * Verify that the incoming request genuinely came from the provider.
   * Returns false if the signature check fails.
   */
  verifyWebhook(req: Request, rawBody: string): Promise<boolean>;

  /**
   * Map a raw provider payload to a NormalizedCallEvent.
   * Throws if the payload shape is unrecognised.
   */
  normalizeEvent(body: unknown): NormalizedCallEvent;

  /**
   * Answer an incoming call and start recording + transcription.
   * Called after call_started is received.
   */
  answerCall(callControlId: string): Promise<void>;
}
