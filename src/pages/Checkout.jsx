import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button.jsx';
import Card, {
  CardContent,
  CardHeader,
  CardTitle,
} from '../components/ui/Card.jsx';
import EmptyState from '../components/ui/EmptyState.jsx';
import Input from '../components/ui/Input.jsx';
import { useCart } from '../context/CartContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import { formatCurrency } from '../utils/format.js';

const initialForm = {
  fullName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  note: '',
};

function validateForm(form) {
  const errors = {};
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phonePattern = /^(0|\+84)(3|5|7|8|9)\d{8}$/;
  const normalizedPhone = form.phone.replace(/[\s.-]/g, '');

  if (!form.fullName.trim()) errors.fullName = 'Vui lòng nhập họ tên.';
  if (!form.email.trim()) {
    errors.email = 'Vui lòng nhập email.';
  } else if (!emailPattern.test(form.email.trim())) {
    errors.email = 'Email không đúng định dạng.';
  }
  if (!form.phone.trim()) {
    errors.phone = 'Vui lòng nhập số điện thoại.';
  } else if (!phonePattern.test(normalizedPhone)) {
    errors.phone = 'Số điện thoại không đúng định dạng.';
  }
  if (!form.address.trim()) errors.address = 'Vui lòng nhập địa chỉ.';
  if (!form.city.trim()) errors.city = 'Vui lòng nhập thành phố.';

  return errors;
}

function Checkout() {
  const { cartItems, subtotal, clearCart } = useCart();
  const { showToast } = useToast();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((currentForm) => ({ ...currentForm, [name]: value }));
    setErrors((currentErrors) => ({ ...currentErrors, [name]: '' }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validateForm(form);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) return;

    clearCart();
    setSubmitted(true);
    showToast('Đặt hàng mô phỏng thành công.');
  }

  if (cartItems.length === 0 && !submitted) {
    return (
      <main className="flex-1 py-12 sm:py-16">
        <section className="page-container">
          <p className="text-sm font-medium uppercase tracking-wide text-muted">
            Thanh toán
          </p>
          <h1 className="section-heading mt-2">Hoàn tất đơn hàng</h1>
          <EmptyState
            title="Giỏ hàng đang trống"
            description="Bạn cần thêm sản phẩm vào giỏ trước khi chuyển đến checkout."
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

  if (submitted) {
    return (
      <main className="flex-1 py-12 sm:py-16">
        <section className="page-container">
          <EmptyState
            title="Đặt hàng mô phỏng thành công"
            description="Đây chỉ là luồng thử nghiệm, chưa có thanh toán hoặc giao hàng thật."
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
    <main className="flex-1 py-12 sm:py-16">
      <section className="page-container">
        <p className="text-sm font-medium uppercase tracking-wide text-muted">
          Thanh toán mô phỏng
        </p>
        <h1 className="section-heading mt-2">Thông tin đặt hàng</h1>
        <p className="mt-3 max-w-xl text-sm text-muted">
          Nhập thông tin nhận hàng để hoàn tất luồng thử nghiệm.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
          <Card>
            <CardHeader>
              <CardTitle>Thông tin khách hàng</CardTitle>
            </CardHeader>
            <CardContent>
              <form
                id="checkout-form"
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <Input
                    label="Họ tên"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    error={errors.fullName}
                    autoComplete="name"
                    required
                  />
                  <Input
                    label="Email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    error={errors.email}
                    autoComplete="email"
                    required
                  />
                  <Input
                    label="Số điện thoại"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    error={errors.phone}
                    autoComplete="tel"
                    required
                  />
                  <Input
                    label="Thành phố"
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    error={errors.city}
                    autoComplete="address-level2"
                    required
                  />
                </div>
                <Input
                  label="Địa chỉ"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  error={errors.address}
                  autoComplete="street-address"
                  required
                />
                <div className="space-y-1.5">
                  <label
                    htmlFor="checkout-note"
                    className="block text-sm font-medium text-foreground"
                  >
                    Ghi chú
                  </label>
                  <textarea
                    id="checkout-note"
                    name="note"
                    value={form.note}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Ghi chú thêm cho đơn hàng"
                    className="block w-full resize-y rounded-md border border-border bg-surface px-3 py-2 text-sm text-foreground shadow-subtle outline-none transition placeholder:text-muted focus:border-foreground focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background"
                  />
                </div>
                <Button type="submit" className="w-full sm:w-auto">
                  Đặt hàng
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tóm tắt đơn hàng</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {cartItems.map(({ product, quantity }) => (
                  <div key={product.id} className="flex gap-3">
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      className="h-14 w-14 shrink-0 rounded-md bg-neutral-100 object-contain"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="line-clamp-2 text-sm font-medium text-foreground">
                        {product.name}
                      </p>
                      <p className="mt-1 text-xs text-muted">
                        {quantity} x {formatCurrency(product.price)}
                      </p>
                    </div>
                    <p className="whitespace-nowrap text-sm font-medium text-foreground">
                      {formatCurrency(product.price * quantity)}
                    </p>
                  </div>
                ))}
              </div>
              <div className="flex justify-between gap-4 border-t border-border pt-4 font-semibold text-foreground">
                <span>Tổng tiền</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <p className="text-xs leading-5 text-muted">
                Đây là checkout mô phỏng. Chưa tích hợp thanh toán thật.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}

export default Checkout;
