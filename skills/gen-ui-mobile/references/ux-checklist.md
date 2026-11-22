# Danh sách kiểm tra UX cho màn mobile TATC

Bộ luật này lọc từ skill **ui-ux-pro-max** (bảng `ux-guidelines.csv`, `app-interface.csv` và danh sách kiểm tra trong `references/pro-rules.md`), chỉ giữ luật áp cho app mobile. Mỗi luật đã được ghép với component và token của design system **TuPhap**.

- **Mã luật:** `UX-n` là dòng n trong `ux-guidelines.csv`, `APP-n` là dòng n trong `app-interface.csv`. Dùng mã này khi trích dẫn trong đề xuất hoặc báo cáo, và khi tra sâu bằng ui-ux-pro-max.
- **Mức:** **Bắt buộc** thì phải sửa trước khi giao. **Nên** thì sửa nếu không trái quyết định đã chốt, không sửa thì ghi vào báo cáo.
- **Tự kiểm:** ✓ nghĩa là `scripts/ux-audit.js` phát hiện được; ✓ probe nghĩa là `scripts/ux-probe.js` (bấm thử) phát hiện được. Các luật còn lại kiểm bằng mắt.

## Mục lục

1. Thứ tự ưu tiên khi luật xung đột
2. Luật riêng TATC rút từ góp ý người dùng
3. Truy cập (đọc màn hình, tương phản)
4. Chạm và tương tác
5. Biểu mẫu
6. Điều hướng và bảng từ đáy
7. Phản hồi và trạng thái
8. Chữ và nội dung
9. Những phần không dùng của ui-ux-pro-max

## 1. Thứ tự ưu tiên khi luật xung đột

1. Yêu cầu của người dùng trong phiên.
2. Quyết định đã chốt: `design-system-chot-2026-10-30.md`, rồi tới `design-system-day-du.md`.
3. Token và component của TuPhap.
4. Luật trong danh sách này (lấy từ ui-ux-pro-max).

Hai xung đột đã gặp và cách xử lý:

| Xung đột | Cách xử lý |
|---|---|
| ui-ux-pro-max khuyên chữ nội dung 16px (UX-67), design system cho tiêu đề dòng 14px, chữ phụ 12px | Giữ thang chữ design system (10·12·14·16·18·20·22·24; thêm 18 và 22 ngày 20/11/2026). Khối nhãn – giá trị: nhãn 12/20, giá trị 14/20. Chữ 10px chỉ cho số đếm, chữ "PDF", nhãn tháng, chữ trong trang văn bản mô phỏng. |
| Vùng bấm tối thiểu 44pt iOS / 48dp Android (APP-6), design system có nút nhỏ 36px trong dòng hoặc thẻ | Giữ hình nút, nới vùng bấm vô hình bằng `::after`/`::before` định vị tuyệt đối (`width:max(100%,44px);height:max(100%,44px)`, căn giữa) – prototype gắn lớp `hit44` tự động. Ô chọn nằm trong nhãn thì nới vùng bấm của nhãn. Không phóng to hình nút. |

## 2. Luật riêng TATC rút từ góp ý người dùng

Các luật này nặng hơn luật chung, vì người dùng đã nói rõ.

| Luật | Mức |
|---|---|
| Mỗi phương án đề xuất phải nói được nó giải quyết vấn đề UX nào (trích mã luật). Không đưa phương án chỉ khác hình thức, như đổi lưới, đổi màu thẻ, xếp chồng thẻ. | Bắt buộc |
| Làm gọn giao diện không được lược bớt thông tin. Muốn gọn thì sắp xếp lại thứ tự, căn lề, phân tầng chữ; không bỏ trường. | Bắt buộc |
| Chỉ dùng token màu design system. Màu phải mang nghĩa (trạng thái, mức hạn); không dùng dải màu trang trí gợi ra thứ tự hay mức độ không có thật. | Bắt buộc |
| Không dùng thẻ đè lên nhau (kiểu ví), không dùng khối màu đậm cho mục điều hướng: dễ bị hiểu là vuốt được hoặc là bảng từ đáy, và tranh chú ý với header và nút (+). | Bắt buộc |
| Thông tin không đặt trực tiếp trên nền trang. Chữ cố định đặt trên nền, các trường liền nhau gom chung một khối trắng. | Bắt buộc |
| Ngày hiển thị DD-MM-YYYY, có giờ thì DD-MM-YYYY HH:mm, giữ năm (người dùng chốt 20/11/2026, v535; trước là dd/mm/yyyy). | Bắt buộc |
| Biểu tượng chọn trong bộ biểu tượng TuPhap. Cần biểu tượng ngoài bộ thì nêu rõ trong đề xuất và chờ người dùng chọn. | Bắt buộc |
| Thao tác không hoàn tác được (hủy yêu cầu đã gửi, xóa nháp, thu hồi, xóa chứng thư, đăng xuất) hỏi xác nhận bằng hộp thoại giữa màn: tiêu đề là câu hỏi, một câu nói hệ quả, "Không"/"Hủy" bên trái, nút hành động bên phải. "Xóa dòng yêu cầu" trong biểu mẫu soạn đơn giữ xóa ngay (người dùng chọn 20/11/2026). | Bắt buộc |
| Nhãn có nền màu dùng cặp token `--tag-N-bg` / `--tag-N-text`, không tự pha màu chữ trên nền nhạt. | Bắt buộc |
| Phương án có sửa giao diện thì dựng demo, chụp ảnh cạnh bản hiện tại để người dùng chọn trước; chỉ áp những mục được chọn. | Bắt buộc |
| Chữ dài quá chỗ hiển thị thì cắt bằng "…" – quy tắc chung mọi màn (tiêu đề header, tên đơn, tên tệp, ô chọn, nhãn…), người dùng chốt 20/11/2026. Không đề xuất xuống dòng hay co chữ thay thế; rà soát không báo chữ bị cắt. | Bắt buộc |

## 3. Truy cập (đọc màn hình, tương phản)

| Mã | Luật | Áp vào TATC | Mức | Tự kiểm |
|---|---|---|---|---|
| UX-36, UX-76 | Chữ thường tương phản ≥ 4,5:1, chữ lớn (≥ 24px, hoặc ≥ 18,66px đậm) ≥ 3:1 | Tính từ token: chữ `--ink`, `--ink-subtle` trên `--surface`; chữ trắng trên `--brand-800`. Chữ trên nền chuyển màu thì tính ở chỗ nhạt nhất. | Bắt buộc | ✓ |
| UX-37, UX-114 | Không báo trạng thái chỉ bằng màu | Nhãn trạng thái (`StatusBadge`) luôn có chữ. "Còn n ngày" có chữ, màu chỉ là lớp thêm. Chấm "có lịch" một màu dưới ngày và chấm chuyển trang banner được phép. | Bắt buộc | ✓ probe (liệt kê để xem) |
| UX-40, APP-1 | Nút chỉ có biểu tượng phải có tên đọc màn hình | `T.IconButton` có `label`; nút tự dựng thì đặt `aria-label` bằng đúng chữ cũ (luật bấm `R` của prototype cũng khớp theo nhãn này). | Bắt buộc | ✓ |
| APP-5 | Biểu tượng trang trí ẩn khỏi trình đọc màn hình | `T.Icon` và hình minh họa đặt trong khung `aria-hidden="true"`. | Nên | |
| UX-38 | Ảnh có nghĩa phải có chữ thay thế | Ảnh nền, ảnh trang trí để `alt=""`. | Bắt buộc | ✓ |
| UX-43, APP-2, UX-54 | Ô nhập có nhãn nhìn thấy, không dùng chữ gợi ý thay nhãn | Dùng `Tf(label, …)` và ô chọn của TuPhap, nhãn đặt trên ô. | Bắt buộc | ✓ |
| UX-44, APP-4 | Thông báo lỗi và cập nhật trạng thái phải được đọc lên | Lỗi dưới ô dùng vùng thông báo (`role="alert"` hoặc `aria-live`); snackbar dùng vùng `aria-live`. | Nên | |
| APP-3, UX-42 | Phần tử bấm được có vai trò đúng | Dùng `button` hoặc `a`, không dùng `div` có `onClick`. | Bắt buộc | |

## 4. Chạm và tương tác

| Mã | Luật | Áp vào TATC | Mức | Tự kiểm |
|---|---|---|---|---|
| APP-6, UX-22 | Vùng chạm ≥ 44×44pt (iOS) / 48×48dp (Android) | Nút chính 46px theo design system. Nút nhỏ 36px thì nới vùng chạm vô hình (mục 1). Thẻ, dòng danh sách bấm được cả thẻ. | Bắt buộc | ✓ |
| APP-7, UX-23 | Hai vùng chạm cạnh nhau cách ≥ 8px | Nút trong thẻ cách nhau ≥ 8px; nút đầu khối không sát nút khác. | Nên | |
| UX-30 | Có phản hồi khi nhấn | Dùng trạng thái nhấn có sẵn của component, không làm xê dịch bố cục. | Nên | |
| UX-31 | Trạng thái tắt rõ ràng | `disabled` thật, giảm độ đậm, không phản hồi khi bấm. | Bắt buộc | |
| UX-32 | Chống bấm hai lần khi đang xử lý | Nút gửi chuyển sang đang tải và khóa lại. | Bắt buộc | |
| UX-35 | Xác nhận trước thao tác không hoàn tác được | Xóa nháp, hủy yêu cầu, thu hồi, đăng xuất: hộp thoại giữa màn (`QdConfirm` khi chuyển màn, `XnDlg` khi xử lý ngay trong màn). Rút đơn, gửi đơn đi qua luồng có bước xem lại và ký. | Bắt buộc | ✓ probe |
| APP-8, UX-24, APP-30 | Không chiếm cử chỉ hệ thống; không có thao tác chỉ làm bằng cử chỉ ẩn | Vuốt ngang chỉ dùng cho băng chuyền. Mọi thao tác chính đều có nút nhìn thấy. | Bắt buộc | |
| UX-11 | Không dựa vào rê chuột | Thông tin quan trọng không nằm trong tooltip. | Bắt buộc | |

## 5. Biểu mẫu

| Mã | Luật | Áp vào TATC | Mức |
|---|---|---|---|
| UX-55, APP-15 | Lỗi hiện ngay dưới ô sai, nói rõ sai gì | Câu lỗi lấy đúng từ mã nguồn web; còn thiếu thì để `[Câu lỗi …]`. | Bắt buộc |
| UX-56, APP-16 | Kiểm khi rời ô hoặc khi gửi, không kiểm từng phím | Theo hành vi của web nếu web đã quy định. | Nên |
| UX-59 | Đánh dấu trường bắt buộc | Dấu `*` theo design system. | Bắt buộc |
| UX-57, UX-63, APP-17 | Bàn phím đúng loại (số, điện thoại, email) | Ghi chú loại bàn phím trong prototype cho ô số CCCD, số điện thoại, email. | Nên |
| UX-61 | Gửi xong có phản hồi | Đang gửi → thành công (snackbar hoặc màn kết quả) / lỗi (khối lỗi có nút thử lại). | Bắt buộc |
| UX-106 | Không bắt nhập lại thông tin đã có | Lấy sẵn thông tin hồ sơ cá nhân, đương sự đã nhập ở bước trước. | Nên |
| UX-81 | Luồng nhiều bước có chỉ báo tiến trình | `Steps(steps, cur)`. | Bắt buộc |

## 6. Điều hướng và bảng từ đáy

| Mã | Luật | Áp vào TATC | Mức |
|---|---|---|---|
| APP-9, UX-4 | Nút quay lại đoán được, giữ trạng thái màn trước | Luật `R` dùng `back` / `backTo:`; không dùng `reset:` khi người dùng chỉ quay lại. | Bắt buộc |
| APP-12 | Quay lại màn giữ vị trí cuộn và dữ liệu đã nhập | Ghi rõ trong luồng nếu màn phải tải lại. | Nên |
| APP-10 | Thanh điều hướng dưới tối đa 5 mục | Hiện có 4 mục và nút (+). | Bắt buộc |
| UX-3 | Mục đang chọn nổi rõ | Tab đang mở tô màu brand, kèm chữ. | Bắt buộc |
| APP-11 | Bảng từ đáy và hộp thoại có lối thoát rõ | `LvSheet` / `Dialog variant="sheet"` có nút đóng; bấm nền tối thì đóng. | Bắt buộc (✓ probe) |

## 7. Phản hồi và trạng thái

| Mã | Luật | Áp vào TATC | Mức |
|---|---|---|---|
| UX-10, UX-78, APP-13 | Có trạng thái đang tải cho thao tác mạng | Màn danh sách có trạng thái đang tải (`tp-spinner` hoặc khung xương). | Bắt buộc |
| UX-79 | Màn trống có hướng dẫn | Dùng mẫu khối trống theo quyết định đã chốt mới nhất trong tài liệu design system; câu chữ lấy theo web. | Bắt buộc |
| UX-80, UX-33 | Lỗi có đường phục hồi | Lỗi tải: câu lỗi của hệ thống và nút "Thử lại". | Bắt buộc |
| UX-34, UX-83, APP-14 | Thành công có xác nhận ngắn | Snackbar; với thao tác quan trọng thì dùng màn kết quả. | Bắt buộc |
| UX-82 | Thông báo tạm tự tắt sau 3–5 giây | Snackbar của prototype. | Nên |

## 8. Chữ và nội dung

| Mã | Luật | Áp vào TATC | Mức | Tự kiểm |
|---|---|---|---|---|
| APP-26 | Chữ nội dung không nhỏ hơn 12px | Thang chữ design system; 10px chỉ cho số đếm, "PDF", nhãn tháng, chữ trong văn bản mô phỏng. | Bắt buộc | ✓ |
| UX-74, UX-77 | Thang chữ nhất quán, tiêu đề khác rõ nội dung | Chỉ dùng 10·12·14·16·18·20·22·24 (thêm 18, 22 ngày 20/11/2026); khối nhãn – giá trị: nhãn 12, giá trị 14; và 3 độ đậm 400/500/700. | Bắt buộc | ✓ (cỡ ngoài thang) |
| UX-113 | (Không áp dụng cho TATC) Không cắt chữ mang nghĩa chính | Người dùng chốt 20/11/2026: dài quá thì hiển thị "…" ở mọi màn, xem mục 2. | – | – |
| UX-116 | Nhãn dạng viên giữ trên 1 dòng | `StatusBadge` không xuống dòng; nhãn dài thì rút ngắn theo quy ước của web. | Nên | |
| UX-115 | Dãy chip lọc không bị cắt mất chip | Cho cuộn ngang có dấu hiệu, hoặc xuống dòng. | Bắt buộc | |
| UX-85, UX-86 | Ngày, số định dạng rõ | Ngày DD-MM-YYYY (có giờ: DD-MM-YYYY HH:mm); tiền có dấu chấm ngăn nghìn và đơn vị "đồng". | Bắt buộc | |
| APP-27 | Chịu được khi người dùng phóng chữ | Không cố định chiều cao cho khối chứa chữ dài; thử phóng chữ 130% với màn mới. | Nên | |

## 9. Những phần không dùng của ui-ux-pro-max

TATC đã có design system riêng, nên **không** dùng:

- `--design-system`, `--persist`, `--tokens`: các lệnh này tự sinh bảng màu, font và tệp `MASTER.md` mới, trái với TuPhap.
- Các nhóm tra cứu `style`, `color`, `typography`, `google-fonts`, `landing`, `gsap`, `react` (hiệu năng).
- Nhóm `icons` để thêm thư viện mới (Phosphor, Lucide…). Chỉ tham khảo ý nghĩa biểu tượng rồi chọn trong bộ TuPhap.
- Các mục chế độ tối trong danh sách kiểm tra của pro-rules: prototype TATC hiện chỉ có giao diện sáng.
