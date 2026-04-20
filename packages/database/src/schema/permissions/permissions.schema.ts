import {
  uuid,
  pgTable,
  varchar,
  timestamp,
  text,
  uniqueIndex,
  index,
} from 'drizzle-orm/pg-core';
import { relations, sql } from 'drizzle-orm';
import { userPermissions } from '../users/user_permissions.schema';
import { rolePermissions } from '../roles/role_permissions.schema';
import { users } from '../users/users.schema';

export const permissions = pgTable(
  'permissions',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    resource: varchar('resource', { length: 100 }).notNull(),
    action: varchar('action', { length: 100 }).notNull(),
    description: text('description'),
    createdByUserId: uuid('created_by_user_id')
      .references(() => users.id)
      .notNull(),
    updatedByUserId: uuid('updated_by_user_id').references(() => users.id),
    disabledByUserId: uuid('disabled_by_user_id').references(() => users.id),
    createdAt: timestamp('created_at', { withTimezone: true })
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
    updatedAt: timestamp('updated_at', { withTimezone: true }),
    disabledAt: timestamp('disabled_at', { withTimezone: true }),
  },
  (table) => [
    uniqueIndex('permissions_resource_action_idx_uq').on(
      table.resource,
      table.action,
    ),
    index('permissions_resource_idx').on(table.resource),
    index('permissions_updated_at_idx').on(table.updatedAt),
  ],
);

export const permissionsRelations = relations(permissions, ({ many }) => ({
  rolePermissions: many(rolePermissions),
  userPermissions: many(userPermissions),
}));
