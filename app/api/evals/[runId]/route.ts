import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ runId: string }> }
) {
  const { runId } = await params;

  return NextResponse.json(
    {
      error: "Eval run not found or not yet available.",
      code: "not_found",
      hint: "Submit evaluations via POST /api/evals/submit. Results are returned immediately.",
      run_id: runId,
    },
    { status: 404 }
  );
}
