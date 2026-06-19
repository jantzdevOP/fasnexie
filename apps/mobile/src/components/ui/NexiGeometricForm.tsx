/** Emotional Context: DISCOVERY */
import { Animated, StyleSheet, View } from 'react-native';
import { useEffect, useRef } from 'react';

const sizes = { tiny: 16, small: 24, medium: 48, large: 80 } as const;

export function NexiGeometricForm({ size = 'medium', pulse = false, thinking = false }: { size?: keyof typeof sizes; pulse?: boolean; thinking?: boolean }) {
  const rotate = useRef(new Animated.Value(0)).current;
  const pulseValue = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (thinking) {
      Animated.loop(Animated.timing(rotate, { toValue: 1, duration: 1200, useNativeDriver: true })).start();
    }
  }, [thinking, rotate]);

  useEffect(() => {
    if (pulse) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseValue, { toValue: 1.05, duration: 500, useNativeDriver: true }),
          Animated.timing(pulseValue, { toValue: 1, duration: 500, useNativeDriver: true }),
        ]),
      ).start();
    }
  }, [pulse, pulseValue]);

  return (
    <Animated.View
      style={[
        styles.shape,
        {
          width: sizes[size],
          height: sizes[size],
          transform: [
            { scale: pulseValue },
            { rotate: rotate.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] }) },
          ],
        },
      ]}
    >
      <View style={styles.inner} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  shape: {
    borderWidth: 2,
    borderColor: '#D4AF37',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.9,
  },
  inner: { width: '40%', height: '40%', backgroundColor: '#D4AF37', transform: [{ rotate: '45deg' }] },
});
