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
      return await this.repo.create(input);
    } catch (error) {
      if (error instanceof AppError) throw error;

      this.logger.error((error as Error)?.message ?? 'Unknown error', {
        feature: 'Product',
        method: 'create',
        error,
      });

      throw createError(ProductErrorCode.PRODUCT_CREATE_ERROR);
    }
  }

  async getAll() {
    try {
      return await this.repo.getAll();
    } catch (error) {
      if (error instanceof AppError) throw error;

      this.logger.error((error as Error)?.message ?? 'Unknown error', {
        feature: 'Product',
        method: 'getAll',
        error,
      });

      throw createError(ProductErrorCode.PRODUCT_SERVICE_UNAVAILABLE);
    }
  }
}