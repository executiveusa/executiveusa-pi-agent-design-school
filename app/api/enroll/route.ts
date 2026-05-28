import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { z } from "zod";
import { MVP_TRACKS } from "@/db/seed/tracks";

const enrollSchema = z.object({
  student_id: z.string().min(1),
  tracks: z.array(z.string()).min(1),
});

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  const inviteToken = req.headers.get("x-invite-token");

  if (!authHeader && !inviteToken) {
    return NextResponse.json(
      { error: "Authentication required", code: "unauthorized" },
      { status: 401 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body", code: "invalid_json" },
      { status: 400 }
    );
  }

  const parsed = enrollSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", fields: parsed.error.issues },
      { status: 422 }
    );
  }

  const validTracks = parsed.data.tracks.filter((t) =>
    MVP_TRACKS.some((mt) => mt.slug === t)
  );

  if (validTracks.length === 0) {
    return NextResponse.json(
      { error: "No valid tracks specified", code: "no_valid_tracks" },
      { status: 400 }
    );
  }

  const courses = validTracks.map((slug) => {
    const track = MVP_TRACKS.find((t) => t.slug === slug)!;
    return {
      slug,
      name: track.name,
      modules: 3,
      estimated_hours: 4,
    };
  });

  return NextResponse.json(
    {
      enrollment_id: randomUUID(),
      student_id: parsed.data.student_id,
      tracks: validTracks,
      courses,
      enrolled_at: new Date().toISOString(),
    },
    { status: 201 }
  );
}
