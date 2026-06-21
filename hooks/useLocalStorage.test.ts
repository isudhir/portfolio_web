import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import { useLocalStorage } from "./useLocalStorage";

describe("useLocalStorage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("returns the initial value when nothing is stored", () => {
    const { result } = renderHook(() =>
      useLocalStorage<string>("test-key", "default")
    );
    expect(result.current[0]).toBe("default");
  });

  it("persists a value to localStorage when set", () => {
    const { result } = renderHook(() =>
      useLocalStorage<string>("test-key", "default")
    );

    act(() => {
      result.current[1]("hello");
    });

    expect(result.current[0]).toBe("hello");
    expect(localStorage.getItem("test-key")).toBe(JSON.stringify("hello"));
  });

  it("reads a previously stored value on fresh mount with the same key", () => {
    // Pre-populate localStorage
    localStorage.setItem("persist-key", JSON.stringify(42));

    const { result } = renderHook(() =>
      useLocalStorage<number>("persist-key", 0)
    );

    expect(result.current[0]).toBe(42);
  });

  it("works with object values", () => {
    const { result } = renderHook(() =>
      useLocalStorage<{ count: number }>("obj-key", { count: 0 })
    );

    act(() => {
      result.current[1]({ count: 5 });
    });

    expect(result.current[0]).toEqual({ count: 5 });
    expect(JSON.parse(localStorage.getItem("obj-key")!)).toEqual({ count: 5 });
  });
});
