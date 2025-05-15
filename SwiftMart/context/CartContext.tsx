import React, { createContext, useContext, useReducer, ReactNode } from 'react';

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

    default:
      return state;
  }
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, dispatch] = useReducer(cartReducer, { items: [] });

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);