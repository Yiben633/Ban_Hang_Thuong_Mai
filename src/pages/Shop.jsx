import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductGrid from '../components/product/ProductGrid.jsx';
import Input from '../components/ui/Input.jsx';
import useProducts from '../hooks/useProducts.js';
import { categories } from '../services/products.js';

function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const category = searchParams.get('category') || 'Tat ca';
  const {
    products: visibleProducts,
    loading,
    error,
    refetch,
    total,
  } = useProducts({
    search: search.trim() || undefined,
    category: category === 'Tat ca' ? undefined : category,
  });

  function handleCategoryChange(event) {
    const value = event.target.value;
    const nextParams = new URLSearchParams(searchParams);
    if (value === 'Tat ca') nextParams.delete('category');
    else nextParams.set('category', value);
    setSearchParams(nextParams);
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
