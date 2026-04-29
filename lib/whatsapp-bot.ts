/**
 * WhatsApp AI chatbot for La Casa de la Salsa Latin Room.
 *
 * Maintains per-phone conversation history (in-memory, max 20 messages)
 * and generates replies using Claude claude-3-5-haiku.
 *
 * Required env vars:
 *   ANTHROPIC_API_KEY — Anthropic API key
 */

import Anthropic from "@anthropic-ai/sdk";

interface Message {
  role: "user" | "assistant";
  content: string;
}

// In-memory conversation history keyed by caller phone number.
// Resets on server restart — acceptable for a nightclub chatbot.
const conversations = new Map<string, Message[]>();

const MAX_HISTORY = 20; // messages to keep per conversation

const SYSTEM_PROMPT = `Eres Laura, la asistente virtual de La Casa de la Salsa Latin Room.

SOBRE EL CLUB:
La Casa de la Salsa Latin Room es un club nocturno en Querétaro dedicado a la salsa latina y su cultura. Música en vivo, ambiente vibrante y noches llenas de sabor, ritmo y pasión.

INFORMACIÓN:
• Cover: $200 pesos

PROMOCIONES:
• Jueves: 2 por 1 en botellas y bebidas participantes
• Viernes: Cumpleañeros NO pagan cover

DIRECCIÓN:
Blvd. Bernardo Quintana Arrioja 109, Loma Dorada, 76020 Santiago de Querétaro, Qro.
📍 Google Maps: https://maps.app.goo.gl/5o1rpHrMmVjxbJmM7

INSTRUCCIONES:
- Responde siempre en español
- Sé amigable, cálido y con la energía que caracteriza al club
- Sé conciso — estás en WhatsApp, no en un correo formal
- Si te preguntan algo que no sabes (como horarios exactos, precio de botellas, etc.), sé honesto y sugiere que llamen directamente o visiten el club
- Cuando alguien quiera reservar, pide su nombre, número de personas y fecha
- Usa emojis con moderación para dar más calidez al mensaje`;

function getClient(): Anthropic {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error("ANTHROPIC_API_KEY is not set");
  return new Anthropic({ apiKey });
}

/**
 * Get an AI reply for an incoming WhatsApp message.
 * Maintains conversation history per phone number.
 */
export async function getReply(phone: string, incomingText: string): Promise<string> {
  const client = getClient();

  // Load or initialize conversation history
  const history = conversations.get(phone) ?? [];

  // Append the new user message
  history.push({ role: "user", content: incomingText });

  // Trim to max history (keep most recent messages)
  const trimmed = history.slice(-MAX_HISTORY);

  // Call Claude
  const response = await client.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 512,
    system: SYSTEM_PROMPT,
    messages: trimmed,
  });

  const reply =
    response.content[0]?.type === "text"
      ? response.content[0].text
      : "Disculpa, hubo un problema al procesar tu mensaje. Por favor intenta de nuevo.";

  // Append assistant reply to history and save
  trimmed.push({ role: "assistant", content: reply });
  conversations.set(phone, trimmed);

  return reply;
}

/**
 * Clear conversation history for a phone number (e.g. on timeout or explicit reset).
 */
export function clearConversation(phone: string): void {
  conversations.delete(phone);
}
