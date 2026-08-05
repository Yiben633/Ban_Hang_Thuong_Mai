import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout.jsx';

const Cart = lazy(() => import('../pages/Cart.jsx'));
const Checkout = lazy(() => import('../pages/Checkout.jsx'));
const Favorites = lazy(() => import('../pages/Favorites.jsx'));
const Home = lazy(() => import('../pages/Home.jsx'));
const NotFound = lazy(() => import('../pages/NotFound.jsx'));
const ProductDetail = lazy(() => import('../pages/ProductDetail.jsx'));
const Shop = lazy(() => import('../pages/Shop.jsx'));

function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Shop />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/404" element={<NotFound />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
