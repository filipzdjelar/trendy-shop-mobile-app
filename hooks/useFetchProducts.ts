import { fetchProductsApi } from '@/api/products';
import { IProduct } from '@/types/products';
import { useState, useEffect } from 'react';

export const useFetchProducts = (limit: number, sortOrder: 'asc') => {
  const [products, setProducts] = useState<IProduct[] | null>(null);
  const [isProductsLoading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const products = await fetchProductsApi(limit, sortOrder);
        setProducts(products);
      } catch (err) {
        setError('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [limit, sortOrder]);

  return { products, isProductsLoading, error };
};
