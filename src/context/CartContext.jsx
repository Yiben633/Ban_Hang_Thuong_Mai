/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

const CART_STORAGE_KEY = 'mono-store-cart';
const CartContext = createContext(null);

function readStoredCart() {
  try {
    const storedCart = window.localStorage.getItem(CART_STORAGE_KEY);
    const parsedCart = storedCart ? JSON.parse(storedCart) : [];
    return Array.isArray(parsedCart) ? parsedCart : [];
  } catch {
    return [];
  }
}

function getStockLimit(product) {
  return typeof product.stock === 'number' ? product.stock : null;
}

function clampQuantity(product, quantity) {
  const nextQuantity = Math.max(0, Math.floor(Number(quantity) || 0));
  const stockLimit = getStockLimit(product);
  return stockLimit === null
    ? nextQuantity
    : Math.min(nextQuantity, Math.max(0, stockLimit));
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(readStoredCart);

  useEffect(() => {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  const addItem = useCallback((product, quantity = 1) => {
    const requestedQuantity = Math.max(0, Math.floor(Number(quantity) || 0));
    if (!product || requestedQuantity === 0 || getStockLimit(product) === 0) {
      return false;
    }

    setCartItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item.product.id === product.id,
      );
      const currentQuantity = existingItem?.quantity || 0;
      const nextQuantity = clampQuantity(
        product,
        currentQuantity + requestedQuantity,
      );
      if (!existingItem) {
        return nextQuantity > 0
          ? [...currentItems, { product, quantity: nextQuantity }]
          : currentItems;
      }

      return currentItems.map((item) =>
        item.product.id === product.id
          ? { ...item, product, quantity: nextQuantity }
          : item,
      );
    });
    return true;
  }, []);

  const removeItem = useCallback((productId) => {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.product.id !== productId),
    );
  }, []);

  const updateQuantity = useCallback((productId, quantity) => {
    setCartItems((currentItems) =>
      currentItems.flatMap((item) => {
        if (item.product.id !== productId) return [item];
        const nextQuantity = clampQuantity(item.product, quantity);
        return nextQuantity > 0 ? [{ ...item, quantity: nextQuantity }] : [];
      }),
    );
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );
  const subtotal = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );
  const value = useMemo(
    () => ({
      cartItems,
      totalQuantity,
      subtotal,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
    }),
    [
      cartItems,
      totalQuantity,
      subtotal,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider.');
  return context;
}
