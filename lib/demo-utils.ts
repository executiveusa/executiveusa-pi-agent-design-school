export const TRACK_DEMO_IMAGES: Record<string, string> = {
  "documentary-prompt-specialist": "/demos/images/documentary-demo.svg",
  "anime-scene-specialist": "/demos/images/anime-demo.svg",
  "ugc-content-agent": "/demos/images/ugc-demo.svg",
  "music-video-prompt-specialist": "/demos/images/music_video-demo.svg",
  "product-brand-film-specialist": "/demos/images/product_video-demo.svg",
};

export const TRACK_DEMO_DATA = [
  {
    trackSlug: "documentary-prompt-specialist",
    track: "Documentary",
    title: "Urban Documentary: Commute at Sunrise",
    description:
      "Observational storytelling capturing the quiet poetry of urban life. Real-world subjects, natural light, human connection.",
    demoImageUrl: "/demos/images/documentary-demo.svg",
  },
  {
    trackSlug: "anime-scene-specialist",
    track: "Anime",
    title: "Anime: Sacred Temple in Moonlight",
    description:
      "Mystical animated scene with flowing camera motion. Traditional aesthetics meet magical realism.",
    demoImageUrl: "/demos/images/anime-demo.svg",
  },
  {
    trackSlug: "ugc-content-agent",
    track: "UGC",
    title: "UGC: Skincare Morning Routine Hook",
    description:
      "Platform-native user-generated content. Authentic, fast-paced, designed for scroll-stopping impact.",
    demoImageUrl: "/demos/images/ugc-demo.svg",
  },
  {
    trackSlug: "music-video-prompt-specialist",
    track: "Music Video",
    title: "Music Video: Electronic Dance Performance",
    description:
      "Rhythm-driven visual storytelling synced to electronic music. Dynamic movement and visual effects.",
    demoImageUrl: "/demos/images/music_video-demo.svg",
  },
  {
    trackSlug: "product-brand-film-specialist",
    track: "Product Video",
    title: "Product Video: Premium Headphone Unboxing",
    description:
      "Luxury product showcase with ASMR-style presentation. Attention to detail, tactile appeal, aspirational.",
    demoImageUrl: "/demos/images/product_video-demo.svg",
  },
  {
    trackSlug: "product-brand-film-specialist",
    track: "Brand Film",
    title: "Brand Film: Cinematic Narrative",
    description:
      "Premium cinematic storytelling for brand messaging. Emotional resonance, polished production, cultural relevance.",
    demoImageUrl: "/demos/images/brand_film-demo.svg",
  },
] as const;

export type TrackDemoItem = (typeof TRACK_DEMO_DATA)[number];
