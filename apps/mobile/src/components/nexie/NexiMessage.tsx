/** Emotional Context: BELONGING */
import { Text, View, StyleSheet } from 'react-native';

export function NexiMessage({ role, message }: { role: 'nexi' | 'user'; message: string }) {
  return (
    <View style={[styles.bubble, role === 'nexi' ? styles.nexi : styles.user]}>
      <Text style={[styles.text, role === 'nexi' ? styles.darkText : styles.lightText]}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  bubble: { borderRadius: 12, padding: 12, maxWidth: '90%' },
  nexi: { backgroundColor: '#E8DCCB', alignSelf: 'flex-start' },
  user: { backgroundColor: '#1A1A1A', borderColor: 'rgba(212,175,55,0.3)', borderWidth: 1, alignSelf: 'flex-end' },
  text: { fontSize: 16, lineHeight: 24 },
  darkText: { color: '#0B0B0B' },
  lightText: { color: '#F5F5F5' },
});
