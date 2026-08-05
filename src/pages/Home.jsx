import { Link } from 'react-router-dom';
import ProductCard from '../components/product/ProductCard.jsx';
import Button from '../components/ui/Button.jsx';
import Card, { CardContent } from '../components/ui/Card.jsx';
import EmptyState from '../components/ui/EmptyState.jsx';
import ErrorState from '../components/ui/ErrorState.jsx';
import Skeleton from '../components/ui/Skeleton.jsx';
import useCategories from '../hooks/useCategories.js';
import useProducts from '../hooks/useProducts.js';
import { useCart } from '../context/CartContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import { appName } from '../config/env.js';
import { getUserErrorMessage } from '../utils/errors.js';

function Home() {
  const {
    products,
    loading: productsLoading,
    error: productsError,
    refetch: refetchProducts,
  } = useProducts({ page: 1 });
  const {
    categories,
    loading: categoriesLoading,
    error: categoriesError,
    refetch: refetchCategories,
  } = useCategories();
  const { addToCart } = useCart();
  const { showToast } = useToast();

  function handleAddToCart(product) {
    const wasAdded = addToCart(product);
    showToast(
      wasAdded
        ? 'Đã thêm sản phẩm vào giỏ hàng.'
        : 'Không thể thêm sản phẩm vào giỏ hàng.',
      { type: wasAdded ? 'success' : 'error' },
    );
  }

  function handleToggleFavorite() {
    showToast('Tính năng yêu thích sẽ được hoàn thiện ở bước tiếp theo.');
  }

  return (
    <main className="flex-1 py-12 sm:py-16">
      <section className="page-container grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-wide text-muted">
            {appName}
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-6xl">
            Đồ dùng đẹp, gọn gàng cho mỗi ngày.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-muted sm:text-lg">
            Những sản phẩm được chọn lọc với thiết kế tối giản, ưu tiên công
            năng và sự bền bỉ.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button as="link" to="/shop">
              Xem cửa hàng
            </Button>
            <Link
              to="/shop"
              className="inline-flex min-h-10 items-center rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground transition hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              Khám phá bộ sưu tập
            </Link>
          </div>
        </div>
        <div className="aspect-[4/3] rounded-lg bg-neutral-200 p-6 sm:p-8">
          <div className="flex h-full items-end border border-neutral-300 p-5 sm:p-6">
            <p className="max-w-xs text-sm font-medium text-neutral-600">
              Một không gian sống tốt bắt đầu từ những lựa chọn vừa đủ.
            </p>
          </div>
        </div>
      </section>

      <section className="page-container mt-20">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-medium uppercase tracking-wide text-muted">
              Danh mục
            </p>
            <h2 className="section-heading mt-2">Chọn theo nhu cầu</h2>
          </div>
          <Link
            to="/shop"
            className="hidden text-sm font-medium text-foreground underline-offset-4 hover:underline sm:block"
          >
            Xem tất cả
          </Link>
        </div>
        {categoriesLoading ? (
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {Array.from({ length: 3 }, (_, index) => (
              <Skeleton key={index} className="h-40" />
            ))}
          </div>
        ) : categoriesError ? (
          <ErrorState
            message={getUserErrorMessage(
              categoriesError,
              'Không thể tải danh mục sản phẩm.',
            )}
            action={
              <Button variant="outline" onClick={refetchCategories}>
                Thử lại
              </Button>
            }
          />
        ) : categories.length > 0 ? (
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {categories.map((category, index) => (
              <Link
                key={category.name}
                to={`/shop?category=${encodeURIComponent(category.name)}`}
              >
                <Card className="group h-full transition hover:-translate-y-0.5 hover:shadow-panel">
                  <CardContent className="p-0">
                    <div
                      className={`h-2 ${index === 1 ? 'bg-neutral-400' : 'bg-neutral-200'}`}
                    />
                    <div className="p-6">
                      <p className="text-sm font-medium text-muted">
                        {String(index + 1).padStart(2, '0')}
                      </p>
                      <h3 className="mt-8 break-words text-lg font-semibold text-foreground group-hover:underline">
                        {category.name}
                      </h3>
                      <p className="mt-2 text-sm text-muted">
                        {category.detail || 'Khám phá sản phẩm trong danh mục.'}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <EmptyState
            title="Chưa có danh mục"
            description="Danh mục đang được cập nhật."
          />
        )}
      </section>

      <section className="page-container mt-20">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-medium uppercase tracking-wide text-muted">
              Gợi ý cho bạn
            </p>
            <h2 className="section-heading mt-2">Sản phẩm nổi bật</h2>
          </div>
          <Link
            to="/shop"
            className="text-sm font-medium text-foreground underline-offset-4 hover:underline"
          >
            Đi đến cửa hàng
          </Link>
        </div>
        {productsLoading ? (
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }, (_, index) => (
              <Skeleton key={index} className="aspect-[4/3]" />
            ))}
          </div>
        ) : productsError ? (
          <ErrorState
            message={getUserErrorMessage(
              productsError,
              'Không thể tải sản phẩm nổi bật.',
            )}
            action={
              <Button variant="outline" onClick={refetchProducts}>
                Thử lại
              </Button>
            }
          />
        ) : products.length > 0 ? (
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {products.slice(0, 3).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
                onToggleFavorite={handleToggleFavorite}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            title="Chưa có sản phẩm"
            description="Danh sách sản phẩm đang được cập nhật."
            action={
              <Button as="link" to="/shop">
                Xem cửa hàng
              </Button>
            }
          />
        )}
      </section>
    </main>
  );
}

export default Home;
