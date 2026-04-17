import { eq } from 'drizzle-orm';
import { roles, users } from '../schema';
import type { DbTransaction } from '../db';

export async function seedRoles(tx: DbTransaction) {
  const baseRoles = ['super_admin', 'admin', 'manager', 'staff'] as const;

  const [superAdmin] = await tx
    .select({ id: users.id })
    .from(users)
    .where(eq(users.email, process.env.SA_EMAIL!))
    .limit(1);

  if (!superAdmin) {
    throw new Error('Super admin user not found. Run seedSuperAdmin() first.');
  }

  await tx
    .insert(roles)
    .values(
      baseRoles.map((code) => ({
        code,
        description: `${code} role`,
        createdByUserId: superAdmin.id,
      }))
    )
    .onConflictDoNothing({
      target: [roles.code],
    });
}
