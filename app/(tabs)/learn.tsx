import React, { useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, designTop, font, radius, type } from '../../src/theme';
import { images } from '../../src/images';
import { ArticleCard, articleSections, featuredArticle, glossary } from '../../src/data/content';

type Mode = 'articles' | 'terms';

/** Figma "Article (Lets learn)" (2139:2048) and the glossary screens "A-C" … "R-W" */
export default function Learn() {
  const insets = useSafeAreaInsets();
  const [mode, setMode] = useState<Mode>('articles');

  return (
    <View style={s.screen}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={{ paddingTop: designTop(111, insets.top), paddingBottom: 40 }}>
        <View style={{ paddingHorizontal: 22 }}>
          <Text style={type.title24}>Let’s Learn!</Text>
          <Text style={[type.header16, s.subtitle]}>
            {mode === 'articles'
              ? 'Here are some articles to help you understand finances better.'
              : 'Here are some financial terms to help you familiarize with their meanings.'}
          </Text>
          <Segmented mode={mode} onChange={setMode} />
        </View>
        {mode === 'articles' ? <Articles /> : <Terms />}
      </ScrollView>
    </View>
  );
}

/** "Articles | Financial Terms" pill switch (342 × 51). */
function Segmented({ mode, onChange }: { mode: Mode; onChange: (m: Mode) => void }) {
  return (
    <View style={s.segment}>
      <View style={[s.segmentPill, mode === 'articles' ? { left: 0, width: 119 } : { right: 0, width: 203 }]} />
      <Pressable style={[s.segmentHit, { width: 119 }]} onPress={() => onChange('articles')}>
        <Text style={[type.header16, { color: mode === 'articles' ? colors.white : colors.black }]}>Articles</Text>
      </Pressable>
      <Pressable style={[s.segmentHit, { flex: 1 }]} onPress={() => onChange('terms')}>
        <Text style={[type.header16, { color: mode === 'terms' ? colors.white : colors.black }]}>Financial Terms</Text>
      </Pressable>
    </View>
  );
}

function Articles() {
  const router = useRouter();
  const open = (c: ArticleCard) => router.push(`/article/${c.articleId}`);
  return (
    <View style={{ paddingHorizontal: 20 }}>
      <Text style={[type.title24, s.sectionTitle, { marginTop: 24 }]}>Article of The Week!</Text>
      <Pressable onPress={() => open(featuredArticle)} style={s.featured}>
        <Image source={images[featuredArticle.image]} style={s.featuredImage} resizeMode="cover" />
        <Text style={[type.header14, { marginTop: 16 }]}>{featuredArticle.title}</Text>
        <Text style={[type.body12, { marginTop: 11 }]}>{featuredArticle.author}</Text>
      </Pressable>

      {articleSections.map((sec) => (
        <View key={sec.title}>
          <Text style={[type.title24, s.sectionTitle, { marginTop: 49 }]}>{sec.title}</Text>
          <View style={s.cardRow}>
            {sec.cards.map((c) => (
              <Pressable key={c.articleId} onPress={() => open(c)} style={s.card}>
                <Image source={images[c.image]} style={s.cardImage} resizeMode="cover" />
                <Text style={[type.header14, s.cardTitle]}>{c.title}</Text>
                <Text style={[type.label11, s.cardAuthor]}>{c.author}</Text>
              </Pressable>
            ))}
          </View>
        </View>
      ))}
    </View>
  );
}

function Terms() {
  const [range, setRange] = useState(0);
  const g = glossary[range];
  return (
    <View>
      <Text style={[type.title24, { marginTop: 27, paddingHorizontal: 20 }]}>Financial Terms!</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.chips}>
        {glossary.map((r, i) => (
          <Pressable key={r.range} onPress={() => setRange(i)} style={[s.chip, i === range && { backgroundColor: colors.brand }]}>
            <Text style={[s.chipLabel, i === range && { color: colors.white }]}>{r.range.replace('-', '–')}</Text>
          </Pressable>
        ))}
      </ScrollView>
      <View style={{ paddingHorizontal: 30 }}>
        {g.sections.map((sec) => (
          <View key={sec.letter} style={{ marginTop: 26 }}>
            <Text style={type.title24}>{sec.letter}</Text>
            {sec.terms.map((t) => (
              <View key={t.term} style={{ marginTop: 22, paddingLeft: 9 }}>
                <Text style={type.header16}>{t.term}</Text>
                <Text style={[type.body12, s.definition]}>{t.definition}</Text>
              </View>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.white },
  subtitle: { color: colors.muted, marginTop: 3, maxWidth: 338, minHeight: 36 },
  segment: {
    marginTop: 25,
    width: 342,
    maxWidth: '100%',
    height: 51,
    borderRadius: radius.circular,
    backgroundColor: colors.fill,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  segmentPill: { position: 'absolute', top: 0, bottom: 0, borderRadius: radius.circular, backgroundColor: colors.brand },
  segmentHit: { alignItems: 'center', justifyContent: 'center' },
  sectionTitle: { marginLeft: 3, marginBottom: 10 },
  featured: {
    width: 314,
    maxWidth: '100%',
    height: 221,
    marginTop: 11,
    borderRadius: radius.xl,
    backgroundColor: colors.fill,
    overflow: 'hidden',
    paddingHorizontal: 12,
  },
  featuredImage: { width: 314, height: 128, marginHorizontal: -12 },
  cardRow: { flexDirection: 'row', gap: 20 },
  card: { flex: 1, height: 190, borderRadius: radius.xl, backgroundColor: colors.fill, overflow: 'hidden' },
  cardImage: { width: '100%', height: 91 },
  cardTitle: { paddingHorizontal: 6, marginTop: 9 },
  cardAuthor: { color: colors.text, paddingHorizontal: 6, position: 'absolute', bottom: 22, left: 0, right: 0 },
  chips: { gap: 17, paddingHorizontal: 20, paddingTop: 29, paddingBottom: 4 },
  chip: { width: 98, height: 37, borderRadius: radius.circular, backgroundColor: colors.fill, alignItems: 'center', justifyContent: 'center' },
  chipLabel: { ...font('semibold'), fontSize: 14, color: colors.text },
  definition: { marginTop: 11, maxWidth: 360, lineHeight: 17 },
});
