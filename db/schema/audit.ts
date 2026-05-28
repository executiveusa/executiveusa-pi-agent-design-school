import { pgTable, uuid, text, timestamp, jsonb } from "drizzle-orm/pg-core";

export const auditEvents = pgTable("audit_events", {
  id: uuid("id").primaryKey().defaultRandom(),
  eventType: text("event_type").notNull(),
  agentId: uuid("agent_id"),
  agentExternalId: text("agent_external_id"),
  sessionId: uuid("session_id"),
  userId: uuid("user_id"),
  payloadHash: text("payload_hash"),
  outcome: text("outcome").notNull().default("success"),
  metadata: jsonb("metadata"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});
