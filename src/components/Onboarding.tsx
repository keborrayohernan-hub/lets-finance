import React from 'react';
import { Pressable, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { colors, radius, type } from '../theme';

/** Three 4 pt progress segments at the top of each onboarding question. */
export function StepBar({ step }: { step: 1 | 2 | 3 }) {
  return (
    <View style={s.steps}>
      {[1, 2, 3].map((i) => (
        <View key={i} style={[s.step, { backgroundColor: i <= step ? colors.progress : colors.track }]} />
      ))}
    </View>
  );
}

/** Grey option tile (age buttons are 158 × 51, goal buttons 185 × 79). Selected = brand teal. */
export function OptionTile({
  label,
  selected,
  onPress,
  size,
  style,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
  size: 'age' | 'goal';
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      onPress={onPress}
      style={[size === 'age' ? s.age : s.goal, selected && s.selected, style]}
    >
      <Text style={[size === 'age' ? type.header16 : type.header14, s.label, selected && { color: colors.white }]}>
        {label}
      </Text>
    </Pressable>
  );
}

const s = StyleSheet.create({
  steps: { flexDirection: 'row', gap: 8, paddingHorizontal: 16 },
  step: { flex: 1, height: 4, borderRadius: 2 },
  age: {
    flex: 1,
    maxWidth: 158,
    height: 51,
    borderRadius: radius.xl,
    backgroundColor: colors.fill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  goal: {
    flex: 1,
    height: 79,
    borderRadius: radius.xl,
    backgroundColor: colors.fill,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 23,
  },
  selected: { backgroundColor: colors.brand },
  label: { textAlign: 'center' },
});
