import { UnauthorizedPublishError } from "./types";
export * from "./types";

export async function createDraft(
  draft: Omit<import("./types").PostizDraft, "id" | "status">
): Promise<import("./types").PostizDraft> {
  console.log("[Postiz Adapter] createDraft called — mocked.");
  return {
    id: `draft-${Date.now()}`,
    ...draft,
    status: "draft",
  };
}

export async function publishDraft(_draftId: string, _approvedBy: string): Promise<void> {
  throw new UnauthorizedPublishError();
}

export async function approveAndPublish(
  _draftId: string,
  _approvedBy: string
): Promise<void> {
  console.log("[Postiz Adapter] approveAndPublish — requires integration with POSTIZ_API_KEY.");
  console.log("Human admin must approve drafts before publishing.");
}
