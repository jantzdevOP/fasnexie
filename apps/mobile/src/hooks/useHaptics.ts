/** Emotional Context: EMPOWERMENT */
import { useCallback } from 'react';
import { hapticPatterns, type HapticPatternName } from '@/lib/haptics';

/**
 * Brand-aligned haptics. Never throws — safe on web / missing hardware.
 */
export function useHaptics() {
  const trigger = useCallback(async (pattern: HapticPatternName) => {
    try {
      const fn = hapticPatterns[pattern];
      if (fn) await fn();
    } catch {
      // no-op
    }
  }, []);

  return { trigger };
}