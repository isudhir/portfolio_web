/**
 * HttpChatClient — SINGLE ADAPTER FILE
 *
 * This is the only file that needs to be edited when the real HuggingFace
 * (or dedicated-server) chat backend contract is finalised. Today it expects
 * either:
 *   - A streaming response body (text chunks / SSE lines), or
 *   - A JSON response with shape { reply: string } or { content: string }.
 *
 * To adapt to a different protocol (e.g., OpenAI-compatible SSE with
 * "data: {...}" framing, or a WebSocket), update only the parsing logic
 * inside `send()` — the rest of the application uses `ChatClient` and
 * never touches this file directly.
 *
 * Endpoint: process.env.NEXT_PUBLIC_CHAT_API (set via .env / deployment config)
 */

import type { ChatClient, ChatMessage } from './types';

export class HttpChatClient implements ChatClient {
  readonly kind = 'http' as const;

  private readonly endpoint: string;

  constructor(endpoint?: string) {
    this.endpoint =
      endpoint ?? process.env.NEXT_PUBLIC_CHAT_API ?? '';
  }

  async *send(
    messages: ChatMessage[],
    signal?: AbortSignal,
  ): AsyncIterable<string> {
    const res = await fetch(this.endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages }),
      signal,
    });

    if (!res.ok) {
      throw new Error(`Chat API error: ${res.status} ${res.statusText}`);
    }

    const contentType = res.headers.get('content-type') ?? '';

    // --- Streaming path (text/plain, text/event-stream, octet-stream, etc.) ---
    if (res.body && !contentType.includes('application/json')) {
      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      try {
        while (true) {
          if (signal?.aborted) return;
          const { done, value } = await reader.read();
          if (done) break;
          const text = decoder.decode(value, { stream: true });
          if (text) yield text;
        }
        // Flush any remaining bytes
        const remaining = decoder.decode();
        if (remaining) yield remaining;
      } finally {
        reader.releaseLock();
      }
      return;
    }

    // --- JSON fallback path ({ reply } or { content }) ---
    const json = (await res.json()) as { reply?: string; content?: string };
    const text = json.reply ?? json.content ?? '';
    if (text) yield text;
  }
}
