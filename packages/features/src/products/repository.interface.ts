import { Product } from "./entity";
import { CreateProductDTO, UpdateProductDTO } from "./dto";

export interface ProductRepositoryInterface {
  getAll(): Promise<Product[]>;
  findById(id: string): Promise<Product | null>;
  findBySlug(slug: string): Promise<Product | null>;
  create(input: CreateProductDTO): Promise<Product>;
  update(id: string, input: UpdateProductDTO): Promise<Product>;
  delete(id: string): Promise<void>;
}
