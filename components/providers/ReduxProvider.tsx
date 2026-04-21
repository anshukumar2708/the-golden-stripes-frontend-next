'use client';

import { useRef, useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from '@/store';
import { hydrateCart } from '@/store/cartSlice';
import { hydrateWishlist } from '@/store/wishlistSlice';
import { hydrateAuth } from '@/store/authSlice';
import { setCurrency } from '@/store/currencySlice';
import type { Currency } from '@/types';

function StoreHydrator() {
  const hydrated = useRef(false);

  useEffect(() => {
    if (hydrated.current) return;
    hydrated.current = true;
    try {
      const cart = localStorage.getItem('cart');
      if (cart) store.dispatch(hydrateCart(JSON.parse(cart)));
      const wishlist = localStorage.getItem('wishlist');
      if (wishlist) store.dispatch(hydrateWishlist(JSON.parse(wishlist)));
      const auth = localStorage.getItem('auth');
      if (auth) store.dispatch(hydrateAuth(JSON.parse(auth)));
      const currency = localStorage.getItem('currency') as Currency | null;
      if (currency) store.dispatch(setCurrency(currency));
    } catch {
      // ignore parse errors
    }
  }, []);

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      const state = store.getState();
      try {
        localStorage.setItem('cart', JSON.stringify(state.cart.items));
        localStorage.setItem('wishlist', JSON.stringify(state.wishlist.items));
        localStorage.setItem(
          'auth',
          JSON.stringify({ user: state.auth.user, isAuthenticated: state.auth.isAuthenticated })
        );
        localStorage.setItem('currency', state.currency.selected);
      } catch {
        // ignore write errors
      }
    });
    return unsubscribe;
  }, []);

  return null;
}

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <StoreHydrator />
      {children}
    </Provider>
  );
}
