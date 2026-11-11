Thanh tab có 2 kiểu, đặt bằng `variant`.

- `underline` (mặc định): thanh nền `surface` có đường kẻ dưới `border`, cuộn ngang khi nhãn dài. Tab cao `touch-min`, chữ `ink-muted`; tab đang chọn chữ `brand-text` và gạch dưới 3px `brand-800`. Số đếm là chữ thường `ink-subtle` cạnh nhãn. Dùng để chuyển giữa các phần của một màn.
- `chip`: các viên bo `radius-pill` cao 40px, viền `border`. Viên đang chọn nền `brand-tint`, viền 1.5px `brand-800`, chữ `brand-text`, có dấu tích. Số đếm là viên nhỏ nền `surface-sunken`; trên viên đang chọn đổi sang nền `brand-800` chữ `on-primary`. Dùng để lọc nhanh danh sách (Tất cả / Khiếu nại / Tố cáo).
- Bên dùng cung cấp: `items` = `[{key, label, count?}]`, tùy chọn `variant`, `value` + `onChange` hoặc `defaultValue`, `label` (tên nhóm cho trình đọc màn hình).
- Chọn loại trong form (Dân sự / Hành chính) dùng `SegmentedControl`, không dùng Tabs. Không dùng thay BottomNav.
- Mục có `disabled`: chữ `ink-subtle`, không bấm được (chip nền `surface-sunken`). Nhấn: nền `surface-sunken`; chip đang chọn nền `brand-200`.
