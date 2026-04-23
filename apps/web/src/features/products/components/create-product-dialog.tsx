'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ProductForm } from './product-form';

export function CreateProductDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>New Product</Button>
      </DialogTrigger>
      <DialogContent className="rounded-2xl">
        <DialogHeader>
          <DialogTitle>Create product</DialogTitle>
        </DialogHeader>
        <ProductForm />
      </DialogContent>
    </Dialog>
  );
}