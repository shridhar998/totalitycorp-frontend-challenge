// context/CartContext.tsx
"use client";
import React, { createContext, useContext, useReducer } from 'react';

// Define types
type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
};

type CartItem = {
  product: Product;
  quantity: number;
};

type CartAction =
  | { type: 'ADD_TO_CART'; product: Product }
  | { type: 'REMOVE_FROM_CART'; productId: number }
  | { type: 'INCREMENT_QUANTITY'; productId: number }
  | { type: 'DECREMENT_QUANTITY'; productId: number };

// Initial state
const initialState: CartItem[] = [];

// Reducer function
const cartReducer = (state: CartItem[], action: CartAction): CartItem[] => {
  switch (action.type) {
    case 'ADD_TO_CART':
      // Check if the product is already in the cart
      const existingCartItem = state.find(item => item.product.id === action.product.id);
      if (existingCartItem) {
        return state.map(item =>
          item.product.id === action.product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...state, { product: action.product, quantity: 1 }];

    // Implement other cases for removing and updating quantities
    case 'REMOVE_FROM_CART':
      return state.filter(item => item.product.id !== action.productId);

    case 'INCREMENT_QUANTITY':
      return state.map(item =>
        item.product.id === action.productId ? { ...item, quantity: item.quantity + 1 } : item
      );

    case 'DECREMENT_QUANTITY':
      return state.map(item =>
        item.product.id === action.productId ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item
      );
    default:
      return state;
  }
};

// Create context
const CartContext = createContext<{
  cartItems: CartItem[];
  dispatch: React.Dispatch<CartAction>;
} | undefined>(undefined);

// Provider component
export const CartProvider: React.FC = ({ children }) => {
  const [cartItems, dispatch] = useReducer(cartReducer, initialState);

  return <CartContext.Provider value={{ cartItems, dispatch }}>{children}</CartContext.Provider>;
};

// Custom hook to use the context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
// context/CartContext.tsx
// ... (previously defined code)

