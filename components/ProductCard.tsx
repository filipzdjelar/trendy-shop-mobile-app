import { FC, useState } from 'react';
import { Text, Image, TouchableOpacity, StyleSheet, View } from 'react-native';

import { IProduct } from '@/types/products';
import ProductDetails from './ProductDetails';

interface IProps {
  product: IProduct;
}

const ProductCard: FC<IProps> = ({ product }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => setIsExpanded((prev) => !prev);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[styles.card]}
      onPress={toggleExpand}
    >
      <Image
        source={{ uri: product.image }}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.title}>{product.title}</Text>
      {isExpanded && (
        <View style={styles.details}>
          <ProductDetails product={product} />
        </View>
      )}
      <Text style={styles.toggle}>{isExpanded ? '-' : '+'}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#E5E7EB', // Tailwind's gray-200
    borderRadius: 8, // Tailwind's rounded-lg
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84, // Tailwind's shadow-md
    elevation: 5, // Required for shadow on Android
    margin: 12,
  },
  image: {
    width: 400,
    height: 400,
  },
  title: {
    color: '#991B1B', // Tailwind's red-800
    fontSize: 24, // Matches Tailwind's text-3xl
    lineHeight: 28, // Optional: for better spacing in line-clamp-2
    textAlign: 'center',
  },
  details: {
    marginTop: 12,
    paddingHorizontal: 16,
    textAlign: 'left',
  },
  toggle: {
    fontSize: 24,
    color: '#1F2937', // Tailwind's gray-800
    marginTop: 8,
  },
});

export default ProductCard;
