// src/components/Field.js
import { View, Text, TextInput, StyleSheet } from 'react-native';

export default function Field({ label, value, onChangeText, placeholder, editable = true, error, ...props }) {
  return (
    <View>
      <Text style={s.label}>{label}</Text>
      <TextInput
        style={[s.input, error && s.inputError]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        editable={editable}
        {...props}
      />
      {error ? <Text style={s.error}>{error}</Text> : null}
    </View>
  );
}

const s = StyleSheet.create({
  label: {
    fontSize: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#64748B',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
  },
  inputError: {
    borderColor: '#B91C1C',
  },
  error: {
    color: '#B91C1C',
    marginTop: 4,
    fontSize: 14,
  },
});