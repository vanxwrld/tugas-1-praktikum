// src/screens/EditScreen.js
// Themed Edit screen — pre-filled form, validation, loading states

import { View, Text, ScrollView, ActivityIndicator, Alert, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import { useTheme } from '../theme/ThemeContext';
import { api } from '../api';
import { validate } from '../helpers';
import { Tombol } from '../components/Button';
import { Field } from '../components/Field';

export function EditScreen({ route, navigation }) {
  const { colors, spacing, typography } = useTheme();
  const { id, judul: initialJudul, nominal: initialNominal } = route.params;
  const [judul, setJudul] = useState(initialJudul);
  const [nominal, setNominal] = useState(String(initialNominal));
  const [loading, setLoading] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setJudul(initialJudul);
      setNominal(String(initialNominal));
      setError('');
    });
    return unsubscribe;
  }, [navigation, initialJudul, initialNominal]);

  async function save() {
    const pesan = validate(judul, nominal);
    if (pesan) { setError(pesan); return; }
    setBusy(true);
    setError('');
    try {
      await api.update(id, {
        judul: judul.trim(),
        nominal: Number(nominal),
      });
      Alert.alert('Sukses', 'Data diubah');
      navigation.navigate('Home');
    } catch (e) {
      setError(e.message || 'Gagal mengubah');
    } finally {
      setBusy(false);
    }
  }

  return (
    <ScrollView
      style={[s.page, { backgroundColor: colors.background }]}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ paddingBottom: spacing[6] }}
    >
      <Text style={[s.heading, { color: colors.onSurface, fontSize: typography.fontSize['2xl'], fontWeight: typography.fontWeight.bold, marginBottom: spacing[4] }]}>
        Ubah pengeluaran
      </Text>
      {error && (
        <View style={[s.errorBanner, { backgroundColor: colors.errorLight, borderColor: colors.error, borderWidth: 1, borderRadius: 8, padding: spacing[3], marginBottom: spacing[4] }]}>
          <Text style={{ color: colors.error, fontSize: typography.fontSize.sm }}>{error}</Text>
        </View>
      )}
      {busy && (
        <View style={[s.loadingBanner, { backgroundColor: colors.muted, borderRadius: 8, padding: spacing[3], marginBottom: spacing[4], alignItems: 'center' }]}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={{ color: colors.onSurfaceVariant, marginTop: spacing[2], fontSize: typography.fontSize.sm }}>Menyimpan...</Text>
        </View>
      )}
      <Field
        label="Judul"
        value={judul}
        onChangeText={setJudul}
        placeholder="Contoh: Makan siang"
        editable={!busy}
        maxLength={100}
        error={!judul.trim() ? 'Judul wajib diisi' : null}
      />
      <Field
        label="Nominal rupiah"
        value={nominal}
        onChangeText={setNominal}
        placeholder="Contoh: 20000"
        keyboardType="number-pad"
        editable={!busy}
        error={validate(judul, nominal)}
      />
      <Text style={[s.note, { color: colors.mutedForeground, fontSize: typography.fontSize.xs, marginTop: spacing[2], marginBottom: spacing[4] }]}>
        Kategori, tanggal, dan catatan tidak dapat diedit.
      </Text>
      <Tombol
        title={busy ? 'Menyimpan...' : 'Simpan'}
        onPress={save}
        disabled={busy || !judul.trim() || !nominal}
        size="lg"
        variant="primary"
        loading={busy}
        fullWidth
      />
    </ScrollView>
  );
}

const s = StyleSheet.create({
  page: { flex: 1, padding: 16 },
  heading: {},
  errorBanner: {},
  loadingBanner: {},
  note: {},
});