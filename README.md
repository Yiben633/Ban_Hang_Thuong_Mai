# Website Bán Hàng

Website thương mại điện tử được xây dựng bằng ReactJS và Vite. Dự án đang
được phát triển theo từng giai đoạn, với giao diện đơn sắc, hiện đại và tối
giản theo tài liệu [Vibecode Prompts](./vibecode-website-ban-hang.md).

## Công nghệ sử dụng

- React 18
- Vite 5
- React Router DOM 6
- Tailwind CSS 3
- ESLint 8
- Prettier 3

## Cấu trúc thư mục

```text
.
├── src/
│   ├── assets/       # Hình ảnh và tài nguyên tĩnh
│   ├── components/   # Component UI dùng chung
│   ├── context/      # React Context dùng chung
│   ├── hooks/        # Custom hooks
│   ├── pages/        # Các trang theo route
│   ├── services/     # Tầng gọi API và xử lý dữ liệu
│   └── utils/        # Hàm tiện ích
├── .gitignore
├── eslint.config.js
├── package.json
├── tailwind.config.js
└── vite.config.js
```

## Yêu cầu môi trường

- Node.js 24.18.0 LTS hoặc phiên bản LTS tương thích
- npm 11 hoặc phiên bản đi kèm Node.js

Kiểm tra phiên bản:

```bash
node --version
npm --version
```

## Cài đặt và chạy dự án

Clone repository sau khi đã có URL GitHub thật, rồi chạy:

```bash
npm install
npm run dev
```

Vite sẽ hiển thị địa chỉ local trong terminal, thường là
`http://localhost:5173`.

## Các lệnh thường dùng

```bash
npm run dev          # Chạy development server
npm run lint         # Kiểm tra ESLint
npm run format       # Format mã nguồn bằng Prettier
npm run format:check # Kiểm tra format mà không chỉnh sửa file
npm run build        # Build production
npm run preview      # Xem thử bản build production
```

## Development Workflow

Thực hiện các prompt theo đúng thứ tự trong
[vibecode-website-ban-hang.md](./vibecode-website-ban-hang.md):

1. Prompt 1: Khởi tạo React/Vite, cấu hình công cụ và routing cơ bản.
2. Prompt 2: Quản lý Git và hoàn thiện tài liệu dự án.
3. Prompt 3-4: Xây dựng design system và các UI component dùng chung.
4. Prompt 5-6: Hoàn thiện layout, điều hướng và các trang chính.
5. Prompt 7-8: Kết nối API và hiển thị danh sách sản phẩm.
6. Prompt 9-10: Thêm tìm kiếm, bộ lọc và query params.
7. Prompt 11-12: Hoàn thiện chi tiết sản phẩm và giỏ hàng.
8. Prompt 13-15: Responsive, trạng thái giao diện, performance và accessibility.
9. Prompt 16-17: Commit, cấu hình môi trường và chuẩn bị triển khai.

Sau mỗi prompt:

```bash
npm run lint
npm run format:check
npm run build
```

Nếu bước đó có thay đổi giao diện, chạy thêm `npm run dev` và kiểm tra các
route liên quan trên desktop và mobile. Chỉ chuyển sang prompt tiếp theo khi
các kiểm tra hoàn tất và thay đổi hiện tại đã được rà soát.

## Kết nối GitHub

Repository local đã được khởi tạo. Sau khi tạo repository GitHub thật, thay
`<GITHUB_REPOSITORY_URL>` bằng URL được GitHub cung cấp:

```bash
git remote add origin <GITHUB_REPOSITORY_URL>
git branch -M main
git add .
git commit -m "chore: initialize project repository"
git push -u origin main
```

Ví dụ định dạng URL, chỉ dùng để minh họa cú pháp:

```text
https://github.com/<your-account>/<your-repository>.git
```

Không commit password, API key, access token hoặc file `.env` chứa giá trị
thật. Các file môi trường đã được loại trừ trong `.gitignore`.
