import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductGrid from '../components/product/ProductGrid.jsx';
import Input from '../components/ui/Input.jsx';
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
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [search, setSearch] = useState(query);
  const debouncedSearch = useDebounce(search, 300);
  const category = searchParams.get('category') || 'Tat ca';
  const {
    products: visibleProducts,
    loading,
    error,
    refetch,
    total,
  } = useProducts({
    search: debouncedSearch.trim() || undefined,
    category: category === 'Tat ca' ? undefined : category,
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

  function handleCategoryChange(event) {
    const value = event.target.value;
    const nextParams = new URLSearchParams(searchParams);
    if (value === 'Tat ca') nextParams.delete('category');
    else nextParams.set('category', value);
    setSearchParams(nextParams);
  }

  function handleClearSearch() {
    setSearch('');
  }

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

        <div className="flex flex-wrap items-center gap-2 py-6">
          {['Tat ca', ...categories.map((item) => item.name)].map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => handleCategoryChange({ target: { value: item } })}
              className={`rounded-full border px-3 py-1.5 text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                category === item
                  ? 'border-accent bg-accent text-accent-foreground'
                  : 'border-border text-muted hover:bg-neutral-100 hover:text-foreground'
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <ProductGrid
          products={visibleProducts}
          loading={loading}
          error={error}
          onRetry={refetch}
        />
      </section>
    </main>
  );
}

export default Shop;
