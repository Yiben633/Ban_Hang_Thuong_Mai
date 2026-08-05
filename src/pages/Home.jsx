import { Link } from 'react-router-dom';
import ProductCard from '../components/product/ProductCard.jsx';
import Button from '../components/ui/Button.jsx';
import Card, { CardContent } from '../components/ui/Card.jsx';
import { categories, products } from '../services/products.js';

function Home() {
  return (
    <main className="flex-1 py-12 sm:py-16">
      <section className="page-container grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-wide text-muted">
            Mono Store
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-6xl">
            Do dung dep, gon gang cho moi ngay.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-muted sm:text-lg">
            Nhung san pham duoc chon loc voi thiet ke toi gian, uu tien cong
            nang va su ben bi.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button as="link" to="/shop">
              Xem cua hang
            </Button>
            <Link
              to="/shop"
              className="inline-flex min-h-10 items-center rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground transition hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              Kham pha bo suu tap
            </Link>
          </div>
        </div>
        <div className="aspect-[4/3] rounded-lg bg-neutral-200 p-6 sm:p-8">
          <div className="flex h-full items-end border border-neutral-300 p-5 sm:p-6">
            <p className="max-w-xs text-sm font-medium text-neutral-600">
              Mot khong gian song tot bat dau tu nhung lua chon vua du.
            </p>
          </div>
        </div>
      </section>

      <section className="page-container mt-20">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-medium uppercase tracking-wide text-muted">
              Danh muc
            </p>
            <h2 className="section-heading mt-2">Chon theo nhu cau</h2>
          </div>
          <Link
            to="/shop"
            className="hidden text-sm font-medium text-foreground underline-offset-4 hover:underline sm:block"
          >
            Xem tat ca
          </Link>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {categories.map((category, index) => (
            <Link
              key={category.name}
              to={`/shop?category=${encodeURIComponent(category.name)}`}
            >
              <Card className="group h-full transition hover:-translate-y-0.5 hover:shadow-panel">
                <CardContent className="p-0">
                  <div
                    className={`h-2 ${index === 1 ? 'bg-neutral-400' : 'bg-neutral-200'}`}
                  />
                  <div className="p-6">
                    <p className="text-sm font-medium text-muted">
                      0{index + 1}
                    </p>
                    <h3 className="mt-8 text-lg font-semibold text-foreground group-hover:underline">
                      {category.name}
                    </h3>
                    <p className="mt-2 text-sm text-muted">{category.detail}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <section className="page-container mt-20">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-medium uppercase tracking-wide text-muted">
              Goi y cho ban
            </p>
            <h2 className="section-heading mt-2">San pham noi bat</h2>
          </div>
          <Link
            to="/shop"
            className="text-sm font-medium text-foreground underline-offset-4 hover:underline"
          >
            Di den Shop
          </Link>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.slice(0, 3).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Home;
