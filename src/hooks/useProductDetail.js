import { useCallback, useEffect, useState } from 'react';
import { getProductById } from '../services/productService.js';
import { products as demoProducts } from '../services/products.js';

function useProductDetail(id) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(Boolean(id));
  const [error, setError] = useState(null);
  const [requestKey, setRequestKey] = useState(0);

  const refetch = useCallback(() => setRequestKey((value) => value + 1), []);

  useEffect(() => {
    let isCurrent = true;

    if (!id) {
      setProduct(null);
      setLoading(false);
      setError(new Error('Product id is required.'));
      return undefined;
    }

    async function loadProduct() {
      setLoading(true);
      setError(null);

      try {
        const result = await getProductById(id);
        if (isCurrent) setProduct(result);
      } catch (requestError) {
        if (!isCurrent) return;
        setError(requestError);
        setProduct(demoProducts.find((item) => item.id === id) || null);
      } finally {
        if (isCurrent) setLoading(false);
      }
    }

    loadProduct();

    return () => {
      isCurrent = false;
    };
  }, [id, requestKey]);

  return { product, loading, error, refetch };
}

export default useProductDetail;
