import pino from 'pino';
import { LoggerInterface } from '../interfaces/logger.interface';
import { validateCoreEnv } from '@repo/config';

const env = validateCoreEnv(process.env);

export class PinoLogger implements LoggerInterface {
  private logger: pino.Logger;

  constructor() {
    this.logger = pino({
      level: env.NODE_ENV === 'production' ? 'info' : 'debug',
    });
  }

  info(message: string, meta?: Record<string, unknown>): void {
    this.logger.info(meta, message);
  }

  warn(message: string, meta?: Record<string, unknown>): void {
    this.logger.warn(meta, message);
  }

  error(message: string, meta?: Record<string, unknown>): void {
    this.logger.error(meta, message);
  }

  debug(message: string, meta?: Record<string, unknown>): void {
    this.logger.debug(meta, message);
  }

  fatal(message: string, meta?: Record<string, unknown>): void {
    this.logger.fatal(meta, message);
  }
}