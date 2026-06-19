/** Emotional Context: ASPIRATION */
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import { ProductCard } from '@/components/commerce/ProductCard';

export default function ShopScreen() {
  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.title}>Curated Marketplace</Text>
      <ProductCard name="Handwoven Prestige Set" price={420} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({ screen: { flex: 1, backgroundColor: '#0B0B0B', padding: 20, gap: 16 }, title: { color: '#D4AF37', fontSize: 36 } });
