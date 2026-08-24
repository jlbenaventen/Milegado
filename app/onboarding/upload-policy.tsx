import * as DocumentPicker from 'expo-document-picker';
import { router } from 'expo-router';
import { Upload } from 'lucide-react-native';
import { Alert, Pressable, Text, View } from 'react-native';

import { Button } from '@/components/Button';
import { FileCard } from '@/components/FileCard';
import { LabeledTextInput } from '@/components/LabeledTextInput';
import { ProgressBar } from '@/components/ProgressBar';
import { ScreenShell } from '@/components/ScreenShell';
import { ScreenTitle } from '@/components/ScreenTitle';
import { useVault } from '@/context/VaultContext';
import { formatCLPInput, parseCLPInput } from '@/lib/currency';
import { generateId } from '@/lib/id';

/** Pantalla 3: sube la póliza de seguro de vida (PDF o foto) y completa sus datos. */
export default function UploadPolicyScreen() {
  const { state, addDocument, removeDocument, setPolicyDetails } = useVault();
  const { policyDocuments, policyDetails } = state;

  async function handlePickDocument() {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf', 'image/*'],
        multiple: true,
        copyToCacheDirectory: true,
      });

      if (result.canceled) return;

      result.assets.forEach((asset) => {
        addDocument({
          id: generateId(),
          fileName: asset.name,
          uri: asset.uri,
          mimeType: asset.mimeType ?? null,
          sizeBytes: asset.size ?? null,
          uploadedAt: new Date().toISOString(),
        });
      });
    } catch {
      Alert.alert('No se pudo abrir el selector de archivos', 'Intenta nuevamente.');
    }
  }

  const canContinue =
    policyDocuments.length > 0 &&
    policyDetails.companyName.trim().length > 0 &&
    policyDetails.policyNumber.trim().length > 0 &&
    !!policyDetails.insuredAmountCLP;

  return (
    <ScreenShell>
      <ScreenTitle
        title="Sube Tu Póliza de Seguro de Vida"
        subtitle="Sube un PDF o foto de tu póliza de Seguros de Vida."
      />

      <View className="gap-5 px-4 pb-4">
        <Pressable
          onPress={handlePickDocument}
          accessibilityRole="button"
          accessibilityLabel="Subir archivo de póliza"
          className="items-center justify-center rounded-2xl border-2 border-dashed border-amber-400 bg-amber-50/30 px-4 py-10">
          <Upload color="#D97706" size={32} />
          <Text className="mt-3 text-center text-sm font-medium text-amber-700">
            Arrastra archivo o haz clic para subir
          </Text>
        </Pressable>

        <View className="gap-4">
          <LabeledTextInput
            label="Nombre de Compañía"
            placeholder="ej. Bice Vida, MetLife, Consorcio"
            value={policyDetails.companyName}
            onChangeText={(text) => setPolicyDetails({ companyName: text })}
          />
          <LabeledTextInput
            label="Número de Póliza"
            placeholder="N° de póliza"
            value={policyDetails.policyNumber}
            onChangeText={(text) => setPolicyDetails({ policyNumber: text })}
          />
          <LabeledTextInput
            label="Monto Asegurado (CLP)"
            placeholder="0"
            prefix="$"
            keyboardType="numeric"
            value={formatCLPInput(policyDetails.insuredAmountCLP ?? 0)}
            onChangeText={(text) => setPolicyDetails({ insuredAmountCLP: parseCLPInput(text) })}
          />
        </View>

        {policyDocuments.length > 0 ? (
          <View className="gap-3">
            {policyDocuments.map((document) => (
              <FileCard
                key={document.id}
                document={document}
                onRemove={() => removeDocument(document.id)}
              />
            ))}
          </View>
        ) : null}
      </View>

      <View className="flex-1" />

      <View className="flex-row gap-3 px-4 pb-2">
        <Button variant="outline" className="flex-1" onPress={handlePickDocument}>
          Añadir más documentos
        </Button>
        <Button
          className="flex-1"
          disabled={!canContinue}
          onPress={() => router.push('/onboarding/executors')}>
          Siguiente
        </Button>
      </View>

      <ProgressBar step={2} totalSteps={3} />
    </ScreenShell>
  );
}
