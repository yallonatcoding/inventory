import { ProductsTable } from '@/features/products/components/products-table';

export default function ProductsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Products</h1>
        <p className="text-sm text-muted-foreground"> Manage your catalog. </p>
      </div>
      <ProductsTable />
    </div>
  );
}