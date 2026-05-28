import { randomUUID } from "crypto";
import type {
  Rubric,
  RubricCriterion,
  EvalSubmission,
  CriterionScore,
  EvalResult,
} from "./types";

function scoreLength(
  value: string | undefined,
  config: Record<string, unknown>
): CriterionScore & { passed: boolean } {
  const min = (config["min"] as number) ?? 10;
  const len = (value ?? "").trim().length;
  const passed = len >= min;
  return {
    key: "",
    label: "",
    score: passed ? 1 : len / min,
    maxScore: 1,
    passed,
    notes: passed ? undefined : `Minimum length ${min} chars, got ${len}`,
  };
}

function scorePresence(
  submission: EvalSubmission["submission"],
  config: Record<string, unknown>
): { score: number; passed: boolean; notes?: string } {
  const field = config["field"] as string;
  const minItems = (config["minItems"] as number) ?? 1;
  const value = submission[field];

  if (Array.isArray(value)) {
    const passed = value.length >= minItems;
    return {
      score: passed ? 1 : 0,
      passed,
      notes: passed ? undefined : `Field "${field}" requires ${minItems} items`,
    };
  }

  const present = value != null && String(value).trim().length > 0;
  return {
    score: present ? 1 : 0,
    passed: present,
    notes: present ? undefined : `Field "${field}" is missing`,
  };
}

function scorePattern(
  text: string,
  config: Record<string, unknown>
): { score: number; passed: boolean; notes?: string } {
  const patterns = (config["patterns"] as string[]) ?? [];
  const lower = text.toLowerCase();
  const matched = patterns.some((p) => lower.includes(p.toLowerCase()));
  return {
    score: matched ? 1 : 0,
    passed: matched,
    notes: matched ? undefined : `None of the expected patterns found`,
  };
}

function scoreSafety(
  text: string,
  config: Record<string, unknown>
): { score: number; passed: boolean; notes?: string; unsafe?: string[] } {
  const forbidden = (config["forbiddenPatterns"] as string[]) ?? [];
  const lower = text.toLowerCase();
  const found = forbidden.filter((p) => lower.includes(p.toLowerCase()));

  if (found.length > 0) {
    return {
      score: 0,
      passed: false,
      notes: `Unsafe patterns detected: ${found.join(", ")}`,
      unsafe: found,
    };
  }
  return { score: 1, passed: true };
}

function scoreCriterion(
  criterion: RubricCriterion,
  submission: EvalSubmission["submission"]
): CriterionScore {
  const allText = [
    submission.prompt_body ?? "",
    JSON.stringify(submission),
  ].join(" ");

  let score = 0;
  let passed = false;
  let notes: string | undefined;

  switch (criterion.checkType) {
    case "length": {
      const r = scoreLength(submission.prompt_body, criterion.checkConfig);
      score = r.score;
      passed = r.passed;
      notes = r.notes;
      break;
    }
    case "presence": {
      const r = scorePresence(submission, criterion.checkConfig);
      score = r.score;
      passed = r.passed;
      notes = r.notes;
      break;
    }
    case "pattern": {
      const r = scorePattern(allText, criterion.checkConfig);
      score = r.score;
      passed = r.passed;
      notes = r.notes;
      break;
    }
    case "safety": {
      const r = scoreSafety(allText, criterion.checkConfig);
      score = r.score;
      passed = r.passed;
      notes = r.notes;
      break;
    }
    case "enum": {
      score = 1;
      passed = true;
      break;
    }
  }

  return {
    key: criterion.key,
    label: criterion.label,
    score: score * criterion.weight,
    maxScore: criterion.weight,
    passed,
    notes,
  };
}

export function scoreSubmission(
  rubric: Rubric,
  submission: EvalSubmission
): EvalResult {
  const runId = randomUUID();
  const scores: Record<string, CriterionScore> = {};
  const missingRequirements: string[] = [];
  const unsafeBehaviors: string[] = [];
  const remediation: string[] = [];

  for (const criterion of rubric.criteria) {
    const score = scoreCriterion(criterion, submission.submission);
    scores[criterion.key] = score;

    if (!score.passed && criterion.required) {
      missingRequirements.push(criterion.label);
      remediation.push(`Fix "${criterion.label}": ${score.notes ?? "required"}`);
    }

    if (
      criterion.checkType === "safety" &&
      !score.passed &&
      score.notes
    ) {
      unsafeBehaviors.push(score.notes);
    }
  }

  const totalScore =
    Object.values(scores).reduce((sum, s) => sum + s.score, 0);

  const hasMandatoryFail = rubric.criteria.some(
    (c) => c.required && !scores[c.key]?.passed
  );

  const status: "pass" | "fail" =
    !hasMandatoryFail && totalScore >= rubric.passThreshold ? "pass" : "fail";

  return {
    runId,
    status,
    scores,
    totalScore,
    passThreshold: rubric.passThreshold,
    missingRequirements,
    unsafeBehaviors,
    remediation,
    evaluatedAt: new Date().toISOString(),
  };
}
