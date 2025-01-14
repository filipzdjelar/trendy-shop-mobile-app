import { IProduct } from '@/types/products';

export const fetchProductsApi = async (
  limit: number,
  sortOrder: 'asc'
): Promise<IProduct[]> => {
  const response = await fetch(
    `https://fakestoreapi.com/products?limit=${limit}&sort=${sortOrder}`
  );
  return response.json();
};
