// src/components/KartuPengeluaran.js
import { View, Text, StyleSheet } from 'react-native';

export default function KartuPengeluaran({ item, onPress }) {
  return (
    <Pressable
      style={s.card}
      accessibilityRole="button"
      onPress={() => onPress(item.id)}
    >
      <Text style={s.cardTitle}>{item.judul}</Text>
      <Text>{rupiah(item.nominal)}</Text>
      <Text>{item.kategori || 'Tanpa kategori'}</Text>
      <Text>{tanggalLokal(item.tanggal)}</Text>
      <Text>Lihat detail</Text>
    </Pressable>
  );
}

const s = StyleSheet.create({
  card: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    marginVertical: 8,
    gap: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
});