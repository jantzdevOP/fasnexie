/** Emotional Context: ASPIRATION */
import { Text, View, StyleSheet } from 'react-native';
import { BrandButton } from './BrandButton';

export function EmptyState({ title, subtitle, cta, onPress }: { title: string; subtitle: string; cta: string; onPress: () => void }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
      <BrandButton label={cta} variant="secondary" onPress={onPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 24, borderRadius: 12, backgroundColor: '#141414', gap: 12 },
  title: { color: '#D4AF37', fontSize: 28, lineHeight: 36, fontFamily: 'PlayfairDisplay' },
  subtitle: { color: 'rgba(245,245,245,0.7)', fontSize: 16, lineHeight: 24 },
});
