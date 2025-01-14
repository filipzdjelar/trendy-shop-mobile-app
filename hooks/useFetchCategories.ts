import { fetchCategoriesApi } from '@/api/products';
import { useState, useEffect } from 'react';

export const useFetchCategories = () => {
  const [categories, setCategories] = useState<string[] | null>(null);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const categories = await fetchCategoriesApi();
        setCategories(categories);
      } catch (err) {
        setError('Failed to fetch categories');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { categories, isLoading, error };
};
