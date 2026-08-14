/** Emotional Context: DISCOVERY + ASPIRATION */
import { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Pressable,
  SafeAreaView,
} from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { GoldBurstLike } from '@/components/ui/GoldBurstLike';
import { apiFetch } from '@/lib/api';
import { colors } from '@/lib/theme/colors';
import { typography } from '@/lib/theme/typography';
import { useHaptics } from '@/hooks/useHaptics';

type FeedDetail = {
  id: string;
  type: string;
  title: string;
  summary: string;
  city: string;
  country: string;
  category: string;
  tags: string[];
  imageUrl: string;
  author?: string;
  meta?: string;
  cta?: string;
  publishedAt?: string;
};

const TYPE_LABEL: Record<string, string> = {
  tip: 'Style Tip',
  designer: 'Designer of the Week',
  sale: 'Hot Sale',
  arrival: 'Just Arrived',
  collection: 'New Collection',
  story: 'Story',
  challenge: 'Challenge',
  nexi: 'Nexi',
  drop: 'Limited Drop',
};

function getApiBase(): string {
  // @ts-expect-error process may be polyfilled
  const fromEnv = process?.env?.EXPO_PUBLIC_API_URL as string | undefined;
  if (fromEnv) return fromEnv.replace(/\/$/, '');
  return 'http://localhost:3000';
}

export default function FeedDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { trigger } = useHaptics();
  const [item, setItem] = useState<FeedDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [favourited, setFavourited] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const base = getApiBase();
      const data = await apiFetch<{ item: FeedDetail }>(
        `${base}/api/feed/${id}`,
      );
      setItem(data.item);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not load item');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    load();
  }, [load]);

  const onFavourite = (next: boolean) => {
    setFavourited(next);
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.screen}>
        <View style={{ padding: 16, gap: 12 }}>
          <Text style={styles.muted}>Opening piece…</Text>
          <View
            style={{
              height: 280,
              borderRadius: 12,
              backgroundColor: 'rgba(212,175,55,0.12)',
              borderWidth: 1,
              borderColor: 'rgba(212,175,55,0.18)',
            }}
          />
          <View
            style={{
              height: 22,
              width: '75%',
              borderRadius: 6,
              backgroundColor: 'rgba(212,175,55,0.12)',
            }}
          />
          <View
            style={{
              height: 14,
              width: '100%',
              borderRadius: 6,
              backgroundColor: 'rgba(212,175,55,0.1)',
            }}
          />
          <View
            style={{
              height: 14,
              width: '90%',
              borderRadius: 6,
              backgroundColor: 'rgba(212,175,55,0.1)',
            }}
          />
        </View>
      </SafeAreaView>
    );
  }

  if (error || !item) {
    return (
      <SafeAreaView style={styles.screen}>
        <View style={styles.centered}>
          <Text style={styles.errorTitle}>Couldn’t open this piece</Text>
          <Text style={styles.muted}>{error ?? 'Not found'}</Text>
          <Pressable onPress={() => router.back()} style={styles.backBtn}>
            <Text style={styles.backBtnText}>Go back</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  const typeLabel = TYPE_LABEL[item.type] ?? item.category;

  return (
    <SafeAreaView style={styles.screen}>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        <View style={styles.topBar}>
          <Pressable
            onPress={() => {
              trigger('navigate').catch(() => undefined);
              router.back();
            }}
            hitSlop={12}
            style={styles.backHit}
          >
            <Text style={styles.backChevron}>←</Text>
            <Text style={styles.backLabel}>Feed</Text>
          </Pressable>
          <GoldBurstLike
            favourited={favourited}
            onToggle={onFavourite}
            size={48}
          />
        </View>

        <View style={styles.heroWrap}>
          <Image
            source={{ uri: item.imageUrl }}
            style={styles.hero}
            resizeMode="cover"
          />
          <View style={styles.typeBadge}>
            <Text style={styles.typeBadgeText}>{typeLabel}</Text>
          </View>
        </View>

        <View style={styles.body}>
          <Text style={styles.city}>
            {item.city}
            {item.country ? ` · ${item.country}` : ''}
          </Text>
          <Text style={styles.title}>{item.title}</Text>

          {item.meta ? <Text style={styles.meta}>{item.meta}</Text> : null}

          <Text style={styles.summary}>{item.summary}</Text>

          {item.author ? (
            <Text style={styles.author}>by {item.author}</Text>
          ) : null}

          {item.tags?.length > 0 && (
            <View style={styles.tagsRow}>
              {item.tags.map((tag) => (
                <View key={tag} style={styles.tag}>
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              ))}
            </View>
          )}

          {item.cta ? (
            <Pressable
              style={styles.cta}
              onPress={() => trigger('confirmation').catch(() => undefined)}
            >
              <Text style={styles.ctaText}>{item.cta}</Text>
            </Pressable>
          ) : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.primaryBlack,
  },
  scroll: {
    paddingBottom: 48,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    padding: 24,
  },
  muted: {
    color: colors.textSecondary,
    fontSize: 13,
    fontFamily: typography.families.body,
  },
  errorTitle: {
    color: colors.textPrimary,
    fontSize: 18,
    fontFamily: typography.families.displayBold,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  backHit: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  backChevron: {
    color: colors.accentGold,
    fontSize: 22,
  },
  backLabel: {
    color: colors.textSecondary,
    fontSize: 14,
    fontFamily: typography.families.bodyMedium,
  },
  heroWrap: {
    width: '100%',
    height: 280,
    backgroundColor: '#111',
    position: 'relative',
  },
  hero: {
    width: '100%',
    height: '100%',
  },
  typeBadge: {
    position: 'absolute',
    bottom: 14,
    left: 16,
    backgroundColor: 'rgba(11,11,11,0.88)',
    borderWidth: 1,
    borderColor: colors.borderGold,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  typeBadgeText: {
    color: colors.accentGold,
    fontSize: 10,
    letterSpacing: 1,
    textTransform: 'uppercase',
    fontFamily: typography.families.bodyMedium,
  },
  body: {
    paddingHorizontal: 20,
    paddingTop: 20,
    gap: 10,
  },
  city: {
    color: colors.accentGold,
    fontSize: 11,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    fontFamily: typography.families.bodyMedium,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 26,
    lineHeight: 32,
    fontFamily: typography.families.displayBold,
  },
  meta: {
    color: colors.accentGold,
    fontSize: 13,
    fontFamily: typography.families.bodyMedium,
  },
  summary: {
    color: colors.textSecondary,
    fontSize: 15,
    lineHeight: 24,
    fontFamily: typography.families.body,
    marginTop: 4,
  },
  author: {
    color: 'rgba(245,245,245,0.4)',
    fontSize: 12,
    fontFamily: typography.families.body,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
  },
  tag: {
    backgroundColor: 'rgba(245,245,245,0.06)',
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
  },
  tagText: {
    color: 'rgba(245,245,245,0.65)',
    fontSize: 12,
    fontFamily: typography.families.body,
  },
  cta: {
    marginTop: 20,
    backgroundColor: colors.accentGold,
    borderRadius: 999,
    paddingVertical: 16,
    alignItems: 'center',
  },
  ctaText: {
    color: colors.primaryBlack,
    fontSize: 15,
    fontFamily: typography.families.bodyMedium,
  },
  backBtn: {
    marginTop: 16,
    borderWidth: 1,
    borderColor: colors.borderGold,
    borderRadius: 999,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  backBtnText: {
    color: colors.accentGold,
    fontFamily: typography.families.bodyMedium,
  },
});