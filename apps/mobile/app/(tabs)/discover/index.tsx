/** Emotional Context: DISCOVERY */
import { SafeAreaView, Text, StyleSheet } from 'react-native';
import { BrandCard } from '@/components/ui/BrandCard';

export default function DiscoverScreen() {
  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.title}>Cultural Explorer</Text>
      <BrandCard>
        <Text style={styles.body}>Curiosity-rewarded stories from creators, stylists, and heritage ateliers.</Text>
      </BrandCard>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({ screen: { flex: 1, backgroundColor: '#0B0B0B', padding: 20, gap: 16 }, title: { color: '#D4AF37', fontSize: 36 }, body: { color: '#F5F5F5' } });
