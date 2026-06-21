"use client";

import { useRef, useState, useCallback, CSSProperties } from "react";
import { useReducedMotionSafe } from "./useReducedMotionSafe";

export interface MagneticResult {
  ref: React.RefObject<HTMLElement | null>;
  style: CSSProperties;
}

/**
 * Pointer-follow translate transform for the referenced element.
 * The element "magnetically" follows the cursor within its bounding box.
 * Resets on pointer leave. Disabled when the user prefers reduced motion.
 *
 * @param strength - How strongly the element follows the cursor (0..1). Default 0.3.
 */
export function useMagnetic(strength = 0.3): MagneticResult {
  const reducedMotion = useReducedMotionSafe();
  const ref = useRef<HTMLElement | null>(null);
  const [style, setStyle] = useState<CSSProperties>({});

  const handlePointerMove = useCallback(
    (e: PointerEvent) => {
      if (reducedMotion || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * strength;
      const dy = (e.clientY - cy) * strength;
      setStyle({
        transform: `translate(${dx}px, ${dy}px)`,
        transition: "transform 0.15s ease-out",
      });
    },
    [reducedMotion, strength]
  );

  const handlePointerLeave = useCallback(() => {
    setStyle({
      transform: "translate(0px, 0px)",
      transition: "transform 0.4s ease-out",
    });
  }, []);

  // Attach / detach listeners whenever ref is assigned
  const setRef = useCallback(
    (el: HTMLElement | null) => {
      if (ref.current) {
        ref.current.removeEventListener("pointermove", handlePointerMove);
        ref.current.removeEventListener("pointerleave", handlePointerLeave);
      }
      (ref as React.MutableRefObject<HTMLElement | null>).current = el;
      if (el && !reducedMotion) {
        el.addEventListener("pointermove", handlePointerMove);
        el.addEventListener("pointerleave", handlePointerLeave);
      }
    },
    [reducedMotion, handlePointerMove, handlePointerLeave]
  );

  return {
    ref: {
      get current() {
        return ref.current;
      },
      set current(el: HTMLElement | null) {
        setRef(el);
      },
    } as React.RefObject<HTMLElement | null>,
    style,
  };
}
