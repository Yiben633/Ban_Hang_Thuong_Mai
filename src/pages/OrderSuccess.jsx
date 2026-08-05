import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button.jsx';
import Card, {
  CardContent,
  CardHeader,
  CardTitle,
} from '../components/ui/Card.jsx';
import EmptyState from '../components/ui/EmptyState.jsx';
import { formatCurrency } from '../utils/format.js';

const LAST_ORDER_STORAGE_KEY = 'mono-store-last-order';

function readLatestOrder() {
  try {
    const storedOrder = window.localStorage.getItem(LAST_ORDER_STORAGE_KEY);
    const order = storedOrder ? JSON.parse(storedOrder) : null;
    if (!order || !order.orderId || !Array.isArray(order.items)) return null;

    const items = order.items
      .filter((item) => item && item.id !== undefined && item.id !== null)
      .map((item) => ({
        ...item,
        name: item.name || 'Sản phẩm',
        price: Number(item.price) || 0,
        quantity: Math.max(1, Math.floor(Number(item.quantity) || 1)),
        subtotal: Number(item.subtotal) || 0,
      }));

    return items.length > 0 ? { ...order, items } : null;
  } catch {
    return null;
  }
}

function OrderSuccess() {
  const order = useMemo(readLatestOrder, []);

  if (!order) {
    return (
      <main className="flex-1 py-12 sm:py-16">
        <section className="page-container">
          <EmptyState
            title="Không tìm thấy đơn hàng"
            description="Đơn hàng mô phỏng gần nhất chưa có hoặc đã bị xóa khỏi thiết bị."
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

  const createdAt = new Date(order.createdAt).toLocaleString('vi-VN');

  return (
    <main className="flex-1 py-12 sm:py-16">
      <section className="page-container">
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-wide text-muted">
            Đặt hàng mô phỏng
          </p>
          <h1 className="section-heading mt-2">Đặt hàng thành công</h1>
          <p className="mt-3 text-muted">
            Đơn hàng đã được ghi nhận cục bộ trên thiết bị này.
          </p>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_360px] lg:items-start">
          <Card>
            <CardHeader>
              <CardTitle>Chi tiết đơn hàng</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <dl className="grid gap-3 text-sm sm:grid-cols-2">
                <div>
                  <dt className="text-muted">Mã đơn hàng</dt>
                  <dd className="mt-1 break-all font-medium text-foreground">
                    {order.orderId}
                  </dd>
                </div>
                <div>
                  <dt className="text-muted">Thời gian</dt>
                  <dd className="mt-1 font-medium text-foreground">
                    {createdAt}
                  </dd>
                </div>
                <div>
                  <dt className="text-muted">Người nhận</dt>
                  <dd className="mt-1 font-medium text-foreground">
                    {order.customer?.fullName || 'Khách hàng'}
                  </dd>
                </div>
                <div>
                  <dt className="text-muted">Thành phố</dt>
                  <dd className="mt-1 font-medium text-foreground">
                    {order.customer?.city || 'Chưa cập nhật'}
                  </dd>
                </div>
              </dl>
              <p className="border-t border-border pt-4 text-xs leading-5 text-muted">
                Đây là quy trình mô phỏng. Không có dữ liệu nào được gửi đến
                cổng thanh toán hoặc dịch vụ bên ngoài.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tóm tắt sản phẩm</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {order.items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      loading="lazy"
                      className="h-12 w-12 shrink-0 rounded-md bg-neutral-100 object-contain"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="line-clamp-2 break-words text-sm font-medium text-foreground">
                        {item.name}
                      </p>
                      <p className="mt-1 text-xs text-muted">
                        Số lượng: {item.quantity}
                      </p>
                    </div>
                    <p className="whitespace-nowrap text-sm font-medium text-foreground">
                      {formatCurrency(item.subtotal)}
                    </p>
                  </div>
                ))}
              </div>
              <div className="flex justify-between gap-4 border-t border-border pt-4 font-semibold text-foreground">
                <span>Tổng tiền</span>
                <span>{formatCurrency(order.total)}</span>
              </div>
              <Link
                to="/shop"
                className="inline-flex text-sm font-medium text-foreground underline-offset-4 hover:underline"
              >
                Tiếp tục mua hàng
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}

export default OrderSuccess;
