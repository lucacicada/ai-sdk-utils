import type { ModelMessage } from 'ai'
import { getTextFromModelMessage } from './get-text-from-model-message.ts'

/**
 * A message shape compatible with Cloudflare's AI Search (AutoRAG) API,
 * which expects `content` as a plain string (or `null`) rather than the
 * AI SDK's structured content parts.
 */
export interface AiSearchMessage {
  /**
   * The role of the message author. Mirrors `ModelMessage['role']` from the
   * AI SDK; AI Search accepts the same set of roles.
   */
  role: 'system' | 'developer' | 'user' | 'assistant' | 'tool'
  /**
   * The message content as a plain string, or `null` when the original
   * message contained no extractable text (e.g. only tool calls or images).
   */
  content: string | null
}

/**
 * Converts AI SDK `ModelMessage`s into the message format expected by
 * Cloudflare's AI Search (AutoRAG) API.
 *
 * Each message's content is flattened to a plain string using
 * {@link getTextFromModelMessage}. Messages with no extractable text
 * receive `content: null`.
 *
 * @param messages - The AI SDK model messages to convert.
 * @returns The converted messages, safe to pass to AI Search endpoints.
 */
export function toAiSearchMessage(messages: ModelMessage[]): AiSearchMessage[] {
  return messages
    .map((message) => {
      return {
        role: message.role,
        content: getTextFromModelMessage(message) || null,
      }
    })
}
