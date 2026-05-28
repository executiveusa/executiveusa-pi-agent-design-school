import { NextRequest, NextResponse } from "next/server";
import { SEED_PROMPTS } from "@/db/seed/prompts";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const index = parseInt(id.replace("seed-", ""), 10) - 1;
  const prompt = SEED_PROMPTS[index];

  if (!prompt) {
    return NextResponse.json(
      { error: "Prompt not found", code: "not_found" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    id,
    legacy_id: prompt.legacyId ?? undefined,
    title: prompt.title,
    body: prompt.body,
    track: prompt.track,
    shot_type: prompt.shotType,
    camera_motion: prompt.cameraMotion,
    subject: prompt.subject,
    mood: prompt.mood,
    lighting: prompt.lighting,
    references: prompt.references ?? [],
    media_inputs: prompt.mediaInputs ?? [],
    model_compatibility: prompt.modelCompatibility ?? [],
    safety_flags: prompt.safetyFlags,
    eval_criteria: prompt.evalCriteria,
    agent_readable_summary: prompt.agentReadableSummary,
    content_hash: prompt.contentHash,
    version: 1,
    status: "published",
  });
}
