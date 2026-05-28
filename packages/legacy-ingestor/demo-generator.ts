import { writeFileSync, mkdirSync } from "fs";
import { resolve } from "path";

type Track = "documentary" | "anime" | "ugc" | "music_video" | "product_video" | "brand_film";

interface TrackDemoConfig {
  title: string;
  description: string;
  dominantColor: string;
  accentColor: string;
  icon: string;
}

const TRACK_CONFIGS: Record<Track, TrackDemoConfig> = {
  documentary: {
    title: "Documentary",
    description: "Observational, real-world storytelling",
    dominantColor: "#2C3E50",
    accentColor: "#D4A574",
    icon: "🎬",
  },
  anime: {
    title: "Anime Scene",
    description: "Animated fantasy and character storytelling",
    dominantColor: "#3F51B5",
    accentColor: "#FF6E40",
    icon: "✨",
  },
  ugc: {
    title: "UGC Content",
    description: "User-generated, authentic, platform-native",
    dominantColor: "#E91E63",
    accentColor: "#FFF59D",
    icon: "📱",
  },
  music_video: {
    title: "Music Video",
    description: "Rhythm-driven visual performance",
    dominantColor: "#673AB7",
    accentColor: "#64B5F6",
    icon: "🎵",
  },
  product_video: {
    title: "Product Video",
    description: "Premium showcase and demonstration",
    dominantColor: "#1B5E20",
    accentColor: "#FFD700",
    icon: "⚡",
  },
  brand_film: {
    title: "Brand Film",
    description: "Cinematic storytelling and brand narrative",
    dominantColor: "#C62828",
    accentColor: "#42A5F5",
    icon: "🎥",
  },
};

function generatePlaceholderSvg(track: Track): string {
  const config = TRACK_CONFIGS[track];

  return `<svg width="1280" height="720" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720">
  <!-- Background gradient -->
  <defs>
    <linearGradient id="bg-${track}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${config.dominantColor};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${config.accentColor};stop-opacity:0.3" />
    </linearGradient>
    <filter id="blur">
      <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
    </filter>
  </defs>

  <rect width="1280" height="720" fill="url(#bg-${track})"/>

  <!-- Center circle with track icon -->
  <circle cx="640" cy="360" r="120" fill="${config.accentColor}" opacity="0.2"/>
  <circle cx="640" cy="360" r="100" fill="none" stroke="${config.accentColor}" stroke-width="2" opacity="0.5"/>

  <!-- Title -->
  <text x="640" y="300" font-size="64" font-weight="bold" text-anchor="middle" fill="white" font-family="system-ui, -apple-system">
    ${config.icon}
  </text>

  <text x="640" y="420" font-size="48" font-weight="600" text-anchor="middle" fill="white" font-family="system-ui, -apple-system">
    ${config.title}
  </text>

  <text x="640" y="480" font-size="24" text-anchor="middle" fill="${config.accentColor}" opacity="0.9" font-family="system-ui, -apple-system">
    ${config.description}
  </text>

  <!-- Placeholder watermark -->
  <text x="640" y="680" font-size="14" text-anchor="middle" fill="white" opacity="0.4" font-family="system-ui, -apple-system">
    Placeholder Demo — PI Agent Design School
  </text>
</svg>`;
}

export function generateDemoAssets(outputDir: string): Record<Track, string> {
  mkdirSync(resolve(outputDir, "images"), { recursive: true });
  mkdirSync(resolve(outputDir, "videos"), { recursive: true });

  const tracks: Track[] = [
    "documentary",
    "anime",
    "ugc",
    "music_video",
    "product_video",
    "brand_film",
  ];
  const results: Record<Track, string> = {} as Record<Track, string>;

  for (const track of tracks) {
    // Generate SVG placeholder
    const svg = generatePlaceholderSvg(track);
    const imagePath = resolve(outputDir, `images/${track}-demo.svg`);
    writeFileSync(imagePath, svg);
    results[track] = `/demos/images/${track}-demo.svg`;
    console.log(`Generated placeholder: ${imagePath}`);
  }

  return results;
}

export function generateDemoMetadata(
  outputDir: string
): Record<Track, { imageUrl: string; videoUrl: string }> {
  const imageUrls = generateDemoAssets(outputDir);

  const metadata: Record<Track, { imageUrl: string; videoUrl: string }> =
    {} as Record<Track, { imageUrl: string; videoUrl: string }>;

  for (const track of Object.keys(imageUrls) as Track[]) {
    metadata[track] = {
      imageUrl: imageUrls[track],
      videoUrl: `/demos/videos/${track}-demo.mp4`, // Placeholder reference
    };
  }

  return metadata;
}
