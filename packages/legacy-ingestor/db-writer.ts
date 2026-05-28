import { getDb } from "@/lib/db";
import {
  prompts,
  promptTags,
  promptMediaRefs,
} from "@/db/schema/prompts";
import { eq } from "drizzle-orm";
import type { SeedancePrompt } from "./seedance-parser";

export interface DbWriteResult {
  promptId: string;
  isNew: boolean;
  contentHash: string;
}

export async function writePromptToDb(
  prompt: SeedancePrompt
): Promise<DbWriteResult | null> {
  const db = getDb();

  // Check if already exists by content hash
  const existing = await db
    .select()
    .from(prompts)
    .where(eq(prompts.contentHash, prompt.contentHash))
    .limit(1);

  if (existing.length > 0) {
    return {
      promptId: existing[0].id,
      isNew: false,
      contentHash: prompt.contentHash,
    };
  }

  // Insert new prompt
  const inserted = await db
    .insert(prompts)
    .values({
      legacyId: prompt.legacyId,
      sourceUrl: prompt.sourceUrl,
      canonicalUrl: prompt.sourceUrl,
      title: prompt.title,
      body: prompt.body,
      language: prompt.language || "en",
      track: prompt.track as any,
      shotType: prompt.shotType,
      cameraMotion: prompt.cameraMotion,
      mood: prompt.mood,
      lighting: prompt.lighting,
      subject: prompt.categories,
      references: [],
      contentHash: prompt.contentHash,
      status: "draft",
    })
    .returning({ id: prompts.id });

  if (!inserted || inserted.length === 0) {
    return null;
  }

  const promptId = inserted[0].id;

  // Insert tags
  for (const tag of prompt.tags) {
    await db.insert(promptTags).values({
      promptId,
      tag,
    });
  }

  // Insert media references
  for (const imageUrl of prompt.imageUrls) {
    await db.insert(promptMediaRefs).values({
      promptId,
      mediaType: "image",
      url: imageUrl,
      sourceUrl: prompt.sourceUrl,
    });
  }

  for (const videoUrl of prompt.videoUrls) {
    await db.insert(promptMediaRefs).values({
      promptId,
      mediaType: "video",
      url: videoUrl,
      sourceUrl: prompt.sourceUrl,
    });
  }

  return {
    promptId,
    isNew: true,
    contentHash: prompt.contentHash,
  };
}

export async function writePromptsToDb(
  prompts_: SeedancePrompt[]
): Promise<{
  newCount: number;
  duplicateCount: number;
  failedCount: number;
  promptIds: string[];
}> {
  const results = {
    newCount: 0,
    duplicateCount: 0,
    failedCount: 0,
    promptIds: [] as string[],
  };

  for (const prompt of prompts_) {
    try {
      const result = await writePromptToDb(prompt);
      if (!result) {
        results.failedCount++;
        continue;
      }
      if (result.isNew) {
        results.newCount++;
      } else {
        results.duplicateCount++;
      }
      results.promptIds.push(result.promptId);
    } catch (error) {
      console.error(`Failed to write prompt "${prompt.title}":`, error);
      results.failedCount++;
    }
  }

  return results;
}
