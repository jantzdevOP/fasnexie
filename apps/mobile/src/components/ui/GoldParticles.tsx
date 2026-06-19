/** Emotional Context: PRIDE */
import { View, Animated, StyleSheet } from 'react-native';
import { useEffect, useMemo, useRef } from 'react';

export function GoldParticles({ visible }: { visible: boolean }) {
  const opacity = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (!visible) return;
    opacity.setValue(1);
    Animated.timing(opacity, { toValue: 0, duration: 2000, useNativeDriver: true }).start();
  }, [visible, opacity]);

  const particles = useMemo(() => Array.from({ length: 36 }).map((_, i) => i), []);

  if (!visible) return null;
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {particles.map((id) => (
        <Animated.View key={id} style={[styles.particle, { left: `${(id * 13) % 100}%`, top: `${(id * 17) % 100}%`, opacity }]} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  particle: { position: 'absolute', width: 8, height: 8, backgroundColor: '#D4AF37', borderRadius: 2, transform: [{ rotate: '45deg' }] },
});
