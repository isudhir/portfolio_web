import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { useScramble } from "./useScramble";

describe("useScramble", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("returns target text while inactive", () => {
    const { result } = renderHook(() => useScramble("Projects", false));
    expect(result.current).toBe("Projects");
  });

  it("shows scrambled glyphs mid-flight, then settles on target", () => {
    const { result } = renderHook(() => useScramble("Projects", true, 300));
    act(() => {
      vi.advanceTimersByTime(60);
    });
    expect(result.current).toHaveLength("Projects".length);
    expect(result.current).not.toBe("Projects");
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(result.current).toBe("Projects");
  });
});
