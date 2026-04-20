import { registerError } from "@repo/errors";
import {
  ProductErrorCode,
  ProductImageErrorCode,
  ProductTagErrorCode,
  ProductVariantErrorCode
} from "./enum";

export function registerProductErrors() {
  registerError(ProductErrorCode.PRODUCT_SERVICE_UNAVAILABLE, {
    code: ProductErrorCode.PRODUCT_SERVICE_UNAVAILABLE,
    feature: 'product',
    message: 'Product service unavailable',
    statusCode: 503,
  });

  registerError(ProductErrorCode.PRODUCT_DATABASE_ERROR, {
    code: ProductErrorCode.PRODUCT_DATABASE_ERROR,
    feature: 'product',
    message: 'Product database error',
    statusCode: 500,
  });

  registerError(ProductErrorCode.PRODUCT_ALREADY_EXISTS, {
    code: ProductErrorCode.PRODUCT_ALREADY_EXISTS,
    feature: 'product',
    message: 'Product already exists',
    statusCode: 409,
  });

  registerError(ProductErrorCode.PRODUCT_NOT_FOUND, {
    code: ProductErrorCode.PRODUCT_NOT_FOUND,
    feature: 'product',
    message: 'Product not found',
    statusCode: 404,
  });
}
