/**
 * Deterministic PRNG (mulberry32). Hydration-safe: same seed → same sequence
 * on server and client, so values may be used during render.
 */
export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return function () {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Fixed-length array of deterministic floats in [0, 1). */
export function seededSeries(seed: number, length: number): number[] {
  const rand = mulberry32(seed);
  return Array.from({ length }, () => rand());
}
