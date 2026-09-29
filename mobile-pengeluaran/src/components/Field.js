// src/components/Field.js
// Themed text input dengan label, error state, focus ring

import { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

export default function Field({ label, value, onChangeText, placeholder, editable = true, error, helperText, ...props }) {
  const { colors, spacing, radius, typography } = useTheme();
  const [focused, setFocused] = useState(false);

  const borderColor = error ? colors.error
    : focused ? colors.borderFocus
    : colors.border;

  return (
    <View style={{ marginBottom: spacing[4] }}>
      <Text
        style={[s.label, {
          color: colors.onSurface,
          fontSize: typography.fontSize.sm,
          fontWeight: typography.fontWeight.medium,
          marginBottom: spacing[2],
          marginTop: spacing[3],
        }]}
      >
        {label}
      </Text>

      <TextInput
        accessibilityLabel={label}
        accessibilityState={{ disabled: !editable }}
        accessibilityHint={error || helperText}
        style={[s.input, {
          borderColor,
          borderWidth: focused ? 2 : 1,
          backgroundColor: editable ? colors.surface : colors.muted,
          color: editable ? colors.onSurface : colors.mutedForeground,
          borderRadius: radius.md,
          paddingVertical: spacing[3],
          paddingHorizontal: spacing[4],
          fontSize: typography.fontSize.base,
          minHeight: 48,
        }]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.mutedForeground}
        editable={editable}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        {...props}
      />

      {error ? (
        <Text style={[s.error, {
          color: colors.error,
          fontSize: typography.fontSize.sm,
          marginTop: spacing[1],
        }]}>
          {error}
        </Text>
      ) : helperText ? (
        <Text style={[s.helper, {
          color: colors.mutedForeground,
          fontSize: typography.fontSize.sm,
          marginTop: spacing[1],
        }]}>
          {helperText}
        </Text>
      ) : null}
    </View>
  );
}

const s = StyleSheet.create({
  label: {},
  input: {},
  error: {},
  helper: {},
});