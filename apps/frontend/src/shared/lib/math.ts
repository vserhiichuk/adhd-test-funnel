export const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

export const lerp = (from: number, to: number, progress: number) => from + (to - from) * progress;

export const easeOutCubic = (progress: number) => 1 - (1 - progress) ** 3;

/** Deterministic pseudo-random numbers in [0, 1) (mulberry32), so generated visuals never change. */
export function seededRandom(seed: number): () => number {
  let state = seed;
  return () => {
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
