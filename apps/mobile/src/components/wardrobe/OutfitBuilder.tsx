/** Emotional Context: EMPOWERMENT */
import { Text, View, StyleSheet } from 'react-native';

export function OutfitBuilder() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Drag garments into your look canvas. Magnetic snap is enabled.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#141414', borderColor: 'rgba(212,175,55,0.3)', borderWidth: 1, borderRadius: 12, padding: 16 },
  text: { color: '#F5F5F5' },
});
