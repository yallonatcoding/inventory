import { ProductService } from '@repo/features/products';
import { ProductRepository } from '@/features/products/repository';

export async function POST(req: Request) {
  const body = await req.json();
  const repo = new ProductRepository();
  const service = new ProductService(repo);
  const result = await service.create(body);
  return Response.json(result);
}

export async function GET(req: Request) {
  const repo = new ProductRepository();
  const service = new ProductService(repo);
  const result = await service.getAll();
  return Response.json(result);
}

