import {
  uuid,
  pgTable,
  boolean,
  timestamp,
  uniqueIndex,
  index,
} from 'drizzle-orm/pg-core';
import { relations, sql } from 'drizzle-orm';
import { users } from './users.schema';
import { permissions } from '../permissions/permissions.schema';

export const userPermissions = pgTable(
  'user_permissions',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id')
      .references(() => users.id)
      .notNull(),
    permissionId: uuid('permission_id')
      .references(() => permissions.id)
      .notNull(),
    allow: boolean('allow').default(true).notNull(),
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
    uniqueIndex('user_permissions_idx_uq').on(table.userId, table.permissionId),
    index('user_permissions_user_id_idx').on(table.userId),
    index('user_permissions_permission_id_idx').on(table.permissionId),
    index('user_permissions_updated_at_idx').on(table.updatedAt),
  ],
);

export const userPermissionsRelations = relations(
  userPermissions,
  ({ one }) => ({
    user: one(users, {
      fields: [userPermissions.userId],
      references: [users.id],
    }),
    permission: one(permissions, {
      fields: [userPermissions.permissionId],
      references: [permissions.id],
    }),
  }),
);
