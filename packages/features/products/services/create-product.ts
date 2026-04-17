import { db } from '@repo/database';
import { products } from '@repo/database/schema';
import { CreateProductDTO } from '../product.dto';
import { sanitizeName } from '../../shared/helpers/sanitize-name';

export async function createProduct(dto: CreateProductDTO) {
  const product = {
    ...dto,
    slug: sanitizeName(dto.name) as string,
  }

  const [createdProduct] = await db.insert(products).values(product).returning();

  return createdProduct;
}