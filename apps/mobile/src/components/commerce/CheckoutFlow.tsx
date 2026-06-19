/** Emotional Context: ASPIRATION */
import { View, Text, StyleSheet } from 'react-native';
import { GoldProgress } from '@/components/ui/GoldProgress';

export function CheckoutFlow({ step }: { step: number }) {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Ceremonial Checkout</Text>
      <GoldProgress progress={step / 3} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: 8, backgroundColor: '#141414', borderRadius: 12, padding: 16 },
  heading: { color: '#D4AF37', fontSize: 22 },
});
