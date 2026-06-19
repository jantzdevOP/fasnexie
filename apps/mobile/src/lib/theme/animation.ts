export const animation = {
  easing: {
    signature: [0.25, 0.1, 0.25, 1] as const,
    celebration: [0.34, 1.56, 0.64, 1] as const,
  },
  durations: {
    instant: 100,
    fast: 200,
    normal: 300,
    slow: 500,
    ceremonial: 800,
  },
} as const;
