# ADHD Test Funnel

Quiz → Account creation → Report → Sign in.

**Live:** https://adhd-test-funnel.vercel.app (API: https://adhd-test-funnel-production.up.railway.app/health). See [Trying the flow](#trying-the-flow) for the scenarios to check.

## Structure

```
apps/
  backend/             NestJS API (port 4000)
    Dockerfile         production image: applies migrations, then starts the API
    railway.json       Railway build (Dockerfile) and health check
    prisma/            Prisma schema and migrations
    src/
      common/          shared helpers
      config/          env validation
      prisma/          PrismaService (global module)
      health/          GET /health (API + DB check)
      quiz/            GET /quizzes/:slug
        definition/    quiz definition types and integrity validation
        releases/      quiz versions defined in code, published on startup
        evaluation/    answer validation and scoring (pure functions)
      attempts/        POST /attempts
      session/         session and guest-attempt cookies, SessionGuard
      users/           user persistence
      auth/            sign up, sign in, sign out, current user
      reports/         GET /reports/me
        sections/      one builder per report section
        content/       report texts per outcome
  frontend/            Next.js app (port 3000), proxies /api/* to the backend
    src/
      app/             App Router routes, root layout, design tokens
      features/        one folder per feature (quiz, auth, report):
                         api/ requests · components/ rendering only · hooks/ component logic
                         lib/ pure helpers · constants.ts · types.ts
        quiz/          landing (entry question), quiz steps, answers store, particle head, submission
        auth/          two-step sign-up, sign-in, sign-out, zod schemas
        report/        report sections, score gauge, empty state
      proxy.ts         optimistic session check for /report
      shared/
        api/           fetch clients (browser: /api, server: API_URL + forwarded cookies), ApiError
        config/        route paths
        lib/           cn, math and formatting helpers
        ui/            design-system components (Button, IconButton, TextInput, TextLink, Logo, header, footer)
docker-compose.yml     PostgreSQL 17
```

The client and the server are independent apps with their own dependencies and lockfiles.

## Tech stack

- **Backend:** NestJS 12 (ESM), Prisma 7 + PostgreSQL, class-validator, JWT in an httpOnly cookie, argon2
- **Frontend:** Next.js 16 (App Router), React 19, Tailwind CSS 4, react-hook-form + zod
- **Deployment:** backend and PostgreSQL on Railway (Docker image), frontend on Vercel

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
- Backend health check: http://localhost:4000/health (also reachable through the frontend at http://localhost:3000/api/health)

There is no seed step: the backend publishes the quiz versions defined in code on startup.

### Trying the flow

1. **Quiz → account → report.** Open `/`, pick a gender, answer the five statements, then create an account in two steps (email, password). The report opens with the score you just got.
2. **Retake.** *Retake the test* in the report: a signed-in retake goes straight back to the report, which now compares the new score with the previous one.
3. **Sign in.** *Sign out*, then sign in at `/sign-in` with the same credentials to see the latest report.
4. **Existing account after a guest quiz.** Sign out, take the quiz again and enter the registered email at sign-up: you are sent to sign-in with the email filled in, and after signing in the quiz you just took becomes the current result.

## Deployment

```
browser ──► Vercel: Next.js ──/api/*──► Railway: NestJS (Docker) ──► Railway: PostgreSQL
```

The browser only ever talks to the frontend domain (see [the API proxy decision](#architecture-decisions)), so there is no CORS or cross-site cookie setup.

**Backend and database (Railway)**

1. Create a project and add a **PostgreSQL** database.
2. Add a service from this repository. In its settings set **Root Directory** to `apps/backend` (it builds the `Dockerfile` there) and **Config File Path** to `/apps/backend/railway.json`: Railway does not look for the config file inside the root directory, and the file sets the `/health` check.
3. Set the service variables:
   - `DATABASE_URL` = `${{Postgres.DATABASE_URL}}`
   - `JWT_SECRET` = a long random string, e.g. `openssl rand -base64 48`
   - `NODE_ENV` = `production` (session cookies become `Secure`)
   - `PORT` = `4000`, so the port the API listens on is known when generating the domain
4. Generate a public domain on port `4000`. Every deploy applies pending migrations, then the API publishes new quiz versions on boot.

**Frontend (Vercel)**

1. Import the repository with **Root Directory** `apps/frontend` (framework: Next.js).
2. Set `API_URL` to the backend's public URL, e.g. `https://adhd-backend.up.railway.app`, for Production and Preview.
3. Deploy. `API_URL` is read at build time, so redeploy the frontend after changing it.

The backend image can be checked locally the same way it runs on Railway:

```bash
docker build -t adhd-backend apps/backend
docker run -p 4000:4000 -e DATABASE_URL=postgresql://adhd:adhd@host.docker.internal:5432/adhd \
  -e JWT_SECRET=change-me -e NODE_ENV=production adhd-backend
```

## API

| Method | Path              | Description                                                                                          |
| ------ | ----------------- | ---------------------------------------------------------------------------------------------------- |
| GET    | `/quizzes/:slug`  | Current (latest) version of a quiz: `{ id, version, questions }`. Scoring rules are not exposed.      |
| POST   | `/attempts`       | Submit a completed quiz: `{ quizVersionId, answers: [{ questionKey, optionKey }] }` → `{ id }`. Signed-in: saved to the user. Guest: sets the `guest_attempt` cookie. |
| POST   | `/auth/check-email` | `{ email }` → `{ registered }`. Lets sign-up send existing users to sign-in after the email step. |
| POST   | `/auth/sign-up`   | `{ email, password }` (8–128 chars) → `{ id, email }`, starts a session, claims the guest attempt. `409` if the email is taken. |
| POST   | `/auth/sign-in`   | `{ email, password }` → `{ id, email }`, starts a session, claims the guest attempt. `401` on wrong credentials. |
| POST   | `/auth/sign-out`  | Ends the session (`204`).                                                                            |
| GET    | `/auth/me`        | Current user `{ id, email }`, `401` without a session.                                               |
| GET    | `/reports/me`     | Report for the user's latest attempt: `{ attemptId, completedAt, sections }`. `401` without a session, `404` if no quiz was completed. |

Report sections are a discriminated union on `type`, so the client renders each by its type:

| `type`     | Fields                                                              | Used for                               |
| ---------- | ------------------------------------------------------------------- | -------------------------------------- |
| `score`    | `label`, `score`, `maxScore`                                        | Score gauge with the outcome label     |
| `progress` | `previousScore`, `previousCompletedAt`, `currentScore`, `summary`   | Change since the previous attempt      |
| `text`     | `variant` (`callout` / `plain`), `body`                             | Understanding; emotional regulation (Low) |
| `list`     | `marker` (`check` / `bullet`), `intro?`, `items`, `note?`           | Strengths; emotional regulation (High) |
| `faq`      | `items: [{ question, answer }]`                                     | Frequently asked questions             |

Every section also has `id` and `title`.

Validation errors return `400` with a list of problems in `message`, e.g. `question "gender" is not answered`. Emails are trimmed and lowercased before validation.

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
| `quiz_answers`  | Raw answer per question (`attempt_id` + `question_key`), e.g. `{ "optionKey": "agree" }`; the shape is defined by the question type. |

Rules the model relies on:

- **Versions are append-only.** Changing questions, options or scoring publishes a new `quiz_versions` row; published rows are never updated. Every attempt references the exact version it was taken on (`ON DELETE RESTRICT`).
- **Question keys are semantic and stable.** The same `question_key` across versions means the answers are comparable; a question whose meaning changes gets a new key.
- **Answers are stored raw.** Option keys, not points — scores are derived through the attempt's version, so re-scoring or new report sections never require rewriting stored answers.
- **Retakes append.** A retake creates a new attempt; the latest one (`user_id, completed_at DESC` index) is the current result, earlier ones remain as history.
- **Ids are UUID v7** — non-enumerable in URLs and time-ordered for index locality.

## Architecture decisions

- **Quiz content is code-owned, the database holds the published snapshot.** Each version is a typed `QuizRelease` in `src/quiz/releases`, reviewed like any other code change. On startup `QuizReleasePublisher` validates every release (unique snake_case keys, scoring covers exactly the options of scored questions, every score maps to an outcome), inserts missing versions and refuses to start if a published version no longer matches its code.
- **Scoring rules are data inside the version.** The definition names a scoring `strategy` and its parameters (points per option, outcome bands on a 0–100 scale), so thresholds and weights are versioned together with the questions they apply to.
- **Evaluation is pure domain logic.** `validateAnswers` and `scoreAnswers` (`src/quiz/evaluation`) take a definition and answers and return problems or a result — no Nest or Prisma inside, so services stay thin orchestration.
- **Attempts are validated against the version the user saw.** The client sends back the `quizVersionId` it was served, so publishing a new version mid-session can't mismatch answers and questions.
- **The result is not returned on submit.** `POST /attempts` returns only the attempt id; the score is shown in the report, which requires an account — matching the Quiz → Account → Report funnel.
- **Stateless session in an httpOnly cookie.** `session` holds a JWT `{ sub: userId }` (`HttpOnly`, `SameSite=Lax`, `Secure` in production, lifetime `SESSION_TTL_DAYS`), so the token is never readable from JavaScript. `SessionService` owns every cookie; `SessionGuard` + `@CurrentUserId()` protect routes.
- **CSRF: `SameSite=Lax` plus a JSON-only API.** `Lax` keeps the cookies off cross-site requests, but the response to a cross-site form post can still set them, so another site could sign a visitor into the attacker's account and collect their answers. The API parses only `application/json`, which a cross-site page can't send without CORS, so such forms fail validation. A cross-site form can still sign a visitor out, which exposes nothing.
- **The frontend reaches the API through its own origin.** Next.js rewrites `/api/*` to `API_URL`, so the browser only ever talks to the frontend domain: session cookies stay first-party even when the apps are deployed on different domains (`SameSite=Lax` would drop them cross-site), and the backend needs no CORS. `API_URL` is server-only and is read at build time, so it must be set before `next build`.
- **The UI renders the quiz the API serves.** Pages fetch the current quiz version on the server (`serverApi`, rendered per request, so `next build` never calls the backend) and pass it to client components; questions, options and their order are never hard-coded. The first `profile` question is the landing's entry question, the rest are quiz steps.
- **Quiz progress lives on the client until submission.** Answers are kept in a small `useSyncExternalStore` store mirrored to `sessionStorage` under the quiz version id, so a reload resumes at the first unanswered question and a new quiz version never reuses stale answers. Choosing the entry answer on the landing starts a fresh attempt; nothing reaches the backend until `POST /attempts`.
- **The landing illustration is drawn, not shipped as an image.** The particle head is a canvas animation (particles assemble into the head, then drift); positions, sizes, opacity and shape (from a solid disc to a ring with a white centre) of its ~2.9k particles were traced from the design export into `lib/head-particles/data.ts` (~17 KB) and drawn from pre-rendered sprites. It renders the final frame without animation under `prefers-reduced-motion`.
- **Auth forms validate early, the backend decides.** Sign-up is one react-hook-form form with two steps (email, then password, as in the design); zod schemas mirror the backend rules for instant feedback, and backend errors (`401` wrong credentials) are shown as returned.
- **An existing account is sent to sign-in, not rejected.** After the email step sign-up calls `POST /auth/check-email`; a registered email goes to `/sign-in?email=…` with the email filled in. On the password step the email is read-only with a *Change* action that returns to the email step, so every email passes the check; a `409` there (registered in between) redirects the same way. Signing in claims the guest attempt exactly like sign-up, so the quiz just taken becomes the account's current result.
- **Route protection is optimistic in `proxy.ts`, authoritative on the server.** `proxy.ts` only checks that a `session` cookie exists before `/report`; the backend verifies it when the report is loaded. Signed-in users are deliberately not redirected away from `/sign-in`: the frontend can't verify the JWT, so a stale cookie would bounce between the two pages.
- **The report page is a server-rendered list of typed sections.** `/report` fetches `GET /reports/me` with the user's cookies (`401` → sign-in, `404` → "take the test" empty state) and renders each section by its `type`; the switch is exhaustive, so a new section type fails the build until it has a renderer. Presentation hints (`variant`, `marker`) come from the backend, so the UI never branches on section ids. The score is the full-width hero with an SVG gauge whose needle sweeps in (static under reduced motion); the FAQ uses native `<details>`, so the page ships almost no client JavaScript — only the sign-out button is interactive.
- **Guest attempts are claimed through a signed cookie.** A guest submission sets `guest_attempt` — a JWT `{ attemptId }` — instead of trusting an id sent by the client. Sign up *and* sign in assign that attempt to the user (only if it is still unowned), so a guest retake before signing in to an existing account also becomes the user's current result.
- **The report is built at read time from pluggable section builders.** `ReportsService` loads the user's attempts (answers + quiz version each) into a `ReportContext` `{ current, previous }`; every section is a `SectionBuilder` — `(context) => section | null` — listed in `REPORT_SECTIONS`. A builder returns `null` when it lacks data (e.g. no outcome content, or no comparable earlier attempt), so a section never breaks the report. Texts live in `reports/content`, separate from the logic; the content's shape can pick the section type too (emotional regulation is a list for High and a paragraph for Low).
- **Results are snapshots, report copy is live.** Score and outcome are fixed at submission; the report texts and sections are rendered from the current code, so improved copy and new sections reach old attempts too.
- **Progress compares only attempts of the same quiz version.** Different questions measure different things, so after a quiz update the comparison reappears once the user has two attempts on the new version.

## Trade-offs

- **Publishing on startup instead of a seed script.** Code and data can't drift apart and there is no manual step to forget on deploy, at the cost of the app writing reference data during boot. With several instances starting at once, a unique-constraint race can fail one of them; it succeeds on restart.
- **No refresh tokens or server-side sessions.** A single JWT keeps auth simple; the cost is that a session can't be revoked before it expires (sign-out only clears the cookie).
- **Unclaimed guest attempts stay in the database.** Guests who never sign up leave attempts with `user_id = null`; a periodic cleanup job would be the next step.
- **No rate limiting on sign-in.** Out of scope for the task; in production it would sit in front of `/auth/*`.
- **The email-first sign-up reveals whether an email is registered.** `check-email` (like the `409` on sign-up) lets anyone test an address; that is the usual cost of routing existing users to sign-in, and rate limiting on `/auth/*` is the mitigation.
- **The report loads the full attempt history.** Simple and enough for a handful of retakes; with long histories the context would load only what the registered builders need.

## Evolving the quiz and report

**Changing the quiz** (questions, options, points or thresholds):

1. Add `src/quiz/releases/adhd-v2.release.ts` with `version: 2` and append it to `QUIZ_RELEASES`. Never edit a published release — startup fails if you do.
2. Keep the `key` of questions whose meaning is unchanged; give a new key to any question whose meaning changes.
3. Deploy. The new version is published on startup and becomes current for new attempts; earlier attempts keep pointing to the version they were taken on.

**Changing the scoring algorithm:** add a new strategy type to the `ScoringRules` union, a matching `case` in `scoreAnswers` and its checks in `validateQuizRelease`, then use it in a new release. Existing versions keep their original strategy.

**Adding a report section:** write a `SectionBuilder` in `src/reports/sections` and add it to `REPORT_SECTIONS` in `build-report.ts` (a new section `type` also needs a renderer on the client). The context gives it everything it may depend on:

- `current.result` — outcome and score (`outcomeSection()` wraps builders whose texts depend on the outcome);
- `current.answers` / `current.quiz` — answers to specific questions, interpreted through the version they were given on; look questions up by `questionKey` and return `null` if the version didn't have them;
- `previous` — all earlier attempts, newest first, each with its own answers and version (see `progress.section.ts`).
