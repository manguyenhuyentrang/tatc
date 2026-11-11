Khối lưu ý, có 2 kiểu theo `tone`.

**`neutral` (mặc định)**: lưu ý ngắn trong form, nhắc quy định trước khi người dùng nhập.
- Bên dùng cung cấp: `children` (một hoặc hai câu), tùy chọn `icon` (mặc định `info`).
- Nền `surface-sunken` bo `radius-md`, chữ `body-sm` màu `ink-muted`, biểu tượng `ink-subtle`. Không dùng cho lỗi (lỗi đi theo trường nhập).

**`reminder`**: khối nhắc việc người dùng cần làm, ví dụ "Bạn chưa hoàn thiện cam kết giao dịch điện tử" trên Trang chủ (phương án I, chọn 30/10/2026; thay kiểu nền vàng cảnh báo trước đó).
- Bên dùng cung cấp: `title`, `children` (câu mô tả), tùy chọn `illustration` (mặc định `uyQuyen` – văn bản có chữ ký và dấu), `actionLabel` + `onAction` (nút đỏ nhỏ 36px), `onClose` (hiện nút đóng X 36px, nhãn đọc màn hình `closeLabel`, mặc định "Đóng thông báo").
- Thẻ trắng `surface`, viền `border`, bóng `shadow-card`, bo `radius-lg`, đệm 14px — theo quy tắc khối trắng. Hình minh họa trong vòng tròn trắng 48px viền `border`. Tiêu đề 14/20 đậm `ink`, mô tả 12/16 `ink-muted`.
- Không dùng màu cảnh báo vàng để khối nhắc không lẫn với nhãn trạng thái "Sắp hết hạn".
- Đặt ngay dưới các ô dịch vụ của Trang chủ; đóng thì ẩn trong phiên hiện tại (theo web).
