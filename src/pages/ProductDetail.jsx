import { Link, useParams } from 'react-router-dom';

function ProductDetail() {
  const { id } = useParams();

  return (
    <main className="min-h-screen bg-neutral-50 px-6 py-12">
      <section className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2">
        <div className="aspect-square rounded-2xl bg-neutral-100" />
        <div className="flex flex-col justify-center gap-5">
          <p className="text-sm font-medium uppercase tracking-wide text-neutral-500">
            San pham #{id}
          </p>
          <h1 className="text-3xl font-bold text-neutral-950">
            Chi tiet san pham
          </h1>
          <p className="text-lg leading-8 text-neutral-600">
            Trang placeholder cho thong tin san pham, hinh anh, mo ta, so luong
            va nut them vao gio hang.
          </p>
          <p className="text-2xl font-semibold text-neutral-950">499.000 VND</p>
          <div className="flex flex-wrap gap-3">
            <button className="rounded-lg bg-neutral-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800">
              Them vao gio hang
            </button>
            <Link
              to="/shop"
              className="rounded-lg border border-neutral-300 px-5 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-neutral-100"
            >
              Quay lai shop
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ProductDetail;
