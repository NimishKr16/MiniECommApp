import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  Text,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import ProductCard from '../components/ProductCard';
import { useNavigation } from '@react-navigation/native';

type Product = {
  id: number;
  title: string;
  image: string;
  price: number;
  rating: { rate: number };
};
const ProductListScreen = () => {
    const navigation = useNavigation();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const res = await fetch('https://fakestoreapi.com/products');
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error('Failed to fetch products', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#4f46e5" />
        <Text style={styles.loaderText}>Loading products...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={products}
        renderItem={({ item }) => <ProductCard product={item} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flatListContent}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb', // light gray background
  },
  flatListContent: {
    padding: 8,
    paddingBottom: 80,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
});

export default ProductListScreen;