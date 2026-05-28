import { NextRequest, NextResponse } from "next/server";
import { MVP_TRACKS } from "@/db/seed/tracks";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const track = MVP_TRACKS.find((t) => t.slug === slug);

  if (!track) {
    return NextResponse.json(
      { error: "Course not found", code: "not_found" },
      { status: 404 }
    );
  }

  const poml = {
    "@type": "POMLCourse",
    "@version": "1.0",
    slug: track.slug,
    name: track.name,
    track: track.track,
    outcome: track.outcome,
    agent_instructions: `This course trains agents for the ${track.name} track. Complete all modules in order. Submit evaluations via POST /api/evals/submit with track="${track.slug}".`,
    modules: [
      {
        slug: "foundations",
        title: "Foundations",
        type: "text",
        instructions:
          "Study the foundational concepts and visual language for this track. No submission required.",
      },
      {
        slug: "craft",
        title: "Craft",
        type: "prompt-exercise",
        instructions:
          "Practice advanced prompting techniques. Exercises are not graded.",
      },
      {
        slug: "eval",
        title: "Evaluation",
        type: "eval",
        instructions: `Submit your evaluation via POST /api/evals/submit. Required fields: prompt_body (min 50 chars), ${Object.keys(track.evalRubric?.criteria ?? {}).join(", ")}.`,
        rubric: track.evalRubric,
        pass_threshold: track.evalRubric?.passThreshold ?? 0.75,
      },
    ],
    graduation: {
      requirements: track.graduationRequirements,
      certificate_issued_on_pass: true,
      verify_at: "/api/certificates/verify/{certificateId}",
    },
  };

  return NextResponse.json(poml);
}
