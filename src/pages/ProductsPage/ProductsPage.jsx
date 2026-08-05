import { useCallback, useEffect, useMemo, useState } from 'react';
import { X } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import * as productApi from '../../api/productApi.js';
import ProductGrid from '../../components/product/ProductGrid.jsx';
import Input from '../../components/ui/Input.jsx';
import { normalizeProduct } from '../../services/productService.js';
import { getUserErrorMessage } from '../../utils/errors.js';

function getProductsFromResponse(response) {
  const payload = response?.data;
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.products)) return payload.products;
  return [];
}

function getCategoriesFromResponse(response) {
  const payload = response?.data;
  return Array.isArray(payload) ? payload : [];
}

function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState(
    searchParams.get('q') || '',
  );
  const [category, setCategory] = useState(searchParams.get('category') || '');
  const [categories, setCategories] = useState([]);
  const [categoryError, setCategoryError] = useState(null);
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

  const loadCategories = useCallback(async () => {
    setCategoryError(null);

    try {
      const response = await productApi.getCategories();
      setCategories(getCategoriesFromResponse(response));
    } catch (requestError) {
      setCategories([]);
      setCategoryError(requestError);
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts, reloadKey]);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  useEffect(() => {
    setSearchKeyword(searchParams.get('q') || '');
    setCategory(searchParams.get('category') || '');
  }, [searchParams]);

  const filteredProducts = useMemo(() => {
    const keyword = searchKeyword.trim().toLocaleLowerCase();
    const selectedCategory = category.trim().toLocaleLowerCase();

    return products.filter((product) => {
      const matchesKeyword =
        !keyword || product.name.toLocaleLowerCase().includes(keyword);
      const matchesCategory =
        !selectedCategory ||
        product.category.toLocaleLowerCase() === selectedCategory;

      return matchesKeyword && matchesCategory;
    });
  }, [category, products, searchKeyword]);

  function handleCategoryChange(event) {
    const value = event.target.value;
    const nextParams = new URLSearchParams(searchParams);

    setCategory(value);
    if (value) nextParams.set('category', value);
    else nextParams.delete('category');
    setSearchParams(nextParams, { replace: true });
  }

  function handleClearCategory() {
    handleCategoryChange({ target: { value: '' } });
  }

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

        <div className="mt-4 max-w-md">
          <label
            htmlFor="products-category"
            className="block text-sm font-medium text-foreground"
          >
            Danh mục
          </label>
          <select
            id="products-category"
            value={category}
            onChange={handleCategoryChange}
            disabled={Boolean(categoryError)}
            className="mt-1.5 block min-h-10 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-foreground shadow-subtle outline-none transition focus:border-foreground focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:text-muted"
          >
            <option value="">Tất cả</option>
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          {categoryError && (
            <p className="mt-1.5 text-sm text-muted" role="status">
              {getUserErrorMessage(
                categoryError,
                'Không thể tải danh mục. Danh sách sản phẩm vẫn hoạt động.',
              )}
            </p>
          )}
          {category && (
            <button
              type="button"
              onClick={handleClearCategory}
              className="mt-2 text-xs text-muted underline-offset-4 hover:text-foreground hover:underline"
            >
              Xóa bộ lọc danh mục
            </button>
          )}
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
                : category
                  ? 'Không có sản phẩm phù hợp'
                  : 'Không có sản phẩm'
            }
            emptyDescription={
              searchKeyword.trim()
                ? 'Thử tìm kiếm bằng từ khóa khác.'
                : category
                  ? 'Thử chọn danh mục khác.'
                  : 'Hiện chưa có sản phẩm để hiển thị.'
            }
          />
        </div>
      </section>
    </main>
  );
}

export default ProductsPage;
