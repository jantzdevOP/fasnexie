/** Emotional Context: ASPIRATION */
import { useMemo } from 'react';

export const soundIdentity = {
  launchChime: { key: 'launch-chime', mood: 'Kora/Mbira with modern digital reverb' },
  goldBurst: { key: 'gold-burst', mood: 'Celebration chime' },
  nexieThinking: { key: 'nexie-thinking', mood: 'Gentle rotating pulse' },
  nexieResponse: { key: 'nexie-response', mood: 'Warm affirmative tone' },
  wardrobeOpen: { key: 'wardrobe-open', mood: 'Subtle fabric rustle and hanger touch' },
  checkoutComplete: { key: 'checkout-complete', mood: 'Triumphant but elegant' },
  exchangeBuy: { key: 'exchange-buy', mood: 'Clear resonant tone' },
  tierUpgrade: { key: 'tier-upgrade', mood: 'Gold confetti sound equivalent' },
} as const;

export function useSound() {
  return useMemo(() => ({
    play: async (name: keyof typeof soundIdentity) => soundIdentity[name],
  }), []);
}
