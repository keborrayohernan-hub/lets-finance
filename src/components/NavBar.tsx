import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { colors, type } from '../theme';
import { Icon, IconName } from './Icon';

const TABS: { route: string; label: string; icon: IconName }[] = [
  { route: 'home', label: 'Home', icon: 'dashboard' },
  { route: 'learn', label: 'Learn', icon: 'learn' },
  { route: 'budget', label: 'Budget', icon: 'savings' },
  { route: 'spendings', label: 'Spendings', icon: 'money' },
];

/** Screens that live under a tab without having their own button. */
const PARENT_TAB: Record<string, string> = {
  advice: 'spendings',
  transactions: 'home',
  'quiz/[id]': 'learn',
};

/** Bottom nav bar (Figma "Nav Bar": 430 × 85, teal, 46 pt gaps, selected item in white). */
export function NavBar({ state, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const current = state.routes[state.index]?.name ?? 'home';
  const active = PARENT_TAB[current] ?? current;

  return (
    <View style={[s.bar, { paddingBottom: Math.max(insets.bottom, 28) - 6 }]}>
      {TABS.map((t) => {
        const selected = t.route === active;
        const tint = selected ? colors.white : colors.text;
        return (
          <Pressable
            key={t.route}
            accessibilityRole="tab"
            accessibilityState={{ selected }}
            onPress={() => navigation.navigate(t.route as never)}
            style={s.item}
          >
            <Icon name={t.icon} color={tint} />
            <Text style={[type.nav11, { color: tint }]}>{t.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const s = StyleSheet.create({
  bar: {
    backgroundColor: colors.brand,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: 46,
    paddingTop: 12,
    paddingHorizontal: 32,
  },
  item: { alignItems: 'center', gap: 1, minWidth: 46 },
});
