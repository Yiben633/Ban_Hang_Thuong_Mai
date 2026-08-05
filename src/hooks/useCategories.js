import { useCallback, useEffect, useState } from 'react';
import { getCategories } from '../services/productService.js';

function useCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [requestKey, setRequestKey] = useState(0);

  const refetch = useCallback(() => setRequestKey((value) => value + 1), []);

  useEffect(() => {
    let isCurrent = true;

    async function loadCategories() {
      setLoading(true);
      setError(null);

      try {
        const result = await getCategories();
        if (isCurrent) setCategories(result);
      } catch (requestError) {
        if (!isCurrent) return;
        setCategories([]);
        setError(requestError);
      } finally {
        if (isCurrent) setLoading(false);
      }
    }

    loadCategories();
    return () => {
      isCurrent = false;
    };
  }, [requestKey]);

  return { categories, loading, error, refetch };
}

export default useCategories;
