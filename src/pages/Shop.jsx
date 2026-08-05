import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductFilters from '../components/product/ProductFilters.jsx';
import ProductGrid from '../components/product/ProductGrid.jsx';
import SortSelect from '../components/product/SortSelect.jsx';
import Button from '../components/ui/Button.jsx';
import Input from '../components/ui/Input.jsx';
import Modal from '../components/ui/Modal.jsx';
import useCategories from '../hooks/useCategories.js';
import useDebounce from '../hooks/useDebounce.js';
import useProducts from '../hooks/useProducts.js';
import { useCart } from '../context/CartContext.jsx';
import { useToast } from '../context/ToastContext.jsx';

function ClearIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <path d="m7 7 10 10M17 7 7 17" />
    </svg>
  );
}

function Shop() {
  const pageSize = 6;
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [search, setSearch] = useState(query);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const debouncedSearch = useDebounce(search, 300);
  const category = searchParams.get('category') || '';
  const minPrice = searchParams.get('minPrice') || '';
  const maxPrice = searchParams.get('maxPrice') || '';
  const sort = searchParams.get('sort') || 'newest';
  const inStock = searchParams.get('inStock') === '1';
  const page = Math.max(1, Number(searchParams.get('page')) || 1);
  const filterValues = { category, minPrice, maxPrice, inStock };
  const { categories } = useCategories();
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const {
    products: visibleProducts,
    loading,
    error,
    refetch,
    total,
  } = useProducts({
    search: debouncedSearch.trim() || undefined,
    category: category === 'Tat ca' ? undefined : category,
    minPrice: minPrice || undefined,
    maxPrice: maxPrice || undefined,
    inStock,
    sort,
    page,
  });

  useEffect(() => {
    setSearch(query);
  }, [query]);

  useEffect(() => {
    const nextQuery = debouncedSearch.trim();
    if (nextQuery === query) return;

    const nextParams = new URLSearchParams(searchParams);
    if (nextQuery) nextParams.set('q', nextQuery);
    else nextParams.delete('q');
    setSearchParams(nextParams, { replace: true });
  }, [debouncedSearch, query, searchParams, setSearchParams]);

  function handleFilterChange(key, value) {
    updateFilter(key, value);
  }

  function handleClearSearch() {
    setSearch('');
  }

  function updateFilter(key, value) {
    const nextParams = new URLSearchParams(searchParams);
    if (value === '' || value === false || value === undefined) {
      nextParams.delete(key);
    } else {
      nextParams.set(key, key === 'inStock' ? '1' : value);
    }
    if (key !== 'page') nextParams.delete('page');
    setSearchParams(nextParams, { replace: true });
  }

  function handleResetFilters() {
    const nextParams = new URLSearchParams();
    if (query) nextParams.set('q', query);
    setSearchParams(nextParams, { replace: true });
    setFiltersOpen(false);
  }

  function handlePageChange(nextPage) {
    const nextParams = new URLSearchParams(searchParams);
    if (nextPage <= 1) nextParams.delete('page');
    else nextParams.set('page', nextPage);
    setSearchParams(nextParams);
  }

  const handleAddToCart = useCallback(
    (product) => {
      const wasAdded = addToCart(product);
      showToast(
        wasAdded
          ? 'Đã thêm sản phẩm vào giỏ hàng.'
          : 'Không thể thêm sản phẩm vào giỏ hàng.',
        { type: wasAdded ? 'success' : 'error' },
      );
    },
    [addToCart, showToast],
  );

  const handleToggleFavorite = useCallback(() => {
    showToast('Tính năng yêu thích sẽ được hoàn thiện ở bước tiếp theo.');
  }, [showToast]);

  const pageCount = Math.ceil(total / pageSize);
  const hasActiveFilters =
    category || minPrice || maxPrice || inStock || sort !== 'newest';
  const emptyTitle = query
    ? 'Không tìm thấy sản phẩm'
    : hasActiveFilters
      ? 'Không có sản phẩm phù hợp'
      : 'Chưa có sản phẩm';
  const emptyDescription = query
    ? 'Thử với từ khóa khác hoặc xóa tìm kiếm.'
    : hasActiveFilters
      ? 'Thử điều chỉnh bộ lọc để xem thêm sản phẩm.'
      : 'Danh sách sản phẩm đang được cập nhật.';

  return (
    <main className="flex-1 py-12">
      <section className="page-container">
        <div className="flex flex-col justify-between gap-5 border-b border-border pb-8 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-medium uppercase tracking-wide text-muted">
              Cửa hàng
            </p>
            <h1 className="section-heading mt-2">Danh sách sản phẩm</h1>
            <p className="mt-3 text-sm text-muted">
              {total} sản phẩm đang hiển thị
            </p>
          </div>
          <div className="w-full sm:max-w-xs">
            <Input
              label="Tìm kiếm"
              placeholder="Tên sản phẩm..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              rightElement={
                search ? (
                  <button
                    type="button"
                    aria-label="Xóa tìm kiếm"
                    onClick={handleClearSearch}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted transition hover:text-foreground focus-visible:outline-none"
                  >
                    <span className="h-4 w-4">
                      <ClearIcon />
                    </span>
                  </button>
                ) : null
              }
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border py-5">
          <Button
            variant="outline"
            className="md:hidden"
            onClick={() => setFiltersOpen(true)}
          >
            Bộ lọc
          </Button>
          <SortSelect
            value={sort}
            onChange={(value) => updateFilter('sort', value)}
          />
        </div>

        <div className="mt-8 grid gap-8 md:grid-cols-[220px_minmax(0,1fr)]">
          <aside className="hidden rounded-lg border border-border bg-surface p-5 md:block">
            <div className="flex items-center justify-between gap-3">
              <h2 className="font-semibold text-foreground">Bộ lọc</h2>
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="text-xs text-muted underline-offset-4 hover:text-foreground hover:underline"
                >
                  Đặt lại
                </button>
              )}
            </div>
            <div className="mt-5">
              <ProductFilters
                categories={categories}
                values={filterValues}
                onChange={handleFilterChange}
                onReset={handleResetFilters}
              />
            </div>
          </aside>

          <div className="min-w-0">
            <ProductGrid
              products={visibleProducts}
              loading={loading}
              error={error}
              onRetry={refetch}
              onAddToCart={handleAddToCart}
              onToggleFavorite={handleToggleFavorite}
              emptyTitle={emptyTitle}
              emptyDescription={emptyDescription}
            />
            {pageCount > 1 && (
              <div className="mt-8 flex items-center justify-between border-t border-border pt-5">
                <Button
                  variant="outline"
                  disabled={page === 1}
                  onClick={() => handlePageChange(page - 1)}
                >
                  Trang trước
                </Button>
                <span className="text-sm text-muted">
                  Trang {page} / {pageCount}
                </span>
                <Button
                  variant="outline"
                  disabled={page >= pageCount}
                  onClick={() => handlePageChange(page + 1)}
                >
                  Trang sau
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      <Modal
        open={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        title="Bộ lọc sản phẩm"
        className="max-h-[85vh] max-w-md overflow-y-auto"
      >
        <ProductFilters
          categories={categories}
          values={filterValues}
          onChange={handleFilterChange}
          onReset={handleResetFilters}
        />
      </Modal>
    </main>
  );
}

export default Shop;
