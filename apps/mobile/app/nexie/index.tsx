/** Emotional Context: BELONGING */
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { NexiGeometricForm } from '@/components/ui/NexiGeometricForm';
import { NexiChat } from '@/components/nexie/NexiChat';

export default function NexieScreen() {
  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.header}>
        <NexiGeometricForm size="small" pulse />
        <Text style={styles.name}>Nexi</Text>
        <Text style={styles.status}>Your personal stylist</Text>
      </View>
      <NexiChat />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({ screen: { flex: 1, backgroundColor: '#0B0B0B', padding: 20, gap: 16 }, header: { flexDirection: 'row', alignItems: 'center', gap: 8 }, name: { color: '#D4AF37', fontSize: 22 }, status: { color: 'rgba(245,245,245,0.7)' } });
