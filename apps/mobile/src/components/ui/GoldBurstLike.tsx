/** Emotional Context: ASPIRATION */
import { Pressable, View, Animated, StyleSheet } from 'react-native';
import { useMemo, useRef } from 'react';
import { useHaptics } from '@/hooks/useHaptics';

const PARTICLE_COUNT = 12;

export function GoldBurstLike() {
  const scale = useRef(new Animated.Value(0)).current;
  const heartScale = useRef(new Animated.Value(0)).current;
  const { trigger } = useHaptics();
  const particles = useMemo(
    () => Array.from({ length: PARTICLE_COUNT }, (_, index) => ({ index, angle: (Math.PI * 2 * index) / PARTICLE_COUNT })),
    [],
  );

  const run = async () => {
    await trigger('like');
    scale.setValue(0);
    heartScale.setValue(0);
    Animated.sequence([
      Animated.timing(scale, { toValue: 1.3, duration: 300, useNativeDriver: true }),
      Animated.timing(scale, { toValue: 1, duration: 200, useNativeDriver: true }),
    ]).start();
    setTimeout(() => Animated.spring(heartScale, { toValue: 1, useNativeDriver: true }).start(), 300);
  };

  return (
    <Pressable onPress={run} accessibilityLabel="Gold burst like" style={styles.wrap}>
      <Animated.View style={{ transform: [{ scale }] }}>
        {particles.map(({ index, angle }) => (
          <View
            key={index}
            style={[
              styles.particle,
              index % 2 ? styles.diamond : styles.triangle,
              {
                left: 26 + Math.cos(angle) * 18,
                top: 26 + Math.sin(angle) * 18,
              },
            ]}
          />
        ))}
      </Animated.View>
      <Animated.View style={[styles.heart, { transform: [{ rotate: '-45deg' }, { scale: heartScale }] }]} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: { width: 52, height: 52, alignItems: 'center', justifyContent: 'center' },
  particle: { position: 'absolute' },
  diamond: { width: 8, height: 8, backgroundColor: '#D4AF37', transform: [{ rotate: '45deg' }] },
  triangle: {
    width: 0,
    height: 0,
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderBottomWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#D4AF37',
  },
  heart: { position: 'absolute', width: 20, height: 20, backgroundColor: '#D4AF37', borderTopLeftRadius: 10, borderTopRightRadius: 10 },
});
