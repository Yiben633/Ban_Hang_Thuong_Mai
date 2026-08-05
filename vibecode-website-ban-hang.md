# Vibecode Prompts — Website Bán Hàng (ReactJS + REST API)

Tài liệu này liệt kê **các prompt theo đúng thứ tự** để bạn đưa vào AI coding tool (Claude Code, Cursor, v.v.) nhằm xây dựng hoàn chỉnh một website thương mại điện tử. Phong cách thiết kế: **đơn sắc (monochrome), hiện đại, tối giản**.

---

## 🎨 Định hướng thiết kế chung

- **Bảng màu:** Đơn sắc — nền trắng/xám nhạt (#FAFAFA, #F5F5F5), chữ đen/xám đậm (#111111, #333333), 1 màu nhấn duy nhất (ví dụ đen tuyền hoặc xanh navy đậm) dùng cho nút CTA và trạng thái active.
- **Typography:** Font sans-serif hiện đại (Inter, Manrope, hoặc Be Vietnam Pro cho tiếng Việt), tiêu đề đậm, nội dung nhẹ.
- **Layout:** Nhiều khoảng trắng (white space), bo góc nhẹ (8–12px), shadow mờ, không dùng màu sắc sặc sỡ.
- **Chuyển động:** Hover/transition mượt (150–250ms ease).

---

## 📋 Danh sách Prompt theo thứ tự

### Giai đoạn 1 — Khởi tạo dự án
```
Prompt 1:
Khởi tạo dự án ReactJS mới bằng Vite cho website bán hàng.

Yêu cầu:
- Sử dụng React + Vite.
- Cài đặt và cấu hình ESLint, Prettier, React Router DOM, Tailwind CSS.
- Xóa code mẫu mặc định không cần thiết của Vite.
- Tạo cấu trúc thư mục chuẩn:
  src/components
  src/pages
  src/hooks
  src/services
  src/context
  src/assets
  src/utils
- Tạo các file khởi đầu: src/main.jsx, src/App.jsx, src/index.css.
- Thiết lập routing cơ bản bằng React Router DOM với các route:
  /, /shop, /product/:id, /cart, và route 404.
- Tạo page placeholder tương ứng: Home, Shop, ProductDetail, Cart,
  NotFound.

Tiêu chí hoàn thành:
- Chạy được npm run dev không lỗi.
- Chạy được npm run lint không có lỗi nghiêm trọng.
- Tailwind hoạt động trong component React.
- Cấu trúc thư mục rõ ràng, sẵn sàng mở rộng.
```

```
Prompt 2:
Thiết lập nền tảng quản lý mã nguồn và tài liệu ban đầu cho dự án.

Yêu cầu:
- Khởi tạo Git repository nếu chưa có.
- Tạo hoặc cập nhật .gitignore phù hợp cho React/Vite:
  node_modules, dist, .env, .env.local, log files, editor/system files.
- Tạo README.md giới thiệu dự án website bán hàng:
  tên dự án, mô tả ngắn, công nghệ sử dụng, cấu trúc thư mục,
  hướng dẫn cài đặt, chạy dev server, build production.
- Thêm phần "Development Workflow" mô tả thứ tự chạy prompt và cách
  kiểm tra sau mỗi bước.
- Không commit file chứa secret hoặc biến môi trường thật.

Tiêu chí hoàn thành:
- README rõ ràng để người mới clone project có thể chạy được.
- .gitignore đầy đủ cho dự án frontend.
- Cung cấp lệnh kết nối GitHub repository dạng mẫu, không dùng URL giả
  nếu tôi chưa cung cấp repository thật.
```

### Giai đoạn 2 — Design System (đơn sắc, hiện đại)
```
Prompt 3:
Thiết lập design system đơn sắc, hiện đại và tối giản cho toàn bộ
website bán hàng.

Yêu cầu:
- Cấu hình tailwind.config.js với màu nền, màu chữ, border, muted,
  accent và danger theo bảng màu grayscale.
- Chỉ dùng 1 màu nhấn chính cho CTA và trạng thái active.
- Cấu hình font sans-serif ưu tiên Inter hoặc Be Vietnam Pro.
- Thiết lập border-radius, box-shadow, container, spacing nhất quán.
- Cập nhật src/index.css để khai báo base style:
  body background, text color, font smoothing, selection color.
- Tạo các class tiện ích hoặc CSS layer nếu cần, nhưng không lạm dụng.

Tiêu chí hoàn thành:
- Giao diện có cảm giác đơn sắc, sạch, hiện đại.
- Không dùng màu rực hoặc gradient trang trí.
- Các token thiết kế có thể tái sử dụng ở component sau này.
```

```
Prompt 4:
Xây dựng bộ component UI dùng chung theo design system đã tạo.

Tạo trong src/components/ui:
- Button: variants primary, secondary, outline, ghost, danger;
  hỗ trợ disabled, loading, icon trái/phải.
- Input: label, helper text, error message, disabled state.
- Badge: default, success, warning, danger, neutral.
- Card: Card, CardHeader, CardTitle, CardContent, CardFooter.
- Skeleton: dùng cho loading sản phẩm và layout.
- Spinner: loading nhỏ, dễ dùng trong button hoặc page.
- Modal: overlay, content, close button, title, children.
- EmptyState: icon/title/description/action.
- ErrorState: message/action retry.

Yêu cầu:
- Style tối giản, đơn sắc, nhất quán với Tailwind tokens.
- Component nhận props linh hoạt, tránh hard-code nội dung cụ thể.
- Thêm ví dụ sử dụng nhanh ở một page hoặc file demo nếu cần.

Tiêu chí hoàn thành:
- Component có thể tái sử dụng ở các trang Home, Shop, Cart.
- Có đủ hover/focus/disabled/loading state.
- Có focus ring rõ ràng để hỗ trợ accessibility.
```

### Giai đoạn 3 — Layout & Điều hướng
```
Prompt 5:
Tạo layout tổng thể cho website bán hàng.

Yêu cầu:
- Tạo src/components/layout/Header.jsx:
  logo, navigation, thanh tìm kiếm, icon/nút giỏ hàng, menu mobile.
- Tạo src/components/layout/Footer.jsx:
  thông tin thương hiệu, liên kết nhanh, chính sách, thông tin liên hệ.
- Tạo src/components/layout/MainLayout.jsx dùng Outlet của React Router.
- Header sticky hoặc fixed nhẹ nếu phù hợp, không che nội dung.
- Navigation active state theo route hiện tại.
- Menu mobile hoạt động tốt trên màn hình nhỏ.
- Cart icon hiển thị số lượng sản phẩm nếu có dữ liệu context sau này.

Tiêu chí hoàn thành:
- Layout nhất quán trên tất cả page.
- Header/Footer responsive.
- Điều hướng không reload trang.
- UI đúng phong cách đơn sắc, không giống landing page marketing quá đà.
```

```
Prompt 6:
Hoàn thiện các trang chính và routing cho website bán hàng.

Tạo/cập nhật các page trong src/pages:
- Home: hero ngắn gọn, danh mục nổi bật, sản phẩm nổi bật placeholder,
  CTA tới Shop.
- Shop: tiêu đề, vùng filter/search placeholder, grid sản phẩm placeholder.
- ProductDetail: layout ảnh sản phẩm, thông tin, giá, số lượng placeholder.
- Cart: danh sách giỏ hàng placeholder, tổng tiền, nút checkout placeholder.
- NotFound: thông báo 404 và nút quay về trang chủ.

Yêu cầu:
- Cấu hình route /, /shop, /product/:id, /cart, *.
- Dùng MainLayout cho các route chính.
- Dùng Link/NavLink thay cho thẻ a nội bộ.
- Tách section lớn thành component nếu giúp code dễ đọc.

Tiêu chí hoàn thành:
- Tất cả route truy cập được.
- Giao diện có bố cục thực tế, không chỉ là text trống.
- Không phát sinh lỗi console khi chuyển trang.
```

### Giai đoạn 4 — Kết nối API & hiển thị sản phẩm
```
Prompt 7:
Xây dựng service layer để kết nối REST API sản phẩm.

Yêu cầu:
- Tạo src/services/apiClient.js dùng fetch hoặc axios.
- Đọc base URL từ biến môi trường VITE_API_BASE_URL, có fallback hợp lý
  cho môi trường demo.
- Tạo src/services/productService.js với các hàm:
  getProducts(params)
  getProductById(id)
  getCategories()
- Chuẩn hóa response dữ liệu sản phẩm về format thống nhất:
  id, name, price, image, category, description, rating, stock.
- Xử lý lỗi API bằng message dễ hiểu cho UI.
- Hỗ trợ query params cho search, category, sort, page nếu API có.

Tiêu chí hoàn thành:
- Service không phụ thuộc trực tiếp vào component UI.
- Khi API lỗi, trả lỗi rõ ràng để hook/page xử lý.
- Có thể thay đổi API base URL qua .env.
```

```
Prompt 8:
Tạo custom hooks để fetch và hiển thị dữ liệu sản phẩm trên giao diện.

Yêu cầu:
- Tạo src/hooks/useProducts.js quản lý:
  products, loading, error, refetch, total, params.
- Tạo src/hooks/useProductDetail.js để lấy chi tiết theo id.
- Áp dụng useProducts vào trang Shop.
- Tạo ProductCard component hiển thị:
  ảnh, tên, giá, danh mục, rating nếu có, nút xem chi tiết.
- Tạo ProductGrid component nhận products/loading/error.
- Hiển thị Skeleton khi loading.
- Hiển thị ErrorState khi lỗi API.
- Hiển thị EmptyState khi không có sản phẩm.

Tiêu chí hoàn thành:
- Shop render dữ liệu thật hoặc mock fallback rõ ràng.
- Loading/error/empty state đầy đủ.
- Click sản phẩm điều hướng tới /product/:id.
```

### Giai đoạn 5 — Tìm kiếm & Lọc sản phẩm
```
Prompt 9:
Thêm chức năng tìm kiếm sản phẩm theo tên.

Yêu cầu:
- Search input nằm ở Header và/hoặc Shop, đồng bộ với query params q.
- Debounce input 300ms để tránh gọi API liên tục.
- Khi tìm kiếm, cập nhật danh sách sản phẩm trên Shop theo thời gian gần
  thực tế.
- Tạo hook src/hooks/useDebounce.js nếu chưa có.
- Khi người dùng nhấn Enter ở search trên Header, điều hướng tới
  /shop?q=keyword.
- Giữ lại keyword khi reload trang hoặc copy link.
- Có nút clear search.

Tiêu chí hoàn thành:
- Search hoạt động bằng URL query params.
- Không mất trạng thái khi refresh.
- Có empty state khi không tìm thấy kết quả.
```

```
Prompt 10:
Thêm bộ lọc và sắp xếp sản phẩm cho trang Shop.

Yêu cầu:
- Tạo ProductFilters component:
  lọc theo danh mục, khoảng giá min/max, tình trạng còn hàng nếu có.
- Tạo SortSelect component:
  mới nhất, giá tăng dần, giá giảm dần, tên A-Z.
- Đồng bộ tất cả filter/sort/search với URL query params:
  q, category, minPrice, maxPrice, sort, page.
- Thêm nút reset filter.
- Trên mobile, filter hiển thị dạng drawer/modal.
- Trên desktop, filter hiển thị dạng sidebar hoặc panel gọn.
- Nếu API chưa hỗ trợ filter, xử lý filter phía client tạm thời và ghi chú
  rõ trong code.

Tiêu chí hoàn thành:
- Link kết quả lọc có thể chia sẻ.
- Filter không làm vỡ layout mobile.
- Khi thay đổi filter, danh sách sản phẩm cập nhật đúng.
```

### Giai đoạn 6 — Chi tiết sản phẩm & Giỏ hàng
```
Prompt 11:
Xây dựng trang chi tiết sản phẩm hoàn chỉnh và context giỏ hàng.

Yêu cầu trang ProductDetail:
- Lấy id từ URL bằng useParams.
- Fetch chi tiết sản phẩm bằng useProductDetail.
- Hiển thị gallery ảnh hoặc ảnh chính, tên sản phẩm, giá, danh mục,
  mô tả, rating, tồn kho.
- Cho phép chọn số lượng bằng stepper/input.
- Nút "Thêm vào giỏ hàng" có loading/disabled state hợp lý.
- Hiển thị sản phẩm liên quan cùng danh mục nếu có dữ liệu.

Yêu cầu giỏ hàng:
- Tạo src/context/CartContext.jsx.
- Cung cấp CartProvider và hook useCart.
- Hỗ trợ addItem, removeItem, updateQuantity, clearCart.
- Tính cartItems, totalQuantity, subtotal.
- Lưu cart vào localStorage và khôi phục khi reload.

Tiêu chí hoàn thành:
- Thêm sản phẩm vào giỏ từ ProductDetail hoạt động.
- Số lượng giỏ hàng cập nhật trên Header.
- Không thêm quá số lượng tồn kho nếu có stock.
```

```
Prompt 12:
Xây dựng trang giỏ hàng hoàn chỉnh.

Yêu cầu:
- Hiển thị danh sách sản phẩm đã thêm gồm ảnh, tên, giá, số lượng,
  thành tiền và nút xóa.
- Cho phép tăng/giảm số lượng, nhập số lượng hợp lệ.
- Tính subtotal, phí vận chuyển giả lập nếu cần, tổng thanh toán.
- Có nút "Tiếp tục mua hàng", "Xóa giỏ hàng", "Thanh toán".
- Nếu giỏ hàng trống, hiển thị EmptyState và CTA quay lại Shop.
- Lưu và đọc cart từ localStorage thông qua CartContext.
- Thêm xác nhận trước khi xóa toàn bộ giỏ hàng.

Tiêu chí hoàn thành:
- Cập nhật số lượng phản ánh ngay trên tổng tiền.
- Reload trang không mất giỏ hàng.
- Cart page responsive tốt trên mobile.
```

### Giai đoạn 7 — Tối ưu & Hoàn thiện
```
Prompt 13:
Hoàn thiện responsive design cho toàn bộ website.

Yêu cầu:
- Kiểm tra và tối ưu layout cho các breakpoint:
  mobile, tablet, desktop, màn hình rộng.
- Header mobile có menu rõ ràng, thao tác dễ bằng ngón tay.
- Product grid tự thay đổi số cột theo viewport.
- ProductDetail chuyển từ layout 2 cột sang 1 cột trên mobile.
- Cart page không bị tràn ngang trên màn hình nhỏ.
- Kiểm tra khoảng cách, font-size, line-height, button size.
- Đảm bảo text không đè lên nhau, không tràn khỏi button/card.

Tiêu chí hoàn thành:
- Không có horizontal scroll ngoài ý muốn.
- UI vẫn rõ ràng trên mobile.
- Các thao tác chính dễ bấm và dễ đọc.
```

```
Prompt 14:
Hoàn thiện các trạng thái UI phụ nhưng quan trọng.

Yêu cầu:
- Thêm empty state cho:
  không có sản phẩm, tìm kiếm không có kết quả, filter không có kết quả,
  giỏ hàng trống.
- Thêm error state cho:
  lỗi tải danh sách sản phẩm, lỗi tải chi tiết sản phẩm, lỗi mạng.
- Thêm loading state nhất quán:
  skeleton cho grid/list, spinner cho button/action nhỏ.
- Thêm toast hoặc notification đơn giản cho:
  thêm vào giỏ hàng thành công, xóa sản phẩm, lỗi thao tác.
- Tạo utility formatCurrency trong src/utils/format.js.
- Format giá tiền theo VND hoặc cấu hình locale rõ ràng.

Tiêu chí hoàn thành:
- Người dùng luôn hiểu ứng dụng đang loading, lỗi hay không có dữ liệu.
- UI các trạng thái nhất quán với design system.
- Không hiển thị lỗi kỹ thuật thô trực tiếp ra người dùng.
```

```
Prompt 15:
Review, tối ưu performance và accessibility cơ bản cho toàn bộ dự án.

Yêu cầu performance:
- Code-splitting theo route bằng React.lazy và Suspense.
- Lazy load ảnh sản phẩm.
- Memo hóa component hoặc value context nếu có re-render không cần thiết.
- Tối ưu bundle nếu có thư viện thừa.
- Đảm bảo npm run build thành công.

Yêu cầu accessibility:
- Ảnh có alt text phù hợp.
- Button/icon button có aria-label khi cần.
- Input có label liên kết đúng.
- Modal có role/dialog behavior cơ bản, đóng được bằng ESC nếu có thể.
- Màu chữ/nền đủ tương phản.
- Focus state rõ ràng khi dùng keyboard.

Yêu cầu review code:
- Xóa console.log/debug code không cần thiết.
- Thống nhất naming, import path, folder structure.
- Không lặp logic fetch/filter/cart quá mức.

Tiêu chí hoàn thành:
- npm run lint và npm run build thành công.
- Không có lỗi console nghiêm trọng ở các flow chính.
- Website mượt và dễ dùng hơn trước.
```

### Giai đoạn 8 — Quản lý mã nguồn & Triển khai
```
Prompt 16:
Chuẩn bị lịch sử commit rõ ràng cho dự án.

Yêu cầu:
- Kiểm tra git status trước khi commit.
- Chia thay đổi thành các commit theo nhóm tính năng nếu có thể:
  chore setup project
  feat design system
  feat layout and routing
  feat product listing
  feat cart
  chore docs
- Viết commit message theo Conventional Commits:
  feat:, fix:, chore:, docs:, refactor:
- Không commit node_modules, dist, .env thật.
- Nếu tôi cung cấp GitHub repository URL, hướng dẫn hoặc thực hiện push.
- Nếu chưa có remote, đưa lệnh mẫu để thêm remote.

Tiêu chí hoàn thành:
- Git history dễ hiểu.
- Repository sẵn sàng để push/deploy.
- Không có file nhạy cảm bị commit.
```

```
Prompt 17:
Hoàn thiện cấu hình môi trường và hướng dẫn triển khai.

Yêu cầu:
- Tạo .env.example với các biến:
  VITE_API_BASE_URL=
  VITE_APP_NAME=
- Cập nhật README.md với:
  cách tạo .env.local từ .env.example,
  cách chạy dev,
  cách build,
  cách preview build,
  cách deploy lên Vercel,
  cách deploy lên Netlify,
  checklist trước khi deploy.
- Đảm bảo app đọc biến môi trường đúng chuẩn Vite.
- Kiểm tra npm run build trước khi kết luận.
- Ghi chú rõ cách cấu hình API endpoint production.

Tiêu chí hoàn thành:
- Người khác có thể clone, cấu hình env và deploy theo README.
- Build production chạy thành công.
- Không đưa secret thật vào tài liệu.
```

---

## ✅ Mẹo sử dụng
- Chạy từng prompt **theo đúng thứ tự**, không nhảy cóc — mỗi bước phụ thuộc vào kết quả bước trước.
- Sau mỗi prompt, kiểm tra kết quả trước khi sang bước tiếp theo.
- Có thể gộp 2 prompt gần nhau nếu dự án nhỏ, nhưng nên giữ nguyên thứ tự giai đoạn.
