"use client";

import { useEffect, useState } from "react";
import { useMousePosition } from "@/hooks/useMousePosition";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";
import { useMediaQuery } from "@/hooks/useMediaQuery";

/**
 * Fixed page-level radial gradient that subtly follows the cursor.
 * Pointer-events: none. Disabled on touch and reduced-motion.
 */
export function MouseGradient() {
  const { x, y } = useMousePosition();
  const reduced = useReducedMotionSafe();
  const isTouch = useMediaQuery("(pointer: coarse)");
  const [active, setActive] = useState(false);

  useEffect(() => {
    const activate = () => setActive(true);
    window.addEventListener("mousemove", activate, { once: true });
    return () => window.removeEventListener("mousemove", activate);
  }, []);

  if (reduced || isTouch || !active) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-0 pointer-events-none"
      style={{
        background: `radial-gradient(600px circle at ${x}px ${y}px, color-mix(in oklab, var(--accent-indigo) 6%, transparent), transparent 70%)`,
        transition: "background 0.1s ease",
      }}
    />
  );
}
