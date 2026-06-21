"use client";

import { useRef, useEffect, useState } from "react";
import { useInView, animate } from "framer-motion";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";
import { cn } from "@/lib/utils";

export interface AnimatedCounterProps {
  /** Target number to count up to */
  value: number;
  /** Optional string appended after the number, e.g. "+" or "%" */
  suffix?: string;
  /** Animation duration in seconds. Default 1.5. */
  duration?: number;
  className?: string;
}

export function AnimatedCounter({
  value,
  suffix = "",
  duration = 1.5,
  className,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const reducedMotion = useReducedMotionSafe();
  // For reduced motion, derive displayed number directly (no state needed)
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    // Only run the counting animation when NOT in reduced-motion mode
    if (!isInView || reducedMotion) return;

    const controls = animate(0, value, {
      duration,
      ease: "easeOut",
      onUpdate(latest) {
        setAnimatedValue(Math.round(latest));
      },
    });

    return () => controls.stop();
  }, [isInView, value, duration, reducedMotion]);

  // When reduced motion is on, render the target value directly (no animation state)
  const displayValue = reducedMotion ? value : animatedValue;

  return (
    <span
      ref={ref}
      className={cn("tabular-nums", className)}
      aria-label={`${value}${suffix}`}
    >
      {displayValue}
      {suffix}
    </span>
  );
}
