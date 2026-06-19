# FasNexi

**Powered by Culture. Styled by Intelligence.**

FasNexi is a social operating system for African fashion where discovery, identity, aspiration, and commerce converge into a premium cultural experience.

## About
FasNexi is designed as a cultural operating system, not a utility app. Every journey is shaped by emotional design pillars, sensory consistency, and strict dark-first luxury visual language.

## The Five Emotional Pillars
| Pillar | Promise |
|---|---|
| Discovery | Curiosity is rewarded with fresh cultural perspective |
| Pride | Users see their identity reflected with dignity |
| Aspiration | Premium interactions invite desire and growth |
| Belonging | Community experiences feel intimate and affirming |
| Empowerment | Tools enable users to style, create, and earn |

## Tech Stack
- Turborepo + pnpm workspaces
- Mobile: Expo SDK 53 + React Native + Expo Router
- API: Next.js App Router + Prisma + Better Auth
- Data: PostgreSQL 16 + Redis
- AI: Anthropic Claude context injection
- Payments: Stripe, Paystack, Flutterwave, M-Pesa
- Media: Cloudinary

## Prerequisites
- Node.js 20+
- pnpm 8.10+
- Docker (for local infra)

## Setup
```bash
pnpm install
cp .env.example .env.local
docker compose -f infra/docker/docker-compose.yml up -d
pnpm dev
```

## Architecture
```text
                      +----------------------------+
                      |        apps/mobile         |
                      |  Expo Router + RN + UX     |
                      +-------------+--------------+
                                    |
                                    v
+---------------------------+   +--------------------------+
|     packages/ui/types     |<->|        apps/api          |
| shared design + contracts |   | Next.js API + Prisma     |
+---------------------------+   +-------------+------------+
                                              |
                       +----------------------+----------------------+
                       | PostgreSQL | Redis | Cloudinary | Payments |
                       +---------------------------------------------+
```

## Brand Identity
### Colors
- Primary Black `#0B0B0B`
- Secondary Beige `#E8DCCB`
- Accent Gold `#D4AF37`
- Neutral White `#F5F5F5`

### Typography
- Display: PlayfairDisplay / PlayfairDisplay-Bold
- Body: Inter / Inter-Medium

## Development Commands
```bash
pnpm dev
pnpm lint
pnpm test
pnpm type-check
pnpm build
pnpm format
```

## License
Proprietary
