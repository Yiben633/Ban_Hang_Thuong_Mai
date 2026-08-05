import { Link } from 'react-router-dom';
import Button from '../components/ui/Button.jsx';

function NotFound() {
  return (
    <main className="flex min-h-[60vh] flex-1 items-center justify-center px-6 py-16">
      <section className="max-w-md text-center">
        <p className="text-sm font-medium uppercase tracking-wide text-neutral-500">
          404
        </p>
        <h1 className="mt-3 text-3xl font-bold text-neutral-950">
          Không tìm thấy trang
        </h1>
        <p className="mt-4 leading-8 text-neutral-600">
          Đường dẫn này không tồn tại hoặc đã được di chuyển.
        </p>
        <Button as="link" to="/" className="mt-6">
          Về trang chủ
        </Button>
      </section>
    </main>
  );
}

export default NotFound;
