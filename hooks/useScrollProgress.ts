"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Returns the document scroll progress as a value between 0 and 1.
 * Throttled with rAF to avoid jank.
 */
export function useScrollProgress(): number {
  const [progress, setProgress] = useState(0);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (rafId.current !== null) return;
      rafId.current = requestAnimationFrame(() => {
        const scrollTop = window.scrollY;
        const docHeight =
          document.documentElement.scrollHeight - window.innerHeight;
        const p = docHeight > 0 ? Math.min(1, Math.max(0, scrollTop / docHeight)) : 0;
        setProgress(p);
        rafId.current = null;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Compute initial value
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, []);

  return progress;
}
