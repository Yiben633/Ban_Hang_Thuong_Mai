import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import Button from '../components/ui/Button.jsx';
import Card, {
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../components/ui/Card.jsx';
import EmptyState from '../components/ui/EmptyState.jsx';
import Modal from '../components/ui/Modal.jsx';
import { formatCurrency } from '../utils/format.js';

function Cart() {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const {
    cartItems,
    totalQuantity,
    subtotal,
    removeItem,
    updateQuantity,
    clearCart,
  } = useCart();
  const { showToast } = useToast();

  function handleQuantityChange(productId, value) {
    const nextQuantity = Math.max(1, Math.floor(Number(value) || 1));
    updateQuantity(productId, nextQuantity);
  }

  function handleClearCart() {
    clearCart();
    setConfirmOpen(false);
    showToast('Đã xóa toàn bộ giỏ hàng.');
  }

  function handleRemoveItem(productId) {
    removeItem(productId);
    showToast('Đã xóa sản phẩm khỏi giỏ hàng.');
  }

  if (cartItems.length === 0) {
    return (
      <main className="flex-1 py-12">
        <section className="page-container">
          <p className="text-sm font-medium uppercase tracking-wide text-muted">
            Giỏ hàng
          </p>
          <h1 className="section-heading mt-2">Kiểm tra đơn hàng</h1>
          <EmptyState
            title="Giỏ hàng đang trống"
            description="Thêm sản phẩm từ cửa hàng để bắt đầu đơn hàng của bạn."
            action={
              <Button as="link" to="/shop">
                Tiếp tục mua hàng
              </Button>
            }
            className="border-y border-border"
          />
        </section>
      </main>
    );
  }

  return (
    <main className="flex-1 py-12">
      <section className="page-container">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-medium uppercase tracking-wide text-muted">
              Giỏ hàng
            </p>
            <h1 className="section-heading mt-2">Kiểm tra đơn hàng</h1>
          </div>
          <Button variant="ghost" onClick={() => setConfirmOpen(true)}>
            Xóa tất cả
          </Button>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_360px] lg:items-start">
          <Card>
            <CardHeader>
              <CardTitle>{totalQuantity} sản phẩm</CardTitle>
            </CardHeader>
            <CardContent className="divide-y divide-border p-0">
              {cartItems.map(({ product, quantity }) => {
                const stockLimit =
                  typeof product.stock === 'number' ? product.stock : null;
                return (
                  <div
                    key={product.id}
                    className="flex flex-col gap-4 p-5 sm:flex-row sm:items-start"
                  >
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        loading="lazy"
                        decoding="async"
                        className="h-20 w-20 shrink-0 rounded-md bg-neutral-100 object-contain"
                      />
                    ) : (
                      <div
                        className={`h-20 w-20 shrink-0 rounded-md ${product.tone || 'bg-neutral-200'}`}
                        aria-hidden="true"
                      />
                    )}
                    <div className="min-w-0 flex-1">
                      <Link
                        to={`/product/${product.id}`}
                        className="break-words font-medium text-foreground hover:underline"
                      >
                        {product.name}
                      </Link>
                      <p className="mt-1 text-sm text-muted">
                        {formatCurrency(product.price)}
                      </p>
                      <div className="mt-3 flex flex-wrap items-center gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(product.id, quantity - 1)
                          }
                          aria-label={`Giảm số lượng ${product.name}`}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border text-muted hover:bg-neutral-100 hover:text-foreground"
                        >
                          -
                        </button>
                        <input
                          type="number"
                          min="1"
                          max={stockLimit || undefined}
                          value={quantity}
                          onChange={(event) =>
                            handleQuantityChange(product.id, event.target.value)
                          }
                          aria-label={`Số lượng ${product.name}`}
                          className="h-8 w-14 rounded-md border border-border bg-surface text-center text-sm font-medium outline-none focus:ring-2 focus:ring-accent"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(product.id, quantity + 1)
                          }
                          disabled={
                            stockLimit !== null && quantity >= stockLimit
                          }
                          aria-label={`Tăng số lượng ${product.name}`}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border text-muted hover:bg-neutral-100 hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          +
                        </button>
                        <button
                          type="button"
                          onClick={() => handleRemoveItem(product.id)}
                          className="ml-2 text-xs text-muted underline-offset-4 hover:text-foreground hover:underline"
                        >
                          Xóa
                        </button>
                      </div>
                    </div>
                    <p className="whitespace-nowrap text-sm font-medium text-foreground sm:ml-auto">
                      {formatCurrency(product.price * quantity)}
                    </p>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tóm tắt đơn hàng</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between gap-4 text-muted">
                <span>Tạm tính</span>
                <span className="text-foreground">
                  {formatCurrency(subtotal)}
                </span>
              </div>
              <div className="flex justify-between gap-4 text-muted">
                <span>Vận chuyển</span>
                <span className="text-foreground">Miễn phí</span>
              </div>
              <div className="flex justify-between gap-4 border-t border-border pt-4 font-semibold text-foreground">
                <span>Tổng cộng</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
            </CardContent>
            <CardFooter className="grid gap-3">
              <Button className="w-full">Tiến hành thanh toán</Button>
              <Link
                to="/shop"
                className="text-center text-sm text-muted hover:text-foreground hover:underline"
              >
                Tiếp tục mua hàng
              </Link>
            </CardFooter>
          </Card>
        </div>
      </section>
      <Modal
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        title="Xóa giỏ hàng?"
      >
        <p className="text-sm leading-6 text-muted">
          Tất cả sản phẩm trong giỏ hàng sẽ bị xóa. Bạn có muốn tiếp tục?
        </p>
        <div className="mt-6 flex justify-end gap-3">
          <Button variant="outline" onClick={() => setConfirmOpen(false)}>
            Hủy
          </Button>
          <Button variant="danger" onClick={handleClearCart}>
            Xóa giỏ hàng
          </Button>
        </div>
      </Modal>
    </main>
  );
}

export default Cart;
