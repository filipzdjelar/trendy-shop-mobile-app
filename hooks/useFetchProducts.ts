import { IProduct } from '@/types/products';
import { useState, useEffect } from 'react';

export const fetchProductsApi = async (
  limit: number,
  sortOrder: 'desc'
): Promise<IProduct[]> => {
  const response = await fetch(
    `https://fakestoreapi.com/products?limit=${limit}&sort=${sortOrder}`
  );
  return response.json();
};

export const useFetchProducts = (limit: number, sortOrder: 'desc') => {
  const [data, setData] = useState<IProduct[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const products = await fetchProductsApi(limit, sortOrder);
        setData(products);
      } catch (err) {
        setError('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [limit, sortOrder]);

  return { data, loading, error };
};
