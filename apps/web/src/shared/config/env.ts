import { validateNextEnv } from '@repo/config/env';

export const env = validateNextEnv(process.env);
