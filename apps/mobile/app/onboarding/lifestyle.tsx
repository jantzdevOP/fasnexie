/** Emotional Context: BELONGING */
import { SafeAreaView, Text, StyleSheet, View } from 'react-native';
import { GoldProgress } from '@/components/ui/GoldProgress';

const occasions = ['Work', 'Social', 'Religious', 'Cultural Events', 'Weddings', 'Casual', 'Owambe', 'Harambee'];

export default function LifestyleStep() {
  return (
    <SafeAreaView style={styles.screen}>
      <GoldProgress progress={4 / 6} />
      <Text style={styles.title}>Where does your style show up?</Text>
      <View style={styles.grid}>{occasions.map((item) => <View key={item} style={styles.card}><Text style={styles.cardText}>{item}</Text></View>)}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({ screen: { flex: 1, backgroundColor: '#0B0B0B', padding: 20, gap: 16 }, title: { color: '#F5F5F5', fontSize: 28, lineHeight: 36 }, grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 }, card: { width: '47%', minHeight: 80, backgroundColor: '#141414', borderRadius: 8, borderColor: 'rgba(212,175,55,0.3)', borderWidth: 1, justifyContent: 'center', paddingHorizontal: 12 }, cardText: { color: '#F5F5F5' } });
