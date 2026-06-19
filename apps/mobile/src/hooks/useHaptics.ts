/** Emotional Context: EMPOWERMENT */
import { useCallback } from 'react';
import { hapticPatterns, type HapticPatternName } from '@/lib/haptics';

export function useHaptics() {
  const trigger = useCallback(async (pattern: HapticPatternName) => {
    await hapticPatterns[pattern]();
  }, []);

  return { trigger };
}
