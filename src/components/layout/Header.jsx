import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext.jsx';
import { cn } from '../ui/cn.js';

const navigation = [
  { label: 'Trang chu', to: '/', end: true },
  { label: 'Cua hang', to: '/shop' },
];

function SearchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4.5 4.5" />
    </svg>
  );
}

function ClearIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <path d="m7 7 10 10M17 7 7 17" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <path d="M3.5 4.5h2l1.7 9.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 1.9-1.5L20.5 8H7" />
      <circle cx="9.5" cy="19" r="1" />
      <circle cx="17.5" cy="19" r="1" />
    </svg>
  );
}

function MenuIcon({ open }) {
  return open ? (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  ) : (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

function Header({ cartCount = 0 }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { totalQuantity } = useCart();
  const visibleCartCount = totalQuantity || cartCount;

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
    <header className="sticky top-0 z-40 border-b border-border bg-surface/95 backdrop-blur">
      <div className="page-container">
        <div className="flex min-h-16 items-center gap-4">
          <Link
            to="/"
            className="shrink-0 text-base font-semibold tracking-tight text-foreground"
          >
            Mono Store
          </Link>

          <nav
            className="hidden items-center gap-1 md:flex"
            aria-label="Dieu huong chinh"
          >
            {navigation.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  cn(
                    'rounded-md px-3 py-2 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-neutral-100 text-foreground'
                      : 'text-muted hover:bg-neutral-100 hover:text-foreground',
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-2">
            <form onSubmit={handleSearchSubmit} className="hidden sm:block">
              <label className="sr-only" htmlFor="site-search">
                Tim kiem san pham
              </label>
              <div className="relative">
                <input
                  id="site-search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Tim san pham"
                  className="h-9 w-40 rounded-md border border-border bg-background pl-3 pr-16 text-sm text-foreground outline-none transition placeholder:text-muted focus:border-foreground focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background lg:w-56"
                />
                {search && (
                  <button
                    type="button"
                    aria-label="Xoa tim kiem"
                    onClick={handleClearSearch}
                    className="absolute right-9 top-0 inline-flex h-9 w-7 items-center justify-center text-muted transition hover:text-foreground focus-visible:outline-none"
                  >
                    <span className="h-4 w-4">
                      <ClearIcon />
                    </span>
                  </button>
                )}
                <button
                  type="submit"
                  aria-label="Tim kiem"
                  className="absolute right-0 top-0 inline-flex h-9 w-9 items-center justify-center text-muted transition hover:text-foreground focus-visible:outline-none"
                >
                  <span className="h-4 w-4">
                    <SearchIcon />
                  </span>
                </button>
              </div>
            </form>

            <Link
              to="/cart"
              aria-label={
                visibleCartCount
                  ? `Gio hang, ${visibleCartCount} san pham`
                  : 'Gio hang'
              }
              className="relative inline-flex h-9 w-9 items-center justify-center rounded-md text-foreground transition hover:bg-neutral-100 focus-visible:outline-none"
            >
              <span className="h-5 w-5">
                <CartIcon />
              </span>
              {visibleCartCount > 0 && (
                <span className="absolute -right-1 -top-1 inline-flex min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-semibold leading-4 text-accent-foreground">
                  {visibleCartCount > 99 ? '99+' : visibleCartCount}
                </span>
              )}
            </Link>

            <button
              type="button"
              aria-label={menuOpen ? 'Dong menu' : 'Mo menu'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((current) => !current)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-md text-foreground transition hover:bg-neutral-100 focus-visible:outline-none md:hidden"
            >
              <span className="h-5 w-5">
                <MenuIcon open={menuOpen} />
              </span>
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="border-t border-border py-3 md:hidden">
            <form onSubmit={handleSearchSubmit} className="mb-2 sm:hidden">
              <label className="sr-only" htmlFor="mobile-site-search">
                Tim kiem san pham
              </label>
              <div className="relative">
                <input
                  id="mobile-site-search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Tim san pham"
                  className="h-10 w-full rounded-md border border-border bg-background px-3 pr-20 text-sm outline-none placeholder:text-muted focus:border-foreground focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background"
                />
                {search && (
                  <button
                    type="button"
                    aria-label="Xoa tim kiem"
                    onClick={handleClearSearch}
                    className="absolute right-10 top-0 inline-flex h-10 w-8 items-center justify-center text-muted transition hover:text-foreground focus-visible:outline-none"
                  >
                    <span className="h-4 w-4">
                      <ClearIcon />
                    </span>
                  </button>
                )}
                <button
                  type="submit"
                  aria-label="Tim kiem"
                  className="absolute right-0 top-0 inline-flex h-10 w-10 items-center justify-center text-muted"
                >
                  <span className="h-4 w-4">
                    <SearchIcon />
                  </span>
                </button>
              </div>
            </form>
            <nav className="grid gap-1" aria-label="Dieu huong mobile">
              {navigation.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    cn(
                      'rounded-md px-3 py-2.5 text-sm font-medium',
                      isActive
                        ? 'bg-neutral-100 text-foreground'
                        : 'text-muted',
                    )
                  }
                >
                  {item.label}
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
