"use client";

import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import type { Accent } from "@/types";

export interface GlowBorderProps extends HTMLAttributes<HTMLDivElement> {
  /** Accent colour for the animated border glow. Default "purple". */
  accent?: Accent;
  /** Border radius class. Default "rounded-xl". */
  rounded?: string;
}

const accentGradient: Record<Accent, string> = {
  purple:
    "from-[var(--accent-purple)] via-[var(--accent-indigo)] to-[var(--accent-purple)]",
  indigo:
    "from-[var(--accent-indigo)] via-[var(--accent-cyan)] to-[var(--accent-indigo)]",
  cyan: "from-[var(--accent-cyan)] via-[var(--accent-purple)] to-[var(--accent-cyan)]",
};

export function GlowBorder({
  accent = "purple",
  rounded = "rounded-xl",
  className,
  children,
  ...props
}: GlowBorderProps) {
  return (
    <div
      className={cn("relative", rounded, className)}
      {...props}
    >
      {/* Animated gradient border via a pseudo-element replacement */}
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 z-0",
          rounded,
          "bg-gradient-to-r bg-[length:200%_100%] animate-gradient opacity-70",
          accentGradient[accent]
        )}
        style={{ padding: "1px" }}
      />
      {/* Mask to cut out inner content area — uses a transparent inner layer */}
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-[1px] z-[1]",
          rounded,
          "bg-card"
        )}
      />
      {/* Content sits above both layers */}
      <div className="relative z-[2]">{children}</div>
    </div>
  );
}
