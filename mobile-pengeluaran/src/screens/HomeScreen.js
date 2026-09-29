// src/screens/HomeScreen.js
import { View, Text, FlatList, ActivityIndicator, Alert, BackHandler } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import { api } from '../api';
import { rupiah, tanggalLokal } from '../helpers';
import { Tombol } from '../components/Button';
import { KartuPengeluaran } from '../components/KartuPengeluaran';

export function HomeScreen({ navigation }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const lock = useRef(false);

  useEffect(() => {
    const subscription = BackHandler.addListener('hardwareBackPress', () => {
      if (!lock.current) {
        Alert.alert('Keluar', 'Yakin ingin keluar?', [
          { text: 'Batal', style: 'cancel' },
          { text: 'Keluar', style: 'destructive', onPress: () => BackHandler.exitApp() }
        ]);
        return true;
      }
      return false;
    });
    load();
    return () => subscription.remove();
  }, []);

  async function load() {
    if (lock.current) return;
    lock.current = true;
    setLoading(true);
    setError('');
    try {
      const rows = await api.list();
      if (!Array.isArray(rows)) throw new Error('Daftar harus berupa array');
      setItems(rows);
    } catch (e) {
      setError(e.message);
    } finally {
      lock.current = false;
      setLoading(false);
    }
  }

  return (
    <View style={s.page}>
      <Text style={s.heading}>Pengeluaran</Text>
      {error ? <Text style={s.error}>{error}</Text> : null}
      {loading ? <ActivityIndicator size="large" /> : null}
      <Tombol title="Tambah pengeluaran" onPress={() => navigation.navigate('Add')} disabled={loading} />
      <Tombol title="Muat ulang" onPress={load} disabled={loading} />
      {items.length === 0 && !loading && !error ? <Text>Belum ada pengeluaran.</Text> : null}
      <FlatList
        data={items}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <KartuPengeluaran
            item={item}
            onPress={(id) => navigation.navigate('Detail', { id })}
          />
        )}
        refreshing={loading}
        onRefresh={load}
      />
    </View>
  );
}

const s = StyleSheet.create({
  page: { flex: 1, padding: 16, paddingTop: 60, backgroundColor: '#F8FAFC' },
  heading: { fontSize: 24, fontWeight: '700', color: '#0F172A', marginBottom: 16 },
  error: { color: '#B91C1C', marginVertical: 8, fontSize: 16 },
});