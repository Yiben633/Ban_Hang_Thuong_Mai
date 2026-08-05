import { Link } from 'react-router-dom';
import Button from '../components/ui/Button.jsx';
import Card, {
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../components/ui/Card.jsx';
import { formatPrice, products } from '../services/products.js';

function Cart() {
  const cartItems = [
    { product: products[0], quantity: 1 },
    { product: products[1], quantity: 2 },
  ];
  const subtotal = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );

  return (
    <main className="flex-1 py-12">
      <section className="page-container">
        <div>
          <p className="text-sm font-medium uppercase tracking-wide text-muted">
            Gio hang
          </p>
          <h1 className="section-heading mt-2">Kiem tra don hang</h1>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_360px] lg:items-start">
          <Card>
            <CardHeader>
              <CardTitle>{cartItems.length} san pham</CardTitle>
            </CardHeader>
            <CardContent className="divide-y divide-border p-0">
              {cartItems.map(({ product, quantity }) => (
                <div key={product.id} className="flex gap-4 p-5">
                  <div
                    className={`h-20 w-20 shrink-0 rounded-md ${product.tone}`}
                    aria-hidden="true"
                  />
                  <div className="min-w-0 flex-1">
                    <Link
                      to={`/product/${product.id}`}
                      className="font-medium text-foreground hover:underline"
                    >
                      {product.name}
                    </Link>
                    <p className="mt-1 text-sm text-muted">
                      So luong: {quantity}
                    </p>
                  </div>
                  <p className="text-sm font-medium text-foreground">
                    {formatPrice(product.price * quantity)}
                  </p>
                </div>
              ))}
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
    </main>
  );
}

export default Cart;
