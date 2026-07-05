import { describe, it, expect } from "vitest";
import { mulberry32, seededSeries } from "./seeded";

describe("seeded PRNG", () => {
  it("is deterministic for the same seed", () => {
    expect(seededSeries(42, 20)).toEqual(seededSeries(42, 20));
  });
  it("differs across seeds", () => {
    expect(seededSeries(1, 20)).not.toEqual(seededSeries(2, 20));
  });
  it("yields floats in [0, 1)", () => {
    const rand = mulberry32(7);
    for (let i = 0; i < 1000; i++) {
      const v = rand();
      expect(v).toBeGreaterThanOrEqual(0);
      expect(v).toBeLessThan(1);
    }
  });
});
