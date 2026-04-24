import { ProductService } from '@repo/features/products';
import { ProductRepository } from '@/features/products/repository';

export async function POST(req: Request) {
  const body = await req.json();
  const result = await new ProductService(new ProductRepository()).create(body);
  return Response.json(result);
}

export async function GET(req: Request) {
  const result = await new ProductService(new ProductRepository()).getAll();
  return Response.json(result);
}

