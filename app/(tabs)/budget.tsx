import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, designTop, radius, type } from '../../src/theme';
import { budgetGroups, paycheck } from '../../src/data/content';

const money = (n: number) => `$${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
const SEGMENT_COLORS = [colors.brand, colors.brand60, colors.brand30];

/** Figma "Budget" (4003:2443) */
export default function Budget() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const totals = budgetGroups.map((g) => g.lines.reduce((sum, l) => sum + l.amount, 0));
  const grand = totals.reduce((a, b) => a + b, 0);
  const pct = (n: number) => Math.round((n / grand) * 100);

  return (
    <View style={s.screen}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={{ paddingTop: designTop(103, insets.top), paddingBottom: 40 }}>
        {/* Advice prompt bubble (Figma "Component 5") */}
        <Pressable onPress={() => router.push('/advice')} style={({ pressed }) => [s.bubble, pressed && { opacity: 0.8 }]}>
          <Text style={type.body12}>Seems like you’ve been overspending again: Here’s some advice to help!</Text>
        </Pressable>

        <View style={{ paddingHorizontal: 20 }}>
          <Text style={[type.title24, { marginTop: -8, marginLeft: -1 }]}>Budget</Text>
          <Text style={[type.header16, s.subtitle]}>Your paycheck came in! Here’s some recommendations for your budget!</Text>

          {/* Paycheck split card (Figma "Frame 111") */}
          <View style={s.paycheck}>
            <Text style={type.body14}>{paycheck.employer}</Text>
            <Text style={[type.title24, { marginTop: 5 }]}>{money(paycheck.amount)}</Text>
            <View style={s.splitLabels}>
              {budgetGroups.map((g, i) => (
                <Text key={g.title} style={[type.header14, { color: colors.black }]}>
                  {g.title} – {pct(totals[i])}%
                </Text>
              ))}
            </View>
            <View style={s.splitBar}>
              {budgetGroups.map((g, i) => (
                <View key={g.title} style={{ flex: totals[i], backgroundColor: SEGMENT_COLORS[i] }} />
              ))}
            </View>
          </View>

          <Text style={[type.header16, s.subtitle, { marginTop: 29 }]}>Here is where your paycheck would go!</Text>

          {budgetGroups.map((g, gi) => (
            <View key={g.title} style={{ marginTop: gi === 0 ? 32 : 27 }}>
              <Text style={type.header18}>
                {g.title} – {money(totals[gi])}
              </Text>
              {g.lines.map((l) => {
                const share = l.amount / totals[gi];
                return (
                  <View key={l.label} style={s.line}>
                    <View style={s.lineTop}>
                      <Text style={[type.header14, { color: colors.black }]}>{l.label}</Text>
                      <Text style={[type.body14, { color: colors.black }]}>{money(l.amount)}</Text>
                    </View>
                    <View style={s.lineTrack}>
                      <View style={[s.lineFill, { width: `${share * 100}%` }]} />
                    </View>
                    <Text style={[type.body12, { color: colors.muted, marginTop: 6 }]}>
                      {(share * 100).toFixed(1)}% of {g.title.toLowerCase()}
                    </Text>
                  </View>
                );
              })}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  bubble: {
    alignSelf: 'flex-end',
    width: 249,
    minHeight: 71,
    borderTopLeftRadius: radius.large,
    borderBottomLeftRadius: radius.large,
    backgroundColor: colors.fill,
    paddingLeft: 13,
    paddingRight: 22,
    justifyContent: 'center',
  },
  subtitle: { color: colors.muted, marginTop: 13, maxWidth: 338 },
  paycheck: {
    marginTop: 16,
    height: 170,
    borderRadius: radius.xl,
    backgroundColor: colors.fill,
    paddingTop: 25,
    paddingHorizontal: 13,
  },
  splitLabels: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 14, marginHorizontal: 1 },
  splitBar: { flexDirection: 'row', height: 14, borderRadius: 8, overflow: 'hidden', marginTop: 6, marginHorizontal: -4 },
  line: { marginTop: 15 },
  lineTop: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 5 },
  lineTrack: { height: 14, borderRadius: 7, backgroundColor: colors.fill, marginTop: 6, overflow: 'hidden' },
  lineFill: { height: 14, borderRadius: 7, backgroundColor: colors.brand },
});
