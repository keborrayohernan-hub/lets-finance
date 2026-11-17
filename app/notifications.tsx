import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, designTop, type } from '../src/theme';
import { BackTitle, Toggle } from '../src/components/ui';
import { notificationKeys, useAppState } from '../src/state';

/** Figma "Settings → Notifications" (175:5279 / 4023:2905) */
export default function Notifications() {
  const insets = useSafeAreaInsets();
  const { notifications, toggleNotification } = useAppState();

  return (
    <View style={s.screen}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={{ paddingTop: designTop(111, insets.top), paddingHorizontal: 20, paddingBottom: 40 }}>
        <BackTitle title="Notifications" style={{ marginLeft: 2 }} />
        <View style={{ marginTop: 61 }}>
          {notificationKeys.map((k, i) => (
            <View key={k} style={[s.row, i > 0 && { marginTop: 26 }]}>
              <Text style={[type.header16, { marginBottom: 2 }]}>{k}</Text>
              <Toggle value={notifications[k]} onChange={() => toggleNotification(k)} />
            </View>
          ))}
        </View>
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
    paddingRight: 9,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
});
