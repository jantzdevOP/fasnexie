/**
 * FasNexi seed script
 * Usage: pnpm db:seed  (from apps/api)
 *
 * Seeds Nigeria cultural feed + a demo user with Style DNA.
 */

import { PrismaClient, FeedContentType } from '@prisma/client';

const prisma = new PrismaClient();

type SeedRow = {
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
  styleDnaWeight: number;
  matchTags: string[];
  publishedAt: string;
};

const FEED: SeedRow[] = [
  {
    type: 'designer',
    title: 'Designer of the Week: Chioma Eze',
    summary:
      'Lagos-based designer reshaping Ankara structure. Clean volumes, sharp tailoring, and prints that read as architecture — not decoration.',
    city: 'Lagos',
    country: 'Nigeria',
    category: 'Designer',
    tags: ['Ankara', 'Tailoring', 'Lagos'],
    imageUrl:
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80',
    author: 'FasNexi Editorial',
    meta: 'Featured · Style DNA match high',
    cta: 'View atelier',
    styleDnaWeight: 0.97,
    matchTags: [
      'ankara',
      'tailoring',
      'lagos',
      'designer',
      'afrocentric-maximalist',
      'traditional-contemporary',
    ],
    publishedAt: '2026-08-13T08:00:00Z',
  },
  {
    type: 'arrival',
    title: 'Just Arrived: Gold Thread Capsule',
    summary:
      'Twelve pieces from Lagos makers. Each garment carries a Style DNA certificate and secondary-market royalty rights.',
    city: 'Lagos',
    country: 'Nigeria',
    category: 'New In',
    tags: ['Limited', 'Capsule', 'Royalty'],
    imageUrl:
      'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&q=80',
    meta: '12 pieces · From ₦68,000',
    cta: 'Shop the drop',
    styleDnaWeight: 0.96,
    matchTags: [
      'limited',
      'capsule',
      'lagos',
      'drop',
      'premium',
      'everyday-elegance',
    ],
    publishedAt: '2026-08-13T07:00:00Z',
  },
  {
    type: 'tip',
    title: 'Tip: Layer Aso Oke without bulk',
    summary:
      'Use a single structured shoulder or belt to anchor traditional weave against modern separates. Keep the rest of the look clean so the textile speaks.',
    city: 'Lagos',
    country: 'Nigeria',
    category: 'Style Tip',
    tags: ['Aso Oke', 'Layering', 'Ceremony'],
    imageUrl:
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80',
    author: 'Nexi',
    meta: '60-second read',
    cta: 'Save to wardrobe tips',
    styleDnaWeight: 0.9,
    matchTags: [
      'aso oke',
      'layering',
      'ceremony',
      'traditional-contemporary',
      'owambe',
    ],
    publishedAt: '2026-08-12T11:00:00Z',
  },
  {
    type: 'sale',
    title: 'Hot Sale: Premium Streetwear',
    summary:
      'Selected Lagos labels. Structured tees, tailored cargos and statement outerwear — up to 30% off this week only.',
    city: 'Lagos',
    country: 'Nigeria',
    category: 'Sale',
    tags: ['Streetwear', 'Limited time'],
    imageUrl:
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80',
    meta: 'Up to 30% off · Ends Sunday',
    cta: 'Shop sale',
    styleDnaWeight: 0.93,
    matchTags: [
      'streetwear',
      'sale',
      'lagos',
      'street-style-fusion',
      'youth',
    ],
    publishedAt: '2026-08-12T09:30:00Z',
  },
  {
    type: 'collection',
    title: 'New Collection: Owambe Edit',
    summary:
      'Celebration-ready looks that honour Aso Ebi tradition while giving you room to stand out. Colour stories curated for the season.',
    city: 'Lagos',
    country: 'Nigeria',
    category: 'Collection',
    tags: ['Owambe', 'Aso Ebi', 'Celebration'],
    imageUrl:
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80',
    meta: '28 looks · Lagos & Abuja makers',
    cta: 'Explore collection',
    styleDnaWeight: 0.94,
    matchTags: [
      'owambe',
      'aso ebi',
      'celebration',
      'afrocentric-maximalist',
      'traditional-contemporary',
    ],
    publishedAt: '2026-08-11T14:00:00Z',
  },
  {
    type: 'story',
    title: 'Lagos Runway Radar',
    summary:
      'Emerging labels shaping premium streetwear. From Yaba workshops to Victoria Island showrooms — the next wave of Nigerian fashion.',
    city: 'Lagos',
    country: 'Nigeria',
    category: 'Culture',
    tags: ['Runway', 'Emerging', 'Streetwear'],
    imageUrl:
      'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80',
    author: 'Tunde Okonkwo',
    meta: 'Editorial',
    cta: 'Read story',
    styleDnaWeight: 0.91,
    matchTags: [
      'runway',
      'streetwear',
      'lagos',
      'street-style-fusion',
      'emerging',
    ],
    publishedAt: '2026-08-11T10:00:00Z',
  },
  {
    type: 'nexi',
    title: 'Nexi noticed a gap in your wardrobe',
    summary:
      'You have strong ceremony looks and casual separates — but few transitional pieces for after-work events. Three options from Lagos makers that fill the gap.',
    city: 'Lagos',
    country: 'Nigeria',
    category: 'Nexi',
    tags: ['Wardrobe gap', 'Personal'],
    imageUrl:
      'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&q=80',
    author: 'Nexi',
    meta: 'Based on your Style DNA',
    cta: 'See suggestions',
    styleDnaWeight: 0.98,
    matchTags: ['wardrobe', 'gap', 'nexi', 'everyday-elegance', 'work'],
    publishedAt: '2026-08-10T16:00:00Z',
  },
  {
    type: 'tip',
    title: 'Tip: Ankara in the boardroom',
    summary:
      'Choose a single statement piece — blazer or structured dress — in a refined print. Pair with solid neutrals so the fabric feels intentional, not costume.',
    city: 'Abuja',
    country: 'Nigeria',
    category: 'Style Tip',
    tags: ['Ankara', 'Workwear', 'Professional'],
    imageUrl:
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80',
    author: 'Nexi',
    meta: 'Work edit',
    cta: 'Save tip',
    styleDnaWeight: 0.88,
    matchTags: [
      'ankara',
      'workwear',
      'professional',
      'modern-minimalist',
      'abuja',
    ],
    publishedAt: '2026-08-10T09:00:00Z',
  },
  {
    type: 'arrival',
    title: 'Just Arrived: Tailored Sets from Abuja',
    summary:
      'Climate-aware suiting and co-ords. Sharp enough for ceremony, light enough for the city. Made for Nigerian weather and Nigerian occasions.',
    city: 'Abuja',
    country: 'Nigeria',
    category: 'New In',
    tags: ['Tailoring', 'Sets', 'Climate-aware'],
    imageUrl:
      'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=800&q=80',
    meta: 'From ₦95,000',
    cta: 'Shop new',
    styleDnaWeight: 0.89,
    matchTags: [
      'tailoring',
      'sets',
      'abuja',
      'modern-minimalist',
      'everyday-elegance',
    ],
    publishedAt: '2026-08-09T12:00:00Z',
  },
  {
    type: 'challenge',
    title: 'Challenge: Style your Aso Oke three ways',
    summary:
      'Show how you wear traditional weave — ceremony, street, and something unexpected. Winners get featured and a Style DNA Card upgrade.',
    city: 'Lagos',
    country: 'Nigeria',
    category: 'Challenge',
    tags: ['Community', 'Aso Oke', 'UGC'],
    imageUrl:
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80',
    meta: 'Ends in 5 days · Gold badge',
    cta: 'Join challenge',
    styleDnaWeight: 0.87,
    matchTags: [
      'aso oke',
      'community',
      'challenge',
      'traditional-contemporary',
      'pride',
    ],
    publishedAt: '2026-08-09T08:00:00Z',
  },
  {
    type: 'sale',
    title: 'Hot Sale: Resale gems under ₦40k',
    summary:
      'Pre-loved pieces with a second story. Verified condition, transparent pricing. Circular fashion that still feels premium.',
    city: 'Lagos',
    country: 'Nigeria',
    category: 'Resale',
    tags: ['Resale', 'Under ₦40k', 'Circular'],
    imageUrl:
      'https://images.unsplash.com/photo-1523381210412-45927fdbc866?w=800&q=80',
    meta: 'From ₦12,000',
    cta: 'Browse resale',
    publishedAt: '2026-08-08T15:00:00Z',
    styleDnaWeight: 0.85,
    matchTags: [
      'resale',
      'circular',
      'lagos',
      'street-style-fusion',
      'value',
    ],
  },
  {
    type: 'collection',
    title: 'New Collection: Quiet Luxury, Nigerian DNA',
    summary:
      'Restrained silhouettes with singular heritage details. For when you want the culture to whisper, not shout.',
    city: 'Lagos',
    country: 'Nigeria',
    category: 'Collection',
    tags: ['Quiet luxury', 'Minimal', 'Heritage'],
    imageUrl:
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&q=80',
    meta: '18 looks',
    cta: 'Explore',
    styleDnaWeight: 0.86,
    matchTags: [
      'quiet luxury',
      'minimal',
      'heritage',
      'modern-minimalist',
      'everyday-elegance',
    ],
    publishedAt: '2026-08-07T11:00:00Z',
  },
  {
    type: 'designer',
    title: 'Rising: The Yaba Collective',
    summary:
      'A group of young Lagos makers sharing a studio in Yaba. Street cuts, bold graphics, and a clear point of view on Nigerian youth culture.',
    city: 'Lagos',
    country: 'Nigeria',
    category: 'Designer',
    tags: ['Streetwear', 'Yaba', 'Collective'],
    imageUrl:
      'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=900&q=80',
    author: 'FasNexi Editorial',
    meta: 'Creator storefront live',
    cta: 'Visit storefront',
    styleDnaWeight: 0.84,
    matchTags: [
      'streetwear',
      'yaba',
      'collective',
      'street-style-fusion',
      'youth',
    ],
    publishedAt: '2026-08-06T13:00:00Z',
  },
  {
    type: 'tip',
    title: 'Tip: Build a ceremony-to-street kit',
    summary:
      'One strong traditional piece + two modern separates that work with it. You leave the event and still look intentional — without a full change.',
    city: 'Lagos',
    country: 'Nigeria',
    category: 'Style Tip',
    tags: ['Versatile', 'Ceremony', 'Capsule'],
    imageUrl:
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=900&q=80',
    author: 'Nexi',
    meta: 'Wardrobe strategy',
    cta: 'Open wardrobe',
    styleDnaWeight: 0.88,
    matchTags: [
      'ceremony',
      'versatile',
      'capsule',
      'traditional-contemporary',
      'everyday-elegance',
    ],
    publishedAt: '2026-08-05T10:00:00Z',
  },
];

async function main() {
  console.log('Seeding FasNexi…');

  const demoDna = {
    archetypeId: 'traditional-contemporary',
    tags: ['aso oke', 'ankara', 'ceremony', 'owambe', 'tailoring', 'heritage'],
    cities: ['Lagos', 'Abuja'],
    occasions: ['Weddings', 'Cultural Events', 'Work'],
  };

  const demoPreferences = {
    boostTypes: ['tip', 'designer', 'nexi'],
    muteTypes: ['sale'],
    hideTypes: ['challenge'],
    boostTags: ['aso oke', 'ceremony', 'ankara', 'heritage'],
    muteTags: ['resale'],
    boostCities: ['Lagos'],
    personalisationWeight: 0.65,
    boostStrength: 0.14,
    muteStrength: 0.16,
  };

  const DEMO_USER_ID = 'demo_user_fasnexi';

  await prisma.feedFavourite.deleteMany({ where: { userId: DEMO_USER_ID } });
  await prisma.user.deleteMany({ where: { email: 'demo@fasnexi.com' } });
  await prisma.user.deleteMany({ where: { id: DEMO_USER_ID } });

  const user = await prisma.user.create({
    data: {
      id: DEMO_USER_ID,
      email: 'demo@fasnexi.com',
      name: 'Adaeze Okonkwo',
      role: 'CONSUMER',
      styleDNA: JSON.stringify(demoDna),
      feedPreferences: JSON.stringify(demoPreferences),
    },
  });
  console.log(`  User: ${user.email} (${user.id})`);
  console.log(
    '  Preferences: boost tips/designers, mute sales, hide challenges',
  );

  await prisma.feedFavourite.deleteMany();
  await prisma.feedItem.deleteMany();

  for (const row of FEED) {
    await prisma.feedItem.create({
      data: {
        type: row.type,
        title: row.title,
        summary: row.summary,
        city: row.city,
        country: row.country,
        category: row.category,
        tags: row.tags,
        imageUrl: row.imageUrl,
        author: row.author,
        meta: row.meta,
        cta: row.cta,
        styleDnaWeight: row.styleDnaWeight,
        matchTags: row.matchTags,
        publishedAt: new Date(row.publishedAt),
        active: true,
      },
    });
  }

  const count = await prisma.feedItem.count();
  console.log(`  Feed items: ${count}`);
  console.log('Seed complete.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());