# Công tắc chọn Cá nhân / Tổ chức: thu gọn (23-11-2026)

- Prototype đã so: **v550**. Demo dựng trên bản sao, chỉ đổi giao diện lúc chụp ảnh; prototype chưa sửa.
- Ảnh demo: `C:\Users\trangmnh\AppData\Local\Temp\claude\7fa6e392304388b5\5d485666-bb1a-4ea0-a1ce-a104ccbd9326\scratchpad\f\pd-cong-tac.png`.
- Áp dụng ở phiên chính.

## Vấn đề

Công tắc chọn (`T.SegmentedControl`, lớp `.tp-seg`) cao 48px, trải toàn dòng, tốn diện tích. Người dùng yêu cầu đề xuất kiểu khác, tối đa 3 giá trị chọn.

## Phương án đã demo (thẻ Người bị kiện, Bước 3)

| PA | Mô tả |
|---|---|
| A | Radio ngang như ô "Đối tượng" (~24px) |
| B | Thẻ chọn nhỏ 32px, ôm chữ, mục chọn viền đỏ nền đỏ nhạt |
| C | Giữ kiểu công tắc, thu còn 36px (nút 32px + đệm 2px), ôm chữ, căn trái |

## Chốt

- **PA C – công tắc thu gọn**: cao 36px, rộng ôm theo chữ (không trải toàn dòng), căn trái; giữ màu và kiểu mục đang chọn của công tắc hiện có. Tối đa 3 giá trị.
- **Phạm vi: chỉ công tắc chọn loại đương sự** (Cá nhân / Tổ chức / Cơ quan) và công tắc Có / Không:
  - `s3.js` `KindSeg` (Bước 2 người khởi kiện), Loại người đồng khởi kiện, Loại người bị kiện, Loại người liên quan, Loại đối tượng (Cá nhân / Cơ quan, tổ chức).
  - `s3.js` câu hỏi phân định Có / Không (Đ.26.4 / Đ.30.2).
- **Không áp dụng**: Loại tài khoản ở màn đăng nhập và các công tắc chữ dài ("Từ vụ án của tôi / Nhập thông tin bản án", "Phải nộp / Đã nộp, được miễn", "Xác nhận có mặt / Báo vắng", "Cách nhập nội dung", "Cách tạo văn bản") giữ nguyên trải toàn dòng.
