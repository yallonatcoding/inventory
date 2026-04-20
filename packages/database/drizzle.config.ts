import "dotenv/config";
import { defineConfig } from 'drizzle-kit';
import { validateDbEnv } from "@repo/config";

const env = validateDbEnv(process.env);

export default defineConfig({
  schema: './src/schema/index.ts',
  out: './migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: env.DATABASE_URL,
  },
});