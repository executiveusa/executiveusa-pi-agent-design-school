import {
  pgTable,
  uuid,
  text,
  timestamp,
  integer,
  pgEnum,
  boolean,
  vector,
} from "drizzle-orm/pg-core";

export const promptStatusEnum = pgEnum("prompt_status", [
  "draft",
  "review",
  "published",
  "archived",
]);

export const promptTrackEnum = pgEnum("prompt_track", [
  "documentary",
  "anime",
  "ugc",
  "music_video",
  "product_video",
  "brand_film",
  "fashion",
  "nonprofit",
  "cinematic",
  "general",
]);

export const prompts = pgTable("prompts", {
  id: uuid("id").primaryKey().defaultRandom(),
  legacyId: text("legacy_id"),
  sourceUrl: text("source_url"),
  canonicalUrl: text("canonical_url"),
  title: text("title").notNull(),
  body: text("body").notNull(),
  language: text("language").default("en"),
  track: promptTrackEnum("track").notNull().default("general"),
  shotType: text("shot_type"),
  cameraMotion: text("camera_motion").array(),
  subject: text("subject").array(),
  mood: text("mood").array(),
  lighting: text("lighting").array(),
  references: text("references").array(),
  mediaInputs: text("media_inputs").array(),
  modelCompatibility: text("model_compatibility").array(),
  safetyFlags: text("safety_flags").array(),
  evalCriteria: text("eval_criteria").array(),
  agentReadableSummary: text("agent_readable_summary"),
  pomlFragment: text("poml_fragment"),
  demoImageUrl: text("demo_image_url"),
  demoVideoUrl: text("demo_video_url"),
  contentHash: text("content_hash").notNull(),
  version: integer("version").notNull().default(1),
  status: promptStatusEnum("status").notNull().default("draft"),
  embedding: vector("embedding", { dimensions: 1536 }),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const promptVersions = pgTable("prompt_versions", {
  id: uuid("id").primaryKey().defaultRandom(),
  promptId: uuid("prompt_id")
    .notNull()
    .references(() => prompts.id),
  version: integer("version").notNull(),
  body: text("body").notNull(),
  contentHash: text("content_hash").notNull(),
  changedBy: text("changed_by"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const promptMediaRefs = pgTable("prompt_media_refs", {
  id: uuid("id").primaryKey().defaultRandom(),
  promptId: uuid("prompt_id")
    .notNull()
    .references(() => prompts.id),
  mediaType: text("media_type").notNull(),
  url: text("url").notNull(),
  altText: text("alt_text"),
  sourceUrl: text("source_url"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const promptCategories = pgTable("prompt_categories", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull().unique(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
});

export const promptTags = pgTable("prompt_tags", {
  id: uuid("id").primaryKey().defaultRandom(),
  promptId: uuid("prompt_id")
    .notNull()
    .references(() => prompts.id),
  tag: text("tag").notNull(),
});

export const promptPacks = pgTable("prompt_packs", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  track: text("track").notNull(),
  description: text("description"),
  promptIds: uuid("prompt_ids").array(),
  isPublished: boolean("is_published").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});
