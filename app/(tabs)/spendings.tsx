import React, { useState } from 'react';
import { LayoutAnimation, Platform, Pressable, ScrollView, StyleSheet, Text, UIManager, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, designTop, font, radius, type } from '../../src/theme';
import { spendingCategories } from '../../src/data/content';
import { Icon } from '../../src/components/Icon';
import { TealHeader } from '../../src/components/TealHeader';

if (Platform.OS === 'android') UIManager.setLayoutAnimationEnabledExperimental?.(true);

/** Figma "Spendings" (114:1810) – each category opens to show where the money went. */
export default function Spendings() {
  const insets = useSafeAreaInsets();
  const [open, setOpen] = useState<string | null>(null);

  const toggle = (title: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpen((cur) => (cur === title ? null : title));
  };

  return (
    <View style={s.screen}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
        <TealHeader designHeight={210} />
        <View style={{ paddingTop: designTop(111, insets.top), paddingHorizontal: 16 }}>
          <Text style={[type.title24, { color: colors.white }]}>Spendings</Text>
          <Text style={[type.header16, { color: colors.white, marginTop: 3, maxWidth: 290 }]}>
            Check on how much you were spending this week
          </Text>
        </View>

        <View style={s.list}>
          {spendingCategories.map((c) => {
            const isOpen = open === c.title;
            return (
              <View key={c.title} style={{ gap: 4 }}>
                <Pressable
                  accessibilityRole="button"
                  accessibilityState={{ expanded: isOpen }}
                  onPress={() => toggle(c.title)}
                  style={s.category}
                >
                  <Icon name={c.icon} />
                  <View style={{ flex: 1 }}>
                    <Text style={type.header16}>{c.title}</Text>
                    <Text style={[type.body12, { lineHeight: 16 }]}>{c.total}</Text>
                  </View>
                  <View style={isOpen && { transform: [{ rotate: '180deg' }] }}>
                    <Icon name="arrowDown" />
                  </View>
                </Pressable>
                {isOpen && (
                  <View>
                    {c.items.map((it) => (
                      <View key={it.name} style={s.item}>
                        <Text style={[type.header16, { flex: 1 }]}>{it.name}</Text>
                        <Text style={[type.body14, s.itemAmount]}>{it.amount}</Text>
                      </View>
                    ))}
                  </View>
                )}
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.white },
  list: { marginTop: 44, gap: 24, alignSelf: 'center', width: '100%', maxWidth: 324 + 32, paddingHorizontal: 16 },
  category: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 16,
    borderRadius: radius.large,
    backgroundColor: colors.fill,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: colors.fill,
  },
  itemAmount: { ...font('regular'), color: colors.black, minWidth: 47, textAlign: 'right' },
});
