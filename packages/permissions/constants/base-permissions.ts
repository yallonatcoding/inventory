import { Resources } from "./resources";
import { Actions } from "./actions";

export const BasePermissions = [
  { resource: Resources.PRODUCT, action: Actions.CREATE, description: "Create product" },
  { resource: Resources.PRODUCT, action: Actions.READ, description: "Read product" },
  { resource: Resources.PRODUCT, action: Actions.UPDATE, description: "Update product" },
  { resource: Resources.PRODUCT, action: Actions.DELETE, description: "Delete product" },
  { resource: Resources.PRODUCT, action: Actions.DISABLE, description: "Disable product" },
  { resource: Resources.PRODUCT, action: Actions.ENABLE, description: "Enable product" },

  { resource: Resources.PRODUCT_VARIANT, action: Actions.CREATE, description: "Create product variant" },
  { resource: Resources.PRODUCT_VARIANT, action: Actions.READ, description: "Read product variant" },
  { resource: Resources.PRODUCT_VARIANT, action: Actions.UPDATE, description: "Update product variant" },
  { resource: Resources.PRODUCT_VARIANT, action: Actions.DELETE, description: "Delete product variant" },
  { resource: Resources.PRODUCT_VARIANT, action: Actions.DISABLE, description: "Disable product variant" },
  { resource: Resources.PRODUCT_VARIANT, action: Actions.ENABLE, description: "Enable product variant" },

  { resource: Resources.INVENTORY, action: Actions.READ, description: "Read inventory" },
  { resource: Resources.INVENTORY, action: Actions.ADJUST, description: "Adjust inventory" },

  { resource: Resources.INVENTORY_MOVEMENT, action: Actions.CREATE, description: "Create inventory movement" },
  { resource: Resources.INVENTORY_MOVEMENT, action: Actions.READ, description: "Read inventory movement" },
  { resource: Resources.INVENTORY_MOVEMENT, action: Actions.MOVE, description: "Move inventory" },

  { resource: Resources.LOCATION, action: Actions.CREATE, description: "Create location" },
  { resource: Resources.LOCATION, action: Actions.READ, description: "Read location" },
  { resource: Resources.LOCATION, action: Actions.UPDATE, description: "Update location" },
  { resource: Resources.LOCATION, action: Actions.DELETE, description: "Delete location" },
  { resource: Resources.LOCATION, action: Actions.DISABLE, description: "Disable location" },
  { resource: Resources.LOCATION, action: Actions.ENABLE, description: "Enable location" },

  { resource: Resources.USER, action: Actions.CREATE, description: "Create user" },
  { resource: Resources.USER, action: Actions.READ, description: "Read user" },
  { resource: Resources.USER, action: Actions.UPDATE, description: "Update user" },
  { resource: Resources.USER, action: Actions.DELETE, description: "Delete user" },
  { resource: Resources.USER, action: Actions.DISABLE, description: "Disable user" },
  { resource: Resources.USER, action: Actions.ENABLE, description: "Enable user" },

  { resource: Resources.ROLE, action: Actions.READ, description: "Read role" },
  { resource: Resources.ROLE, action: Actions.DISABLE, description: "Disable role" },
  { resource: Resources.ROLE, action: Actions.ENABLE, description: "Enable role" },
  { resource: Resources.ROLE, action: Actions.ASSIGN, description: "Assign role" },

  { resource: Resources.PERMISSION, action: Actions.READ, description: "Read permission" },
  { resource: Resources.PERMISSION, action: Actions.DISABLE, description: "Disable permission" },
  { resource: Resources.PERMISSION, action: Actions.ENABLE, description: "Enable permission" },
  { resource: Resources.PERMISSION, action: Actions.ASSIGN, description: "Assign permission" },

  { resource: Resources.TAG, action: Actions.CREATE, description: "Create tag" },
  { resource: Resources.TAG, action: Actions.READ, description: "Read tag" },
  { resource: Resources.TAG, action: Actions.UPDATE, description: "Update tag" },
  { resource: Resources.TAG, action: Actions.DELETE, description: "Delete tag" },
  { resource: Resources.TAG, action: Actions.DISABLE, description: "Disable tag" },
  { resource: Resources.TAG, action: Actions.ENABLE, description: "Enable tag" },
] as const;
