/** Emotional Context: EMPOWERMENT */
import { View, Animated, StyleSheet } from 'react-native';
import { useEffect, useRef } from 'react';

export function AITaggingAnimation() {
  const trace = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.loop(Animated.timing(trace, { toValue: 1, duration: 1000, useNativeDriver: false })).start();
  }, [trace]);
  return <Animated.View style={[styles.trace, { width: trace.interpolate({ inputRange: [0, 1], outputRange: ['10%', '100%'] }) }]} />;
}

const styles = StyleSheet.create({
  trace: { height: 2, backgroundColor: '#D4AF37' },
});
