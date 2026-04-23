'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function ProductForm() {
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setLoading(false);
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <Input placeholder="Name" />
      <Input placeholder="Brand" />
      <Input placeholder="SKU" />
      <Input placeholder="Price" />
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? 'Saving...' : 'Save'}
      </Button>
    </form>
  );
}