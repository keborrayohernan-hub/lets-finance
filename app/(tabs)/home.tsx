import React from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, designTop, radius, type } from '../../src/theme';
import { images } from '../../src/images';
import { useAppState } from '../../src/state';
import { NeedsAttention, TransactionRow } from '../../src/components/ui';
import { ProfileButtonGraphic } from '../../src/components/Icon';
import { TealHeader } from '../../src/components/TealHeader';
import type { Persona } from '../../src/data/personas';

/** Figma "Sofia's Dashboard" (2102:1461) and "Ethan's Dashboard" (2098:1328) */
export default function Home() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { persona } = useAppState();
  const isEthan = persona.id === 'ethan';

  return (
    <View style={s.screen}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
        <TealHeader designHeight={293} />

        {/* Greeting + balance (header area) */}
        <View style={[s.greetingRow, { marginTop: designTop(104, insets.top) }]}>
          <Text style={[type.title36, { color: colors.white }]}>Hi {persona.name}!</Text>
          <Pressable accessibilityLabel="Account" hitSlop={8} onPress={() => router.push('/account')} style={{ marginTop: 4 }}>
            <ProfileButtonGraphic />
          </Pressable>
        </View>
        <View style={s.balanceCard}>
          <View style={s.balanceTop}>
            <Text style={type.header12}>Current Balance in total</Text>
            <NeedsAttention />
          </View>
          <View style={s.balanceBottom}>
            <Text style={type.title36}>{persona.totalBalance}</Text>
            <Text style={[type.header12, { marginBottom: 4 }]}>US Dollar</Text>
          </View>
        </View>

        <View style={s.body}>
          {isEthan ? (
            <>
              <UpcomingPayments persona={persona} />
              <Accounts persona={persona} style={{ marginTop: 18 }} />
              <Goal persona={persona} />
              <PaydayRow persona={persona} />
              <Recent persona={persona} onSeeAll={() => router.push('/transactions')} />
            </>
          ) : (
            <>
              <Accounts persona={persona} />
              <Goal persona={persona} />
              <Recent persona={persona} onSeeAll={() => router.push('/transactions')} />
              <PaydayRow persona={persona} onArticle={() => router.push('/article/beginner')} />
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

function SectionTitle({ children, right }: { children: string; right?: React.ReactNode }) {
  return (
    <View style={s.sectionTitle}>
      <Text style={type.header18}>{children}</Text>
      {right}
    </View>
  );
}

function UpcomingPayments({ persona }: { persona: Persona }) {
  return (
    <View style={{ marginTop: 51 }}>
      <SectionTitle>Upcoming Payments</SectionTitle>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.upcomingRow} style={s.bleed}>
        {persona.upcomingPayments?.map((p) => (
          <View key={p.name} style={s.upcomingCard}>
            <View style={s.upcomingLogo}>
              <Image source={images[p.logo]} style={{ width: 46, height: 46 }} resizeMode="contain" />
            </View>
            <Text style={[type.body12, { color: colors.muted, textAlign: 'center' }]}>{p.name}</Text>
            <Text style={[type.header18, { textAlign: 'center' }]}>{p.amount}</Text>
            <Text style={[type.body14, { color: colors.black, textAlign: 'center' }]}>{p.when}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

function Accounts({ persona, style }: { persona: Persona; style?: object }) {
  return (
    <View style={[{ marginTop: 51 }, style]}>
      <SectionTitle>Accounts</SectionTitle>
      <View style={s.twoUp}>
        {[
          ['Checking Account', persona.checking],
          ['Savings Account', persona.savings],
        ].map(([label, value]) => (
          <View key={label} style={s.accountCard}>
            <Text style={[type.header14, { color: colors.muted }]}>{label}</Text>
            <Text style={[type.title24, s.accountAmount]} numberOfLines={1} adjustsFontSizeToFit>
              {value}
            </Text>
            <NeedsAttention />
          </View>
        ))}
      </View>
    </View>
  );
}

function Goal({ persona }: { persona: Persona }) {
  const g = persona.goal;
  return (
    <View style={{ marginTop: 29 }}>
      <SectionTitle>Current Goal</SectionTitle>
      <View style={s.goalCard}>
        <View style={s.goalHeader}>
          <Text style={[type.header14, { color: colors.muted }]}>{g.title}</Text>
          <NeedsAttention />
        </View>
        <Text style={[type.title24, { marginTop: 1 }]}>{g.amount}</Text>
        <Text style={[type.header12, { color: colors.muted, marginTop: 7 }]}>{g.original}</Text>
        <View style={s.track}>
          <View style={[s.trackFill, { width: `${g.progress * 100}%` }]} />
        </View>
        <View style={s.goalFooter}>
          <Text style={type.body12}>{g.progressLabel}</Text>
          <Text style={type.body12}>{g.remainingLabel}</Text>
        </View>
      </View>
    </View>
  );
}

function Recent({ persona, onSeeAll }: { persona: Persona; onSeeAll: () => void }) {
  return (
    <View style={{ marginTop: 29 }}>
      <SectionTitle
        right={
          <Pressable hitSlop={10} onPress={onSeeAll}>
            <Text style={type.header12}>See All</Text>
          </Pressable>
        }
      >
        Recent Transactions
      </SectionTitle>
      <View style={{ gap: 10 }}>
        {persona.recentTransactions.map((tx) => (
          <TransactionRow key={tx.merchant + tx.date} tx={tx} />
        ))}
      </View>
    </View>
  );
}

function PaydayRow({ persona, onArticle }: { persona: Persona; onArticle?: () => void }) {
  return (
    <View style={[s.twoUp, { marginTop: 28 }]}>
      <View style={{ flex: 1 }}>
        <Text style={[type.header18, s.miniTitle]}>Payday</Text>
        <View style={[s.panel, { gap: 7 }]}>
          <Text style={[type.header14, { color: colors.muted }]}>{persona.employer}</Text>
          <Text style={[type.body12, { minHeight: 34 }]}>{persona.paydays[0]}</Text>
          <Text style={type.body12}>{persona.paydays[1]}</Text>
        </View>
      </View>
      <View style={{ flex: 1 }}>
        {persona.creditScore ? (
          <>
            <Text style={[type.header18, s.miniTitle]}>Credit Score</Text>
            <View style={[s.panel, { gap: 15 }]}>
              <View style={s.gauge}>
                <Image source={images.credit_gauge} style={s.gaugeImage} resizeMode="contain" />
                <View style={s.gaugeText}>
                  <Text style={[type.header16, { color: colors.black }]}>{persona.creditScore.range}</Text>
                  <Text style={[type.header12, { color: colors.black }]}>{persona.creditScore.label}</Text>
                </View>
              </View>
              <NeedsAttention />
            </View>
          </>
        ) : (
          <>
            <Text style={[type.header18, s.miniTitle]}>Article</Text>
            <Pressable onPress={onArticle} style={[s.panel, { alignItems: 'center', gap: 15 }]}>
              <Image source={images.dash_article} style={s.articleImage} resizeMode="cover" />
              <Text style={[type.body12, { alignSelf: 'stretch' }]}>We recommend you to read this article!</Text>
            </Pressable>
          </>
        )}
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  greetingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingLeft: 20,
    paddingRight: 35,
  },
  balanceCard: {
    marginTop: 11,
    marginHorizontal: 20,
    height: 118,
    borderRadius: radius.xl,
    backgroundColor: colors.white,
    paddingLeft: 12,
    paddingRight: 14,
    paddingTop: 16,
    paddingBottom: 11,
    justifyContent: 'space-between',
  },
  balanceTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  balanceBottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginLeft: -3 },
  body: { paddingHorizontal: 20 },
  sectionTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    paddingHorizontal: 2,
  },
  bleed: { marginHorizontal: -20 },
  upcomingRow: { gap: 16, paddingHorizontal: 20, paddingTop: 11 },
  upcomingCard: {
    width: 148,
    height: 166,
    borderRadius: radius.xl,
    backgroundColor: colors.fill,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingHorizontal: 15,
  },
  upcomingLogo: { width: 46, height: 46, borderRadius: 23, overflow: 'hidden', backgroundColor: colors.white },
  twoUp: { flexDirection: 'row', gap: 35 },
  accountCard: {
    flex: 1,
    borderRadius: radius.xl,
    backgroundColor: colors.fill,
    paddingVertical: 23,
    paddingHorizontal: 8,
    gap: 15,
  },
  accountAmount: { height: 42, lineHeight: 32 },
  goalCard: {
    height: 190,
    borderRadius: radius.xl,
    backgroundColor: colors.fill,
    paddingHorizontal: 9,
    paddingTop: 21,
  },
  goalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingRight: 6 },
  track: { marginTop: 17, height: 19, borderRadius: 8, backgroundColor: colors.secondary, marginRight: 15, overflow: 'hidden' },
  trackFill: { height: 19, borderRadius: 8, backgroundColor: colors.success },
  goalFooter: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 9, paddingLeft: 5, paddingRight: 33 },
  miniTitle: { marginBottom: 8, paddingLeft: 6 },
  panel: {
    height: 155,
    borderRadius: radius.xl,
    backgroundColor: colors.fill,
    paddingVertical: 23,
    paddingHorizontal: 8,
  },
  articleImage: { width: 137, height: 56 },
  gauge: { width: 154, height: 73, alignSelf: 'center' },
  gaugeImage: { width: 154, height: 73 },
  gaugeText: { position: 'absolute', top: 33, left: 0, right: 0, alignItems: 'center' },
});
