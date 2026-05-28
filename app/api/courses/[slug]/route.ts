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

  return NextResponse.json({
    slug: track.slug,
    name: track.name,
    track: track.track,
    description: track.description,
    agent_readable_summary: track.agentReadableSummary,
    outcome: track.outcome,
    modules: [
      {
        slug: "foundations",
        title: "Foundations",
        description: `Core concepts and visual language for ${track.name}`,
        order: 1,
        lessons: [
          { slug: "intro", title: "Introduction", type: "text", order: 1 },
          {
            slug: "core-concepts",
            title: "Core Concepts",
            type: "text",
            order: 2,
          },
          {
            slug: "prompt-anatomy",
            title: "Prompt Anatomy",
            type: "prompt-exercise",
            order: 3,
          },
        ],
      },
      {
        slug: "craft",
        title: "Craft",
        description: "Advanced techniques and specialist skills",
        order: 2,
        lessons: [
          {
            slug: "advanced-prompting",
            title: "Advanced Prompting",
            type: "text",
            order: 1,
          },
          {
            slug: "style-references",
            title: "Style References",
            type: "reference",
            order: 2,
          },
          {
            slug: "exercise-1",
            title: "Craft Exercise",
            type: "prompt-exercise",
            order: 3,
          },
        ],
      },
      {
        slug: "eval",
        title: "Evaluation",
        description: "Graded evaluation exercises for certification",
        order: 3,
        lessons: [
          {
            slug: "eval-prep",
            title: "Evaluation Preparation",
            type: "text",
            order: 1,
          },
          {
            slug: "eval-exercise-1",
            title: "Eval Exercise 1",
            type: "eval",
            order: 2,
          },
          {
            slug: "eval-exercise-2",
            title: "Eval Exercise 2",
            type: "eval",
            order: 3,
          },
        ],
      },
    ],
    prompt_packs: track.promptPackSlugs,
    eval_rubric: track.evalRubric,
    graduation_requirements: track.graduationRequirements,
    status: track.status,
  });
}
