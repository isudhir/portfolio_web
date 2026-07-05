"use client";

import { useEffect, useRef } from "react";

const KONAMI = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
] as const;

/** Fires `onUnlock` when the konami code is typed anywhere on the page. */
export function useKonami(onUnlock: () => void): void {
  const index = useRef(0);
  const cb = useRef(onUnlock);

  useEffect(() => {
    cb.current = onUnlock;
  }, [onUnlock]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      if (key === KONAMI[index.current]) {
        index.current += 1;
        if (index.current === KONAMI.length) {
          index.current = 0;
          cb.current();
        }
      } else {
        // allow the failed key to start a new attempt
        index.current = key === KONAMI[0] ? 1 : 0;
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);
}
