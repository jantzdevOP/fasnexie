# Shared Types

Shared TypeScript type definitions used across Fasnexi apps and packages.

## Usage

```typescript
import type { User, Product, Order } from '@repo/shared-types';
```

## Structure

```
src/
├── models/      # Data model types
├── api/         # API request/response types
└── constants/   # Shared constants
```

## Contributing

Add new types to appropriate subdirectory and export from `src/index.ts`.