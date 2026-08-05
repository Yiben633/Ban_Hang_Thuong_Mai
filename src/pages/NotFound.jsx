import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-neutral-50 px-6">
      <section className="max-w-md text-center">
        <p className="text-sm font-medium uppercase tracking-wide text-neutral-500">
          404
        </p>
        <h1 className="mt-3 text-3xl font-bold text-neutral-950">
          Khong tim thay trang
        </h1>
        <p className="mt-4 leading-8 text-neutral-600">
          Duong dan nay khong ton tai hoac da duoc di chuyen.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex rounded-lg bg-neutral-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
        >
          Ve trang chu
        </Link>
      </section>
    </main>
  );
}

export default NotFound;
