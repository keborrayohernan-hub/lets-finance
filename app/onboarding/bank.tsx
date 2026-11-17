import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, designTop, font, radius, type } from '../../src/theme';
import { PrimaryButton, SecondaryButton } from '../../src/components/ui';
import { StepBar } from '../../src/components/Onboarding';
import { Icon } from '../../src/components/Icon';

/** Figma "Question 2" (4:267) */
export default function BankQuestion() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [linked, setLinked] = useState(false);

  return (
    <View style={s.screen}>
      <StatusBar style="dark" />
      <View style={{ paddingTop: designTop(80, insets.top) }}>
        <StepBar step={2} />
      </View>
      <View style={s.content}>
        <Text style={s.title}>Connect To Your Bank</Text>
        <Text style={s.subtitle}>When connecting to your bank account, we’ll be able to help you out with your goal!</Text>

        <Pressable
          onPress={() => setLinked((v) => !v)}
          style={[s.card, { marginTop: 52 }, linked && { borderColor: colors.brand }]}
        >
          <Icon name="bank" />
          <Text style={[type.header16, { lineHeight: 20 }]}>Your Bank Account</Text>
        </Pressable>
        <Pressable style={[s.card, { marginTop: 21 }]}>
          <Icon name="add" color="#1C1B1F" />
          <Text style={[type.header16, { lineHeight: 20, color: colors.black }]}>Add Another Bank Account</Text>
        </Pressable>
      </View>

      <View style={{ gap: 13, marginBottom: insets.bottom + 6 }}>
        <PrimaryButton label="Continue" dark onPress={() => router.push('/onboarding/account')} />
        <SecondaryButton label="Back" onPress={() => router.back()} />
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { flex: 1, paddingTop: 103, paddingHorizontal: 20 },
  title: { ...font('bold'), fontSize: 24, lineHeight: 29, color: colors.text },
  subtitle: { ...type.body14, lineHeight: 17, color: colors.muted, marginTop: 7, maxWidth: 338 },
  card: {
    height: 82,
    marginHorizontal: 12,
    borderRadius: radius.xl,
    backgroundColor: colors.fill,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 20,
    borderWidth: 2,
    borderColor: 'transparent',
  },
});
