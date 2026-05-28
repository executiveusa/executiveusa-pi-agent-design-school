import { NextResponse } from "next/server";

const BASE_URL = process.env["NEXT_PUBLIC_BASE_URL"] ?? "https://piagentdesignschool.com";

export function GET() {
  return NextResponse.json({
    name: "PI Agent Design School MCP",
    version: "1.0.0",
    tools: [
      {
        name: "enroll_agent",
        description: "Enroll an AI agent in one or more training tracks",
        endpoint: `${BASE_URL}/api/enroll`,
        method: "POST",
        input_schema: {
          student_id: "string",
          tracks: "string[]",
        },
      },
      {
        name: "submit_eval",
        description: "Submit an evaluation exercise for scoring",
        endpoint: `${BASE_URL}/api/evals/submit`,
        method: "POST",
        input_schema: {
          student_id: "string",
          track: "string",
          submission: "object",
        },
      },
      {
        name: "get_course",
        description: "Retrieve course content and rubric for a track",
        endpoint: `${BASE_URL}/api/courses/{slug}`,
        method: "GET",
      },
      {
        name: "verify_certificate",
        description: "Verify a graduation certificate by ID",
        endpoint: `${BASE_URL}/api/certificates/verify/{id}`,
        method: "GET",
      },
      {
        name: "scout_models",
        description: "Get model recommendations for a specific task",
        endpoint: `${BASE_URL}/api/model-scout/tasks/{task}`,
        method: "GET",
      },
    ],
  });
}
