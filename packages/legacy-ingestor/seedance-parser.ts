import { parsePromptHtml } from "./parser";
import type { ParsedPrompt } from "./types";

const CATEGORY_TO_TRACK: Record<string, string> = {
  documentary: "documentary",
  "documentary film": "documentary",
  anime: "anime",
  "anime scene": "anime",
  "animated scene": "anime",
  ugc: "ugc",
  "ugc content": "ugc",
  "user-generated": "ugc",
  "music video": "music_video",
  "music videos": "music_video",
  product: "product_video",
  "product video": "product_video",
  "product showcase": "product_video",
  brand: "brand_film",
  "brand film": "brand_film",
  branding: "brand_film",
  fashion: "fashion",
  "fashion film": "fashion",
  nonprofit: "nonprofit",
  "nonprofit video": "nonprofit",
  cinematic: "cinematic",
  "cinematic film": "cinematic",
  general: "general",
};

export interface SeedancePrompt extends ParsedPrompt {
  track: string;
  shotType?: string;
  cameraMotion?: string[];
  mood?: string[];
  lighting?: string[];
}

function mapCategoryToTrack(category: string): string {
  const normalized = category.toLowerCase().trim();
  return CATEGORY_TO_TRACK[normalized] || "general";
}

function extractStructuredFields(
  body: string
): {
  shotType?: string;
  cameraMotion?: string[];
  mood?: string[];
  lighting?: string[];
  subject?: string[];
} {
  const fields: {
    shotType?: string;
    cameraMotion?: string[];
    mood?: string[];
    lighting?: string[];
    subject?: string[];
  } = {};

  const shotMatch = body.match(
    /(?:shot|Shot|SHOT)\s*(?:type)?:\s*([^.]+)(?:[.;]|$)/i
  );
  if (shotMatch) {
    fields.shotType = shotMatch[1]!.trim();
  }

  const cameraMatch = body.match(
    /(?:camera|Camera|CAMERA)\s*(?:motion|movement)?:\s*([^.;]+)/i
  );
  if (cameraMatch) {
    fields.cameraMotion = cameraMatch[1]!
      .split(/[,;]/)
      .map((s) => s.trim())
      .filter(Boolean);
  }

  const moodMatch = body.match(/(?:mood|Mood|MOOD):\s*([^.;]+)/i);
  if (moodMatch) {
    fields.mood = moodMatch[1]!
      .split(/[,;]/)
      .map((s) => s.trim())
      .filter(Boolean);
  }

  const lightingMatch = body.match(
    /(?:lighting|Lighting|LIGHTING):\s*([^.;]+)/i
  );
  if (lightingMatch) {
    fields.lighting = lightingMatch[1]!
      .split(/[,;]/)
      .map((s) => s.trim())
      .filter(Boolean);
  }

  const subjectMatch = body.match(
    /(?:subject|Subject|SUBJECT):\s*([^.;]+)/i
  );
  if (subjectMatch) {
    fields.subject = subjectMatch[1]!
      .split(/[,;]/)
      .map((s) => s.trim())
      .filter(Boolean);
  }

  return fields;
}

export function parseSeedancePrompt(
  html: string,
  sourceUrl: string
): SeedancePrompt | null {
  const base = parsePromptHtml(html, sourceUrl);
  if (!base) return null;

  const primaryCategory = base.categories[0] || "general";
  const track = mapCategoryToTrack(primaryCategory);
  const structured = extractStructuredFields(base.body);

  return {
    ...base,
    track,
    shotType: structured.shotType,
    cameraMotion: structured.cameraMotion,
    mood: structured.mood,
    lighting: structured.lighting,
  };
}
