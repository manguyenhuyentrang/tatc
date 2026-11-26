# Trả lời các case F – sheet 1 Nộp đơn khởi kiện (lần chạy 21-11-2026 trên v536)

- File: `E:\TATC\Mobile\TestCase_Mobile\TATC_Mobile_TC_NopDonKhoiKien.xlsx`, sheet 1, chạy 21-11-2026 02:05: 97 case, 90 P, 7 F, không PE, không chưa test.
- Phiên bản prototype đã so: **v536**.
- Phiên này chỉ hỏi và ghi lại; sửa chính thức làm ở phiên chính.

| Case | Mã | Vấn đề (v536) | Trả lời |
|---|---|---|---|
| 1.14 | G-09 | Loại việc không dành cho loại tài khoản vẫn hiện trong danh sách Bước 1 (tổ chức chọn được Đ.28.2, Đ.29.x rồi Bước 2 mới chặn; cá nhân thấy "Bí mật kinh doanh", bấm mới báo chặn). Web ẩn hẳn. | Sửa theo web: ẩn loại việc không dành cho tài khoản khỏi danh sách; bỏ thẻ chặn Bước 2 và thông báo chặn |
| 1.28 | G-15 | Ô Phường/Xã khi chưa chọn tỉnh vẫn mở bảng chọn; web báo "Chọn tỉnh / thành phố trước". | Khóa ô + gợi ý: ô Phường/Xã mờ, chữ gợi ý "Chọn tỉnh / thành phố trước", bấm không mở; áp mọi nhóm địa chỉ |
| 1.39 | W-19 | Thiếu kiểm tra người đại diện đã được chỉ định cho bên còn lại. | Thêm theo web: kiểm tra đại diện cho bên còn lại, câu lỗi nguyên văn web, hiện cùng chỗ các lỗi xác minh |
| 1.42 | W-21 | Thiếu các câu trùng số giấy tờ/MST/tổ chức/người đại diện; kiểm tra trùng chỉ ở màn mẫu. | Thêm theo web: đủ 5 câu trùng đương sự, kiểm tra chạy ở luồng Bước 2 thường (đối chiếu Bước 3), lỗi dưới ô số trải toàn dòng |
| 1.44 | W-22 | Thiếu giới hạn ký tự (Nghề nghiệp nhận 520 ký tự, không báo "Tối đa 500 ký tự"). | Báo lỗi như web: bấm Tiếp theo thì ô vượt giới hạn tô đỏ + 'Tối đa {max} ký tự' dưới ô (Nghề nghiệp 500) |
| 1.77 | W-39 | Thiếu trạng thái "Đang tải danh sách tòa án…" (đã duyệt trong demo, chưa vào v536). | Bổ sung vào bản chính: trạng thái 'Đang tải danh sách tòa án…' trong bảng chọn + màn trạng thái như demo đã duyệt |
| 1.91 | W-49 | Thiếu trạng thái "Không tra được trạng thái ký số — vui lòng ký lại." và lỗi "Không ký được". | Thêm theo web: 2 trạng thái 'Không tra được trạng thái ký số — vui lòng ký lại.' và 'Không ký được', cùng kiểu khung cảnh báo vàng + nút Ký lại |

## Demo phương án sửa (21-11-2026, trên bản sao v536, chỉ đổi giao diện lúc chụp)

Ảnh demo: `C:\Users\trangmnh\AppData\Local\Temp\claude\7fa6e392304388b5\5d485666-bb1a-4ea0-a1ce-a104ccbd9326\scratchpad\f\pa-<case>.png`. Áp dụng vào prototype ở phiên chính.

| Case | Phương án demo | Chốt |
|---|---|---|
| 1.14 | Ẩn hẳn loại việc không dành cho loại tài khoản (tổ chức: ẩn Đ.28.2, Đ.29.x; cá nhân: ẩn "Bí mật kinh doanh"); bỏ thẻ chặn Bước 2 và thông báo chặn | Đồng ý, sửa ở phiên chính |
| 1.28 | PA A nền xám (ô khóa của hệ thống) / PA B nền trắng viền nét đứt; người dùng chọn "nền xám nhưng không đổi chữ gợi ý, chọn tỉnh xong thì mở" → demo lại (pa-1.28b) | Chốt: chưa chọn Tỉnh/TP thì ô Phường/Xã nền xám, khóa, giữ chữ gợi ý "Phường/Xã" (không dùng "Chọn tỉnh / thành phố trước"); chọn Tỉnh/TP xong thì mở; áp mọi nhóm địa chỉ |
| 1.39 | Câu web "Người này đã được chỉ định làm người đại diện cho bên còn lại (nguyên đơn/bị đơn) trong đơn — không được đại diện đồng thời cho cả hai bên." (tổ chức: "Tổ chức này đã được chỉ định…") ở chỗ lỗi xác minh | Duyệt, giống web: kiểm tra khi bấm Xác minh theo thứ tự thiếu ô → tự đại diện → trùng trong danh sách → trùng bên còn lại → mới xác minh; câu lỗi dưới nhóm ô bước 1, chữ đỏ, không tô đỏ ô; áp cả Cá nhân và Tổ chức (web: them-nguoi-dai-dien-modal.tsx, form.ts loiTrungBenToTung) |
| 1.42 | Số giấy tờ/MST trùng: câu dưới ô số, trải toàn dòng (như web). Người đại diện trùng bước kia: PA A dưới thẻ / PA B cuối khối / PA C như web (câu dưới ô tích, cả khối viền đỏ); demo thêm 3 người đại diện, 1 người trùng (pa-1.42d) | Chốt PA A: chỉ thẻ người đại diện bị trùng viền đỏ, câu "Người đại diện «{tên}» đã có ở bước …" ngay dưới thẻ đó; số giấy tờ/MST trùng giữ câu dưới ô số toàn dòng; đủ 5 câu web, kiểm tra ở luồng Bước 2 thường |
| 1.44 | PA A chỉ câu "Tối đa {max} ký tự" (như web) / PA B câu lỗi trái + bộ đếm phải | Chốt PA B: bấm Tiếp theo mà ô vượt giới hạn thì ô viền đỏ, dưới ô câu "Tối đa {max} ký tự" căn trái + bộ đếm "{n}/{max}" căn phải (Nghề nghiệp 500) |
| 1.77 | PA A vòng quay + câu giữa bảng / PA B câu đầu bảng + dòng xương | Chốt PA A: khi đang tải, bảng chọn Tòa án ẩn danh sách, giữa bảng hiện vòng quay + "Đang tải danh sách tòa án…" |
| 1.91 | "Không tra được trạng thái ký số — vui lòng ký lại." khung vàng + Ký lại; "Không ký được": PA A chỉ câu / PA B tiêu đề đậm + câu | Chốt: "Không tra được…" khung vàng như demo; "Không ký được" PA B: khung vàng, tiêu đề đậm "Không ký được" + câu theo mã lỗi web (CA_TU_CHOI "Yêu cầu ký đã bị từ chối trên ứng dụng chữ ký số.", CA_LOI "Nhà cung cấp chữ ký số báo lỗi khi xử lý yêu cầu — vui lòng ký lại.", lỗi khác "Không thể hoàn tất ký số do lỗi hệ thống — vui lòng ký lại."), nút Ký lại |

## Lượt chạy 22-11-2026 21:34 (v537): 92 P, 5 F – demo sửa theo web (22-11-2026, bản sao v537)

Ảnh: `C:\Users\trangmnh\AppData\Local\Temp\claude\7fa6e392304388b5\5d485666-bb1a-4ea0-a1ce-a104ccbd9326\scratchpad\f\pb-<case>.png`. Người dùng yêu cầu sửa theo web 1.28, 1.55, 1.90; 1.8 và 1.11 chưa chốt. Áp dụng ở phiên chính.

| Case | Phương án demo | Chốt |
|---|---|---|
| 1.28 | Bảng Tỉnh/thành phố, Phường/xã thêm ô tìm "Nhập để tìm" (web: components/ui/select.tsx hiện ô tìm khi > 10 mục) | Duyệt: có ô tìm khi trên 10 mục, lọc không phân biệt dấu, bảng giữ chiều cao khi lọc; áp mọi nhóm địa chỉ |
| 1.55 | Người bị kiện / người liên quan (ô tự nhập): câu web "Bắt buộc chọn tỉnh/thành", "Bắt buộc chọn phường/xã", "Bắt buộc nhập số nhà, đường" (web: index.tsx kiemTraFields); câu "Tài khoản chưa có thông tin …" chỉ cho ô khóa theo tài khoản | Duyệt như ảnh |
| 1.90 | Bước chờ ký theo web (components/ky-so/xac-nhan-ky-so.tsx): bỏ "Tôi đã xác nhận", tự kiểm tra mỗi 3 giây; PA A "Còn 298s" / PA B "Còn 04:58" | Chốt PA B: tiêu đề "Xác thực ký số"; câu "Vui lòng mở ứng dụng {CA} trên điện thoại để xác thực. Nhấn “Xác nhận” trên ứng dụng để hoàn tất quá trình ký số."; nhãn "Còn mm:ss để xác nhận · kiểm tra lúc HH:mm:ss" (đếm ngược thật); nút "Đóng" / "Gửi lại" (khóa + vòng quay khi đang chờ); ghi chú "Hệ thống đang chờ xác nhận từ ứng dụng chữ ký số — chỉ gửi lại được sau khi phiên hiện tại kết thúc."; ký xong bảng tự đóng; lỗi hiện khung vàng + "Ký lại" như 1.91 |

## Ký số: 2 điểm thiếu so với web (22-11-2026, demo trên bản sao v538)

Nguồn web: components/ky-so/chon-chu-ky-so-phien.tsx (poll 3 giây, nút "Ký" khóa khi `dangCho`/`hoSoDangKhoa`, khung "Hồ sơ đang có người khác ký"). Ảnh: `…\scratchpad\f\pc-dong.png`, `pc-molai.png`. Áp dụng ở phiên chính.

| Điểm | Phương án demo | Chốt |
|---|---|---|
| 1. Bấm "Đóng" ở bước chờ "Xác thực ký số" | PA A như web: về bảng chọn nhà cung cấp, "Ký" khóa + vòng quay, vẫn tự kiểm tra / PA B như PA A + dòng đang chờ | Chốt PA B: "Đóng" quay về bảng chọn nhà cung cấp (không đóng hẳn), nút "Ký" khóa + vòng quay, thêm dòng "Đang chờ xác nhận trên ứng dụng {CA} — còn mm:ss · kiểm tra lúc HH:mm:ss"; vẫn tự kiểm tra mỗi 3 giây; xác nhận xong bảng tự đóng, Bước 7 chuyển "Đã ký" (không thanh báo thành công, theo 1.80) |
| 2. Mở lại "Ký số" khi phiên trước còn hạn | Khung vàng "Hồ sơ đang có người khác ký — còn khoảng …, vui lòng chờ rồi thử lại.", "Ký" khóa; PA A "252s" như web / PA B "04:12" | Chốt PA B: đóng hẳn bảng rồi mở lại "Ký số" khi phiên còn hạn thì hiện khung vàng với "còn khoảng mm:ss" đếm ngược thật, nút "Ký" khóa; hết phiên thì khung tắt, "Ký" mở lại (màn signBan dùng chung, bỏ số cố định 45s) |

## Lỗi prototype v564–v567 còn tồn tại (23-11-2026, demo trên bản sao v567)

Đã chạy thử trên v567: lỗi 1, 2, 3 có thật; lỗi 4 (flow TestApp/ky-so chờ "Đã ký số") là flow lệch, không phải lỗi prototype. Người dùng: chỉ demo để xác nhận, áp dụng ở phiên chính. Ảnh: `…\scratchpad\f\pe-1.png`, `pe-2.png`, `pe-3.png`.

| Lỗi | Phương án demo | Chốt |
|---|---|---|
| 1. "Áp dụng" bấm được khi chưa chọn / tìm không có kết quả (mọi bảng chọn dùng LvSheet, s3.js) | Chưa đánh dấu → khóa; đã đánh dấu rồi tìm 0 kết quả: PA A khóa / PA B bấm được | Chốt PA A: "Áp dụng" khóa khi chưa đánh dấu mục nào HOẶC khi ô tìm không ra kết quả; áp mọi bảng chọn có nút Áp dụng (kể cả bảng lọc Kho) |
| 2. Màn sub6TaiToa (đang tải danh sách tòa án) thiếu "Áp dụng" | Thêm chân nút "Áp dụng", khóa khi đang tải | Duyệt |
| 3. Đóng hẳn bảng ký khi phiên còn hạn thì Bước 7 không báo gì | Như web (step-7.tsx:279, tien-do-ky-to-chuc.tsx khoaChung): Bước 7 hiện khung vàng "Hồ sơ đang có người ký, hệ thống đang xử lý — vui lòng chờ rồi thử lại.", "Ký số" khóa; dùng lại giao diện màn sub7Ban, nối vào luồng | Duyệt: hết phiên thì khung tắt, "Ký số" mở lại; ký xong chuyển "Đã ký" |
| 4. Flow TestApp/ky-so chờ "Đã ký số" | Không phải lỗi prototype (Bước 7 v567 hiện "Đã ký lúc …" + nhãn "Đã ký", theo quyết định 21/11) | Flow ky-so-ca-nhan.yaml:27, ky-so-to-chuc.yaml:72 cần sửa theo màn của app thật (chưa đối chiếu app thật) |

Đã áp lỗi 1, 2, 3 vào prototype **v568** (23-11-2026, phiên chính). Lỗi 4 không sửa prototype. Q-V564-A-01 (giữ mục đã đánh dấu khi tìm) vẫn chờ chọn A hay B.

> 23-11-2026 (v572): đối chiếu lại web chon-chu-ky-so-phien.tsx – khi phiên ký đang chạy web ẩn Tư cách ký, Người đại diện ký, danh sách nhà cung cấp, Ghi nhớ (không phải "về bảng chọn nhà cung cấp" như mô tả PA A ở trên). Người dùng yêu cầu làm theo web; đã áp v572, giữ dòng đang chờ của PA B.
