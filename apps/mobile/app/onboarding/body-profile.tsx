/** Emotional Context: BELONGING */
import { SafeAreaView, Text, StyleSheet, View } from 'react-native';
import { GoldProgress } from '@/components/ui/GoldProgress';

export default function BodyProfileStep() {
  return (
    <SafeAreaView style={styles.screen}>
      <GoldProgress progress={3 / 6} />
      <Text style={styles.title}>Tell us about your beautiful form</Text>
      <View style={styles.silhouetteRow}>
        <View style={styles.silhouette} />
        <View style={styles.silhouette} />
        <View style={styles.silhouette} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({ screen: { flex: 1, backgroundColor: '#0B0B0B', padding: 20, gap: 20 }, title: { color: '#F5F5F5', fontSize: 28, lineHeight: 36 }, silhouetteRow: { flexDirection: 'row', justifyContent: 'space-between' }, silhouette: { width: '30%', height: 220, borderRadius: 9999, borderWidth: 1, borderColor: 'rgba(212,175,55,0.3)', backgroundColor: '#141414' } });
