// src/components/KartuPengeluaran.js
// Themed expense card dengan visual hierarchy yang jelas

import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { rupiah, tanggalLokal } from '../helpers';

// Kategori warna badge (light/dark auto-adjust via theme)
const KATEGORI_WARNA = {
  Makanan:    { bg: '#FEF3C7', fg: '#92400E' },
  Transport:  { bg: '#DBEAFE', fg: '#1E40AF' },
  Hiburan:    { bg: '#EDE9FE', fg: '#5B21B6' },
  Lainnya:    { bg: '#F1F5F9', fg: '#475569' },
};

export default function KartuPengeluaran({ item, onPress }) {
  const { colors, spacing, radius, typography, shadows, isDark } = useTheme();

  const badge = KATEGORI_WARNA[item.kategori] || KATEGORI_WARNA.Lainnya;
  const badgeBg = isDark ? colors.muted : badge.bg;
  const badgeFg = isDark ? colors.onSurfaceVariant : badge.fg;

  return (
    <Pressable
      style={({ pressed }) => [s.card, {
        backgroundColor: colors.surface,
        borderRadius: radius.lg,
        borderColor: colors.border,
        borderWidth: 1,
        padding: spacing[4],
        marginBottom: spacing[3],
        marginHorizontal: spacing[4],
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing[3],
        opacity: pressed ? 0.85 : 1,
        ...(isDark ? {} : shadows.sm),
      }]}
      accessibilityRole="button"
      accessibilityLabel={`Pengeluaran ${item.judul}, ${rupiah(item.nominal)}, kategori ${item.kategori || 'tanpa kategori'}`}
      onPress={() => onPress(item.id)}
      android_ripple={{ color: colors.primary + '1A' }}
    >
      {/* Badge kategori (kiri) */}
      <View style={[s.badge, {
        backgroundColor: badgeBg,
        borderRadius: radius.full,
        paddingHorizontal: spacing[3],
        paddingVertical: spacing[2],
      }]}>
        <Text style={{ color: badgeFg, fontSize: typography.fontSize.xs, fontWeight: typography.fontWeight.semibold }}>
          {item.kategori || 'Lainnya'}
        </Text>
      </View>

      {/* Konten (tengah) */}
      <View style={[s.content, { flex: 1, gap: spacing[1] }]}>
        <Text
          numberOfLines={1}
          style={[s.title, {
            color: colors.onSurface,
            fontSize: typography.fontSize.base,
            fontWeight: typography.fontWeight.semibold,
          }]}
        >
          {item.judul}
        </Text>
        <Text
          numberOfLines={1}
          style={{ color: colors.onSurfaceVariant, fontSize: typography.fontSize.sm }}
        >
          {tanggalLokal(item.tanggal)}
        </Text>
      </View>

      {/* Nominal (kanan) */}
      <View style={{ alignItems: 'flex-end', gap: spacing[1] }}>
        <Text
          style={[s.amount, {
            color: colors.error,
            fontSize: typography.fontSize.lg,
            fontWeight: typography.fontWeight.bold,
          }]}
        >
          {rupiah(item.nominal)}
        </Text>
        <Text
          style={{
            color: colors.primary,
            fontSize: typography.fontSize.xs,
            fontWeight: typography.fontWeight.medium,
          }}
        >
          Detail →
        </Text>
      </View>
    </Pressable>
  );
}

const s = StyleSheet.create({
  card: {},
  badge: {},
  content: {},
  title: {},
  amount: {},
});