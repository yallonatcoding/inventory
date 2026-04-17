import {
  pgTable,
  uuid,
  text,
  timestamp,
  varchar,
  uniqueIndex,
  index,
} from 'drizzle-orm/pg-core';
import { sql, relations } from 'drizzle-orm';
import { users } from '../users/users.schema';
import { productVariants } from './product_variants.schema';
import { productTags } from './product_tags.schema';

export const products = pgTable(
  'products',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    name: varchar('name', { length: 255 }).notNull(),
    slug: varchar('slug', { length: 255 }).notNull(),
    brand: varchar('brand', { length: 100 }),
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
    uniqueIndex('products_name_brand_uq').on(table.name, table.brand),
    index('products_name_idx').on(table.name),
    index('products_slug_idx').on(table.slug),
    index('products_brand_idx').on(table.brand),
    index('products_updated_at_idx').on(table.updatedAt),
  ]
);

export const productRelations = relations(products, ({ many }) => ({
  variants: many(productVariants),
  tags: many(productTags),
}));
