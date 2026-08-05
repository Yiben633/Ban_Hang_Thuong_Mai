/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

const FAVORITES_STORAGE_KEY = 'mono-store-favorites';
const FavoritesContext = createContext(null);

function isValidProduct(product) {
  return product && product.id !== undefined && product.id !== null;
}

function readStoredFavorites() {
  try {
    const storedFavorites = window.localStorage.getItem(FAVORITES_STORAGE_KEY);
    const parsedFavorites = storedFavorites ? JSON.parse(storedFavorites) : [];

    if (!Array.isArray(parsedFavorites)) return [];
    return parsedFavorites
      .filter(isValidProduct)
      .filter(
        (product, index, list) =>
          list.findIndex((item) => item.id === product.id) === index,
      );
  } catch {
    return [];
  }
}

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(readStoredFavorites);

  useEffect(() => {
    try {
      window.localStorage.setItem(
        FAVORITES_STORAGE_KEY,
        JSON.stringify(favorites),
      );
    } catch {
      // Storage can be unavailable in private browsing or restricted contexts.
    }
  }, [favorites]);

  const addFavorite = useCallback((product) => {
    if (!isValidProduct(product)) return false;

    setFavorites((currentFavorites) => {
      if (currentFavorites.some((item) => item.id === product.id)) {
        return currentFavorites;
      }
      return [...currentFavorites, product];
    });
    return true;
  }, []);

  const removeFavorite = useCallback((productId) => {
    setFavorites((currentFavorites) =>
      currentFavorites.filter((product) => product.id !== productId),
    );
  }, []);

  const isFavorite = useCallback(
    (productId) => favorites.some((product) => product.id === productId),
    [favorites],
  );

  const toggleFavorite = useCallback(
    (product) => {
      if (!isValidProduct(product)) return false;
      if (isFavorite(product.id)) {
        removeFavorite(product.id);
        return false;
      }
      addFavorite(product);
      return true;
    },
    [addFavorite, isFavorite, removeFavorite],
  );

  const clearFavorites = useCallback(() => {
    setFavorites([]);
  }, []);

  const value = useMemo(
    () => ({
      favorites,
      addFavorite,
      removeFavorite,
      toggleFavorite,
      isFavorite,
      clearFavorites,
    }),
    [
      favorites,
      addFavorite,
      removeFavorite,
      toggleFavorite,
      isFavorite,
      clearFavorites,
    ],
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within FavoritesProvider.');
  }
  return context;
}
