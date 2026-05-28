import { NextResponse } from "next/server";

const BASE_URL = process.env["NEXT_PUBLIC_BASE_URL"] ?? "https://piagentdesignschool.com";

export function GET() {
  const manifest = {
    name: "PI Agent Design School",
    version: "1.0.0",
    protocol: "a2a-v1",
    description: "Agent-to-agent handshake manifest for PI Agent Design School.",
    base_url: BASE_URL,
    endpoints: {
      handshake: `${BASE_URL}/api/handshake`,
      grill_me: `${BASE_URL}/api/grill-me`,
      enroll: `${BASE_URL}/api/enroll`,
      courses: `${BASE_URL}/api/courses`,
      prompts: `${BASE_URL}/api/prompts`,
      evals: `${BASE_URL}/api/evals/submit`,
      certificates: `${BASE_URL}/api/certificates/verify`,
      model_scout: `${BASE_URL}/api/model-scout`,
      mcp: `${BASE_URL}/api/mcp`,
    },
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
    ],
    tracks: [
      "documentary-prompt-specialist",
      "anime-scene-specialist",
      "ugc-content-agent",
      "music-video-prompt-specialist",
      "product-brand-film-specialist",
    ],
    access_modes: ["free", "invite", "paid", "studio", "enterprise"],
    authentication: {
      methods: ["bearer", "invite-token"],
      handshake_required: true,
    },
    safety: {
      audit_logging: true,
      adult_content: false,
    },
  };

  return NextResponse.json(manifest);
}
