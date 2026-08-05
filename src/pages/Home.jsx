import { Link } from 'react-router-dom';

function Home() {
  return (
    <main className="min-h-screen bg-neutral-50 px-6 py-16">
      <section className="mx-auto flex max-w-5xl flex-col gap-6">
        <p className="text-sm font-medium uppercase tracking-wide text-neutral-500">
          Website ban hang
        </p>
        <h1 className="max-w-3xl text-4xl font-bold text-neutral-950 md:text-6xl">
          Khoi tao giao dien ban hang hien dai voi React va Vite.
        </h1>
        <p className="max-w-2xl text-lg leading-8 text-neutral-600">
          Trang chu placeholder san sang de phat trien hero, danh muc noi bat va
          san pham ban chay.
        </p>
        <div>
          <Link
            to="/shop"
            className="inline-flex rounded-lg bg-neutral-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
          >
            Xem cua hang
          </Link>
        </div>
      </section>
    </main>
  );
}

export default Home;
