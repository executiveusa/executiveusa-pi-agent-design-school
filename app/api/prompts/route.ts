import { NextRequest, NextResponse } from "next/server";
import { SEED_PROMPTS } from "@/db/seed/prompts";

export function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const track = searchParams.get("track");
  const mood = searchParams.get("mood");
  const page = parseInt(searchParams.get("page") ?? "1", 10);
  const limit = Math.min(parseInt(searchParams.get("limit") ?? "20", 10), 50);

  let prompts = SEED_PROMPTS;

  if (track) {
    prompts = prompts.filter((p) =>
      p.track.toLowerCase().includes(track.toLowerCase())
    );
  }

  if (mood) {
    prompts = prompts.filter((p) =>
      p.mood.some((m) => m.toLowerCase().includes(mood.toLowerCase()))
    );
  }

  const total = prompts.length;
  const start = (page - 1) * limit;
  const paginated = prompts.slice(start, start + limit);

  return NextResponse.json({
    page,
    limit,
    total,
    prompts: paginated.map((p, i) => ({
      id: `seed-${i + 1}`,
      legacy_id: undefined,
      title: p.title,
      track: p.track,
      shot_type: p.shotType,
      camera_motion: p.cameraMotion,
      mood: p.mood,
      model_compatibility: p.modelCompatibility,
      agent_readable_summary: p.agentReadableSummary,
      content_hash: p.contentHash,
    })),
  });
}
