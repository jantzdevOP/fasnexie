/** Emotional Context: DISCOVERY */
import { useEffect, useState } from 'react';
import { SafeAreaView, Text, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import { BrandButton } from '@/components/ui/BrandButton';
import { GoldProgress } from '@/components/ui/GoldProgress';

export default function WelcomeStep() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView style={styles.screen}>
      <GoldProgress progress={1 / 6} />
      <View style={styles.hero} />
      {show ? (
        <>
          <Text style={styles.title}>Your style has a story. Let's tell it.</Text>
          <BrandButton label="Begin" variant="ceremonial" onPress={() => router.push('/onboarding/archetype')} />
        </>
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({ screen: { flex: 1, backgroundColor: '#0B0B0B', padding: 20, gap: 20 }, hero: { flex: 1, borderRadius: 12, backgroundColor: '#0F0B06' }, title: { color: '#F5F5F5', fontSize: 48, lineHeight: 56, letterSpacing: -0.5 } });
