import React, { useState, useEffect, useCallback, memo, useMemo } from 'react';
import { FlatList, ActivityIndicator, View, StyleSheet } from 'react-native';
import ProductCard from '@/components/ProductCard';
import ProductCardSkeleton from '@/components/ProductCardSkeleton';
import { useFetchProducts } from '@/hooks/useFetchProducts';
import { ESortOrder, IProduct } from '@/types/products';
import AscDescButton from '@/components/AscDescButton';
import DropdownSelect from 'react-native-input-select';
import { useFetchCategories } from '@/hooks/useFetchCategories';

const MemoizedProductCard = memo(ProductCard);

export default function HomeScreen() {
  const [limit, setLimit] = useState<number>(5);
  const [allProducts, setAllProducts] = useState<IProduct[]>([]);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [sortOrder, setSortOrder] = useState<ESortOrder>(ESortOrder.DESC);
  const [selectedCategoryOption, setSelectedCategoryOption] =
    useState<string>('');

  const { products, isProductsLoading } = useFetchProducts(
    limit,
    sortOrder,
    selectedCategoryOption
  );
  const { categories } = useFetchCategories();
  useEffect(() => {
    if (products && !isProductsLoading) {
      setAllProducts((prevProducts) => [
        ...prevProducts,
        ...products.slice(prevProducts.length),
      ]);
    }
  }, [products, isProductsLoading]);

  useEffect(() => {
    setLimit(5);
    setAllProducts([]);
  }, [sortOrder, selectedCategoryOption]);

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

  const categoryOptions = useMemo(() => {
    const allCategoriesOption = { name: 'All Categories', value: '' };
    const categoryList =
      categories?.map((category) => ({
        name: category,
        value: category,
      })) || [];

    return [allCategoriesOption, ...categoryList];
  }, [categories]);

  return (
    <>
      <View style={styles.header}>
        <AscDescButton sortOrder={sortOrder} setSortOrder={setSortOrder} />
        <View style={styles.select}>
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
                  backgroundColor: 'green',
                  borderRadius: 30,
                  borderColor: 'green',
                },

                checkboxUnselectedColor: 'gray',
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
      </View>

      <FlatList
        data={allProducts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        ListFooterComponent={renderFooter}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={renderEmptyComponent}
      />
    </>
  );
}

const styles = StyleSheet.create({
  skeletonContainer: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,

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
