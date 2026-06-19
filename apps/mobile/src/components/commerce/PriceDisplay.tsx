/** Emotional Context: EMPOWERMENT */
import { Text, View, StyleSheet } from 'react-native';

export function PriceDisplay({ amount }: { amount: number }) {
  return (
    <View>
      <Text style={styles.price}>${amount.toFixed(2)}</Text>
      <Text style={styles.meta}>Fees and duties shown before payment.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  price: { color: '#D4AF37', fontSize: 24, lineHeight: 32, fontFamily: 'Inter-Medium' },
  meta: { color: 'rgba(245,245,245,0.7)', fontSize: 12 },
});
