export const Resources = {
  PRODUCT: 'product',
  PRODUCT_VARIANT: 'product_variant',
  PRODUCT_IMAGE: 'product_image',
  INVENTORY: 'inventory',
  INVENTORY_MOVEMENT: 'inventory_movement',
  LOCATION: 'location',
  USER: 'user',
  ROLE: 'role',
  PERMISSION: 'permission',
  TAG: 'tag',
} as const;

export type Resource = typeof Resources[keyof typeof Resources];
