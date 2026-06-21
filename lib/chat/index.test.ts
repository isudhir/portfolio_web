import { describe, it, expect, beforeEach, afterEach } from 'vitest';

describe('createChatClient factory', () => {
  beforeEach(() => {
    // Ensure the env var is unset
    delete process.env.NEXT_PUBLIC_CHAT_API;
  });

  afterEach(() => {
    delete process.env.NEXT_PUBLIC_CHAT_API;
  });

  it('returns a MockChatClient (kind === "mock") when NEXT_PUBLIC_CHAT_API is unset', async () => {
    // Dynamic import to pick up env state at call time
    const { createChatClient } = await import('./index');
    const client = createChatClient();
    expect((client as { kind?: string }).kind).toBe('mock');
  });

  it('returns a MockChatClient when NEXT_PUBLIC_CHAT_API is empty string', async () => {
    process.env.NEXT_PUBLIC_CHAT_API = '';
    const { createChatClient } = await import('./index');
    const client = createChatClient();
    expect((client as { kind?: string }).kind).toBe('mock');
  });
});
