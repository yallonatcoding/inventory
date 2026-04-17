import "dotenv/config";
import { defineConfig } from 'drizzle-kit';
import { getDbEnv } from "@repo/config/env";

const env = getDbEnv();

export default defineConfig({
  schema: './schema/index.ts',
  out: './migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: env.DATABASE_URL,
  },
});