import { router } from 'expo-router';
import { View } from 'react-native';

import { Button } from '@/components/Button';
import { CategoryCard } from '@/components/CategoryCard';
import { ProgressBar } from '@/components/ProgressBar';
import { ScreenShell } from '@/components/ScreenShell';
import { ScreenTitle } from '@/components/ScreenTitle';
import { useVault } from '@/context/VaultContext';
import { CATEGORIES } from '@/lib/constants';

/** Pantalla 2: elige qué categorías de información respaldar (grilla 2 columnas). */
export default function CategoriesScreen() {
  const { state, toggleCategory } = useVault();

  const hasSelection = state.selectedCategoryIds.length > 0;

  return (
    <ScreenShell>
      <ScreenTitle title="Categoriza Tu Información" subtitle="¿Qué quieres respaldar hoy?" />

      <View className="flex-1 px-4 pb-4">
        <View className="flex-row flex-wrap justify-between gap-y-3">
          {CATEGORIES.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              selected={state.selectedCategoryIds.includes(category.id)}
              onPress={() => toggleCategory(category.id)}
            />
          ))}
        </View>
      </View>

      <View className="px-4 pb-2">
        <Button disabled={!hasSelection} onPress={() => router.push('/onboarding/upload-policy')}>
          Siguiente
        </Button>
      </View>

      <ProgressBar step={1} totalSteps={3} />
    </ScreenShell>
  );
}
