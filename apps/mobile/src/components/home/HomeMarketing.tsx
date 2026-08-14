/** Emotional Context: ASPIRATION + DISCOVERY */
import { useRef, type ReactNode } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  Animated,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { colors } from '@/lib/theme/colors';
import { typography } from '@/lib/theme/typography';
import { useHaptics } from '@/hooks/useHaptics';

const CATEGORIES = [
  {
    name: 'Streetwear',
    count: '2.5K Looks',
    img: 'https://images.unsplash.com/photo-1523381210412-45927fdbc866?w=400&q=80',
  },
  {
    name: 'Menswear',
    count: '1.8K Looks',
    img: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=400&q=80',
  },
  {
    name: 'Dresses',
    count: '3.2K Looks',
    img: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&q=80',
  },
  {
    name: 'Bags',
    count: '1.2K Looks',
    img: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&q=80',
  },
  {
    name: 'Sneakers',
    count: '2.7K Looks',
    img: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=400&q=80',
  },
  {
    name: 'Sustainable',
    count: '1.1K Looks',
    img: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&q=80',
  },
];

const LOOKS = [
  {
    id: 'look-1',
    user: '@styleby_ella',
    title: 'Winter Neutrals',
    likes: '2.5K',
    img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80',
  },
  {
    id: 'look-2',
    user: '@urbandollar',
    title: 'Green Street Energy',
    likes: '3.1K',
    img: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=600&q=80',
  },
  {
    id: 'look-3',
    user: '@its.bella.style',
    title: 'Pink Confidence',
    likes: '4.3K',
    img: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&q=80',
  },
  {
    id: 'look-4',
    user: '@retro.szn',
    title: 'Retro Vibes',
    likes: '1.9K',
    img: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80',
  },
];

function ScalePress({
  children,
  onPress,
  style,
}: {
  children: ReactNode;
  onPress: () => void;
  style?: object;
}) {
  const scale = useRef(new Animated.Value(1)).current;
  const { trigger } = useHaptics();

  return (
    <Pressable
      onPressIn={() => {
        Animated.spring(scale, {
          toValue: 0.97,
          useNativeDriver: true,
          friction: 6,
        }).start();
      }}
      onPressOut={() => {
        Animated.spring(scale, {
          toValue: 1,
          useNativeDriver: true,
          friction: 6,
        }).start();
      }}
      onPress={() => {
        trigger('curiosity').catch(() => undefined);
        onPress();
      }}
    >
      <Animated.View style={[{ transform: [{ scale }] }, style]}>
        {children}
      </Animated.View>
    </Pressable>
  );
}

export function HomeMarketing() {
  const router = useRouter();

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scroll}
    >
      <View style={styles.hero}>
        <Text style={styles.heroTitle}>
          Express.{'\n'}Inspire.{'\n'}
          <Text style={styles.heroAccent}>Shop Fashion.</Text>
        </Text>
        <Text style={styles.heroBody}>
          FasNexi is your ultimate fashion ecosystem. Discover looks, save your
          style, and shop the outfits you love — all in one place.
        </Text>
        <View style={styles.heroCtas}>
          <ScalePress
            onPress={() => router.push('/(tabs)/discover')}
            style={styles.btnPrimary}
          >
            <Text style={styles.btnPrimaryText}>Join FasNexi</Text>
          </ScalePress>
          <ScalePress
            onPress={() => router.push('/(tabs)/discover')}
            style={styles.btnGhost}
          >
            <Text style={styles.btnGhostText}>Explore Looks</Text>
          </ScalePress>
        </View>
        <View style={styles.stats}>
          {[
            ['50K+', 'Creators'],
            ['1M', 'Outfits'],
            ['200K+', 'Products'],
            ['10K+', 'Brands'],
          ].map(([n, l]) => (
            <View key={l} style={styles.stat}>
              <Text style={styles.statNum}>{n}</Text>
              <Text style={styles.statLabel}>{l}</Text>
            </View>
          ))}
        </View>
      </View>

      <ScalePress onPress={() => router.push('/(tabs)/discover')} style={styles.heroImageWrap}>
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=900&q=80',
          }}
          style={styles.heroImage}
        />
        <View style={styles.heroImageOverlay}>
          <Text style={styles.heroImageLabel}>Discover trending styles</Text>
          <Text style={styles.viewMore}>View more →</Text>
        </View>
      </ScalePress>

      <View style={styles.sectionHead}>
        <Text style={styles.sectionTitle}>Shop by Category</Text>
        <Pressable onPress={() => router.push('/(tabs)/shop')}>
          <Text style={styles.viewAll}>View all →</Text>
        </Pressable>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.catRow}
      >
        {CATEGORIES.map((c) => (
          <ScalePress
            key={c.name}
            onPress={() => router.push('/(tabs)/shop')}
            style={styles.catCard}
          >
            <Image source={{ uri: c.img }} style={styles.catImg} />
            <Text style={styles.catName}>{c.name}</Text>
            <Text style={styles.catCount}>{c.count}</Text>
          </ScalePress>
        ))}
      </ScrollView>

      <View style={styles.sectionHead}>
        <Text style={styles.sectionTitle}>Trending Looks</Text>
        <Pressable onPress={() => router.push('/(tabs)/discover')}>
          <Text style={styles.viewAll}>See all looks →</Text>
        </Pressable>
      </View>
      <View style={styles.looksGrid}>
        {LOOKS.map((look) => (
          <ScalePress
            key={look.id}
            onPress={() => router.push(`/feed/${look.id}`)}
            style={styles.lookCard}
          >
            <Image source={{ uri: look.img }} style={styles.lookImg} />
            <View style={styles.lookBody}>
              <Text style={styles.lookUser}>{look.user}</Text>
              <Text style={styles.lookTitle} numberOfLines={1}>
                {look.title}
              </Text>
              <View style={styles.lookMeta}>
                <Text style={styles.lookLikes}>♡ {look.likes}</Text>
                <Text style={styles.viewMoreSm}>View more →</Text>
              </View>
            </View>
          </ScalePress>
        ))}
      </View>

      <ScalePress
        onPress={() => router.push('/(tabs)/discover')}
        style={styles.creatorBand}
      >
        <Text style={styles.creatorEyebrow}>FOR CREATORS</Text>
        <Text style={styles.creatorTitle}>Turn your style into income</Text>
        <Text style={styles.creatorBody}>
          Tag products, inspire your audience and earn commissions on every
          sale.
        </Text>
        <View style={styles.btnPrimary}>
          <Text style={styles.btnPrimaryText}>Start Creating</Text>
        </View>
      </ScalePress>

      <View style={styles.featureRow}>
        {[
          ['↻', 'Recreate Looks'],
          ['✦', 'AI Wardrobe'],
          ['🛡', 'Secure Payments'],
          ['🚚', 'Fast Delivery'],
        ].map(([icon, label]) => (
          <View key={label} style={styles.featureChip}>
            <Text style={styles.featureIcon}>{icon}</Text>
            <Text style={styles.featureLabel}>{label}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.footerNote}>
        Powered by Culture · Styled by Intelligence
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    paddingBottom: 40,
    gap: 8,
  },
  hero: {
    paddingTop: 8,
    paddingBottom: 8,
    gap: 12,
  },
  heroTitle: {
    color: colors.textPrimary,
    fontSize: 32,
    lineHeight: 38,
    fontFamily: typography.families.displayBold,
  },
  heroAccent: {
    color: colors.accentGold,
  },
  heroBody: {
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 21,
    fontFamily: typography.families.body,
  },
  heroCtas: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 4,
  },
  btnPrimary: {
    backgroundColor: colors.accentGold,
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 999,
    alignItems: 'center',
  },
  btnPrimaryText: {
    color: colors.primaryBlack,
    fontFamily: typography.families.bodyMedium,
    fontSize: 14,
  },
  btnGhost: {
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 999,
    alignItems: 'center',
  },
  btnGhostText: {
    color: colors.textPrimary,
    fontFamily: typography.families.bodyMedium,
    fontSize: 14,
  },
  stats: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
    marginTop: 8,
  },
  stat: {},
  statNum: {
    color: colors.textPrimary,
    fontSize: 16,
    fontFamily: typography.families.bodyMedium,
  },
  statLabel: {
    color: colors.textSecondary,
    fontSize: 11,
  },
  heroImageWrap: {
    borderRadius: 14,
    overflow: 'hidden',
    height: 200,
    backgroundColor: '#111',
    marginVertical: 8,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroImageOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: 14,
    backgroundColor: 'rgba(0,0,0,0.55)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heroImageLabel: {
    color: colors.textPrimary,
    fontSize: 13,
    fontFamily: typography.families.bodyMedium,
  },
  viewMore: {
    color: colors.accentGold,
    fontSize: 12,
    fontFamily: typography.families.bodyMedium,
  },
  viewMoreSm: {
    color: colors.accentGold,
    fontSize: 11,
    fontFamily: typography.families.bodyMedium,
  },
  sectionHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 10,
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: 18,
    fontFamily: typography.families.displayBold,
  },
  viewAll: {
    color: colors.accentGold,
    fontSize: 12,
    fontFamily: typography.families.bodyMedium,
  },
  catRow: {
    gap: 10,
    paddingBottom: 4,
  },
  catCard: {
    width: 120,
    backgroundColor: colors.surfaceCard,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    overflow: 'hidden',
  },
  catImg: {
    width: '100%',
    height: 140,
  },
  catName: {
    color: colors.textPrimary,
    fontSize: 13,
    fontFamily: typography.families.bodyMedium,
    paddingHorizontal: 8,
    paddingTop: 8,
  },
  catCount: {
    color: colors.textSecondary,
    fontSize: 11,
    paddingHorizontal: 8,
    paddingBottom: 10,
  },
  looksGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  lookCard: {
    width: '48%',
    flexGrow: 1,
    backgroundColor: colors.surfaceCard,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    overflow: 'hidden',
  },
  lookImg: {
    width: '100%',
    height: 160,
  },
  lookBody: {
    padding: 10,
    gap: 4,
  },
  lookUser: {
    color: colors.textSecondary,
    fontSize: 11,
  },
  lookTitle: {
    color: colors.textPrimary,
    fontSize: 13,
    fontFamily: typography.families.bodyMedium,
  },
  lookMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  lookLikes: {
    color: colors.textSecondary,
    fontSize: 11,
  },
  creatorBand: {
    marginTop: 20,
    padding: 18,
    borderRadius: 16,
    backgroundColor: '#14110c',
    borderWidth: 1,
    borderColor: colors.borderGold,
    gap: 8,
  },
  creatorEyebrow: {
    color: colors.accentGold,
    fontSize: 10,
    letterSpacing: 1.4,
    fontFamily: typography.families.bodyMedium,
  },
  creatorTitle: {
    color: colors.textPrimary,
    fontSize: 20,
    fontFamily: typography.families.displayBold,
  },
  creatorBody: {
    color: colors.textSecondary,
    fontSize: 13,
    lineHeight: 19,
    marginBottom: 8,
  },
  featureRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 16,
  },
  featureChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.surfaceCard,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  featureIcon: {
    fontSize: 12,
  },
  featureLabel: {
    color: colors.textSecondary,
    fontSize: 11,
    fontFamily: typography.families.bodyMedium,
  },
  footerNote: {
    textAlign: 'center',
    color: 'rgba(245,245,245,0.3)',
    fontSize: 10,
    letterSpacing: 0.8,
    marginTop: 24,
  },
});