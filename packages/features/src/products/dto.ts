export interface CreateProductDTO {
  name: string;
  brand: string;
  description: string;
  createdByUserId: string;
}

export interface CreateProductVariantDTO {
  name: string;
  sku: string;
  price: number;
  stock: number;
  createdByUserId: string;
}

export interface UpdateProductDTO {
  name?: string;
  brand?: string;
  description?: string;
  updatedByUserId: string;
}

export interface UpdateProductVariantDTO {
  name?: string;
  sku?: string;
  price?: number;
  stock?: number;
  updatedByUserId: string;
}
