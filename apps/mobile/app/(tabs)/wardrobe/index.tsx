/** Emotional Context: PRIDE */
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { GarmentCard } from '@/components/wardrobe/GarmentCard';
import { GapAnalysis } from '@/components/wardrobe/GapAnalysis';
import { EmptyState } from '@/components/ui/EmptyState';

export default function WardrobeScreen() {
  const items = ['Ankara Blazer', 'Aso Oke Trousers', 'Beaded Kaftan'];
  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.title}>Your Treasury</Text>
      <View style={styles.stats}><Text style={styles.stat}>Pieces 32</Text><Text style={styles.stat}>Outfits 18</Text><Text style={styles.stat}>Utilization 74%</Text></View>
      <View style={styles.grid}>{items.map((item) => <GarmentCard key={item} name={item} />)}</View>
      <GapAnalysis />
      <EmptyState title="Your Treasury Awaits" subtitle="Collect pieces you love and turn them into expressive looks." cta="Add Item" onPress={() => undefined} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({ screen: { flex: 1, backgroundColor: '#0D0D0D', padding: 20, gap: 16 }, title: { color: '#D4AF37', fontSize: 28, lineHeight: 36 }, stats: { flexDirection: 'row', justifyContent: 'space-between' }, stat: { color: '#F5F5F5' }, grid: { gap: 12 } });
