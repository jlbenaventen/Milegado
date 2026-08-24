import { CircleCheck, FileText, X } from 'lucide-react-native';
import { Pressable, Text, View } from 'react-native';

import type { PolicyDocument } from '@/types';

interface FileCardProps {
  document: PolicyDocument;
  onRemove: () => void;
}

/** Tarjeta compacta de un archivo ya subido: ícono de PDF, nombre y checkmark verde de validación. */
export function FileCard({ document, onRemove }: FileCardProps) {
  return (
    <View className="flex-row items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3">
      <View className="h-10 w-10 items-center justify-center rounded-lg bg-red-50">
        <FileText color="#DC2626" size={20} />
      </View>

      <Text className="flex-1 text-sm font-medium text-slate-900" numberOfLines={1}>
        {document.fileName}
      </Text>

      <CircleCheck color="#16A34A" size={20} />

      <Pressable
        onPress={onRemove}
        hitSlop={8}
        accessibilityRole="button"
        accessibilityLabel={`Quitar ${document.fileName}`}>
        <X color="#94A3B8" size={18} />
      </Pressable>
    </View>
  );
}
