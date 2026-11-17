import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, designTop, type } from '../src/theme';
import { BackTitle, SecondaryButton } from '../src/components/ui';
import { Icon } from '../src/components/Icon';

/** Figma "Settings" (163:4757 / 2212:3358) */
export default function Settings() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const rows: { label: string; value?: string; onPress?: () => void }[] = [
    { label: 'Currency', value: 'USD' },
    { label: 'Language', value: 'English' },
    { label: 'Appearance', value: 'Light Mode' },
    { label: 'Notifications', onPress: () => router.push('/notifications') },
    { label: 'Password Change', value: 'Off' },
    { label: 'Face ID Lock', value: 'Off' },
  ];

  return (
    <View style={s.screen}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={{ paddingTop: designTop(111, insets.top), paddingHorizontal: 20, paddingBottom: 40 }}>
        <BackTitle title="Settings" style={{ marginLeft: 2 }} />
        <View style={{ marginTop: 80 }}>
          {rows.map((r, i) => (
            <Pressable key={r.label} disabled={!r.onPress} onPress={r.onPress} style={[s.row, i > 0 && { marginTop: 47 }]}>
              <Text style={type.header16}>{r.label}</Text>
              {r.value ? (
                <Text style={[type.body16, { color: colors.black }]}>{r.value}</Text>
              ) : (
                <Icon name="forward" color="#1C1B1F" />
              )}
            </Pressable>
          ))}
        </View>
        <SecondaryButton label="Sign Out" height={49} onPress={() => {
            if (router.canDismiss()) router.dismissAll();
            router.replace('/');
          }} style={{ marginTop: 160 }} />
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingBottom: 6,
    paddingRight: 17,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
});
