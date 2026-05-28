export interface PostizDraft {
  id: string;
  platform: "twitter" | "instagram" | "tiktok" | "linkedin";
  content: string;
  scheduledAt?: string;
  status: "draft" | "pending-approval" | "approved" | "published";
  approvedBy?: string;
  approvedAt?: string;
}

export class UnauthorizedPublishError extends Error {
  constructor() {
    super(
      "UNAUTHORIZED: Autonomous social publishing is not permitted. " +
        "All campaigns must be reviewed and approved by a human admin before publishing."
    );
    this.name = "UnauthorizedPublishError";
  }
}
