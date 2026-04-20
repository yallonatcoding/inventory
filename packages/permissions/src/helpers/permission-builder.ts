import { Actions, Resources } from "../constants";

type Resource = (typeof Resources)[keyof typeof Resources];
type Action = (typeof Actions)[keyof typeof Actions];

export const buildPermission = (resource: Resource, action: Action) => {
  return `${resource}:${action}` as const;
};