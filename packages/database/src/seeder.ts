import { seedSuperAdmin } from '../seeds/users.seed';
import { seedRoles } from '../seeds/roles.seed';
import { seedPermissions } from '../seeds/permissions.seed';
import { seedRolePermissions } from '../seeds/role-permissions.seed';
import { DatabaseClient } from './client';
import { getDbEnv } from '@repo/config/env';

async function execute() {
  const env = getDbEnv();
  const dbClient = new DatabaseClient(env.DATABASE_URL);

  try {
    await dbClient.connect();
    await dbClient.client.transaction(async (tx) => {
      await seedSuperAdmin(tx);
      await seedPermissions(tx);
      await seedRoles(tx);
      await seedRolePermissions(tx);
    });

    console.log('🌱 All seeds executed');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed error:', error);
    process.exit(1);
  } finally {
    await dbClient.disconnect();
  }
}

execute();
