import { ChevronRight, X } from 'lucide-react-native';
import { Pressable, Text, View } from 'react-native';

import type { HeirContact } from '@/types';

interface HeirCardProps {
  heir: HeirContact;
  onRemove: () => void;
}

function getInitials(fullName: string): string {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  const initials = parts.slice(0, 2).map((part) => part[0]?.toUpperCase() ?? '');
  return initials.join('') || '?';
}

/** Tarjeta de un albacea ya agregado: avatar con iniciales, nombre, relación y chevron lateral. */
export function HeirCard({ heir, onRemove }: HeirCardProps) {
  return (
    <View className="flex-row items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3">
      <View className="h-10 w-10 items-center justify-center rounded-full bg-slate-100">
        <Text className="text-sm font-bold text-navy">{getInitials(heir.fullName)}</Text>
      </View>

      <View className="flex-1">
        <Text className="text-sm font-semibold text-slate-900" numberOfLines={1}>
          {heir.fullName}
        </Text>
        <Text className="text-xs text-slate-500">{heir.relationship}</Text>
      </View>

      <Pressable
        onPress={onRemove}
        hitSlop={8}
        accessibilityRole="button"
        accessibilityLabel={`Quitar a ${heir.fullName}`}>
        <X color="#94A3B8" size={18} />
      </Pressable>

      <ChevronRight color="#CBD5E1" size={20} />
    </View>
  );
}
