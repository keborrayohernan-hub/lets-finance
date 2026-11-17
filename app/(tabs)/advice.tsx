import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, designTop, radius, type } from '../../src/theme';
import { images } from '../../src/images';
import { adviceCards, adviceIntro } from '../../src/data/content';

/** Figma "Advice" (143:4367) – opened from the Budget screen's overspending bubble. */
export default function Advice() {
  const insets = useSafeAreaInsets();
  const rows = [0, 2, 4].map((i) => adviceCards.slice(i, i + 2));

  return (
    <View style={s.screen}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={{ paddingTop: designTop(111, insets.top), paddingHorizontal: 16, paddingBottom: 40 }}>
        <Text style={type.title24}>Advice</Text>
        <Text style={[type.header16, { color: colors.muted, marginTop: 3, maxWidth: 398 }]}>{adviceIntro}</Text>

        <View style={s.grid}>
          {rows.map((row, ri) => (
            <View key={ri} style={s.row}>
              {row.map((c) => (
                <View key={c.text} style={s.card}>
                  <Image source={images[c.image]} style={s.image} resizeMode="cover" />
                  <Text style={[type.body12, s.text]}>{c.text}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.white },
  grid: { marginTop: 44, gap: 49, paddingHorizontal: 2 },
  row: { flexDirection: 'row', gap: 19 },
  card: { flex: 1, height: 189, borderRadius: radius.xl, backgroundColor: colors.fill, overflow: 'hidden' },
  image: { width: '100%', height: 92 },
  text: { paddingHorizontal: 12, paddingTop: 14 },
});
