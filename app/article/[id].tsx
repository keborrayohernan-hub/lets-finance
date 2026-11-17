import React from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, DESIGN_STATUS_BAR, font, type } from '../../src/theme';
import { images } from '../../src/images';
import { articles } from '../../src/data/content';
import { Icon } from '../../src/components/Icon';
import { PrimaryButton } from '../../src/components/ui';

/** Figma article pages ("beginner article", "401(K) article", … 7 in total). */
export default function ArticleScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const a = articles[id ?? ''] ?? articles.beginner;
  const headerHeight = 287 - DESIGN_STATUS_BAR + insets.top;

  return (
    <View style={s.screen}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={{ paddingBottom: insets.bottom + 40 }}>
        <View style={{ height: headerHeight, overflow: 'hidden' }}>
          <Image source={images[a.image]} style={{ width: '100%', height: headerHeight }} resizeMode="cover" />
          <Pressable accessibilityLabel="Back" hitSlop={12} onPress={() => router.back()} style={s.back}>
            <Icon name="back" color={colors.black} size={20} />
            <Text style={[type.body14, { color: colors.black }]}>Back</Text>
          </Pressable>
        </View>

        <View style={s.body}>
          <Text style={[type.title24, { marginTop: 44 }]}>{a.title}</Text>
          <Text style={[type.body12, { color: colors.black, marginTop: 14 }]}>Written by {a.author}</Text>

          <View style={{ marginTop: 20 }}>
            {a.blocks.map((b, i) =>
              b.type === 'h' ? (
                <Text key={i} style={[b.size >= 24 ? type.title24 : type.header18, s.heading]}>
                  {b.text}
                </Text>
              ) : (
                <Text key={i} style={s.paragraph}>
                  {b.segments.map((sg, j) => (
                    <Text key={j} style={sg.b ? font('bold') : undefined}>
                      {sg.t}
                    </Text>
                  ))}
                </Text>
              ),
            )}
          </View>

          <Text style={[type.header16, s.quizPrompt]}>Let’s test what you’ve learned so far! Take this quiz to find out</Text>
          <PrimaryButton label="Take the Quiz" onPress={() => router.push(`/quiz/${a.quiz}`)} style={{ height: 54, marginTop: 12 }} />
        </View>
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.white },
  back: { position: 'absolute', left: 8, bottom: 4, flexDirection: 'row', alignItems: 'center', gap: 2, padding: 4 },
  body: { paddingHorizontal: 20 },
  heading: { marginTop: 18, marginBottom: 4 },
  paragraph: { ...type.body12, marginTop: 14 },
  quizPrompt: { marginTop: 48, textAlign: 'center', paddingHorizontal: 19 },
});
