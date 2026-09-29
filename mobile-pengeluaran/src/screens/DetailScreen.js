// src/screens/DetailScreen.js
import { View, Text, ScrollView, ActivityIndicator, Alert, BackHandler } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import { api } from '../api';
import { rupiah, tanggalLokal } from '../helpers';
import { Tombol } from '../components/Button';

export function DetailScreen({ route, navigation }) {
  const { id } = route.params;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const lock = useRef(false);

  useEffect(() => {
    const focusSubscription = navigation.addListener('focus', () => {
      loadData();
    });
    return focusSubscription;
  }, [navigation, id]);

  useEffect(() => {
    const backSubscription = BackHandler.addListener('hardwareBackPress', () => {
      navigation.navigate('Home');
      return true;
    });
    return () => backSubscription.remove();
  }, [navigation]);

  async function loadData() {
    if (lock.current) return;
    lock.current = true;
    setLoading(true);
    setError('');
    try {
      const result = await api.detail(id);
      setData(result);
    } catch (e) {
      setError(e.message);
    } finally {
      lock.current = false;
      setLoading(false);
    }
  }

  const confirmDelete = () => {
    Alert.alert('Hapus pengeluaran', `Hapus ${data?.judul || ''}?`, [
      { text: 'Batal', style: 'cancel' },
      {
        text: 'Hapus',
        style: 'destructive',
        onPress: async () => {
          try {
            await api.remove(id);
            Alert.alert('Sukses', 'Data terhapus');
            navigation.navigate('Home');
          } catch (e) {
            Alert.alert('Error', e.message || 'Gagal menghapus');
          }
        },
      },
    ]);
  };

  if (loading) return <ActivityIndicator size="large" />;

  return (
    <ScrollView style={s.page}>
      <Text style={s.heading}>Detail pengeluaran</Text>
      {error ? <Text style={s.error}>{error}</Text> : null}
      {data ? (
        <View style={s.card}>
          <Text style={s.cardTitle}>{data.judul}</Text>
          <Text>{rupiah(data.nominal)}</Text>
          <Text>Tanggal: {tanggalLokal(data.tanggal)}</Text>
          <Text>ID kategori: {data.id_kategori ?? 'Tanpa kategori'}</Text>
          <Text>Catatan: {data.catatan || 'Belum ada catatan'}</Text>
        </View>
      ) : null}
      <Tombol title="Kembali" onPress={() => navigation.navigate('Home')} />
      <Tombol title="Ubah" onPress={() => navigation.navigate('Edit', { ...data, nominal: String(data.nominal) })} disabled={!data} />
      <Tombol title="Hapus" onPress={confirmDelete} disabled={!data} />
    </ScrollView>
  );
}

const s = StyleSheet.create({
  page: { flex: 1, padding: 16, backgroundColor: '#F8FAFC' },
  heading: { fontSize: 24, fontWeight: '700', color: '#0F172A', marginBottom: 16 },
  error: { color: '#B91C1C', marginVertical: 8, fontSize: 16 },
  card: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    marginBottom: 16,
    gap: 8,
  },
  cardTitle: { fontSize: 18, fontWeight: '600' },
});