"use client";

import { useCallback, type PointerEvent, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";

export interface TiltCardProps {
  children: ReactNode;
  /** Max rotation in degrees. Default 8. */
  maxTilt?: number;
  /** Moving glare highlight. Default true. */
  glare?: boolean;
  className?: string;
}

/**
 * Pointer-tracked 3D tilt with springs and an optional glare sheen.
 * Renders children flat (no wrapper behavior) on touch devices and under
 * reduced motion.
 */
export function TiltCard({ children, maxTilt = 8, glare = true, className }: TiltCardProps) {
  const reduced = useReducedMotionSafe();
  const finePointer = useMediaQuery("(pointer: fine)");

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const sx = useSpring(px, { stiffness: 220, damping: 20 });
  const sy = useSpring(py, { stiffness: 220, damping: 20 });
  const rotateX = useTransform(sy, [0, 1], [maxTilt, -maxTilt]);
  const rotateY = useTransform(sx, [0, 1], [-maxTilt, maxTilt]);
  const glareBackground = useTransform([sx, sy], (values) => {
    const [gx, gy] = values as [number, number];
    return `radial-gradient(320px circle at ${gx * 100}% ${gy * 100}%, rgba(255,255,255,0.10) 0%, transparent 60%)`;
  });

  const handleMove = useCallback(
    (e: PointerEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      px.set((e.clientX - rect.left) / rect.width);
      py.set((e.clientY - rect.top) / rect.height);
    },
    [px, py]
  );

  const handleLeave = useCallback(() => {
    px.set(0.5);
    py.set(0.5);
  }, [px, py]);

  if (reduced || !finePointer) {
    return <div className={cn("h-full", className)}>{children}</div>;
  }

  return (
    <div className={cn("h-full [perspective:900px]", className)}>
      <motion.div
        onPointerMove={handleMove}
        onPointerLeave={handleLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative h-full will-change-transform"
      >
        {children}
        {glare && (
          <motion.span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-20 rounded-2xl"
            style={{ background: glareBackground }}
          />
        )}
      </motion.div>
    </div>
  );
}
