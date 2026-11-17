import React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, designTop, font, radius, type } from '../../src/theme';
import { PrimaryButton, Toggle } from '../../src/components/ui';
import { StepBar } from '../../src/components/Onboarding';
import { useAppState } from '../../src/state';

/** Figma "Question 3" (4:141) */
export default function AccountQuestion() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { edit } = useLocalSearchParams<{ edit?: string }>();
  const { fullName, setFullName, email, setEmail, weeklyTips, setWeeklyTips } = useAppState();

  return (
    <KeyboardAvoidingView style={s.screen} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <StatusBar style="dark" />
      <View style={{ paddingTop: designTop(80, insets.top) }}>
        {edit ? null : <StepBar step={3} />}
      </View>
      <ScrollView contentContainerStyle={s.content} keyboardShouldPersistTaps="handled">
        <Text style={s.title}>{edit ? 'Edit Profile' : 'You’re Almost There!'}</Text>
        <Text style={s.subtitle}>
          {edit ? 'Update your name and email' : 'Add in your name and email to finalize your account'}
        </Text>

        <Text style={[s.label, { marginTop: 37 }]}>Full Name</Text>
        <TextInput
          value={fullName}
          onChangeText={setFullName}
          style={s.input}
          autoComplete="name"
          textContentType="name"
          returnKeyType="next"
        />
        <Text style={[s.label, { marginTop: 17 }]}>Email</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          style={s.input}
          autoCapitalize="none"
          autoComplete="email"
          keyboardType="email-address"
          textContentType="emailAddress"
        />

        <View style={s.tips}>
          <Text style={s.tipsText}>
            Weekly Financial Tips{'\n'}
            <Text style={{ color: colors.muted }}>One short article per week!</Text>
          </Text>
          <Toggle value={weeklyTips} onChange={setWeeklyTips} />
        </View>
      </ScrollView>
      <PrimaryButton
        label={edit ? 'Save' : 'Create Account'}
        onPress={() => {
          if (edit) return router.back();
          if (router.canDismiss()) router.dismissAll();
          router.replace('/home');
        }}
        style={{ marginBottom: insets.bottom + 6 }}
      />
    </KeyboardAvoidingView>
  );
}

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { paddingTop: 46, paddingHorizontal: 20, paddingBottom: 24 },
  title: { ...font('bold'), fontSize: 24, lineHeight: 29, color: colors.text },
  subtitle: { ...type.body14, lineHeight: 17, color: colors.muted, marginTop: 7, maxWidth: 338 },
  label: { ...type.body12, color: colors.black, marginLeft: 19, marginBottom: 4 },
  input: {
    ...type.body16,
    height: 51,
    marginHorizontal: 17,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: radius.xl,
    paddingHorizontal: 16,
  },
  tips: {
    marginTop: 25,
    marginHorizontal: 17,
    borderRadius: radius.xl,
    backgroundColor: colors.fill,
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tipsText: { ...type.body14, lineHeight: 18, color: colors.black },
});
