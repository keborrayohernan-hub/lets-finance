import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, designTop, font, type } from '../../src/theme';
import { PrimaryButton } from '../../src/components/ui';
import { OptionTile, StepBar } from '../../src/components/Onboarding';
import { AgeGroup, useAppState } from '../../src/state';

const AGES: AgeGroup[] = ['Under 16', '16–18', '19–24', '25+'];
const GOALS = [
  'To learn and educate myself',
  'Budget my money',
  'Saving up for a major purchase',
  'Pay back my debt',
  'To stop overspending',
  'To help my business grow',
];

/** Figma "Question 1" (4:285) */
export default function AgeQuestion() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { age, setAge, goals, toggleGoal } = useAppState();

  return (
    <View style={s.screen}>
      <StatusBar style="dark" />
      <View style={{ paddingTop: designTop(80, insets.top) }}>
        <StepBar step={1} />
      </View>
      <ScrollView contentContainerStyle={s.content}>
        <Text style={s.title}>How Old Are You?</Text>
        <Text style={s.subtitle}>
          Pick your age and depending on your answer, it changes how we talk about money with you!
        </Text>

        <View style={s.ageGrid}>
          {[0, 2].map((row) => (
            <View key={row} style={s.ageRow}>
              {AGES.slice(row, row + 2).map((a) => (
                <OptionTile key={a} size="age" label={a} selected={age === a} onPress={() => setAge(a)} />
              ))}
            </View>
          ))}
        </View>

        <Text style={[s.title, { marginTop: 50 }]}>What are your financial goals?</Text>
        <Text style={s.subtitle}>Pick all that applies</Text>

        <View style={s.goalGrid}>
          {[0, 2, 4].map((row) => (
            <View key={row} style={s.goalRow}>
              {GOALS.slice(row, row + 2).map((g) => (
                <OptionTile key={g} size="goal" label={g} selected={goals.includes(g)} onPress={() => toggleGoal(g)} />
              ))}
            </View>
          ))}
        </View>
      </ScrollView>
      <PrimaryButton
        label="Continue"
        onPress={() => {
          if (!age) setAge('16–18');
          router.push('/onboarding/bank');
        }}
        style={{ marginBottom: insets.bottom + 22, marginTop: 12 }}
      />
    </View>
  );
}

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { paddingHorizontal: 16, paddingTop: 46, paddingBottom: 12 },
  title: { ...font('bold'), fontSize: 24, lineHeight: 29, color: colors.text },
  subtitle: { ...type.body14, lineHeight: 17, color: colors.muted, marginTop: 7, maxWidth: 338 },
  ageGrid: { marginTop: 28, gap: 28, paddingHorizontal: 31 },
  ageRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 20 },
  goalGrid: { marginTop: 36, gap: 38, paddingHorizontal: 4 },
  goalRow: { flexDirection: 'row', gap: 19 },
});
