import { Actions } from './actions';
import { Resources } from './resources';

export const RolePermissionMatrix = {
  super_admin: 'ALL',

  admin: [
    { resource: Resources.USER, action: Actions.CREATE },
    { resource: Resources.USER, action: Actions.READ },
    { resource: Resources.USER, action: Actions.UPDATE },
    { resource: Resources.USER, action: Actions.DISABLE },
    { resource: Resources.USER, action: Actions.ENABLE },

    { resource: Resources.ROLE, action: Actions.READ },
    { resource: Resources.PERMISSION, action: Actions.READ },
    { resource: Resources.PRODUCT, action: Actions.READ },
    { resource: Resources.PRODUCT_VARIANT, action: Actions.READ },
    { resource: Resources.INVENTORY, action: Actions.READ },
    { resource: Resources.LOCATION, action: Actions.READ },
    { resource: Resources.TAG, action: Actions.READ },
  ],

  manager: [
    { resource: Resources.USER, action: Actions.READ },
    { resource: Resources.ROLE, action: Actions.READ },
    { resource: Resources.PERMISSION, action: Actions.READ },

    { resource: Resources.PRODUCT, action: Actions.CREATE },
    { resource: Resources.PRODUCT, action: Actions.READ },
    { resource: Resources.PRODUCT, action: Actions.UPDATE },
    { resource: Resources.PRODUCT, action: Actions.DISABLE },
    { resource: Resources.PRODUCT, action: Actions.ENABLE },

    { resource: Resources.PRODUCT_VARIANT, action: Actions.CREATE },
    { resource: Resources.PRODUCT_VARIANT, action: Actions.READ },
    { resource: Resources.PRODUCT_VARIANT, action: Actions.UPDATE },
    { resource: Resources.PRODUCT_VARIANT, action: Actions.DISABLE },
    { resource: Resources.PRODUCT_VARIANT, action: Actions.ENABLE },

    { resource: Resources.INVENTORY, action: Actions.READ },
    { resource: Resources.INVENTORY, action: Actions.ADJUST },

    { resource: Resources.INVENTORY_MOVEMENT, action: Actions.CREATE },
    { resource: Resources.INVENTORY_MOVEMENT, action: Actions.READ },
    { resource: Resources.INVENTORY_MOVEMENT, action: Actions.MOVE },

    { resource: Resources.LOCATION, action: Actions.CREATE },
    { resource: Resources.LOCATION, action: Actions.READ },
    { resource: Resources.LOCATION, action: Actions.UPDATE },
    { resource: Resources.LOCATION, action: Actions.DISABLE },
    { resource: Resources.LOCATION, action: Actions.ENABLE },

    { resource: Resources.TAG, action: Actions.CREATE },
    { resource: Resources.TAG, action: Actions.READ },
    { resource: Resources.TAG, action: Actions.UPDATE },
    { resource: Resources.TAG, action: Actions.DISABLE },
    { resource: Resources.TAG, action: Actions.ENABLE },
  ],

  staff: [
    { resource: Resources.PRODUCT, action: Actions.READ },
    { resource: Resources.PRODUCT_VARIANT, action: Actions.READ },

    { resource: Resources.INVENTORY, action: Actions.READ },

    { resource: Resources.INVENTORY_MOVEMENT, action: Actions.CREATE },
    { resource: Resources.INVENTORY_MOVEMENT, action: Actions.READ },

    { resource: Resources.LOCATION, action: Actions.READ },
    { resource: Resources.TAG, action: Actions.READ },
  ],
} as const;
