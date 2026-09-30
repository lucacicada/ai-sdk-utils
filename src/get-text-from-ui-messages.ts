import type { UIMessage } from 'ai'
import { getTextFromUIMessage } from './get-text-from-ui-message.ts'

/**
 * Extracts and concatenates the text content from an array of UI messages.
 *
 * @param messages - The UI messages to extract text from.
 * @returns The concatenated text content of all messages, separated by newlines.
 */
export function getTextFromUIMessages(messages: UIMessage[]) {
  return messages
    .map(getTextFromUIMessage)
    .join('\n')
}
