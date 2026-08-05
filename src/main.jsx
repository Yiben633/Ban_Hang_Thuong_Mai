import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import { CartProvider } from './context/CartContext.jsx';
import { FavoritesProvider } from './context/FavoritesContext.jsx';
import { ToastProvider } from './context/ToastContext.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <CartProvider>
        <FavoritesProvider>
          <ToastProvider>
            <ErrorBoundary>
              <App />
            </ErrorBoundary>
          </ToastProvider>
        </FavoritesProvider>
      </CartProvider>
    </BrowserRouter>
  </StrictMode>,
);
