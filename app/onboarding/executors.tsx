import { router } from 'expo-router';
import { CircleCheckBig, Plus } from 'lucide-react-native';
import { useState } from 'react';
import { Alert, Text, View } from 'react-native';

import { Button } from '@/components/Button';
import { HeirCard } from '@/components/HeirCard';
import { LabeledTextInput } from '@/components/LabeledTextInput';
import { ProgressBar } from '@/components/ProgressBar';
import { RelationshipPicker } from '@/components/RelationshipPicker';
import { RutInput } from '@/components/RutInput';
import { ScreenShell } from '@/components/ScreenShell';
import { ScreenTitle } from '@/components/ScreenTitle';
import { useVault } from '@/context/VaultContext';
import { CATEGORIES } from '@/lib/constants';
import { generateId } from '@/lib/id';
import { isValidEmail } from '@/lib/validation';
import type { HeirRelationship } from '@/types';

/** Pantalla 4: designa a los albaceas digitales que recibirán acceso a la bóveda. */
export default function ExecutorsScreen() {
  const { state, addHeir, removeHeir } = useVault();

  const [fullName, setFullName] = useState('');
  const [rut, setRut] = useState('');
  const [rutValid, setRutValid] = useState(false);
  const [email, setEmail] = useState('');
  const [relationship, setRelationship] = useState<HeirRelationship | null>(null);

  const canAddHeir =
    fullName.trim().length > 0 && rutValid && isValidEmail(email) && relationship !== null;

  function handleAddHeir() {
    if (!canAddHeir || !relationship) return;

    addHeir({
      id: generateId(),
      fullName: fullName.trim(),
      rut,
      email: email.trim(),
      relationship,
    });

    setFullName('');
    setRut('');
    setRutValid(false);
    setEmail('');
    setRelationship(null);
  }

  function handleFinish() {
    Alert.alert(
      '¡Registro completado!',
      'Tu bóveda digital ha sido configurada correctamente.',
      [{ text: 'OK', onPress: () => router.replace('/onboarding') }],
    );
  }

  const assignedCategoryLabels = CATEGORIES.filter((category) =>
    state.selectedCategoryIds.includes(category.id),
  ).map((category) => category.label);

  return (
    <ScreenShell>
      <ScreenTitle
        title="Designa Tus Albaceas Digitales"
        subtitle="Elige a tus personas de confianza para recibir acceso."
      />

      <View className="gap-5 px-4 pb-4">
        <View className="gap-4 rounded-2xl border border-slate-200 bg-white p-4">
          <LabeledTextInput
            label="Nombre Completo"
            placeholder="Nombre y apellido"
            value={fullName}
            onChangeText={setFullName}
          />
          <RutInput value={rut} onChangeText={setRut} onValidityChange={setRutValid} />
          <LabeledTextInput
            label="Correo Electrónico"
            placeholder="correo@ejemplo.com"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
          <RelationshipPicker value={relationship} onChange={setRelationship} />

          <Button disabled={!canAddHeir} onPress={handleAddHeir}>
            <View className="flex-row items-center gap-2">
              <Plus color={canAddHeir ? '#FFFFFF' : '#0A385C'} size={18} />
              <Text className={`text-base font-semibold ${canAddHeir ? 'text-white' : 'text-navy'}`}>
                Añadir Heredero
              </Text>
            </View>
          </Button>
        </View>

        {state.heirs.length > 0 ? (
          <View className="gap-3">
            {state.heirs.map((heir) => (
              <HeirCard key={heir.id} heir={heir} onRemove={() => removeHeir(heir.id)} />
            ))}
          </View>
        ) : null}

        <View className="rounded-2xl border border-slate-200 bg-white p-4">
          <Text className="text-sm text-slate-700">
            <Text className="font-semibold text-slate-900">Asignar Accesos: </Text>
            {assignedCategoryLabels.length > 0
              ? assignedCategoryLabels.join(', ')
              : 'Sin categorías seleccionadas'}
          </Text>
        </View>
      </View>

      <View className="flex-1" />

      <View className="px-4 pb-2">
        <Button disabled={state.heirs.length === 0} onPress={handleFinish}>
          <View className="flex-row items-center gap-2">
            <CircleCheckBig color="#FFFFFF" size={18} />
            <Text className="text-base font-semibold text-white">Finalizar Registro</Text>
          </View>
        </Button>
      </View>

      <ProgressBar step={3} totalSteps={3} />
    </ScreenShell>
  );
}
