import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import ProductListScreen from '../screens/ProductListScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import CartScreen from '../screens/CartScreen';
import { TouchableOpacity , View, Text, StyleSheet, Image } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import { useCart } from '../context/CartContext';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
    const { cart } = useCart();                // ← pull cart state
    const itemCount = cart.items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen
  name="Products"
  component={ProductListScreen}
  options={({ navigation }) => ({
    headerTitle: () => (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image
          source={require('../assets/image.png')}
          style={{ width: 36, height: 36, marginRight: 8 }}
          resizeMode="contain"
        />
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#333' }}>
          SwiftMart
        </Text>
      </View>
    ),
    
    headerTitleAlign: 'left', // makes sure title aligns left nicely
  })}
/>
        <Stack.Screen
          name="ProductDetail"
          component={ProductDetailScreen}
          options={{ title: 'Product Details' }}
        />
        <Stack.Screen
          name="Cart"
          component={CartScreen}
          options={{ title: 'Your Cart' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
    iconWrapper: {
      paddingHorizontal: 12,
      paddingVertical: 4,
    },
    badge: {
      position: 'absolute',
      top: 2,
      right: 6,
      backgroundColor: 'red',
      borderRadius: 8,
      minWidth: 16,
      paddingHorizontal: 4,
      height: 16,
      alignItems: 'center',
      justifyContent: 'center',
    },
    badgeText: {
      color: '#fff',
      fontSize: 10,
      fontWeight: 'bold',
    },
    logo: {
        width: 36,
        height: 36,
      },
  });
  

export default AppNavigator;