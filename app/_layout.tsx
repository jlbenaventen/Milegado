import '@/global.css';

import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { VaultProvider } from '@/context/VaultContext';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <VaultProvider>
        <StatusBar style="light" />
        <Stack screenOptions={{ headerShown: false }} />
      </VaultProvider>
    </SafeAreaProvider>
  );
}
