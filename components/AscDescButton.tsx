import React, { FC } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { ESortOrder } from '@/types/products';

interface AscDescButtonProps {
  sortOrder: ESortOrder;
  setSortOrder: React.Dispatch<React.SetStateAction<ESortOrder>>;
}

const AscDescButton: FC<AscDescButtonProps> = ({ sortOrder, setSortOrder }) => {
  const toggleSortOrder = () => {
    setSortOrder((prev) =>
      prev === ESortOrder.ASC ? ESortOrder.DESC : ESortOrder.ASC
    );
  };

  return (
    <TouchableOpacity
      onPress={toggleSortOrder}
      style={[
        styles.button,
        sortOrder === ESortOrder.ASC ? styles.asc : styles.desc,
      ]}
    >
      <Text style={styles.icon}>
        {sortOrder === ESortOrder.ASC ? '↑' : '↓'}
      </Text>
      <Text style={styles.text}>
        {sortOrder === ESortOrder.ASC ? 'Asc' : 'Desc'}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#0f766e',
    // marginVertical: 8,
    width: 80,
    height: 50,
  },
  asc: {
    backgroundColor: '#0f766e',
  },
  desc: {
    backgroundColor: '#134e4a',
  },
  text: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 16,
  },
  icon: {
    marginRight: 8,
    fontSize: 18,
    color: '#ffffff',
  },
});

export default AscDescButton;
