import type { ModelMessage } from 'ai'

/**
 * Extracts all plain-text content from a single `ModelMessage`.
 *
 * Handles both string and structured (part-based) message content. For
 * structured content, only `text` parts are considered; all other part
 * types (images, tool calls, etc.) are ignored. Multiple text parts are
 * joined with a newline.
 *
 * @param message - The AI SDK model message to extract text from.
 * @returns The concatenated text content, or an empty string when the
 *   message contains no text.
 */
export function getTextFromModelMessage(message: ModelMessage): string {
  if (typeof message.content === 'string') {
    return message.content
  }

  if (Array.isArray(message.content)) {
    return message.content
      .filter(part => part.type === 'text')
      .map(part => part.text)
      .join('')
  }

  return ''
}
