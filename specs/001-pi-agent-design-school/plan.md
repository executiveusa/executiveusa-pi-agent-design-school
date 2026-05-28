# Technical Plan — PI Agent Design School

**Plan ID:** 001  
**Version:** 1.0  
**Date:** 2026-05-28  

---

## 1. Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│  Public UI (Next.js 15 App Router)                       │
│  /(public) • /academy • /admin                           │
└──────────────────────┬──────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────┐
│  API Layer (Next.js Route Handlers)                      │
│  /api/handshake • /api/grill-me • /api/courses           │
│  /api/prompts • /api/evals • /api/certificates           │
│  /api/model-scout • /api/catalog • /api/search           │
└──────────┬───────────────────────┬──────────────────────┘
           │                       │
┌──────────▼──────┐    ┌──────────▼──────────────────────┐
│  PostgreSQL      │    │  packages/                       │
│  + pgvector      │    │  eval-harness                   │
│  (Drizzle ORM)   │    │  certificate-issuer             │
└─────────────────┘    │  model-scout                     │
                       │  legacy-ingestor                 │
                       │  agent-protocol                  │
                       │  course-compiler                 │
                       │  prompt-pack-compiler            │
                       │  paperclip-adapter               │
                       │  postiz-adapter                  │
                       │  slopless-guard                  │
                       └─────────────────────────────────┘
```

---

## 2. Directory Architecture

```
/
├── app/
│   ├── (public)/
│   │   ├── page.tsx                 # Home — HeroAgentArrival + training flow
│   │   ├── tracks/
│   │   │   ├── page.tsx             # Track constellation view
│   │   │   └── [slug]/page.tsx     # Track detail
│   │   ├── prompt-library/
│   │   │   ├── page.tsx
│   │   │   └── [id]/page.tsx
│   │   ├── model-lab/page.tsx
│   │   ├── certificates/
│   │   │   └── verify/[id]/page.tsx
│   │   └── pricing/page.tsx
│   ├── academy/
│   │   ├── page.tsx
│   │   ├── enroll/page.tsx
│   │   └── graduate/page.tsx
│   ├── admin/
│   │   ├── layout.tsx
│   │   ├── ingest/page.tsx
│   │   ├── prompts/page.tsx
│   │   ├── courses/page.tsx
│   │   ├── evals/page.tsx
│   │   ├── certificates/page.tsx
│   │   └── approvals/page.tsx
│   ├── api/
│   │   ├── handshake/route.ts
│   │   ├── grill-me/route.ts
│   │   ├── catalog/route.ts
│   │   ├── search/route.ts
│   │   ├── prompts/
│   │   │   ├── route.ts
│   │   │   └── [id]/route.ts
│   │   ├── promptpacks/
│   │   │   ├── route.ts
│   │   │   └── [slug]/route.ts
│   │   ├── courses/
│   │   │   ├── route.ts
│   │   │   └── [slug]/
│   │   │       ├── route.ts
│   │   │       └── poml/route.ts
│   │   ├── enroll/route.ts
│   │   ├── evals/
│   │   │   ├── submit/route.ts
│   │   │   └── [runId]/route.ts
│   │   ├── certificates/
│   │   │   └── verify/[id]/route.ts
│   │   ├── model-scout/
│   │   │   ├── route.ts
│   │   │   └── tasks/[task]/route.ts
│   │   └── mcp/route.ts
│   ├── llms.txt/route.ts
│   ├── llms-full.txt/route.ts
│   ├── agents.json/route.ts
│   └── a2a/manifest.json/route.ts
├── packages/
│   ├── legacy-ingestor/
│   ├── agent-protocol/
│   ├── course-compiler/
│   ├── prompt-pack-compiler/
│   ├── eval-harness/
│   ├── certificate-issuer/
│   ├── model-scout/
│   ├── synthia-ui/
│   ├── paperclip-adapter/
│   ├── postiz-adapter/
│   └── slopless-guard/
├── db/
│   ├── schema/
│   │   ├── index.ts
│   │   ├── users.ts
│   │   ├── agents.ts
│   │   ├── courses.ts
│   │   ├── prompts.ts
│   │   ├── evals.ts
│   │   ├── certificates.ts
│   │   ├── access.ts
│   │   └── audit.ts
│   ├── migrations/
│   └── seed/
│       ├── tracks.ts
│       └── prompts.ts
├── docs/
│   ├── architecture/
│   ├── product/
│   ├── api/
│   ├── gtm/
│   └── protected-niches/
├── protected-niches/
│   └── cloneyfanz/
├── specs/
│   └── 001-pi-agent-design-school/
├── reports/
└── .claude/
    └── commands/
```

---

## 3. Technology Decisions

| Concern | Choice | Rationale |
|---------|--------|-----------|
| Framework | Next.js 15 App Router | SSG for discovery docs, RSC for data-heavy pages, route handlers for API |
| ORM | Drizzle ORM | Type-safe, lightweight, migration-first; matches TypeScript strict |
| Database | PostgreSQL + pgvector | Relational integrity + vector search for semantic prompt retrieval |
| Styling | Tailwind CSS v4 | Utility-first, Synthia tokens as CSS custom properties |
| Testing | Vitest + Playwright | Fast unit/integration; Playwright for E2E smoke |
| Secrets | Infisical | Never hardcoded; env references in .env.example |
| Deployment | Docker + Coolify | Self-hosted, portable, no vendor lock-in for primary |
| Package manager | pnpm | Workspaces for monorepo; fast, disk-efficient |

---

## 4. Endpoint Implementation Strategy

1. **JSON contract first** — OpenAPI spec in `specs/001/contracts/agent-api.openapi.yaml`
2. **Route handler** — TypeScript implementation in `app/api/`
3. **Unit tests** — Vitest with mocked DB and mocked external providers
4. **Integration tests** — fixture-based, no live API calls
5. **UI consumption** — React components fetch from route handlers

---

## 5. Database Strategy

- Drizzle schema in `db/schema/`
- `pnpm run db:generate` → generates SQL migrations
- `pnpm run db:migrate` → applies to local Postgres
- Seed data: 5 MVP tracks, 5 prompt packs, 15 example prompts
- `import_reports` table tracks legacy ingestion runs

---

## 6. Legacy Ingestion Strategy

- TypeScript crawler in `packages/legacy-ingestor/`
- Polite crawl: 1 req/s rate limit, respectful user agent
- Dry-run mode: no writes, reports what would be imported
- Snapshot storage: raw HTML in `raw_snapshots` table or filesystem
- Normalization: content hash dedup, legacy ID preservation
- Tests: local HTML fixtures in `packages/legacy-ingestor/fixtures/`

---

## 7. Agent Protocol Strategy

| Document | Purpose |
|----------|---------|
| `/llms.txt` | Concise instructions and endpoint index for LLM crawlers |
| `/llms-full.txt` | Full machine docs, course catalog, and API reference |
| `/agents.json` | Capability and access manifest for agent frameworks |
| `/a2a/manifest.json` | Handshake and capability metadata for A2A protocol |
| `/api/courses/{slug}.poml` | Structured POML course export for agent consumption |
| `/mcp` | MCP-compatible tool index |

---

## 8. Eval Strategy

- Track-specific rubric objects in `packages/eval-harness/rubrics/`
- Deterministic scoring: field presence, value validation, safety check
- LLM-assisted judging interface defined but implementation is a mock for MVP
- Human review required for public certificate trust until eval reliability proven
- Rubric fixtures drive Vitest tests

---

## 9. Certificate Strategy

- HMAC-SHA256 hash from: agent_id + course_id + scores_json + issued_at + issuer_secret
- Issuer secret referenced from Infisical (env var in production)
- Public verify endpoint returns: certificate_id, agent_id, track, scores, issued_at, status
- Private data (prompt submissions, owner info) never returned from verify endpoint

---

## 10. Synthia UI Components

| Component | Purpose |
|-----------|---------|
| `HeroAgentArrival` | Landing — cinematic hero with agent flow visualization |
| `AgentHandshakePanel` | Interactive handshake form for human owners |
| `TrainingPathRail` | Visual timeline of modules and evals |
| `CourseTrackConstellation` | Radial/constellation layout of 5 MVP tracks |
| `PromptPackPreview` | Prompt pack card with structured metadata display |
| `ModelScoutMatrix` | Model recommendation grid by task |
| `EvalScorePanel` | Eval result with score breakdown and remediation |
| `CertificatePreview` | Certificate display with verification link |
| `GraduationTimeline` | Agent graduation progress visualization |
| `AdminIngestConsole` | Admin UI for legacy ingestion control |
| `AgentReadableEndpointMap` | Human-readable map of machine endpoints |

---

## 11. Testing Plan

| Layer | Tool | Scope |
|-------|------|-------|
| Unit | Vitest | Schema validation, rubric scoring, cert hashing, normalizers |
| Integration | Vitest | API route handlers with mocked DB |
| E2E | Playwright | Home, tracks, prompt library, certificate verify |
| Contract | Vitest + zod | All API endpoints against OpenAPI schema |
| Fixture | Vitest | Legacy ingestor against local HTML fixtures |

All external provider calls (HuggingFace, OpenRouter, Stripe, Postiz) must be mocked in tests.

---

## 12. Deployment

- `Dockerfile` for containerized Next.js app
- `docker-compose.coolify.yml` for Coolify deployment
- `docker-compose.dev.yml` for local development with Postgres + pgvector
- `.env.example` with placeholder references only
- Coolify deployment guide in `docs/architecture/coolify-deployment.md`
