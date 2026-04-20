import {
  pgTable,
  uuid,
  integer,
  timestamp,
  uniqueIndex,
  index,
  check
} from 'drizzle-orm/pg-core';
import { sql, relations } from 'drizzle-orm';
import { locations } from '../locations/locations.schema';
import { users } from '../users/users.schema';
import { productVariants } from '../products/product_variants.schema';

export const inventory = pgTable(
  'inventory',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    variantId: uuid('variant_id').references(() => productVariants.id).notNull(),
    locationId: uuid('location_id').references(() => locations.id).notNull(),
    quantity: integer('quantity').notNull(),
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
    check(
      'inventory_non_negative_quantity',
      sql`
        ${table.quantity} >= 0
      `
    ),
    uniqueIndex('inventory_variant_id_location_id_idx_uq').on(
      table.variantId,
      table.locationId,
    ),
    index('inventory_variant_id_idx').on(table.variantId),
    index('inventory_location_id_idx').on(table.locationId),
    index('inventory_updated_at_idx').on(table.updatedAt),
  ],
);

export const inventoryRelations = relations(inventory, ({ one }) => ({
  variant: one(productVariants, {
    fields: [inventory.variantId],
    references: [productVariants.id],
  }),
  location: one(locations, {
    fields: [inventory.locationId],
    references: [locations.id],
  }),
}));
