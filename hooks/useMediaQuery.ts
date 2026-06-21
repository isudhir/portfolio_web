"use client";

import { useSyncExternalStore } from "react";

/**
 * SSR-safe hook that tracks a CSS media query using useSyncExternalStore.
 * Returns true when the query matches, false otherwise.
 * Server snapshot always returns false (safe default).
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = (callback: () => void) => {
    const mq = window.matchMedia(query);
    mq.addEventListener("change", callback);
    return () => mq.removeEventListener("change", callback);
  };

  const getSnapshot = () => window.matchMedia(query).matches;

  const getServerSnapshot = () => false;

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
