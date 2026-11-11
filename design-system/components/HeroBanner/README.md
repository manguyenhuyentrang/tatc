Banner màn hình chào: ảnh trụ sở Tòa án, lớp phủ đỏ (`brand-banner` → `brand-950`), góc khung `white`, tiêu đề `display` màu `on-brand` chữ hoa.

- Bên dùng cung cấp: `title` (ngắn, tự viết hoa: "Tòa án điện tử"), `description` (chữ `on-brand-muted`), `actions` (một `Button variant="light"` + một `Button variant="outline-light"`), tùy chọn `imageSrc` (`assets/Images/hero-toa-an-dien-tu.png`), `note`, `stats` = `[{value, label}]` tối đa 3.
- Khung số liệu nền đặc `brand-900`, viền và vạch chia `brand-700`; số `on-brand`, nhãn `on-brand-muted`.
- Chỉ một banner, ở màn hình chào khi chưa đăng nhập. Sau đăng nhập dùng `HomeHeader` + `BannerCarousel`.
- Chữ luôn nằm trên lớp phủ đỏ; không đặt chữ lên vùng sáng của ảnh.
