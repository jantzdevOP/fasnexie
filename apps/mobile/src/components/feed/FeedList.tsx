/** Emotional Context: DISCOVERY */
import { useCallback, useEffect, useState } from 'react';
import {
  FlatList,
  RefreshControl,
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { FeedCard, type FeedCardProps, type FeedContentType } from './FeedCard';
import { EmptyState } from '@/components/ui/EmptyState';
import { FeedListSkeleton } from '@/components/ui/Skeleton';
import { apiFetch } from '@/lib/api';
import { colors } from '@/lib/theme/colors';
import { typography } from '@/lib/theme/typography';
import { DEMO_USER_ID } from '@/constants/demo';
import { useHaptics } from '@/hooks/useHaptics';

type FeedItem = FeedCardProps & {
  publishedAt?: string;
  styleDnaWeight?: number;
};

type FeedResponse = {
  ranking: string;
  market?: string;
  count: number;
  hasProfile?: boolean;
  hasPreferences?: boolean;
  items: FeedItem[];
};

const FALLBACK_ITEMS: FeedItem[] = [
  {
    id: 'ng-designer-1',
    type: 'designer',
    title: 'Designer of the Week: Chioma Eze',
    summary:
      'Lagos-based designer reshaping Ankara structure. Clean volumes, sharp tailoring, and prints that read as architecture.',
    city: 'Lagos',
    country: 'Nigeria',
    category: 'Designer',
    tags: ['Ankara', 'Tailoring'],
    imageUrl:
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80',
    meta: 'Featured',
    cta: 'View atelier',
  },
  {
    id: 'ng-arrival-1',
    type: 'arrival',
    title: 'Just Arrived: Gold Thread Capsule',
    summary:
      'Twelve pieces from Lagos makers. Style DNA certificate included.',
    city: 'Lagos',
    country: 'Nigeria',
    category: 'New In',
    tags: ['Limited', 'Capsule'],
    imageUrl:
      'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&q=80',
    meta: 'From ₦68,000',
    cta: 'Shop the drop',
  },
  {
    id: 'ng-tip-1',
    type: 'tip',
    title: 'Tip: Layer Aso Oke without bulk',
    summary:
      'Anchor traditional weave with one structured detail. Keep the rest clean so the textile speaks.',
    city: 'Lagos',
    country: 'Nigeria',
    category: 'Style Tip',
    tags: ['Aso Oke', 'Layering'],
    imageUrl:
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80',
    author: 'Nexi',
    meta: '60-second read',
    cta: 'Save tip',
  },
  {
    id: 'ng-sale-1',
    type: 'sale',
    title: 'Hot Sale: Premium Streetwear',
    summary: 'Selected Lagos labels — up to 30% off this week only.',
    city: 'Lagos',
    country: 'Nigeria',
    category: 'Sale',
    tags: ['Streetwear'],
    imageUrl:
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80',
    meta: 'Up to 30% off · Ends Sunday',
    cta: 'Shop sale',
  },
];

function getApiBase(): string {
  // @ts-expect-error process may be polyfilled by Expo
  const fromEnv = process?.env?.EXPO_PUBLIC_API_URL as string | undefined;
  if (fromEnv) return fromEnv.replace(/\/$/, '');
  return 'http://localhost:3000';
}

export function FeedList() {
  const { trigger } = useHaptics();
  const [items, setItems] = useState<FeedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [usedFallback, setUsedFallback] = useState(false);
  const [personalised, setPersonalised] = useState(false);
  const [hasOverrides, setHasOverrides] = useState(false);

  const load = useCallback(async (isRefresh = false) => {
    if (isRefresh) {
      setRefreshing(true);
      trigger('refresh').catch(() => undefined);
    } else setLoading(true);
    setError(null);

    try {
      const base = getApiBase();
      const data = await apiFetch<FeedResponse>(
        `${base}/api/feed?limit=20&userId=${encodeURIComponent(DEMO_USER_ID)}`,
      );
      setItems(data.items ?? []);
      setPersonalised(
        Boolean(data.hasProfile) || data.ranking === 'style-dna-weighted',
      );
      setHasOverrides(Boolean(data.hasPreferences));
      setUsedFallback(false);
    } catch (err) {
      setItems(FALLBACK_ITEMS);
      setUsedFallback(true);
      setPersonalised(false);
      setHasOverrides(false);
      setError(
        err instanceof Error ? err.message : 'Unable to reach cultural feed',
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [trigger]);

  useEffect(() => {
    load();
  }, [load]);

  if (loading && items.length === 0) {
    return (
      <View style={styles.skeletonWrap}>
        <Text style={styles.loadingLabel}>Weaving your cultural feed…</Text>
        <FeedListSkeleton count={3} />
      </View>
    );
  }

  if (!loading && items.length === 0) {
    return (
      <EmptyState
        title="Nothing on the feed yet"
        subtitle="Pull to refresh or check back soon for new cultural stories."
        cta="Refresh"
        onPress={() => load(true)}
      />
    );
  }

  return (
    <View style={styles.container}>
      {usedFallback && error ? (
        <View style={styles.banner}>
          <Text style={styles.bannerText}>
            Offline picks · Nigeria fashion mix
          </Text>
        </View>
      ) : personalised ? (
        <View style={styles.banner}>
          <Text style={styles.bannerText}>
            {hasOverrides
              ? 'Style DNA + your preferences · tips & designers first'
              : 'Ranked for your Style DNA · Traditional Contemporary'}
          </Text>
        </View>
      ) : null}

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => load(true)}
            tintColor={colors.accentGold}
            colors={[colors.accentGold]}
          />
        }
        renderItem={({ item }) => (
          <FeedCard
            id={item.id}
            type={(item.type as FeedContentType) ?? 'story'}
            title={item.title}
            summary={item.summary}
            city={item.city}
            country={item.country}
            category={item.category}
            tags={item.tags}
            imageUrl={item.imageUrl}
            author={item.author}
            meta={item.meta}
            cta={item.cta}
          />
        )}
        contentContainerStyle={styles.listContent}
        ListFooterComponent={
          refreshing ? (
            <ActivityIndicator
              color={colors.accentGold}
              style={{ marginVertical: 16 }}
            />
          ) : (
            <Text style={styles.footer}>
              Powered by Culture · Styled by Intelligence
            </Text>
          )
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    gap: 14,
    paddingBottom: 40,
  },
  skeletonWrap: {
    flex: 1,
    gap: 12,
    paddingTop: 8,
  },
  loadingLabel: {
    color: colors.accentGold,
    fontSize: 12,
    letterSpacing: 0.4,
    fontFamily: typography.families.bodyMedium,
    marginBottom: 4,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 14,
    paddingVertical: 48,
  },
  banner: {
    backgroundColor: 'rgba(212,175,55,0.1)',
    borderWidth: 1,
    borderColor: colors.borderGold,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 12,
  },
  bannerText: {
    color: colors.accentGold,
    fontSize: 12,
    fontFamily: typography.families.body,
  },
  footer: {
    textAlign: 'center',
    color: 'rgba(245,245,245,0.3)',
    fontSize: 10,
    letterSpacing: 0.9,
    marginTop: 20,
    fontFamily: typography.families.body,
  },
});
