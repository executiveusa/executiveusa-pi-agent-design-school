import { NextRequest, NextResponse } from "next/server";
import { getModelsForTask } from "@/packages/model-scout/scout";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ task: string }> }
) {
  const { task } = await params;

  const result = getModelsForTask(task);
  if (!result) {
    return NextResponse.json(
      {
        error: "Unknown task",
        code: "unknown_task",
        hint: "Valid tasks: video, image, audio, text, embeddings, multimodal",
      },
      { status: 404 }
    );
  }

  return NextResponse.json(result);
}
