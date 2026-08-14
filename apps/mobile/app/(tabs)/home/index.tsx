/** Emotional Context: ASPIRATION + BELONGING */
import { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { SegmentTabs } from '@/components/ui/SegmentTabs';
import { HomeMarketing } from '@/components/home/HomeMarketing';
import {
  AboutPanel,
  FeaturesPanel,
  FaqPanel,
} from '@/components/home/HomeInfoPanels';
import { colors } from '@/lib/theme/colors';
import { typography } from '@/lib/theme/typography';

const HOME_TABS = ['Home', 'About', 'Features', 'FAQs'] as const;
type HomeTab = (typeof HOME_TABS)[number];

export default function HomeScreen() {
  const [tab, setTab] = useState<HomeTab>('Home');

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.logo}>
          FASNEX<Text style={styles.logoAccent}>I</Text>
        </Text>
        <Text style={styles.tagline}>Express · Inspire · Shop Fashion</Text>
      </View>

      <SegmentTabs
        tabs={[...HOME_TABS]}
        active={tab}
        onChange={(t) => setTab(t as HomeTab)}
      />

      <View style={styles.body}>
        {tab === 'Home' && <HomeMarketing />}
        {tab === 'About' && <AboutPanel />}
        {tab === 'Features' && <FeaturesPanel />}
        {tab === 'FAQs' && <FaqPanel />}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.primaryBlack,
    paddingHorizontal: 16,
  },
  header: {
    paddingTop: 4,
    paddingBottom: 4,
  },
  logo: {
    color: colors.textPrimary,
    fontSize: 20,
    letterSpacing: 1,
    fontFamily: typography.families.bodyMedium,
  },
  logoAccent: {
    color: colors.accentGold,
  },
  tagline: {
    color: colors.textSecondary,
    fontSize: 11,
    marginTop: 2,
  },
  body: {
    flex: 1,
  },
});
