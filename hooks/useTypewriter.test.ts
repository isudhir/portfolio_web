import { renderHook, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { useTypewriter } from "./useTypewriter";

// Mock useReducedMotionSafe to always return false in tests
vi.mock("./useReducedMotionSafe", () => ({
  useReducedMotionSafe: () => false,
}));

describe("useTypewriter", () => {
  it("eventually types the full word 'ab' when given ['ab']", async () => {
    const { result } = renderHook(() =>
      // Use very short speeds so the test finishes quickly with real timers
      useTypewriter(["ab"], { typingSpeed: 10, deletingSpeed: 10, pause: 10 })
    );

    // Initial state is empty
    expect(result.current).toBe("");

    // Wait until the hook has typed 'ab'
    await waitFor(
      () => {
        expect(result.current).toBe("ab");
      },
      { timeout: 500 }
    );
  });

  it("starts from empty string", () => {
    // Use very long speeds so it stays empty during the synchronous check
    const { result } = renderHook(() =>
      useTypewriter(["hello"], { typingSpeed: 10000, deletingSpeed: 10000, pause: 10000 })
    );

    expect(result.current).toBe("");
  });
});
