import type { PropsWithChildren } from 'react';
import { ScrollView, View } from 'react-native';

import { BottomNav } from '@/components/BottomNav';
import { VaultHeader } from '@/components/VaultHeader';

/** Envoltorio común de las pantallas del onboarding: header persistente, contenido scrolleable y nav inferior. */
export function ScreenShell({ children }: PropsWithChildren) {
  return (
    <View className="flex-1 bg-slate-50">
      <VaultHeader />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        {children}
      </ScrollView>
      <BottomNav />
    </View>
  );
}
