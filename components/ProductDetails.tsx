import { IProduct } from '@/types/products';
import { type FC } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface ProductDetailsProps {
  product: IProduct;
  onCategoryPress?: (category: string) => void;
}

const ProductDetails: FC<ProductDetailsProps> = ({
  product,
  onCategoryPress,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{product.title}</Text>
      <TouchableOpacity
        onPress={() => onCategoryPress?.(product.category)}
        style={styles.categoryContainer}
      >
        <Text style={styles.category}>{product.category.toUpperCase()}</Text>
      </TouchableOpacity>
      <Text style={styles.description}>{product.description}</Text>
      <View style={styles.priceRatingContainer}>
        <Text style={styles.price}>${product.price.toFixed(2)}</Text>
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingStar}>★</Text>
          <Text style={styles.ratingText}>
            {product.rating.rate} ({product.rating.count} reviews)
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: '#F9FAFB', // Tailwind's gray-50
    borderRadius: 8,
    borderColor: '#E5E7EB', // Tailwind's gray-200
    borderWidth: 1,
    marginTop: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937', // Tailwind's gray-800
    marginBottom: 8,
  },
  categoryContainer: {
    marginBottom: 8,
  },
  category: {
    fontSize: 14,
    color: '#2563EB', // Tailwind's blue-600
    fontWeight: '600',
  },
  description: {
    fontSize: 14,
    color: '#374151', // Tailwind's gray-700
    marginBottom: 12,
  },
  priceRatingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#10B981', // Tailwind's green-500
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingStar: {
    fontSize: 16,
    color: '#FBBF24', // Tailwind's yellow-400
    marginRight: 4,
  },
  ratingText: {
    fontSize: 14,
    color: '#4B5563', // Tailwind's gray-600
  },
});

export default ProductDetails;
