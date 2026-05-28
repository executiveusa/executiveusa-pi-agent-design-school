export interface RubricCriterion {
  key: string;
  label: string;
  description?: string;
  weight: number;
  required: boolean;
  checkType: "presence" | "length" | "enum" | "pattern" | "safety";
  checkConfig: Record<string, unknown>;
}

export interface Rubric {
  rubricId: string;
  track: string;
  version: string;
  passThreshold: number;
  criteria: RubricCriterion[];
}

export interface EvalSubmission {
  student_id: string;
  track: string;
  module_slug?: string;
  submission: {
    prompt_body: string;
    shot_type?: string;
    camera_motion?: string[];
    mood?: string[];
    lighting?: string[];
    subject?: string[];
    references?: string[];
    safety_acknowledgment?: boolean;
    [key: string]: unknown;
  };
}

export interface CriterionScore {
  key: string;
  label: string;
  score: number;
  maxScore: number;
  passed: boolean;
  notes?: string;
}

export interface EvalResult {
  runId: string;
  status: "pass" | "fail";
  scores: Record<string, CriterionScore>;
  totalScore: number;
  passThreshold: number;
  missingRequirements: string[];
  unsafeBehaviors: string[];
  remediation: string[];
  evaluatedAt: string;
}
