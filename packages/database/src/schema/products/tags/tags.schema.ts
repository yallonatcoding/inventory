import {
  pgTable,
  pgEnum,
  uuid,
  timestamp,
  varchar,
  uniqueIndex,
  index,
} from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { users } from '../../users/users.schema';
import { relations } from 'drizzle-orm';
import { productTags } from '../product_tags.schema';

export const tagTypeEnum = pgEnum('tag_type', [
  'category',
  'gender',
  'style',
  'other',
]);

export const tags = pgTable(
  'tags',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    name: varchar('name', { length: 100 }).notNull(),
    type: tagTypeEnum('type').notNull(),
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
    uniqueIndex('tags_name_uq').on(table.name),
    index('tags_name_idx').on(table.name),
    index('tags_updated_at_idx').on(table.updatedAt),
  ]
);

export const tagsRelations = relations(tags, ({ many }) => ({
  productTags: many(productTags),
}));
