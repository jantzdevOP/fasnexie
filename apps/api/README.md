# Fasnexi API

Next.js 14 backend API server for Fasnexi platform.

## Architecture

- **Next.js 14**: App Router with Server Components
- **Prisma**: Type-safe ORM
- **Better Auth**: Authentication
- **Anthropic Claude**: AI integration
- **Redis**: Caching layer
- **BullMQ**: Background job queue
- **Stripe/Paystack**: Payment processing
- **Zod**: Validation schemas
- **TypeScript**: Type-safe development

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm 8.10.0+
- PostgreSQL
- Redis

### Installation

```bash
cd apps/api
pnpm install
```

### Environment Setup

```bash
cp .env.example .env.local
# Edit .env.local with your configuration
```

### Database Setup

```bash
# Run migrations
pnpm db:migrate

# Seed database
pnpm db:seed
```

### Development

```bash
# Start development server
pnpm dev

# Open Prisma Studio
pnpm db:studio
```

### Testing

```bash
# Unit tests
pnpm test

# E2E tests
pnpm test:e2e
```

### Building

```bash
pnpm build
pnpm start
```

## Project Structure

```
app/
├── api/
│   ├── auth/
│   ├── users/
│   ├── feed/
│   ├── products/
│   ├── wardrobe/
│   ├── nexie/
│   ├── orders/
│   ├── creators/
│   ├── challenges/
│   ├── exchange/
│   ├── events/
│   ├── payments/
│   └── webhooks/
└── layout.tsx

src/
├── lib/
│   ├── prisma/
│   ├── auth/
│   ├── ai/
│   ├── payments/
│   ├── media/
│   ├── email/
│   ├── redis/
│   └── queue/
├── middleware/
├── services/
├── validators/
└── types/

prisma/
├── schema.prisma
└── migrations/

tests/
├── unit/
├── integration/
└── e2e/
```

## API Endpoints

See API documentation in `docs/api/` for detailed endpoint specifications.

## Database

Prisma schema located in `prisma/schema.prisma`. View schema with:

```bash
pnpm db:studio
```

## Contributing

See root CONTRIBUTING.md for guidelines.