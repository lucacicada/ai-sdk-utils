import type { ModelMessage } from 'ai'
import { getTextFromModelMessage } from './get-text-from-model-message.ts'

/**
 * Extracts and concatenates the text content from a list of `ModelMessage`s.
 *
 * Text from each message is extracted via {@link getTextFromModelMessage};
 * messages without any text are skipped. The resulting fragments are joined
 * with a newline.
 *
 * @param messages - The AI SDK model messages to extract text from.
 * @returns A single string containing the text of all messages, or an empty
 *   string when none of the messages contain text.
 */
export function getTextFromModelMessages(messages: ModelMessage[]): string {
  return messages
    .map(getTextFromModelMessage)
    .join('\n')
}
