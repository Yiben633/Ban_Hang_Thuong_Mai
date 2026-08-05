# FakeShop

FakeShop là giao diện cửa hàng trực tuyến được xây dựng bằng React và Vite. Dự án sử dụng Fake Store API để tải sản phẩm, danh mục và chi tiết sản phẩm; giỏ hàng, danh sách yêu thích và quy trình đặt hàng được mô phỏng ở phía trình duyệt.

Tên hiển thị mặc định hiện tại là `Mono Store` và có thể thay đổi bằng biến môi trường `VITE_APP_NAME`.

## Tính năng

- Trang chủ với hero, danh mục nổi bật, sản phẩm nổi bật và lợi ích mua sắm.
- Danh sách sản phẩm với tìm kiếm, lọc danh mục, sắp xếp và phân trang.
- Trang chi tiết sản phẩm với gallery ảnh, số lượng và sản phẩm liên quan.
- Giỏ hàng lưu trong `localStorage`, cập nhật số lượng và tính tổng tiền.
- Danh sách yêu thích lưu trong `localStorage`.
- Checkout mô phỏng với kiểm tra họ tên, email, số điện thoại, địa chỉ và thành phố.
- Tạo mã đơn hàng mô phỏng và trang xác nhận đơn hàng.
- Loading, empty state, error state, toast notification và ErrorBoundary.
- Responsive cho mobile, tablet và desktop.

## Công nghệ

- React 18
- Vite 5
- React Router DOM 6
- Axios
- Tailwind CSS
- Lucide React
- ESLint và Prettier
- JavaScript, không sử dụng TypeScript

## Cấu trúc thư mục

```text
src/
├── api/                  # Axios client và các API module
├── assets/               # Tài nguyên tĩnh của ứng dụng
├── components/
│   ├── layout/           # Header, Footer, MainLayout
│   ├── product/          # ProductCard, ProductGrid, filter, sort
│   └── ui/               # Button, Input, Card, Modal, state components
├── config/               # Đọc biến môi trường
├── context/              # Cart, Favorites và Toast Context
├── hooks/                # Hook tải dữ liệu và debounce
├── pages/                # Các màn hình theo route
├── routes/               # Cấu hình React Router
├── services/             # Fetch client và adapter chuẩn hóa dữ liệu
├── styles/               # Khu vực dành cho style mở rộng
└── utils/                # Format và xử lý lỗi dùng chung
```

## Yêu cầu môi trường

- Node.js `24.18.0`.
- npm đi kèm Node.js.

Phiên bản Node được khai báo trong `package.json` để giữ môi trường phát triển ổn định.

## Cài đặt

```bash
git clone <repository-url>
cd Ban_Hang
npm install
```

Nếu chưa có repository URL, có thể mở thư mục dự án hiện tại và bỏ qua lệnh `git clone`.

## Biến môi trường

Tạo `.env.local` từ `.env.example`:

```bash
copy .env.example .env.local
```

Trên macOS/Linux:

```bash
cp .env.example .env.local
```

Nội dung mặc định:

```env
VITE_API_BASE_URL=https://fakestoreapi.com
VITE_APP_NAME=Mono Store
```

`VITE_API_BASE_URL` là endpoint API sản phẩm. `VITE_APP_NAME` là tên hiển thị trên Header. Không đặt secret hoặc khóa riêng tư trong biến môi trường frontend.

## Cách chạy

Khởi động development server:

```bash
npm run dev
```

Kiểm tra lint:

```bash
npm run lint
```

Kiểm tra format:

```bash
npm run format:check
```

Build production:

```bash
npm run build
```

Xem thử bản build:

```bash
npm run preview
```

## Route chính

| Route            | Màn hình                       |
| ---------------- | ------------------------------ |
| `/`              | Trang chủ                      |
| `/products`      | Danh sách sản phẩm             |
| `/shop`          | Cửa hàng có tìm kiếm và bộ lọc |
| `/products/:id`  | Chi tiết sản phẩm              |
| `/product/:id`   | Alias của trang chi tiết       |
| `/cart`          | Giỏ hàng                       |
| `/favorites`     | Sản phẩm yêu thích             |
| `/checkout`      | Checkout mô phỏng              |
| `/order-success` | Xác nhận đơn hàng mô phỏng     |
| `*`              | Trang không tìm thấy           |

## API sử dụng

Endpoint mặc định: `https://fakestoreapi.com`.

Các endpoint sản phẩm được sử dụng:

```text
GET /products
GET /products/:id
GET /products/categories
GET /products/category/:category
```

`src/services/productService.js` dùng fetch client để tải và chuẩn hóa dữ liệu về mô hình nội bộ gồm `id`, `name`, `price`, `image`, `category`, `description`, `rating`, `ratingCount` và `stock`.

`src/api/productApi.js` cung cấp thêm module Axios cho các thao tác đọc, tạo, cập nhật, patch và xóa sản phẩm. `src/api/cartApi.js` cung cấp các endpoint cart của Fake Store API cho mục đích tích hợp API; ứng dụng không dùng module này để lưu giỏ hàng người dùng.

## Ảnh chụp màn hình

Chưa có ảnh chụp màn hình chính thức trong repository. Phần này sẽ được cập nhật sau khi có ảnh kiểm thử ở các viewport mobile, tablet và desktop.

## Hạn chế của Fake Store API

- Dữ liệu chỉ phù hợp cho demo và phát triển giao diện.
- Không có hệ thống người dùng, xác thực hoặc thanh toán thật trong dự án.
- Các thao tác tạo, cập nhật và xóa của API có thể chỉ là mô phỏng, không được đảm bảo lưu vĩnh viễn.
- Tìm kiếm, lọc giá và lọc tồn kho được xử lý phía client vì API không cung cấp đầy đủ các truy vấn này.
- Dữ liệu tồn kho và một số trường sản phẩm có thể không đầy đủ hoặc không nhất quán.
- Checkout chỉ tạo đơn mô phỏng trong `localStorage`, không tạo đơn hàng trên server.

## Deploy lên Vercel

### Cách 1: Deploy bằng Vercel Dashboard

1. Đảm bảo mã nguồn đã được push lên GitHub, GitLab hoặc Bitbucket.
2. Đăng nhập Vercel và chọn **Add New Project**.
3. Import repository của dự án.
4. Giữ framework preset là **Vite** nếu Vercel tự nhận diện được.
5. Kiểm tra cấu hình:
   - Build command: `npm run build`
   - Output directory: `dist`
   - Install command: `npm install`
6. Trong **Settings > Environment Variables**, thêm:
   - `VITE_API_BASE_URL` = `https://fakestoreapi.com`
   - `VITE_APP_NAME` = tên hiển thị mong muốn, ví dụ `Mono Store`
7. Chọn môi trường áp dụng là **Production** và **Preview** nếu cần.
8. Nhấn **Deploy** và chờ Vercel hoàn tất build.

### Cách 2: Deploy bằng Vercel CLI

```bash
npm install --global vercel
vercel login
vercel
```

Khi deploy production:

```bash
vercel --prod
```

Khai báo biến môi trường bằng Dashboard hoặc CLI trước khi deploy production. Không commit `.env.local`, `.env.production` hoặc bất kỳ file `.env` nào chứa cấu hình riêng tư.

### React Router khi reload

File `vercel.json` đã cấu hình rewrite:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

Nhờ rewrite này, các route như `/shop`, `/cart` và `/products/1` vẫn mở được khi người dùng tải lại trực tiếp trên Vercel.

### Checklist trước khi deploy

- `npm run lint` không có lỗi.
- `npm run format:check` đạt.
- `npm run build` thành công.
- `VITE_API_BASE_URL` trỏ đến endpoint có thể truy cập từ trình duyệt.
- Không có `.env.local`, `.env.production`, secret hoặc khóa riêng tư trong Git.
- Kiểm tra các route chính sau khi deployment hoàn tất.

## Hướng phát triển

- Thay Fake Store API bằng backend có cơ sở dữ liệu thật.
- Bổ sung đăng nhập, phân quyền và quản lý tài khoản.
- Tích hợp thanh toán và vận chuyển thật.
- Bổ sung test tự động cho component, hook và các luồng chính.
- Thêm API phân trang, tìm kiếm, lọc và sắp xếp phía server.
- Bổ sung ảnh chụp màn hình và quy trình triển khai chính thức.

## Thông tin tác giả

- Tác giả: Chưa cập nhật.
- Liên hệ: Chưa cập nhật.

## Giấy phép

Thông tin giấy phép chưa được định nghĩa trong repository này.
