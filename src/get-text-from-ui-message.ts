import type { UIMessage } from 'ai'

/**
 * Extracts all plain-text content from a single `UIMessage`.
 *
 * Only `text` parts are considered; all other part types (images, tool calls, etc.) are ignored.
 * Multiple text parts are joined with an empty string.
 *
 * @param message - The UI message to extract text from.
 * @returns The concatenated text content, or an empty string when the message contains no text.
 */
export function getTextFromUIMessage(message: UIMessage) {
  return message.parts
    .filter(part => part.type === 'text')
    .map(part => part.text)
    .join('')
}
