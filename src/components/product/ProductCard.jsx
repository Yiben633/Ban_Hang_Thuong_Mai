import { Link } from 'react-router-dom';
import Badge from '../ui/Badge.jsx';
import Button from '../ui/Button.jsx';
import { formatPrice } from '../../services/products.js';

function ProductCard({ product }) {
  return (
    <article className="group rounded-lg border border-border bg-surface p-4 shadow-subtle transition hover:-translate-y-0.5 hover:shadow-panel">
      <Link
        to={`/product/${product.id}`}
        className="block focus-visible:outline-none"
        aria-label={`Xem chi tiet ${product.name}`}
      >
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="mb-4 aspect-[4/3] w-full rounded-md bg-neutral-100 object-contain"
          />
        ) : (
          <div
            className={`mb-4 aspect-[4/3] rounded-md ${product.tone || 'bg-neutral-200'}`}
            aria-hidden="true"
          />
        )}
      </Link>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs text-muted">{product.category}</p>
          <h2 className="mt-1 font-semibold text-foreground group-hover:underline">
            {product.name}
          </h2>
        </div>
        <Badge variant="neutral">Moi</Badge>
      </div>
      <div className="mt-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-foreground">
            {formatPrice(product.price)}
          </p>
          {product.rating > 0 && (
            <p className="mt-1 text-xs text-muted">
              Danh gia {product.rating}/5
            </p>
          )}
        </div>
        <Button as="link" to={`/product/${product.id}`} variant="outline">
          Xem chi tiet
        </Button>
      </div>
    </article>
  );
}

export default ProductCard;
