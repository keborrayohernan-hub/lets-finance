import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, designTop, type } from '../../src/theme';
import { useAppState } from '../../src/state';
import { TransactionRow } from '../../src/components/ui';
import { Icon } from '../../src/components/Icon';
import { TealHeader } from '../../src/components/TealHeader';

/** Figma "Sofia's transactions" (2129:1854) and "Ethan's transactions" (2112:1600) */
export default function Transactions() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { persona } = useAppState();

  return (
    <View style={s.screen}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
        <TealHeader designHeight={293} />
        <View style={{ paddingTop: designTop(87, insets.top), paddingHorizontal: 20 }}>
          <Pressable accessibilityLabel="Back" hitSlop={12} onPress={() => router.back()} style={{ marginLeft: -3, width: 24 }}>
            <Icon name="back" color={colors.white} />
          </Pressable>
          <Text style={[type.title24, { color: colors.white, marginTop: 0 }]}>Transactions</Text>
          <Text style={[type.header16, { color: colors.white, marginTop: 3, maxWidth: 338 }]}>
            Your paycheck came in! Here’s some recommendations for your budget!
          </Text>

          {persona.transactionGroups.map((g, gi) => (
            <View key={g.title} style={{ marginTop: gi === 0 ? 45 : 18 }}>
              <Text style={[type.header14, s.groupTitle]}>{g.title}</Text>
              <View style={{ gap: 10 }}>
                {g.items.map((tx) => (
                  <TransactionRow key={tx.merchant + tx.date} tx={tx} />
                ))}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  groupTitle: { color: colors.muted, marginBottom: 11, marginLeft: 1 },
});
