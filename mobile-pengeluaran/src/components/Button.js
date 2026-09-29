// src/components/Button.js
// Themed Button component dengan design tokens

import { Pressable, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

export default function Tombol({ title, onPress, disabled = false, loading = false, variant = 'primary', size = 'md', fullWidth = true, ...props }) {
  const { colors, spacing, radius, typography, transitions } = useTheme();

  const isPrimary = variant === 'primary';
  const isSecondary = variant === 'secondary';
  const isOutline = variant === 'outline';
  const isDestructive = variant === 'destructive';

  const bgColor = isPrimary ? colors.primary
    : isSecondary ? colors.accent
    : isOutline ? 'transparent'
    : isDestructive ? colors.error
    : colors.primary;

  const textColor = isPrimary ? colors.onPrimary
    : isSecondary ? colors.onAccent
    : isOutline ? colors.primary
    : isDestructive ? colors.onError
    : colors.onPrimary;

  const borderColor = isOutline ? colors.primary : 'transparent';

  const paddingVertical = size === 'sm' ? spacing[2] : size === 'lg' ? spacing[4] : spacing[3];
  const paddingHorizontal = size === 'sm' ? spacing[3] : size === 'lg' ? spacing[6] : spacing[4];
  const fontSize = size === 'sm' ? typography.fontSize.sm : size === 'lg' ? typography.fontSize.lg : typography.fontSize.base;
  const minHeight = size === 'sm' ? 40 : size === 'lg' ? 56 : 48;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: disabled || loading }}
      disabled={disabled || loading}
      onPress={onPress}
      style={[
        s.button,
        {
          backgroundColor: bgColor,
          borderColor,
          borderWidth: isOutline ? 2 : 0,
          paddingVertical,
          paddingHorizontal,
          minHeight,
          borderRadius: radius.md,
          ...(fullWidth ? { width: '100%' } : {}),
        },
        (disabled || loading) && s.disabled,
      ]}
      android_ripple={isOutline ? { color: colors.primary + '33' } : { color: textColor + '33' }}
      {...props}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={textColor}
          style={s.spinner}
        />
      ) : (
        <Text style={[s.buttonText, { color: textColor, fontSize, fontWeight: typography.fontWeight.semibold }]}>
          {title}
        </Text>
      )}
    </Pressable>
  );
}

const s = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginVertical: 6,
  },
  buttonText: {
    textAlign: 'center',
  },
  disabled: {
    opacity: 0.5,
  },
  spinner: {
    marginHorizontal: 4,
  },
});