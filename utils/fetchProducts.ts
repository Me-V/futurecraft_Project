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

// utils/fetchProducts.ts
export async function fetchCategories(): Promise<string[]> {
  const res = await fetch('https://fakestoreapi.com/products/categories');
  if (!res.ok) {
    throw new Error('Failed to fetch categories');
  }
  return res.json();
}