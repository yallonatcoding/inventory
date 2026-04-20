import { AuditEntity } from "../shared";

export interface Product extends AuditEntity {
  id: string;
  name: string;
  slug: string;
  brand: string;
  description: string;
}

export interface ProductVariant extends AuditEntity {
  id: string;
  name: string;
  sku: string;
  price: number;
  stock: number;
  productId: string;
}

export interface ProductImage extends AuditEntity {
  id: string;
  url: string;
  productVariantId: string;
}

export interface ProductTag extends AuditEntity {
  id: string;
  name: string;
  slug: string;
  description: string;
}