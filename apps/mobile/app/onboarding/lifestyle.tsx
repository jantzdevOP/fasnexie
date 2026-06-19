/** Emotional Context: BELONGING */
import { Pressable, SafeAreaView, Text, StyleSheet, View } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';
import { GoldProgress } from '@/components/ui/GoldProgress';
import { BrandButton } from '@/components/ui/BrandButton';
import { useHaptics } from '@/hooks/useHaptics';

const occasions = ['Work', 'Social', 'Religious', 'Cultural Events', 'Weddings', 'Casual', 'Owambe', 'Harambee'];

export default function LifestyleStep() {
  const [selected, setSelected] = useState<string[]>([]);
  const { trigger } = useHaptics();
  return (
    <SafeAreaView style={styles.screen}>
      <GoldProgress progress={4 / 6} />
      <Text style={styles.title}>Where does your style show up?</Text>
      <View style={styles.grid}>
        {occasions.map((item) => (
          <Pressable key={item} style={[styles.card, selected.includes(item) && styles.selected]} onPress={() => setSelected((prev) => (prev.includes(item) ? prev.filter((value) => value !== item) : [...prev, item]))}>
            <Text style={styles.cardText}>{item}</Text>
          </Pressable>
        ))}
      </View>
      <View style={styles.actions}>
        <BrandButton label="Back" variant="ghost" onPress={() => router.back()} />
        <BrandButton
          label="Continue"
          variant="ceremonial"
          onPress={() => {
            trigger('confirmation').catch(() => undefined);
            router.push('/onboarding/wardrobe-snapshot');
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({ screen: { flex: 1, backgroundColor: '#0B0B0B', padding: 20, gap: 16 }, title: { color: '#F5F5F5', fontSize: 28, lineHeight: 36 }, grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 }, card: { width: '47%', minHeight: 80, backgroundColor: '#141414', borderRadius: 8, borderColor: 'rgba(212,175,55,0.3)', borderWidth: 1, justifyContent: 'center', paddingHorizontal: 12 }, selected: { shadowColor: '#D4AF37', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 8 }, cardText: { color: '#F5F5F5' }, actions: { marginTop: 'auto', flexDirection: 'row', justifyContent: 'space-between', gap: 8 } });
