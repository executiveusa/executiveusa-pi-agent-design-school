import {
  pgTable,
  uuid,
  text,
  timestamp,
  real,
  pgEnum,
  boolean,
} from "drizzle-orm/pg-core";

export const costPostureEnum = pgEnum("cost_posture", [
  "free",
  "low",
  "medium",
  "high",
]);

export const modelProfiles = pgTable("model_profiles", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  provider: text("provider").notNull(),
  taskCategory: text("task_category").notNull(),
  taskFitScore: real("task_fit_score").default(0.5),
  costPosture: costPostureEnum("cost_posture").notNull().default("medium"),
  safetyNotes: text("safety_notes"),
  promptTips: text("prompt_tips"),
  tags: text("tags").array(),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const modelRecommendations = pgTable("model_recommendations", {
  id: uuid("id").primaryKey().defaultRandom(),
  modelId: uuid("model_id")
    .notNull()
    .references(() => modelProfiles.id),
  taskSlug: text("task_slug").notNull(),
  recommendationScore: real("recommendation_score").notNull(),
  notes: text("notes"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});
