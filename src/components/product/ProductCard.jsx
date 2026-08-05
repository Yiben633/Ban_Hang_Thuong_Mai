import { Heart, ShoppingCart } from 'lucide-react';
import { memo, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button.jsx';
import { formatCurrency } from '../../utils/format.js';
import './ProductCard.css';

const FALLBACK_IMAGE = '/product-placeholder.svg';

const ProductCard = memo(function ProductCard({
  product,
  onAddToCart,
  onToggleFavorite,
  favoriteLabel = 'Yêu thích',
}) {
  const [imageSrc, setImageSrc] = useState(product.image || FALLBACK_IMAGE);

  function handleImageError() {
    setImageSrc(FALLBACK_IMAGE);
  }

  return (
    <article className="product-card group rounded-lg border border-border bg-surface p-4 shadow-subtle transition hover:-translate-y-0.5 hover:shadow-panel">
      <Link
        to={`/products/${product.id}`}
        className="block focus-visible:outline-none"
        aria-label={`Xem chi tiết ${product.name}`}
      >
        <img
          src={imageSrc}
          alt={product.name}
          loading="lazy"
          decoding="async"
          onError={handleImageError}
          className="product-card__image mb-4 aspect-[4/3] w-full rounded-md bg-neutral-100 object-contain"
        />
      </Link>
      <div>
        <p className="text-xs text-muted">{product.category || 'Sản phẩm'}</p>
        <h2 className="product-card__title mt-1 font-semibold text-foreground group-hover:underline">
          {product.name}
        </h2>
      </div>
      <div className="mt-4 flex items-end justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-medium text-foreground">
            {formatCurrency(product.price)}
          </p>
          {product.rating > 0 && (
            <p className="mt-1 text-xs text-muted">
              Đánh giá {product.rating}/5
              {product.ratingCount > 0 ? ` (${product.ratingCount})` : ''}
            </p>
          )}
        </div>
        <Button
          as="link"
          to={`/products/${product.id}`}
          variant="outline"
          className="shrink-0 px-3 text-xs sm:px-4 sm:text-sm"
        >
          Xem chi tiết
        </Button>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <Button
          variant="secondary"
          leftIcon={<ShoppingCart size={16} aria-hidden="true" />}
          onClick={() => onAddToCart?.(product)}
          className="min-w-0 px-2 text-xs sm:px-3 sm:text-sm"
        >
          Thêm vào giỏ
        </Button>
        <Button
          variant="ghost"
          leftIcon={<Heart size={16} aria-hidden="true" />}
          onClick={() => onToggleFavorite?.(product)}
          className="min-w-0 px-2 text-xs sm:px-3 sm:text-sm"
        >
          {favoriteLabel}
        </Button>
      </div>
    </article>
  );
});

export default ProductCard;
