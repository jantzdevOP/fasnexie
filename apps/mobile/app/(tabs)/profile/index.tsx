/** Emotional Context: BELONGING */
import { SafeAreaView, StyleSheet, Text } from 'react-native';

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.title}>Profile</Text>
      <Text style={styles.body}>Role-aware identity, creator pathways, and growth milestones.</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({ screen: { flex: 1, backgroundColor: '#0B0B0B', padding: 20, gap: 16 }, title: { color: '#D4AF37', fontSize: 36 }, body: { color: '#F5F5F5' } });
