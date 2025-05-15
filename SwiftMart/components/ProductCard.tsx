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
const cardWidth = screenWidth / 2 - 24;

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

const ProductCard = ({ product }: Props) => {
  const navigation = useNavigation<any>();

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.8}
      onPress={() => navigation.navigate('ProductDetail', { product })}
    >
      <Image
        source={{ uri: product.image }}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.title} numberOfLines={2}>
        {product.title}
      </Text>
      <Text style={styles.price}>${product.price.toFixed(2)}</Text>
      <Text style={styles.rating}>⭐ {product.rating.rate}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: cardWidth,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 12,
    margin: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  image: {
    width: '100%',
    height: 100,
    marginBottom: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#10b981', // emerald
    marginBottom: 4,
  },
  rating: {
    fontSize: 12,
    color: '#f59e0b', // amber
  },
});

export default ProductCard;