/** Emotional Context: PRIDE */
export type EmotionalPillar = 'DISCOVERY' | 'PRIDE' | 'ASPIRATION' | 'BELONGING' | 'EMPOWERMENT';

export const emotionalPillars: EmotionalPillar[] = ['DISCOVERY', 'PRIDE', 'ASPIRATION', 'BELONGING', 'EMPOWERMENT'];

export function useEmotionalQA() {
  const assertPillar = (pillar: EmotionalPillar) => emotionalPillars.includes(pillar);
  return { assertPillar };
}
