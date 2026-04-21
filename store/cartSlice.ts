import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem, Product } from '@/types';

interface CartState {
  items: CartItem[];
}

const initialState: CartState = { items: [] };

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    hydrateCart(state, action: PayloadAction<CartItem[]>) {
      state.items = action.payload;
    },
    addToCart(state, action: PayloadAction<{ product: Product; size: string; color: string }>) {
      const { product, size, color } = action.payload;
      const existing = state.items.find(
        i => i.product.id === product.id && i.selectedSize === size && i.selectedColor === color
      );
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ product, quantity: 1, selectedSize: size, selectedColor: color });
      }
    },
    removeFromCart(state, action: PayloadAction<{ productId: string; size: string; color: string }>) {
      state.items = state.items.filter(
        i => !(i.product.id === action.payload.productId && i.selectedSize === action.payload.size && i.selectedColor === action.payload.color)
      );
    },
    updateQuantity(state, action: PayloadAction<{ productId: string; size: string; color: string; quantity: number }>) {
      const item = state.items.find(
        i => i.product.id === action.payload.productId && i.selectedSize === action.payload.size && i.selectedColor === action.payload.color
      );
      if (item) {
        item.quantity = Math.max(1, action.payload.quantity);
      }
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const { hydrateCart, addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
