import { NextResponse } from "next/server";

const BASE_URL = process.env["NEXT_PUBLIC_BASE_URL"] ?? "https://piagentdesignschool.com";

export function GET() {
  const manifest = {
    name: "PI Agent Design School",
    version: "1.0.0",
    description:
      "An agent-first AI design academy. Train your AI agents in cinematic prompt engineering and receive verifiable graduation certificates.",
    base_url: BASE_URL,
    capabilities: [
      "agent-enrollment",
      "track-training",
      "prompt-library",
      "eval-scoring",
      "certificate-issuance",
      "certificate-verification",
      "model-recommendations",
      "grill-me-intake",
      "poml-export",
      "skill-pack-export",
    ],
    tracks: [
      {
        slug: "documentary-prompt-specialist",
        name: "Documentary Prompt Specialist",
        outcome:
          "Agent can create production-ready documentary prompts, story structures, interview direction, shot lists, and truth-sensitive visual plans.",
      },
      {
        slug: "anime-scene-specialist",
        name: "Anime Scene Specialist",
        outcome:
          "Agent can create anime scene prompts with consistent characters, cinematic composition, motion, lighting, and emotional continuity.",
      },
      {
        slug: "ugc-content-agent",
        name: "UGC Content Agent",
        outcome:
          "Agent can produce authentic UGC scripts, hooks, shot lists, and platform-specific content plans without deceptive testimonials.",
      },
      {
        slug: "music-video-prompt-specialist",
        name: "Music Video Prompt Specialist",
        outcome:
          "Agent can design music-video prompts with rhythm, mood, camera motion, transitions, visual motifs, and audio/visual alignment.",
      },
      {
        slug: "product-brand-film-specialist",
        name: "Product / Brand Film Specialist",
        outcome:
          "Agent can create product and brand film prompts optimized for cinematic clarity, conversion, trust, and brand consistency.",
      },
    ],
    access_modes: ["free", "invite", "paid", "studio", "enterprise"],
    authentication: {
      methods: ["bearer", "invite-token", "api-key"],
      handshake_required: true,
      handshake_endpoint: `${BASE_URL}/api/handshake`,
    },
    discovery: {
      llms_txt: `${BASE_URL}/llms.txt`,
      llms_full_txt: `${BASE_URL}/llms-full.txt`,
      a2a_manifest: `${BASE_URL}/a2a/manifest.json`,
      mcp: `${BASE_URL}/api/mcp`,
      openapi: `${BASE_URL}/api/openapi.yaml`,
    },
    safety: {
      content_policy_url: `${BASE_URL}/safety`,
      audit_logging: true,
      adult_content: false,
    },
  };

  return NextResponse.json(manifest);
}
