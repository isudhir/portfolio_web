import { describe, it, expect } from 'vitest';
import { MockChatClient } from './mock-client';
import type { ChatMessage } from './types';

describe('MockChatClient', () => {
  it('yields at least one chunk for a known suggested question', async () => {
    const client = new MockChatClient(0); // 0ms delay for fast tests
    const messages: ChatMessage[] = [
      { id: '1', role: 'user', content: 'Tell me about yourself' },
    ];

    const chunks: string[] = [];
    for await (const chunk of client.send(messages)) {
      chunks.push(chunk);
    }

    expect(chunks.length).toBeGreaterThanOrEqual(1);
    expect(chunks.join('')).not.toBe('');
  });

  it('yields a non-empty response for each suggested question', async () => {
    const client = new MockChatClient(0); // 0ms delay for fast tests
    const questions = [
      'Tell me about yourself',
      'What projects have you built?',
      'What AI technologies do you use?',
      'What is your experience?',
      'How can I contact you?',
      'What are you working on currently?',
    ];

    for (const q of questions) {
      const messages: ChatMessage[] = [{ id: '1', role: 'user', content: q }];
      const chunks: string[] = [];
      for await (const chunk of client.send(messages)) {
        chunks.push(chunk);
      }
      expect(chunks.join('').trim().length, `Expected non-empty for: "${q}"`).toBeGreaterThan(0);
    }
  });

  it('yields a generic fallback for unknown questions', async () => {
    const client = new MockChatClient(0);
    const messages: ChatMessage[] = [
      { id: '1', role: 'user', content: 'Some completely unknown question xyz' },
    ];
    const chunks: string[] = [];
    for await (const chunk of client.send(messages)) {
      chunks.push(chunk);
    }
    expect(chunks.join('')).not.toBe('');
  });

  it('respects AbortSignal and stops yielding', async () => {
    const client = new MockChatClient(0);
    const messages: ChatMessage[] = [
      { id: '1', role: 'user', content: 'Tell me about yourself' },
    ];
    const controller = new AbortController();
    controller.abort();

    const chunks: string[] = [];
    for await (const chunk of client.send(messages, controller.signal)) {
      chunks.push(chunk);
    }
    // When aborted immediately before iteration, should yield 0 chunks
    expect(chunks.length).toBe(0);
  });
});
