import { useEffect, useState } from 'react';
import { Menu, Search, ShoppingCart, X } from 'lucide-react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { appName } from '../../config/env.js';
import { useCart } from '../../context/CartContext.jsx';
import { useFavorites } from '../../context/FavoritesContext.jsx';
import { cn } from '../ui/cn.js';

const navigation = [
  { label: 'Trang chủ', to: '/', end: true },
  { label: 'Cửa hàng', to: '/shop' },
  { label: 'Yêu thích', to: '/favorites' },
];

function Header({ cartCount = 0 }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { totalQuantity } = useCart();
  const { favorites } = useFavorites();
  const visibleCartCount = totalQuantity ?? cartCount;

  useEffect(() => {
    setMenuOpen(false);
    setSearch(new URLSearchParams(location.search).get('q') || '');
  }, [location.pathname, location.search]);

  function handleSearchSubmit(event) {
    event.preventDefault();
    const query = search.trim();
    navigate(query ? `/shop?q=${encodeURIComponent(query)}` : '/shop');
  }

  function handleClearSearch() {
    setSearch('');
    navigate('/shop');
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
      <div className="page-container">
        <div className="flex min-h-[4.5rem] items-center gap-4">
          <Link
            to="/"
            className="group flex shrink-0 items-center gap-2 text-foreground"
          >
            <span className="flex h-8 w-8 items-center justify-center bg-foreground font-mono text-xs font-bold text-background transition group-hover:bg-accent group-hover:text-accent-foreground">
              FS
            </span>
            <span className="text-base font-semibold tracking-tight">
              {appName}
            </span>
          </Link>

          <nav
            className="hidden items-center gap-1 md:flex"
            aria-label="Điều hướng chính"
          >
            {navigation.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-2 border-b-2 border-transparent px-3 py-3 text-sm font-medium transition-colors',
                    isActive
                      ? 'border-accent text-foreground'
                      : 'text-muted hover:border-border hover:text-foreground',
                  )
                }
              >
                <span>{item.label}</span>
                {item.to === '/favorites' && (
                  <span className="inline-flex min-w-4 items-center justify-center rounded-full bg-neutral-100 px-1 text-[10px] leading-4 text-muted">
                    {favorites.length > 99 ? '99+' : favorites.length}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-2">
            <form onSubmit={handleSearchSubmit} className="hidden sm:block">
              <label className="sr-only" htmlFor="site-search">
                Tìm kiếm sản phẩm
              </label>
              <div className="relative">
                <input
                  id="site-search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Tìm sản phẩm"
                  className="h-9 w-40 rounded-md border border-border bg-background pl-3 pr-16 text-sm text-foreground outline-none transition placeholder:text-muted focus:border-foreground focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background lg:w-56"
                />
                {search && (
                  <button
                    type="button"
                    aria-label="Xóa tìm kiếm"
                    onClick={handleClearSearch}
                    className="absolute right-9 top-0 inline-flex h-9 w-7 items-center justify-center text-muted transition hover:text-foreground focus-visible:outline-none"
                  >
                    <X size={16} aria-hidden="true" />
                  </button>
                )}
                <button
                  type="submit"
                  aria-label="Tìm kiếm"
                  className="absolute right-0 top-0 inline-flex h-9 w-9 items-center justify-center text-muted transition hover:text-foreground focus-visible:outline-none"
                >
                  <Search size={16} aria-hidden="true" />
                </button>
              </div>
            </form>

            <Link
              to="/cart"
              aria-label={
                visibleCartCount
                  ? `Giỏ hàng, ${visibleCartCount} sản phẩm`
                  : 'Giỏ hàng'
              }
              className="relative inline-flex h-10 w-10 items-center justify-center text-foreground transition hover:text-accent focus-visible:outline-none"
            >
              <ShoppingCart size={20} aria-hidden="true" />
              <span className="absolute -right-1 -top-1 inline-flex min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-semibold leading-4 text-accent-foreground">
                {visibleCartCount > 99 ? '99+' : visibleCartCount}
              </span>
            </Link>

            <button
              type="button"
              aria-label={menuOpen ? 'Đóng menu' : 'Mở menu'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((current) => !current)}
              className="inline-flex h-10 w-10 items-center justify-center text-foreground transition hover:text-accent focus-visible:outline-none md:hidden"
            >
              {menuOpen ? (
                <X size={20} aria-hidden="true" />
              ) : (
                <Menu size={20} aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="border-t border-border py-3 md:hidden">
            <form onSubmit={handleSearchSubmit} className="mb-2 sm:hidden">
              <label className="sr-only" htmlFor="mobile-site-search">
                Tìm kiếm sản phẩm
              </label>
              <div className="relative">
                <input
                  id="mobile-site-search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Tìm sản phẩm"
                  className="h-10 w-full rounded-md border border-border bg-background px-3 pr-20 text-sm outline-none placeholder:text-muted focus:border-foreground focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background"
                />
                {search && (
                  <button
                    type="button"
                    aria-label="Xóa tìm kiếm"
                    onClick={handleClearSearch}
                    className="absolute right-10 top-0 inline-flex h-10 w-8 items-center justify-center text-muted transition hover:text-foreground focus-visible:outline-none"
                  >
                    <X size={16} aria-hidden="true" />
                  </button>
                )}
                <button
                  type="submit"
                  aria-label="Tìm kiếm"
                  className="absolute right-0 top-0 inline-flex h-10 w-10 items-center justify-center text-muted"
                >
                  <Search size={16} aria-hidden="true" />
                </button>
              </div>
            </form>
            <nav className="grid gap-1" aria-label="Điều hướng mobile">
              {navigation.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-2 border-l-2 border-transparent px-3 py-2.5 text-sm font-medium',
                      isActive
                        ? 'border-accent bg-surface text-foreground'
                        : 'text-muted',
                    )
                  }
                >
                  <span>{item.label}</span>
                  {item.to === '/favorites' && (
                    <span className="inline-flex min-w-4 items-center justify-center rounded-full bg-neutral-100 px-1 text-[10px] leading-4 text-muted">
                      {favorites.length > 99 ? '99+' : favorites.length}
                    </span>
                  )}
                </NavLink>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
