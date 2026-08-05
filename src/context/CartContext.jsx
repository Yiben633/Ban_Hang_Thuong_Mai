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
    if (!Array.isArray(parsedCart)) return [];

    return parsedCart
      .filter(
        (item) =>
          item?.product &&
          item.product.id !== undefined &&
          item.product.id !== null &&
          Number.isFinite(Number(item.quantity)),
      )
      .map((item) => ({
        product: item.product,
        quantity: Math.max(1, Math.floor(Number(item.quantity))),
      }));
  } catch {
    return [];
  }
}

function getStockLimit(product) {
  return typeof product.stock === 'number' ? product.stock : null;
}

function clampQuantity(product, quantity) {
  const nextQuantity = Math.max(1, Math.floor(Number(quantity) || 1));
  const stockLimit = getStockLimit(product);
  return stockLimit === null
    ? nextQuantity
    : Math.min(nextQuantity, Math.max(1, stockLimit));
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(readStoredCart);

  useEffect(() => {
    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch {
      // Storage can be unavailable in private browsing or restricted contexts.
    }
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
      currentItems.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: clampQuantity(item.product, quantity) }
          : item,
      ),
    );
  }, []);

  const changeQuantity = useCallback((productId, amount) => {
    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.product.id === productId
          ? {
              ...item,
              quantity: clampQuantity(item.product, item.quantity + amount),
            }
          : item,
      ),
    );
  }, []);

  const increaseQuantity = useCallback(
    (productId) => changeQuantity(productId, 1),
    [changeQuantity],
  );

  const decreaseQuantity = useCallback(
    (productId) => changeQuantity(productId, -1),
    [changeQuantity],
  );

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
  const addToCart = addItem;
  const removeFromCart = removeItem;
  const getCartItemCount = useCallback(() => totalQuantity, [totalQuantity]);
  const getCartTotal = useCallback(() => subtotal, [subtotal]);
  const value = useMemo(
    () => ({
      cartItems,
      totalQuantity,
      subtotal,
      addItem,
      removeItem,
      updateQuantity,
      addToCart,
      removeFromCart,
      increaseQuantity,
      decreaseQuantity,
      clearCart,
      getCartItemCount,
      getCartTotal,
    }),
    [
      cartItems,
      totalQuantity,
      subtotal,
      addItem,
      removeItem,
      updateQuantity,
      addToCart,
      removeFromCart,
      increaseQuantity,
      decreaseQuantity,
      clearCart,
      getCartItemCount,
      getCartTotal,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider.');
  return context;
}
