import React from 'react';
import { Image, Pressable, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { useRouter } from 'expo-router';
import { colors, font, radius, type } from '../theme';
import { images } from '../images';
import { formatAmount, Transaction } from '../data/personas';
import { Icon } from './Icon';

/** Teal "Continue" / "Create Account" button – 270 × 40, radius 15 (Figma "Frame 43"). */
export function PrimaryButton({
  label,
  onPress,
  dark = false,
  style,
}: {
  label: string;
  onPress: () => void;
  /** Question 2 uses dark text on the teal button; the rest use white. */
  dark?: boolean;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [s.primary, pressed && s.pressed, style]}>
      <Text style={[s.primaryLabel, dark && { color: colors.text }]}>{label}</Text>
    </Pressable>
  );
}

/** Grey secondary button ("Back", "Edit Profile", "Sign Out") – 270 wide. */
export function SecondaryButton({
  label,
  onPress,
  height = 40,
  style,
}: {
  label: string;
  onPress: () => void;
  height?: number;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [s.secondary, { height }, pressed && s.pressed, style]}>
      <Text style={[type.header16, { color: colors.black }]}>{label}</Text>
    </Pressable>
  );
}

/** Salmon "Needs Attention" pill – 108 × 20. */
export function NeedsAttention({ style }: { style?: StyleProp<ViewStyle> }) {
  return (
    <View style={[s.attention, style]}>
      <Text style={type.label11}>Needs Attention</Text>
    </View>
  );
}

/** Back chevron + title row used on Account, Settings, Notifications. */
export function BackTitle({ title, style }: { title: string; style?: StyleProp<ViewStyle> }) {
  const router = useRouter();
  return (
    <View style={[s.backTitle, style]}>
      <Pressable hitSlop={12} onPress={() => router.back()} style={s.backBtn}>
        <Icon name="back" color="#1C1B1F" />
      </Pressable>
      <Text style={type.title24}>{title}</Text>
    </View>
  );
}

/** Rounded grey transaction row – 389 wide, padding 15, 46 pt logo. */
export function TransactionRow({ tx, style }: { tx: Transaction; style?: StyleProp<ViewStyle> }) {
  const positive = tx.amount > 0;
  return (
    <View style={[s.txRow, style]}>
      {tx.logo ? (
        <View style={s.logoWrap}>
          <Image source={images[tx.logo]} style={s.logo} resizeMode="cover" />
        </View>
      ) : (
        <View style={[s.logoWrap, { alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent' }]}>
          <Icon name="money" color={colors.text} />
        </View>
      )}
      <View style={{ flexShrink: 1 }}>
        <Text style={[type.header16, { lineHeight: 18, color: colors.black }]} numberOfLines={1}>
          {tx.merchant}
        </Text>
        <Text style={[type.body12, { color: colors.muted, lineHeight: 17 }]}>{tx.date}</Text>
      </View>
      <Text style={[type.header18, s.txAmount, { color: positive ? colors.success : colors.attention }]}>
        {formatAmount(tx.amount)}
      </Text>
    </View>
  );
}

/** Simple on/off switch drawn like the Figma toggle (64 × 37, teal track, white knob). */
export function Toggle({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) {
  return (
    <Pressable
      accessibilityRole="switch"
      accessibilityState={{ checked: value }}
      onPress={() => onChange(!value)}
      style={[s.toggle, { backgroundColor: value ? colors.brand : colors.track }]}
    >
      <View style={[s.knob, value ? { right: 6 } : { left: 6 }]} />
    </Pressable>
  );
}

export function Row({ children, style }: { children: React.ReactNode; style?: StyleProp<ViewStyle> }) {
  return <View style={[{ flexDirection: 'row' }, style]}>{children}</View>;
}

const s = StyleSheet.create({
  pressed: { opacity: 0.8 },
  primary: {
    width: 270,
    height: 40,
    borderRadius: radius.button,
    backgroundColor: colors.brand,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  primaryLabel: { ...font('bold'), fontSize: 16, lineHeight: 20, color: colors.white },
  secondary: {
    width: 270,
    borderRadius: radius.button,
    backgroundColor: colors.fill,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  attention: {
    width: 108,
    height: 20,
    borderRadius: radius.pill,
    backgroundColor: colors.attention,
    justifyContent: 'center',
    paddingLeft: 11,
  },
  backTitle: { flexDirection: 'row', alignItems: 'center', gap: 24 },
  backBtn: { width: 24, height: 24 },
  txRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    padding: 15,
    borderRadius: radius.xl,
    backgroundColor: colors.fill,
  },
  logoWrap: { width: 46, height: 46, borderRadius: 23, overflow: 'hidden', backgroundColor: colors.white },
  logo: { width: 46, height: 46 },
  txAmount: { flex: 1, textAlign: 'right' },
  toggle: { width: 64, height: 37, borderRadius: 18.5, justifyContent: 'center' },
  knob: { position: 'absolute', width: 26, height: 28, borderRadius: 14, backgroundColor: colors.white },
});
