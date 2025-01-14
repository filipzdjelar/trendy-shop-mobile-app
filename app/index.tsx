import React, { useState, useEffect, useCallback, useMemo, FC } from 'react';
import {
  FlatList,
  ActivityIndicator,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import ProductCard from '@/components/ProductCard';
import AscDescButton from '@/components/AscDescButton';
import useFetchProducts from '@/hooks/useFetchProducts';
import { ESortOrder, IProduct } from '@/types/products';
import ProductCardSkeleton from '@/components/ProductCardSkeleton';
import DropdownSelect from 'react-native-input-select';
import useFetchCategories from '@/hooks/useFetchCategories';

const ProductsCategory: FC = () => {
  const [limit, setLimit] = useState(5);
  const [allProducts, setAllProducts] = useState<IProduct[]>([]);
  const [lastFetchedCount, setLastFetchedCount] = useState<number | null>(null);
  const [sortOrder, setSortOrder] = useState<ESortOrder>(ESortOrder.DESC);
  const [consecutiveIdenticalFetches, setConsecutiveIdenticalFetches] =
    useState(0);
  const [selectedCategoryOption, setSelectedCategoryOption] =
    useState<string>('');

  const { categories } = useFetchCategories();
  const { products, isProductsLoading } = useFetchProducts(
    limit,
    sortOrder,
    selectedCategoryOption
  );

  const memoizedProducts = useMemo(() => {
    return Array.from(
      new Map(allProducts.map((product) => [product.id, product])).values()
    );
  }, [allProducts]);

  const categoryOptions = useMemo(() => {
    const allCategoriesOption = { name: 'All Categories', value: '' };
    const categoryList =
      categories?.map((category) => ({
        name: category.charAt(0).toUpperCase() + category.slice(1),
        value: category,
      })) || [];

    return [allCategoriesOption, ...categoryList];
  }, [categories]);

  useEffect(() => {
    // Reset on category or sort order change
    setLimit(5);
    setAllProducts([]);
    setConsecutiveIdenticalFetches(0);
    setLastFetchedCount(null);
  }, [selectedCategoryOption, sortOrder]);

  useEffect(() => {
    if (products.length) {
      setAllProducts((prevProducts) => [...prevProducts, ...products]);

      if (lastFetchedCount !== null && lastFetchedCount === products.length) {
        setConsecutiveIdenticalFetches((prev) => prev + 1);
      } else {
        setConsecutiveIdenticalFetches(0);
      }

      setLastFetchedCount(products.length);
    }
  }, [products, lastFetchedCount]);

  const loadMore = useCallback(() => {
    if (consecutiveIdenticalFetches >= 2 || isProductsLoading) return;
    setLimit((prevLimit) => prevLimit + 5);
  }, [consecutiveIdenticalFetches, isProductsLoading]);

  const renderFooter = useCallback(() => {
    if (!isProductsLoading) return null;
    return <ActivityIndicator size="large" color="#0000ff" />;
  }, [isProductsLoading]);

  const renderItem = useCallback(
    ({ item }: { item: IProduct }) => <ProductCard product={item} />,
    []
  );

  const renderSkeletonLoader = useCallback(() => {
    return (
      <View style={styles.skeletonContainer}>
        {[...Array(5)].map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </View>
    );
  }, []);

  const renderEmptyComponent = useCallback(() => {
    if (isProductsLoading) {
      return renderSkeletonLoader();
    }
    return <Text>No available products for the selected category.</Text>;
  }, [isProductsLoading, renderSkeletonLoader]);

  return (
    <>
      <View style={styles.header}>
        <AscDescButton sortOrder={sortOrder} setSortOrder={setSortOrder} />
        {categories && (
          <DropdownSelect
            options={categoryOptions}
            optionLabel={'name'}
            optionValue={'value'}
            placeholder=""
            selectedValue={selectedCategoryOption}
            onValueChange={(itemValue: any) => {
              setSelectedCategoryOption(itemValue);
            }}
            checkboxControls={{
              checkboxStyle: {
                backgroundColor: '#85a49c',
                borderRadius: 30,
                borderColor: 'lightgray',
              },

              checkboxUnselectedColor: 'lightgray',
              checkboxComponent: <View style={styles.radioButton} />,
            }}
            dropdownStyle={{
              paddingVertical: 5,
              paddingHorizontal: 5,
              minHeight: 50,
              width: 250,
            }}
          />
        )}
      </View>

      <FlatList
        data={memoizedProducts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        ListFooterComponent={renderFooter}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={renderEmptyComponent}
      />
    </>
  );
};

export default ProductsCategory;

const styles = StyleSheet.create({
  skeletonContainer: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    gap: 16,
    margin: 16,
  },
  select: {
    width: 150,
    height: 50,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 20 / 2,
    borderWidth: 3,
    borderColor: 'white',
  },
});
