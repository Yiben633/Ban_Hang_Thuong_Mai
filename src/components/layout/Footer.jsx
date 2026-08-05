import { Link } from 'react-router-dom';

const footerGroups = [
  {
    title: 'Khám phá',
    links: [
      { label: 'Trang chủ', to: '/' },
      { label: 'Cửa hàng', to: '/shop' },
      { label: 'Giỏ hàng', to: '/cart' },
    ],
  },
  {
    title: 'Chính sách',
    links: [
      { label: 'Vận chuyển', to: '/404' },
      { label: 'Đổi trả', to: '/404' },
      { label: 'Bảo mật', to: '/404' },
    ],
  },
];

function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="page-container py-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <Link
              to="/"
              className="text-base font-semibold tracking-tight text-foreground"
            >
              Mono Store
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-6 text-muted">
              Sản phẩm được chọn lọc cho những nhu cầu hằng ngày.
            </p>
          </div>

          {footerGroups.map((group) => (
            <div key={group.title}>
              <h2 className="text-sm font-semibold text-foreground">
                {group.title}
              </h2>
              <nav className="mt-3 grid gap-2" aria-label={group.title}>
                {group.links.map((link) => (
                  <Link
                    key={link.label}
                    to={link.to}
                    className="w-fit text-sm text-muted transition hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          ))}

          <div>
            <h2 className="text-sm font-semibold text-foreground">Liên hệ</h2>
            <div className="mt-3 grid gap-2 text-sm text-muted">
              <a
                href="mailto:hello@monostore.example"
                className="w-fit hover:text-foreground"
              >
                hello@monostore.example
              </a>
              <a
                href="tel:+84000000000"
                className="w-fit hover:text-foreground"
              >
                0000 000 000
              </a>
              <span>Hà Nội, Việt Nam</span>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-5 text-xs text-muted">
          © 2026 Mono Store. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
