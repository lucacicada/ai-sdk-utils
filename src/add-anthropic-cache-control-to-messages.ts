import type { ProviderOptions } from '@ai-sdk/provider-utils'
import type { LanguageModel, ModelMessage } from 'ai'
import { isAnthropicModel } from './is-anthropic-model.ts'

/**
 * Adds Anthropic prompt-caching `cacheControl` provider options to the last
 * message of a conversation.
 *
 * The cache marker is only applied when {@link isAnthropicModel} reports the
 * model as an Anthropic model; otherwise the messages are returned unchanged.
 * An empty message list is also returned unchanged.
 *
 * @param options.messages - The conversation messages.
 * @param options.model - The model the messages will be sent to.
 * @param options.providerOptions - The provider options to merge into the
 *   last message. Defaults to Anthropic ephemeral cache control.
 * @returns A new array with the provider options applied to the last
 *   message, or the original array when no change was needed.
 */
export function addAnthropicCacheControlToMessages({
  messages,
  model,
  providerOptions = {
    anthropic: { cacheControl: { type: 'ephemeral' } },
  },
}: {
  messages: ModelMessage[]
  model: LanguageModel
  providerOptions?: Record<string, ProviderOptions>
}): ModelMessage[] {
  if (messages.length === 0) {
    return messages
  }

  if (!isAnthropicModel(model)) {
    return messages
  }

  return messages.map((message, index) => {
    if (index === messages.length - 1) {
      return {
        ...message,
        providerOptions: {
          ...message.providerOptions,
          ...providerOptions,
        },
      }
    }
    return message
  })
}
