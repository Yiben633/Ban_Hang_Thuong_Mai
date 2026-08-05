import { Navigate, Route, Routes } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout.jsx';
import Cart from './pages/Cart.jsx';
import Home from './pages/Home.jsx';
import NotFound from './pages/NotFound.jsx';
import ProductDetail from './pages/ProductDetail.jsx';
import Shop from './pages/Shop.jsx';
import UiPreview from './pages/UiPreview.jsx';

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/ui-preview" element={<UiPreview />} />
        <Route path="/404" element={<NotFound />} />
      </Route>
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
}

export default App;
