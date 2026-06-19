import * as Haptics from 'expo-haptics';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const hapticPatterns = {
  welcome: async () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light),
  confirmation: async () => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success),
  curiosity: async () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium),
  action: async () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium),
  like: async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    await sleep(50);
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  },
  purchase: async () => {
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    await sleep(150);
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  },
  milestone: async () => {
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    await sleep(200);
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    await sleep(200);
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  },
  investment: async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    await sleep(200);
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  },
  wardrobeOpen: async () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft),
  nexieThinking: async () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light),
  nexieResponse: async () => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success),
  error: async () => {
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    await sleep(120);
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    await sleep(120);
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
  },
};

export type HapticPatternName = keyof typeof hapticPatterns;
