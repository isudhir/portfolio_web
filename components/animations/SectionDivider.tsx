"use client";

import { motion } from "framer-motion";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";
import { cn } from "@/lib/utils";

export interface SectionDividerProps {
  className?: string;
}

/**
 * Animated gradient/aurora divider line between sections.
 * GPU-friendly: only animates opacity and transform.
 * Reduced motion: renders a plain static border line.
 */
export function SectionDivider({ className }: SectionDividerProps) {
  const reduced = useReducedMotionSafe();

  if (reduced) {
    return (
      <div
        className={cn("w-full h-px bg-border my-16", className)}
        aria-hidden="true"
      />
    );
  }

  return (
    <div
      className={cn("relative w-full h-px my-16 overflow-hidden", className)}
      aria-hidden="true"
    >
      {/* Base border line */}
      <div className="absolute inset-0 bg-border" />

      {/* Animated aurora shimmer — translates across the divider */}
      <motion.div
        className="absolute inset-y-0 w-1/3"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--accent-purple), var(--accent-indigo), var(--accent-cyan), transparent)",
        }}
        animate={{ x: ["-100%", "400%"] }}
        transition={{
          duration: 3.5,
          ease: "linear",
          repeat: Infinity,
          repeatDelay: 2,
        }}
      />
    </div>
  );
}
