# UI Design System

Shared UI components and design system for Fasnexi.

## Usage

```typescript
import { Button, Card, Input } from '@repo/ui';
```

## Structure

```
src/
├── theme/       # Colors, typography, spacing
├── components/  # Design system components
├── animations/  # Shared animation definitions
└── icons/       # Icon library
```

## Theming

Components use a centralized theme system. See `theme/` for configuration.

## Contributing

Add new components to `components/` and export from `src/index.ts`.