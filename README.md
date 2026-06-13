# Fasnexi

Fasnexi is a comprehensive fashion technology platform built with a modern Turborepo monorepo structure.

## Project Structure

```
fasnexi/
├── apps/
│   ├── mobile/          # React Native (Expo) mobile application
│   └── api/             # Next.js 14 API server
├── packages/            # Shared packages and libraries
│   ├── shared-types/    # TypeScript type definitions
│   ├── ui/              # Design system and UI components
│   ├── eslint-config/   # Shared ESLint configuration
│   ├── prettier-config/ # Shared Prettier configuration
│   ├── tsconfig/        # Shared TypeScript configurations
│   └── utils/           # Shared utility functions
├── infra/               # Infrastructure as Code (Terraform, Docker)
└── docs/                # Internal documentation
```

## Quick Start

### Prerequisites

- Node.js 18+
- pnpm 8.10.0+

### Installation

```bash
pnpm install
```

### Development

```bash
# Run all apps in development mode
pnpm dev

# Run specific app
pnpm --filter @fasnexi/mobile dev
pnpm --filter @fasnexi/api dev
```

### Building

```bash
# Build all packages and apps
pnpm build

# Build specific workspace
pnpm --filter @fasnexi/api build
```

### Testing

```bash
# Run all tests
pnpm test

# Run specific workspace tests
pnpm --filter @fasnexi/api test

# Run E2E tests
pnpm test:e2e
```

### Code Quality

```bash
# Lint all code
pnpm lint

# Format all code
pnpm format

# Type check
pnpm type-check
```

## Architecture

### Apps

- **Mobile** (`apps/mobile`): React Native application using Expo Router with 5-tab navigation
- **API** (`apps/api`): Next.js 14 backend server with comprehensive REST endpoints

### Packages

- **shared-types**: Centralized TypeScript type definitions
- **ui**: Design system and reusable UI components
- **eslint-config**: Shared ESLint rules and configurations
- **prettier-config**: Shared code formatting rules
- **tsconfig**: Shared TypeScript compiler options
- **utils**: Common utility functions

## Tech Stack

### Frontend
- React Native 18+
- Expo Router
- TypeScript
- Nativewind (Tailwind for React Native)
- Zustand (State management)
- TanStack React Query

### Backend
- Next.js 14 (App Router)
- TypeScript
- Prisma (ORM)
- Better Auth
- Anthropic Claude
- Stripe/Paystack/Flutterwave

### Infrastructure
- Docker
- Terraform
- Redis
- PostgreSQL

### Build & Development
- pnpm (Package manager)
- Turborepo (Monorepo orchestration)
- Jest (Testing)
- ESLint & Prettier (Code quality)

## Contributing

See [CONTRIBUTING.md](./docs/onboarding/CONTRIBUTING.md) for guidelines.

## License

MIT