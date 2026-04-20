import { z } from 'zod';

const baseSchema = z.object({
  DATABASE_URL: z.url(),
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),
});

export const nestEnvSchema = baseSchema.extend({
  JWT_SECRET: z.string().min(1, 'JWT_SECRET is required'),
  REDIS_URL: z.url().optional(),
  PORT: z.coerce.number().int().positive().default(3001),
});

export const nextEnvSchema = baseSchema.extend({
  NEXTAUTH_SECRET: z.string().min(1, 'NEXTAUTH_SECRET is required'),
  NEXTAUTH_URL: z.url().default('http://localhost:3000'),
  NEXT_PUBLIC_API_URL: z.url().default('http://localhost:3001'),
});

export const seedEnvSchema = baseSchema.extend({
  SA_EMAIL: z.email(),
  SA_PASSWORD: z.string().min(8),
});

export type NestEnv = z.infer<typeof nestEnvSchema>;
export type NextEnv = z.infer<typeof nextEnvSchema>;
export type SeedEnv = z.infer<typeof seedEnvSchema>;
export type DbEnv = z.infer<typeof baseSchema>;

export const validateNestEnv = (env: Record<string, unknown>) => validateEnv(nestEnvSchema, env, 'apps/api');
export const validateNextEnv = (env: Record<string, unknown>) => validateEnv(nextEnvSchema, env, 'apps/web');
export const validateSeedEnv = (env: Record<string, unknown>) => validateEnv(seedEnvSchema, env, 'seeds');
export const validateDbEnv = (env: Record<string, unknown>) => validateEnv(baseSchema, env, 'database');

function validateEnv<T extends z.ZodTypeAny>(
  schema: T,
  env: Record<string, unknown>,
  context: string
): z.infer<T> {
  const parsed = schema.safeParse(env);

  if (!parsed.success) {
    console.error(`Invalid environment variables (${context}):`);
    console.error(parsed.error.issues);
    throw new Error('Env validation failed');
  }

  return parsed.data;
}