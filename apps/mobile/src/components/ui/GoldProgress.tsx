/** Emotional Context: EMPOWERMENT */
import { View, Animated, StyleSheet } from 'react-native';
import { useEffect, useRef } from 'react';

export function GoldProgress({ progress, loading = false }: { progress?: number; loading?: boolean }) {
  const weave = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!loading) return;
    Animated.loop(Animated.timing(weave, { toValue: 1, duration: 1200, useNativeDriver: false })).start();
  }, [loading, weave]);

  const width = loading ? weave.interpolate({ inputRange: [0, 1], outputRange: ['20%', '100%'] }) : `${Math.max(0, Math.min(100, (progress ?? 0) * 100))}%`;

  return (
    <View style={styles.track}>
      <Animated.View style={[styles.thread, { width }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: { height: 2, backgroundColor: 'rgba(212,175,55,0.12)', overflow: 'hidden' },
  thread: { height: 2, backgroundColor: '#D4AF37' },
});
