import {
  pgTable,
  uuid,
  text,
  timestamp,
  real,
  jsonb,
  pgEnum,
} from "drizzle-orm/pg-core";
import { agents } from "./users";

export const evalStatusEnum = pgEnum("eval_status", [
  "pending",
  "scoring",
  "pass",
  "fail",
  "error",
]);

export const evals = pgTable("evals", {
  id: uuid("id").primaryKey().defaultRandom(),
  rubricId: text("rubric_id").notNull(),
  track: text("track").notNull(),
  version: text("version").notNull().default("1.0"),
  rubricJson: jsonb("rubric_json").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const evalRuns = pgTable("eval_runs", {
  id: uuid("id").primaryKey().defaultRandom(),
  agentId: uuid("agent_id").references(() => agents.id),
  studentId: uuid("student_id"),
  track: text("track").notNull(),
  moduleSlug: text("module_slug"),
  submissionPayload: jsonb("submission_payload").notNull(),
  status: evalStatusEnum("status").notNull().default("pending"),
  resultJson: jsonb("result_json"),
  totalScore: real("total_score"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  completedAt: timestamp("completed_at", { withTimezone: true }),
});

export const evalScores = pgTable("eval_scores", {
  id: uuid("id").primaryKey().defaultRandom(),
  runId: uuid("run_id")
    .notNull()
    .references(() => evalRuns.id),
  criterionKey: text("criterion_key").notNull(),
  criterionLabel: text("criterion_label").notNull(),
  score: real("score").notNull(),
  maxScore: real("max_score").notNull(),
  passed: text("passed").notNull(),
  notes: text("notes"),
});
