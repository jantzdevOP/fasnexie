/** Emotional Context: BELONGING */
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { BrandButton } from '@/components/ui/BrandButton';

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.title}>Profile</Text>
      <View style={styles.card}>
        <Text style={styles.name}>Arielle Okoye</Text>
        <Text style={styles.role}>Creator • Style Curator</Text>
        <Text style={styles.body}>Role-aware identity, creator pathways, and growth milestones.</Text>
      </View>
      <BrandButton label="Settings" variant="secondary" onPress={() => undefined} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#0B0B0B', padding: 20, gap: 16 },
  title: { color: '#D4AF37', fontSize: 36 },
  card: { backgroundColor: '#141414', borderRadius: 12, padding: 16, borderWidth: 1, borderColor: 'rgba(245,245,245,0.08)', gap: 6 },
  name: { color: '#F5F5F5', fontSize: 22, lineHeight: 30, fontFamily: 'PlayfairDisplay-Bold' },
  role: { color: '#D4AF37', fontSize: 12, lineHeight: 16, letterSpacing: 1.5, textTransform: 'uppercase' },
  body: { color: '#F5F5F5' },
});
