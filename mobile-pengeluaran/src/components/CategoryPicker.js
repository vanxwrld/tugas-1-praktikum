// src/components/CategoryPicker.js
// Themed category selector — grid chips, accessible radio

import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

export default function CategoryPicker({ options, selected, onSelect, disabled }) {
  const { colors, spacing, radius, typography } = useTheme();

  return (
    <View accessibilityRole="radiogroup" style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing[2], marginBottom: spacing[4] }}>
      {options.map((k) => {
        const isSelected = selected === k.id;
        return (
          <Pressable
            key={String(k.id)}
            accessibilityRole="radio"
            accessibilityLabel={`Kategori ${k.nama}`}
            accessibilityState={{ checked: isSelected, disabled }}
            disabled={disabled}
            onPress={() => onSelect(k.id)}
            style={({ pressed }) => [
              s.chip,
              {
                backgroundColor: isSelected ? colors.primaryLight : colors.surface,
                borderColor: isSelected ? colors.primary : colors.border,
                borderWidth: isSelected ? 2 : 1,
                borderRadius: radius.full,
                paddingVertical: spacing[2],
                paddingHorizontal: spacing[4],
                minHeight: 44,
                opacity: pressed ? 0.85 : (disabled ? 0.5 : 1),
              },
            ]}
            android_ripple={{ color: colors.primary + '22' }}
          >
            {isSelected && (
              <View style={[s.check, { backgroundColor: colors.primary, borderRadius: radius.full }]}>
                <Text style={{ color: colors.onPrimary, fontSize: 10, fontWeight: '700' }}>✓</Text>
              </View>
            )}
            <Text
              style={{
                color: isSelected ? colors.primary : colors.onSurfaceVariant,
                fontSize: typography.fontSize.sm,
                fontWeight: isSelected ? typography.fontWeight.semibold : typography.fontWeight.medium,
              }}
            >
              {k.nama}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const s = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  check: {
    width: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
});