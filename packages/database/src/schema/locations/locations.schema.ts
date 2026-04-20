import {
  pgTable,
  pgEnum,
  uuid,
  varchar,
  timestamp,
  uniqueIndex,
  index,
} from 'drizzle-orm/pg-core';
import { users } from '../users/users.schema';
import { sql } from 'drizzle-orm';

export const locationTypeEnum = pgEnum('location_type', [
  'store',
  'warehouse',
  'other',
]);

export const locations = pgTable(
  'locations',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    name: varchar('name', { length: 100 }).notNull(),
    type: locationTypeEnum('type').notNull(),
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
    uniqueIndex('locations_name_type_idx_uq').on(table.name, table.type),
    index('locations_updated_at_idx').on(table.updatedAt),
  ],
);
