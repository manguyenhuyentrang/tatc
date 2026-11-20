# Rà soát UX prototype TATC – bản v533 (20/11/2026, lượt 2)

- **Phạm vi:** 788 màn trong danh sách "Đi tới màn bất kỳ", kể cả bảng từ đáy và các trạng thái.
- **Cách làm:**
  1. `ux-audit.js --scroll`: cuộn hết từng khối cuộn của mỗi màn (465 lần cuộn), kiểm cả phần bên dưới.
  2. Script dò riêng cho các luật phải nhìn:
     - tự bấm mọi nút xóa / rút / hủy / thu hồi / đăng xuất (58 nút) xem có bước xác nhận không;
     - kiểm 54 hộp thoại, bảng từ đáy có lối thoát không;
     - tìm chấm màu không kèm chữ.
  3. Chụp ảnh các chỗ bị báo để xem bằng mắt.
- **Chỉ đọc, không sửa prototype.**

## 1. Kết quả tự động (có cuộn)

| Luật | Kết quả |
|---|---|
| APP-6 vùng chạm < 44px | 0 |
| APP-1 thiếu tên đọc màn hình, UX-43 ô nhập thiếu nhãn, UX-38 ảnh thiếu alt | 0 |
| UX-36 tương phản thấp | 0 |
| UX-74 cỡ chữ ngoài thang (10·12·14·16·18·20·22·24) | 0 |
| APP-26 chữ 10px | 15 chỗ, trong đó 14 chỗ được phép (số đếm trên chip, chữ "PDF" trên biểu tượng tệp, nhãn tháng "TH11", chữ trong trang PDF mô phỏng); **1 chỗ không được phép**, xem mục 2.4 |
| UX-113 chữ bị cắt | không xét: quy tắc chung TATC, dài quá thì hiển thị "…" |

## 2. Vấn đề cần xem

| # | Mức | Luật | Màn | Vấn đề | Hướng sửa gợi ý |
|---|---|---|---|---|---|
| 2.1 | Bắt buộc | UX-35 xác nhận thao tác không hoàn tác | `method` Phương thức giao dịch điện tử, thẻ "Chờ Tòa duyệt" | Bấm "Hủy yêu cầu" là hủy ngay (hiện "Đã hủy yêu cầu."), không hỏi lại. Yêu cầu đã gửi Tòa bị hủy, không lấy lại được. | Thêm hộp thoại xác nhận như "Xóa bản nháp": tiêu đề "Hủy yêu cầu chuyển phương thức?", nút "Không" và "Hủy yêu cầu" (màu nguy hiểm). |
| 2.2 | Nên | UX-35 | `sub4`, `sub4Yc`, `sub4Doi`, `tr2Bang` (bảng yêu cầu khi soạn đơn) | "Xóa dòng yêu cầu" xóa ngay cả dòng đã nhập, không hỏi lại, không có hoàn tác. | Dòng đã có nội dung thì hỏi xác nhận, hoặc hiện snackbar "Đã xóa yêu cầu 1 · Hoàn tác". Dòng trống thì xóa ngay. |
| 2.3 | Xem lại | UX-35 | `personal` Cá nhân | "Đăng xuất" thoát ngay, không hỏi lại. Đăng nhập lại được nên không mất dữ liệu; nếu có đơn đang soạn chưa lưu thì nên hỏi. | Giữ như hiện tại, hoặc thêm hộp thoại xác nhận ngắn. |
| 2.4 | Xem lại | APP-26 chữ 10px | `copyDetailDone` Chi tiết bản sao (đã xong) | Dòng "Tòa án nhân dân khu vực 1 - Hà Nội · 15/10/2026 09:00" dưới "Đã ký số hợp lệ" đang 10px. Đây là nội dung, không phải số đếm hay nhãn tháng. | Lên 12/16. |

## 3. Đã kiểm, không có vấn đề

- **UX-35 xác nhận:**
  - Các nút có hộp thoại xác nhận: "Xóa nháp" (khiếu nại, trích lục), "Xóa phương thức ký mặc định", "Xóa chứng thư khỏi danh sách", "Thu hồi" người đại diện.
  - "Rút đơn" ở mọi loại đơn (khởi kiện, kháng cáo, GĐT, phản tố, yêu cầu độc lập, hòa giải, trích lục) sang luồng rút đơn 3 bước, có xem lại và ký trước khi gửi.
  - "Xóa nội dung" ở ô tìm kiếm chỉ xóa chữ trong ô, không cần xác nhận.
- **APP-11 lối thoát:** cả 54 hộp thoại, bảng từ đáy đều có nút thoát ("Đóng", "Hủy", "Không", "Quay lại", "Bỏ qua"). Màn lỗi tải nháp `draftLoadErr` có "Về Quản lý đơn".
- **UX-37 chỉ dùng màu:** các chấm màu không kèm chữ chỉ là chấm "có lịch" một màu dưới ngày ở dải tuần và chấm chuyển trang banner. Chấm trạng thái, chấm loại sự kiện ở lịch, chú thích mức hạn ở Việc cần làm đều có chữ đi kèm.

## 4. Giới hạn

- Script bấm nút chỉ nhận ra nút theo chữ (xóa, rút, hủy…). Nút chỉ có biểu tượng thùng rác mà không có tên thì không được bấm thử. Đã kiểm APP-1: không có nút nào thiếu tên.
- Chưa kiểm khi phóng to chữ hệ thống. Prototype chỉ có giao diện sáng.
