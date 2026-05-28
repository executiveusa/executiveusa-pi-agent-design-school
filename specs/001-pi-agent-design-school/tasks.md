# Task Decomposition — PI Agent Design School

**Version:** 1.0  
**Date:** 2026-05-28  

Tasks are ordered by dependency. The first vertical slice (Group A) must work before deeper features.

---

## Group 1: Repository & Tooling Setup

### T-001: Initialize package.json and pnpm workspace
- **Req:** All engineering law requirements
- **Files:** `package.json`, `pnpm-workspace.yaml`, `.npmrc`
- **Check:** `pnpm install` succeeds
- **Risk:** Low
- **Approval needed:** No

### T-002: TypeScript configuration
- **Req:** TypeScript strict
- **Files:** `tsconfig.json`, `tsconfig.base.json`
- **Check:** `pnpm run typecheck` exits 0
- **Risk:** Low
- **Approval needed:** No

### T-003: Tailwind + Synthia tokens
- **Req:** Design law
- **Files:** `tailwind.config.ts`, `app/globals.css`
- **Check:** Build succeeds, tokens available
- **Risk:** Low
- **Approval needed:** No

### T-004: ESLint + Prettier
- **Files:** `.eslintrc.json`, `.prettierrc`
- **Check:** `pnpm run lint` exits 0
- **Risk:** Low
- **Approval needed:** No

### T-005: Vitest setup
- **Files:** `vitest.config.ts`, `vitest.setup.ts`
- **Check:** `pnpm run test` runs (empty suite passes)
- **Risk:** Low
- **Approval needed:** No

### T-006: Next.js 15 app initialization
- **Files:** `next.config.ts`, `app/layout.tsx`, `app/not-found.tsx`
- **Check:** `pnpm run dev` starts without error
- **Risk:** Low
- **Approval needed:** No

### T-007: Environment and secrets scaffolding
- **Files:** `.env.example`, `lib/env.ts`
- **Check:** No secrets exposed; env validation at startup
- **Risk:** Low
- **Approval needed:** No

---

## Group 2: Spec Artifacts (Complete)

### T-010: Context scan ✓
### T-011: Constitution ✓
### T-012: Specification ✓
### T-013: Technical plan ✓
### T-014: Task decomposition (this file) ✓
### T-015: API contracts (OpenAPI, JSON schemas) — see Group 3

---

## Group 3: Contracts and Schemas

### T-020: OpenAPI contract — agent-api.openapi.yaml
- **Files:** `specs/001-pi-agent-design-school/contracts/agent-api.openapi.yaml`
- **Check:** Valid OpenAPI 3.1
- **Risk:** Low

### T-021: A2A manifest schema
- **Files:** `specs/001-pi-agent-design-school/contracts/a2a-manifest.schema.json`
- **Risk:** Low

### T-022: Prompt schema
- **Files:** `specs/001-pi-agent-design-school/contracts/prompt.schema.json`
- **Risk:** Low

### T-023: Course schema
- **Files:** `specs/001-pi-agent-design-school/contracts/course.schema.json`
- **Risk:** Low

### T-024: Eval schema
- **Files:** `specs/001-pi-agent-design-school/contracts/eval.schema.json`
- **Risk:** Low

### T-025: Certificate schema
- **Files:** `specs/001-pi-agent-design-school/contracts/certificate.schema.json`
- **Risk:** Low

---

## Group 4: Database Schema

### T-030: Users and agents schema
- **Req:** FR-002, FR-004
- **Files:** `db/schema/users.ts`, `db/schema/agents.ts`
- **Check:** Drizzle generates valid SQL
- **Risk:** Low

### T-031: Courses and lessons schema
- **Req:** FR-005
- **Files:** `db/schema/courses.ts`
- **Risk:** Low

### T-032: Prompts schema
- **Req:** FR-006, FR-007
- **Files:** `db/schema/prompts.ts`
- **Risk:** Low

### T-033: Evals schema
- **Req:** FR-008
- **Files:** `db/schema/evals.ts`
- **Risk:** Low

### T-034: Certificates schema
- **Req:** FR-009
- **Files:** `db/schema/certificates.ts`
- **Risk:** Low

### T-035: Access and payments schema
- **Req:** FR-013
- **Files:** `db/schema/access.ts`
- **Risk:** Low

### T-036: Audit events schema
- **Req:** FR-014
- **Files:** `db/schema/audit.ts`
- **Risk:** Low

### T-037: Model profiles schema
- **Req:** FR-010
- **Files:** `db/schema/models.ts`
- **Risk:** Low

### T-038: Schema index + Drizzle config
- **Files:** `db/schema/index.ts`, `drizzle.config.ts`
- **Risk:** Low

### T-039: Seed data — MVP tracks and prompts
- **Files:** `db/seed/tracks.ts`, `db/seed/prompts.ts`, `db/seed/index.ts`
- **Risk:** Low

---

## Group 5: Synthia UI Foundation

### T-050: Synthia design tokens (CSS custom properties)
- **Files:** `app/globals.css`, `packages/synthia-ui/tokens.ts`
- **Risk:** Low

### T-051: Base layout and typography
- **Files:** `app/layout.tsx`, `app/(public)/layout.tsx`
- **Risk:** Low

### T-052: HeroAgentArrival component
- **Files:** `packages/synthia-ui/components/HeroAgentArrival.tsx`
- **Risk:** Low

### T-053: CourseTrackConstellation component
- **Files:** `packages/synthia-ui/components/CourseTrackConstellation.tsx`
- **Risk:** Low

### T-054: AgentReadableEndpointMap component
- **Files:** `packages/synthia-ui/components/AgentReadableEndpointMap.tsx`
- **Risk:** Low

### T-055: CertificatePreview component
- **Files:** `packages/synthia-ui/components/CertificatePreview.tsx`
- **Risk:** Low

### T-056: ModelScoutMatrix component
- **Files:** `packages/synthia-ui/components/ModelScoutMatrix.tsx`
- **Risk:** Low

### T-057: EvalScorePanel component
- **Files:** `packages/synthia-ui/components/EvalScorePanel.tsx`
- **Risk:** Low

---

## Group 6: Public Pages (First Vertical Slice)

### T-060: Home page
- **Req:** FR-001
- **Files:** `app/(public)/page.tsx`
- **Check:** Loads, UDEC ≥ 8.5
- **Risk:** Low

### T-061: Tracks page
- **Files:** `app/(public)/tracks/page.tsx`, `app/(public)/tracks/[slug]/page.tsx`
- **Risk:** Low

### T-062: Prompt library page
- **Files:** `app/(public)/prompt-library/page.tsx`
- **Risk:** Low

### T-063: Model lab page
- **Files:** `app/(public)/model-lab/page.tsx`
- **Risk:** Low

### T-064: Certificate verification page
- **Files:** `app/(public)/certificates/verify/[id]/page.tsx`
- **Risk:** Low

### T-065: Pricing page
- **Files:** `app/(public)/pricing/page.tsx`
- **Risk:** Low

---

## Group 7: Agent-Readable Endpoints

### T-070: /llms.txt
- **Req:** FR-001
- **Files:** `app/llms.txt/route.ts`
- **Risk:** Low

### T-071: /llms-full.txt
- **Files:** `app/llms-full.txt/route.ts`
- **Risk:** Low

### T-072: /agents.json
- **Files:** `app/agents.json/route.ts`
- **Risk:** Low

### T-073: /a2a/manifest.json
- **Files:** `app/a2a/manifest.json/route.ts`
- **Risk:** Low

### T-074: /api/catalog
- **Files:** `app/api/catalog/route.ts`
- **Risk:** Low

### T-075: /api/search
- **Files:** `app/api/search/route.ts`
- **Risk:** Low

### T-076: /api/handshake
- **Req:** FR-002
- **Files:** `app/api/handshake/route.ts`, `packages/agent-protocol/handshake.ts`
- **Check:** Mock test passes
- **Risk:** Medium — auth boundary

### T-077: /api/grill-me
- **Req:** FR-003
- **Files:** `app/api/grill-me/route.ts`, `packages/agent-protocol/grill-me.ts`
- **Risk:** Medium

### T-078: /api/enroll
- **Req:** FR-004
- **Files:** `app/api/enroll/route.ts`
- **Risk:** Medium — requires valid handshake

### T-079: /api/courses
- **Req:** FR-005
- **Files:** `app/api/courses/route.ts`, `app/api/courses/[slug]/route.ts`
- **Risk:** Low

### T-080: /api/courses/{slug}.poml
- **Files:** `app/api/courses/[slug]/poml/route.ts`, `packages/course-compiler/poml.ts`
- **Risk:** Low

### T-081: /api/prompts
- **Req:** FR-006
- **Files:** `app/api/prompts/route.ts`, `app/api/prompts/[id]/route.ts`
- **Risk:** Low

### T-082: /api/promptpacks
- **Req:** FR-007
- **Files:** `app/api/promptpacks/route.ts`, `app/api/promptpacks/[slug]/route.ts`
- **Risk:** Low

### T-083: /api/evals/submit
- **Req:** FR-008
- **Files:** `app/api/evals/submit/route.ts`, `packages/eval-harness/scorer.ts`
- **Risk:** High — deterministic scoring critical
- **Approval needed:** No (mocked in tests)

### T-084: /api/evals/{runId}
- **Files:** `app/api/evals/[runId]/route.ts`
- **Risk:** Low

### T-085: /api/certificates/verify/{id}
- **Req:** FR-009
- **Files:** `app/api/certificates/verify/[id]/route.ts`
- **Risk:** Medium — must not expose private data

### T-086: /api/model-scout
- **Req:** FR-010
- **Files:** `app/api/model-scout/route.ts`, `app/api/model-scout/tasks/[task]/route.ts`
- **Risk:** Low

### T-087: /mcp
- **Files:** `app/api/mcp/route.ts`
- **Risk:** Low

---

## Group 8: Legacy Ingestor

### T-090: Crawler core
- **Req:** FR-011
- **Files:** `packages/legacy-ingestor/crawler.ts`
- **Risk:** Medium — polite crawl required

### T-091: HTML parser and normalizer
- **Files:** `packages/legacy-ingestor/parser.ts`, `packages/legacy-ingestor/normalizer.ts`
- **Risk:** Low

### T-092: Content hash dedup
- **Files:** `packages/legacy-ingestor/dedup.ts`
- **Risk:** Low

### T-093: JSONL exporter
- **Files:** `packages/legacy-ingestor/exporter.ts`
- **Risk:** Low

### T-094: Import report generator
- **Files:** `packages/legacy-ingestor/report.ts`
- **Risk:** Low

### T-095: Fixture HTML test files
- **Files:** `packages/legacy-ingestor/fixtures/listing.html`, `packages/legacy-ingestor/fixtures/detail.html`
- **Risk:** Low

### T-096: Ingestor tests (fixture-based)
- **Files:** `packages/legacy-ingestor/ingestor.test.ts`
- **Check:** Dry-run against fixtures passes
- **Risk:** Low

---

## Group 9: Eval Harness

### T-100: Rubric definitions
- **Files:** `packages/eval-harness/rubrics/documentary.ts`, `anime.ts`, `ugc.ts`, `music-video.ts`, `product-brand.ts`
- **Risk:** Low

### T-101: Deterministic scorer
- **Files:** `packages/eval-harness/scorer.ts`
- **Risk:** Medium

### T-102: Unsafe behavior detector
- **Files:** `packages/eval-harness/safety-check.ts`
- **Risk:** Medium

### T-103: Eval harness tests
- **Files:** `packages/eval-harness/scorer.test.ts`
- **Check:** All rubric fixtures produce deterministic scores
- **Risk:** Low

---

## Group 10: Certificate Issuer

### T-110: HMAC certificate hasher
- **Files:** `packages/certificate-issuer/hasher.ts`
- **Risk:** Medium — security critical

### T-111: Certificate generator
- **Files:** `packages/certificate-issuer/issuer.ts`
- **Risk:** Medium

### T-112: Certificate verifier
- **Files:** `packages/certificate-issuer/verifier.ts`
- **Risk:** Medium

### T-113: Certificate issuer tests
- **Files:** `packages/certificate-issuer/issuer.test.ts`
- **Check:** Hash is deterministic; tampered hash fails verification
- **Risk:** Low

---

## Group 11: Model Scout

### T-120: Model profiles data
- **Files:** `packages/model-scout/profiles/video.ts`, `image.ts`, `audio.ts`, `text.ts`
- **Risk:** Low

### T-121: Provider adapter interfaces
- **Files:** `packages/model-scout/adapters/types.ts`, `mock-adapter.ts`
- **Risk:** Low

### T-122: Model scout router
- **Files:** `packages/model-scout/scout.ts`
- **Risk:** Low

### T-123: Model scout tests
- **Files:** `packages/model-scout/scout.test.ts`
- **Check:** Mock adapter returns typed recommendations
- **Risk:** Low

---

## Group 12: Admin Console

### T-130: Admin layout and auth guard
- **Files:** `app/admin/layout.tsx`
- **Risk:** Medium — auth boundary

### T-131: Ingest console page
- **Files:** `app/admin/ingest/page.tsx`
- **Risk:** Low

### T-132: Prompt management page
- **Files:** `app/admin/prompts/page.tsx`
- **Risk:** Low

### T-133: Course management page
- **Files:** `app/admin/courses/page.tsx`
- **Risk:** Low

### T-134: Approvals page
- **Files:** `app/admin/approvals/page.tsx`
- **Risk:** Low

---

## Group 13: Adapters

### T-140: Paperclip adapter scaffold
- **Files:** `packages/paperclip-adapter/index.ts`, `packages/paperclip-adapter/types.ts`
- **Risk:** Low

### T-141: Postiz adapter scaffold (draft only, no publish)
- **Files:** `packages/postiz-adapter/index.ts`, `packages/postiz-adapter/types.ts`
- **Risk:** Low — publish blocked by approval gate

### T-142: Slopless guard
- **Files:** `packages/slopless-guard/index.ts`
- **Check:** CloneyFanz runtime guard blocks execution
- **Risk:** Low

---

## Group 14: Protected CloneyFanz Planning

### T-150: CloneyFanz README
- **Files:** `protected-niches/cloneyfanz/README.md`
- **Risk:** None — planning only

### T-151: CloneyFanz planning docs
- **Files:** `PLAN.md`, `COMPLIANCE.md`, `AGE_VERIFICATION.md`, `CONSENT_AND_IDENTITY.md`, `PAYMENT_RISK.md`, `DO_NOT_BUILD_YET.md`
- **Risk:** None — planning only

---

## Group 15: Tests

### T-160: API contract tests
- **Files:** `app/api/**/*.test.ts`
- **Risk:** Low

### T-161: E2E smoke tests (Playwright)
- **Files:** `e2e/home.spec.ts`, `e2e/tracks.spec.ts`, `e2e/certificate.spec.ts`
- **Risk:** Low

---

## Group 16: Deployment

### T-170: Dockerfile
- **Files:** `Dockerfile`
- **Risk:** Low

### T-171: docker-compose.dev.yml
- **Files:** `docker-compose.dev.yml`
- **Risk:** Low

### T-172: docker-compose.coolify.yml
- **Files:** `docker-compose.coolify.yml`
- **Risk:** Low

### T-173: Coolify deployment doc
- **Files:** `docs/architecture/coolify-deployment.md`
- **Risk:** Low

---

## Group 17: Final Report

### T-180: Build report
- **Files:** `reports/pi-agent-design-school-build-report.json`
- **Risk:** None

---

## First Vertical Slice Priority

These tasks must work before anything else:

1. T-001 through T-007 (tooling)
2. T-020 through T-025 (contracts)
3. T-030 through T-039 (schema + seed)
4. T-060 (home page)
5. T-070 through T-073 (discovery docs)
6. T-076 (handshake)
7. T-077 (grill-me)
8. T-079 (courses)
9. T-083 (eval submit)
10. T-085 (certificate verify)
11. T-113 (cert tests)
12. T-103 (eval tests)
13. T-096 (ingestor dry-run test)
