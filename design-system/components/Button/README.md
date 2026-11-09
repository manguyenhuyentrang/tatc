Nút bấm. Nút chính màu đỏ chủ đạo: gradient `brand-700` → `brand-900`, chữ trắng `on-primary`, Roboto 500.

- Bên dùng cung cấp: `children` (động từ + đối tượng: "Gửi đơn", "Tra cứu", "Nộp đơn ngay"), `onClick`, tùy chọn `icon`, `block`, `size`, `disabled`.
- `variant`:
  - `primary`: gradient đỏ, bóng `shadow-primary`; nhấn đổi sang `primary-pressed`. Một nút `primary` mỗi màn hình.
  - `secondary`: nền `surface`, viền và chữ `brand-text`. Cho hành động phụ cạnh nút chính ("Xem tất cả").
  - `tonal`: nền `surface-sunken`, viền `border`, chữ `ink`. Cho "Lưu nháp", "Hủy bỏ".
  - `tint`: nền `brand-tint`, chữ `brand-text`, không viền. Nút "+ Thêm" cả hàng (`block`, `icon="plus"`) ở cuối thẻ nhóm có danh sách lặp lại (đồng nguyên đơn, người bị kiện, yêu cầu…); chọn 02/11/2026 theo phương án nhập liệu F1.
  - `ghost`: chỉ chữ `brand-text`. Cho hành động nhẹ trong thẻ ("Tải tài liệu").
  - `light`: nền `white`, chữ `brand-800`. Nút chính khi đặt trên nền đỏ (banner chào: "Đăng nhập bằng VNeID").
  - `outline-light`: chỉ đặt trên nền đỏ: nền trong, viền và chữ `white`.
  - `gold`: nền `gold-banner`, chữ `on-gold`. Chỉ dùng cho nút trên banner trang chủ (`BannerCarousel`); không dùng ở nơi khác để hạn chế màu vàng.
- Cao `button-height` (46px), bo `radius-md`. `size="sm"` cao 36px, bo `radius-sm`, chỉ dùng cho thao tác trong dòng, trong thẻ.
- Không đặt nút `primary` đỏ trên nền đỏ; trên nền đỏ dùng `light` hoặc `outline-light`.
- `loading`: thay biểu tượng bằng vòng xoay, đổi chữ theo thao tác ("Đang đăng nhập…"), giữ màu nút, `aria-busy="true"`, không bấm lại được.
- `disabled`: nền `surface-sunken`, viền `border`, chữ `ink-subtle`, bỏ bóng. Nhấn: `primary` nền `primary-pressed`; `secondary`, `ghost`, `light` nền `brand-tint`; `tint` thêm viền trong `brand-200`; `tonal` nền `border`. Xem bảng `StatesControls`.
