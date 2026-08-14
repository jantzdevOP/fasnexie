/** Emotional Context: DISCOVERY */
import { useState } from 'react';
import { Image, Text, View, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { BrandCard } from '@/components/ui/BrandCard';
import { GoldBurstLike } from '@/components/ui/GoldBurstLike';
import { colors } from '@/lib/theme/colors';
import { typography } from '@/lib/theme/typography';
import { useHaptics } from '@/hooks/useHaptics';

export type FeedContentType =
  | 'tip'
  | 'designer'
  | 'sale'
  | 'arrival'
  | 'collection'
  | 'story'
  | 'challenge'
  | 'nexi'
  | 'drop';

export type FeedCardProps = {
  id: string;
  type: FeedContentType;
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
  onPress?: () => void;
};

const TYPE_LABEL: Record<FeedContentType, string> = {
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

const TYPE_ACCENT: Record<FeedContentType, string> = {
  tip: colors.accentGold,
  designer: colors.accentGold,
  sale: '#E8A0A0',
  arrival: '#A8D5A2',
  collection: colors.accentGold,
  story: colors.secondaryBeige,
  challenge: '#C4A1FF',
  nexi: colors.accentGold,
  drop: colors.accentGold,
};

export function FeedCard({
  id,
  type,
  title,
  summary,
  city,
  category,
  tags,
  imageUrl,
  author,
  meta,
  cta,
  onPress,
}: FeedCardProps) {
  const router = useRouter();
  const { trigger } = useHaptics();
  const [favourited, setFavourited] = useState(false);
  const accent = TYPE_ACCENT[type] ?? colors.accentGold;
  const typeLabel = TYPE_LABEL[type] ?? category;

  const openDetail = () => {
    trigger('curiosity').catch(() => undefined);
    onPress?.();
    router.push(`/feed/${id}`);
  };

  return (
    <Pressable
      onPress={openDetail}
      style={({ pressed }) => [{ opacity: pressed ? 0.93 : 1 }]}
    >
      <BrandCard style={styles.card}>
        <View style={styles.imageWrap}>
          <Image
            source={{ uri: imageUrl }}
            style={styles.image}
            resizeMode="cover"
            accessibilityLabel={title}
          />
          <View style={[styles.typeBadge, { borderColor: accent }]}>
            <Text style={[styles.typeBadgeText, { color: accent }]}>
              {typeLabel}
            </Text>
          </View>
          <View style={styles.cityBadge}>
            <Text style={styles.cityText}>{city}</Text>
          </View>
          <View style={styles.favWrap} onStartShouldSetResponder={() => true}>
            <GoldBurstLike
              favourited={favourited}
              onToggle={setFavourited}
              size={40}
            />
          </View>
        </View>

        <View style={styles.body}>
          <Text style={styles.title} numberOfLines={2}>
            {title}
          </Text>
          <Text style={styles.summary} numberOfLines={3}>
            {summary}
          </Text>

          {(meta || author) && (
            <View style={styles.metaRow}>
              {meta ? (
                <Text style={[styles.meta, { color: accent }]} numberOfLines={1}>
                  {meta}
                </Text>
              ) : null}
              {author ? (
                <Text style={styles.author} numberOfLines={1}>
                  {author}
                </Text>
              ) : null}
            </View>
          )}

          {tags.length > 0 && (
            <View style={styles.tagsRow}>
              {tags.slice(0, 3).map((tag) => (
                <View key={tag} style={styles.tag}>
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              ))}
            </View>
          )}

          {cta ? (
            <View
              style={[styles.ctaRow, { borderTopColor: colors.borderSubtle }]}
            >
              <Text style={[styles.ctaText, { color: accent }]}>{cta}</Text>
              <Text style={[styles.ctaArrow, { color: accent }]}>→</Text>
            </View>
          ) : null}
        </View>
      </BrandCard>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 0,
    overflow: 'hidden',
    backgroundColor: colors.surfaceCard,
    borderColor: colors.borderSubtle,
    borderRadius: 12,
  },
  imageWrap: {
    width: '100%',
    height: 168,
    position: 'relative',
    backgroundColor: '#111',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  typeBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'rgba(11,11,11,0.88)',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
  },
  typeBadgeText: {
    fontSize: 10,
    letterSpacing: 0.8,
    fontFamily: typography.families.bodyMedium,
    textTransform: 'uppercase',
  },
  cityBadge: {
    position: 'absolute',
    top: 10,
    right: 48,
    backgroundColor: 'rgba(11,11,11,0.75)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  cityText: {
    color: 'rgba(245,245,245,0.85)',
    fontSize: 10,
    letterSpacing: 0.4,
    fontFamily: typography.families.bodyMedium,
  },
  favWrap: {
    position: 'absolute',
    top: 4,
    right: 4,
  },
  body: {
    paddingHorizontal: 14,
    paddingTop: 12,
    paddingBottom: 4,
    gap: 6,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 18,
    lineHeight: 24,
    fontFamily: typography.families.displayBold,
  },
  summary: {
    color: colors.textSecondary,
    fontSize: 13,
    lineHeight: 19,
    fontFamily: typography.families.body,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
    marginTop: 2,
  },
  meta: {
    fontSize: 12,
    fontFamily: typography.families.bodyMedium,
    flexShrink: 1,
  },
  author: {
    color: 'rgba(245,245,245,0.4)',
    fontSize: 11,
    fontFamily: typography.families.body,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 4,
  },
  tag: {
    backgroundColor: 'rgba(245,245,245,0.05)',
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  tagText: {
    color: 'rgba(245,245,245,0.6)',
    fontSize: 10,
    fontFamily: typography.families.body,
  },
  ctaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  ctaText: {
    fontSize: 13,
    fontFamily: typography.families.bodyMedium,
    letterSpacing: 0.2,
  },
  ctaArrow: {
    fontSize: 14,
    fontFamily: typography.families.bodyMedium,
  },
});
