// src/screens/AddScreen.js
// Themed Add screen — form with validation, category picker, loading states

import { View, Text, ScrollView, ActivityIndicator, Alert, StyleSheet } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import { useTheme } from '../theme/ThemeContext';
import { api } from '../api';
import { validate, tanggalLokal } from '../helpers';
import { Tombol } from '../components/Button';
import { Field } from '../components/Field';
import { CategoryPicker } from '../components/CategoryPicker';

export function AddScreen({ navigation }) {
  const { colors, spacing, typography } = useTheme();
  const [categories, setCategories] = useState([]);
  const [judul, setJudul] = useState('');
  const [nominal, setNominal] = useState('');
  const [categoryId, setCategoryId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const lock = useRef(false);

  useEffect(() => {
    loadCategories();
  }, []);

  async function loadCategories() {
    if (lock.current) return;
    lock.current = true;
    setBusy(true);
    setError('');
    try {
      const rows = await api.categories();
      if (!Array.isArray(rows)) throw new Error('Kategori harus berupa array');
      setCategories(rows);
    } catch (e) {
      setError(e.message);
    } finally {
      lock.current = false;
      setBusy(false);
    }
  }

  async function save() {
    if (lock.current) return;
    const pesan = validate(judul, nominal);
    if (pesan) { setError(pesan); return; }
    lock.current = true;
    setBusy(true);
    setError('');
    try {
      await api.create({
        judul: judul.trim(),
        nominal: Number(nominal),
        id_kategori: categoryId || null,
      });
      Alert.alert('Sukses', 'Data tersimpan');
      navigation.navigate('Home');
    } catch (e) {
      setError(e.message || 'Gagal menyimpan');
    } finally {
      lock.current = false;
      setBusy(false);
    }
  }

  const options = [
    { id: null, nama: 'Tanpa kategori' },
    ...categories.map(c => ({ id: c.id, nama: c.nama }))
  ];

  return (
    <ScrollView
      style={[s.page, { backgroundColor: colors.background }]}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ paddingBottom: spacing[6] }}
    >
      <Text style={[s.heading, { color: colors.onSurface, fontSize: typography.fontSize['2xl'], fontWeight: typography.fontWeight.bold, marginBottom: spacing[4] }]}>
        Tambah pengeluaran
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
      <Text style={[s.sectionLabel, { color: colors.onSurfaceVariant, fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.medium, marginTop: spacing[2], marginBottom: spacing[2] }]}>
        Kategori (opsional)
      </Text>
      <CategoryPicker
        options={options}
        selected={categoryId}
        onSelect={setCategoryId}
        disabled={busy}
      />
      <Text style={[s.note, { color: colors.mutedForeground, fontSize: typography.fontSize.xs, marginTop: spacing[2], marginBottom: spacing[4] }]}>
        Tanggal diisi otomatis oleh server.
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
  sectionLabel: {},
  note: {},
});