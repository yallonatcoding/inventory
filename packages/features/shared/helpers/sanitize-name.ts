export function sanitizeName(input?: string): string | undefined {
  if (!input || typeof input !== 'string') return undefined;

  let sanitized = input.trim().toLowerCase();
  sanitized = sanitized.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  sanitized = sanitized.replace(/\s+/g, ' ');
  sanitized = sanitized.replace(/ /g, '-');
  sanitized = sanitized.replace(/[^a-z0-9-_]/g, '');
  sanitized = sanitized.replace(/-+/g, '-');
  sanitized = sanitized.replace(/^-+/, '').replace(/-+$/, '');
  return sanitized;
}