/** Emotional Context: ASPIRATION */
import { Text, View, StyleSheet } from 'react-native';

export function GapAnalysis() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Opportunity Cards</Text>
      <Text style={styles.body}>A structured blazer set can unlock 12 new looks from your current treasury.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#141414', borderRadius: 12, borderWidth: 1, borderColor: 'rgba(212,175,55,0.3)', padding: 16 },
  heading: { color: '#D4AF37', fontSize: 22, lineHeight: 30 },
  body: { color: 'rgba(245,245,245,0.7)', marginTop: 8 },
});
