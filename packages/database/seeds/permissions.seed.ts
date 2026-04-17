import { eq } from 'drizzle-orm';
import { BasePermissions } from '@repo/permissions/constants';
import { permissions, users } from '../schema';
import type { DbTransaction } from '../db';

export async function seedPermissions(tx: DbTransaction) {
  const [superAdmin] = await tx
    .select({ id: users.id })
    .from(users)
    .where(eq(users.email, process.env.SA_EMAIL!))
    .limit(1);

  if (!superAdmin) {
    throw new Error('Super admin user not found. Run seedSuperAdmin() first.');
  }

  await tx
    .insert(permissions)
    .values(
      BasePermissions.map((perm) => ({
        resource: perm.resource,
        action: perm.action,
        description: perm.description,
        createdByUserId: superAdmin.id,
      }))
    )
    .onConflictDoNothing({
      target: [permissions.resource, permissions.action],
    });
}
