import { NextRequest, NextResponse } from "next/server";
import {
  grillMeRequestSchema,
  processGrillMe,
} from "@/packages/agent-protocol/grill-me";

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

  const parsed = grillMeRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", fields: parsed.error.issues },
      { status: 422 }
    );
  }

  const result = processGrillMe(parsed.data);
  return NextResponse.json(result);
}
