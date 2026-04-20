import {
  uuid,
  index,
  pgTable,
  varchar,
  timestamp,
  uniqueIndex,
  text,
  boolean,
} from 'drizzle-orm/pg-core';
import { relations, sql } from 'drizzle-orm';
import { userRoles } from './user_roles.schema';
import { userPermissions } from './user_permissions.schema';

export const users = pgTable(
  'users',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    email: varchar('email', { length: 255 }).notNull().unique(),
    password: varchar('password', { length: 255 }),
    name: varchar('name', { length: 255 }).notNull(),
    image: text('image'),
    isSuperAdmin: boolean('is_super_admin').default(false).notNull(),
    createdByUserId: uuid('created_by_user_id'),
    updatedByUserId: uuid('updated_by_user_id'),
    disabledByUserId: uuid('disabled_by_user_id'),
    createdAt: timestamp('created_at', { withTimezone: true })
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
    updatedAt: timestamp('updated_at', { withTimezone: true }),
    disabledAt: timestamp('disabled_at', { withTimezone: true }),
    emailVerifiedAt: timestamp('email_verified_at', { withTimezone: true }),
  },
  (table) => [
    uniqueIndex('users_email_idx_uq').on(table.email),
    index('users_name_idx').on(table.name),
  ],
);

export const usersRelations = relations(users, ({ many }) => ({
  userRoles: many(userRoles),
  userPermissions: many(userPermissions),
}));
