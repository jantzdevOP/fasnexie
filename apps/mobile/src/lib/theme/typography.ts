export const typography = {
  families: {
    display: 'PlayfairDisplay',
    displayBold: 'PlayfairDisplay-Bold',
    body: 'Inter',
    bodyMedium: 'Inter-Medium',
  },
  sizes: {
    hero: { fontSize: 48, lineHeight: 56, letterSpacing: -0.5 },
    h1: { fontSize: 36, lineHeight: 44 },
    h2: { fontSize: 28, lineHeight: 36 },
    h3: { fontSize: 22, lineHeight: 30 },
    bodyLarge: { fontSize: 18, lineHeight: 28 },
    body: { fontSize: 16, lineHeight: 24 },
    caption: { fontSize: 12, lineHeight: 16 },
    overline: { fontSize: 10, letterSpacing: 1.5, textTransform: 'uppercase' as const },
    price: { fontSize: 24, lineHeight: 32 },
  },
} as const;
