// src/screens/EditScreen.js
import { View, Text, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import { api } from '../api';
import { validate } from '../helpers';
import { Tombol } from '../components/Button';
import { Field } from '../components/Field';

export function EditScreen({ route, navigation }) {
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
    <ScrollView style={s.page} keyboardShouldPersistTaps="handled">
      <Text style={s.heading}>Ubah pengeluaran</Text>
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
      <Text style={s.note}>Kategori, tanggal, dan catatan tidak dapat diedit.</Text>
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