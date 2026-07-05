"use client";

import { useEffect, useRef } from "react";
import { LazySplineScene } from "@/components/ClientWidgets";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";
import { useMediaQuery } from "@/hooks/useMediaQuery";

// Placeholder Spline scene (demo robot). TODO real URL — swap for a custom scene.
const SPLINE_SCENE =
  "https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode";

/**
 * Fixed, full-viewport 3D scene rendered behind all page content (mounted once
 * in the root layout, so it spans every route).
 *
 * The layer stays `pointer-events-none` so it never intercepts clicks. This
 * scene tracks the cursor via canvas-scoped pointer events, which a
 * `pointer-events-none` canvas would otherwise never receive — so we forward
 * window `pointermove`s to the canvas as synthetic events (dispatchEvent
 * bypasses hit-testing, and the runtime reads `clientX/clientY`). Desktop
 * pointers only, and fully disabled under reduced motion.
 */
export function SplineBackground() {
  const reduced = useReducedMotionSafe();
  const enabled = useMediaQuery("(min-width: 768px) and (pointer: fine)");
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduced || !enabled) return;
    const root = rootRef.current;
    if (!root) return;

    let canvas: HTMLCanvasElement | null = null;
    let frame = 0;
    let lastX = 0;
    let lastY = 0;

    const dispatch = () => {
      frame = 0;
      if (!canvas || !canvas.isConnected) {
        canvas = root.querySelector("canvas");
        if (!canvas) return;
      }
      canvas.dispatchEvent(
        new PointerEvent("pointermove", {
          clientX: lastX,
          clientY: lastY,
          bubbles: true,
          cancelable: true,
          view: window,
          pointerId: 1,
          pointerType: "mouse",
        })
      );
    };

    const onMove = (e: PointerEvent) => {
      lastX = e.clientX;
      lastY = e.clientY;
      if (!frame) frame = requestAnimationFrame(dispatch);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [reduced, enabled]);

  if (reduced || !enabled) return null;

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 opacity-60"
    >
      <LazySplineScene scene={SPLINE_SCENE} className="h-full w-full" />
    </div>
  );
}
