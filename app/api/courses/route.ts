import { NextRequest, NextResponse } from "next/server";
import { MVP_TRACKS } from "@/db/seed/tracks";

export function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const track = searchParams.get("track");
  const page = parseInt(searchParams.get("page") ?? "1", 10);
  const limit = Math.min(parseInt(searchParams.get("limit") ?? "20", 10), 50);

  let tracks = MVP_TRACKS;
  if (track) {
    tracks = tracks.filter((t) => t.slug === track || t.track === track);
  }

  const total = tracks.length;
  const start = (page - 1) * limit;
  const paginated = tracks.slice(start, start + limit);

  return NextResponse.json({
    page,
    limit,
    total,
    courses: paginated.map((t) => ({
      slug: t.slug,
      name: t.name,
      track: t.track,
      module_count: 3,
      agent_readable_summary: t.agentReadableSummary,
      outcome: t.outcome,
      status: t.status,
    })),
  });
}
