import { useEffect, useMemo, useState } from 'react';
import { Heart } from 'lucide-react';
import { Link, Navigate, useParams } from 'react-router-dom';
import ProductCard from '../components/product/ProductCard.jsx';
import Badge from '../components/ui/Badge.jsx';
import Button from '../components/ui/Button.jsx';
import Card, { CardContent } from '../components/ui/Card.jsx';
import ErrorState from '../components/ui/ErrorState.jsx';
import Skeleton from '../components/ui/Skeleton.jsx';
import useProductDetail from '../hooks/useProductDetail.js';
import useProducts from '../hooks/useProducts.js';
import { useCart } from '../context/CartContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import { formatCurrency } from '../utils/format.js';
import { getUserErrorMessage } from '../utils/errors.js';

function ProductDetail() {
  const { id } = useParams();
  const { product, loading, error, refetch } = useProductDetail(id);
  const { addItem } = useCart();
  const { showToast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [addingToCart, setAddingToCart] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const {
    products: relatedProducts,
    loading: relatedLoading,
    error: relatedError,
  } = useProducts({
    category: product?.category,
    page: 1,
    enabled: Boolean(product?.category),
  });

  const related = useMemo(
    () =>
      relatedProducts
        .filter(
          (item) =>
            item.id !== product?.id && item.category === product?.category,
        )
        .slice(0, 4),
    [product?.category, product?.id, relatedProducts],
  );

  const gallery = useMemo(
    () => product?.images?.filter(Boolean) || ['/product-placeholder.svg'],
    [product],
  );
  const stockLimit = typeof product?.stock === 'number' ? product.stock : null;
  const isOutOfStock = stockLimit === 0;

  useEffect(() => {
    setQuantity(1);
    setActiveImage(0);
    setAddedToCart(false);
    setIsFavorite(false);
  }, [id, product?.id]);

  if (!loading && !product && !error) return <Navigate to="/404" replace />;

  if (loading) {
    return (
      <main className="flex-1 py-12">
        <section className="page-container grid gap-10 lg:grid-cols-2">
          <Skeleton className="aspect-square" />
          <div className="space-y-4 lg:pt-8">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-8 w-36" />
            <Skeleton className="h-24 w-full" />
          </div>
        </section>
      </main>
    );
  }

  if (error && !product) {
    return (
      <main className="flex-1 py-12">
        <section className="page-container">
          <ErrorState
            message={getUserErrorMessage(
              error,
              'Không thể tải chi tiết sản phẩm. Vui lòng thử lại.',
            )}
            action={
              <div className="flex flex-wrap justify-center gap-3">
                <Button variant="outline" onClick={refetch}>
                  Thử lại
                </Button>
                <Button as="link" to="/products" variant="ghost">
                  Quay lại sản phẩm
                </Button>
              </div>
            }
          />
        </section>
      </main>
    );
  }

  if (!product) return <Navigate to="/404" replace />;

  function setSafeQuantity(value) {
    const numericValue = Math.max(1, Math.floor(Number(value) || 1));
    setQuantity(
      stockLimit === null ? numericValue : Math.min(numericValue, stockLimit),
    );
    setAddedToCart(false);
  }

  async function handleAddToCart() {
    if (isOutOfStock || addingToCart) return;
    setAddingToCart(true);
    await new Promise((resolve) => setTimeout(resolve, 200));
    const wasAdded = addItem(product, quantity);
    if (!wasAdded) {
      showToast('Không thể thêm sản phẩm vào giỏ hàng.', { type: 'error' });
      setAddingToCart(false);
      return;
    }
    showToast('Đã thêm sản phẩm vào giỏ hàng.');
    setAddedToCart(true);
    setAddingToCart(false);
  }

  function handleToggleFavorite() {
    setIsFavorite((current) => {
      const nextValue = !current;
      showToast(
        nextValue
          ? 'Đã thêm sản phẩm vào yêu thích.'
          : 'Đã bỏ sản phẩm khỏi yêu thích.',
      );
      return nextValue;
    });
  }

  function handleRelatedAddToCart(relatedProduct) {
    const wasAdded = addItem(relatedProduct);
    showToast(
      wasAdded
        ? 'Đã thêm sản phẩm vào giỏ hàng.'
        : 'Không thể thêm sản phẩm vào giỏ hàng.',
      { type: wasAdded ? 'success' : 'error' },
    );
  }

  function handleRelatedToggleFavorite() {
    showToast('Tính năng yêu thích sẽ được hoàn thiện ở bước tiếp theo.');
  }

  return (
    <main className="flex-1 py-12">
      <section className="page-container">
        <Link
          to="/products"
          className="text-sm text-muted underline-offset-4 hover:text-foreground hover:underline"
        >
          Quay lại Shop
        </Link>

        <div className="mt-6 grid gap-10 lg:grid-cols-2 lg:items-start">
          <div>
            <div className="aspect-square overflow-hidden rounded-lg border border-border bg-neutral-100">
              <img
                src={gallery[activeImage]}
                alt={product.name}
                loading="lazy"
                className="h-full w-full object-contain"
              />
            </div>
            {gallery.length > 1 && (
              <div className="mt-3 grid grid-cols-4 gap-3">
                {gallery.map((image, index) => (
                  <button
                    key={`${image}-${index}`}
                    type="button"
                    onClick={() => setActiveImage(index)}
                    className={`aspect-square overflow-hidden rounded-md border bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                      activeImage === index ? 'border-accent' : 'border-border'
                    }`}
                    aria-label={`Xem ảnh ${index + 1}`}
                  >
                    <img
                      src={image}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-contain"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="lg:pt-8">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="neutral">{product.category || 'Sản phẩm'}</Badge>
              {product.rating > 0 && (
                <span className="text-sm text-muted">
                  Đánh giá {product.rating}/5
                  {product.ratingCount > 0
                    ? ` (${product.ratingCount} lượt)`
                    : ''}
                </span>
              )}
            </div>
            <h1 className="mt-3 break-words text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              {product.name}
            </h1>
            <p className="mt-4 break-words text-2xl font-semibold text-foreground">
              {formatCurrency(product.price)}
            </p>
            <p className="mt-6 max-w-lg leading-7 text-muted">
              {product.description ||
                'Thông tin chi tiết sản phẩm đang được cập nhật.'}
            </p>
            <p className="mt-4 text-sm text-muted">
              {isOutOfStock
                ? 'Tạm hết hàng'
                : stockLimit === null
                  ? 'Sẵn sàng đặt hàng'
                  : `Còn ${stockLimit} sản phẩm`}
            </p>

            <Card className="mt-8">
              <CardContent className="space-y-5 p-5">
                <div>
                  <label
                    htmlFor="quantity"
                    className="text-sm font-medium text-foreground"
                  >
                    Số lượng
                  </label>
                  <div className="mt-2 flex w-fit items-center rounded-md border border-border">
                    <button
                      type="button"
                      onClick={() => setSafeQuantity(quantity - 1)}
                      disabled={isOutOfStock || quantity <= 1}
                      aria-label="Giảm số lượng"
                      className="h-10 w-10 text-lg text-muted hover:bg-neutral-100 hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      -
                    </button>
                    <input
                      id="quantity"
                      type="number"
                      min="1"
                      max={stockLimit || undefined}
                      value={quantity}
                      onChange={(event) => setSafeQuantity(event.target.value)}
                      disabled={isOutOfStock}
                      className="h-10 w-14 border-x border-border bg-transparent text-center text-sm font-medium outline-none focus:ring-2 focus:ring-accent"
                      aria-label="Số lượng sản phẩm"
                    />
                    <button
                      type="button"
                      onClick={() => setSafeQuantity(quantity + 1)}
                      disabled={
                        isOutOfStock ||
                        (stockLimit !== null && quantity >= stockLimit)
                      }
                      aria-label="Tăng số lượng"
                      className="h-10 w-10 text-lg text-muted hover:bg-neutral-100 hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button
                    loading={addingToCart}
                    disabled={isOutOfStock}
                    onClick={handleAddToCart}
                  >
                    {isOutOfStock ? 'Hết hàng' : 'Thêm vào giỏ hàng'}
                  </Button>
                  <Button variant="outline" as="link" to="/cart">
                    Xem giỏ hàng
                  </Button>
                  <Button
                    variant="ghost"
                    leftIcon={<Heart size={16} aria-hidden="true" />}
                    onClick={handleToggleFavorite}
                    aria-pressed={isFavorite}
                  >
                    {isFavorite ? 'Đã yêu thích' : 'Thêm vào yêu thích'}
                  </Button>
                </div>
                {addedToCart && (
                  <p className="text-sm text-foreground" role="status">
                    Đã thêm sản phẩm vào giỏ hàng.
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {!relatedLoading && !relatedError && related.length > 0 && (
          <section className="mt-20 border-t border-border pt-10">
            <p className="text-sm font-medium uppercase tracking-wide text-muted">
              Có thể bạn sẽ thích
            </p>
            <h2 className="section-heading mt-2">Sản phẩm liên quan</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <ProductCard
                  key={item.id}
                  product={item}
                  onAddToCart={handleRelatedAddToCart}
                  onToggleFavorite={handleRelatedToggleFavorite}
                />
              ))}
            </div>
          </section>
        )}
      </section>
    </main>
  );
}

export default ProductDetail;
