export type ErrorDefinition = {
  code: string;
  feature: string;
  message: string;
  statusCode: number;
};

const errorRegistry = new Map<string, ErrorDefinition>();

export function registerError(code: string, definition: ErrorDefinition): void {
  errorRegistry.set(code, definition);
}

export function getErrorDefinition(code: string): ErrorDefinition | undefined {
  return errorRegistry.get(code);
}
