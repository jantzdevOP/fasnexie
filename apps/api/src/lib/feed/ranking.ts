/**
 * Feed Ranking Engine
 * Combines editorial scoring with personalization based on Style DNA and preferences.
 */

export interface StyleDNAProfile {
  archetypeId: string;
  tags: string[];
  cities: string[];
  occasions: string[];
}

export interface FeedPreferences {
  boostTypes: string[];
  muteTypes: string[];
  hideTypes: string[];
  boostTags: string[];
  muteTags: string[];
  boostCities: string[];
  muteCities: string[];
  personalisationWeight: number; // 0-1, default 0.55
  boostStrength: number; // multiplier, default 1.5
  muteStrength: number; // divisor, default 0.5
}

export interface FeedItemScore {
  itemId: string;
  editorialScore: number;
  personalisationScore: number;
  finalScore: number;
  reasoning: string;
}

const DEFAULT_PREFERENCES: FeedPreferences = {
  boostTypes: [],
  muteTypes: [],
  hideTypes: [],
  boostTags: [],
  muteTags: [],
  boostCities: [],
  muteCities: [],
  personalisationWeight: 0.55,
  boostStrength: 1.5,
  muteStrength: 0.5,
};

/**
 * Parse JSON strings safely, with fallback to empty objects
 */
function safeParseJSON<T>(json: string | null | undefined, fallback: T): T {
  if (!json) return fallback;
  try {
    return JSON.parse(json) as T;
  } catch {
    return fallback;
  }
}

/**
 * Calculate tag overlap between two arrays
 */
function calculateTagOverlap(itemTags: string[], userTags: string[]): number {
  if (itemTags.length === 0 || userTags.length === 0) return 0;
  const overlap = itemTags.filter((tag) => userTags.includes(tag)).length;
  return overlap / itemTags.length;
}

/**
 * Calculate editorial score based on content metadata
 * - Recency: newer items score higher (0-0.3)
 * - Type relevance: certain types have inherent editorial weight (0-0.4)
 * - Engagement proxy: images, CTAs boost (0-0.3)
 */
function calculateEditorialScore(item: {
  type: string;
  publishedAt: Date;
  imageUrl?: string;
  cta?: string;
  tags?: string[];
}): number {
  let score = 0;

  // Recency (0-0.3): items from last 7 days get full points
  const daysSincePublish = Math.floor(
    (Date.now() - item.publishedAt.getTime()) / (1000 * 60 * 60 * 24)
  );
  const recencyScore = Math.max(0, 1 - daysSincePublish / 7) * 0.3;
  score += recencyScore;

  // Type weight (0-0.4): some types are editorially featured
  const typeWeights: Record<string, number> = {
    story: 0.4,
    arrival: 0.35,
    collection: 0.35,
    challenge: 0.3,
    designer: 0.3,
    nexi: 0.25,
    tip: 0.2,
    sale: 0.15,
    drop: 0.35,
  };
  score += typeWeights[item.type] || 0.2;

  // Content richness (0-0.3)
  let richness = 0;
  if (item.imageUrl) richness += 0.15;
  if (item.cta) richness += 0.1;
  if (item.tags && item.tags.length > 2) richness += 0.05;
  score += richness;

  return Math.min(score, 1);
}

/**
 * Calculate personalization score based on Style DNA + preferences
 * - Tag matching: overlap between item tags and user Style DNA (0-0.4)
 * - City affinity: match against user cities (0-0.3)
 * - Occasion relevance: if item has occasion tags (0-0.2)
 * - Preference alignment: respects boosts/mutes (0-0.1)
 */
function calculatePersonalisationScore(
  item: {
    tags: string[];
    city: string;
    type: string;
    styleDnaWeight: number;
  },
  styleDNA: StyleDNAProfile | null,
  preferences: FeedPreferences
): number {
  let score = 0;

  if (!styleDNA) {
    return 0.5; // neutral score if no profile
  }

  // Tag matching (0-0.4)
  const tagOverlap = calculateTagOverlap(item.tags, styleDNA.tags);
  score += tagOverlap * 0.4;

  // City affinity (0-0.3)
  if (styleDNA.cities.includes(item.city)) {
    score += 0.3;
  } else {
    score += 0.1; // slight boost for any city
  }

  // Occasion relevance (0-0.2)
  const occasionTags = item.tags.filter((tag) =>
    styleDNA.occasions.includes(tag)
  );
  score += (occasionTags.length / Math.max(styleDNA.occasions.length, 1)) * 0.2;

  // Style DNA weight: item's inherent personalization affinity
  score *= item.styleDnaWeight;

  return Math.min(score, 1);
}

/**
 * Apply preferences boosts and mutes
 */
function applyPreferenceModifiers(
  score: number,
  item: {
    type: string;
    tags: string[];
    city: string;
  },
  preferences: FeedPreferences
): { modifiedScore: number; reason: string } {
  let modifiedScore = score;
  let reason = '';

  // Hide types
  if (preferences.hideTypes.includes(item.type)) {
    return { modifiedScore: -1, reason: 'Hidden by type preference' };
  }

  // Boost types
  if (preferences.boostTypes.includes(item.type)) {
    modifiedScore *= preferences.boostStrength;
    reason += 'Boosted by type. ';
  } else if (preferences.muteTypes.includes(item.type)) {
    modifiedScore /= preferences.muteStrength;
    reason += 'Muted by type. ';
  }

  // Boost tags
  const boostTagCount = item.tags.filter((tag) =>
    preferences.boostTags.includes(tag)
  ).length;
  if (boostTagCount > 0) {
    modifiedScore *= Math.pow(preferences.boostStrength, boostTagCount);
    reason += `Boosted by ${boostTagCount} tag(s). `;
  }

  // Mute tags
  const muteTagCount = item.tags.filter((tag) =>
    preferences.muteTags.includes(tag)
  ).length;
  if (muteTagCount > 0) {
    modifiedScore /= Math.pow(preferences.muteStrength, muteTagCount);
    reason += `Muted by ${muteTagCount} tag(s). `;
  }

  // City boosts/mutes
  if (preferences.boostCities.includes(item.city)) {
    modifiedScore *= preferences.boostStrength * 0.8;
    reason += 'Boosted by city. ';
  } else if (preferences.muteCities.includes(item.city)) {
    modifiedScore /= preferences.muteStrength;
    reason += 'Muted by city. ';
  }

  return {
    modifiedScore: Math.max(0, modifiedScore),
    reason: reason.trim() || 'No preferences applied',
  };
}

/**
 * Main ranking function
 * Returns sorted items by final score, with -1 scores filtered out (hidden)
 */
export function rankFeedItems(
  items: Array<{
    id: string;
    type: string;
    title: string;
    tags: string[];
    city: string;
    publishedAt: Date;
    imageUrl?: string;
    cta?: string;
    styleDnaWeight: number;
  }>,
  styleDNAJson: string | null,
  preferencesJson: string | null
): FeedItemScore[] {
  const styleDNA = safeParseJSON<StyleDNAProfile | null>(styleDNAJson, null);
  const preferences = safeParseJSON<FeedPreferences>(
    preferencesJson,
    DEFAULT_PREFERENCES
  );

  const scored = items.map((item) => {
    const editorialScore = calculateEditorialScore(item);
    const personalisationScore = calculatePersonalisationScore(
      item,
      styleDNA,
      preferences
    );

    // Blend scores: editorial * (1-w) + personalisation * w
    const w = preferences.personalisationWeight;
    let blendedScore =
      editorialScore * (1 - w) + personalisationScore * w;

    // Apply preferences
    const { modifiedScore, reason } = applyPreferenceModifiers(
      blendedScore,
      item,
      preferences
    );

    return {
      itemId: item.id,
      editorialScore,
      personalisationScore,
      finalScore: modifiedScore,
      reasoning: reason,
    };
  });

  // Filter hidden items (score === -1) and sort by final score descending
  return scored
    .filter((s) => s.finalScore >= 0)
    .sort((a, b) => b.finalScore - a.finalScore);
}

/**
 * Fallback seed data for when DB is empty/down
 * Nigeria-first cultural & fashion content
 */
export const FALLBACK_SEED_FEED = [
  {
    id: 'seed-1',
    type: 'story',
    title: 'Lagos Fashion Week Highlights: Heritage Meets Tomorrow',
    summary:
      'Discover how contemporary designers are reimagining traditional Yoruba textiles.',
    city: 'Lagos',
    country: 'Nigeria',
    tags: ['heritage', 'contemporary', 'yoruba', 'textiles'],
    imageUrl:
      'https://images.unsplash.com/photo-1595777707802-9b89f3d77736?w=800',
    author: 'Amara Okonkwo',
    cta: 'Read Story',
    styleDnaWeight: 0.8,
    matchTags: ['contemporary', 'heritage'],
    publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    active: true,
  },
  {
    id: 'seed-2',
    type: 'arrival',
    title: 'New Ankara Collection by Zainab Abdulrasheed',
    summary: 'Bold geometric patterns celebrating Nigerian craftsmanship.',
    city: 'Abuja',
    country: 'Nigeria',
    tags: ['ankara', 'geometric', 'nigerian', 'artisan'],
    imageUrl:
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800',
    author: 'Zainab Abdulrasheed',
    cta: 'Shop Now',
    styleDnaWeight: 0.75,
    matchTags: ['ankara', 'artisan'],
    publishedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    active: true,
  },
  {
    id: 'seed-3',
    type: 'designer',
    title: 'Meet Chioma Obinwanne: Luxury Tailoring Visionary',
    summary:
      'A deep dive into bespoke menswear that celebrates African elegance.',
    city: 'Lagos',
    country: 'Nigeria',
    tags: ['menswear', 'bespoke', 'luxury', 'african'],
    imageUrl:
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
    author: 'Chioma Obinwanne',
    cta: 'View Portfolio',
    styleDnaWeight: 0.7,
    matchTags: ['menswear', 'luxury'],
    publishedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    active: true,
  },
  {
    id: 'seed-4',
    type: 'challenge',
    title: 'Style Your Ceremony Challenge',
    summary:
      'Show us how you style traditional attire for modern celebrations.',
    city: 'Nigeria',
    country: 'Nigeria',
    tags: ['ceremony', 'traditional', 'challenge', 'community'],
    imageUrl:
      'https://images.unsplash.com/photo-1594777707802-9b89f3d77736?w=800',
    cta: 'Join Challenge',
    styleDnaWeight: 0.65,
    matchTags: ['ceremony', 'community'],
    publishedAt: new Date(Date.now() - 0.5 * 24 * 60 * 60 * 1000), // 12 hours ago
    active: true,
  },
  {
    id: 'seed-5',
    type: 'tip',
    title: 'Care & Maintenance: Preserving Adire & Batik',
    summary: 'Expert tips on keeping your traditional textiles vibrant.',
    city: 'Lagos',
    country: 'Nigeria',
    tags: ['adire', 'batik', 'care', 'tips'],
    imageUrl:
      'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=800',
    author: 'Textile Conservator Ife',
    cta: 'Learn More',
    styleDnaWeight: 0.6,
    matchTags: ['adire', 'batik'],
    publishedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 days ago
    active: true,
  },
  {
    id: 'seed-6',
    type: 'collection',
    title: 'The Elegance Edit: Pieces for Every Occasion',
    summary: 'Curated collections that transition from work to celebration.',
    city: 'Lagos',
    country: 'Nigeria',
    tags: ['curated', 'versatile', 'everyday', 'celebration'],
    imageUrl:
      'https://images.unsplash.com/photo-1595958294919-0d84e58e43f3?w=800',
    cta: 'Explore',
    styleDnaWeight: 0.72,
    matchTags: ['curated', 'versatile'],
    publishedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    active: true,
  },
];
