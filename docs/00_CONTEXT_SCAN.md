# Context Scan — PI Agent Design School

**Scanned:** 2026-05-28  
**Repository:** executiveusa/executiveusa-pi-agent-design-school  
**Branch:** claude/pi-agent-design-school-tOaej  

## Summary

The repository is a brand-new, uninitialized project. A single README stub exists.  
All application code, tooling, and infrastructure must be created from scratch.

## Repository State

| Area | Status |
|------|--------|
| Package manager | None found |
| Languages | None yet |
| Frameworks | None yet |
| Spec-kit | Not initialized |
| Claude config | Not present |
| Docs | README only |
| Source code | None |
| Database schema | None |
| API routes | None |
| Design system | None |
| Tests | None |
| Deployment config | None |
| CI/CD | None |

## Assumptions

1. Package manager: **pnpm** (chosen for monorepo workspaces and speed).
2. Language: **TypeScript strict** throughout.
3. UI framework: **Next.js 15 App Router**.
4. Database: **PostgreSQL + pgvector** (managed via Supabase MCP in CI; Drizzle ORM locally).
5. Styling: **Tailwind CSS v4** with Synthia design tokens.
6. Rust services: planned for eval-runner, certificate-signer, legacy-crawler; TypeScript interfaces scaffolded for MVP.
7. Testing: **Vitest** for unit/integration, **Playwright** for E2E.
8. Secrets: **Infisical** references — no secrets hardcoded.
9. Deployment: **Docker + Coolify** primary; Vercel preview optional.
10. No existing content to migrate in-repo; legacy content lives at seedance2prompt.com.

## Safe Commands

- `pnpm install`
- `pnpm run dev`
- `pnpm run build`
- `pnpm run test`
- `pnpm run lint`
- `pnpm run typecheck`
- `pnpm run db:generate`
- `pnpm run db:migrate`
- `pnpm run ingest:dry-run`

## Forbidden Commands

- `rm -rf`
- `git reset --hard`
- `git clean -fd`
- `git add .` (use specific file staging)
- Reading or printing master.env
- Live paid API calls in tests

## Recommended Spec Flow

1. Context scan (this file)
2. Constitution
3. Specification
4. Technical plan
5. Task decomposition
6. Implementation (database → packages → API → UI → tests)
7. Deployment docs
8. Final report

## Risks

- Legacy scrape target (seedance2prompt.com) may have structure changes; fixture-based tests mitigate.
- pgvector extension required on Postgres; must be enabled in migration.
- Certificate hashing requires consistent issuer secret reference (Infisical).
- CloneyFanz protected folder must remain planning-only; runtime guard implemented in slopless-guard package.
