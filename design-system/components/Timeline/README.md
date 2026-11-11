Dòng thời gian tiến trình tố tụng của một vụ việc.

- Bên dùng cung cấp: `steps` = `[{title, date?, description?, state}]`; `state` là `done`, `current` hoặc `upcoming`; tùy chọn `currentLabel`.
- `done`: chấm `success-dot` có dấu tích trắng, đường nối `success-dot`. `current`: chấm `brand-800` có vòng `brand-tint` và nhãn 12/16 500 `brand-text` "Đang diễn ra" (chữ thường). `upcoming`: vòng viền `border-strong`, tiêu đề `ink-muted`.
- Ngày giờ dùng số cùng độ rộng, màu `ink-subtle`; ngày dự kiến ghi rõ "Dự kiến".
