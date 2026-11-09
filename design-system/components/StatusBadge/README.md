Nhãn trạng thái theo bộ màu 4 lớp: chữ, nền `*-tint`, viền `*-border`, chấm `*-dot`.

- Bên dùng cung cấp: `children` (tên trạng thái), `tone`, tùy chọn `icon` (thay chấm bằng biểu tượng) hoặc `icon={false}` (bỏ chấm), `variant`.
- Ánh xạ: `success` = Đã thụ lý, Đã tống đạt, Hoàn thành; `info` = Đang xử lý, Đã tiếp nhận (bộ xám trung tính); `warning` = Chờ xử lý, Chờ bổ sung, Sắp đến hạn; `danger` = Trả lại đơn, Quá hạn; `neutral` = Nháp, Chưa nhập, Đã hủy; `brand` = Mới (huy hiệu nền `court-red`, chữ `white`).
- `variant="outline"`: chữ thường 12/16 500, bo 6px; dùng trong `FormSection` ("Đã nhập" / "Chưa nhập"). Nhãn trạng thái luôn viết chữ thường.
- Không phân biệt trạng thái chỉ bằng màu: chữ trạng thái là bắt buộc.
