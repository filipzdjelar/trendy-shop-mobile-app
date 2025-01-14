import { ESortOrder, IProduct } from '@/types/products';

export const FETCH_PRODUCTS_KEY = 'fetchProducts';
export const fetchProductsApi = async (
  limit: number,
  sortOrder: ESortOrder,
  category?: string
): Promise<IProduct[]> => {
  const response = await fetch(
    `${process.env.EXPO_PUBLIC_API_URL}/products${
      category ? `/category/${category}` : ''
    }?limit=${limit}&sort=${sortOrder}`
  );
  return response.json();
};

export const FETCH_CATEGORIES_KEY = 'fetchCategories';
export const fetchCategoriesApi = async (): Promise<string[]> => {
  const response = await fetch(
    `${process.env.EXPO_PUBLIC_API_URL}/products/categories`
  );

  return response.json();
};
