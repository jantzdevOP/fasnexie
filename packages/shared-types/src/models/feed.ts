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

export type FeedItem = {
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
  publishedAt: string;
  styleDnaWeight?: number;
  matchTags?: string[];
  personalisationScore?: number;
};

export type FeedResponse = {
  ranking: string;
  market?: string;
  count: number;
  hasProfile?: boolean;
  items: FeedItem[];
};