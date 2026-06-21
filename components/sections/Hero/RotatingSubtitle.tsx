"use client";

import { useTypewriter } from "@/hooks/useTypewriter";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";

interface RotatingSubtitleProps {
  subtitles: string[];
}

/**
 * Typewriter-cycling subtitle for the hero.
 * Under reduced motion renders the first subtitle statically.
 */
export function RotatingSubtitle({ subtitles }: RotatingSubtitleProps) {
  const reduced = useReducedMotionSafe();
  const displayed = useTypewriter(subtitles, {
    typingSpeed: 100,
    deletingSpeed: 55,
    pause: 1800,
  });

  const text = reduced ? (subtitles[0] ?? "") : displayed;

  return (
    <span
      className="inline-block min-h-[1.5em] text-xl sm:text-2xl font-medium text-muted-foreground"
      aria-label={subtitles.join(" / ")}
      aria-live="polite"
    >
      {text}
      {/* Blinking cursor — hidden under reduced motion */}
      {!reduced && (
        <span
          aria-hidden="true"
          className="ml-0.5 inline-block w-0.5 h-[1.1em] align-middle bg-purple animate-pulse"
        />
      )}
    </span>
  );
}
