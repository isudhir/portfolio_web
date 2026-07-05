"use client";

import { useEffect, useRef, useState } from "react";

const GLYPHS = "!<>-_\\/[]{}=+*^?#";
const TICK_MS = 30;

/**
 * Decode/scramble text effect: once `active` becomes true, characters cycle
 * through glyphs and settle left-to-right onto `target`. Runs once.
 * Deterministic (no Math.random) and starts from the real text, so SSR output
 * is always the plain string.
 */
export function useScramble(target: string, active: boolean, durationMs = 900): string {
  const [display, setDisplay] = useState(target);
  const started = useRef(false);

  useEffect(() => {
    if (!active || started.current) return;
    started.current = true;
    const steps = Math.max(1, Math.round(durationMs / TICK_MS));
    let frame = 0;
    const id = setInterval(() => {
      frame += 1;
      if (frame >= steps) {
        setDisplay(target);
        clearInterval(id);
        return;
      }
      const settled = Math.floor((frame / steps) * target.length);
      let out = "";
      for (let i = 0; i < target.length; i++) {
        out +=
          i < settled || target[i] === " "
            ? target[i]
            : GLYPHS[(i * 7 + frame * 3) % GLYPHS.length];
      }
      setDisplay(out);
    }, TICK_MS);
    return () => clearInterval(id);
  }, [active, target, durationMs]);

  return display;
}
