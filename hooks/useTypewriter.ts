"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotionSafe } from "./useReducedMotionSafe";

export interface TypewriterOptions {
  typingSpeed?: number;
  deletingSpeed?: number;
  pause?: number;
}

type Phase = "typing" | "pausing" | "deleting";

/**
 * Cycles through an array of words with a typewriter effect:
 * type → pause → delete → next word → repeat.
 *
 * If the user prefers reduced motion, returns the first word in full immediately.
 *
 * Note: `words` is captured by ref so that passing a new array reference on each
 * render (e.g. an inline literal) does NOT restart the animation.
 */
export function useTypewriter(
  words: string[],
  opts: TypewriterOptions = {}
): string {
  const { typingSpeed = 120, deletingSpeed = 60, pause = 1500 } = opts;

  const reducedMotion = useReducedMotionSafe();

  const [displayed, setDisplayed] = useState("");

  // Keep a stable ref to words so identity changes don't restart the effect
  const wordsRef = useRef(words);
  useEffect(() => {
    wordsRef.current = words;
  });

  const wordIndexRef = useRef(0);
  const charIndexRef = useRef(0);
  const phaseRef = useRef<Phase>("typing");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Stable ref for options too
  const optsRef = useRef({ typingSpeed, deletingSpeed, pause });
  useEffect(() => {
    optsRef.current = { typingSpeed, deletingSpeed, pause };
  });

  useEffect(() => {
    // Under reduced motion, just show the first word statically.
    if (reducedMotion) {
      setDisplayed(wordsRef.current[0] ?? "");
      return;
    }

    if (wordsRef.current.length === 0) return;

    // Reset animation state
    wordIndexRef.current = 0;
    charIndexRef.current = 0;
    phaseRef.current = "typing";
    setDisplayed("");

    const tick = () => {
      const { typingSpeed: ts, deletingSpeed: ds, pause: p } = optsRef.current;
      const wordIdx = wordIndexRef.current;
      const word = wordsRef.current[wordIdx % wordsRef.current.length];

      if (phaseRef.current === "typing") {
        charIndexRef.current += 1;
        setDisplayed(word.slice(0, charIndexRef.current));

        if (charIndexRef.current >= word.length) {
          phaseRef.current = "pausing";
          timeoutRef.current = setTimeout(tick, p);
        } else {
          timeoutRef.current = setTimeout(tick, ts);
        }
      } else if (phaseRef.current === "pausing") {
        phaseRef.current = "deleting";
        timeoutRef.current = setTimeout(tick, ds);
      } else {
        // deleting
        charIndexRef.current -= 1;
        setDisplayed(word.slice(0, charIndexRef.current));

        if (charIndexRef.current <= 0) {
          wordIndexRef.current = (wordIdx + 1) % wordsRef.current.length;
          charIndexRef.current = 0;
          phaseRef.current = "typing";
          timeoutRef.current = setTimeout(tick, ts);
        } else {
          timeoutRef.current = setTimeout(tick, ds);
        }
      }
    };

    timeoutRef.current = setTimeout(tick, optsRef.current.typingSpeed);

    return () => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }
    };
    // Only re-run when reducedMotion changes (words/opts captured via ref)
  }, [reducedMotion]);

  return displayed;
}
