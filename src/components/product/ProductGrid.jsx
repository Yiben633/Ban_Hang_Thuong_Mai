import Button from '../ui/Button.jsx';
import EmptyState from '../ui/EmptyState.jsx';
import ErrorState from '../ui/ErrorState.jsx';
import { getUserErrorMessage } from '../../utils/errors.js';
import ProductCard from './ProductCard.jsx';
import ProductCardSkeleton from './ProductCardSkeleton.jsx';

function ProductGrid({
  products = [],
  loading,
  error,
  onRetry,
  onAddToCart,
  onToggleFavorite,
  favoriteLabel,
  emptyTitle = 'Không tìm thấy sản phẩm',
  emptyDescription = 'Thử với từ khóa khác hoặc xóa bộ lọc hiện tại.',
}) {
  if (loading) {
    return (
      <div
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4"
        aria-label="Đang tải sản phẩm"
      >
        {Array.from({ length: 8 }, (_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <ErrorState
        message={getUserErrorMessage(
          error,
          'Không thể tải danh sách sản phẩm. Vui lòng thử lại.',
        )}
        action={
          <Button variant="outline" onClick={onRetry}>
            Thử lại
          </Button>
        }
        className="border-y border-border"
      />
    );
  }

  if (products.length === 0) {
    return <EmptyState title={emptyTitle} description={emptyDescription} />;
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
          onToggleFavorite={onToggleFavorite}
          favoriteLabel={favoriteLabel}
        />
      ))}
    </div>
  );
}

export default ProductGrid;
