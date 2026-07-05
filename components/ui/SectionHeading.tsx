"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { useScramble } from "@/hooks/useScramble";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";
import { GradientText } from "./GradientText";

/** Decode-on-first-view title. Plain text under reduced motion. */
function ScrambleTitle({ text }: { text: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotionSafe();
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const display = useScramble(text, inView && !reduced);
  return (
    <span ref={ref} aria-label={text}>
      <span aria-hidden="true">{display}</span>
    </span>
  );
}

export interface SectionHeadingProps {
  /** Small label above the main title */
  eyebrow?: string;
  /** Main heading text */
  title: string;
  /** Whether to render the title with the gradient effect */
  gradientTitle?: boolean;
  /** Optional subtitle / description beneath the title */
  subtitle?: string;
  /** "center" (default) or "left" */
  align?: "center" | "left";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  gradientTitle = false,
  subtitle,
  align = "center",
  className,
}: SectionHeadingProps) {
  const isCenter = align === "center";

  return (
    <div
      className={cn(
        "mb-12 space-y-3",
        isCenter && "text-center",
        className
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "font-mono text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground",
            !isCenter && "text-left"
          )}
        >
          {eyebrow}
        </p>
      )}

      <h2
        className={cn(
          "text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl",
          !isCenter && "text-left"
        )}
      >
        {gradientTitle ? (
          <GradientText as="span" animated>
            <ScrambleTitle text={title} />
          </GradientText>
        ) : (
          <ScrambleTitle text={title} />
        )}
      </h2>

      {subtitle && (
        <p
          className={cn(
            "mx-auto max-w-2xl text-base text-muted-foreground sm:text-lg",
            !isCenter && "mx-0 text-left"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
