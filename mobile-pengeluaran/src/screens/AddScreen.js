// src/screens/AddScreen.js
import { View, Text, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import { api } from '../api';
import { validate, tanggalLokal } from '../helpers';
import { Tombol } from '../components/Button';
import { Field } from '../components/Field';
import { CategoryPicker } from '../components/CategoryPicker';

export function AddScreen({ navigation }) {
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
    <ScrollView style={s.page} keyboardShouldPersistTaps="handled">
      <Text style={s.heading}>Tambah pengeluaran</Text>
      {error ? <Text style={s.error}>{error}</Text> : null}
      {busy ? <ActivityIndicator size="large" /> : null}
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
      <Text style={s.label}>Kategori opsional</Text>
      <CategoryPicker
        options={options}
        selected={categoryId}
        onSelect={setCategoryId}
        disabled={busy}
      />
      <Text style={s.note}>Tanggal diisi otomatis oleh server.</Text>
      <Tombol
        title={busy ? 'Menyimpan...' : 'Simpan'}
        onPress={save}
        disabled={busy || !judul.trim() || !nominal}
      />
    </ScrollView>
  );
}

const s = StyleSheet.create({
  page: { flex: 1, padding: 16, backgroundColor: '#F8FAFC' },
  heading: { fontSize: 24, fontWeight: '700', color: '#0F172A', marginBottom: 16 },
  label: { fontSize: 16, marginTop: 16, marginBottom: 8 },
  note: { fontSize: 14, color: '#64748B', marginBottom: 16 },
  error: { color: '#B91C1C', marginVertical: 8, fontSize: 16 },
});