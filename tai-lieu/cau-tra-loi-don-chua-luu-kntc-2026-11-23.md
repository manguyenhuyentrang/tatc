# Khiếu nại – Tố cáo hành chính: khối "Đơn chưa lưu" (23-11-2026)

- Prototype đã so: **v571**. Web: `tatc.congdichvu.web` origin/develop 37dcbba0, `src/screens/khieu-nai-hanh-chinh/index.tsx` (`KhoiNhap`, dòng 51–100), đặt ở `khieu-nai-to-cao/index.tsx:72` (chỉ tab hành chính).
- Phiên này chỉ demo và ghi lại; áp dụng vào prototype ở phiên chính.

## Hiện trạng v571

- Khối đã có (`s5.js` `KnNhapHc`) nhưng chỉ hiện ở màn biến thể `complaintsNhap` (đang khai, bước 2/5) và `complaintsNhapKy` (đã ký số, chưa gửi, bước 5/5). Vào chức năng từ menu (màn `complaints`) **không** có khối.
- **Lỗi**: thanh tiến độ có trong DOM nhưng cao 0px (lớp chung `.dg-bar{flex:1}` trong khối xếp cột) nên không hiện. Sửa: `flex:none`, cao 6px.
- Khác web: nền trắng (web nền vàng nhạt, viền vàng); nút viền đỏ cỡ nhỏ (web nút màu cảnh báo, có mũi tên, toàn ngang trên điện thoại).

## Chốt

- **Luôn hiển thị dữ liệu demo khi chọn chức năng** – chỉ áp cho Khiếu nại – Tố cáo hành chính: vào chức năng từ menu (màn `complaints`, tab hành chính) là thấy ngay khối "Đơn chưa lưu" ở trạng thái đang khai (bước 2/5 · Cá nhân, đơn vị bị khiếu nại). Giữ màn `complaintsNhapKy` cho trạng thái đã ký số, chưa gửi.
- Sửa thanh tiến độ hiện màu đỏ (`--brand-800`) theo số bước.
- Kiểu khối: **chốt PA A – như web**: nền vàng nhạt (`--warning-tint`), viền vàng (`--warning-border`), thanh tiến độ đỏ trên nền vàng, nút màu cảnh báo (`--warning`, chữ trắng) có mũi tên ›, trải toàn ngang ("Tiếp tục khai" / "Tiếp tục gửi đơn"). (Đã demo PA A / PA B nền trắng / PA C nút nhỏ căn trái.) Ảnh: `C:\Users\trangmnh\AppData\Local\Temp\claude\7fa6e392304388b5\5d485666-bb1a-4ea0-a1ce-a104ccbd9326\scratchpad\f\pg-dang-khai.png`, `pg-da-ky.png`.

> Đã áp vào prototype v574 ở phiên chính (23-11-2026): màn complaints luôn có khối đang khai; PA A nền vàng, thanh đỏ 6px, nút cảnh báo có mũi tên toàn ngang; kiểm tra cả complaintsNhapKy.
> 23-11-2026 (v575, phiên chính): người dùng đổi ý, chọn "Kiểu trong ảnh" thay PA A – khối nền trắng, nút viền đỏ cỡ nhỏ căn trái, không mũi tên; vẫn giữ khối hiện sẵn khi vào từ menu và thanh tiến độ đỏ 6px (nền thanh xám).

## Nhãn quá dài trên thẻ danh sách KNTC hành chính (23-11-2026, demo trên bản sao v572/v574)

- Vấn đề: hàng nhãn trên thẻ (trạng thái + loại đơn + "Bảo vệ người tố cáo") quá dài, ví dụ "Đang kiểm tra điều kiện thụ lý" + "Tố cáo" + "Bảo vệ người tố cáo" sát mép/tràn.
- Đã demo PA A–G (tự xuống dòng; loại đơn thành dòng thông tin; trạng thái chấm màu; loại đơn chữ nhỏ; khiên; dải chân thẻ; trái/phải) – người dùng chưa ưng, đưa phương án riêng.
- **Chốt**: bỏ nhãn loại đơn ("Khiếu nại", "Tố cáo", "Kiến nghị…", "Rút đơn…") trên thẻ (`KnHcCard`, s5.js); ghi loại đơn vào đầu giá trị dòng **Thủ tục**: "{Loại đơn} - {tên thủ tục, chữ đầu viết thường}", ví dụ "Tố cáo - hành vi vi phạm của cán bộ, công chức trong nhiệm vụ, công vụ", "Khiếu nại - hành vi hành chính của Tòa án". Hàng trên chỉ còn nhãn trạng thái và nhãn "Bảo vệ người tố cáo" (nếu có).
- Ảnh: `C:\Users\trangmnh\AppData\Local\Temp\claude\7fa6e392304388b5\5d485666-bb1a-4ea0-a1ce-a104ccbd9326\scratchpad\f\pj-nhan-dai.png`. Áp dụng ở phiên chính.

> Đã áp vào prototype v576 ở phiên chính (23-11-2026): bỏ nhãn loại đơn trên thẻ, dòng Thủ tục "{Loại đơn} - {tên thủ tục}"; hồ sơ tải thêm cũng có tên thủ tục.
