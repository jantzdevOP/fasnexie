/** Emotional Context: PRIDE */
import { Text, View, StyleSheet } from 'react-native';

export function GarmentCard({ name }: { name: string }) {
  return (
    <View style={styles.card}>
      <View style={styles.media} />
      <Text style={styles.name}>{name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#1A1A1A', borderRadius: 8, padding: 12, shadowColor: '#D4AF37', shadowOpacity: 0.08, shadowRadius: 8, shadowOffset: { width: 0, height: 2 } },
  media: { height: 120, borderRadius: 8, backgroundColor: '#141414', borderWidth: 1, borderColor: 'rgba(212,175,55,0.3)' },
  name: { color: '#F5F5F5', marginTop: 8 },
});
