/** Emotional Context: ASPIRATION */
import { Pressable, View, Animated, StyleSheet } from 'react-native';
import { useEffect, useMemo, useRef } from 'react';
import { useHaptics } from '@/hooks/useHaptics';
import { colors } from '@/lib/theme/colors';

const PARTICLE_COUNT = 12;

type Props = {
  favourited?: boolean;
  onToggle?: (next: boolean) => void;
  size?: number;
};

/**
 * Gold-burst favourite control.
 * Particles + heart scale on like; soft scale on unlike.
 */
export function GoldBurstLike({
  favourited = false,
  onToggle,
  size = 44,
}: Props) {
  const scale = useRef(new Animated.Value(favourited ? 1 : 0)).current;
  const heartScale = useRef(new Animated.Value(favourited ? 1 : 0.85)).current;
  const { trigger } = useHaptics();

  const particles = useMemo(
    () =>
      Array.from({ length: PARTICLE_COUNT }, (_, index) => ({
        index,
        angle: (Math.PI * 2 * index) / PARTICLE_COUNT,
      })),
    [],
  );

  useEffect(() => {
    if (favourited) {
      scale.setValue(0);
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.25,
          duration: 280,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 180,
          useNativeDriver: true,
        }),
      ]).start();
      Animated.spring(heartScale, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(heartScale, {
        toValue: 0.85,
        duration: 150,
        useNativeDriver: true,
      }).start();
      scale.setValue(0);
    }
  }, [favourited, scale, heartScale]);

  const handlePress = async () => {
    const next = !favourited;
    if (next) {
      await trigger('like').catch(() => undefined);
    } else {
      await trigger('action').catch(() => undefined);
    }
    onToggle?.(next);
  };

  const center = size / 2;
  const radius = size * 0.32;

  return (
    <Pressable
      onPress={handlePress}
      accessibilityLabel={favourited ? 'Remove favourite' : 'Favourite'}
      accessibilityRole="button"
      style={[styles.wrap, { width: size, height: size }]}
      hitSlop={8}
    >
      <Animated.View
        style={[
          styles.particleLayer,
          { width: size, height: size, transform: [{ scale }] },
        ]}
        pointerEvents="none"
      >
        {particles.map(({ index, angle }) => (
          <View
            key={index}
            style={[
              styles.particle,
              index % 2 ? styles.diamond : styles.triangle,
              {
                left: center - 4 + Math.cos(angle) * radius,
                top: center - 4 + Math.sin(angle) * radius,
              },
            ]}
          />
        ))}
      </Animated.View>

      <Animated.View
        style={[
          styles.heart,
          {
            transform: [{ rotate: '-45deg' }, { scale: heartScale }],
            backgroundColor: favourited
              ? colors.accentGold
              : 'rgba(245,245,245,0.25)',
          },
        ]}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  particleLayer: {
    position: 'absolute',
  },
  particle: {
    position: 'absolute',
  },
  diamond: {
    width: 7,
    height: 7,
    backgroundColor: colors.accentGold,
    transform: [{ rotate: '45deg' }],
  },
  triangle: {
    width: 0,
    height: 0,
    borderLeftWidth: 3.5,
    borderRightWidth: 3.5,
    borderBottomWidth: 7,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: colors.accentGold,
  },
  heart: {
    width: 16,
    height: 16,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
});