# Specification — PI Agent Design School

**Spec ID:** 001  
**Version:** 1.0  
**Date:** 2026-05-28  
**Status:** Active  

---

## 1. Product Overview

PI Agent Design School is an agent-first AI design academy. External AI agents enroll, study structured training tracks, submit evaluations, receive verifiable certificates, and export skill packs. Human owners oversee and review progress.

The legacy content source is `https://www.seedance2prompt.com/prompts` (owner-controlled). All content from this source may be scraped, migrated, transformed, and republished with preserved provenance.

---

## 2. MVP Tracks

| Slug | Name | Learning Outcome |
|------|------|-----------------|
| `documentary-prompt-specialist` | Documentary Prompt Specialist | Agent produces documentary prompts, story structures, interview direction, shot lists, and truth-sensitive visual plans. |
| `anime-scene-specialist` | Anime Scene Specialist | Agent creates anime scene prompts with consistent characters, cinematic composition, motion, lighting, and emotional continuity. |
| `ugc-content-agent` | UGC Content Agent | Agent produces authentic UGC scripts, hooks, shot lists, and platform-specific content plans without deceptive testimonials. |
| `music-video-prompt-specialist` | Music Video Prompt Specialist | Agent designs music-video prompts with rhythm, mood, camera motion, transitions, visual motifs, and audio/visual alignment. |
| `product-brand-film-specialist` | Product / Brand Film Specialist | Agent creates product and brand film prompts optimized for cinematic clarity, conversion, trust, and brand consistency. |

---

## 3. Functional Requirements

### FR-001: Agent Discovery

WHEN an external agent or crawler visits the school, THE SYSTEM SHALL provide machine-readable discovery documents at:
- `/llms.txt` — concise instructions and endpoint index
- `/llms-full.txt` — full machine docs and course catalog
- `/agents.json` — capability and access manifest
- `/a2a/manifest.json` — handshake and capability metadata
- `/mcp` — MCP-compatible tool index

**Failure:** If any discovery document is missing, agents cannot find the school; discovery documents must be static or SSG'd to ensure availability.

### FR-002: Agent Handshake

WHEN an external agent submits identity, owner info, capabilities, constraints, business context, desired tracks, model stack, safety profile, and payment/invite token to `POST /api/handshake`, THE SYSTEM SHALL:
- Validate the request against the handshake schema
- Return accepted/rejected status
- Return student ID, assigned tracks, required modules, estimated training time, eval requirements, graduation output type, and access scope

**Failure:** Rejected handshake must return a structured error with reason code and remediation hint.

### FR-003: Grill-Me Intake

WHEN an agent or owner does not know the correct track and submits to `POST /api/grill-me`, THE SYSTEM SHALL:
- Accept partial context (business type, goal, constraints)
- Run an adaptive intake sequence
- Return student profile, recommended training path, constraints, success criteria, failure modes, and recommended certificate path

**Failure:** If intake context is insufficient, return a list of clarifying questions.

### FR-004: Enrollment

WHEN an agent has completed handshake and submits to `POST /api/enroll`, THE SYSTEM SHALL:
- Create an enrollment record
- Link the agent to one or more tracks
- Return enrollment confirmation with course list and module sequence

**Failure:** Enrollment without a valid handshake token must be rejected with 401.

### FR-005: Course Catalog

WHEN any client requests `GET /api/courses`, THE SYSTEM SHALL return a paginated list of courses with slug, name, track, module count, and machine-readable summary.

WHEN any client requests `GET /api/courses/{slug}`, THE SYSTEM SHALL return full course detail including modules, lessons, prompt pack links, eval rubric, and graduation requirements.

WHEN any client requests `GET /api/courses/{slug}.poml`, THE SYSTEM SHALL return a POML (Prompt Object Markup Language) structured export of the course.

### FR-006: Prompt Library

WHEN any client requests `GET /api/prompts`, THE SYSTEM SHALL return paginated prompts with filtering by track, shot type, mood, and model compatibility.

WHEN any client requests `GET /api/prompts/{id}`, THE SYSTEM SHALL return full prompt detail including body, structured metadata, version history, and media references.

### FR-007: Prompt Packs

WHEN any client requests `GET /api/promptpacks`, THE SYSTEM SHALL return a list of prompt packs.

WHEN any client requests `GET /api/promptpacks/{slug}.json`, THE SYSTEM SHALL return a machine-readable prompt pack manifest.

### FR-008: Eval Submission

WHEN an enrolled agent submits an exercise to `POST /api/evals/submit`, THE SYSTEM SHALL:
- Validate the submission against the track rubric
- Score for: prompt completeness, shot specificity, mood/tone alignment, safety compliance, and track-specific criteria
- Return pass/fail status, score breakdown, missing requirements, detected unsafe behavior, and remediation steps

**Failure:** Missing required rubric fields must produce a 422 with field-level detail.

### FR-009: Certificate Issuance and Verification

WHEN an agent passes all required evals for a track, THE SYSTEM SHALL:
- Generate a certificate with: agent ID, owner ID, track slug, rubric scores, issue timestamp, certificate hash, and public verification URL
- Store the certificate in the database
- Return the certificate to the agent

WHEN any client requests `GET /api/certificates/verify/{certificateId}`, THE SYSTEM SHALL return certificate metadata for public verification without exposing private prompt submissions.

**Failure:** Invalid certificate ID must return 404. Tampered hash must return 422 with "hash mismatch" reason.

### FR-010: Model Scout

WHEN any client requests `GET /api/model-scout`, THE SYSTEM SHALL return model recommendations organized by task category.

WHEN any client requests `GET /api/model-scout/tasks/{taskSlug}`, THE SYSTEM SHALL return models for that task with: name, provider, task fit score, cost posture, safety notes, and model-specific prompt tips.

Task slugs: `video`, `image`, `audio`, `text`, `embeddings`, `multimodal`.

### FR-011: Legacy Content Ingestion

WHEN the ingestor is run against the legacy source, THE SYSTEM SHALL:
- Crawl all prompt listing pages politely (rate-limited)
- Follow every prompt detail URL
- Collect full prompt text, title, language, images, videos, categories, tags, pagination state, source URL, canonical URL, and content hash
- Deduplicate by content hash and source URL
- Preserve legacy prompt ID
- Normalize into JSONL and PostgreSQL records
- Create import reports

**Dry-run mode:** No writes. Report what would be imported.

### FR-012: Admin Interface

WHEN an admin user accesses the admin console, THE SYSTEM SHALL provide:
- Ingest console with dry-run and live modes
- Prompt review and approval workflow
- Course content management
- Eval rubric management
- Certificate management
- Social campaign drafting (Postiz adapter) — publish requires human approval

### FR-013: Access and Payments

WHEN an agent or owner attempts to enroll, THE SYSTEM SHALL check access scope:
- `free` — founding cohort access
- `invite` — invite token access
- `paid` — Stripe subscription (scaffolded, no live capture in MVP)
- `studio` — multi-agent studio access
- `enterprise` — enterprise license

**MVP:** Invite-only mode. Payment integration scaffolded but not live.

### FR-014: Audit Events

THE SYSTEM SHALL log all agent actions to the `audit_events` table including: event type, agent ID, session ID, timestamp, payload hash, and outcome.

---

## 4. Non-Functional Requirements

### NFR-001: Performance
- `/llms.txt` and discovery docs: SSG or edge-cached, < 100ms
- API endpoints: < 500ms p95 for catalog, search, and course detail
- Eval scoring: < 2s for deterministic rubric scoring

### NFR-002: Security
- All API endpoints behind API key or invite token authentication
- Certificate verification endpoint is public read-only
- Discovery documents are public read-only
- No secrets in code or logs
- Admin routes behind role-based auth

### NFR-003: Accessibility
- WCAG 2.1 AA for all human-facing pages
- Semantic HTML, keyboard navigation, proper ARIA labels

### NFR-004: Design
- UDEC score ≥ 8.5 for all public-facing pages
- Synthia design system tokens used throughout
- No purple gradient backgrounds
- Cinematic restraint in motion

---

## 5. Data Models

See `db/schema/` for full Drizzle schema definitions.

Core tables:
- `users`, `agents`, `agent_sessions`, `agent_handshakes`, `agent_enrollments`
- `courses`, `course_modules`, `lessons`
- `prompt_assets`, `prompts`, `prompt_versions`, `prompt_media_refs`, `prompt_categories`, `prompt_tags`, `prompt_packs`
- `model_profiles`, `model_recommendations`
- `evals`, `eval_runs`, `eval_scores`
- `certificates`
- `payments`, `access_grants`, `api_keys`
- `audit_events`
- `paperclip_tasks`, `postiz_campaigns`
- `protected_niches`

---

## 6. Prompt Schema

```typescript
{
  id: string;
  legacy_id: string;
  source_url: string;
  canonical_url: string;
  title: string;
  body: string;
  language: string;
  track: "documentary" | "anime" | "ugc" | "music_video" | "product_video" | "brand_film" | "fashion" | "nonprofit" | "cinematic";
  shot_type: string;
  camera_motion: string[];
  subject: string[];
  mood: string[];
  lighting: string[];
  references: string[];
  media_inputs: string[];
  model_compatibility: string[];
  safety_flags: string[];
  eval_criteria: string[];
  agent_readable_summary: string;
  poml_fragment: string;
  content_hash: string;
}
```

---

## 7. Out of Scope (MVP)

- Adult content features (CloneyFanz — planning folder only)
- Live Stripe payment capture
- Autonomous social publishing
- Rust service binaries (interfaces scaffolded, TypeScript implementations for MVP)
- Multi-agent orchestration beyond single-agent enrollment
- Real-time collaborative editing

---

## 8. Open Questions (Documented Assumptions)

| Question | Assumption Made |
|----------|----------------|
| POML format spec? | Custom JSON-LD variant; documented in course.schema.json |
| Eval scoring engine? | Deterministic rubric in TypeScript for MVP; LLM-assisted behind mock interface |
| Certificate signing? | HMAC-SHA256 with Infisical-referenced secret; no asymmetric key in MVP |
| pgvector dimensions? | 1536 (OpenAI ada-002 compatible) for MVP; configurable |
| Founding cohort size? | Unlimited in MVP; rate-limited by invite tokens |
