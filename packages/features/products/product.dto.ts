import {
  Product,
  ProductVariant,
  ProductImage,
  ProductTag,
} from "./product.entity";

export interface ProductWithVariantsDTO {
  product: Product;
  variants: ProductVariant[];
}

export interface ProductFullDTO {
  product: Product;
  variants: (ProductVariant & {
    images: ProductImage[];
  })[];
  tags: ProductTag[];
}

export interface CreateProductDTO {
  name: string;
  brand: string;
  description: string;
  createdByUserId: string;
}

export interface UpdateProductDTO {
  name?: string;
  brand?: string;
  description?: string;
  updatedByUserId: string;
}

export interface CreateProductVariantDTO {
  name: string;
  sku: string;
  price: number;
  stock: number;
  createdByUserId: string;
}

export interface UpdateProductVariantDTO {
  name?: string;
  sku?: string;
  price?: number;
  stock?: number;
  updatedByUserId: string;
}

export interface CreateProductImageDTO {
  url: string;
  createdByUserId: string;
}

export interface UpdateProductImageDTO {
  url?: string;
  updatedByUserId: string;
}

export interface CreateProductTagDTO {
  name: string;
  slug: string;
  description: string;
  createdByUserId: string;
}

export interface UpdateProductTagDTO {
  name?: string;
  slug?: string;
  description?: string;
  updatedByUserId: string;
}
