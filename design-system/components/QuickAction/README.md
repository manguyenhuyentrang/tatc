Thẻ hành động nhanh trên trang chủ: hai thẻ lớn 2 cột, bên dưới là hàng thẻ nhỏ.

- Bên dùng cung cấp: `icon` (Icon nét), `title`, tùy chọn `subtitle` (chỉ khi `size="lg"`), `tone` (`red` | `plain`), `size` (`lg` | `md`), `onClick`.
- `red`: nền gradient `brand-700` → `brand-900`, chữ `on-brand`, phụ đề `on-brand-muted`, vòng icon `white` với biểu tượng `brand-800`, bóng `shadow-primary`. Chỉ dùng cho hành động quan trọng nhất: "Nộp đơn khởi kiện".
- `plain` (mặc định): nền `surface` viền `border`, vòng icon gradient đỏ với biểu tượng trắng, bóng `shadow-glow-red`. Dùng cho "Hồ sơ của tôi" và các thẻ nhỏ `size="md"` (Liên kết VNeID, Lịch của tôi).
- Bố trí trong `tp-qa-grid` (2 cột, cách `space-3`).
- `disabled`: nền `surface-sunken`, chữ `ink-subtle`, vòng icon nền `border`, bỏ bóng. Nhấn: `plain` nền `surface-sunken`; `red` nền đặc `brand-900`, bỏ bóng.
