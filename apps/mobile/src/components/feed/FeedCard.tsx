/** Emotional Context: DISCOVERY */
import { Text, View, StyleSheet } from 'react-native';
import { BrandCard } from '@/components/ui/BrandCard';

export function FeedCard({ title, summary }: { title: string; summary: string }) {
  return (
    <BrandCard>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.summary}>{summary}</Text>
    </BrandCard>
  );
}

const styles = StyleSheet.create({
  title: { color: '#F5F5F5', fontSize: 22, lineHeight: 30, fontFamily: 'PlayfairDisplay-Bold' },
  summary: { color: 'rgba(245,245,245,0.7)', marginTop: 8 },
});
