import {
  ProductRepositoryInterface,
  CreateProductDTO,
  Product,
  UpdateProductDTO,
  ProductErrorCode
} from '@repo/features/products';
import { isForeignKeyViolation, isUniqueViolation, products } from '@repo/database';
import { LoggerInterface, AppLogger } from '@repo/logger';
import { sanitizeString } from '@repo/helpers';
import { createError } from '@repo/errors';
import { db } from '@/shared/lib/db';

export class ProductRepository implements ProductRepositoryInterface {
  constructor(
    private readonly logger: LoggerInterface = AppLogger,
  ) { }

  async create(input: CreateProductDTO): Promise<Product> {
    try {
      const [created] = await db
        .insert(products)
        .values({
          name: input.name,
          slug: sanitizeString(input.name) as string,
          brand: input.brand as string,
          createdByUserId: input.createdByUserId,
          createdAt: new Date(),
        })
        .returning();

      return created as Product;
    } catch (error) {
      this.logger.error('Product repository create failed', {
        layer: 'repository',
        feature: 'products',
        method: 'create',
        message: error instanceof Error ? error.message : 'Unknown error',
        error,
      });

      if (isUniqueViolation(error)) {
        throw createError(ProductErrorCode.PRODUCT_ALREADY_EXISTS);
      }

      if (isForeignKeyViolation(error)) {
        throw createError(ProductErrorCode.PRODUCT_DATABASE_ERROR);
      }

      throw error;
    }
  }

  getAll(): Promise<Product[]> {
    throw new Error('Method not implemented.');
  }

  findById(id: string): Promise<Product | null> {
    throw new Error('Method not implemented.');
  }

  findBySlug(slug: string): Promise<Product | null> {
    throw new Error('Method not implemented.');
  }

  update(id: string, input: UpdateProductDTO): Promise<Product> {
    throw new Error('Method not implemented.');
  }

  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}