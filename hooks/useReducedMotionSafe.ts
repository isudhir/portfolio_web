"use client";

import { useReducedMotion } from "framer-motion";

/**
 * SSR-safe wrapper around framer-motion's useReducedMotion.
 * Returns true when the user prefers reduced motion (disable JS-driven animations).
 */
export function useReducedMotionSafe(): boolean {
  const prefersReduced = useReducedMotion();
  // useReducedMotion returns null on the server; treat null as false (no reduction).
  return prefersReduced ?? false;
}
