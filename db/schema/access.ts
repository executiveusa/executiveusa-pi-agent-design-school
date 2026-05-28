import {
  pgTable,
  uuid,
  text,
  timestamp,
  boolean,
  pgEnum,
} from "drizzle-orm/pg-core";
import { users } from "./users";

export const accessScopeEnum = pgEnum("access_scope", [
  "free",
  "invite",
  "paid",
  "studio",
  "enterprise",
]);

export const accessGrants = pgTable("access_grants", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => users.id),
  agentExternalId: text("agent_external_id"),
  scope: accessScopeEnum("scope").notNull().default("free"),
  grantedBy: text("granted_by"),
  expiresAt: timestamp("expires_at", { withTimezone: true }),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const inviteTokens = pgTable("invite_tokens", {
  id: uuid("id").primaryKey().defaultRandom(),
  token: text("token").notNull().unique(),
  scope: accessScopeEnum("scope").notNull().default("free"),
  usedBy: text("used_by"),
  usedAt: timestamp("used_at", { withTimezone: true }),
  expiresAt: timestamp("expires_at", { withTimezone: true }),
  isRevoked: boolean("is_revoked").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const apiKeys = pgTable("api_keys", {
  id: uuid("id").primaryKey().defaultRandom(),
  keyHash: text("key_hash").notNull().unique(),
  name: text("name").notNull(),
  userId: uuid("user_id").references(() => users.id),
  agentExternalId: text("agent_external_id"),
  scope: accessScopeEnum("scope").notNull().default("free"),
  isActive: boolean("is_active").notNull().default(true),
  lastUsedAt: timestamp("last_used_at", { withTimezone: true }),
  expiresAt: timestamp("expires_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const payments = pgTable("payments", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => users.id),
  stripeCustomerId: text("stripe_customer_id"),
  stripeSubscriptionId: text("stripe_subscription_id"),
  amount: text("amount"),
  currency: text("currency").default("usd"),
  status: text("status").notNull().default("pending"),
  metadata: text("metadata"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});
