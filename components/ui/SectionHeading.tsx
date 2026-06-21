"use client";

import { cn } from "@/lib/utils";
import { GradientText } from "./GradientText";

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
            "text-sm font-semibold uppercase tracking-widest text-purple",
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
            {title}
          </GradientText>
        ) : (
          title
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
