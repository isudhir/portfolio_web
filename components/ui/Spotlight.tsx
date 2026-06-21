"use client";

import { useRef, useState, useCallback, type HTMLAttributes, type PointerEvent } from "react";
import { cn } from "@/lib/utils";

export interface SpotlightProps extends HTMLAttributes<HTMLDivElement> {
  /** Spotlight radius in px. Default 500. */
  radius?: number;
  /** Spotlight colour. Default: purple at low opacity. */
  color?: string;
}

export function Spotlight({
  radius = 500,
  color = "rgba(168,85,247,0.07)",
  className,
  children,
  ...props
}: SpotlightProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const rafId = useRef<number | null>(null);

  const handlePointerMove = useCallback((e: PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    if (rafId.current !== null) return;
    rafId.current = requestAnimationFrame(() => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      rafId.current = null;
    });
  }, []);

  const handlePointerLeave = useCallback(() => {
    setPos(null);
    if (rafId.current !== null) {
      cancelAnimationFrame(rafId.current);
      rafId.current = null;
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden", className)}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      {...props}
    >
      {pos && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background: `radial-gradient(${radius}px circle at ${pos.x}px ${pos.y}px, ${color} 0%, transparent 70%)`,
          }}
        />
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
