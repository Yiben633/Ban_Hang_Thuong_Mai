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
import { formatPrice } from '../services/products.js';

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
    showToast('Da xoa toan bo gio hang.');
  }

  function handleRemoveItem(productId) {
    removeItem(productId);
    showToast('Da xoa san pham khoi gio hang.');
  }

  if (cartItems.length === 0) {
    return (
      <main className="flex-1 py-12">
        <section className="page-container">
          <p className="text-sm font-medium uppercase tracking-wide text-muted">
            Gio hang
          </p>
          <h1 className="section-heading mt-2">Kiem tra don hang</h1>
          <EmptyState
            title="Gio hang dang trong"
            description="Them san pham tu cua hang de bat dau don hang cua ban."
            action={
              <Button as="link" to="/shop">
                Tiep tuc mua hang
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
              Gio hang
            </p>
            <h1 className="section-heading mt-2">Kiem tra don hang</h1>
          </div>
          <Button variant="ghost" onClick={() => setConfirmOpen(true)}>
            Xoa tat ca
          </Button>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_360px] lg:items-start">
          <Card>
            <CardHeader>
              <CardTitle>{totalQuantity} san pham</CardTitle>
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
                        {formatPrice(product.price)}
                      </p>
                      <div className="mt-3 flex flex-wrap items-center gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(product.id, quantity - 1)
                          }
                          aria-label={`Giam so luong ${product.name}`}
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
                          aria-label={`So luong ${product.name}`}
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
                          aria-label={`Tang so luong ${product.name}`}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border text-muted hover:bg-neutral-100 hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          +
                        </button>
                        <button
                          type="button"
                          onClick={() => handleRemoveItem(product.id)}
                          className="ml-2 text-xs text-muted underline-offset-4 hover:text-foreground hover:underline"
                        >
                          Xoa
                        </button>
                      </div>
                    </div>
                    <p className="whitespace-nowrap text-sm font-medium text-foreground sm:ml-auto">
                      {formatPrice(product.price * quantity)}
                    </p>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tom tat don hang</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between gap-4 text-muted">
                <span>Tam tinh</span>
                <span className="text-foreground">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between gap-4 text-muted">
                <span>Van chuyen</span>
                <span className="text-foreground">Mien phi</span>
              </div>
              <div className="flex justify-between gap-4 border-t border-border pt-4 font-semibold text-foreground">
                <span>Tong cong</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
            </CardContent>
            <CardFooter className="grid gap-3">
              <Button className="w-full">Tien hanh thanh toan</Button>
              <Link
                to="/shop"
                className="text-center text-sm text-muted hover:text-foreground hover:underline"
              >
                Tiep tuc mua hang
              </Link>
            </CardFooter>
          </Card>
        </div>
      </section>
      <Modal
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        title="Xoa gio hang?"
      >
        <p className="text-sm leading-6 text-muted">
          Tat ca san pham trong gio hang se bi xoa. Ban co muon tiep tuc?
        </p>
        <div className="mt-6 flex justify-end gap-3">
          <Button variant="outline" onClick={() => setConfirmOpen(false)}>
            Huy
          </Button>
          <Button variant="danger" onClick={handleClearCart}>
            Xoa gio hang
          </Button>
        </div>
      </Modal>
    </main>
  );
}

export default Cart;
