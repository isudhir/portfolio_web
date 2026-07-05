"use client";

import { motion } from "framer-motion";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";
import { cn } from "@/lib/utils";

export interface SectionDividerProps {
  className?: string;
}

/**
 * Quiet center-motif section divider: a small diamond flanked by short neutral
 * lines that taper to transparent (no full-width hard edge). A single subtle
 * accent shimmer sweeps along each line; the motif reveals on scroll.
 * GPU-friendly: animates only opacity/transform.
 * Reduced motion: a static, dimmer version of the same motif.
 */
export function SectionDivider({ className }: SectionDividerProps) {
  const reduced = useReducedMotionSafe();

  if (reduced) {
    return (
      <div
        className={cn("my-16 flex items-center justify-center gap-3", className)}
        aria-hidden="true"
      >
        <span className="h-px w-16 bg-gradient-to-r from-transparent to-border" />
        <span className="h-2 w-2 rotate-45 rounded-[2px] bg-border" />
        <span className="h-px w-16 bg-gradient-to-l from-transparent to-border" />
      </div>
    );
  }

  return (
    <motion.div
      className={cn("my-16 flex items-center justify-center gap-3", className)}
      aria-hidden="true"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Left tapering line + accent shimmer */}
      <div className="relative h-px w-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-border" />
        <motion.div
          className="absolute inset-y-0 w-1/2"
          style={{
            background:
              "linear-gradient(90deg, transparent, color-mix(in oklab, var(--accent-indigo) 55%, transparent), transparent)",
          }}
          animate={{ x: ["-100%", "300%"] }}
          transition={{ duration: 4, ease: "linear", repeat: Infinity, repeatDelay: 3 }}
        />
      </div>

      {/* Center diamond */}
      <span className="h-1.5 w-1.5 rotate-45 rounded-[1px] bg-muted-foreground/60" />

      {/* Right tapering line + accent shimmer */}
      <div className="relative h-px w-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-l from-transparent to-border" />
        <motion.div
          className="absolute inset-y-0 w-1/2"
          style={{
            background:
              "linear-gradient(90deg, transparent, color-mix(in oklab, var(--accent-indigo) 55%, transparent), transparent)",
          }}
          animate={{ x: ["300%", "-100%"] }}
          transition={{ duration: 4, ease: "linear", repeat: Infinity, repeatDelay: 3 }}
        />
      </div>
    </motion.div>
  );
}
