Thẻ một vụ án trong danh sách Hồ sơ.

- Bên dùng cung cấp: `caseNo` (số thụ lý, giữ đúng định dạng của Tòa án, ví dụ "125/2026/TLST-DS"), `title`, tùy chọn `codeLabel` (mặc định "Số thụ lý"), `kind`, `court`, `meta`, `date`, `status` + `statusTone`, `starred` + `onStar`, `onArchive`, `onClick`, `loading`.
- Giao diện chung với `RecordCard` (phương án D gọn; nhãn loại kiểu chữ đỏ nhỏ của bản trước): thẻ nền `surface`, viền `border`, bóng `shadow-card`, bo `radius-lg`, đệm 14px 16px.
- Thứ tự trong thẻ:
  - hàng đầu: loại `kind` (12px 500 `brand-text`, không nền) và, nếu có `onStar`/`onArchive`, nút Đánh dấu, Lưu trữ (36px, viền `border`; đã đánh dấu: nền `brand-tint`, viền `brand-200`, sao tô đặc `brand-text`);
  - tiêu đề 16/22 500 `ink`, tối đa 2 dòng;
  - nhãn mã + mã số (14/20 500, số cùng độ rộng) + nút sao chép (nếu có `code`);
  - một dòng thông tin 14px `ink-muted`: Tòa án · `meta` · ngày, cách nhau bằng " · ";
  - `StatusBadge` trạng thái (nếu có);
  - chân thẻ vụ án `caseRef` (nếu có): đường kẻ trên `border`, một dòng 12/16 "Vụ án" + mã `brand-text` 500 + tên vụ án. Đây chỉ là thông tin đi kèm, không phải liên kết, không có mũi tên.
- Chạm bất kỳ chỗ nào trên thẻ để mở chi tiết của chính thẻ đó (`onClick`). Nút sao chép, Đánh dấu, Lưu trữ nằm trên lớp bấm, chạm vào chỉ làm việc của nút.
- Trạng thái: Chờ xử lý = `warning`, Đang xử lý / Đã gửi - chờ tiếp nhận = `info`, Hoàn thành = `success`, Từ chối / Gửi không thành công = `danger`. `loading` hiện khung xương.
- Vùng mở rộng `children` (tùy chọn): nằm dưới trạng thái, trước chân thẻ vụ án; có đường kẻ trên `border`, cách 10px. Dùng cho dòng nhắc việc ngắn: `<p class="tp-hs-note">` hoặc `tp-hs-note tp-hs-note-warning` (biểu tượng 16px + chữ 14/20 500; `warning` khi cần xử lý, `ink-muted` khi chỉ báo lịch) hoặc `CaseProgress`. Không đặt nút trong vùng này.
