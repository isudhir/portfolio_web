"use client";

import React from "react";
import { motion, useInView } from "framer-motion";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";
import { cn } from "@/lib/utils";

type AsProp = keyof React.JSX.IntrinsicElements;

export interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  as?: AsProp;
}

const STAGGER_MS = 40; // 40 ms per word

/**
 * Splits text into words and staggers each word's reveal on scroll into view.
 * Respects reduced motion — renders plain text with no stagger.
 */
export function TextReveal({
  text,
  className,
  delay = 0,
  as: Tag = "p",
}: TextRevealProps) {
  const reduced = useReducedMotionSafe();
  const ref = React.useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  const words = text.split(" ");

  if (reduced) {
    const El = Tag as React.ElementType;
    return (
      <El ref={ref as React.Ref<HTMLElement>} className={cn(className)}>
        {text}
      </El>
    );
  }

  const El = Tag as React.ElementType;
  return (
    <El
      ref={ref as React.Ref<HTMLElement>}
      className={cn("inline", className)}
      aria-label={text}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.25em]"
          aria-hidden="true"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{
            duration: 0.4,
            ease: "easeOut",
            delay: delay + i * (STAGGER_MS / 1000),
          }}
        >
          {word}
        </motion.span>
      ))}
    </El>
  );
}
