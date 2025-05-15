import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Platform,
} from 'react-native';
import ProductCard from '../components/ProductCard';
import { useNavigation } from '@react-navigation/native';
import SearchBar from '../components/SearchBar';
import FloatingCartButton from '../components/FloatingCartButton';
type Product = {
  id: number;
  title: string;
  image: string;
  price: number;
  rating: { rate: number };
};

const screenWidth = Dimensions.get('window').width;

const getNumColumns = () => {
  if (Platform.OS === 'web') {
    console.log(screenWidth);
    
    if (screenWidth > 1400) return 5;
    if (screenWidth > 1100) return 4;
    if (screenWidth > 800) return 3;
  }
  return 2; // default for mobile
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
      <SearchBar />
      <FlatList
        data={products}
        renderItem={({ item }) => <ProductCard product={item} numColumns={getNumColumns()} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={getNumColumns()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flatListContent}
      />
      <FloatingCartButton />
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