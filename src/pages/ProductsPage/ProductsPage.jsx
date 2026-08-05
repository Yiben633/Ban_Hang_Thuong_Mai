import { useCallback, useEffect, useMemo, useState } from 'react';
import { X } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import * as productApi from '../../api/productApi.js';
import ProductGrid from '../../components/product/ProductGrid.jsx';
import Input from '../../components/ui/Input.jsx';
import { normalizeProduct } from '../../services/productService.js';

function getProductsFromResponse(response) {
  const payload = response?.data;
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.products)) return payload.products;
  return [];
}

function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState(
    searchParams.get('q') || '',
  );
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

  useEffect(() => {
    setSearchKeyword(searchParams.get('q') || '');
  }, [searchParams]);

  const filteredProducts = useMemo(() => {
    const keyword = searchKeyword.trim().toLocaleLowerCase();
    if (!keyword) return products;

    return products.filter((product) =>
      product.name.toLocaleLowerCase().includes(keyword),
    );
  }, [products, searchKeyword]);

  function handleSearchChange(event) {
    const value = event.target.value;
    const nextParams = new URLSearchParams(searchParams);
    const trimmedValue = value.trim();

    setSearchKeyword(value);
    if (trimmedValue) nextParams.set('q', trimmedValue);
    else nextParams.delete('q');
    setSearchParams(nextParams, { replace: true });
  }

  function handleClearSearch() {
    handleSearchChange({ target: { value: '' } });
  }

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

        <div className="mt-6 max-w-md">
          <Input
            id="products-search"
            type="search"
            label="Tìm kiếm sản phẩm"
            placeholder="Nhập tên sản phẩm..."
            value={searchKeyword}
            onChange={handleSearchChange}
            rightElement={
              searchKeyword ? (
                <button
                  type="button"
                  aria-label="Xóa tìm kiếm"
                  onClick={handleClearSearch}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted transition hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <X size={16} aria-hidden="true" />
                </button>
              ) : null
            }
          />
        </div>

        <div className="mt-8">
          <ProductGrid
            products={filteredProducts}
            loading={loading}
            error={error}
            onRetry={() => setReloadKey((current) => current + 1)}
            emptyTitle={
              searchKeyword.trim()
                ? 'Không tìm thấy sản phẩm'
                : 'Không có sản phẩm'
            }
            emptyDescription={
              searchKeyword.trim()
                ? 'Thử tìm kiếm bằng từ khóa khác.'
                : 'Hiện chưa có sản phẩm để hiển thị.'
            }
          />
        </div>
      </section>
    </main>
  );
}

export default ProductsPage;
