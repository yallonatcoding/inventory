import { validateNextEnv } from '@repo/config';

export const env = validateNextEnv(process.env);
