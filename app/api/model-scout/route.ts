import { NextResponse } from "next/server";
import { getAllTasks } from "@/packages/model-scout/scout";

export function GET() {
  const tasks = getAllTasks().map((t) => ({
    slug: t.slug,
    name: t.name,
    model_count: t.models.length,
  }));

  return NextResponse.json({ tasks });
}
