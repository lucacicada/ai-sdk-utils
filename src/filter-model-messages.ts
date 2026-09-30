import type { ModelMessage } from 'ai'

/**
 * Options for {@link filterModelMessages}.
 */
export interface FilterModelMessagesOptions {
  /**
   * The role or roles to filter by.
   * When not specified, all roles are included.
   * When the array is empty, no results will be included.
   */
  role?: ModelMessage['role'] | ModelMessage['role'][]
}

/**
 * Filters a list of `ModelMessage`s by role.
 *
 * When `options.role` is a single role, only messages with that role are
 * kept. When it is an array, messages matching any of the given roles are
 * kept. When omitted, the input messages are returned unfiltered.
 *
 * @param messages - The AI SDK model messages to filter.
 * @param options - Filtering options; see {@link FilterModelMessagesOptions}.
 * @returns A new array containing only the matching messages. The input
 *   array is not modified.
 */
export function filterModelMessages(messages: ModelMessage[], options: FilterModelMessagesOptions = {}): ModelMessage[] {
  const roles = options.role == null
    ? null
    : new Set(Array.isArray(options.role) ? options.role : [options.role])

  return messages.filter(message => roles == null || roles.has(message.role))
}
