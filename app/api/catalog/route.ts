import { NextResponse } from "next/server";
import { MVP_TRACKS } from "@/db/seed/tracks";
import { SEED_PROMPTS } from "@/db/seed/prompts";

export function GET() {
  return NextResponse.json({
    courses: MVP_TRACKS.length,
    prompts: SEED_PROMPTS.length,
    prompt_packs: MVP_TRACKS.length,
    tracks: MVP_TRACKS.map((t) => t.slug),
    machine_readable_endpoints: [
      "/llms.txt",
      "/llms-full.txt",
      "/agents.json",
      "/a2a/manifest.json",
      "/api/catalog",
      "/api/search",
      "/api/courses",
      "/api/prompts",
      "/api/promptpacks",
      "/api/model-scout",
      "/api/handshake",
      "/api/grill-me",
      "/api/enroll",
      "/api/evals/submit",
      "/api/certificates/verify/{id}",
      "/api/mcp",
    ],
  });
}
