# FasNexi Development Guide

## Quick Start

```bash
# 1. Clone and install
git clone https://github.com/jantzdevOP/fasnexie.git
cd fasnexie
pnpm install

# 2. Setup environment
cp .env.example .env.local

# 3. Start Docker services (database, Redis)
docker compose -f infra/docker/docker-compose.yml up -d

# 4. Run database migrations
pnpm db:migrate

# 5. Start development servers in separate terminals

# Terminal 1 - API Server (Next.js)
cd apps/api
pnpm dev
# Runs on http://localhost:3000

# Terminal 2 - Mobile App (Expo)
cd apps/mobile
pnpm dev
# Scan QR code with Expo Go or press i/a for emulator
```

## Project Structure

```
fasnexie/
├── apps/
│   ├── api/                    # Next.js 16 API + backend
│   │   ├── src/
│   │   │   ├── lib/           # Utilities (auth, database, AI, payments)
│   │   │   ├── services/      # Business logic layer
│   │   │   └── validators/    # Zod schemas
│   │   ├── prisma/schema.prisma
│   │   └── package.json
│   │
│   └── mobile/                 # Expo + React Native app
│       ├── src/
│       │   └── app/           # Expo Router file-based routing
│       ├── app.config.js      # Expo configuration
│       └── package.json
│
├── packages/
│   ├── tsconfig/              # Shared TypeScript configs
│   ├── eslint-config/         # ESLint presets
│   ├── prettier-config/       # Prettier formatting
│   ├── shared-types/          # Shared TypeScript types
│   └── ui/                    # Shared UI components
│
├── infra/
│   └── docker/
│       └── docker-compose.yml # Local services (Postgres, Redis)
│
├── package.json               # Root workspace
├── pnpm-workspace.yaml        # Workspace configuration
└── turbo.json                 # Turborepo configuration
```

## Key Technologies

### Mobile
- **Expo SDK 53** - Managed React Native
- **Expo Router** - File-based routing
- **React Native 0.86** - Cross-platform UI
- **Zustand** - State management
- **React Native Reanimated** - Animations

### API
- **Next.js 16** - Full-stack React framework
- **Prisma 7** - Type-safe ORM
- **Better Auth** - Authentication system
- **BullMQ** - Job queue
- **Redis** - Caching & sessions

### Infrastructure
- **PostgreSQL 16** - Primary database
- **Redis** - Cache & message queue
- **Anthropic Claude** - AI context injection
- **Stripe/Paystack** - Payments

## Development Patterns

### API Development

```typescript
// 1. Define schema in Prisma
// prisma/schema.prisma
model Product {
  id String @id @default(cuid())
  name String
  price Float
  createdAt DateTime @default(now())
}

// 2. Generate client
pnpm db:migrate

// 3. Create validator
// src/validators/product.ts
import { z } from 'zod'

export const createProductSchema = z.object({
  name: z.string().min(1),
  price: z.number().positive(),
})

// 4. Create API route
// app/api/products/route.ts
import { prisma } from '@/lib/prisma'
import { createProductSchema } from '@/validators/product'

export async function POST(req: Request) {
  const data = createProductSchema.parse(await req.json())
  const product = await prisma.product.create({ data })
  return Response.json(product)
}
```

### Mobile Development

```typescript
// 1. Create route file
// src/app/products/index.tsx
import { useEffect, useState } from 'react'
import { View, Text } from 'react-native'

export default function ProductsScreen() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/products`)
      .then(r => r.json())
      .then(setProducts)
  }, [])

  return (
    <View>
      {products.map(p => (
        <Text key={p.id}>{p.name}</Text>
      ))}
    </View>
  )
}
```

## Workspace Commands

```bash
# Development
pnpm dev              # Start all dev servers
pnpm dev:mobile       # Start mobile only
pnpm dev:api          # Start API only

# Testing
pnpm test             # Run all tests
pnpm test:e2e         # Run E2E tests
pnpm test:watch       # Watch mode

# Quality
pnpm lint             # Run ESLint
pnpm format           # Format with Prettier
pnpm type-check       # TypeScript check

# Building
pnpm build            # Build all apps
pnpm build:mobile     # Build for production

# Database
pnpm db:migrate       # Run migrations
pnpm db:seed          # Seed database
pnpm db:studio        # Open Prisma Studio
```

## Environment Variables

### API (`apps/api/.env.local`)
```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/fasnexi

# Redis
REDIS_URL=redis://localhost:6379

# Auth
BETTER_AUTH_SECRET=your-secret-here
BETTER_AUTH_URL=http://localhost:3000

# External Services
ANTHROPIC_API_KEY=your-api-key
STRIPE_SECRET_KEY=sk_test_...
```

### Mobile (`apps/mobile/.env.local`)
```env
EXPO_PUBLIC_API_URL=http://localhost:3000
EXPO_PUBLIC_APP_NAME=FasNexi
```

## Testing

### Unit Tests (Jest)
```bash
# Run tests
pnpm test

# Watch mode
pnpm test --watch

# Coverage
pnpm test --coverage
```

### E2E Tests (Playwright)
```bash
# Run tests
pnpm test:e2e

# Interactive mode
pnpm test:e2e --ui

# Debug specific test
pnpm test:e2e tests/auth.spec.ts --debug
```

## Performance Tips

1. **Use Turbo caching:**
   ```bash
   pnpm build  # Uses cached results from previous builds
   ```

2. **Selective installation:**
   ```bash
   # Install only mobile dependencies
   pnpm --filter @fasnexi/mobile install
   ```

3. **Watch mode with esbuild:**
   ```bash
   # Faster TypeScript watching
   pnpm type-check --watch
   ```

## Debugging

### Mobile App
```bash
# Start with dev menu enabled
cd apps/mobile
pnpm dev

# In expo CLI:
# Press 'd' for debug menu
# Connect React Native Debugger
```

### API Server
```bash
# VSCode debug config (.vscode/launch.json)
{
  "type": "node",
  "request": "attach",
  "name": "Attach to Next.js",
  "skipFiles": ["<node_internals>/**"],
  "port": 9229
}

# Start with debugging
NODE_OPTIONS="--inspect" pnpm dev
```

## Deployment

### Mobile
```bash
# Build for iOS
eas build --platform ios

# Build for Android
eas build --platform android

# Submit to app stores
eas submit
```

### API
```bash
# Build production image
docker build -f apps/api/Dockerfile -t fasnexi-api .

# Deploy to hosting (Vercel, Railway, etc.)
pnpm build
```

## Troubleshooting

See [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) for common issues and solutions.
