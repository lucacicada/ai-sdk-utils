import type { LanguageModel } from 'ai'

/**
 * Checks whether a `LanguageModel` refers to an Anthropic (Claude) model.
 *
 * For string model identifiers, returns `true` when the string contains
 * `anthropic` or `claude`. For `LanguageModel` objects, the check is based
 * on the `provider` and `modelId` fields.
 *
 * @param model - The model (or model identifier) to check.
 * @returns `true` when the model is an Anthropic model.
 */
export function isAnthropicModel(model: LanguageModel): boolean {
  if (typeof model === 'string') {
    return model.includes('anthropic') || model.includes('claude')
  }

  return (
    model.provider === 'anthropic'
    || model.provider.includes('anthropic')
    || model.modelId.includes('anthropic')
    || model.modelId.includes('claude')
  )
}
