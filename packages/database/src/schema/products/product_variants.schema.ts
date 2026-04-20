import {
  pgTable,
  uuid,
  decimal,
  timestamp,
  varchar,
  uniqueIndex,
  index,
  check
} from 'drizzle-orm/pg-core';
import { sql, relations } from 'drizzle-orm';
import { users } from '../users/users.schema';
import { products } from './products.schema';
import { productImages } from './product_images.schema';

export const productVariants = pgTable(
  'product_variants',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    productId: uuid('product_id').references(() => products.id).notNull(),
    name: varchar('name', { length: 255 }).notNull(),
    slug: varchar('slug', { length: 255 }).notNull(),
    sku: varchar('sku', { length: 100 }).notNull(),
    barcode: varchar('barcode', { length: 100 }),
    qrcode: varchar('qrcode', { length: 100 }),
    size: varchar('size', { length: 50 }),
    color: varchar('color', { length: 50 }),
    costPrice: decimal('cost_price', { precision: 12, scale: 2 }),
    retailPrice: decimal('retail_price', { precision: 12, scale: 2 }),
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
    uniqueIndex('sku_idx').on(table.sku),
    uniqueIndex('barcode_idx').on(table.barcode),
    uniqueIndex('qrcode_idx').on(table.qrcode),
    index('product_variants_product_id_idx').on(table.productId),
    index('product_variants_name_idx').on(table.name),
    index('product_variants_slug_idx').on(table.slug),
    index('product_variants_size_idx').on(table.size),
    index('product_variants_color_idx').on(table.color),
    index('product_variants_cost_price_idx').on(table.costPrice),
    index('product_variants_retail_price_idx').on(table.retailPrice),
    index('product_variants_updated_at_idx').on(table.updatedAt),
    check(
      'product_variant_non_negative_prices',
      sql`
        ${table.costPrice} >= 0
        AND ${table.retailPrice} >= 0
      `
    ),
  ]
);

export const productVariantsRelations = relations(productVariants, ({ many }) => ({
  images: many(productImages),
}));
