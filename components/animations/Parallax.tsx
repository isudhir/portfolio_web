"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";
import { cn } from "@/lib/utils";

export interface ParallaxProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

/**
 * Translates children on the Y axis based on the element's scroll progress.
 * speed > 0 scrolls slower than content (appears to recede);
 * speed < 0 scrolls faster (appears to come forward).
 * Disabled under reduced motion.
 */
export function Parallax({ children, speed = 0.15, className }: ParallaxProps) {
  const reduced = useReducedMotionSafe();
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Map 0..1 progress to a subtle Y translation (e.g. ±30px at speed=0.15)
  const range = 200 * speed;
  const y = useTransform(scrollYProgress, [0, 1], [-range, range]);

  if (reduced) {
    return <div className={cn(className)}>{children}</div>;
  }

  return (
    <div ref={ref} className={cn("overflow-hidden", className)}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}
