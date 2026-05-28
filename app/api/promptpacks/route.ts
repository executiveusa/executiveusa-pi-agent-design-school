import { NextResponse } from "next/server";

const PROMPT_PACKS = [
  {
    slug: "documentary-essentials",
    name: "Documentary Essentials",
    track: "documentary-prompt-specialist",
    prompt_count: 12,
    description: "Core documentary prompt patterns for observational and interview-driven filmmaking.",
  },
  {
    slug: "anime-scene-starters",
    name: "Anime Scene Starters",
    track: "anime-scene-specialist",
    prompt_count: 15,
    description: "Foundational anime scene prompts covering genre staples: action, romance, slice-of-life, isekai.",
  },
  {
    slug: "ugc-hook-library",
    name: "UGC Hook Library",
    track: "ugc-content-agent",
    prompt_count: 20,
    description: "50 proven UGC hook structures for TikTok, Instagram Reels, and YouTube Shorts.",
  },
  {
    slug: "music-video-starters",
    name: "Music Video Starters",
    track: "music-video-prompt-specialist",
    prompt_count: 10,
    description: "Genre-specific music video prompt templates: pop, hip-hop, indie, electronic, cinematic.",
  },
  {
    slug: "brand-film-essentials",
    name: "Brand Film Essentials",
    track: "product-brand-film-specialist",
    prompt_count: 12,
    description: "Product hero shots, brand narrative sequences, and conversion-optimized cinematic patterns.",
  },
];

export function GET() {
  return NextResponse.json({ packs: PROMPT_PACKS });
}
