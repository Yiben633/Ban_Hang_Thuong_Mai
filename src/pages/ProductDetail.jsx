import { useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import Button from '../components/ui/Button.jsx';
import Card, { CardContent } from '../components/ui/Card.jsx';
import { formatPrice, products } from '../services/products.js';

function ProductDetail() {
  const { id } = useParams();
  const product = products.find((item) => item.id === id);
  const [quantity, setQuantity] = useState(1);

  if (!product) return <Navigate to="/404" replace />;

  return (
    <main className="flex-1 py-12">
      <section className="page-container">
        <Link
          to="/shop"
          className="text-sm text-muted underline-offset-4 hover:text-foreground hover:underline"
        >
          ← Quay lai Shop
        </Link>
        <div className="mt-6 grid gap-10 lg:grid-cols-2 lg:items-start">
          <div
            className={`aspect-square rounded-lg ${product.tone} p-6 sm:p-10`}
          >
            <div className="flex h-full items-end border border-neutral-300 p-5 sm:p-6">
              <span className="text-sm font-medium uppercase tracking-wide text-neutral-500">
                Product image
              </span>
            </div>
          </div>
          <div className="lg:pt-8">
            <p className="text-sm font-medium uppercase tracking-wide text-muted">
              {product.category}
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              {product.name}
            </h1>
            <p className="mt-4 text-2xl font-semibold text-foreground">
              {formatPrice(product.price)}
            </p>
            <p className="mt-6 max-w-lg leading-7 text-muted">
              {product.description}
            </p>

            <Card className="mt-8">
              <CardContent className="space-y-5 p-5">
                <div>
                  <label
                    htmlFor="quantity"
                    className="text-sm font-medium text-foreground"
                  >
                    So luong
                  </label>
                  <div className="mt-2 flex w-fit items-center rounded-md border border-border">
                    <button
                      type="button"
                      onClick={() =>
                        setQuantity((value) => Math.max(1, value - 1))
                      }
                      aria-label="Giam so luong"
                      className="h-10 w-10 text-lg text-muted hover:bg-neutral-100 hover:text-foreground"
                    >
                      -
                    </button>
                    <span
                      id="quantity"
                      className="flex h-10 w-10 items-center justify-center border-x border-border text-sm font-medium"
                    >
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity((value) => value + 1)}
                      aria-label="Tang so luong"
                      className="h-10 w-10 text-lg text-muted hover:bg-neutral-100 hover:text-foreground"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button> them vao gio hang </Button>
                  <Button variant="outline" as="link" to="/cart">
                    Xem gio hang
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ProductDetail;
