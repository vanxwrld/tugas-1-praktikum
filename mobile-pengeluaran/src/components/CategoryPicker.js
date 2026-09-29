// src/components/CategoryPicker.js
import { View, Text, Pressable, StyleSheet } from 'react-native';

export default function CategoryPicker({ options, selected, onSelect, disabled }) {
  return (
    <View>
      {options.map((k) => (
        <Pressable
          key={String(k.id)}
          accessibilityRole="radio"
          accessibilityState={{ checked: selected === k.id }}
          disabled={disabled}
          onPress={() => onSelect(k.id)}
          style={[s.choice, selected === k.id && s.chosen]}
        >
          <Text>{selected === k.id ? '(x) ' : '( ) '}{k.nama}</Text>
        </Pressable>
      ))}
    </View>
  );
}

const s = StyleSheet.create({
  choice: {
    padding: 12,
    minHeight: 48,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#64748B',
    borderRadius: 8,
  },
  chosen: {
    backgroundColor: '#CCFBF1',
    borderColor: '#0F766E',
  },
});