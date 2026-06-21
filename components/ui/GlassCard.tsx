"use client";

import { useRef, useState, useCallback, type HTMLAttributes, type PointerEvent } from "react";
import { cn } from "@/lib/utils";
import type { Accent } from "@/types";

export interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  /** Optional accent glow colour on the border */
  glow?: Accent;
  /** Whether to show a cursor-following radial spotlight inside the card */
  spotlight?: boolean;
}

const accentVar: Record<Accent, string> = {
  purple: "var(--accent-purple)",
  indigo: "var(--accent-indigo)",
  cyan: "var(--accent-cyan)",
};

export function GlassCard({
  glow,
  spotlight = false,
  className,
  children,
  style,
  ...props
}: GlassCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [spotPos, setSpotPos] = useState<{ x: number; y: number } | null>(null);
  const rafId = useRef<number | null>(null);

  const handlePointerMove = useCallback((e: PointerEvent<HTMLDivElement>) => {
    if (!spotlight || !cardRef.current) return;
    if (rafId.current !== null) return;
    rafId.current = requestAnimationFrame(() => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      setSpotPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      rafId.current = null;
    });
  }, [spotlight]);

  const handlePointerLeave = useCallback(() => {
    setSpotPos(null);
    if (rafId.current !== null) {
      cancelAnimationFrame(rafId.current);
      rafId.current = null;
    }
  }, []);

  const glowStyle = glow
    ? ({
        boxShadow: `0 0 0 1px ${accentVar[glow]}40, 0 0 20px ${accentVar[glow]}20`,
        borderColor: `${accentVar[glow]}50`,
      } as React.CSSProperties)
    : undefined;

  return (
    <div
      ref={cardRef}
      className={cn("glass relative overflow-hidden rounded-xl", className)}
      style={{ ...glowStyle, ...style }}
      onPointerMove={spotlight ? handlePointerMove : undefined}
      onPointerLeave={spotlight ? handlePointerLeave : undefined}
      {...props}
    >
      {spotlight && spotPos && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 transition-opacity"
          style={{
            background: `radial-gradient(400px circle at ${spotPos.x}px ${spotPos.y}px, rgba(168,85,247,0.08) 0%, transparent 70%)`,
          }}
        />
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
