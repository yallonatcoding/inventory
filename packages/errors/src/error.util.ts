import { AppError } from './app-error';
import { getErrorDefinition } from './error.registry';

export function createError(
  code: string,
  details?: Record<string, unknown>,
): AppError {
  const def = getErrorDefinition(code);
  return new AppError(
    code,
    def?.message ?? 'Unknown error',
    def?.statusCode ?? Number(500),
    def?.feature ?? 'unknown',
    details,
  );
}