import { writeFileSync } from "fs";
import type { SeedancePrompt } from "./seedance-parser";

export interface ExportedPrompt {
  legacyId: string;
  sourceUrl: string;
  title: string;
  body: string;
  language: string;
  track: string;
  categories: string[];
  tags: string[];
  shotType?: string;
  cameraMotion?: string[];
  mood?: string[];
  lighting?: string[];
  imageUrls: string[];
  videoUrls: string[];
  contentHash: string;
}

export function exportPromptsToJsonl(
  prompts: SeedancePrompt[],
  outputPath: string
): void {
  const lines: string[] = [];

  for (const prompt of prompts) {
    const exported: ExportedPrompt = {
      legacyId: prompt.legacyId,
      sourceUrl: prompt.sourceUrl,
      title: prompt.title,
      body: prompt.body,
      language: prompt.language,
      track: prompt.track,
      categories: prompt.categories,
      tags: prompt.tags,
      shotType: prompt.shotType,
      cameraMotion: prompt.cameraMotion,
      mood: prompt.mood,
      lighting: prompt.lighting,
      imageUrls: prompt.imageUrls,
      videoUrls: prompt.videoUrls,
      contentHash: prompt.contentHash,
    };
    lines.push(JSON.stringify(exported));
  }

  writeFileSync(outputPath, lines.join("\n") + "\n");
  console.log(`Exported ${lines.length} prompts to ${outputPath}`);
}
