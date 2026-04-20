import { validateSeedEnv } from '@repo/config';
import { DatabaseClient } from '../src/client';
import { seedRoles } from './roles.seed';
import { seedPermissions } from './permissions.seed';
import { seedRolePermissions } from './role-permissions.seed';
import { seedSuperAdmin } from './users.seed';

async function execute() {
  const env = validateSeedEnv(process.env);
  const dbClient = new DatabaseClient(env.DATABASE_URL);

  try {
    await dbClient.connect();
    await dbClient.client.transaction(async (tx) => {
      await seedSuperAdmin(tx);
      await seedRoles(tx);
      await seedPermissions(tx);
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
