import { FC, useState, Suspense } from 'react';
import {
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  View,
  ActivityIndicator,
} from 'react-native';

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
      style={styles.card}
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
          <Suspense
            fallback={<ActivityIndicator size="small" color="#991B1B" />}
          >
            <ProductDetails product={product} />
          </Suspense>
        </View>
      )}
      <TouchableOpacity onPress={toggleExpand}>
        <Text style={styles.toggle}>{isExpanded ? 'Hide -' : 'Details +'}</Text>
      </TouchableOpacity>
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
    borderColor: '#E5E7EB',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    margin: 12,
  },
  image: {
    width: 200,
    height: 200,
  },
  title: {
    color: '#991B1B',
    fontSize: 20,
    lineHeight: 28,
    textAlign: 'center',
    padding: 4,
  },
  details: {
    marginTop: 12,
    paddingHorizontal: 16,
    textAlign: 'left',
  },
  toggle: {
    fontSize: 16,
    color: '#1F2937',
    marginVertical: 8,
  },
});

export default ProductCard;
