import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import ProductListScreen from '../screens/ProductListScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import CartScreen from '../screens/CartScreen';
import { TouchableOpacity , View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
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
            title: 'SwiftMart',
            headerRight: () => (
                <TouchableOpacity
                onPress={() => navigation.navigate('Cart')}
                style={styles.iconWrapper}
                activeOpacity={0.7}
              >
                <Icon name="cart-outline" size={24} color="#333" />
                {itemCount > 0 && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{itemCount}</Text>
                  </View>
                )}
              </TouchableOpacity>
            ),
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
  });
  

export default AppNavigator;