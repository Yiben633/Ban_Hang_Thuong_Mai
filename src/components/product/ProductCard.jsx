import { Link } from 'react-router-dom';
import Badge from '../ui/Badge.jsx';
import { formatPrice } from '../../services/products.js';

function ProductCard({ product }) {
  return (
    <Link
      to={`/product/${product.id}`}
      className="group block rounded-lg border border-border bg-surface p-4 shadow-subtle transition hover:-translate-y-0.5 hover:shadow-panel focus-visible:outline-none"
    >
      <div
        className={`mb-4 aspect-[4/3] rounded-md ${product.tone}`}
        aria-hidden="true"
      >
        <div className="flex h-full items-end p-4">
          <span className="text-xs font-medium uppercase tracking-wide text-neutral-500">
            Product image
          </span>
        </div>
      </div>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs text-muted">{product.category}</p>
          <h2 className="mt-1 font-semibold text-foreground group-hover:underline">
            {product.name}
          </h2>
        </div>
        <Badge variant="neutral">Moi</Badge>
      </div>
      <p className="mt-4 text-sm font-medium text-foreground">
        {formatPrice(product.price)}
      </p>
    </Link>
  );
}

export default ProductCard;
