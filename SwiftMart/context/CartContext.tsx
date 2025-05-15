import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
type Product = {
  id: number;
  title: string;
  image: string;
  price: number;
  rating: { rate: number };
};

type CartItem = Product & { quantity: number };

type CartState = {
  items: CartItem[];
};

type Action =
  | { type: 'ADD_TO_CART'; product: Product }
  | { type: 'INCREASE_QUANTITY'; productId: number }
  | { type: 'DECREASE_QUANTITY'; productId: number }
  | { type: 'INIT_CART'; payload: CartItem[] }
  | { type: 'REMOVE_FROM_CART'; productId: number };

const CartContext = createContext<{
  cart: CartState;
  dispatch: React.Dispatch<Action>;
}>({ cart: { items: [] }, dispatch: () => {} });

const cartReducer = (state: CartState, action: Action): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existing = state.items.find((item) => item.id === action.product.id);
      if (existing) {
        return {
          items: state.items.map((item) =>
            item.id === action.product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      Toast.show({
        type: 'success',
        text1: 'Added to Cart',
        position: 'top',
      });
      return { items: [...state.items, { ...action.product, quantity: 1 }] };

    case 'INCREASE_QUANTITY':
      return {
        items: state.items.map((item) =>
          item.id === action.productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };

    case 'DECREASE_QUANTITY':
      return {
        items: state.items
          .map((item) =>
            item.id === action.productId
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
          .filter((item) => item.quantity > 0),
      };

    case 'REMOVE_FROM_CART':
      return {
        items: state.items.filter((item) => item.id !== action.productId),
      };
    
    case 'INIT_CART':
        return { items: Array.isArray(action.payload) ? action.payload : [] };
    
    

    default:
      return state;
  }
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, dispatch] = useReducer(cartReducer, { items: [] });

    useEffect(() => {
        // Load cart from storage on startup
        const loadCart = async () => {
          const storedCart = await AsyncStorage.getItem('cart');
          if (storedCart) {
            dispatch({ type: 'INIT_CART', payload: JSON.parse(storedCart) });
          }
        };
        loadCart();
      }, []);
      
      useEffect(() => {
        // Save cart to storage on every update
        AsyncStorage.setItem('cart', JSON.stringify(cart.items));
        console.log('Cart saved to storage', cart.items);
      }, [cart]);

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);