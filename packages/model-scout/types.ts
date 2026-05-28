export interface ModelProfile {
  id: string;
  name: string;
  provider: string;
  taskCategory: string;
  taskFitScore: number;
  costPosture: "free" | "low" | "medium" | "high";
  safetyNotes: string;
  promptTips: string;
  tags: string[];
}

export interface ModelScoutTask {
  slug: string;
  name: string;
  models: ModelProfile[];
}
