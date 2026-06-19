/** Emotional Context: DISCOVERY */
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import { FeedList } from '@/components/feed/FeedList';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.title}>Your Cultural Feed</Text>
      <FeedList />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({ screen: { flex: 1, backgroundColor: '#0B0B0B', padding: 20, gap: 16 }, title: { color: '#D4AF37', fontSize: 36, lineHeight: 44 } });
