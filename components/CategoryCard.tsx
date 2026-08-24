import { CircleCheck } from 'lucide-react-native';
import { Pressable, Text, View } from 'react-native';

import type { Category } from '@/types';

interface CategoryCardProps {
  category: Category;
  selected: boolean;
  onPress: () => void;
}

/** Tarjeta de categoría de la grilla 2x3 de la Pantalla 2, con ícono coloreado y estado seleccionado. */
export function CategoryCard({ category, selected, onPress }: CategoryCardProps) {
  const Icon = category.icon;

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected }}
      style={{ width: '48%' }}
      className={`rounded-2xl border bg-white p-4 ${selected ? 'border-navy' : 'border-slate-200'}`}>
      <View className="mb-3 flex-row items-start justify-between">
        <View
          className={`h-11 w-11 items-center justify-center rounded-full ${category.iconBgClassName}`}>
          <Icon color={category.iconColorHex} size={22} />
        </View>
        {selected ? <CircleCheck color="#0A385C" size={18} /> : null}
      </View>
      <Text className="text-sm font-semibold text-slate-900">{category.label}</Text>
    </Pressable>
  );
}
