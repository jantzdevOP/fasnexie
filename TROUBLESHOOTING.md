# FasNexi Troubleshooting Guide

## Expo Metro Bundler Errors

### Error: `Package subpath './src/lib/TerminalReporter' is not defined by "exports"`

**Root Cause:** Corrupted or mismatched dependencies causing Metro to access internal Node.js modules incorrectly.

**Solution:**

```bash
# 1. Clean everything
rm -rf pnpm-lock.yaml node_modules .pnpm
rm -rf apps/mobile/node_modules apps/api/node_modules
rm -rf packages/*/node_modules

# 2. Reinstall from scratch
pnpm install

# 3. Clear Expo cache
cd apps/mobile
npx expo start --clear
```

**If still failing:**
```bash
# Option A: Use pnpm store cleanup
pnpm store prune
pnpm install --force

# Option B: Nuclear reset (not recommended for team)
rm -rf ~/.pnpm-store
pnpm install --prefer-frozen-lockfile
```

---

## TypeScript Config Errors

### Error: `The property 'options.mode' must be one of: 'strip'. Received 'transform'`

**Root Cause:** TypeScript configuration using incompatible `moduleResolution: "bundler"` with Expo CLI.

**Solution:** Already fixed in `packages/tsconfig/react-native.json`. If you still see this:

```bash
# Verify the tsconfig is using node moduleResolution
cat packages/tsconfig/react-native.json | grep moduleResolution

# Should show: "moduleResolution": "node"
```

---

## Dependency Conflicts

### Mobile app won't start with Jest/TypeScript errors

1. Ensure `@repo/tsconfig` is properly linked:
   ```bash
   pnpm install --workspace
   ```

2. Check `apps/mobile/tsconfig.json` extends react-native config:
   ```json
   {
     "extends": "@repo/tsconfig/react-native.json"
   }
   ```

---

## Development Server

### Port 3000 or 8081 already in use

```bash
# Kill process on port 3000 (API)
lsof -ti:3000 | xargs kill -9

# Kill process on port 8081 (Metro)
lsof -ti:8081 | xargs kill -9
```

---

## Database Connection Issues

### PostgreSQL Connection Refused

```bash
# Ensure Docker services are running
docker compose -f infra/docker/docker-compose.yml up -d

# Verify connection
psql postgresql://user:password@localhost:5432/fasnexi -c "SELECT 1"
```

### Prisma Migration Errors

```bash
# Reset dev database (careful - deletes all local data)
pnpm db:migrate:reset

# Seed data
pnpm db:seed

# View schema
pnpm db:studio
```

---

## Common Workflows

### Full project reset (recommended for major issues)
```bash
# From repo root
pnpm clean
rm -rf pnpm-lock.yaml node_modules .pnpm
pnpm install
cd apps/mobile
npx expo start --clear
```

### Run both API and mobile dev servers
```bash
# Terminal 1 - API
cd apps/api
pnpm dev

# Terminal 2 - Mobile (in different terminal)
cd apps/mobile
pnpm dev
```

### Run all tests
```bash
pnpm test          # Unit tests
pnpm test:e2e      # End-to-end tests
pnpm type-check    # TypeScript check
pnpm lint          # ESLint
```

---

## Need More Help?

Check the main README.md or run `pnpm --help` for workspace-level commands.
