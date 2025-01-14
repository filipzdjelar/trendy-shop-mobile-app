import { type FC } from 'react';
import { IProduct } from '@/types/products';
import { View, Text, StyleSheet } from 'react-native';

interface ProductDetailsProps {
  product: IProduct;
}

const ProductDetails: FC<ProductDetailsProps> = ({ product }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.category}>{product.category.toUpperCase()}</Text>

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

export default ProductDetails;

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    borderColor: '#E5E7EB',
    borderWidth: 1,
    marginTop: 12,
  },

  categoryContainer: {
    marginBottom: 8,
  },
  category: {
    fontSize: 14,
    color: '#2563EB',
    fontWeight: '600',
  },
  description: {
    fontSize: 14,
    color: '#374151',
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
    color: '#10B981',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingStar: {
    fontSize: 16,
    color: '#FBBF24',
    marginRight: 4,
  },
  ratingText: {
    fontSize: 14,
    color: '#4B5563',
  },
});
