/** Emotional Context: ASPIRATION */
import { Pressable, Text, type PressableProps, StyleSheet, Animated } from 'react-native';
import { useRef } from 'react';
import { useHaptics } from '@/hooks/useHaptics';

type Variant = 'primary' | 'secondary' | 'ghost' | 'ceremonial';
type Size = 'sm' | 'md' | 'lg';

type Props = PressableProps & {
  label: string;
  variant?: Variant;
  size?: Size;
};

const heights: Record<Size, number> = { sm: 40, md: 52, lg: 60 };

export function BrandButton({ label, variant = 'primary', size = 'md', disabled, onPressIn, onPressOut, ...props }: Props) {
  const scale = useRef(new Animated.Value(1)).current;
  const { trigger } = useHaptics();

  return (
    <Pressable
      accessibilityLabel={label}
      disabled={disabled}
      onPressIn={(event) => {
        trigger('action').catch(() => undefined);
        Animated.spring(scale, { toValue: 0.97, useNativeDriver: true }).start();
        onPressIn?.(event);
      }}
      onPressOut={(event) => {
        Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start();
        onPressOut?.(event);
      }}
      style={[styles.base, styles[variant], { height: heights[size] }, disabled && styles.disabled]}
      {...props}
    >
      <Animated.View style={{ transform: [{ scale }] }}>
        <Text style={[styles.text, variant === 'primary' || variant === 'ceremonial' ? styles.textDark : styles.textLight]}>{label}</Text>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: { borderRadius: 9999, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 24, borderWidth: 1, borderColor: 'transparent' },
  primary: { backgroundColor: '#D4AF37' },
  secondary: { backgroundColor: 'transparent', borderColor: 'rgba(212,175,55,0.3)' },
  ghost: { backgroundColor: 'transparent' },
  ceremonial: { backgroundColor: '#D4AF37', minHeight: 60, shadowColor: '#D4AF37', shadowOpacity: 0.25, shadowRadius: 12, shadowOffset: { width: 0, height: 0 } },
  text: { fontFamily: 'Inter-Medium', fontSize: 16 },
  textDark: { color: '#0B0B0B' },
  textLight: { color: '#F5F5F5' },
  disabled: { opacity: 0.4 },
});
