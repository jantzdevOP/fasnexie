/** Emotional Context: EMPOWERMENT */
import { View, Animated, StyleSheet } from 'react-native';
import { useEffect, useMemo, useRef } from 'react';

export function GoldProgress({ progress, loading = false }: { progress?: number; loading?: boolean }) {
  const weave = useRef(new Animated.Value(loading ? 0.2 : Math.max(0, Math.min(1, progress ?? 0)))).current;

  useEffect(() => {
    if (loading) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(weave, { toValue: 1, duration: 900, useNativeDriver: true }),
          Animated.timing(weave, { toValue: 0.2, duration: 300, useNativeDriver: true }),
        ]),
      ).start();
      return;
    }

    Animated.timing(weave, {
      toValue: Math.max(0, Math.min(1, progress ?? 0)),
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [loading, progress, weave]);

  const animatedStyle = useMemo(
    () => ({
      transform: [{ scaleX: weave }],
    }),
    [weave],
  );

  return (
    <View style={styles.track}>
      <Animated.View style={[styles.thread, animatedStyle]} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: { height: 2, backgroundColor: 'rgba(212,175,55,0.12)', overflow: 'hidden' },
  thread: { height: 2, width: '100%', backgroundColor: '#D4AF37' },
});
