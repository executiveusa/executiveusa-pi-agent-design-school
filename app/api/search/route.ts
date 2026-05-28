import { NextRequest, NextResponse } from "next/server";
import { MVP_TRACKS } from "@/db/seed/tracks";
import { SEED_PROMPTS } from "@/db/seed/prompts";

export function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q")?.toLowerCase() ?? "";
  const type = searchParams.get("type") ?? "all";
  const limit = Math.min(parseInt(searchParams.get("limit") ?? "20", 10), 50);

  if (!q) {
    return NextResponse.json(
      { error: "Query parameter 'q' is required", code: "missing_query" },
      { status: 400 }
    );
  }

  const results: unknown[] = [];

  if (type === "all" || type === "course") {
    const matchedTracks = MVP_TRACKS.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.outcome.toLowerCase().includes(q)
    );
    for (const t of matchedTracks) {
      results.push({
        type: "course",
        slug: t.slug,
        name: t.name,
        snippet: t.agentReadableSummary,
      });
    }
  }

  if (type === "all" || type === "prompt") {
    const matchedPrompts = SEED_PROMPTS.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.body.toLowerCase().includes(q) ||
        p.mood.some((m) => m.toLowerCase().includes(q)) ||
        p.track.toLowerCase().includes(q)
    );
    for (let i = 0; i < matchedPrompts.length; i++) {
      const p = matchedPrompts[i];
      if (!p) continue;
      results.push({
        type: "prompt",
        id: `seed-${i + 1}`,
        title: p.title,
        snippet: p.agentReadableSummary,
        track: p.track,
      });
    }
  }

  return NextResponse.json({
    query: q,
    total: results.length,
    results: results.slice(0, limit),
  });
}
