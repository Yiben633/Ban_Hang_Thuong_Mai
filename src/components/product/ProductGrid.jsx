import Button from '../ui/Button.jsx';
import EmptyState from '../ui/EmptyState.jsx';
import ErrorState from '../ui/ErrorState.jsx';
import Skeleton from '../ui/Skeleton.jsx';
import { getUserErrorMessage } from '../../utils/errors.js';
import ProductCard from './ProductCard.jsx';

function ProductCardSkeleton() {
  return (
    <div className="rounded-lg border border-border bg-surface p-4">
      <Skeleton className="aspect-[4/3]" />
      <Skeleton className="mt-4 h-3 w-20" />
      <Skeleton className="mt-3 h-5 w-3/4" />
      <Skeleton className="mt-4 h-4 w-28" />
    </div>
  );
}

function ProductGrid({
  products = [],
  loading,
  error,
  onRetry,
  emptyTitle = 'Không tìm thấy sản phẩm',
  emptyDescription = 'Thử với từ khóa khác hoặc xóa bộ lọc hiện tại.',
}) {
  if (loading) {
    return (
      <div
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4"
        aria-label="Đang tải sản phẩm"
      >
        {Array.from({ length: 6 }, (_, index) => (
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
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductGrid;
