import { Text, TextInput, View } from 'react-native';
import type { TextInputProps } from 'react-native';

interface LabeledTextInputProps extends TextInputProps {
  label: string;
  /** Adorno fijo a la izquierda del campo, p. ej. "$" para montos en CLP. */
  prefix?: string;
}

/** Campo de texto con etiqueta, usado en los formularios de póliza y de heredero. */
export function LabeledTextInput({ label, prefix, className, ...rest }: LabeledTextInputProps) {
  return (
    <View>
      <Text className="mb-1.5 text-sm font-medium text-slate-700">{label}</Text>
      <View className="flex-row items-center rounded-xl border border-slate-200 bg-white px-4">
        {prefix ? <Text className="mr-1 text-base text-slate-500">{prefix}</Text> : null}
        <TextInput
          placeholderTextColor="#94A3B8"
          className={`flex-1 py-3 text-base text-slate-900 ${className ?? ''}`}
          {...rest}
        />
      </View>
    </View>
  );
}
