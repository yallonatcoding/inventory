import { buildPermission } from './permission-builder';
import { Resource, Action, Resources, Actions } from '../constants';

type RawPermission = {
  resource: string;
  action: string;
};

export const toPermissionKey = (p: RawPermission) => {
  return buildPermission(p.resource as Resource, p.action as Action);
};

const resourceValues = Object.values(Resources);
const actionValues = Object.values(Actions);

export function toPermissionKeyStrict(p: RawPermission) {
  if (!resourceValues.includes(p.resource as Resource)) {
    throw new Error(`Invalid resource: ${p.resource}`);
  }

  if (!actionValues.includes(p.action as Action)) {
    throw new Error(`Invalid action: ${p.action}`);
  }

  return buildPermission(p.resource as Resource, p.action as Action);
}