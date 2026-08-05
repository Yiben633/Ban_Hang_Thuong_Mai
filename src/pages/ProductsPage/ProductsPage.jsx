import { useCallback, useEffect, useState } from 'react';
import * as productApi from '../../api/productApi.js';
import ProductGrid from '../../components/product/ProductGrid.jsx';
import { normalizeProduct } from '../../services/productService.js';

function getProductsFromResponse(response) {
  const payload = response?.data;
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.products)) return payload.products;
  return [];
}

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);

  const loadProducts = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await productApi.getAll();
      setProducts(getProductsFromResponse(response).map(normalizeProduct));
    } catch (requestError) {
      setProducts([]);
      setError(requestError);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts, reloadKey]);

  return (
    <main className="flex-1 py-12 sm:py-16">
      <section className="page-container">
        <div className="border-b border-border pb-8">
          <p className="text-sm font-medium uppercase tracking-wide text-muted">
            Cửa hàng
          </p>
          <h1 className="section-heading mt-2">Tất cả sản phẩm</h1>
          <p className="mt-3 text-sm text-muted">
            Khám phá danh sách sản phẩm mới nhất.
          </p>
        </div>

        <div className="mt-8">
          <ProductGrid
            products={products}
            loading={loading}
            error={error}
            onRetry={() => setReloadKey((current) => current + 1)}
            emptyTitle="Không có sản phẩm"
            emptyDescription="Hiện chưa có sản phẩm để hiển thị."
          />
        </div>
      </section>
    </main>
  );
}

export default ProductsPage;
