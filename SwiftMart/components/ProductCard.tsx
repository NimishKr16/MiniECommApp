import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const screenWidth = Dimensions.get('window').width;

type Product = {
  id: number;
  title: string;
  image: string;
  price: number;
  rating: { rate: number };
};

type Props = {
  product: Product;
};

const ProductCard =({ product, numColumns = 2 }: Props & { numColumns?: number }) => {
  const navigation = useNavigation<any>();
  const cardWidth = screenWidth / numColumns - 20;

  return (
    <TouchableOpacity
        style={[styles.card, { width: cardWidth }]}
      activeOpacity={0.85}
      onPress={() => navigation.navigate('ProductDetail', { product })}
    >
      <Image
        source={{ uri: product.image }}
        style={styles.image}
        resizeMode="contain"
      />
      <View style={styles.infoContainer}>
        <Text style={styles.title} numberOfLines={2}>
          {product.title}
        </Text>
        <Text style={styles.price}>₹{product.price.toFixed(2)}</Text>
        <Text style={styles.rating}>★ {product.rating.rate.toFixed(1)}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    margin: 8,
    padding: 12,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
    borderWidth: 1,
    borderColor: '#f1f5f9', // light border
  },
  image: {
    width: '100%',
    height: 120,
    marginBottom: 12,
    borderRadius: 12,
    backgroundColor: '#f9fafb',
  },
  infoContainer: {
    gap: 4,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b', // slate-800
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#10b981', // emerald-500
  },
  rating: {
    fontSize: 13,
    fontWeight: '500',
    color: '#f59e0b', // amber-500
  },
});

export default ProductCard;