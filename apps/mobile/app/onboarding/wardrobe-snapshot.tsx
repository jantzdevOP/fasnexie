/** Emotional Context: EMPOWERMENT */
import { SafeAreaView, Text, View, StyleSheet } from 'react-native';
import { GoldProgress } from '@/components/ui/GoldProgress';
import { BrandButton } from '@/components/ui/BrandButton';

export default function WardrobeSnapshotStep() {
  return (
    <SafeAreaView style={styles.screen}>
      <GoldProgress progress={5 / 6} />
      <Text style={styles.title}>Show us three pieces you love. No judgment—just discovery.</Text>
      <View style={styles.viewfinder}>
        <View style={styles.corner} />
        <View style={[styles.corner, styles.topRight]} />
        <View style={[styles.corner, styles.bottomLeft]} />
        <View style={[styles.corner, styles.bottomRight]} />
      </View>
      <BrandButton label="Capture Piece" variant="secondary" onPress={() => undefined} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#0B0B0B',
    padding: 20,
    gap: 20,
  },
  title: {
    color: '#F5F5F5',
    fontSize: 18,
    lineHeight: 28,
  },
  viewfinder: {
    flex: 1,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(245,245,245,0.08)',
    position: 'relative',
  },
  corner: {
    position: 'absolute',
    width: 28,
    height: 28,
    borderColor: '#D4AF37',
    borderTopWidth: 3,
    borderLeftWidth: 3,
    left: 16,
    top: 16,
  },
  topRight: {
    right: 16,
    left: undefined,
    transform: [{ rotate: '90deg' }],
  },
  bottomLeft: {
    top: undefined,
    bottom: 16,
    transform: [{ rotate: '-90deg' }],
  },
  bottomRight: {
    right: 16,
    left: undefined,
    top: undefined,
    bottom: 16,
    transform: [{ rotate: '180deg' }],
  },
});
