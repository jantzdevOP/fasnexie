/** Emotional Context: PRIDE */
import { View, Animated, StyleSheet } from 'react-native';
import { useEffect, useMemo, useRef } from 'react';

export function GoldParticles({ visible }: { visible: boolean }) {
  const progress = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (!visible) return;
    progress.setValue(0);
    Animated.timing(progress, { toValue: 1, duration: 2000, useNativeDriver: true }).start();
  }, [visible, progress]);

  const particles = useMemo(
    () =>
      Array.from({ length: 40 }).map((_, id) => ({
        id,
        size: 4 + (id % 9),
        left: (id * 13) % 320,
        top: (id * 17) % 520,
        driftX: ((id % 6) - 3) * 6,
        driftY: ((id % 8) - 4) * 8,
        rotateEnd: `${180 + ((id * 37) % 180)}deg`,
      })),
    [],
  );

  if (!visible) return null;
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {particles.map((particle) => (
        <Animated.View
          key={particle.id}
          style={[
            styles.particle,
            {
              width: particle.size,
              height: particle.size,
              left: particle.left,
              top: particle.top,
              opacity: progress.interpolate({ inputRange: [0, 1], outputRange: [1, 0] }),
              transform: [
                { translateX: progress.interpolate({ inputRange: [0, 1], outputRange: [0, particle.driftX] }) },
                { translateY: progress.interpolate({ inputRange: [0, 1], outputRange: [0, particle.driftY] }) },
                { rotate: progress.interpolate({ inputRange: [0, 1], outputRange: ['0deg', particle.rotateEnd] }) },
              ],
            },
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  particle: { position: 'absolute', backgroundColor: '#D4AF37', borderRadius: 2 },
});
