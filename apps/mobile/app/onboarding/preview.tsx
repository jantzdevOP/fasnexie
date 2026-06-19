/** Emotional Context: PRIDE */
import { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { BrandButton } from '@/components/ui/BrandButton';
import { GoldParticles } from '@/components/ui/GoldParticles';
import { GoldProgress } from '@/components/ui/GoldProgress';

export default function PreviewStep() {
  const [confetti, setConfetti] = useState(true);
  return (
    <SafeAreaView style={styles.screen}>
      <GoldProgress progress={1} />
      <GoldParticles visible={confetti} />
      <View style={styles.card}>
        <Text style={styles.name}>Arielle's Style DNA</Text>
        <Text style={styles.desc}>Heritage-forward modern elegance with ceremonial confidence.</Text>
      </View>
      <BrandButton label="Enter Your Universe" variant="ceremonial" onPress={() => setConfetti(false)} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({ screen: { flex: 1, backgroundColor: '#0B0B0B', padding: 20, justifyContent: 'center', gap: 16 }, card: { backgroundColor: '#141414', borderRadius: 12, borderWidth: 1, borderColor: 'rgba(212,175,55,0.3)', padding: 20 }, name: { color: '#D4AF37', fontSize: 28, lineHeight: 36 }, desc: { color: '#F5F5F5', marginTop: 10 } });
