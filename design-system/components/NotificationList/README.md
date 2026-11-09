Danh sách thông báo trong Trung tâm thông báo (phương án F: cùng kiểu dòng với `MailList`). Sửa ngày 30/10/2026: hệ thống không phân loại thông báo, nên bỏ nhãn nhóm và biểu tượng màu.

- Vòng biểu tượng 32px trung tính, nền `surface-sunken`, biểu tượng `ink-muted`; mặc định biểu tượng chuông, mọi thông báo dùng chung.
- Chưa đọc: chấm `court-red` 10px ở góc trên phải vòng biểu tượng (viền trắng 2px) và tiêu đề đậm 500. Đã đọc: không chấm, tiêu đề 400.
- Dòng đầu: tiêu đề 16/24 và giờ bên phải; dưới là mô tả 1 dòng và mã hồ sơ. Nhóm theo ngày bằng nhãn `overline` "HÔM NAY", "HÔM QUA" đặt ngoài thẻ.
- Không có số đếm, không có nút "Xem thông báo cũ hơn": cuộn đến cuối danh sách thì tự tải thêm, hiện vòng xoay ở cuối trong lúc tải.
- `group` (tùy chọn) chỉ dùng khi hệ thống có phân loại; mặc định không truyền.
- Bên dùng cung cấp: `items` = `[{icon?, group?, time, title, description?, code?, unread?, onClick?}]`.
