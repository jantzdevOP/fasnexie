/** Emotional Context: BELONGING */
import { Stack } from 'expo-router';
import { StatusBar } from 'react-native';

export default function RootLayout() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#0B0B0B" />
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#0B0B0B' } }} />
    </>
  );
}
