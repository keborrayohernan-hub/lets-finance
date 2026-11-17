import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, designTop, radius, type } from '../../../src/theme';
import { quizzes } from '../../../src/data/content';
import { PrimaryButton } from '../../../src/components/ui';

const LETTERS = ['A', 'B', 'C', 'D'];

/** Figma "quiz 1" … "quiz 7" – one quiz per article. Tap a letter to answer. */
export default function QuizScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  // A fresh quiz (and fresh answers) for each article.
  return <Quiz key={id ?? '0'} id={id ?? '0'} />;
}

function Quiz({ id }: { id: string }) {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const questions = quizzes[Number(id) || 0] ?? quizzes[0];
  const [picked, setPicked] = useState<Record<number, number[]>>({});

  const answered = (qi: number) => {
    const q = questions[qi];
    const p = picked[qi] ?? [];
    return q.answer.length > 1 ? q.answer.every((a) => p.includes(a)) || p.some((x) => !q.answer.includes(x)) : p.length > 0;
  };
  const score = useMemo(
    () =>
      questions.reduce((n, q, qi) => {
        const p = picked[qi] ?? [];
        return n + (p.length === q.answer.length && q.answer.every((a) => p.includes(a)) ? 1 : 0);
      }, 0),
    [picked, questions],
  );
  const done = questions.every((_, qi) => answered(qi));

  const pick = (qi: number, oi: number) => {
    const q = questions[qi];
    if (answered(qi)) return;
    setPicked((cur) => ({ ...cur, [qi]: q.answer.length > 1 ? [...(cur[qi] ?? []), oi] : [oi] }));
  };

  return (
    <View style={s.screen}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={{ paddingTop: designTop(111, insets.top), paddingHorizontal: 20, paddingBottom: 40 }}>
        <Text style={[type.title24, { color: colors.brand }]}>QUIZ</Text>
        <Text style={[type.header16, { color: colors.muted, marginTop: 3, maxWidth: 338 }]}>
          Let’s test your knowledge on how much you learned from this article!
        </Text>

        {questions.map((q, qi) => {
          const p = picked[qi] ?? [];
          const reveal = answered(qi);
          return (
            <View key={qi} style={{ marginTop: qi === 0 ? 32 : 38 }}>
              <Text style={[type.header16, { maxWidth: 356 }]}>
                {qi + 1}.) {q.question}
              </Text>
              <View style={{ marginTop: 22, gap: 24 }}>
                {q.options.map((o, oi) => {
                  const chosen = p.includes(oi);
                  const correct = q.answer.includes(oi);
                  const bg = chosen ? (correct ? colors.success : colors.attention) : reveal && correct ? colors.successSoft : colors.fill;
                  const fg = bg === colors.fill ? colors.text : colors.white;
                  return (
                    <Pressable key={oi} onPress={() => pick(qi, oi)} style={s.option}>
                      <View style={[s.letter, { backgroundColor: bg }]}>
                        <Text style={[type.title24, { color: fg }]}>{LETTERS[oi]}</Text>
                      </View>
                      <Text style={[type.body16, { color: colors.muted, flex: 1 }]}>{o}</Text>
                    </Pressable>
                  );
                })}
              </View>
              {q.answer.length > 1 && !reveal && (
                <Text style={[type.body12, { color: colors.muted, marginTop: 8 }]}>Select all that apply.</Text>
              )}
            </View>
          );
        })}

        {done && (
          <View style={s.result}>
            <Text style={type.header18}>
              You got {score} out of {questions.length} right!
            </Text>
            <PrimaryButton label="Back to Learn" onPress={() => router.navigate('/learn')} style={{ marginTop: 16 }} />
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  option: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingLeft: 11 },
  letter: {
    minWidth: 45,
    height: 42,
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: radius.circular,
    alignItems: 'center',
    justifyContent: 'center',
  },
  result: { marginTop: 40, alignItems: 'center' },
});
