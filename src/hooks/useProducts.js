import { useCallback, useEffect, useMemo, useState } from 'react';
import { getProducts } from '../services/productService.js';
import { products as demoProducts } from '../services/products.js';

function getDemoProducts({ search, category }) {
  const query = search?.trim().toLowerCase();

  return demoProducts.filter((product) => {
    const matchesSearch =
      !query ||
      `${product.name} ${product.category}`.toLowerCase().includes(query);
    const matchesCategory = !category || product.category === category;
    return matchesSearch && matchesCategory;
  });
}

function useProducts({ search, category, sort, page } = {}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [requestKey, setRequestKey] = useState(0);
  const stableParams = useMemo(
    () => ({ search, category, sort, page }),
    [search, category, sort, page],
  );

  const refetch = useCallback(() => setRequestKey((value) => value + 1), []);

  useEffect(() => {
    let isCurrent = true;

    async function loadProducts() {
      setLoading(true);
      setError(null);

      try {
        const result = await getProducts(stableParams);
        if (!isCurrent) return;
        setProducts(result);
      } catch (requestError) {
        if (!isCurrent) return;
        setError(requestError);
        setProducts(getDemoProducts(stableParams));
      } finally {
        if (isCurrent) setLoading(false);
      }
    }

    loadProducts();

    return () => {
      isCurrent = false;
    };
  }, [requestKey, stableParams]);

  return {
    products,
    loading,
    error,
    refetch,
    total: products.length,
    params: stableParams,
  };
}

export default useProducts;
