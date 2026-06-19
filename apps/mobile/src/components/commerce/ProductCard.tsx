/** Emotional Context: ASPIRATION */
import { Text, View, StyleSheet } from 'react-native';
import { PriceDisplay } from './PriceDisplay';

export function ProductCard({ name, price }: { name: string; price: number }) {
  return (
    <View style={styles.card}>
      <View style={styles.media} />
      <Text style={styles.name}>{name}</Text>
      <PriceDisplay amount={price} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#1A1A1A', borderRadius: 8, padding: 16, borderWidth: 1, borderColor: 'rgba(245,245,245,0.08)' },
  media: { height: 140, borderRadius: 8, backgroundColor: '#141414' },
  name: { color: '#F5F5F5', marginVertical: 12, fontSize: 18 },
});
