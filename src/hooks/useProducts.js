import { useCallback, useEffect, useMemo, useState } from 'react';
import { getProducts } from '../services/productService.js';
import { products as demoProducts } from '../services/products.js';

const PAGE_SIZE = 6;

// The API may ignore filter params, so apply them again client-side for a stable UI.
function filterAndSortProducts(
  sourceProducts,
  { search, category, minPrice, maxPrice, inStock, sort },
) {
  const query = search?.trim().toLowerCase();

  return sourceProducts
    .filter((product) => {
      const matchesSearch =
        !query ||
        `${product.name} ${product.category}`.toLowerCase().includes(query);
      const matchesCategory = !category || product.category === category;
      const matchesMinPrice =
        !minPrice || Number(product.price) >= Number(minPrice);
      const matchesMaxPrice =
        !maxPrice || Number(product.price) <= Number(maxPrice);
      const matchesStock =
        !inStock || product.stock == null || Number(product.stock) > 0;
      return (
        matchesSearch &&
        matchesCategory &&
        matchesMinPrice &&
        matchesMaxPrice &&
        matchesStock
      );
    })
    .sort((first, second) => {
      if (sort === 'price-asc') return first.price - second.price;
      if (sort === 'price-desc') return second.price - first.price;
      if (sort === 'name-asc') return first.name.localeCompare(second.name);
      return 0;
    });
}

function paginateProducts(sourceProducts, page) {
  const pageNumber = Math.max(1, Number(page) || 1);
  const start = (pageNumber - 1) * PAGE_SIZE;
  return sourceProducts.slice(start, start + PAGE_SIZE);
}

function useProducts({
  search,
  category,
  minPrice,
  maxPrice,
  inStock,
  sort,
  page,
} = {}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);
  const [requestKey, setRequestKey] = useState(0);
  const stableParams = useMemo(
    () => ({ search, category, minPrice, maxPrice, inStock, sort, page }),
    [search, category, minPrice, maxPrice, inStock, sort, page],
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
        const filteredProducts = filterAndSortProducts(result, stableParams);
        setTotal(filteredProducts.length);
        setProducts(paginateProducts(filteredProducts, page));
      } catch (requestError) {
        if (!isCurrent) return;
        setError(requestError);
        const fallbackProducts = filterAndSortProducts(
          demoProducts,
          stableParams,
        );
        setTotal(fallbackProducts.length);
        setProducts(paginateProducts(fallbackProducts, page));
      } finally {
        if (isCurrent) setLoading(false);
      }
    }

    loadProducts();

    return () => {
      isCurrent = false;
    };
  }, [page, requestKey, stableParams]);

  return {
    products,
    loading,
    error,
    refetch,
    total,
    params: stableParams,
  };
}

export default useProducts;
