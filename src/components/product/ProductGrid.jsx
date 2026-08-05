import Button from '../ui/Button.jsx';
import EmptyState from '../ui/EmptyState.jsx';
import ErrorState from '../ui/ErrorState.jsx';
import Skeleton from '../ui/Skeleton.jsx';
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

function ProductGrid({ products = [], loading, error, onRetry }) {
  if (loading) {
    return (
      <div
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4"
        aria-label="Loading products"
      >
        {Array.from({ length: 6 }, (_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  return (
    <>
      {error && (
        <ErrorState
          message={`${error.message} Dang hien thi du lieu demo de ban tiep tuc xem san pham.`}
          action={
            <Button variant="outline" onClick={onRetry}>
              Thu lai
            </Button>
          }
          className="border-y border-border"
        />
      )}
      {products.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="Khong tim thay san pham"
          description="Thu voi tu khoa khac hoac xoa bo loc hien tai."
        />
      )}
    </>
  );
}

export default ProductGrid;
