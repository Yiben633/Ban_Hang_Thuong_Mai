import './ProductCardSkeleton.css';

function ProductCardSkeleton() {
  return (
    <div
      className="product-card-skeleton rounded-lg border border-border bg-surface p-4"
      aria-hidden="true"
    >
      <div className="product-card-skeleton__image rounded-md" />
      <div className="product-card-skeleton__category mt-4 rounded" />
      <div className="product-card-skeleton__title mt-3 rounded" />
      <div className="product-card-skeleton__price mt-4 rounded" />
      <div className="mt-3 grid grid-cols-2 gap-2">
        <div className="product-card-skeleton__button rounded-md" />
        <div className="product-card-skeleton__button rounded-md" />
      </div>
    </div>
  );
}

export default ProductCardSkeleton;
