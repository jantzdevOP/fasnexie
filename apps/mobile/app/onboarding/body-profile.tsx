/** Emotional Context: BELONGING */
import { SafeAreaView, Text, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import { GoldProgress } from '@/components/ui/GoldProgress';
import { BrandButton } from '@/components/ui/BrandButton';
import { useHaptics } from '@/hooks/useHaptics';

export default function BodyProfileStep() {
  const { trigger } = useHaptics();
  return (
    <SafeAreaView style={styles.screen}>
      <GoldProgress progress={3 / 6} />
      <Text style={styles.title}>Tell us about your beautiful form</Text>
      <View style={styles.silhouetteRow}>
        <View style={styles.silhouette} />
        <View style={styles.silhouette} />
        <View style={styles.silhouette} />
      </View>
      <View style={styles.descriptors}>
        <Text style={styles.descriptor}>Powerful shoulders</Text>
        <Text style={styles.descriptor}>Graceful proportions</Text>
        <Text style={styles.descriptor}>Confident silhouette</Text>
      </View>
      <View style={styles.actions}>
        <BrandButton label="Back" variant="ghost" onPress={() => router.back()} />
        <BrandButton
          label="Continue"
          variant="ceremonial"
          onPress={() => {
            trigger('confirmation').catch(() => undefined);
            router.push('/onboarding/lifestyle');
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({ screen: { flex: 1, backgroundColor: '#0B0B0B', padding: 20, gap: 20 }, title: { color: '#F5F5F5', fontSize: 28, lineHeight: 36 }, silhouetteRow: { flexDirection: 'row', justifyContent: 'space-between' }, silhouette: { width: '30%', height: 220, borderRadius: 9999, borderWidth: 1, borderColor: 'rgba(212,175,55,0.3)', backgroundColor: '#141414' }, descriptors: { gap: 6 }, descriptor: { color: '#E8DCCB' }, actions: { flexDirection: 'row', justifyContent: 'space-between', gap: 8 } });
