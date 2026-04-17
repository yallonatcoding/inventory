export const Actions = {
  CREATE: 'create',
  READ: 'read',
  UPDATE: 'update',
  DELETE: 'delete',
  DISABLE: 'disable',
  ENABLE: 'enable',
  MOVE: 'move',
  ADJUST: 'adjust',
  ASSIGN: 'assign',
} as const;

export type Action = typeof Actions[keyof typeof Actions];
