import {
  pgTable,
  uuid,
  integer,
  text,
  timestamp,
  index,
  varchar,
  pgEnum,
  check
} from 'drizzle-orm/pg-core';
import { sql, relations } from 'drizzle-orm';
import { locations } from '../locations/locations.schema';
import { users } from '../users/users.schema';
import { productVariants } from '../products/product_variants.schema';

export const movementTypeEnum = pgEnum('movement_type', [
  'IN',
  'OUT',
  'TRANSFER',
  'ADJUST',
]);

export const inventoryMovements = pgTable(
  'inventory_movements',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    variantId: uuid('variant_id').references(() => productVariants.id).notNull(),
    fromLocationId: uuid('from_location_id').references(() => locations.id),
    toLocationId: uuid('to_location_id').references(() => locations.id),
    type: movementTypeEnum('type').notNull(),
    quantity: integer('quantity').default(0).$type<number>().notNull(),
    reason: text('reason'),
    referenceId: varchar('reference_id', { length: 100 }),
    createdByUserId: uuid('created_by_user_id')
      .references(() => users.id)
      .notNull(),
    createdAt: timestamp('created_at', { withTimezone: true })
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => [
    index('inventory_movements_variant_created_idx').on(table.variantId, table.createdAt),
    index('inventory_movements_from_location_id_idx').on(table.fromLocationId),
    index('inventory_movements_to_location_id_idx').on(table.toLocationId),
    index('inventory_movements_reference_id_idx').on(table.referenceId),
    index('inventory_movements_type_idx').on(table.type),
    check(
      'inventory_movement_type_validity',
      sql`
        (
          ${table.type} = 'IN'
          AND ${table.toLocationId} IS NOT NULL
          AND ${table.fromLocationId} IS NULL
        )
        OR
        (
          ${table.type} = 'OUT'
          AND ${table.fromLocationId} IS NOT NULL
          AND ${table.toLocationId} IS NULL
        )
        OR
        (
          ${table.type} = 'TRANSFER'
          AND ${table.fromLocationId} IS NOT NULL
          AND ${table.toLocationId} IS NOT NULL
        )
        OR
        (
          ${table.type} = 'ADJUST'
          AND (
            ${table.fromLocationId} IS NOT NULL
            OR ${table.toLocationId} IS NOT NULL
          )
        )
      `
    ),
    check(
      'inventory_movement_positive_quantity',
      sql`
        ${table.quantity} > 0
      `
    ),
  ],
);

export const inventoryMovementsRelations = relations(inventoryMovements, ({ one }) => ({
  variant: one(productVariants, {
    fields: [inventoryMovements.variantId],
    references: [productVariants.id],
  }),
}));
