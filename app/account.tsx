import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, designTop, type } from '../src/theme';
import { useAppState } from '../src/state';
import { BackTitle, SecondaryButton } from '../src/components/ui';
import { PersonIcon } from '../src/components/Icon';

/** Figma "Account" (155:4602 Sofia, 172:4870 Ethan) */
export default function Account() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { persona, fullName, email } = useAppState();
  const name = fullName.trim().split(' ')[0] || persona.name;

  const fields = [
    ['Email', email.trim() || persona.email],
    ['Date of Birth', persona.dob],
    ['Gender', persona.gender],
    ['Country', persona.country],
  ];

  return (
    <View style={s.screen}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={{ paddingTop: designTop(111, insets.top), paddingHorizontal: 20, paddingBottom: 40 }}>
        <BackTitle title="Account Info" style={{ marginLeft: 2 }} />

        <View style={s.profile}>
          <View style={s.avatar}>
            <PersonIcon />
          </View>
          <View>
            <Text style={type.title24}>{name}</Text>
            <Text style={[type.body14, { color: colors.muted }]}>Member since {persona.memberSince}</Text>
          </View>
        </View>

        <Text style={[type.header16, { marginTop: 41 }]}>Profile</Text>
        {fields.map(([label, value], i) => (
          <View key={label} style={[s.field, { marginTop: i === 0 ? 28 : i >= 2 ? 46 : 33 }]}>
            <Text style={[type.body14, { color: colors.black }]}>{label}</Text>
            <Text style={[type.body12, { color: colors.black, marginTop: 15 }]}>{value}</Text>
          </View>
        ))}

        <View style={{ gap: 25, marginTop: 64 }}>
          <SecondaryButton label="Edit Profile" height={49} onPress={() => router.push('/onboarding/account?edit=1')} />
          <SecondaryButton label="Settings" height={48} onPress={() => router.push('/settings')} />
        </View>
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  profile: { flexDirection: 'row', alignItems: 'center', gap: 18, marginTop: 31 },
  avatar: { width: 51, height: 53, borderRadius: 27, backgroundColor: colors.fill, alignItems: 'center', justifyContent: 'center' },
  field: { borderBottomWidth: 1, borderBottomColor: colors.divider, paddingBottom: 6 },
});
