import { useCallback, useEffect, useState } from 'react';
import * as productApi from '../api/productApi.js';
import { normalizeProduct } from '../services/productService.js';

function useProductDetail(id) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(Boolean(id));
  const [error, setError] = useState(null);
  const [requestKey, setRequestKey] = useState(0);

  const refetch = useCallback(() => setRequestKey((value) => value + 1), []);

  useEffect(() => {
    let isCurrent = true;

    const normalizedId = String(id || '').trim();
    if (!/^\d+$/.test(normalizedId)) {
      setProduct(null);
      setLoading(false);
      setError(new Error('Product id is invalid.'));
      return undefined;
    }

    async function loadProduct() {
      setLoading(true);
      setError(null);

      try {
        const response = await productApi.getById(normalizedId);
        if (isCurrent) setProduct(normalizeProduct(response.data));
      } catch (requestError) {
        if (!isCurrent) return;
        setError(requestError);
        setProduct(null);
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
