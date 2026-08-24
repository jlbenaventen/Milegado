import { CircleUserRound, House, Menu } from 'lucide-react-native';
import { Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const NAV_ITEMS = [
  { key: 'menu', label: 'Menú', Icon: Menu },
  { key: 'perfil', label: 'Perfil', Icon: CircleUserRound },
  { key: 'home', label: 'Inicio', Icon: House },
] as const;

/** Barra de navegación inferior persistente: Menú, Perfil y Home. */
export function BottomNav() {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{ paddingBottom: Math.max(insets.bottom, 8) }}
      className="flex-row justify-around border-t border-slate-200 bg-white pt-2">
      {NAV_ITEMS.map(({ key, label, Icon }) => (
        <Pressable
          key={key}
          className="items-center gap-1 px-4 py-1"
          accessibilityRole="button"
          accessibilityLabel={label}>
          <Icon color="#0A385C" size={22} />
          <Text className="text-xs text-navy">{label}</Text>
        </Pressable>
      ))}
    </View>
  );
}
