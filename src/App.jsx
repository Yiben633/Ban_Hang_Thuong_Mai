import { Suspense } from 'react';
import Skeleton from './components/ui/Skeleton.jsx';
import AppRoutes from './routes/AppRoutes.jsx';

function RouteLoading() {
  return (
    <main className="flex-1 py-12">
      <section className="page-container space-y-4" aria-label="Đang tải trang">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-10 w-2/3 max-w-md" />
        <Skeleton className="h-40 w-full" />
      </section>
    </main>
  );
}

function App() {
  return (
    <Suspense fallback={<RouteLoading />}>
      <AppRoutes />
    </Suspense>
  );
}

export default App;
