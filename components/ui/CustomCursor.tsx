"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";
import { useMediaQuery } from "@/hooks/useMediaQuery";

type CursorMode = "default" | "hover" | "view";

const RING_SIZE: Record<CursorMode, number> = { default: 32, hover: 48, view: 76 };

/**
 * Additive custom cursor (native cursor stays visible): a small dot tracks the
 * pointer 1:1; a spring-lagged ring grows over interactive elements and shows
 * a "View" label over elements marked data-cursor="view".
 * Fine-pointer devices only; disabled under reduced motion.
 */
export function CustomCursor() {
  const reduced = useReducedMotionSafe();
  const finePointer = useMediaQuery("(pointer: fine)");
  const enabled = finePointer && !reduced;

  const [mode, setMode] = useState<CursorMode>("default");
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 350, damping: 30, mass: 0.7 });
  const ringY = useSpring(y, { stiffness: 350, damping: 30, mass: 0.7 });

  useEffect(() => {
    if (!enabled) return;

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    };
    const onOver = (e: PointerEvent) => {
      const target = e.target as Element | null;
      if (target?.closest?.('[data-cursor="view"]')) {
        setMode("view");
      } else if (target?.closest?.('a, button, [role="button"], [data-cursor="hover"]')) {
        setMode("hover");
      } else {
        setMode("default");
      }
    };
    const onLeave = () => setVisible(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const size = RING_SIZE[mode];

  return (
    <div aria-hidden="true">
      {/* 1:1 dot */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999]"
        style={{ x, y, opacity: visible ? 1 : 0 }}
      >
        <div className="-translate-x-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-cyan" />
      </motion.div>

      {/* Spring-lagged ring */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999]"
        style={{ x: ringX, y: ringY, opacity: visible ? 1 : 0 }}
      >
        <motion.div
          className="flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-cyan/50"
          animate={{
            width: size,
            height: size,
            backgroundColor:
              mode === "view"
                ? "color-mix(in oklab, var(--accent-cyan) 15%, transparent)"
                : "color-mix(in oklab, var(--accent-cyan) 0%, transparent)",
          }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          {mode === "view" && (
            <span className="text-[10px] font-semibold uppercase tracking-widest text-cyan">
              View
            </span>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}
