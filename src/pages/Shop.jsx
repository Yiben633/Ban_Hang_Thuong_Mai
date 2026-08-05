import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductFilters from '../components/product/ProductFilters.jsx';
import ProductGrid from '../components/product/ProductGrid.jsx';
import SortSelect from '../components/product/SortSelect.jsx';
import Button from '../components/ui/Button.jsx';
import Input from '../components/ui/Input.jsx';
import Modal from '../components/ui/Modal.jsx';
import useDebounce from '../hooks/useDebounce.js';
import useProducts from '../hooks/useProducts.js';
import { categories } from '../services/products.js';

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

  const pageCount = Math.ceil(total / pageSize);
  const hasActiveFilters =
    category || minPrice || maxPrice || inStock || sort !== 'newest';
  const emptyTitle = query
    ? 'Khong tim thay san pham'
    : hasActiveFilters
      ? 'Khong co san pham phu hop'
      : 'Chua co san pham';
  const emptyDescription = query
    ? 'Thu voi tu khoa khac hoac xoa tim kiem.'
    : hasActiveFilters
      ? 'Thu dieu chinh bo loc de xem them san pham.'
      : 'Danh sach san pham dang duoc cap nhat.';

  return (
    <main className="flex-1 py-12">
      <section className="page-container">
        <div className="flex flex-col justify-between gap-5 border-b border-border pb-8 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-medium uppercase tracking-wide text-muted">
              Shop
            </p>
            <h1 className="section-heading mt-2">Danh sach san pham</h1>
            <p className="mt-3 text-sm text-muted">
              {total} san pham dang hien thi
            </p>
          </div>
          <div className="w-full sm:max-w-xs">
            <Input
              label="Tim kiem"
              placeholder="Ten san pham..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              rightElement={
                search ? (
                  <button
                    type="button"
                    aria-label="Xoa tim kiem"
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
            Bo loc
          </Button>
          <SortSelect
            value={sort}
            onChange={(value) => updateFilter('sort', value)}
          />
        </div>

        <div className="mt-8 grid gap-8 md:grid-cols-[220px_minmax(0,1fr)]">
          <aside className="hidden rounded-lg border border-border bg-surface p-5 md:block">
            <div className="flex items-center justify-between gap-3">
              <h2 className="font-semibold text-foreground">Bo loc</h2>
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="text-xs text-muted underline-offset-4 hover:text-foreground hover:underline"
                >
                  Dat lai
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
                  Trang truoc
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
        title="Bo loc san pham"
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
