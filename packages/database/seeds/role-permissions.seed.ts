import { inArray, eq } from 'drizzle-orm';
import { RolePermissionMatrix } from '@repo/permissions/constants';
import { toPermissionKey, buildPermission } from '@repo/permissions/helpers';
import { roles, permissions, rolePermissions, users } from '../schema';
import type { DbTransaction } from '../db';

export async function seedRolePermissions(tx: DbTransaction) {
  const roleCodes = Object.keys(RolePermissionMatrix) as Array<keyof typeof RolePermissionMatrix>;

  const [superAdmin] = await tx
    .select({ id: users.id })
    .from(users)
    .where(eq(users.email, process.env.SA_EMAIL!))
    .limit(1);

  if (!superAdmin) {
    throw new Error('Super admin user not found. Run seedSuperAdmin() first.');
  }

  const existingRoles = await tx
    .select({ id: roles.id, code: roles.code })
    .from(roles)
    .where(inArray(roles.code, roleCodes));

  if (existingRoles.length === 0) {
    throw new Error('Roles not found. Run seedRoles() first.');
  }

  const allPermissions = await tx
    .select({
      id: permissions.id,
      resource: permissions.resource,
      action: permissions.action,
    })
    .from(permissions);

  const permissionMap = new Map(
    allPermissions.map((p) => [
      toPermissionKey(p),
      p.id,
    ])
  );

  const inserts: Array<{
    roleId: string;
    permissionId: string;
    createdByUserId: string;
  }> = [];

  for (const role of existingRoles) {
    if (!(role.code in RolePermissionMatrix)) {
      throw new Error(`Unknown role: ${role.code}`);
    }

    const config = RolePermissionMatrix[role.code as keyof typeof RolePermissionMatrix];

    if (config === 'ALL') {
      for (const perm of allPermissions) {
        inserts.push({
          roleId: role.id,
          permissionId: perm.id,
          createdByUserId: superAdmin.id,
        });
      }
      continue;
    }

    for (const perm of config) {
      const key = buildPermission(perm.resource, perm.action);
      const permissionId = permissionMap.get(key);

      if (!permissionId) {
        throw new Error(`Permission not found: ${key}`);
      }

      inserts.push({
        roleId: role.id,
        permissionId,
        createdByUserId: superAdmin.id,
      });
    }
  }

  if (inserts.length === 0) return;

  await tx
    .insert(rolePermissions)
    .values(inserts)
    .onConflictDoNothing({
      target: [rolePermissions.roleId, rolePermissions.permissionId],
    });
}
