import { StyleSheet, View } from 'react-native';

const ProductCardSkeleton: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.imagePlaceholder} />
      <View style={styles.titlePlaceholder} />
      <View style={styles.subtitlePlaceholder} />
    </View>
  );
};

export default ProductCardSkeleton;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderColor: '#e5e7eb', // Equivalent to gray-200
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000', // Equivalent to shadow-md
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    margin: 12,
  },
  imagePlaceholder: {
    width: 200, // Width for w-24
    height: 200, // Height for h-32
    backgroundColor: '#d1d5db', // Equivalent to gray-300
    borderRadius: 8,
    marginBottom: 16,
  },
  titlePlaceholder: {
    width: '80%', // Equivalent to w-4/5
    height: 16, // Equivalent to h-4
    backgroundColor: '#d1d5db', // Equivalent to gray-300
    borderRadius: 8,
    marginBottom: 8,
  },
  subtitlePlaceholder: {
    width: '20%', // Equivalent to w-1/5
    height: 16, // Equivalent to h-4
    backgroundColor: '#d1d5db', // Equivalent to gray-300
    borderRadius: 8,
  },
});
