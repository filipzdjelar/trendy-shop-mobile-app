import { useState, useEffect, useCallback, memo } from 'react';
import { FlatList, ActivityIndicator, View, StyleSheet } from 'react-native';
import ProductCard from '@/components/ProductCard';
import ProductCardSkeleton from '@/components/ProductCardSkeleton';
import { useFetchProducts } from '@/hooks/useFetchProducts';
import { IProduct } from '@/types/products';

const MemoizedProductCard = memo(ProductCard);

export default function HomeScreen() {
  const [limit, setLimit] = useState<number>(5);
  const [allProducts, setAllProducts] = useState<IProduct[]>([]);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);

  const { products, isProductsLoading } = useFetchProducts(limit, 'asc');

  useEffect(() => {
    if (products && !isProductsLoading) {
      setAllProducts((prevProducts) => [
        ...prevProducts,
        ...products.slice(prevProducts.length),
      ]);
    }
  }, [products, isProductsLoading]);

  const loadMore = useCallback(() => {
    if (!isLoadingMore && !isProductsLoading) {
      setIsLoadingMore(true);
      setLimit((prevLimit) => prevLimit + 5);
      setIsLoadingMore(false);
    }
  }, [isLoadingMore, isProductsLoading]);

  const renderFooter = useCallback(() => {
    if (!isLoadingMore) return null;
    return <ActivityIndicator size="large" color="#0000ff" />;
  }, [isLoadingMore]);

  const renderItem = useCallback(
    ({ item }: { item: IProduct }) => <MemoizedProductCard product={item} />,
    []
  );

  const renderEmptyComponent = useCallback(
    () =>
      isProductsLoading ? (
        <View style={styles.skeletonContainer}>
          {[...Array(5)].map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </View>
      ) : null,
    [isProductsLoading]
  );

  return (
    <FlatList
      data={allProducts}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      ListFooterComponent={renderFooter}
      onEndReached={loadMore}
      onEndReachedThreshold={0.5}
      ListEmptyComponent={renderEmptyComponent}
    />
  );
}

const styles = StyleSheet.create({
  skeletonContainer: {
    padding: 16,
  },
});
