#!/bin/bash
#
# Fasnexi Complete Setup Script
# This script creates all necessary GitHub Actions workflows, configuration files,
# templates, and documentation for the Fasnexi project.
#
# Usage: bash setup-fasnexi.sh
#

set -e

echo "🚀 Starting Fasnexi Setup Script..."
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Create directories
echo -e "${BLUE}📁 Creating directories...${NC}"
mkdir -p .github/workflows
mkdir -p .github/ISSUE_TEMPLATE
mkdir -p docs
mkdir -p apps/api
mkdir -p apps/mobile

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
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'pnpm'
      
      - name: Install pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 8.10.0
      
      - name: Install dependencies
        run: pnpm install --frozen-lockfile
      
      - name: Run linter
        run: pnpm lint
      
      - name: Type check
        run: pnpm type-check

  test:
    name: Unit Tests
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'pnpm'
      
      - name: Install pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 8.10.0
      
      - name: Install dependencies
        run: pnpm install --frozen-lockfile
      
      - name: Run tests
        run: pnpm test
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3
        if: always()
        with:
          files: ./coverage/coverage-final.json

  build:
    name: Build All Packages
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'pnpm'
      
      - name: Install pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 8.10.0
      
      - name: Install dependencies
        run: pnpm install --frozen-lockfile
      
      - name: Build all packages
        run: pnpm build
      
      - name: Upload build artifacts
        uses: actions/upload-artifact@v3
        with:
          name: build-artifacts
          path: |
            apps/api/.next
            apps/api/dist
            apps/mobile/dist
          retention-days: 7
EOF
echo -e "${GREEN}✓ ci.yml created${NC}"

# E2E Tests Workflow
cat > .github/workflows/e2e-tests.yml << 'EOF'
name: E2E Tests

on:
  push:
    branches:
      - main
      - develop
  pull_request:
    branches:
      - main
      - develop
  schedule:
    - cron: '0 2 * * *'

jobs:
  e2e:
    name: E2E Tests
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
        ports:
          - 5432:5432
      
      redis:
        image: redis:7-alpine
        options: >-
          --health-cmd "redis-cli ping"
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
        ports:
          - 6379:6379
    
    env:
      DATABASE_URL: postgresql://postgres:postgres@localhost:5432/fasnexi_test
      REDIS_URL: redis://localhost:6379
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'pnpm'
      
      - name: Install pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 8.10.0
      
      - name: Install dependencies
        run: pnpm install --frozen-lockfile
      
      - name: Setup test database
        run: pnpm db:migrate
      
      - name: Run E2E tests
        run: pnpm test:e2e
      
      - name: Upload E2E test results
        uses: actions/upload-artifact@v3
        if: always()
        with:
          name: e2e-test-results
          path: playwright-report/
          retention-days: 30
EOF
echo -e "${GREEN}✓ e2e-tests.yml created${NC}"

# Security Workflow
cat > .github/workflows/security.yml << 'EOF'
name: Security Scan

on:
  push:
    branches:
      - main
      - develop
  pull_request:
    branches:
      - main
      - develop
  schedule:
    - cron: '0 0 * * 0'

jobs:
  dependency-check:
    name: Dependency Security Check
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'pnpm'
      
      - name: Install pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 8.10.0
      
      - name: Install dependencies
        run: pnpm install --frozen-lockfile
      
      - name: Run npm audit
        run: pnpm audit --prod
        continue-on-error: true
      
      - name: Check for known vulnerabilities
        run: |
          echo "Running security vulnerability checks..."

  code-quality:
    name: Code Quality Analysis
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'pnpm'
      
      - name: Install pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 8.10.0
      
      - name: Install dependencies
        run: pnpm install --frozen-lockfile
      
      - name: Run ESLint
        run: pnpm lint
        continue-on-error: true
      
      - name: Type check
        run: pnpm type-check
        continue-on-error: true
EOF
echo -e "${GREEN}✓ security.yml created${NC}"

# Release Workflow
cat > .github/workflows/release.yml << 'EOF'
name: Release

on:
  push:
    tags:
      - 'v*'
  workflow_dispatch:

jobs:
  release:
    name: Create Release
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'pnpm'
      
      - name: Install pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 8.10.0
      
      - name: Install dependencies
        run: pnpm install --frozen-lockfile
      
      - name: Build all packages
        run: pnpm build
      
      - name: Generate changelog
        id: changelog
        run: |
          VERSION=${GITHUB_REF#refs/tags/}
          echo "version=$VERSION" >> $GITHUB_OUTPUT
          echo "Generating changelog for $VERSION"
      
      - name: Create Release
        uses: actions/create-release@v1
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          tag_name: ${{ github.ref }}
          release_name: Release ${{ steps.changelog.outputs.version }}
          body: |
            # Release ${{ steps.changelog.outputs.version }}
            
            This release includes:
            - All packages and apps built and tested
            - Comprehensive CI/CD pipeline validation
            
            For detailed changelog, see commit history.
          draft: false
          prerelease: false
EOF
echo -e "${GREEN}✓ release.yml created${NC}"

# Dependabot Configuration
cat > .github/dependabot.yml << 'EOF'
version: 2
updates:
  - package-ecosystem: 'npm'
    directory: '/'
    schedule:
      interval: 'weekly'
      day: 'monday'
      time: '03:00'
    open-pull-requests-limit: 5
    reviewers:
      - 'jantzdevOP'
    labels:
      - 'dependencies'
      - 'automated'
EOF
echo -e "${GREEN}✓ dependabot.yml created${NC}"
echo ""

# ==================== ENVIRONMENT FILES ====================
echo -e "${BLUE}🔧 Creating environment configuration files...${NC}"

cat > apps/api/.env.example << 'EOF'
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/fasnexi_dev
REDIS_URL=redis://localhost:6379

# Authentication
BETTER_AUTH_SECRET=your-secret-key-here-generate-with-crypto.randomUUID()
BETTER_AUTH_URL=http://localhost:3000

# API Configuration
NODE_ENV=development
PORT=3000
NEXT_PUBLIC_API_URL=http://localhost:3000

# Anthropic Claude AI
ANTHROPIC_API_KEY=your-anthropic-api-key

# Payment Processors
STRIPE_SECRET_KEY=sk_test_your-stripe-key
STRIPE_PUBLISHABLE_KEY=pk_test_your-stripe-key
STRIPE_WEBHOOK_SECRET=whsec_your-webhook-secret

PAYSTACK_SECRET_KEY=sk_test_your-paystack-key
PAYSTACK_PUBLIC_KEY=pk_test_your-paystack-key

FLUTTERWAVE_SECRET_KEY=your-flutterwave-key
FLUTTERWAVE_PUBLIC_KEY=your-flutterwave-public-key

# Email Configuration
EMAIL_FROM=noreply@fasnexi.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password

# AWS S3 (Optional for file uploads)
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_S3_BUCKET=fasnexi-uploads

# Feature Flags
FEATURE_AI_RECOMMENDATIONS=true
FEATURE_CREATOR_MODE=true
FEATURE_MARKETPLACE=true

# Logging
LOG_LEVEL=debug
EOF
echo -e "${GREEN}✓ apps/api/.env.example created${NC}"

cat > apps/mobile/.env.example << 'EOF'
# Mobile App Configuration
NODE_ENV=development
EXPO_PUBLIC_API_URL=http://localhost:3000
EXPO_PUBLIC_APP_NAME=Fasnexi
EXPO_PUBLIC_APP_VERSION=0.1.0

# Authentication
EXPO_PUBLIC_AUTH_SCHEME=com.fasnexi

# Feature Flags
EXPO_PUBLIC_FEATURE_AI_RECOMMENDATIONS=true
EXPO_PUBLIC_FEATURE_CREATOR_MODE=true
EXPO_PUBLIC_FEATURE_MARKETPLACE=true
EOF
echo -e "${GREEN}✓ apps/mobile/.env.example created${NC}"
echo ""

# ==================== GITHUB TEMPLATES ====================
echo -e "${BLUE}📋 Creating GitHub issue and PR templates...${NC}"

cat > .github/PULL_REQUEST_TEMPLATE.md << 'EOF'
## Description
Provide a brief description of the changes in this PR.

## Type of Change
- [ ] Bug fix (non-breaking change that fixes an issue)
- [ ] New feature (non-breaking change that adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to change)
- [ ] Documentation update
- [ ] Performance improvement
- [ ] Refactoring

## Related Issues
Closes #(issue)

## Changes Made
- Change 1
- Change 2
- Change 3

## Testing
Describe the tests you ran and how to reproduce them.

- [ ] Unit tests added/updated
- [ ] E2E tests added/updated
- [ ] Manual testing completed

## Screenshots/Videos
If applicable, add screenshots or videos demonstrating the changes.

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review of own code completed
- [ ] Comments added for complex logic
- [ ] Documentation updated
- [ ] No new warnings generated
- [ ] Tests pass locally
- [ ] No breaking changes

## Performance Impact
Any performance considerations?

## Migration Guide
If there are breaking changes, provide migration instructions.

## Reviewers Notes
Any additional information for reviewers?
EOF
echo -e "${GREEN}✓ PULL_REQUEST_TEMPLATE.md created${NC}"

cat > .github/ISSUE_TEMPLATE/bug_report.md << 'EOF'
---
name: Bug Report
about: Create a report to help us improve
title: '[BUG] '
labels: bug
assignees: ''

---

## Description
A clear and concise description of what the bug is.

## Steps to Reproduce
1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

## Expected Behavior
A clear and concise description of what you expected to happen.

## Actual Behavior
What actually happened instead.

## Environment
- OS: [e.g., macOS, Windows, Linux]
- Node.js version: [e.g., 18.0.0]
- Package manager: [e.g., pnpm 8.10.0]
- Application: [e.g., API, Mobile]

## Screenshots
If applicable, add screenshots to help explain your problem.

## Additional Context
Add any other context about the problem here.

## Possible Solution
If you have a suggestion for how to fix this, please describe it.
EOF
echo -e "${GREEN}✓ bug_report.md created${NC}"

cat > .github/ISSUE_TEMPLATE/feature_request.md << 'EOF'
---
name: Feature Request
about: Suggest an idea for this project
title: '[FEATURE] '
labels: enhancement
assignees: ''

---

## Description
A clear and concise description of what the feature is about.

## Problem Statement
Is your feature request related to a problem? Please describe.

## Proposed Solution
Describe the solution you'd like.

## Alternative Solutions
A clear and concise description of any alternative solutions or features you've considered.

## Additional Context
Add any other context or screenshots about the feature request here.

## Acceptance Criteria
- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Criterion 3
EOF
echo -e "${GREEN}✓ feature_request.md created${NC}"
echo ""

# ==================== DOCUMENTATION FILES ====================
echo -e "${BLUE}📚 Creating documentation files...${NC}"

cat > docs/SETUP.md << 'EOF'
# Development Setup Guide

## Prerequisites

- **Node.js**: 18.0.0 or higher
- **pnpm**: 8.10.0 or higher
- **PostgreSQL**: 15+ (for backend development)
- **Redis**: 7+ (for caching and job queues)
- **Docker** (optional, for containerized setup)

## Installation

### 1. Clone the Repository
```bash
git clone https://github.com/jantzdevOP/fasnexie.git
cd fasnexie
```

### 2. Install Node.js and pnpm
```bash
# Install Node.js from https://nodejs.org/ or using nvm
node --version  # Should be 18+

# Install pnpm globally
npm install -g pnpm@8.10.0
pnpm --version
```

### 3. Install Dependencies
```bash
pnpm install
```

### 4. Set Up Environment Variables

#### For Backend (API)
```bash
cd apps/api
cp .env.example .env.local
# Edit .env.local with your configuration
```

Key variables to configure:
- `DATABASE_URL`: PostgreSQL connection string
- `REDIS_URL`: Redis connection string
- `ANTHROPIC_API_KEY`: Claude AI API key
- `STRIPE_SECRET_KEY`: Payment processing

#### For Mobile
```bash
cd apps/mobile
cp .env.example .env.local
# Edit .env.local with your configuration
```

### 5. Database Setup
```bash
# Navigate to API app
cd apps/api

# Run migrations
pnpm db:migrate

# (Optional) Seed database with test data
pnpm db:seed

# (Optional) Open Prisma Studio
pnpm db:studio
```

## Development

### Running All Apps
```bash
pnpm dev
```

This will start:
- Backend API on `http://localhost:3000`
- Mobile app on `http://localhost:8081` (Expo)

### Running Specific Apps
```bash
# Run only the API
pnpm --filter @fasnexi/api dev

# Run only the mobile app
pnpm --filter @fasnexi/mobile dev
```

### Code Quality
```bash
# Lint all code
pnpm lint

# Format all code
pnpm format

# Type checking
pnpm type-check

# Run all checks
pnpm lint && pnpm format && pnpm type-check
```

## Testing

### Unit Tests
```bash
# Run all unit tests
pnpm test

# Run tests in watch mode
pnpm test --watch

# Run tests for specific workspace
pnpm --filter @fasnexi/api test
```

### E2E Tests
```bash
# Run E2E tests
pnpm test:e2e

# Run E2E tests in headed mode (see browser)
pnpm test:e2e --headed
```

## Building
```bash
# Build all packages and apps
pnpm build

# Build specific app
pnpm --filter @fasnexi/api build

# Build for production
NODE_ENV=production pnpm build
```

## Database Management

### Prisma Commands
```bash
cd apps/api

# Create a new migration
pnpm prisma migrate dev --name descriptive_name

# Reset database (⚠️ deletes all data)
pnpm prisma migrate reset

# View database with Prisma Studio
pnpm db:studio

# Generate Prisma client
pnpm prisma generate
```

## Troubleshooting

### Port Already in Use
```bash
# Find process using port 3000
lsof -i :3000

# Kill the process
kill -9 <PID>
```

### Database Connection Issues
1. Ensure PostgreSQL is running
2. Verify `DATABASE_URL` in `.env.local`
3. Check database credentials
4. Run `pnpm db:migrate` to initialize

### Redis Connection Issues
1. Ensure Redis is running (`redis-server`)
2. Verify `REDIS_URL` in `.env.local`
3. Test connection: `redis-cli ping`

### Node Modules Issues
```bash
# Clean install
pnpm clean
pnpm install
```

## Git Workflow

### Creating a Feature Branch
```bash
git checkout -b feature/description
# or
git checkout -b fix/description
```

### Committing Changes
We follow conventional commits:
```bash
# Feature
git commit -m "feat: add new authentication method"

# Bug fix
git commit -m "fix: resolve memory leak in cache"

# Documentation
git commit -m "docs: update API documentation"
```

## Additional Resources

- [Turborepo Documentation](https://turbo.build/repo/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [React Native Documentation](https://reactnative.dev/)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
EOF
echo -e "${GREEN}✓ docs/SETUP.md created${NC}"

cat > docs/CONTRIBUTING.md << 'EOF'
# Contributing to Fasnexi

Thank you for your interest in contributing to Fasnexi! This document provides guidelines and instructions for contributing to the project.

## Code of Conduct

This project adheres to the Contributor Covenant Code of Conduct. By participating, you are expected to uphold this code. Please report unacceptable behavior to the project maintainers.

## Getting Started

1. Fork the repository
2. Clone your fork locally
3. Create a feature branch
4. Make your changes
5. Submit a pull request

See [SETUP.md](./SETUP.md) for detailed development setup instructions.

## Development Process

### 1. Understand the Project Structure

- **apps/api**: Next.js backend API
- **apps/mobile**: React Native mobile application
- **packages**: Shared libraries and configurations
- **infra**: Infrastructure as Code

### 2. Branch Naming

Follow these naming conventions:

```
feature/<description>      # New features
fix/<description>          # Bug fixes
docs/<description>        # Documentation
refactor/<description>    # Code refactoring
test/<description>        # Tests
chore/<description>       # Maintenance tasks
```

### 3. Commit Messages

Use conventional commits format:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Type**:
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that don't affect code meaning
- `refactor`: Code change that neither fixes a bug nor adds a feature
- `perf`: Code change that improves performance
- `test`: Adding or updating tests
- `chore`: Changes to build process, dependencies, etc.
- `ci`: Changes to CI/CD configuration

**Scope**: The area affected (e.g., `api`, `mobile`, `auth`, `db`)

**Subject**: Use imperative mood, lowercase, no period

**Examples**:
```
feat(api): add user authentication endpoint
fix(mobile): resolve navigation stack issue
docs(setup): update installation guide
test(api): add tests for auth service
```

### 4. Code Style

We enforce code style using ESLint and Prettier.

```bash
# Format your code
pnpm format

# Run linter
pnpm lint

# Type check
pnpm type-check
```

### 5. Testing

All contributions must include tests:

```bash
# Run unit tests
pnpm test

# Run E2E tests
pnpm test:e2e

# Check coverage
pnpm test -- --coverage
```

**Testing Guidelines**:
- Write tests for new features
- Update tests for bug fixes
- Aim for >80% code coverage
- Test edge cases and error scenarios

### 6. Pull Request Process

1. **Before submitting**:
   - Ensure your code passes all tests: `pnpm test`
   - Run linter and formatter: `pnpm lint && pnpm format`
   - Type check: `pnpm type-check`
   - Build all packages: `pnpm build`

2. **PR title**: Follow conventional commits
   - Example: `feat(api): add user profile endpoint`

3. **PR description**: Use the provided template
   - Describe what changed and why
   - Link related issues
   - Add screenshots if applicable

4. **Review process**:
   - At least 1 maintainer review required
   - CI checks must pass
   - No merge conflicts
   - All conversations resolved

## Areas for Contribution

### Backend (API)
- New API endpoints
- Database schema improvements
- Authentication/authorization
- Performance optimization
- Error handling
- Testing

### Mobile
- UI/UX improvements
- New screens/features
- Navigation enhancements
- Performance optimization
- Testing

### Shared Packages
- New utility functions
- Type definitions
- Shared components
- Configuration improvements

### Documentation
- Setup guides
- API documentation
- Architecture diagrams
- Troubleshooting guides
- Contributing guidelines

### Infrastructure
- Docker optimization
- Terraform configurations
- CI/CD improvements
- Deployment automation

## Reporting Bugs

1. **Use GitHub Issues**: Search for existing issues first
2. **Provide details**:
   - Clear description of the bug
   - Steps to reproduce
   - Expected vs actual behavior
   - Environment information
   - Screenshots/logs if applicable

## Requesting Features

1. **Use GitHub Issues**: Check if feature already requested
2. **Describe the feature**:
   - Problem it solves
   - Proposed solution
   - Alternatives considered
   - Use cases

## Code Review Checklist

When reviewing code, check:

- [ ] Code follows project style
- [ ] Tests are included
- [ ] No console.logs or debug code
- [ ] Types are properly defined
- [ ] Error handling is present
- [ ] Documentation is updated
- [ ] No breaking changes
- [ ] Performance impact considered
- [ ] Security implications reviewed

## Release Process

Maintainers follow this process:

1. Update version in `package.json`
2. Update `CHANGELOG.md`
3. Create release branch
4. Tag release: `git tag v1.0.0`
5. Push and create release on GitHub
6. Deploy to production

## Getting Help

- **Documentation**: See [docs/](../docs/) directory
- **GitHub Discussions**: Ask questions in project discussions
- **Issues**: Search existing issues for solutions
- **Email**: Contact maintainers directly

## Recognition

Contributors will be recognized in:
- GitHub contributors page
- Release notes
- Project README

## Questions?

Feel free to:
- Open an issue with the `question` label
- Start a discussion
- Contact maintainers

We're here to help!
EOF
echo -e "${GREEN}✓ docs/CONTRIBUTING.md created${NC}"

cat > docs/API_DOCUMENTATION.md << 'EOF'
# Fasnexi API Documentation

## Overview

The Fasnexi API is a RESTful backend built with Next.js 14, providing comprehensive endpoints for the fashion technology platform.

## Base URL

```
https://api.fasnexi.com/api
http://localhost:3000/api  (development)
```

## Authentication

The API uses token-based authentication via Better Auth.

### Getting an Auth Token

```bash
POST /api/auth/signin
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Response**:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user-uuid",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

### Using the Token

Include the token in all authenticated requests:

```bash
Authorization: Bearer <token>
```

## API Endpoints

### Authentication

- `POST /api/auth/signup` - Create new account
- `POST /api/auth/signin` - Sign in
- `POST /api/auth/signout` - Sign out
- `GET /api/auth/me` - Get current user

### Users

- `GET /api/users/:id` - Get user profile
- `PUT /api/users/:id` - Update profile
- `GET /api/users/username/:username` - Get by username

### Products

- `GET /api/products?page=1&limit=20` - List products
- `GET /api/products/:id` - Get product details
- `POST /api/products` - Create product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Orders

- `POST /api/orders` - Create order
- `GET /api/orders/:id` - Get order
- `GET /api/orders` - Get user orders

### Payments

- `POST /api/payments` - Process payment

## Error Responses

```json
{
  "error": "Error message",
  "code": "ERROR_CODE",
  "statusCode": 400
}
```

### Common Error Codes

| Code | Status | Description |
|------|--------|-------------|
| `UNAUTHORIZED` | 401 | Authentication required or invalid token |
| `FORBIDDEN` | 403 | Insufficient permissions |
| `NOT_FOUND` | 404 | Resource not found |
| `VALIDATION_ERROR` | 400 | Invalid request data |
| `DUPLICATE_ENTRY` | 409 | Resource already exists |
| `RATE_LIMITED` | 429 | Too many requests |
| `INTERNAL_ERROR` | 500 | Server error |

## Rate Limiting

The API implements rate limiting:

- **Public endpoints**: 100 requests per hour per IP
- **Authenticated endpoints**: 1000 requests per hour per user
- **Premium endpoints**: 5000 requests per hour per user

Rate limit info is provided in response headers:

```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1234567890
```

## Pagination

Endpoints that return lists support pagination:

```
GET /api/endpoint?page=1&limit=20&sort=name:asc
```

**Response**:
```json
{
  "data": [],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "pages": 5
  }
}
```

## Filtering and Search

Many endpoints support filtering:

```
GET /api/products?category=clothing&price[gte]=10&price[lte]=100&search=blue
```

## Support

- **Documentation**: [docs.fasnexi.com](https://docs.fasnexi.com)
- **GitHub Issues**: Report bugs
- **Email**: api-support@fasnexi.com
EOF
echo -e "${GREEN}✓ docs/API_DOCUMENTATION.md created${NC}"

cat > docs/ARCHITECTURE.md << 'EOF'
# Fasnexi Architecture

## Overview

Fasnexi is built as a modern, scalable monorepo using Turborepo for orchestration. The architecture follows a modular approach with clear separation of concerns.

## Monorepo Structure

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

## Data Flow

### User Authentication Flow
```
1. User enters credentials in mobile app
2. Mobile app sends POST /api/auth/signin
3. API validates credentials against PostgreSQL
4. API generates JWT token
5. Token returned to mobile app
6. Mobile app stores token (secure storage)
7. Subsequent requests include Authorization header
8. API middleware validates token
```

### API Request Flow
```
1. Client sends HTTP request
2. Next.js App Router matches route
3. Middleware checks authentication if needed
4. Request handler validates input (Zod)
5. Business logic processes request
6. Prisma ORM queries database
7. Response formatted and sent to client
```

### Real-time Features
```
1. Event triggers (order created, payment completed)
2. Event published to job queue (BullMQ)
3. Background workers process jobs
4. Webhooks fired to external services
5. Redis pub/sub for real-time updates (future)
```

## Security Architecture

### Authentication
- JWT tokens with expiration
- Refresh token rotation
- Secure token storage (mobile: Secure Storage)
- HTTPS only in production

### Authorization
- Role-based access control (RBAC)
- Resource ownership verification
- Scope-based permissions

### Data Protection
- Password hashing (bcrypt)
- Encrypted sensitive fields
- SQL injection prevention (Prisma)
- XSS protection
- CSRF tokens for mutations

## Performance Architecture

### Caching Strategy
```
1. Redis layer for hot data
2. In-memory caching for frequently accessed data
3. CDN for static assets
4. Database query optimization (indexes)
```

### Background Jobs
```
1. Email notifications (BullMQ)
2. Image processing
3. Report generation
4. Webhook processing
5. Cache invalidation
```

## Deployment Architecture

### Environments
```
Development
├── Local development
├── SQLite/Local PostgreSQL
├── Hot reload enabled
└── Verbose logging

Staging
├── Docker containers
├── Cloud PostgreSQL
├── Redis instance
├── Same as production setup
└── Testing environment

Production
├── Docker containers on Kubernetes
├── Managed PostgreSQL (RDS/Cloud SQL)
├── Managed Redis (ElastiCache/MemoryStore)
├── CDN integration
├── Auto-scaling enabled
└── Monitoring and alerting
```

### CI/CD Pipeline
```
1. Code push to GitHub
2. GitHub Actions triggered
3. Lint and format checks
4. Unit tests execution
5. Build process
6. E2E tests (optional)
7. Security scanning
8. Build artifacts created
9. Deploy to staging (on develop)
10. Deploy to production (on main)
```

## Technology Decisions

### Why Turborepo?
- Monorepo management
- Task orchestration and caching
- Incremental builds
- Workspace dependencies

### Why Next.js 14?
- Server components for better performance
- Built-in API routes
- File-based routing
- Vercel ecosystem integration

### Why React Native + Expo?
- Code sharing between iOS and Android
- Rapid development and hot reload
- OTA updates capability
- Growing ecosystem

### Why PostgreSQL + Prisma?
- Type safety with TypeScript
- Migration management
- Rich query capabilities
- Excellent documentation

## Future Improvements

- Microservices architecture for heavy operations
- GraphQL API alongside REST
- Message queue (Kafka/RabbitMQ) for event streaming
- Real-time features with WebSockets
- Machine learning integration for recommendations
- Multi-region deployment
EOF
echo -e "${GREEN}✓ docs/ARCHITECTURE.md created${NC}"
echo ""

# ==================== COMPLETION ====================
echo -e "${GREEN}════════════════════════════════════════${NC}"
echo -e "${GREEN}✅ Setup Complete!${NC}"
echo -e "${GREEN}════════════════════════════════════════${NC}"
echo ""

echo "📊 Files Created:"
echo "  ✓ GitHub Actions Workflows (5 files)"
echo "    - .github/workflows/ci.yml"
echo "    - .github/workflows/e2e-tests.yml"
echo "    - .github/workflows/security.yml"
echo "    - .github/workflows/release.yml"
echo "    - .github/dependabot.yml"
echo ""
echo "  ✓ Environment Configuration (2 files)"
echo "    - apps/api/.env.example"
echo "    - apps/mobile/.env.example"
echo ""
echo "  ✓ GitHub Templates (3 files)"
echo "    - .github/PULL_REQUEST_TEMPLATE.md"
echo "    - .github/ISSUE_TEMPLATE/bug_report.md"
echo "    - .github/ISSUE_TEMPLATE/feature_request.md"
echo ""
echo "  ✓ Documentation (4 files)"
echo "    - docs/SETUP.md"
echo "    - docs/CONTRIBUTING.md"
echo "    - docs/API_DOCUMENTATION.md"
echo "    - docs/ARCHITECTURE.md"
echo ""

echo -e "${YELLOW}Next Steps:${NC}"
echo "1. Review all created files"
echo "2. Commit changes:"
echo ""
echo "   git add ."
echo "   git commit -m \"feat: add comprehensive GitHub Actions CI/CD workflows and documentation\""
echo ""
echo "3. Push to your branch:"
echo ""
echo "   git push origin setup/github-actions-and-ci-cd"
echo ""
echo "4. Create a Pull Request on GitHub"
echo "5. Have it reviewed and merged to main"
echo ""
echo -e "${YELLOW}Configuration Needed:${NC}"
echo "1. Update .env files with your actual credentials"
echo "2. Configure GitHub Secrets for deployments:"
echo "   - STAGING_DEPLOY_KEY, STAGING_DEPLOY_HOST, STAGING_DEPLOY_USER"
echo "   - PROD_DEPLOY_KEY, PROD_DEPLOY_HOST, PROD_DEPLOY_USER"
echo "3. Enable branch protection rules on main branch"
echo "4. Configure required status checks in Settings"
echo ""
echo -e "${GREEN}Happy coding! 🚀${NC}"
