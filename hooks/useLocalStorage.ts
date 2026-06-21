"use client";

import { useState, useCallback } from "react";

/**
 * SSR-safe localStorage hook with JSON serialization.
 * Uses lazy initialization so the initial read from localStorage only happens once.
 *
 * @param key - The localStorage key.
 * @param initialValue - Fallback value when the key is not set.
 * @returns A stateful tuple [value, setValue] mirroring React.useState.
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    // SSR guard: localStorage is not available server-side.
    if (typeof window === "undefined") {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item !== null ? (JSON.parse(item) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value: T) => {
      try {
        setStoredValue(value);
        if (typeof window !== "undefined") {
          window.localStorage.setItem(key, JSON.stringify(value));
        }
      } catch {
        // Silently ignore write errors (e.g., private browsing quota exceeded).
      }
    },
    [key]
  );

  return [storedValue, setValue];
}
