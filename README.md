# ADHD Test Funnel

Quiz → Account creation → Report → Sign in.

## Structure

```
apps/
  backend/             NestJS API (port 4000)
    prisma/            Prisma schema and migrations
    src/
      config/          env validation
      prisma/          PrismaService (global module)
      health/          GET /health (API + DB check)
  frontend/            Next.js app (port 3000)
    src/
      app/             App Router pages
      lib/api.ts       fetch wrapper for the API
docker-compose.yml     PostgreSQL 17
```

The client and the server are independent apps with their own dependencies and lockfiles.

## Tech stack

- **Backend:** NestJS 12 (ESM), Prisma 7 + PostgreSQL, class-validator, JWT in an httpOnly cookie, argon2
- **Frontend:** Next.js 16 (App Router), React 19, Tailwind CSS 4, react-hook-form + zod

## Running locally

Requirements: Node 24 (`nvm use`), Yarn 1, Docker.

```bash
# 1. Env files
cp apps/backend/.env.example apps/backend/.env
cp apps/frontend/.env.example apps/frontend/.env.local

# 2. Dependencies and database
yarn install:all
yarn db:up
yarn --cwd apps/backend db:migrate

# 3. Run (in two terminals)
yarn dev:backend
yarn dev:frontend
```

- Frontend: http://localhost:3000
- Backend health check: http://localhost:4000/health

## Data model

_TBD_

## Architecture decisions

_TBD_

## Trade-offs

_TBD_

## Evolving the quiz and report

_TBD_
