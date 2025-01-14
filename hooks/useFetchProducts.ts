import { fetchProductsApi } from '@/api/products';
import { ESortOrder, IProduct } from '@/types/products';
import { useState, useEffect } from 'react';

export const useFetchProducts = (
  limit: number,
  sortOrder: ESortOrder,
  category?: string
) => {
  const [products, setProducts] = useState<IProduct[] | null>(null);
  const [isProductsLoading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const products = await fetchProductsApi(limit, sortOrder, category);
        setProducts(products);
      } catch (err) {
        setError('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [limit, sortOrder, category]);

  return { products, isProductsLoading, error };
};
