import { Pool } from 'pg';
import { drizzle, type NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from './schema';

export type Database = NodePgDatabase<typeof schema>;
export type DbTransaction = Parameters<Parameters<Database['transaction']>[0]>[0];

export class DatabaseClient {
  private pool: Pool;
  private db: Database;

  constructor(connectionString: string) {
    this.pool = new Pool({ connectionString });
    this.db = drizzle(this.pool, { schema });
  }

  get client(): Database {
    return this.db;
  }

  async connect(): Promise<void> {
    await this.pool.query('SELECT 1');
  }

  async disconnect(): Promise<void> {
    await this.pool.end();
  }
}