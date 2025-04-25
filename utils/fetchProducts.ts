// app/utils/fetchProducts.ts
import { Product } from '../types';

export async function fetchProducts(page: number = 1): Promise<Product[]> {
  const limit = 10;
  const response = await fetch(
    `https://fakestoreapi.com/products?limit=${limit}&page=${page}`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  return response.json();
}