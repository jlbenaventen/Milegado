import { Vault } from 'lucide-react-native';
import { router } from 'expo-router';
import { Text, View } from 'react-native';

import { Button } from '@/components/Button';
import { ScreenShell } from '@/components/ScreenShell';
import { ScreenTitle } from '@/components/ScreenTitle';
import { WELCOME_STEPS } from '@/lib/constants';

/** Pantalla 1: Bienvenida — presenta el valor de la bóveda y los 3 pasos del onboarding. */
export default function WelcomeScreen() {
  return (
    <ScreenShell>
      <ScreenTitle
        title="Bienvenido a Tu Legado Digital"
        subtitle="Organiza tu información para tus seres queridos."
      />

      <View className="flex-1 px-4 pb-6">
        <View className="items-center rounded-2xl border border-slate-200 bg-white p-6">
          <View className="mb-4 h-20 w-20 items-center justify-center rounded-full bg-slate-100">
            <Vault color="#0A385C" size={40} />
          </View>

          <Text className="mb-5 text-center text-base font-medium text-slate-700">
            Configura tu bóveda segura en 3 pasos simples.
          </Text>

          <View className="w-full gap-4">
            {WELCOME_STEPS.map(({ icon: Icon, label }, index) => (
              <View key={label} className="flex-row items-center gap-3">
                <View className="relative h-11 w-11 items-center justify-center rounded-full bg-slate-100">
                  <Icon color="#0A385C" size={20} />
                  <View className="absolute -right-1 -top-1 h-5 w-5 items-center justify-center rounded-full bg-navy">
                    <Text className="text-[10px] font-bold text-white">{index + 1}</Text>
                  </View>
                </View>
                <Text className="flex-1 text-sm font-medium text-slate-700">{label}</Text>
              </View>
            ))}
          </View>
        </View>

        <View className="mt-6">
          <Button onPress={() => router.push('/onboarding/categories')}>Comenzar</Button>
        </View>
      </View>
    </ScreenShell>
  );
}
