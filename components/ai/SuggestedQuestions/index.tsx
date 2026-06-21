"use client";

import { SUGGESTED_QUESTIONS } from "@/data/chat";

export interface SuggestedQuestionsProps {
  onSelect: (question: string) => void;
}

export function SuggestedQuestions({ onSelect }: SuggestedQuestionsProps) {
  return (
    <div className="flex flex-wrap gap-2 p-4">
      {SUGGESTED_QUESTIONS.map((q) => (
        <button
          key={q.id}
          onClick={() => onSelect(q.label)}
          className="
            px-3 py-1.5 rounded-full text-xs
            glass border border-white/10
            text-muted-foreground hover:text-foreground
            hover:border-purple/40 hover:bg-purple/10
            transition-all duration-200
          "
          style={{ "--hover-accent": "var(--accent-purple)" } as React.CSSProperties}
        >
          {q.label}
        </button>
      ))}
    </div>
  );
}
