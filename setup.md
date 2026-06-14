#!/bin/bash
#
# Fasnexi Complete Setup Script
# Run this script from the root of your repository
# Usage: bash setup-fasnexi.sh
#

set -e

echo "🚀 Starting Fasnexi Setup Script..."
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Create directories
echo -e "${BLUE}📁 Creating directories...${NC}"
mkdir -p .github/workflows
mkdir -p .github/ISSUE_TEMPLATE
mkdir -p docs

echo -e "${GREEN}✓ Directories created${NC}"
echo ""

# ==================== GITHUB WORKFLOWS ====================
echo -e "${BLUE}📝 Creating GitHub Actions workflows...${NC}"

# CI Workflow
cat > .github/workflows/ci.yml << 'EOF'
name: CI

on:
  push:
    branches:
      - main
      - develop
  pull_request:
    branches:
      - main
      - develop

jobs:
  lint:
    name: Lint Code
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'pnpm'
      - uses: pnpm/action-setup@v2
        with:
          version: 8.10.0
      - run: pnpm install --frozen-lockfile
      - run: pnpm lint
      - run: pnpm type-check

  test:
    name: Unit Tests
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'pnpm'
      - uses: pnpm/action-setup@v2
        with:
          version: 8.10.0
      - run: pnpm install --frozen-lockfile
      - run: pnpm test
      - uses: codecov/codecov-action@v3
        if: always()

  build:
    name: Build All Packages
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'pnpm'
      - uses: pnpm/action-setup@v2
        with:
          version: 8.10.0
      - run: pnpm install --frozen-lockfile
      - run: pnpm build
      - uses: actions/upload-artifact@v3
        with:
          name: build-artifacts
          path: |
            apps/api/.next
            apps/api/dist
            apps/mobile/dist
          retention-days: 7
EOF
echo -e "${GREEN}✓ ci.yml${NC}"

# E2E Tests Workflow
cat > .github/workflows/e2e-tests.yml << 'EOF'
name: E2E Tests

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]
  schedule:
    - cron: '0 2 * * *'

jobs:
  e2e:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_USER: postgres
          POSTGRES_PASSWORD: postgres
          POSTGRES_DB: fasnexi_test
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
        ports: [5432:5432]
      redis:
        image: redis:7-alpine
        options: >-
          --health-cmd "redis-cli ping"
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
        ports: [6379:6379]
    env:
      DATABASE_URL: postgresql://postgres:postgres@localhost:5432/fasnexi_test
      REDIS_URL: redis://localhost:6379
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'pnpm'
      - uses: pnpm/action-setup@v2
        with:
          version: 8.10.0
      - run: pnpm install --frozen-lockfile
      - run: pnpm db:migrate
      - run: pnpm test:e2e
      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: e2e-test-results
          path: playwright-report/
          retention-days: 30
EOF
echo -e "${GREEN}✓ e2e-tests.yml${NC}"

# Security Workflow
cat > .github/workflows/security.yml << 'EOF'
name: Security Scan

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]
  schedule:
    - cron: '0 0 * * 0'

jobs:
  dependency-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'pnpm'
      - uses: pnpm/action-setup@v2
        with:
          version: 8.10.0
      - run: pnpm install --frozen-lockfile
      - run: pnpm audit --prod
        continue-on-error: true

  code-quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'pnpm'
      - uses: pnpm/action-setup@v2
        with:
          version: 8.10.0
      - run: pnpm install --frozen-lockfile
      - run: pnpm lint
        continue-on-error: true
      - run: pnpm type-check
        continue-on-error: true
EOF
echo -e "${GREEN}✓ security.yml${NC}"

# Release Workflow
cat > .github/workflows/release.yml << 'EOF'
name: Release

on:
  push:
    tags: ['v*']
  workflow_dispatch:

jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'pnpm'
      - uses: pnpm/action-setup@v2
        with:
          version: 8.10.0
      - run: pnpm install --frozen-lockfile
      - run: pnpm build
      - id: changelog
        run: |
          VERSION=${GITHUB_REF#refs/tags/}
          echo "version=$VERSION" >> $GITHUB_OUTPUT
      - uses: actions/create-release@v1
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          tag_name: ${{ github.ref }}
          release_name: Release ${{ steps.changelog.outputs.version }}
          body: Release ${{ steps.changelog.outputs.version }}
          draft: false
          prerelease: false
EOF
echo -e "${GREEN}✓ release.yml${NC}"

# Dependabot Configuration
cat > .github/dependabot.yml << 'EOF'
version: 2
updates:
  - package-ecosystem: npm
    directory: /
    schedule:
      interval: weekly
      day: monday
      time: '03:00'
    open-pull-requests-limit: 5
    reviewers: [jantzdevOP]
    labels: [dependencies, automated]
EOF
echo -e "${GREEN}✓ dependabot.yml${NC}"
echo ""

# ==================== ENVIRONMENT FILES ====================
echo -e "${BLUE}🔧 Creating environment files...${NC}"

cat > apps/api/.env.example << 'EOF'
DATABASE_URL=postgresql://user:password@localhost:5432/fasnexi_dev
REDIS_URL=redis://localhost:6379
BETTER_AUTH_SECRET=your-secret-key-here
BETTER_AUTH_URL=http://localhost:3000
NODE_ENV=development
PORT=3000
NEXT_PUBLIC_API_URL=http://localhost:3000
ANTHROPIC_API_KEY=your-anthropic-api-key
STRIPE_SECRET_KEY=sk_test_your-stripe-key
STRIPE_PUBLISHABLE_KEY=pk_test_your-stripe-key
STRIPE_WEBHOOK_SECRET=whsec_your-webhook-secret
PAYSTACK_SECRET_KEY=sk_test_your-paystack-key
PAYSTACK_PUBLIC_KEY=pk_test_your-paystack-key
FLUTTERWAVE_SECRET_KEY=your-flutterwave-key
FLUTTERWAVE_PUBLIC_KEY=your-flutterwave-public-key
EMAIL_FROM=noreply@fasnexi.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_S3_BUCKET=fasnexi-uploads
FEATURE_AI_RECOMMENDATIONS=true
FEATURE_CREATOR_MODE=true
FEATURE_MARKETPLACE=true
LOG_LEVEL=debug
EOF
echo -e "${GREEN}✓ apps/api/.env.example${NC}"

cat > apps/mobile/.env.example << 'EOF'
NODE_ENV=development
EXPO_PUBLIC_API_URL=http://localhost:3000
EXPO_PUBLIC_APP_NAME=Fasnexi
EXPO_PUBLIC_APP_VERSION=0.1.0
EXPO_PUBLIC_AUTH_SCHEME=com.fasnexi
EXPO_PUBLIC_FEATURE_AI_RECOMMENDATIONS=true
EXPO_PUBLIC_FEATURE_CREATOR_MODE=true
EXPO_PUBLIC_FEATURE_MARKETPLACE=true
EOF
echo -e "${GREEN}✓ apps/mobile/.env.example${NC}"
echo ""

# ==================== GITHUB TEMPLATES ====================
echo -e "${BLUE}📋 Creating GitHub templates...${NC}"

cat > .github/PULL_REQUEST_TEMPLATE.md << 'EOF'
## Description
Provide a brief description of the changes in this PR.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update
- [ ] Performance improvement
- [ ] Refactoring

## Related Issues
Closes #(issue)

## Changes Made
- Change 1
- Change 2

## Testing
Describe tests you ran.

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex logic
- [ ] Documentation updated
- [ ] Tests pass locally
- [ ] No breaking changes
EOF
echo -e "${GREEN}✓ PULL_REQUEST_TEMPLATE.md${NC}"

cat > .github/ISSUE_TEMPLATE/bug_report.md << 'EOF'
---
name: Bug Report
about: Create a report to help us improve
title: '[BUG] '
labels: bug
---

## Description
Clear description of the bug.

## Steps to Reproduce
1. Go to...
2. Click on...
3. See error

## Expected Behavior
What should happen.

## Environment
- OS: [macOS, Windows, Linux]
- Node.js: 18.x
- App: [API, Mobile]
EOF
echo -e "${GREEN}✓ bug_report.md${NC}"

cat > .github/ISSUE_TEMPLATE/feature_request.md << 'EOF'
---
name: Feature Request
about: Suggest an idea
title: '[FEATURE] '
labels: enhancement
---

## Description
Clear description.

## Problem Statement
What problem does this solve?

## Proposed Solution
How to solve it.

## Acceptance Criteria
- [ ] Criterion 1
- [ ] Criterion 2
EOF
echo -e "${GREEN}✓ feature_request.md${NC}"
echo ""

# ==================== DOCUMENTATION FILES ====================
echo -e "${BLUE}📚 Creating documentation...${NC}"

cat > docs/SETUP.md << 'EOF'
# Development Setup Guide

## Prerequisites
- Node.js 18+
- pnpm 8.10.0+
- PostgreSQL 15+
- Redis 7+

## Installation

1. Clone: `git clone https://github.com/jantzdevOP/fasnexie.git && cd fasnexie`
2. Install Node: `node --version` (should be 18+)
3. Install pnpm: `npm install -g pnpm@8.10.0`
4. Install deps: `pnpm install`

## Environment Setup

```bash
cd apps/api
cp .env.example .env.local
# Edit with your configuration
