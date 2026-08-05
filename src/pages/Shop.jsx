import { Link } from 'react-router-dom';

const placeholderProducts = [
  { id: 1, name: 'San pham mau 1', price: '499.000 VND' },
  { id: 2, name: 'San pham mau 2', price: '799.000 VND' },
  { id: 3, name: 'San pham mau 3', price: '1.099.000 VND' },
];

function Shop() {
  return (
    <main className="min-h-screen bg-neutral-50 px-6 py-12">
      <section className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-3">
          <p className="text-sm font-medium uppercase tracking-wide text-neutral-500">
            Shop
          </p>
          <h1 className="text-3xl font-bold text-neutral-950">
            Danh sach san pham
          </h1>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {placeholderProducts.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="mb-4 aspect-square rounded-lg bg-neutral-100" />
              <h2 className="font-semibold text-neutral-950">{product.name}</h2>
              <p className="mt-2 text-neutral-600">{product.price}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Shop;
