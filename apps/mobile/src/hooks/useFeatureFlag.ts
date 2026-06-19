/** Emotional Context: EMPOWERMENT */
const flags = {
  styleExchangeEnabled: true,
  wardrobeGapAnalysisEnabled: true,
} as const;

export function useFeatureFlag(flag: keyof typeof flags) {
  return flags[flag];
}
