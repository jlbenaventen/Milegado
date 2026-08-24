import { Pressable, Text, View } from 'react-native';

import { HEIR_RELATIONSHIPS } from '@/types';
import type { HeirRelationship } from '@/types';

interface RelationshipPickerProps {
  value: HeirRelationship | null;
  onChange: (relationship: HeirRelationship) => void;
}

/** Selector de relación del heredero, como chips seleccionables (evita depender de un picker nativo aparte). */
export function RelationshipPicker({ value, onChange }: RelationshipPickerProps) {
  return (
    <View>
      <Text className="mb-1.5 text-sm font-medium text-slate-700">Relación</Text>
      <View className="flex-row flex-wrap gap-2">
        {HEIR_RELATIONSHIPS.map((relationship) => {
          const selected = value === relationship;
          return (
            <Pressable
              key={relationship}
              onPress={() => onChange(relationship)}
              accessibilityRole="button"
              accessibilityState={{ selected }}
              className={`rounded-full border px-4 py-2 ${
                selected ? 'border-navy bg-navy' : 'border-slate-200 bg-white'
              }`}>
              <Text className={`text-sm font-medium ${selected ? 'text-white' : 'text-slate-700'}`}>
                {relationship}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
