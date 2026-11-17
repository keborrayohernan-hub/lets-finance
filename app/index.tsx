import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, designTop, type } from '../src/theme';
import { WelcomeIllustration } from '../src/components/Icon';
import { PrimaryButton } from '../src/components/ui';

/** Figma "Lets Finance App" (2093:1243) */
export default function Welcome() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  return (
    <View style={s.screen}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={[s.content, { paddingTop: designTop(130, insets.top) }]}>
        <Text style={[type.title36, s.title]}>Welcome to Let’s Finance!</Text>
        <Text style={s.body}>
          Are you a beginner when it comes to finance? Do you want to learn what it’s like to manage your money? Or would
          you prefer to navigate your finances more simply?
        </Text>
        <Text style={[s.body, { marginTop: 23 }]}>
          If so, this is the app for you! Press the continue button below to get started on making your account.
        </Text>
        <View style={s.art}>
          <WelcomeIllustration />
        </View>
      </ScrollView>
      <PrimaryButton
        label="Continue"
        onPress={() => router.push('/onboarding/age')}
        style={{ marginBottom: insets.bottom + 22 }}
      />
    </View>
  );
}

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { paddingHorizontal: 20, paddingBottom: 24 },
  title: { maxWidth: 376 },
  body: { ...type.body16, color: colors.bodyGray, marginTop: 18, maxWidth: 398 },
  art: { alignItems: 'center', marginTop: 59 },
});
