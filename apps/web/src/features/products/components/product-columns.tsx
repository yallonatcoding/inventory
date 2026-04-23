import { ColumnDef } from '@tanstack/react-table';
import { Product } from '@repo/features/products';

export const productColumns: ColumnDef<Product>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'brand',
    header: 'Brand',
  },
  {
    accessorKey: 'sku',
    header: 'SKU',
  },
];