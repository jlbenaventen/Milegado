import { Text, View } from 'react-native';

interface ProgressBarProps {
  /** Paso actual, 1-indexado. */
  step: number;
  totalSteps: number;
}

/** Barra de progreso del onboarding: "X de Y" + pista rellena proporcionalmente. */
export function ProgressBar({ step, totalSteps }: ProgressBarProps) {
  const progress = Math.min(Math.max(step / totalSteps, 0), 1);

  return (
    <View className="px-4 py-3">
      <Text className="mb-1.5 text-xs font-medium text-slate-500">
        Paso {step} de {totalSteps}
      </Text>
      <View className="h-2 overflow-hidden rounded-full bg-slate-200">
        <View className="h-full rounded-full bg-navy" style={{ width: `${progress * 100}%` }} />
      </View>
    </View>
  );
}
