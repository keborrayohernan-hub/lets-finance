import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppStateProvider } from '../src/state';
import { fontFiles } from '../src/fonts';
import { colors } from '../src/theme';

SplashScreen.preventAutoHideAsync().catch(() => {});

export default function RootLayout() {
  const [loaded, error] = useFonts(fontFiles);

  useEffect(() => {
    if (loaded || error) SplashScreen.hideAsync().catch(() => {});
  }, [loaded, error]);

  if (!loaded && !error) return null;

  return (
    <SafeAreaProvider>
      <AppStateProvider>
        <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.background } }} />
      </AppStateProvider>
    </SafeAreaProvider>
  );
}
