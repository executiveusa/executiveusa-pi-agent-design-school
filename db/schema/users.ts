import {
  pgTable,
  uuid,
  text,
  timestamp,
  pgEnum,
  boolean,
} from "drizzle-orm/pg-core";

export const userRoleEnum = pgEnum("user_role", ["owner", "admin", "viewer"]);

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").notNull().unique(),
  name: text("name"),
  role: userRoleEnum("role").notNull().default("owner"),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const agentStatusEnum = pgEnum("agent_status", [
  "registered",
  "enrolled",
  "training",
  "graduated",
  "suspended",
]);

export const agents = pgTable("agents", {
  id: uuid("id").primaryKey().defaultRandom(),
  ownerId: uuid("owner_id")
    .notNull()
    .references(() => users.id),
  agentId: text("agent_id").notNull().unique(),
  name: text("name"),
  capabilities: text("capabilities").array(),
  constraints: text("constraints").array(),
  businessContext: text("business_context"),
  modelStack: text("model_stack").array(),
  safetyProfile: text("safety_profile").default("standard"),
  status: agentStatusEnum("status").notNull().default("registered"),
  studentId: uuid("student_id").unique(),
  accessScope: text("access_scope").default("free"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const agentSessions = pgTable("agent_sessions", {
  id: uuid("id").primaryKey().defaultRandom(),
  agentId: uuid("agent_id")
    .notNull()
    .references(() => agents.id),
  sessionToken: text("session_token").notNull().unique(),
  startedAt: timestamp("started_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  endedAt: timestamp("ended_at", { withTimezone: true }),
  metadata: text("metadata"),
});

export const agentHandshakes = pgTable("agent_handshakes", {
  id: uuid("id").primaryKey().defaultRandom(),
  agentId: uuid("agent_id").references(() => agents.id),
  requestPayload: text("request_payload").notNull(),
  status: text("status").notNull().default("pending"),
  studentId: uuid("student_id"),
  assignedTracks: text("assigned_tracks").array(),
  responsePayload: text("response_payload"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const agentEnrollments = pgTable("agent_enrollments", {
  id: uuid("id").primaryKey().defaultRandom(),
  agentId: uuid("agent_id")
    .notNull()
    .references(() => agents.id),
  trackSlug: text("track_slug").notNull(),
  courseId: uuid("course_id"),
  status: text("status").notNull().default("active"),
  enrolledAt: timestamp("enrolled_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  completedAt: timestamp("completed_at", { withTimezone: true }),
});
