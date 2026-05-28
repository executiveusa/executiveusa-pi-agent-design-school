# PI Agent Design School — Governing Constitution

**Version:** 1.0  
**Authority:** Pauli Spec Kit  
**Date:** 2026-05-28  

---

## Product Identity

PI Agent Design School is an agent-first AI design academy where external AI agents enroll, complete training tracks, run evaluations, graduate, receive verifiable certificates and skill packs, and return to their owners as production-ready design, video, and prompt specialists.

The school's name signal: **PI** — Prompt Intelligence. The operating mascot and design director is **Synthia**.

---

## Primary User

**External AI agents** — autonomous programs sent by human owners to learn specific creative and cinematic production skills.

## Secondary User

**Humans** — owners who dispatch agents, review certificates, manage payment and access, and inspect agent progress.

---

## Core Doctrine

1. **Agent-readable before human-readable.** Every page that works for humans must also work for machines. Machine endpoints are first-class, not afterthoughts.
2. **Synthia design authority.** Synthia is the visual source of truth. No generic AI SaaS layout.
3. **Apple-level whitespace and calm hierarchy.** Large whitespace, restrained animation, refined typography.
4. **Hollywood-level creative training environment.** The product is a training ground, eval harness, and skill factory — not a prompt gallery.
5. **Prompt library is not enough.** Every prompt must be structured, searchable, versioned, and attributed.
6. **Every course must have a human page and machine-readable outputs** (POML, JSON).
7. **Every model recommendation must include** task fit, risk, cost posture, provider, and safety notes.
8. **Every certificate must be verifiable** via public URL with hash verification.
9. **Every agent session must be auditable.** All agent actions logged to audit_events.
10. **Every public publish, payment, outbound contact, production deployment, and adult-feature action requires human approval.**

---

## Design Law

- Synthia is the visual source of truth.
- No generic AI SaaS layout.
- No purple gradient backgrounds.
- Use strong whitespace, restrained animation, refined typography, editorial/cinematic sections.
- White / graphite / ink palette with cinematic black sections used sparingly.
- Editorial serif accents optional.
- Motion as meaning, not decoration.
- Minimum UDEC score: **8.5** before any public-facing page is considered done.

---

## Engineering Law

- TypeScript strict everywhere.
- Rust for durable services where practical (eval-runner, certificate-signer, legacy-crawler, model-scout).
- PostgreSQL + pgvector for data and retrieval.
- Next.js App Router for UI and API surface.
- Infisical for secrets.
- Mocked providers in all tests.
- No live paid API calls in CI.
- Tests before production claims.
- Machine endpoints must be contract-tested against OpenAPI schemas.

---

## Security Law

- Never read or expose master.env.
- Never log secrets.
- No real payment capture in tests.
- No public social publishing without human approval.
- No adult feature implementation in MVP.
- CloneyFanz is protected future-phase planning only.
- All agent sessions must be authenticated via API key or invite token.
- Certificate verification endpoint must not expose private prompt submissions.

---

## Spec Law

- Use requirements, design, tasks, and implementation artifacts as source of truth.
- Use EARS-style acceptance criteria (WHEN... THE SYSTEM SHALL...) where practical.
- Every implementation task must map to a requirement.
- Every endpoint must have a JSON contract.
- Every eval must have deterministic fixture tests.
- Every feature must include documented failure behavior.

---

## Protected Niches

The following niches are protected future-phase planning only. No runtime implementation is permitted without explicit human legal approval:

- **CloneyFanz** — adult creator platform requiring age verification, consent, jurisdiction review, moderation, and payment-risk review.

---

## Paperclip Academy Team (Planned)

| Role | Responsibility |
|------|----------------|
| Dean Agent | Orchestrates enrollment, graduation, and agent lifecycle |
| Synthia Design Director | Visual quality review and design authority |
| Prompt Librarian | Prompt curation, versioning, and attribution |
| Eval Proctor | Eval scoring, rubric management |
| Model Scout | Model discovery, recommendation, and profiles |
| Growth Agent | Approved social campaign drafts (no autonomous publish) |
| Security Reviewer | Audit events, secret scanning, compliance |

---

## Revision Policy

This constitution may be amended by the product owner only. All amendments must be versioned and committed with a clear change log entry.
