// src/screens/DetailScreen.js
// Themed Detail screen — read-only view, actions (edit/delete/back), accessible

import { View, Text, ScrollView, ActivityIndicator, Alert, BackHandler, StyleSheet } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import { useTheme } from '../theme/ThemeContext';
import { api } from '../api';
import { rupiah, tanggalLokal } from '../helpers';
import { Tombol } from '../components/Button';

export function DetailScreen({ route, navigation }) {
  const { colors, spacing, typography, shadows } = useTheme();
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

  if (loading) {
    return (
      <View style={[s.loadingContainer, { backgroundColor: colors.background, flex: 1, alignItems: 'center', justifyContent: 'center' }]}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={{ color: colors.mutedForeground, marginTop: spacing[3], fontSize: typography.fontSize.sm }}>Memuat detail...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={[s.page, { backgroundColor: colors.background }]}
      contentContainerStyle={{ paddingBottom: spacing[6] }}
    >
      <Text style={[s.heading, { color: colors.onSurface, fontSize: typography.fontSize['2xl'], fontWeight: typography.fontWeight.bold, marginBottom: spacing[4] }]}>
        Detail pengeluaran
      </Text>
      {error && (
        <View style={[s.errorBanner, { backgroundColor: colors.errorLight, borderColor: colors.error, borderWidth: 1, borderRadius: 8, padding: spacing[3], marginBottom: spacing[4] }]}>
          <Text style={{ color: colors.error, fontSize: typography.fontSize.sm }}>{error}</Text>
        </View>
      )}
      {data && (
        <View style={[s.card, {
          backgroundColor: colors.surface,
          borderRadius: 12,
          borderWidth: 1,
          borderColor: colors.border,
          padding: spacing[4],
          marginBottom: spacing[4],
          gap: spacing[3],
          ...shadows.sm,
        }]}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: colors.divider, paddingBottom: spacing[3] }}>
            <Text style={{ color: colors.onSurface, fontSize: typography.fontSize.xl, fontWeight: typography.fontWeight.bold }}>
              {data.judul}
            </Text>
            <Text style={{ color: colors.error, fontSize: typography.fontSize.xl, fontWeight: typography.fontWeight.bold }}>
              {rupiah(data.nominal)}
            </Text>
          </View>
          <View style={{ gap: spacing[2] }}>
            <DetailRow label="Tanggal" value={tanggalLokal(data.tanggal)} />
            <DetailRow label="Kategori" value={data.id_kategori ? String(data.id_kategori) : 'Tanpa kategori'} />
            <DetailRow label="Catatan" value={data.catatan || 'Belum ada catatan'} />
          </View>
        </View>
      )}
      <View style={{ gap: spacing[3] }}>
        <Tombol title="Kembali" onPress={() => navigation.navigate('Home')} variant="outline" size="lg" fullWidth />
        <Tombol title="Ubah" onPress={() => navigation.navigate('Edit', { ...data, nominal: String(data.nominal) })} disabled={!data} variant="secondary" size="lg" fullWidth />
        <Tombol title="Hapus" onPress={confirmDelete} disabled={!data} variant="destructive" size="lg" fullWidth />
      </View>
    </ScrollView>
  );
}

function DetailRow({ label, value }) {
  const { colors, typography, spacing } = useTheme();
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', minHeight: 24 }}>
      <Text style={{ color: colors.onSurfaceVariant, fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.medium }}>
        {label}
      </Text>
      <Text style={{ color: colors.onSurface, fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.normal, textAlign: 'right', flex: 1, marginLeft: spacing[3] }}>
        {value}
      </Text>
    </View>
  );
}

const s = StyleSheet.create({
  page: { flex: 1, padding: 16 },
  heading: {},
  errorBanner: {},
  loadingContainer: {},
  card: {},
});