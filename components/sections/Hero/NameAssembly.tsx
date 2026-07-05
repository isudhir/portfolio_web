"use client";

import { motion } from "framer-motion";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";
import { GradientText } from "@/components/ui/GradientText";

export interface NameAssemblyProps {
  name: string;
  className?: string;
}

/**
 * Per-character assembly: each glyph rises, un-blurs and settles with a
 * stagger. Each char carries its own slice of the brand gradient via a
 * background-position offset so the gradient flows across the whole name.
 * Reduced motion: static gradient heading.
 */
export function NameAssembly({ name, className }: NameAssemblyProps) {
  const reduced = useReducedMotionSafe();

  if (reduced) {
    return (
      <GradientText as="h1" className={className}>
        {name}
      </GradientText>
    );
  }

  const chars = Array.from(name);
  return (
    <h1 className={className} aria-label={name}>
      {chars.map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          aria-hidden="true"
          className="inline-block text-gradient"
          style={{
            backgroundSize: "200% auto",
            backgroundPosition: `${(i / Math.max(chars.length - 1, 1)) * 100}% 50%`,
          }}
          initial={{ opacity: 0, y: "0.5em", scale: 1.25, filter: "blur(12px)" }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.6, delay: 0.25 + i * 0.045, ease: [0.215, 0.61, 0.355, 1] }}
        >
          {/* non-breaking space keeps word gaps from collapsing in inline-blocks */}
          {char === " " ? " " : char}
        </motion.span>
      ))}
    </h1>
  );
}
