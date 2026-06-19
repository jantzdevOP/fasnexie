/** Emotional Context: BELONGING */
import { Tabs } from 'expo-router';
import { Text, Platform } from 'react-native';
import { BlurView } from 'expo-blur';
import { useHaptics } from '@/hooks/useHaptics';

const icons: Record<string, string> = {
  home: '◫',
  discover: '◉',
  wardrobe: '⌁',
  shop: '▦',
  profile: '◍',
};

const tabHaptics = {
  home: 'welcome',
  discover: 'curiosity',
  wardrobe: 'wardrobeOpen',
  shop: 'confirmation',
  profile: 'welcome',
} as const;

export default function TabsLayout() {
  const { trigger } = useHaptics();
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: { backgroundColor: 'rgba(11,11,11,0.95)', borderTopColor: 'rgba(245,245,245,0.08)' },
        tabBarBackground: () => (Platform.OS === 'ios' ? <BlurView intensity={35} tint="dark" style={{ flex: 1 }} /> : null),
        tabBarLabelStyle: { fontFamily: 'Inter-Medium', fontSize: 10, letterSpacing: 0.3 },
        tabBarActiveTintColor: '#D4AF37',
        tabBarInactiveTintColor: 'rgba(245,245,245,0.5)',
        tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 18 }}>{icons[route.name] ?? '◈'}</Text>,
      })}
      screenListeners={({ route }) => ({
        tabPress: () => {
          const key = route.name as keyof typeof tabHaptics;
          trigger(tabHaptics[key]).catch(() => undefined);
        },
      })}
    >
      <Tabs.Screen name="home/index" options={{ title: 'Home' }} />
      <Tabs.Screen name="discover/index" options={{ title: 'Discover' }} />
      <Tabs.Screen name="wardrobe/index" options={{ title: 'Wardrobe' }} />
      <Tabs.Screen name="shop/index" options={{ title: 'Shop' }} />
      <Tabs.Screen name="profile/index" options={{ title: 'Profile' }} />
    </Tabs>
  );
}
