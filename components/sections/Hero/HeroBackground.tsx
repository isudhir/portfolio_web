"use client";

import { useEffect, useRef } from "react";
import { FloatingParticles } from "@/components/animations/FloatingParticles";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";
import { cn } from "@/lib/utils";

interface HeroBackgroundProps {
  className?: string;
}

/**
 * Cinematic hero background: aurora gradient layer + floating particles +
 * a subtle mouse-following radial gradient.
 * All effects disabled under reduced motion.
 */
export function HeroBackground({ className }: HeroBackgroundProps) {
  const reduced = useReducedMotionSafe();
  const mouseGradRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (reduced) return;
    const el = mouseGradRef.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      if (rafRef.current !== null) return;
      rafRef.current = requestAnimationFrame(() => {
        if (el) {
          el.style.background = `radial-gradient(600px circle at ${e.clientX}px ${e.clientY}px, var(--accent-purple)12, var(--accent-indigo)08, transparent 70%)`;
        }
        rafRef.current = null;
      });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [reduced]);

  return (
    <div
      className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}
      aria-hidden="true"
    >
      {/* Aurora gradient base */}
      <div
        className="absolute inset-0 animate-aurora opacity-60"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% -20%, var(--accent-purple)30, transparent)," +
            "radial-gradient(ellipse 60% 40% at 80% 80%, var(--accent-indigo)20, transparent)," +
            "radial-gradient(ellipse 50% 30% at 20% 60%, var(--accent-cyan)15, transparent)",
        }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0">
        <FloatingParticles count={55} color="var(--accent-purple)" />
      </div>

      {/* Mouse-following gradient overlay */}
      {!reduced && (
        <div
          ref={mouseGradRef}
          className="absolute inset-0 transition-none"
          style={{
            background:
              "radial-gradient(600px circle at 50% 50%, var(--accent-purple)08, transparent 70%)",
          }}
        />
      )}

      {/* Bottom fade to blend into page */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32"
        style={{
          background: "linear-gradient(to bottom, transparent, var(--background))",
        }}
      />
    </div>
  );
}
