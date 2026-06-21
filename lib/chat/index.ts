import { HttpChatClient } from './http-client';
import { MockChatClient } from './mock-client';

export type { ChatMessage, ChatClient } from './types';

/**
 * Factory — returns an HttpChatClient when NEXT_PUBLIC_CHAT_API is a non-empty
 * string, otherwise falls back to MockChatClient so the chat widget is
 * fully demoable with no backend configured.
 */
export function createChatClient(): HttpChatClient | MockChatClient {
  const api = process.env.NEXT_PUBLIC_CHAT_API;
  if (api && api.trim() !== '') {
    return new HttpChatClient(api);
  }
  return new MockChatClient();
}
