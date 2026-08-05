import { Heart } from 'lucide-react';
import Button from '../components/ui/Button.jsx';
import EmptyState from '../components/ui/EmptyState.jsx';
import ProductGrid from '../components/product/ProductGrid.jsx';
import { useCart } from '../context/CartContext.jsx';
import { useFavorites } from '../context/FavoritesContext.jsx';
import { useToast } from '../context/ToastContext.jsx';

function Favorites() {
  const { favorites, removeFavorite } = useFavorites();
  const { addToCart } = useCart();
  const { showToast } = useToast();

  function handleRemoveFavorite(product) {
    removeFavorite(product.id);
    showToast('Đã bỏ sản phẩm khỏi danh sách yêu thích.');
  }

  function handleAddToCart(product) {
    const wasAdded = addToCart(product);
    showToast(
      wasAdded
        ? 'Đã thêm sản phẩm vào giỏ hàng.'
        : 'Không thể thêm sản phẩm vào giỏ hàng.',
      { type: wasAdded ? 'success' : 'error' },
    );
  }

  return (
    <main className="flex-1 py-12 sm:py-16">
      <section className="page-container">
        <p className="text-sm font-medium uppercase tracking-wide text-muted">
          Yêu thích
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Sản phẩm yêu thích
        </h1>
        {favorites.length === 0 ? (
          <EmptyState
            icon={<Heart size={28} aria-hidden="true" />}
            title="Chưa có sản phẩm yêu thích"
            description="Lưu những sản phẩm bạn quan tâm để xem lại nhanh hơn."
            action={
              <Button as="link" to="/shop">
                Khám phá sản phẩm
              </Button>
            }
            className="border-y border-border"
          />
        ) : (
          <div className="mt-8">
            <ProductGrid
              products={favorites}
              onAddToCart={handleAddToCart}
              onToggleFavorite={handleRemoveFavorite}
              favoriteLabel="Bỏ yêu thích"
            />
          </div>
        )}
      </section>
    </main>
  );
}

export default Favorites;
