export interface PostgresErrorLike {
  code?: string;
  constraint?: string;
  detail?: string;
  message?: string;
}

export function isPostgresError(error: unknown): error is PostgresErrorLike {
  return typeof error === 'object' && error !== null && 'code' in error;
}

export function isUniqueViolation(error: unknown): boolean {
  return isPostgresError(error) && error.code === '23505';
}

export function isForeignKeyViolation(error: unknown): boolean {
  return isPostgresError(error) && error.code === '23503';
}

export function isCheckViolation(error: unknown): boolean {
  return isPostgresError(error) && error.code === '23514';
}

export function isDeadlock(error: unknown): boolean {
  return isPostgresError(error) && error.code === '40P01';
}

export function isSerializationFailure(error: unknown): boolean {
  return isPostgresError(error) && error.code === '40001';
}

export function getConstraint(error: unknown): string | undefined {
  return isPostgresError(error) ? error.constraint : undefined;
}