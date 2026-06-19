import type { EmotionalPillar } from '@/hooks/useEmotionalQA';

const GOLD_ACCENT = '#D4AF37' as const;

export type StyleArchetype = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  emotionalPillar: EmotionalPillar;
  colorAccent: typeof GOLD_ACCENT;
  occasions: string[];
  culturalContexts: string[];
};

export const archetypes: StyleArchetype[] = [
  {
    id: 'modern-minimalist',
    name: 'Modern Minimalist',
    tagline: 'Less is your language',
    description: 'Clean lines, intentional, whisper not shout',
    emotionalPillar: 'ASPIRATION',
    colorAccent: GOLD_ACCENT,
    occasions: ['Work', 'Casual', 'Travel'],
    culturalContexts: ['Urban Africa', 'Contemporary Editorial'],
  },
  {
    id: 'afrocentric-maximalist',
    name: 'Afrocentric Maximalist',
    tagline: 'More is your manifesto',
    description: 'Bold prints, layered textures, celebration',
    emotionalPillar: 'PRIDE',
    colorAccent: GOLD_ACCENT,
    occasions: ['Owambe', 'Festivals', 'Celebrations'],
    culturalContexts: ['Ankara Heritage', 'Vibrant Ceremonies'],
  },
  {
    id: 'street-style-fusion',
    name: 'Street Style Fusion',
    tagline: 'The culture, remixed',
    description: 'Lagos meets global sneaker culture',
    emotionalPillar: 'DISCOVERY',
    colorAccent: GOLD_ACCENT,
    occasions: ['Social', 'Casual', 'Nightlife'],
    culturalContexts: ['Lagos Streetwear', 'Global Afro Youth Culture'],
  },
  {
    id: 'traditional-contemporary',
    name: 'Traditional Contemporary',
    tagline: 'Heritage, reimagined',
    description: 'Aso Oke as power suit, bridge between generations',
    emotionalPillar: 'PRIDE',
    colorAccent: GOLD_ACCENT,
    occasions: ['Weddings', 'Religious', 'Cultural Events'],
    culturalContexts: ['Aso Oke', 'Intergenerational Craft'],
  },
  {
    id: 'avant-garde',
    name: 'Avant-Garde',
    tagline: 'Fashion is your canvas',
    description: 'Rules are for breaking, body as gallery',
    emotionalPillar: 'EMPOWERMENT',
    colorAccent: GOLD_ACCENT,
    occasions: ['Editorial', 'Art Events', 'Fashion Week'],
    culturalContexts: ['Experimental Atelier', 'Future Africa'],
  },
  {
    id: 'everyday-elegance',
    name: 'Everyday Elegance',
    tagline: 'Grace is a daily practice',
    description: 'Every day worth the good fabric',
    emotionalPillar: 'BELONGING',
    colorAccent: GOLD_ACCENT,
    occasions: ['Work', 'Social', 'Casual'],
    culturalContexts: ['Daily Luxury', 'Refined Practicality'],
  },
];
