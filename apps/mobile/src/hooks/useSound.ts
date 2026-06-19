/** Emotional Context: ASPIRATION */
import { Audio, type AVPlaybackStatus } from 'expo-av';
import { useMemo } from 'react';

export const soundIdentity = {
  launchChime: { key: 'launch-chime', mood: 'Kora/Mbira with modern digital reverb', uri: 'https://example.com/sounds/launch-chime.mp3' },
  goldBurst: { key: 'gold-burst', mood: 'Celebration chime', uri: 'https://example.com/sounds/gold-burst.mp3' },
  nexieThinking: { key: 'nexie-thinking', mood: 'Gentle rotating pulse', uri: 'https://example.com/sounds/nexie-thinking.mp3' },
  nexieResponse: { key: 'nexie-response', mood: 'Warm affirmative tone', uri: 'https://example.com/sounds/nexie-response.mp3' },
  wardrobeOpen: { key: 'wardrobe-open', mood: 'Subtle fabric rustle and hanger touch', uri: 'https://example.com/sounds/wardrobe-open.mp3' },
  checkoutComplete: { key: 'checkout-complete', mood: 'Triumphant but elegant', uri: 'https://example.com/sounds/checkout-complete.mp3' },
  exchangeBuy: { key: 'exchange-buy', mood: 'Clear resonant tone', uri: 'https://example.com/sounds/exchange-buy.mp3' },
  tierUpgrade: { key: 'tier-upgrade', mood: 'Gold confetti sound equivalent', uri: 'https://example.com/sounds/tier-upgrade.mp3' },
} as const;

function waitForPlaybackFinish(sound: Audio.Sound): Promise<void> {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      sound.setOnPlaybackStatusUpdate(null);
      reject(new Error('Sound playback timeout'));
    }, 10_000);

    sound.setOnPlaybackStatusUpdate((status: AVPlaybackStatus) => {
      if (!status.isLoaded) {
        if (status.error) {
          clearTimeout(timeoutId);
          sound.setOnPlaybackStatusUpdate(null);
          reject(new Error(status.error));
        }
        return;
      }

      if (status.didJustFinish) {
        clearTimeout(timeoutId);
        sound.setOnPlaybackStatusUpdate(null);
        resolve();
      }
    });
  });
}

export function useSound() {
  return useMemo(
    () => ({
      play: async (name: keyof typeof soundIdentity) => {
        const selected = soundIdentity[name];
        const { sound } = await Audio.Sound.createAsync({ uri: selected.uri });
        try {
          await sound.playAsync();
          await waitForPlaybackFinish(sound);
          return selected;
        } finally {
          await sound.unloadAsync();
        }
      },
    }),
    [],
  );
}
