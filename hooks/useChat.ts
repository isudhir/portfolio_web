"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { createChatClient } from "@/lib/chat";
import type { ChatClient, ChatMessage } from "@/lib/chat";

export interface UseChatReturn {
  messages: ChatMessage[];
  isStreaming: boolean;
  error: string | null;
  send: (text: string) => Promise<void>;
  abort: () => void;
  clear: () => void;
}

/**
 * Manages AI chat state.
 *
 * @param client - Optional ChatClient injection (useful for tests).
 *                 Defaults to createChatClient().
 */
export function useChat(client?: ChatClient): UseChatReturn {
  const [messages, setMessages] = useLocalStorage<ChatMessage[]>(
    "portfolio-chat",
    []
  );
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // AbortController for the current stream
  const abortRef = useRef<AbortController | null>(null);
  // Stable reference to the client so we don't recreate it on every render
  const clientRef = useRef<ChatClient>(client ?? createChatClient());
  // Keep a mutable ref of messages so we can read latest inside the async loop
  const messagesRef = useRef<ChatMessage[]>(messages);
  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  const send = useCallback(
    async (text: string) => {
      if (!text.trim()) return;

      const userMsg: ChatMessage = {
        id: crypto.randomUUID(),
        role: "user",
        content: text.trim(),
      };

      const assistantMsg: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: "",
      };

      // Snapshot current messages + append user + empty assistant placeholder
      const withUser: ChatMessage[] = [...messagesRef.current, userMsg];
      const withPlaceholder: ChatMessage[] = [...withUser, assistantMsg];
      const assistantId = assistantMsg.id;

      setMessages(withPlaceholder);
      messagesRef.current = withPlaceholder;
      setIsStreaming(true);
      setError(null);

      abortRef.current = new AbortController();

      try {
        // Send all messages up to (but not including) the empty assistant placeholder
        const stream = clientRef.current.send(
          withUser,
          abortRef.current.signal
        );

        let accumulated = "";
        for await (const chunk of stream) {
          if (abortRef.current?.signal.aborted) break;
          accumulated += chunk;

          // Update the assistant message in the latest snapshot
          const updated = messagesRef.current.map((m) =>
            m.id === assistantId ? { ...m, content: accumulated } : m
          );
          setMessages(updated);
          messagesRef.current = updated;
        }
      } catch (err) {
        if (err instanceof Error && err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setIsStreaming(false);
        abortRef.current = null;
      }
    },
    [setMessages]
  );

  const abort = useCallback(() => {
    abortRef.current?.abort();
    setIsStreaming(false);
  }, []);

  const clear = useCallback(() => {
    abortRef.current?.abort();
    setMessages([]);
    messagesRef.current = [];
    setIsStreaming(false);
    setError(null);
  }, [setMessages]);

  return { messages, isStreaming, error, send, abort, clear };
}
