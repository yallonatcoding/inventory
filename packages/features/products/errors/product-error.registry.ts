import { ProductErrorCode } from './product-error.enum';

export const PRODUCT_ERROR_REGISTRY = {
  [ProductErrorCode.PRODUCT_ALREADY_EXISTS]: {
    code: ProductErrorCode.PRODUCT_ALREADY_EXISTS,
    message: 'Product already exists',
    statusCode: 409,
  },
  [ProductErrorCode.PRODUCT_NOT_FOUND]: {
    code: ProductErrorCode.PRODUCT_NOT_FOUND,
    message: 'Product not found',
    statusCode: 404,
  },
  [ProductErrorCode.PRODUCT_VARIANT_ALREADY_EXISTS]: {
    code: ProductErrorCode.PRODUCT_VARIANT_ALREADY_EXISTS,
    message: 'Product variant already exists',
    statusCode: 409,
  },
  [ProductErrorCode.PRODUCT_VARIANT_NOT_FOUND]: {
    code: ProductErrorCode.PRODUCT_VARIANT_NOT_FOUND,
    message: 'Product variant not found',
    statusCode: 404,
  },
  [ProductErrorCode.PRODUCT_IMAGE_ALREADY_EXISTS]: {
    code: ProductErrorCode.PRODUCT_IMAGE_ALREADY_EXISTS,
    message: 'Product image already exists',
    statusCode: 409,
  },
  [ProductErrorCode.PRODUCT_IMAGE_NOT_FOUND]: {
    code: ProductErrorCode.PRODUCT_IMAGE_NOT_FOUND,
    message: 'Product image not found',
    statusCode: 404,
  },
  [ProductErrorCode.PRODUCT_TAG_ALREADY_EXISTS]: {
    code: ProductErrorCode.PRODUCT_TAG_ALREADY_EXISTS,
    message: 'Product tag already exists',
    statusCode: 409,
  },
  [ProductErrorCode.PRODUCT_TAG_NOT_FOUND]: {
    code: ProductErrorCode.PRODUCT_TAG_NOT_FOUND,
    message: 'Product tag not found',
    statusCode: 404,
  },
} as const;
