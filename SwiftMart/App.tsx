import React from 'react';
import AppNavigator from './navigation/AppNavigator';
import { CartProvider } from './context/CartContext';
import Toast from 'react-native-toast-message';
export default function App() {
  return (
    <CartProvider>
      <AppNavigator />
      <Toast topOffset={120} />
    </CartProvider>
  );
}