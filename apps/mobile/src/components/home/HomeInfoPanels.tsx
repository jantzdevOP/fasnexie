/** Emotional Context: BELONGING */
import { ScrollView, Text, View, StyleSheet } from 'react-native';
import { colors } from '@/lib/theme/colors';
import { typography } from '@/lib/theme/typography';

export function AboutPanel() {
  return (
    <ScrollView contentContainerStyle={styles.pad} showsVerticalScrollIndicator={false}>
      <Text style={styles.h1}>About FasNexi</Text>
      <Text style={styles.body}>
        FasNexi is a social operating system for fashion — discovery, identity,
        aspiration, and commerce in one premium experience. Rooted in culture,
        styled by intelligence. Built in Lagos for the world.
      </Text>
      <Text style={styles.h2}>Our promise</Text>
      <Text style={styles.body}>
        Powered by Culture. Styled by Intelligence. Every feature is designed to
        make you feel seen, belonging, and empowered — while creators and vendors
        grow with the platform.
      </Text>
      <Text style={styles.h2}>The 3Bs</Text>
      <Text style={styles.body}>
        Brand, Business, and Brand Experience stay in synchrony: every touchpoint
        has a feeling, every price tells a story, every metric measures a
        relationship.
      </Text>
    </ScrollView>
  );
}

export function FeaturesPanel() {
  const items = [
    {
      t: 'Style DNA',
      d: 'A ceremony of self-discovery that powers personalisation across the app.',
    },
    {
      t: 'Digital Wardrobe',
      d: 'Your treasury of self — gap analysis, “You already own X”, fewer returns.',
    },
    {
      t: 'Nexi AI',
      d: 'Context-aware styling that learns your taste and wardrobe.',
    },
    {
      t: 'Cultural Feed',
      d: 'Tips, designers, drops, and stories ranked for your Style DNA.',
    },
    {
      t: 'Shop the Look',
      d: 'Frictionless path from inspiration to purchase.',
    },
    {
      t: 'Creator economy',
      d: 'Storefronts, challenges, and commissions aligned with empowerment.',
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.pad} showsVerticalScrollIndicator={false}>
      <Text style={styles.h1}>Features</Text>
      {items.map((item) => (
        <View key={item.t} style={styles.card}>
          <Text style={styles.cardTitle}>{item.t}</Text>
          <Text style={styles.body}>{item.d}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

export function FaqPanel() {
  const faqs = [
    {
      q: 'What is FasNexi?',
      a: 'A fashion ecosystem to discover looks, build a digital wardrobe, and shop — powered by culture and AI styling.',
    },
    {
      q: 'Is it free to join?',
      a: 'Yes. Core discovery, Style DNA, and a free wardrobe tier are free. Pro styling is optional.',
    },
    {
      q: 'How do creators earn?',
      a: 'Creators tag products in looks and earn affiliate commissions when their audience shops those pieces.',
    },
    {
      q: 'Where do you ship?',
      a: 'We start with Nigeria and expand across Africa and the diaspora, with multi-currency and mobile money.',
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.pad} showsVerticalScrollIndicator={false}>
      <Text style={styles.h1}>FAQs</Text>
      {faqs.map((f) => (
        <View key={f.q} style={styles.card}>
          <Text style={styles.cardTitle}>{f.q}</Text>
          <Text style={styles.body}>{f.a}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  pad: {
    paddingBottom: 40,
    gap: 12,
  },
  h1: {
    color: colors.accentGold,
    fontSize: 24,
    fontFamily: typography.families.displayBold,
    marginBottom: 4,
  },
  h2: {
    color: colors.textPrimary,
    fontSize: 16,
    fontFamily: typography.families.bodyMedium,
    marginTop: 12,
  },
  body: {
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 22,
    fontFamily: typography.families.body,
  },
  card: {
    backgroundColor: colors.surfaceCard,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    borderRadius: 12,
    padding: 14,
    gap: 6,
  },
  cardTitle: {
    color: colors.textPrimary,
    fontSize: 15,
    fontFamily: typography.families.bodyMedium,
  },
});