import { Link } from 'react-router-dom';

function Cart() {
  return (
    <main className="min-h-screen bg-neutral-50 px-6 py-12">
      <section className="mx-auto max-w-4xl rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-medium uppercase tracking-wide text-neutral-500">
          Gio hang
        </p>
        <h1 className="mt-3 text-3xl font-bold text-neutral-950">
          Gio hang cua ban dang san sang de phat trien.
        </h1>
        <p className="mt-4 leading-8 text-neutral-600">
          Trang placeholder cho danh sach san pham, cap nhat so luong, tong tien
          va thanh toan.
        </p>
        <Link
          to="/shop"
          className="mt-6 inline-flex rounded-lg bg-neutral-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
        >
          Tiep tuc mua hang
        </Link>
      </section>
    </main>
  );
}

export default Cart;
