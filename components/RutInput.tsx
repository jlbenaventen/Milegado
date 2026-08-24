import { useEffect, useState } from 'react';
import { Text, TextInput, View } from 'react-native';

import { formatRut, isValidRut } from '@/lib/rut';

interface RutInputProps {
  /** Valor ya formateado (XX.XXX.XXX-X) que mantiene el padre en estado. */
  value: string;
  onChangeText: (formatted: string) => void;
  onValidityChange?: (isValid: boolean) => void;
  label?: string;
}

/** Input de RUT chileno con formateo en vivo y validación de dígito verificador (Módulo 11). */
export function RutInput({ value, onChangeText, onValidityChange, label = 'RUT' }: RutInputProps) {
  const [touched, setTouched] = useState(false);
  const isValid = value.length > 0 && isValidRut(value);

  useEffect(() => {
    onValidityChange?.(isValid);
  }, [isValid, onValidityChange]);

  const showError = touched && value.length > 0 && !isValid;

  return (
    <View>
      <Text className="mb-1.5 text-sm font-medium text-slate-700">{label}</Text>
      <TextInput
        value={value}
        onChangeText={(text) => onChangeText(formatRut(text))}
        onBlur={() => setTouched(true)}
        placeholder="XX.XXX.XXX-X"
        placeholderTextColor="#94A3B8"
        autoCapitalize="characters"
        maxLength={12}
        className={`rounded-xl border bg-white px-4 py-3 text-base text-slate-900 ${
          showError ? 'border-red-400' : 'border-slate-200'
        }`}
      />
      {showError ? (
        <Text className="mt-1 text-xs text-red-500">RUT inválido. Revisa el dígito verificador.</Text>
      ) : null}
    </View>
  );
}
