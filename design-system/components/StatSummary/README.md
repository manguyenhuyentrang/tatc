Khối tổng quan số liệu: Tổng quan hồ sơ, Nghĩa vụ tài chính. Có 2 kiểu, chọn kiểu cuối cùng sau khi xem trên màn hình.

- `variant="brand"` (phương án B, mặc định): nền gradient `brand-950` → `brand-800`, bóng `shadow-panel`; số 28/36 700 trắng, nhãn `on-brand-muted`; các cột ngăn bằng vạch `brand-700`.
- `variant="plain"` (phương án C): thẻ trắng; mỗi số liệu là ô nền `surface-sunken`, số `brand-text`; số tiền đặt trong dải `brand-tint`.
- Bên dùng cung cấp: `title?`, `stats` = `[{value, label, onClick?}]` (mỗi số bấm được để mở danh sách tương ứng), hoặc `amountLabel` + `amount` + `subs` = `[{label, value}]` cho nghĩa vụ tài chính.
