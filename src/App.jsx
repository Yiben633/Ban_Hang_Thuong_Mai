import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout.jsx';
import Skeleton from './components/ui/Skeleton.jsx';

const Cart = lazy(() => import('./pages/Cart.jsx'));
const Home = lazy(() => import('./pages/Home.jsx'));
const NotFound = lazy(() => import('./pages/NotFound.jsx'));
const ProductDetail = lazy(() => import('./pages/ProductDetail.jsx'));
const Shop = lazy(() => import('./pages/Shop.jsx'));

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
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/404" element={<NotFound />} />
        </Route>
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </Suspense>
  );
}

export default App;
