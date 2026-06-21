"use client";

import { useRef, type KeyboardEvent } from "react";
import { Send } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ChatInputProps {
  onSend: (text: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    const value = textareaRef.current?.value.trim();
    if (!value || disabled) return;
    onSend(value);
    if (textareaRef.current) {
      textareaRef.current.value = "";
      // Reset height
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInput = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
  };

  return (
    <div className="flex items-end gap-2 p-3 border-t border-white/10">
      <textarea
        ref={textareaRef}
        rows={1}
        placeholder={disabled ? "Thinking…" : "Ask me anything…"}
        disabled={disabled}
        onKeyDown={handleKeyDown}
        onInput={handleInput}
        className={cn(
          "flex-1 resize-none rounded-xl bg-white/5 border border-white/10 px-3 py-2",
          "text-sm text-foreground placeholder:text-muted-foreground",
          "focus:outline-none focus:border-purple/50 focus:bg-white/8",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          "transition-colors max-h-[120px] overflow-y-auto",
          "scrollbar-thin scrollbar-thumb-white/10"
        )}
        aria-label="Chat message input"
      />
      <button
        onClick={handleSend}
        disabled={disabled}
        aria-label="Send message"
        className={cn(
          "shrink-0 size-9 rounded-xl flex items-center justify-center",
          "bg-purple/20 border border-purple/30",
          "hover:bg-purple/30 hover:border-purple/50",
          "disabled:opacity-40 disabled:cursor-not-allowed",
          "transition-colors"
        )}
      >
        <Send className="size-4 text-purple" style={{ color: "var(--accent-purple)" }} />
      </button>
    </div>
  );
}
