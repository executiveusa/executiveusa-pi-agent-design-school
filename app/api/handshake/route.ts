import { NextRequest, NextResponse } from "next/server";
import {
  handshakeRequestSchema,
  processHandshake,
} from "@/packages/agent-protocol/handshake";

const DEV_VALID_TOKENS = new Set([
  "founding-cohort-token",
  "invite-test-001",
  "invite-test-002",
]);

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

  const parsed = handshakeRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Validation failed",
        fields: parsed.error.issues.map((i) => ({
          field: i.path.join("."),
          message: i.message,
        })),
      },
      { status: 422 }
    );
  }

  const validTokens =
    process.env["NODE_ENV"] === "test"
      ? new Set(["test-token"])
      : DEV_VALID_TOKENS;

  const result = processHandshake(parsed.data, validTokens);

  if (result.status === "rejected") {
    return NextResponse.json(result, { status: 401 });
  }

  return NextResponse.json(result, { status: 200 });
}
