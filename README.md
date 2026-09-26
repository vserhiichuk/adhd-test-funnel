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
yarn --cwd apps/backend db:deploy

# 3. Run (in two terminals)
yarn dev:backend
yarn dev:frontend
```

- Frontend: http://localhost:3000
- Backend health check: http://localhost:4000/health

## Data model

```
users 1 ──── * quiz_attempts * ──── 1 quiz_versions
                    │
                    1
                    │
                    * quiz_answers
```

| Table           | Purpose                                                                                                   |
| --------------- | --------------------------------------------------------------------------------------------------------- |
| `users`         | Account: email (stored lowercased, unique) and argon2 password hash.                                      |
| `quiz_versions` | Immutable snapshot of a published quiz (`quiz_slug` + `version`). `definition` (JSONB) holds questions, answer options and scoring rules exactly as users saw them. |
| `quiz_attempts` | One completed pass of a quiz. `user_id` is null for guests until they sign up. `result` (JSONB) is the scoring snapshot (`{ outcome, score }`) taken at completion. |
| `quiz_answers`  | Raw answer per question (`attempt_id` + `question_key`), e.g. `{ "optionKeys": ["agree"] }`.              |

Rules the model relies on:

- **Versions are append-only.** Changing questions, options or scoring publishes a new `quiz_versions` row; published rows are never updated. Every attempt references the exact version it was taken on (`ON DELETE RESTRICT`).
- **Question keys are semantic and stable.** The same `question_key` across versions means the answers are comparable; a question whose meaning changes gets a new key.
- **Answers are stored raw.** Option keys, not points — scores are derived through the attempt's version, so re-scoring or new report sections never require rewriting stored answers.
- **Retakes append.** A retake creates a new attempt; the latest one (`user_id, completed_at DESC` index) is the current result, earlier ones remain as history.
- **Ids are UUID v7** — non-enumerable in URLs and time-ordered for index locality.

## Architecture decisions

_TBD_

## Trade-offs

_TBD_

## Evolving the quiz and report

_TBD_
