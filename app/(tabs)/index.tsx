import ProductCard from '@/components/ProductCard';
import { useFetchProducts } from '@/hooks/useFetchProducts';
import { IProduct } from '@/types/products';
import React from 'react';
import { SafeAreaView, ScrollView, Text } from 'react-native';

export default function HomeScreen() {
  const { data, loading } = useFetchProducts(5, 'desc');

  return (
    <SafeAreaView>
      <ScrollView>
        {!loading ? (
          <>
            {data?.map((product: IProduct) => {
              return <ProductCard key={product.id} product={product} />;
            })}
          </>
        ) : (
          <Text> loading</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
