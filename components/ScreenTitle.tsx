import { Text, View } from 'react-native';

interface ScreenTitleProps {
  title: string;
  subtitle: string;
}

/** Bloque de título + subtítulo que encabeza el contenido de cada pantalla del onboarding. */
export function ScreenTitle({ title, subtitle }: ScreenTitleProps) {
  return (
    <View className="px-4 pb-2 pt-5">
      <Text className="text-2xl font-bold text-slate-900">{title}</Text>
      <Text className="mt-1 text-sm text-slate-500">{subtitle}</Text>
    </View>
  );
}
