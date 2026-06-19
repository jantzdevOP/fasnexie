/** Emotional Context: PRIDE */
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { GarmentCard } from '@/components/wardrobe/GarmentCard';
import { GapAnalysis } from '@/components/wardrobe/GapAnalysis';
import { EmptyState } from '@/components/ui/EmptyState';
import { BrandButton } from '@/components/ui/BrandButton';
import { OutfitBuilder } from '@/components/wardrobe/OutfitBuilder';

export default function WardrobeScreen() {
  const items = ['Ankara Blazer', 'Aso Oke Trousers', 'Beaded Kaftan'];
  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.title}>Your Treasury</Text>
      <View style={styles.stats}><Text style={styles.stat}>Pieces 32</Text><Text style={styles.stat}>Outfits 18</Text><Text style={styles.stat}>Utilization 74%</Text></View>
      <View style={styles.actions}>
        <BrandButton label="Add Item" variant="secondary" size="sm" onPress={() => undefined} />
        <BrandButton label="Build Look" variant="primary" size="sm" onPress={() => undefined} />
      </View>
      <View style={styles.grid}>{items.map((item) => <GarmentCard key={item} name={item} />)}</View>
      <OutfitBuilder />
      <GapAnalysis />
      <EmptyState title="Your Treasury Awaits" subtitle="Collect pieces you love and turn them into expressive looks." cta="Add Item" onPress={() => undefined} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({ screen: { flex: 1, backgroundColor: '#0B0B0B', padding: 20, gap: 16 }, title: { color: '#D4AF37', fontSize: 28, lineHeight: 36 }, stats: { flexDirection: 'row', justifyContent: 'space-between' }, stat: { color: '#F5F5F5' }, actions: { flexDirection: 'row', gap: 8 }, grid: { gap: 12 } });
