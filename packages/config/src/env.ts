import { z } from 'zod';

const coreSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),
});

const dbSchema = coreSchema.extend({
  DATABASE_URL: z.url(),
});

export const nestEnvSchema = dbSchema.extend({
  JWT_SECRET: z.string().min(1, 'JWT_SECRET is required'),
  REDIS_URL: z.url().optional(),
  PORT: z.coerce.number().int().positive().default(3001),
});

export const nextEnvSchema = dbSchema.extend({
  NEXTAUTH_SECRET: z.string().min(1, 'NEXTAUTH_SECRET is required'),
  NEXTAUTH_URL: z.url().default('http://localhost:3000'),
  NEXT_PUBLIC_API_URL: z.url().default('http://localhost:3001'),
  GOOGLE_CLIENT_ID: z.string().min(1, 'GOOGLE_CLIENT_ID is required'),
  GOOGLE_CLIENT_SECRET: z.string().min(1, 'GOOGLE_CLIENT_SECRET is required'),
});

export const seedEnvSchema = dbSchema.extend({
  SA_EMAIL: z.email(),
  SA_PASSWORD: z.string().min(8),
});

export type CoreEnv = z.infer<typeof coreSchema>;
export type DbEnv = z.infer<typeof dbSchema>;
export type NestEnv = z.infer<typeof nestEnvSchema>;
export type NextEnv = z.infer<typeof nextEnvSchema>;
export type SeedEnv = z.infer<typeof seedEnvSchema>;

export const validateCoreEnv = (env: Record<string, unknown>) => validateEnv(coreSchema, env, 'core');
export const validateDbEnv = (env: Record<string, unknown>) => validateEnv(dbSchema, env, 'database');
export const validateNestEnv = (env: Record<string, unknown>) => validateEnv(nestEnvSchema, env, 'apps/api');
export const validateNextEnv = (env: Record<string, unknown>) => validateEnv(nextEnvSchema, env, 'apps/web');
export const validateSeedEnv = (env: Record<string, unknown>) => validateEnv(seedEnvSchema, env, 'seeds');

function validateEnv<T extends z.ZodTypeAny>(
  schema: T,
  env: Record<string, unknown>,
  context: string
): z.infer<T> {
  const parsed = schema.safeParse(env);

  if (!parsed.success) {
    const shouldSkip = process.env.SKIP_ENV_VALIDATION === '1' || process.env.SKIP_ENV_VALIDATION === 'true';

    console.error(`Invalid environment variables (${context}):`);
    console.error(parsed.error.issues);

    if (shouldSkip) {
      console.warn('⚠️ SKIP_ENV_VALIDATION is enabled. Proceeding with potentially invalid environment.');
      return env as z.infer<T>;
    }

    throw new Error('Env validation failed');
  }

  return parsed.data;
}