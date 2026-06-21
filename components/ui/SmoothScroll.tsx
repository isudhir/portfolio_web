"use client";

import { ReactLenis } from "lenis/react";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";

interface SmoothScrollProps {
  children: React.ReactNode;
}

/**
 * Wraps children in a Lenis smooth-scroll provider.
 * Disabled when the user prefers reduced motion.
 */
export function SmoothScroll({ children }: SmoothScrollProps) {
  const reduced = useReducedMotionSafe();

  if (reduced) {
    return <>{children}</>;
  }

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.2,
        smoothWheel: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
