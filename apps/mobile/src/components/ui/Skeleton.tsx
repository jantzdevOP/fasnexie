/** Emotional Context: DISCOVERY — gold-thread skeleton loading */
import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View, type ViewStyle } from 'react-native';
import { colors } from '@/lib/theme/colors';

type SkeletonProps = {
  width?: number | `${number}%` | '100%';
  height?: number;
  borderRadius?: number;
  style?: ViewStyle;
};

/**
 * Single bone with a soft gold shimmer — matches Brand Experience
 * “gallery on black” and gold sensory identity.
 */
export function Skeleton({
  width = '100%',
  height = 14,
  borderRadius = 6,
  style,
}: SkeletonProps) {
  const opacity = useRef(new Animated.Value(0.35)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.75,
          duration: 750,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 750,
          useNativeDriver: true,
        }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [opacity]);

  return (
    <Animated.View
      style={[
        styles.bone,
        {
          width: width as number | `${number}%`,
          height,
          borderRadius,
          opacity,
        },
        style,
      ]}
    />
  );
}

/** Feed card placeholder — same proportions as FeedCard */
export function FeedCardSkeleton() {
  return (
    <View style={styles.card}>
      <Skeleton height={168} borderRadius={0} />
      <View style={styles.cardBody}>
        <Skeleton width="40%" height={10} />
        <Skeleton width="88%" height={18} style={{ marginTop: 8 }} />
        <Skeleton width="72%" height={18} style={{ marginTop: 6 }} />
        <Skeleton width="100%" height={12} style={{ marginTop: 10 }} />
        <Skeleton width="92%" height={12} style={{ marginTop: 6 }} />
        <View style={styles.tagRow}>
          <Skeleton width={56} height={22} borderRadius={4} />
          <Skeleton width={48} height={22} borderRadius={4} />
          <Skeleton width={64} height={22} borderRadius={4} />
        </View>
      </View>
    </View>
  );
}

export function FeedListSkeleton({ count = 3 }: { count?: number }) {
  return (
    <View style={styles.list}>
      {Array.from({ length: count }).map((_, i) => (
        <FeedCardSkeleton key={i} />
      ))}
    </View>
  );
}

/** Home marketing hero + category row placeholders */
export function HomeHeroSkeleton() {
  return (
    <View style={styles.homeSkel}>
      <Skeleton width="70%" height={28} borderRadius={4} />
      <Skeleton width="55%" height={28} borderRadius={4} style={{ marginTop: 8 }} />
      <Skeleton width="90%" height={12} style={{ marginTop: 14 }} />
      <Skeleton width="80%" height={12} style={{ marginTop: 6 }} />
      <View style={styles.ctaRow}>
        <Skeleton width={120} height={42} borderRadius={999} />
        <Skeleton width={120} height={42} borderRadius={999} />
      </View>
      <Skeleton height={180} borderRadius={14} style={{ marginTop: 16 }} />
      <View style={styles.catRow}>
        {[1, 2, 3].map((i) => (
          <View key={i} style={styles.catCard}>
            <Skeleton height={120} borderRadius={0} />
            <View style={{ padding: 8, gap: 6 }}>
              <Skeleton width="70%" height={12} />
              <Skeleton width="50%" height={10} />
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bone: {
    backgroundColor: 'rgba(212, 175, 55, 0.12)',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(212, 175, 55, 0.18)',
  },
  card: {
    backgroundColor: colors.surfaceCard,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    overflow: 'hidden',
  },
  cardBody: {
    padding: 14,
  },
  tagRow: {
    flexDirection: 'row',
    gap: 6,
    marginTop: 12,
  },
  list: {
    gap: 14,
    paddingBottom: 24,
  },
  homeSkel: {
    paddingTop: 8,
  },
  ctaRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 16,
  },
  catRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 20,
  },
  catCard: {
    width: 120,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    backgroundColor: colors.surfaceCard,
  },
});