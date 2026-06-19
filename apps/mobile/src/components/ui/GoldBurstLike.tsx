/** Emotional Context: ASPIRATION */
import { Pressable, View, Animated, StyleSheet } from 'react-native';
import { useRef } from 'react';
import { useHaptics } from '@/hooks/useHaptics';

export function GoldBurstLike() {
  const scale = useRef(new Animated.Value(0)).current;
  const heart = useRef(new Animated.Value(0)).current;
  const { trigger } = useHaptics();

  const run = async () => {
    await trigger('like');
    scale.setValue(0);
    heart.setValue(0);
    Animated.timing(scale, { toValue: 1, duration: 500, useNativeDriver: true }).start();
    setTimeout(() => Animated.spring(heart, { toValue: 1, useNativeDriver: true }).start(), 300);
  };

  return (
    <Pressable onPress={run} accessibilityLabel="Gold burst like" style={styles.wrap}>
      <Animated.View style={{ transform: [{ scale: scale.interpolate({ inputRange: [0, 1], outputRange: [0, 1.3] }) }] }}>
        <View style={styles.burst} />
      </Animated.View>
      <Animated.View style={[styles.heart, { opacity: heart }]} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: { width: 52, height: 52, alignItems: 'center', justifyContent: 'center' },
  burst: { width: 28, height: 28, borderRadius: 6, borderWidth: 2, borderColor: '#D4AF37', transform: [{ rotate: '45deg' }] },
  heart: { position: 'absolute', width: 20, height: 20, backgroundColor: '#D4AF37', borderTopLeftRadius: 10, borderTopRightRadius: 10, transform: [{ rotate: '-45deg' }] },
});
