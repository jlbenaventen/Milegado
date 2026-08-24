import { House, Menu, ShieldKeyhole } from 'lucide-react-native';
import { Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface VaultHeaderProps {
  onMenuPress?: () => void;
  onHomePress?: () => void;
}

/** Header persistente de la app: "Mi Legado" + menú a la izquierda, escudo de seguridad + inicio a la derecha. */
export function VaultHeader({ onMenuPress, onHomePress }: VaultHeaderProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={{ paddingTop: insets.top }} className="bg-navy">
      <View className="flex-row items-center justify-between px-4 py-3">
        <View className="flex-row items-center gap-3">
          <Pressable
            onPress={onMenuPress}
            hitSlop={8}
            accessibilityRole="button"
            accessibilityLabel="Abrir menú">
            <Menu color="#FFFFFF" size={24} />
          </Pressable>
          <Text className="text-lg font-bold text-white">Mi Legado</Text>
        </View>

        <View className="flex-row items-center gap-4">
          <Pressable
            hitSlop={8}
            accessibilityRole="button"
            accessibilityLabel="Seguridad de la bóveda">
            <ShieldKeyhole color="#FFFFFF" size={22} />
          </Pressable>
          <Pressable
            onPress={onHomePress}
            hitSlop={8}
            accessibilityRole="button"
            accessibilityLabel="Ir al inicio">
            <House color="#FFFFFF" size={22} />
          </Pressable>
        </View>
      </View>
    </View>
  );
}
