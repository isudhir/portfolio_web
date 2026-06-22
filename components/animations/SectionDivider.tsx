"use client";

import { motion } from "framer-motion";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";
import { cn } from "@/lib/utils";

export interface SectionDividerProps {
  className?: string;
}

/**
 * Decorative center-motif section divider: a glowing diamond flanked by short
 * gradient lines that taper to transparent (no full-width hard edge). The
 * aurora shimmer sweeps along each line; the whole motif reveals on scroll.
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
      {/* Left tapering line + aurora shimmer */}
      <div className="relative h-px w-24 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(90deg, transparent, var(--accent-purple))",
          }}
        />
        <motion.div
          className="absolute inset-y-0 w-1/2"
          style={{
            background:
              "linear-gradient(90deg, transparent, var(--accent-cyan), transparent)",
          }}
          animate={{ x: ["-100%", "300%"] }}
          transition={{ duration: 3, ease: "linear", repeat: Infinity, repeatDelay: 1.5 }}
        />
      </div>

      {/* Center glowing diamond */}
      <motion.span
        className="h-2.5 w-2.5 rotate-45 rounded-[2px]"
        style={{
          background:
            "linear-gradient(135deg, var(--accent-purple), var(--accent-indigo), var(--accent-cyan))",
          boxShadow: "0 0 12px 2px var(--accent-indigo)",
        }}
        animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.15, 1] }}
        transition={{ duration: 2.5, ease: "easeInOut", repeat: Infinity }}
      />

      {/* Right tapering line + aurora shimmer */}
      <div className="relative h-px w-24 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(90deg, var(--accent-cyan), transparent)",
          }}
        />
        <motion.div
          className="absolute inset-y-0 w-1/2"
          style={{
            background:
              "linear-gradient(90deg, transparent, var(--accent-purple), transparent)",
          }}
          animate={{ x: ["300%", "-100%"] }}
          transition={{ duration: 3, ease: "linear", repeat: Infinity, repeatDelay: 1.5 }}
        />
      </div>
    </motion.div>
  );
}
