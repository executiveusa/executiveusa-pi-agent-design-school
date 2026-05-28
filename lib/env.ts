import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().min(1),
  CERT_ISSUER_SECRET: z.string().min(1).default("dev-secret-change-in-prod"),
  ADMIN_SECRET: z.string().min(1).default("dev-admin-secret"),
  NEXT_PUBLIC_BASE_URL: z.string().url().default("http://localhost:3000"),
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
});

function parseEnv() {
  const result = envSchema.safeParse(process.env);
  if (!result.success) {
    const missing = result.error.issues
      .map((i) => i.path.join("."))
      .join(", ");
    throw new Error(`Missing required env vars: ${missing}`);
  }
  return result.data;
}

let _env: ReturnType<typeof parseEnv> | undefined;

export function getEnv() {
  if (!_env) {
    _env = parseEnv();
  }
  return _env;
}
