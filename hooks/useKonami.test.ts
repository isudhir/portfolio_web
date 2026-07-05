import { renderHook } from "@testing-library/react";
import { fireEvent } from "@testing-library/dom";
import { describe, it, expect, vi } from "vitest";
import { useKonami } from "./useKonami";

const SEQ = [
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
];

describe("useKonami", () => {
  it("fires exactly once after the full sequence", () => {
    const cb = vi.fn();
    renderHook(() => useKonami(cb));
    for (const key of SEQ) fireEvent.keyDown(window, { key });
    expect(cb).toHaveBeenCalledTimes(1);
  });

  it("does not fire on an interrupted sequence", () => {
    const cb = vi.fn();
    renderHook(() => useKonami(cb));
    for (const key of ["ArrowUp", "ArrowUp", "x", ...SEQ.slice(2)]) {
      fireEvent.keyDown(window, { key });
    }
    expect(cb).not.toHaveBeenCalled();
  });

  it("recovers when the sequence restarts", () => {
    const cb = vi.fn();
    renderHook(() => useKonami(cb));
    for (const key of ["ArrowUp", "ArrowDown", ...SEQ]) {
      fireEvent.keyDown(window, { key });
    }
    expect(cb).toHaveBeenCalledTimes(1);
  });
});
