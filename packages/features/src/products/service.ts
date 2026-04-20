import { AppError, createError } from "@repo/errors";
import { AppLogger, LoggerInterface } from "@repo/logger";
import { ProductRepositoryInterface } from "./repository.interface";
import { CreateProductDTO } from "./dto";
import { ProductErrorCode } from "./errors/enum";

export class ProductService {
  constructor(
    private readonly repo: ProductRepositoryInterface,
    private readonly logger: LoggerInterface = AppLogger,
  ) { }

  async create(input: CreateProductDTO) {
    try {
      const product = await this.repo.create(input);
      return product;
    } catch (error) {
      if (error instanceof AppError) throw error;
      this.logger.error(`Error: ${(error as Error).message ?? 'Unknown error'}`, {
        feature: 'Product',
        method: 'create',
        error: error,
      });
      throw createError(ProductErrorCode.PRODUCT_ALREADY_EXISTS);
    }
  }
}