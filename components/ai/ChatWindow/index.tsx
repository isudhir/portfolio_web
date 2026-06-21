"use client";

import { useRef, useEffect } from "react";
import { X, Trash2 } from "lucide-react";
import { useChat } from "@/hooks/useChat";
import { ChatMessage } from "@/components/ai/ChatMessage";
import { ChatInput } from "@/components/ai/ChatInput";
import { SuggestedQuestions } from "@/components/ai/SuggestedQuestions";
import { CHAT_GREETING } from "@/data/chat";
import { cn } from "@/lib/utils";

export interface ChatWindowProps {
  onClose: () => void;
}

/** Typing indicator shown while the assistant is streaming. */
function TypingIndicator() {
  return (
    <div className="flex justify-start px-4 pb-2">
      <div className="glass border border-white/10 rounded-2xl px-4 py-3 mr-4">
        <span className="inline-flex gap-1 items-center">
          <span className="size-1.5 rounded-full bg-muted-foreground animate-bounce [animation-delay:0ms]" />
          <span className="size-1.5 rounded-full bg-muted-foreground animate-bounce [animation-delay:150ms]" />
          <span className="size-1.5 rounded-full bg-muted-foreground animate-bounce [animation-delay:300ms]" />
        </span>
      </div>
    </div>
  );
}

export function ChatWindow({ onClose }: ChatWindowProps) {
  const { messages, isStreaming, error, send, clear } = useChat();
  const scrollRef = useRef<HTMLDivElement>(null);
  const isEmpty = messages.length === 0;

  // Auto-scroll to bottom when new content arrives
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages, isStreaming]);

  return (
    <div
      role="dialog"
      aria-label="AI Chat"
      aria-modal="true"
      className={cn(
        "flex flex-col",
        // Mobile: full-width bottom sheet style
        "w-full max-w-full",
        // Desktop: fixed width
        "sm:w-[380px] sm:max-w-[380px]",
        "h-[520px] max-h-[80vh]",
        "glass border border-white/10 rounded-2xl overflow-hidden",
        "shadow-2xl shadow-black/50"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 shrink-0">
        <div className="flex items-center gap-2">
          <span
            className="size-2 rounded-full animate-pulse"
            style={{ background: "var(--accent-purple)" }}
            aria-hidden="true"
          />
          <h2 className="text-sm font-semibold text-foreground">
            Ask Sudhir&apos;s AI
          </h2>
        </div>
        <div className="flex items-center gap-1">
          {!isEmpty && (
            <button
              onClick={clear}
              aria-label="Clear chat history"
              title="Clear chat"
              className="size-7 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-white/10 transition-colors"
            >
              <Trash2 className="size-3.5" />
            </button>
          )}
          <button
            onClick={onClose}
            aria-label="Close chat"
            className="size-7 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-white/10 transition-colors"
          >
            <X className="size-4" />
          </button>
        </div>
      </div>

      {/* Message list */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto py-4 space-y-3 scroll-smooth"
        aria-live="polite"
        aria-relevant="additions"
      >
        {isEmpty ? (
          <div className="px-4 space-y-4">
            <p className="text-sm text-muted-foreground">{CHAT_GREETING}</p>
            <SuggestedQuestions onSelect={send} />
          </div>
        ) : (
          <>
            {messages.map((msg) => (
              <ChatMessage
                key={msg.id}
                message={msg}
                isStreaming={
                  isStreaming &&
                  msg.role === "assistant" &&
                  msg === messages[messages.length - 1]
                }
              />
            ))}
            {/* Show typing indicator only when last assistant message has no content yet */}
            {isStreaming &&
              messages[messages.length - 1]?.role === "assistant" &&
              messages[messages.length - 1]?.content === "" && (
                <TypingIndicator />
              )}
          </>
        )}

        {error && (
          <p className="text-xs text-destructive px-4">
            Something went wrong. Please try again.
          </p>
        )}
      </div>

      {/* Input */}
      <ChatInput onSend={send} disabled={isStreaming} />
    </div>
  );
}
