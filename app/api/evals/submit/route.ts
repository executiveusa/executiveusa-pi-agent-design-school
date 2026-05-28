import { NextRequest, NextResponse } from "next/server";
import { scoreSubmission, getRubric } from "@/packages/eval-harness/index";
import { z } from "zod";

const submitSchema = z.object({
  student_id: z.string().min(1),
  track: z.string().min(1),
  module_slug: z.string().optional(),
  submission: z.object({
    prompt_body: z.string().min(10),
    shot_type: z.string().optional(),
    camera_motion: z.array(z.string()).optional(),
    mood: z.array(z.string()).optional(),
    lighting: z.array(z.string()).optional(),
    subject: z.array(z.string()).optional(),
    references: z.array(z.string()).optional(),
    safety_acknowledgment: z.boolean().optional(),
  }),
});

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body", code: "invalid_json" },
      { status: 400 }
    );
  }

  const parsed = submitSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Missing required rubric fields",
        fields: parsed.error.issues.map((i) => ({
          field: i.path.join("."),
          message: i.message,
        })),
      },
      { status: 422 }
    );
  }

  const rubric = getRubric(parsed.data.track);
  if (!rubric) {
    return NextResponse.json(
      {
        error: "Unknown track",
        code: "unknown_track",
        hint: `Valid tracks: documentary-prompt-specialist, anime-scene-specialist, ugc-content-agent, music-video-prompt-specialist, product-brand-film-specialist`,
      },
      { status: 400 }
    );
  }

  const result = scoreSubmission(rubric, parsed.data);
  return NextResponse.json(result);
}
