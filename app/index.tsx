import React from 'react';
import { ScrollView } from 'react-native';
import ProductCard from '@/components/ProductCard';
import { useFetchProducts } from '@/hooks/useFetchProducts';
import { IProduct } from '@/types/products';
import ProductCardSkeleton from '@/components/ProductCardSkeleton';

export default function HomeScreen() {
  const { data, loading } = useFetchProducts(5, 'desc');

  return (
    <ScrollView>
      {loading ? (
        <>
          {[...Array(5)].map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </>
      ) : (
        data?.map((product: IProduct) => (
          <ProductCard key={product.id} product={product} />
        ))
      )}
    </ScrollView>
  );
}
