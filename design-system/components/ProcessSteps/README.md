Khối "Quy trình" hướng dẫn chung, danh sách 1 cột. Có 2 kiểu, đặt bằng `variant`.

- `brand` (mặc định): nền gradient `brand-950` → `brand-800`, bóng `shadow-panel`. Mỗi bước là một dòng nền `brand-900` viền `brand-700` bo `radius-md`: số lớn "01" 22/28 700 màu `court-gold`, ô biểu tượng 36px nền `brand-800` biểu tượng `white`, tiêu đề `on-brand`, mô tả `on-brand-muted`. Nhãn "QUY TRÌNH" màu `court-gold`.
- `light`: thẻ `surface` viền `border` bóng `shadow-card`. Số bước trong vòng tròn 32px nền `brand-800` chữ `on-primary`, nối nhau bằng đường dọc 2px `brand-200`. Nhãn "QUY TRÌNH" màu `brand-text`, tiêu đề `ink`, mô tả `ink-muted`. Kiểu này không dùng biểu tượng.
- Bên dùng cung cấp: `title`, `steps` = `[{icon?, title, description?}]` (2–6 bước), tùy chọn `variant`, `eyebrow`.
- Chỉ dùng cho hướng dẫn chung; tiến trình của một hồ sơ cụ thể dùng `Timeline`, bước của form dùng `Stepper`.
