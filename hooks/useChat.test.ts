import { describe, it, expect } from "vitest";
import { renderHook, act, waitFor } from "@testing-library/react";
import { useChat } from "@/hooks/useChat";
import type { ChatClient, ChatMessage } from "@/lib/chat";

/** Fake ChatClient that yields the provided chunks (no delay). */
function makeFakeClient(chunks: string[]): ChatClient {
  return {
    async *send(
      _messages: ChatMessage[],
      _signal?: AbortSignal
    ): AsyncIterable<string> {
      for (const chunk of chunks) {
        yield chunk;
      }
    },
  };
}

describe("useChat", () => {
  it("streams assistant reply and produces history of length 2", async () => {
    const fakeClient = makeFakeClient(["Hi", " there"]);
    const { result } = renderHook(() => useChat(fakeClient));

    // Initially empty
    expect(result.current.messages).toHaveLength(0);

    // Send a user message
    await act(async () => {
      await result.current.send("Hello");
    });

    // Wait for streaming to complete
    await waitFor(() => {
      expect(result.current.isStreaming).toBe(false);
    });

    // Should have exactly 2 messages: user + assistant
    expect(result.current.messages).toHaveLength(2);

    const [userMsg, assistantMsg] = result.current.messages;
    expect(userMsg.role).toBe("user");
    expect(userMsg.content).toBe("Hello");

    expect(assistantMsg.role).toBe("assistant");
    expect(assistantMsg.content).toBe("Hi there");
  });
});
