"use client";

import { useRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";

export interface MarqueeProps extends HTMLAttributes<HTMLDivElement> {
  /** Scroll speed in pixels per second. Default 60. */
  speed?: number;
  /** Gap between duplicated sets. Default "2rem". */
  gap?: string;
  children?: ReactNode;
}

export function Marquee({
  speed = 60,
  gap = "2rem",
  className,
  children,
  ...props
}: MarqueeProps) {
  const reducedMotion = useReducedMotionSafe();
  const trackRef = useRef<HTMLDivElement>(null);

  if (reducedMotion) {
    return (
      <div
        className={cn("overflow-hidden", className)}
        aria-label="Marquee list (motion reduced)"
        {...props}
      >
        <div className="flex" style={{ gap }}>
          {children}
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn("overflow-hidden", className)}
      aria-label="Marquee list"
      style={
        {
          // We set --marquee-duration via inline style computed from speed prop
        } as React.CSSProperties
      }
      {...props}
    >
      <div
        ref={trackRef}
        className="flex w-max will-change-transform [animation:marquee_var(--mq-dur)_linear_infinite] hover:[animation-play-state:paused]"
        style={
          {
            "--mq-dur": `${speed}s`,
            gap,
          } as React.CSSProperties
        }
      >
        {/* Duplicate children so the scroll appears infinite */}
        <div className="flex shrink-0" style={{ gap }}>
          {children}
        </div>
        <div className="flex shrink-0" aria-hidden="true" style={{ gap }}>
          {children}
        </div>
      </div>

      {/* Inline keyframe injected via a style tag (avoids tailwind config changes) */}
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
