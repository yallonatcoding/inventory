import { relations } from 'drizzle-orm';
import { index, pgTable, uniqueIndex, uuid } from 'drizzle-orm/pg-core';
import { products } from './products.schema';
import { tags } from './tags/tags.schema';

export const productTags = pgTable(
  'product_tags',
  {
    productId: uuid('product_id')
      .references(() => products.id)
      .notNull(),
    tagId: uuid('tag_id')
      .references(() => tags.id)
      .notNull(),
  },
  (table) => [
    uniqueIndex('product_tag_uq').on(table.productId, table.tagId),
    index('product_tags_product_id_idx').on(table.productId),
    index('product_tags_tag_id_idx').on(table.tagId),
  ],
);

export const productTagsRelations = relations(productTags, ({ one }) => ({
  product: one(products, {
    fields: [productTags.productId],
    references: [products.id],
  }),
  tag: one(tags, {
    fields: [productTags.tagId],
    references: [tags.id],
  }),
}));
