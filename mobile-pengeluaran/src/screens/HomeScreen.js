// src/screens/HomeScreen.js
// Themed Home screen — list, pull-to-refresh, empty/loading/error states

import { View, Text, FlatList, ActivityIndicator, Alert, BackHandler, RefreshControl, StyleSheet } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import { useTheme } from '../theme/ThemeContext';
import { api } from '../api';
import { rupiah, tanggalLokal } from '../helpers';
import { Tombol } from '../components/Button';
import { KartuPengeluaran } from '../components/KartuPengeluaran';

export function HomeScreen({ navigation }) {
  const { colors, spacing, typography, shadows } = useTheme();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
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
      setRefreshing(false);
    }
  }

  const onRefresh = () => { setRefreshing(true); load(); };

  return (
    <View style={[s.page, { backgroundColor: colors.background }]}>
      <Text style={[s.heading, { color: colors.onSurface, fontSize: typography.fontSize['2xl'], fontWeight: typography.fontWeight.bold, marginBottom: spacing[4] }]}>
        Pengeluaran
      </Text>
      {error && (
        <View style={[s.errorBanner, { backgroundColor: colors.errorLight, borderColor: colors.error, borderWidth: 1, borderRadius: 8, padding: spacing[3], marginBottom: spacing[4] }]}>
          <Text style={{ color: colors.error, fontSize: typography.fontSize.sm }}>{error}</Text>
        </View>
      )}
      <Tombol
        title="Tambah pengeluaran"
        onPress={() => navigation.navigate('Add')}
        disabled={loading}
        size="lg"
        variant="primary"
        fullWidth
      />
      <Tombol
        title="Muat ulang"
        onPress={load}
        disabled={loading}
        variant="outline"
        size="md"
        fullWidth
      />
      <FlatList
        data={items}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <KartuPengeluaran
            item={item}
            onPress={(id) => navigation.navigate('Detail', { id })}
          />
        )}
        refreshing={refreshing}
        onRefresh={onRefresh}
        ListEmptyComponent={
          !loading && !error && items.length === 0 && (
            <View style={[s.emptyState, { alignItems: 'center', paddingVertical: spacing[10] }]}>
              <Text style={{ color: colors.mutedForeground, fontSize: typography.fontSize.lg, marginBottom: spacing[2] }}>Belum ada pengeluaran</Text>
              <Text style={{ color: colors.mutedForeground, fontSize: typography.fontSize.sm, textAlign: 'center', paddingHorizontal: spacing[6] }}>
                Tekan "Tambah pengeluaran" untuk memulai
              </Text>
            </View>
          )
        }
        contentContainerStyle={{ paddingBottom: spacing[6] }}
      />
    </View>
  );
}

const s = StyleSheet.create({
  page: { flex: 1, padding: 16, paddingTop: 0 },
  heading: {},
  errorBanner: {},
  emptyState: {},
});