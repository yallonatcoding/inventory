import { ProductService } from '@repo/features/products';
import { ProductRepository } from './repository';

export function createProductService() {
  return new ProductService(new ProductRepository());
}
