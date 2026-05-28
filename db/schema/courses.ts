import {
  pgTable,
  uuid,
  text,
  timestamp,
  integer,
  pgEnum,
  jsonb,
  boolean,
} from "drizzle-orm/pg-core";

export const courseStatusEnum = pgEnum("course_status", [
  "draft",
  "active",
  "archived",
]);

export const courses = pgTable("courses", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  track: text("track").notNull(),
  description: text("description"),
  agentReadableSummary: text("agent_readable_summary"),
  outcome: text("outcome"),
  promptPackSlugs: text("prompt_pack_slugs").array(),
  evalRubric: jsonb("eval_rubric"),
  graduationRequirements: jsonb("graduation_requirements"),
  pomlVersion: text("poml_version").default("1.0"),
  status: courseStatusEnum("status").notNull().default("draft"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const courseModules = pgTable("course_modules", {
  id: uuid("id").primaryKey().defaultRandom(),
  courseId: uuid("course_id")
    .notNull()
    .references(() => courses.id),
  slug: text("slug").notNull(),
  title: text("title").notNull(),
  description: text("description"),
  order: integer("order").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const lessonTypeEnum = pgEnum("lesson_type", [
  "text",
  "prompt-exercise",
  "eval",
  "reference",
]);

export const lessons = pgTable("lessons", {
  id: uuid("id").primaryKey().defaultRandom(),
  moduleId: uuid("module_id")
    .notNull()
    .references(() => courseModules.id),
  slug: text("slug").notNull(),
  title: text("title").notNull(),
  type: lessonTypeEnum("type").notNull().default("text"),
  content: text("content"),
  promptPackRef: text("prompt_pack_ref"),
  order: integer("order").notNull().default(0),
  isPublished: boolean("is_published").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});
