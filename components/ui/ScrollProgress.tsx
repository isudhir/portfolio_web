"use client";

import { useScrollProgress } from "@/hooks/useScrollProgress";

/**
 * Fixed top gradient bar showing scroll progress.
 * z-index 60 (above dock at 50, below cursor at 70).
 */
export function ScrollProgress() {
  const progress = useScrollProgress();

  return (
    <div
      role="progressbar"
      aria-label="Page scroll progress"
      aria-valuenow={Math.round(progress * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
      className="fixed top-0 left-0 right-0 h-[2px] z-60 pointer-events-none"
    >
      <div
        className="h-full origin-left"
        style={{
          width: `${progress * 100}%`,
          background:
            "linear-gradient(90deg, var(--accent-purple), var(--accent-indigo), var(--accent-cyan))",
          boxShadow: "0 0 8px var(--accent-indigo)",
        }}
      />
    </div>
  );
}
