import { NextRequest, NextResponse } from "next/server";

interface DemoResource {
  track: string;
  track_name: string;
  description: string;
  demo_image_url: string;
  demo_video_url?: string;
  learn_url: string;
  showcase_url: string;
}

const DEMOS: DemoResource[] = [
  {
    track: "documentary",
    track_name: "Documentary",
    description:
      "Observational storytelling capturing real-world human moments with nuance and dignity.",
    demo_image_url: "/demos/images/documentary-demo.svg",
    learn_url: "/tracks/documentary-prompt-specialist",
    showcase_url: "/showcase",
  },
  {
    track: "anime",
    track_name: "Anime Scene",
    description:
      "Animated fantasy and character-driven scenes with flowing motion and mystical aesthetics.",
    demo_image_url: "/demos/images/anime-demo.svg",
    learn_url: "/tracks/anime-scene-specialist",
    showcase_url: "/showcase",
  },
  {
    track: "ugc",
    track_name: "UGC Content",
    description:
      "User-generated platform-native content designed for authentic engagement and rapid scroll impact.",
    demo_image_url: "/demos/images/ugc-demo.svg",
    learn_url: "/tracks/ugc-content-agent",
    showcase_url: "/showcase",
  },
  {
    track: "music_video",
    track_name: "Music Video",
    description:
      "Rhythm-driven visual performance synced to music with dynamic movement and cultural relevance.",
    demo_image_url: "/demos/images/music_video-demo.svg",
    learn_url: "/tracks/music-video-prompt-specialist",
    showcase_url: "/showcase",
  },
  {
    track: "product_video",
    track_name: "Product Video",
    description:
      "Premium product showcase with attention to luxury detail, unboxing, and aspirational aesthetics.",
    demo_image_url: "/demos/images/product_video-demo.svg",
    learn_url: "/tracks/product-brand-film-specialist",
    showcase_url: "/showcase",
  },
  {
    track: "brand_film",
    track_name: "Brand Film",
    description:
      "Cinematic narrative storytelling for brand messaging with emotional resonance and polish.",
    demo_image_url: "/demos/images/brand_film-demo.svg",
    learn_url: "/tracks/product-brand-film-specialist",
    showcase_url: "/showcase",
  },
];

export function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const track = searchParams.get("track");
  const format = searchParams.get("format") ?? "json";

  let results = DEMOS;

  if (track) {
    results = results.filter(
      (d) => d.track.toLowerCase() === track.toLowerCase()
    );
  }

  if (format === "jsonl") {
    const lines = results.map((d) => JSON.stringify(d)).join("\n");
    return new NextResponse(lines + "\n", {
      headers: { "Content-Type": "application/x-ndjson" },
    });
  }

  return NextResponse.json({
    demos: results,
    total: results.length,
    showcase_url: "/showcase",
    api_documentation: "See /llms.txt for demo field descriptions",
  });
}
