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
2. Install Node.js and pnpm
bash
# Install Node.js from https://nodejs.org/ or using nvm
node --version  # Should be 18+

# Install pnpm globally
npm install -g pnpm@8.10.0
pnpm --version
3. Install Dependencies
bash
pnpm install
4. Set Up Environment Variables
For Backend (API)
bash
cd apps/api
cp .env.example .env.local
# Edit .env.local with your configuration
Key variables to configure:

DATABASE_URL: PostgreSQL connection string
REDIS_URL: Redis connection string
ANTHROPIC_API_KEY: Claude AI API key
STRIPE_SECRET_KEY: Payment processing
For Mobile
bash
cd apps/mobile
cp .env.example .env.local
# Edit .env.local with your configuration
5. Database Setup
bash
# Navigate to API app
cd apps/api

# Run migrations
pnpm db:migrate

# (Optional) Seed database with test data
pnpm db:seed

# (Optional) Open Prisma Studio
pnpm db:studio
Development
Running All Apps
bash
pnpm dev
This will start:

Backend API on http://localhost:3000
Mobile app on http://localhost:8081 (Expo)
Running Specific Apps
bash
# Run only the API
pnpm --filter @fasnexi/api dev

# Run only the mobile app
pnpm --filter @fasnexi/mobile dev
Code Quality
bash
# Lint all code
pnpm lint

# Format all code
pnpm format

# Type checking
pnpm type-check

# Run all checks
pnpm lint && pnpm format && pnpm type-check
Testing
Unit Tests
bash
# Run all unit tests
pnpm test

# Run tests in watch mode
pnpm test --watch

# Run tests for specific workspace
pnpm --filter @fasnexi/api test
E2E Tests
bash
# Run E2E tests
pnpm test:e2e

# Run E2E tests in headed mode (see browser)
pnpm test:e2e --headed
Building
bash
# Build all packages and apps
pnpm build

# Build specific app
pnpm --filter @fasnexi/api build

# Build for production
NODE_ENV=production pnpm build
Database Management
Prisma Commands
bash
cd apps/api

# Create a new migration
pnpm prisma migrate dev --name descriptive_name

# Reset database (⚠️ deletes all data)
pnpm prisma migrate reset

# View database with Prisma Studio
pnpm db:studio

# Generate Prisma client
pnpm prisma generate
Troubleshooting
Port Already in Use
bash
# Find process using port 3000
lsof -i :3000

# Kill the process
kill -9 <PID>
Database Connection Issues
Ensure PostgreSQL is running
Verify DATABASE_URL in .env.local
Check database credentials
Run pnpm db:migrate to initialize
Redis Connection Issues
Ensure Redis is running (redis-server)
Verify REDIS_URL in .env.local
Test connection: redis-cli ping
Node Modules Issues
bash
# Clean install
pnpm clean
pnpm install
Git Workflow
Creating a Feature Branch
bash
git checkout -b feature/description
# or
git checkout -b fix/description
Committing Changes
We follow conventional commits:

bash
# Feature
git commit -m "feat: add new authentication method"

# Bug fix
git commit -m "fix: resolve memory leak in cache"

# Documentation
git commit -m "docs: update API documentation"
Additional Resources
Turborepo Documentation
Next.js Documentation
React Native Documentation
Prisma Documentation
TypeScript Documentation
Code

---

### **File 12: `docs/CONTRIBUTING.md`**

**Path:** `docs/CONTRIBUTING.md`

```markdown
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

feature/<description> # New features fix/<description> # Bug fixes docs/<description> # Documentation refactor/<description> # Code refactoring test/<description> # Tests chore/<description> # Maintenance tasks

Code

### 3. Commit Messages

Use conventional commits format:

<type>(<scope>): <subject>

<body> <footer> ```
Type:

feat: A new feature
fix: A bug fix
docs: Documentation only changes
style: Changes that don't affect code meaning
refactor: Code change that neither fixes a bug nor adds a feature
perf: Code change that improves performance
test: Adding or updating tests
chore: Changes to build process, dependencies, etc.
ci: Changes to CI/CD configuration
Scope: The area affected (e.g., api, mobile, auth, db)

Subject: Use imperative mood, lowercase, no period

Examples:

Code
feat(api): add user authentication endpoint
fix(mobile): resolve navigation stack issue
docs(setup): update installation guide
test(api): add tests for auth service
4. Code Style
We enforce code style using ESLint and Prettier.

bash
# Format your code
pnpm format

# Run linter
pnpm lint

# Type check
pnpm type-check
5. Testing
All contributions must include tests:

bash
# Run unit tests
pnpm test

# Run E2E tests
pnpm test:e2e

# Check coverage
pnpm test -- --coverage
Testing Guidelines:

Write tests for new features
Update tests for bug fixes
Aim for >80% code coverage
Test edge cases and error scenarios
6. Pull Request Process
Before submitting:

Ensure your code passes all tests: pnpm test
Run linter and formatter: pnpm lint && pnpm format
Type check: pnpm type-check
Build all packages: pnpm build
PR title: Follow conventional commits

Example: feat(api): add user profile endpoint
PR description: Use the provided template

Describe what changed and why
Link related issues
Add screenshots if applicable
Review process:

At least 1 maintainer review required
CI checks must pass
No merge conflicts
All conversations resolved
Areas for Contribution
Backend (API)
New API endpoints
Database schema improvements
Authentication/authorization
Performance optimization
Error handling
Testing
Mobile
UI/UX improvements
New screens/features
Navigation enhancements
Performance optimization
Testing
Shared Packages
New utility functions
Type definitions
Shared components
Configuration improvements
Documentation
Setup guides
API documentation
Architecture diagrams
Troubleshooting guides
Contributing guidelines
Infrastructure
Docker optimization
Terraform configurations
CI/CD improvements
Deployment automation
Reporting Bugs
Use GitHub Issues: Search for existing issues first
Provide details:
Clear description of the bug
Steps to reproduce
Expected vs actual behavior
Environment information
Screenshots/logs if applicable
Requesting Features
Use GitHub Issues: Check if feature already requested
Describe the feature:
Problem it solves
Proposed solution
Alternatives considered
Use cases
Code Review Checklist
When reviewing code, check:

 Code follows project style
 Tests are included
 No console.logs or debug code
 Types are properly defined
 Error handling is present
 Documentation is updated
 No breaking changes
 Performance impact considered
 Security implications reviewed
Release Process
Maintainers follow this process:

Update version in package.json
Update CHANGELOG.md
Create release branch
Tag release: git tag v1.0.0
Push and create release on GitHub
Deploy to production
Getting Help
Documentation: See docs/ directory
GitHub Discussions: Ask questions in project discussions
Issues: Search existing issues for solutions
Email: Contact maintainers directly
Recognition
Contributors will be recognized in:

GitHub contributors page
Release notes
Project README
Questions?
Feel free to:

Open an issue with the question label
Start a discussion
Contact maintainers
We're here to help!

Code

---

### **File 13: `docs/API_DOCUMENTATION.md`**

**Path:** `docs/API_DOCUMENTATION.md`

````markdown
# Fasnexi API Documentation

## Overview

The Fasnexi API is a RESTful backend built with Next.js 14, providing comprehensive endpoints for the fashion technology platform.

## Base URL

https://api.fasnexi.com/api http://localhost:3000/api (development)

Code

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
Response:

JSON
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user-uuid",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
Using the Token
Include the token in all authenticated requests:

bash
Authorization: Bearer <token>
API Endpoints
Authentication
POST /api/auth/signup - Create new account
POST /api/auth/signin - Sign in
POST /api/auth/signout - Sign out
GET /api/auth/me - Get current user
Users
GET /api/users/:id - Get user profile
PUT /api/users/:id - Update profile
GET /api/users/username/:username - Get by username
Products
GET /api/products?page=1&limit=20 - List products
GET /api/products/:id - Get product details
POST /api/products - Create product
PUT /api/products/:id - Update product
DELETE /api/products/:id - Delete product
Orders
POST /api/orders - Create order
GET /api/orders/:id - Get order
GET /api/orders - Get user orders
Payments
POST /api/payments - Process payment
Error Responses
JSON
{
  "error": "Error message",
  "code": "ERROR_CODE",
  "statusCode": 400
}
Common Error Codes
Code	Status	Description
UNAUTHORIZED	401	Authentication required or invalid token
FORBIDDEN	403	Insufficient permissions
NOT_FOUND	404	Resource not found
VALIDATION_ERROR	400	Invalid request data
DUPLICATE_ENTRY	409	Resource already exists
RATE_LIMITED	429	Too many requests
INTERNAL_ERROR	500	Server error
Rate Limiting
The API implements rate limiting:

Public endpoints: 100 requests per hour per IP
Authenticated endpoints: 1000 requests per hour per user
Premium endpoints: 5000 requests per hour per user
Rate limit info is provided in response headers:

Code
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1234567890
Pagination
Endpoints that return lists support pagination:

Code
GET /api/endpoint?page=1&limit=20&sort=name:asc
Response:

JSON
{
  "data": [],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "pages": 5
  }
}
Filtering and Search
Many endpoints support filtering:

Code
GET /api/products?category=clothing&price[gte]=10&price[lte]=100&search=blue
Support
Documentation: docs.fasnexi.com
GitHub Issues: Report bugs
Email: api-support@fasnexi.com
Code

---

### **File 14: `docs/ARCHITECTURE.md`**

**Path:** `docs/ARCHITECTURE.md`

```markdown
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

## Database Schema (High-Level)

### Core Entities

```
User
├── Profile
├── Wardrobe
├── Orders
├── Payments
└── Social Connections

Product
├── Details
├── Pricing
├── Images
├── Inventory
└── Reviews

Order
├── Items
├── Payments
├── Shipping
└── Status History

Creator
├── Profile
├── Collections
├── Followers
└── Analytics
```

## API Architecture

### Route Structure

```
app/
└── api/
    ├── auth/
    │   ├── signin/route.ts
    │   ├── signup/route.ts
    │   └── signout/route.ts
    ├── users/
    │   ├── [id]/route.ts
    │   └── profile/route.ts
    ├── products/
    │   ├── route.ts
    │   └── [id]/route.ts
    ├── orders/
    │   ├── route.ts
    │   └── [id]/route.ts
    └── ...
```

### Middleware Stack

```
1. Request logging
2. CORS handling
3. Authentication check
4. Authorization check
5. Input validation
6. Error handling
7. Response formatting
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
6. E2E tests
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
```

---

## **CHECKLIST: Web UI Upload Steps (10 minutes)**

Go to: https://github.com/jantzdevOP/fasnexie/tree/setup/github-actions-and-ci-cd

For each file:

- [ ] **File 1**: `.github/workflows/ci.yml`
- [ ] **File 2**: `.github/workflows/e2e-tests.yml`
- [ ] **File 3**: `.github/workflows/security.yml`
- [ ] **File 4**: `.github/workflows/release.yml`
- [ ] **File 5**: `.github/dependabot.yml`
- [ ] **File 6**: `apps/api/.env.example`
- [ ] **File 7**: `apps/mobile/.env.example`
- [ ] **File 8**: `.github/PULL_REQUEST_TEMPLATE.md`
- [ ] **File 9**: `.github/ISSUE_TEMPLATE/bug_report.md`
- [ ] **File 10**: `.github/ISSUE_TEMPLATE/feature_request.md`
- [ ] **File 11**: `docs/SETUP.md`
- [ ] **File 12**: `docs/CONTRIBUTING.md`
- [ ] **File 13**: `docs/API_DOCUMENTATION.md`
- [ ] **File 14**: `docs/ARCHITECTURE.md`

---

## **Final Step: Create PR & Merge**

After all 14 files are uploaded:

1. Go to https://github.com/jantzdevOP/fasnexie/pulls
2. Click "New Pull Request"
3. Base: `main` ← Compare: `setup/github-actions-and-ci-cd`
4. Title: `feat: add comprehensive GitHub Actions CI/CD workflows and documentation`
5. Description: Copy from the commit message above
6. Click "Create Pull Request"
7. Review and merge!

**Done! ✅ All 5 steps complete!*
