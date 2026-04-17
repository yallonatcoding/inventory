import {
  pgTable,
  uuid,
  text,
  integer,
  timestamp,
  varchar,
  index,
  uniqueIndex,
} from 'drizzle-orm/pg-core';
import { sql, relations } from 'drizzle-orm';
import { users } from '../users/users.schema';
import { productVariants } from './product_variants.schema';

export const productImages = pgTable(
  'product_images',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    variantId: uuid('variant_id').references(() => productVariants.id).notNull(),
    url: text('url').notNull(),
    altText: varchar('alt_text', { length: 255 }),
    order: integer('order').notNull(),
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
    uniqueIndex('product_images_variant_order_uq').on(table.variantId, table.order),
    index('product_images_variant_id_idx').on(table.variantId),
    index('product_images_updated_at_idx').on(table.updatedAt),
  ]
);

export const productImagesRelations = relations(productImages, ({ one }) => ({
  variant: one(productVariants, {
    fields: [productImages.variantId],
    references: [productVariants.id],
  }),
}));
