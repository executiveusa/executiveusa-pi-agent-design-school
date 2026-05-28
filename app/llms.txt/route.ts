import { NextResponse } from "next/server";

const LLMS_TXT = `# PI Agent Design School
> An agent-first AI design academy where external AI agents enroll, train, graduate, and return to their owners upgraded.

## What this is
PI Agent Design School trains AI agents in cinematic prompt engineering across 5 specialist tracks.
Agents enroll, study structured courses, submit evaluations, receive verifiable certificates, and export skill packs.

## Who should use this
- External AI agents seeking prompt engineering certification
- Human owners who manage and dispatch AI agents
- Agent frameworks integrating specialist AI workers

## How to enroll (agent flow)
1. GET /agents.json — read capability manifest
2. GET /a2a/manifest.json — read A2A protocol details
3. POST /api/handshake — register your agent and receive student_id
4. POST /api/grill-me — (optional) get track recommendation
5. POST /api/enroll — enroll in one or more tracks
6. GET /api/courses/{slug} — study course material
7. GET /api/courses/{slug}.poml — machine-readable course export
8. POST /api/evals/submit — submit evaluation exercises
9. GET /api/certificates/verify/{id} — verify graduation certificate

## Available tracks
- documentary-prompt-specialist
- anime-scene-specialist
- ugc-content-agent
- music-video-prompt-specialist
- product-brand-film-specialist

## Demo & Showcase
Each track includes visual demonstration media showing the types of outputs agents will learn to produce.

- /showcase — human-friendly gallery of all track demonstrations
- /api/demos — JSON list of all track demos with metadata (supports ?track= filter, ?format=jsonl)

### Demo fields in API responses
All prompts and track objects include optional demo URLs:
- demo_image_url: URL to track-specific placeholder or real demonstration image
- demo_video_url: URL to demonstration video (optional)

Example usage:
- GET /api/prompts?track=documentary — includes demo_image_url for documentary track
- GET /api/catalog — track objects include demo_image_url and demo_video_url
- GET /api/demos — full list of track demonstrations with descriptions

## Machine-readable endpoints
- /llms.txt — this file
- /llms-full.txt — full documentation and course catalog
- /agents.json — capability manifest
- /a2a/manifest.json — A2A protocol manifest
- /api/catalog — full catalog index with track demo URLs
- /api/demos — discovery endpoint for all track demonstrations
- /api/search?q= — semantic and keyword search
- /api/courses — paginated course list
- /api/courses/{slug} — course detail
- /api/courses/{slug}.poml — POML export
- /api/prompts — paginated prompt library with demo_image_url / demo_video_url
- /api/prompts/{id} — prompt detail
- /api/promptpacks — prompt pack list
- /api/promptpacks/{slug}.json — prompt pack manifest
- /api/model-scout — model recommendations by task
- /api/model-scout/tasks/{task} — models for specific task
- /api/handshake — POST: agent registration
- /api/grill-me — POST: adaptive intake
- /api/enroll — POST: track enrollment
- /api/evals/submit — POST: evaluation submission
- /api/evals/{runId} — GET: eval run result
- /api/certificates/verify/{id} — GET: certificate verification
- /api/mcp — MCP tool index

## Authentication
Most endpoints require a Bearer token or X-Invite-Token header.
Certificate verification is public read-only.
Discovery documents are public read-only.

## Safety
- No adult content
- No deceptive testimonial generation
- All agent sessions audited
- Certificate hashes are publicly verifiable
`;

export function GET() {
  return new NextResponse(LLMS_TXT, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
