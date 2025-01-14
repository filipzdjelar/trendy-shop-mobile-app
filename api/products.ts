import { ESortOrder, IProduct } from '@/types/products';

export const fetchProductsApi = async (
  limit: number,
  sortOrder: ESortOrder,
  category?: string
): Promise<IProduct[]> => {
  const response = await fetch(
    `https://fakestoreapi.com/products${
      category ? `/category/${category}` : ''
    }?limit=${limit}&sort=${sortOrder}`
  );
  return response.json();
};

export const fetchCategoriesApi = async (): Promise<string[]> => {
  const response = await fetch(`https://fakestoreapi.com/products/categories`);

  return response.json();
};
