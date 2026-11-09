Thanh điều hướng chính cố định ở đáy, 5 mục, mục giữa là nút "Nộp đơn".

- Bên dùng cung cấp: `items` = `[{key, icon, label, primary?, onClick?}]`, `active`, `onChange`.
- Nền `surface`, đường kẻ trên `shadow-nav`. Mục chưa chọn biểu tượng 24px và chữ `ink-subtle`; mục đang chọn chữ và biểu tượng `brand-text`, không có gạch ở mép trên (bỏ ngày 30/10/2026). Nhãn 12px 500.
- Mục có `primary: true` là nút tròn 52px nổi lên trên thanh: gradient `brand-700` → `brand-900`, biểu tượng `on-primary`, bóng `shadow-primary` và vòng 4px màu `surface`; nhãn `brand-text`. Mục này là hành động, không phải trang, nên không có trạng thái đang chọn; bấm gọi `onClick` (nếu không có thì gọi `onChange`).
- Năm mục chuẩn (chốt 30/10/2026): Trang chủ, Hồ sơ, Nộp đơn (`primary`), Hộp thư, Cá nhân. Thông báo mở từ nút chuông, Lịch mở từ nút Lịch trên `HomeHeader`. Bên dùng cộng vùng an toàn của thiết bị.
- **Cập nhật 02/11/2026 (app TATC):** thanh còn 4 mục, chỉ biểu tượng: Trang chủ, Hồ sơ, Hộp thư, Cá nhân; bỏ nút tròn "Nộp đơn" (nộp đơn mở từ thẻ "Nộp đơn khởi kiện" và ô dịch vụ trên Trang chủ). Dùng `labels={false}`: không hiện chữ, mỗi nút có `aria-label` bằng tên mục; mục đang chọn có viên nền `brand-tint` 56×32 sau biểu tượng `brand-text`.
