# Shared Utils

Shared utility functions used across Fasnexi apps.

## Usage

```typescript
import { formatCurrency, formatDate, validateEmail } from '@repo/utils';
```

## Structure

```
src/
├── formatting/  # Currency, date, number formatting
├── validation/  # Shared Zod schemas
└── constants/   # Shared constants
```

## Contributing

Add new utilities to appropriate subdirectory and export from `src/index.ts`.