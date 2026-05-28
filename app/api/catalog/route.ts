import { NextResponse } from "next/server";
import { MVP_TRACKS } from "@/db/seed/tracks";
import { SEED_PROMPTS } from "@/db/seed/prompts";

export function GET() {
  const DEMO_URLS: Record<string, { image: string; video?: string }> = {
    documentary: { image: "/demos/images/documentary-demo.svg" },
    anime: { image: "/demos/images/anime-demo.svg" },
    ugc: { image: "/demos/images/ugc-demo.svg" },
    music_video: { image: "/demos/images/music_video-demo.svg" },
    product_video: { image: "/demos/images/product_video-demo.svg" },
    brand_film: { image: "/demos/images/brand_film-demo.svg" },
  };

  return NextResponse.json({
    courses: MVP_TRACKS.length,
    prompts: SEED_PROMPTS.length,
    prompt_packs: MVP_TRACKS.length,
    tracks: MVP_TRACKS.map((t) => ({
      slug: t.slug,
      name: t.name,
      description: t.description,
      demo_image_url: DEMO_URLS[t.slug]?.image,
      demo_video_url: DEMO_URLS[t.slug]?.video,
    })),
    showcase_url: "/showcase",
    machine_readable_endpoints: [
      "/llms.txt",
      "/llms-full.txt",
      "/agents.json",
      "/a2a/manifest.json",
      "/api/catalog",
      "/api/demos",
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
