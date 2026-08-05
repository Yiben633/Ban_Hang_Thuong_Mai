import { useCallback, useEffect, useMemo, useState } from 'react';
import { X } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import ProductGrid from '../../components/product/ProductGrid.jsx';
import Input from '../../components/ui/Input.jsx';
import { useCart } from '../../context/CartContext.jsx';
import { useToast } from '../../context/ToastContext.jsx';
import useProducts from '../../hooks/useProducts.js';
import { getUserErrorMessage } from '../../utils/errors.js';

const SORT_OPTIONS = [
  { value: 'default', label: 'Mặc định' },
  { value: 'price-asc', label: 'Giá tăng dần' },
  { value: 'price-desc', label: 'Giá giảm dần' },
  { value: 'rating-desc', label: 'Đánh giá cao nhất' },
  { value: 'name-asc', label: 'Tên A-Z' },
  { value: 'name-desc', label: 'Tên Z-A' },
];

function sortProducts(products, sort) {
  const sortedProducts = [...products];

  switch (sort) {
    case 'price-asc':
      return sortedProducts.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return sortedProducts.sort((a, b) => b.price - a.price);
    case 'rating-desc':
      return sortedProducts.sort((a, b) => b.rating - a.rating);
    case 'name-asc':
      return sortedProducts.sort((a, b) =>
        a.name.localeCompare(b.name, 'vi', { sensitivity: 'base' }),
      );
    case 'name-desc':
      return sortedProducts.sort((a, b) =>
        b.name.localeCompare(a.name, 'vi', { sensitivity: 'base' }),
      );
    default:
      return sortedProducts;
  }
}

function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchKeyword, setSearchKeyword] = useState(
    searchParams.get('q') || '',
  );
  const [category, setCategory] = useState(searchParams.get('category') || '');
  const [sort, setSort] = useState(
    searchParams.get('sort') || SORT_OPTIONS[0].value,
  );
  const { products, categories, loading, error, categoriesError, reload } =
    useProducts();
  const { addToCart } = useCart();
  const { showToast } = useToast();

  useEffect(() => {
    setSearchKeyword(searchParams.get('q') || '');
    setCategory(searchParams.get('category') || '');
    setSort(searchParams.get('sort') || SORT_OPTIONS[0].value);
  }, [searchParams]);

  const filteredProducts = useMemo(() => {
    const keyword = searchKeyword.trim().toLocaleLowerCase();
    const selectedCategory = category.trim().toLocaleLowerCase();

    const matchingProducts = products.filter((product) => {
      const matchesKeyword =
        !keyword || product.name.toLocaleLowerCase().includes(keyword);
      const matchesCategory =
        !selectedCategory ||
        product.category.toLocaleLowerCase() === selectedCategory;

      return matchesKeyword && matchesCategory;
    });

    return sortProducts(matchingProducts, sort);
  }, [category, products, searchKeyword, sort]);

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

  function handleSortChange(event) {
    const value = event.target.value;
    const nextParams = new URLSearchParams(searchParams);

    setSort(value);
    if (value === SORT_OPTIONS[0].value) nextParams.delete('sort');
    else nextParams.set('sort', value);
    setSearchParams(nextParams, { replace: true });
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
            disabled={Boolean(categoriesError)}
            className="mt-1.5 block min-h-10 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-foreground shadow-subtle outline-none transition focus:border-foreground focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:text-muted"
          >
            <option value="">Tất cả</option>
            {categories.map((item) => (
              <option key={item.name} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
          {categoriesError && (
            <p className="mt-1.5 text-sm text-muted" role="status">
              {getUserErrorMessage(
                categoriesError,
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

        <div className="mt-4 max-w-md">
          <label
            htmlFor="products-sort"
            className="block text-sm font-medium text-foreground"
          >
            Sắp xếp
          </label>
          <select
            id="products-sort"
            value={sort}
            onChange={handleSortChange}
            className="mt-1.5 block min-h-10 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-foreground shadow-subtle outline-none transition focus:border-foreground focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background"
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-8">
          <ProductGrid
            products={filteredProducts}
            loading={loading}
            error={error}
            onRetry={reload}
            onAddToCart={handleAddToCart}
            onToggleFavorite={handleToggleFavorite}
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
