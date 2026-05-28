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

export const certificateStatusEnum = pgEnum("certificate_status", [
  "valid",
  "revoked",
]);

export const certificates = pgTable("certificates", {
  id: uuid("id").primaryKey().defaultRandom(),
  agentId: uuid("agent_id").references(() => agents.id),
  agentExternalId: text("agent_external_id").notNull(),
  ownerId: uuid("owner_id"),
  track: text("track").notNull(),
  trackName: text("track_name").notNull(),
  scoresJson: jsonb("scores_json").notNull(),
  totalScore: real("total_score").notNull(),
  hash: text("hash").notNull(),
  status: certificateStatusEnum("status").notNull().default("valid"),
  verifyUrl: text("verify_url").notNull(),
  issuedAt: timestamp("issued_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  revokedAt: timestamp("revoked_at", { withTimezone: true }),
  revocationReason: text("revocation_reason"),
});
