# ADHD Test Funnel

Quiz → account → report → sign in. NestJS API, Next.js frontend, PostgreSQL.

**Live:** https://adhd-test-funnel.vercel.app · API health: https://adhd-test-funnel-production.up.railway.app/health

## Running locally

Node 24, Yarn 1, Docker.

```bash
cp apps/backend/.env.example apps/backend/.env
cp apps/frontend/.env.example apps/frontend/.env.local
yarn install:all && yarn db:up && yarn --cwd apps/backend db:deploy
yarn dev:backend    # http://localhost:4000
yarn dev:frontend   # http://localhost:3000
```

There is no seed step: the backend publishes the quiz on startup.

**Scenarios to try:** take the quiz as a guest → create an account → report · *Retake the test* from the report (shows the change since last time) · sign out and sign in · take the quiz as a guest again and enter a registered email at sign-up → you are sent to sign-in, and the new attempt becomes the current result.

## Structure

```
apps/backend         NestJS: quiz (versions, validation, scoring), attempts, auth + session, reports
apps/frontend        Next.js App Router: features/{quiz, auth, report}, shared/{api, ui, lib, config}
docker-compose.yml   PostgreSQL for local development
```

- Two independent apps with their own dependencies and lockfiles.
- Backend modules follow controller → service → Prisma. Domain logic (answer validation, scoring, report sections) is pure functions.
- Frontend features are split into `services/` (API requests), `hooks/` (logic), `components/` (rendering only), `lib/`, `constants.ts`, `types.ts`.
- API: `GET /quizzes/:slug`, `POST /attempts`, `POST /auth/{check-email, sign-up, sign-in, sign-out}`, `GET /auth/me`, `GET /reports/me`, `GET /health`.

## Data model

```
users 1 ── * quiz_attempts * ── 1 quiz_versions
                    1
                    └── * quiz_answers
```

| Table           | Stores                                                                                   |
| --------------- | ---------------------------------------------------------------------------------------- |
| `users`         | Email (unique, lowercased) and argon2 password hash                                      |
| `quiz_versions` | Immutable snapshot of a published quiz: questions, options and scoring rules (JSONB)     |
| `quiz_attempts` | One completed pass: quiz version, `user_id` (null for a guest), result `{ outcome, score }` |
| `quiz_answers`  | Raw answer per question: `question_key` → `{ optionKey }`                                |

- **Versions are append-only.** An attempt always points to the version it was taken on.
- **Answers are stored raw** (option keys, not points), so new scoring or report logic never rewrites old data.
- **A retake is a new attempt.** The latest one is the current result; earlier ones are history.

## Key architecture decisions

- **Quiz versions are defined in code** (`quiz/releases`) and published on startup after validation. The app refuses to start if a published version was edited.
- **Scoring is data inside the version:** points per option and outcome bands on a 0–100 scale (High ≥ 60, Low below).
- **The report is assembled from section builders** `(context) => section | null` over the current and previous attempts. Texts per outcome are kept separately from the logic. The client renders sections by `type`.
- **Guest attempts are saved immediately** and linked to the account on sign-up or sign-in through a signed `guest_attempt` cookie.
- **Session:** a JWT in an httpOnly `SameSite=Lax` cookie. The API accepts JSON only, which blocks login CSRF.
- **The browser talks only to the frontend domain:** Next.js proxies `/api/*` to the backend, so cookies stay first-party and no CORS is needed.
- **The UI renders whatever quiz the API serves.** No questions are hard-coded; answers stay in `sessionStorage` per quiz version until submission.

## Trade-offs

- **Publishing on startup instead of a seed script.** No manual step on deploy, but the app writes reference data during boot.
- **One JWT, no refresh tokens or server-side sessions.** Simple, but a session can't be revoked before it expires.
- **No rate limiting on `/auth/*`.** `check-email` also reveals whether an email is registered, the cost of sending existing users to sign-in.
- **Guest attempts that never sign up stay in the database.** A cleanup job would be the next step.
- **Progress is compared only within the same quiz version**, since different questions measure different things.
- **The report loads the whole attempt history.** Fine for a handful of retakes.

## Future changes to the quiz and report

- **Questions, options, points or thresholds:** add a release with the next version (e.g. `adhd-v2.release.ts`) to `QUIZ_RELEASES` and deploy. Old attempts keep their version, and the frontend picks up the new quiz without changes (as long as it has a `profile` question for the landing and single-choice questions). Questions whose meaning is unchanged keep their `key`, so answers stay comparable.
- **A new scoring algorithm:** a new `strategy` in the scoring rules. Older versions keep theirs.
- **A new report section:** a builder in `reports/sections`, added to `REPORT_SECTIONS`. It can use the outcome, answers to specific questions (looked up by `key` in the attempt's own version) and previous attempts, and returns `null` when it lacks data. A new section `type` also needs a renderer on the client.
- **Report texts:** edit `reports/content`. Texts are rendered at read time, so old attempts get them too.

## Deployment

Browser → Vercel (Next.js) → `/api/*` → Railway (NestJS in Docker, migrations applied on start) → Railway PostgreSQL.

- **Railway:** root directory `apps/backend`, config file `/apps/backend/railway.json`, variables `DATABASE_URL`, `JWT_SECRET`, `NODE_ENV=production`, `PORT=4000`.
- **Vercel:** root directory `apps/frontend`, variable `API_URL` = the backend URL (read at build time).
