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
    borderColor: '#e5e7eb',
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    margin: 12,
  },
  imagePlaceholder: {
    width: 200,
    height: 200,
    backgroundColor: '#d1d5db',
    borderRadius: 8,
    marginBottom: 16,
  },
  titlePlaceholder: {
    width: '80%',
    height: 16,
    backgroundColor: '#d1d5db',
    borderRadius: 8,
    marginBottom: 8,
  },
  subtitlePlaceholder: {
    width: '20%',
    height: 16,
    backgroundColor: '#d1d5db',
    borderRadius: 8,
  },
});
