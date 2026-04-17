import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { validateDbEnv } from '@repo/config/env';
import * as schema from '@repo/database/schema';

let _db: ReturnType<typeof drizzle<typeof schema>> | null = null;

export function getDb() {
  if (_db) return _db;

  const env = validateDbEnv(process.env);

  const pool = new Pool({
    connectionString: env.DATABASE_URL,
  });

  _db = drizzle(pool, { schema });
  return _db;
} 