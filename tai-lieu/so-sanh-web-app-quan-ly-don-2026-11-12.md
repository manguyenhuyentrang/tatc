# So sánh Web – App: Quản lý đơn và các luồng con (12/11/2026)

- Web: http://10.15.73.100:5180/quan-ly-don — tatc.congdichvu.web develop @ ae854d37, coreapi develop @ 97476918
- App: prototype `prototype/Prototype-TATC-v349.html`
- Phần đọc mã nguồn do 6 agent làm song song; đã kiểm tra lại vài điểm (nhóm "Đơn yêu cầu khác" trên web đang bị comment; app chưa có luồng thay đổi, rút kháng cáo). Các dòng khác lấy theo báo cáo agent.
- Mã: QLDn-Wxx = Web có, app chưa có · QLDn-Mxx = App có, web không có (n = số nhóm).
- [Vào] = đăng nhập tài khoản công dân → Quản lý đơn → Danh sách đơn và tiến trình → bấm vào đơn. Đường dẫn tệp web bỏ phần `src/screens/`.

## Trạng thái trả lời (Có / Không)

Cách làm đã thống nhất: hỏi từng mã Có/Không. Với mã W: Có = đề xuất thiết kế (demo) để người dùng xác nhận rồi bổ sung vào prototype. Với mã M: Có = giữ trên app, Không = đề xuất bỏ cho giống web.

| Mã | Trả lời | Ghi chú |
|---|---|---|
| QLD1-W01 | Có | 13/11/2026 – đã demo, đã áp dụng v350 |
| QLD1-W02 | Có | 13/11/2026 – đã demo, đã áp dụng v350 |
| QLD1-W03 | Không | 13/11/2026 |
| QLD1-W04 | Có | 13/11/2026 – đã demo, đã áp dụng v350 |
| QLD1-W05 | Có | 13/11/2026 – đã demo, đã áp dụng v350 |
| QLD1-W06 | Có | 13/11/2026 – đã demo, đã áp dụng v350 |
| QLD1-W07 | Có | 13/11/2026 – đã demo, đã áp dụng v350 |
| QLD1-W08 | Có | 13/11/2026 – đã demo, đã áp dụng v350 |
| QLD1-W09 | Có | 13/11/2026 – đã demo, đã áp dụng v350 |
| QLD1-W10 | Có | 13/11/2026 – đã demo, đã áp dụng v350 |
| QLD1-W11 | Có | 13/11/2026 – đã demo, đã áp dụng v350 |
| QLD1-W12 | Có | 13/11/2026 – đã demo, đã áp dụng v350 |
| QLD1-W13 | Có | 13/11/2026 – đã demo, đã áp dụng v350 |
| QLD1-W14 | Có | 13/11/2026 – đã demo, đã áp dụng v350 |
| QLD1-M01 | Có (giữ) | 13/11/2026 |
| QLD1-M02 | Có (giữ) | 13/11/2026 |
| QLD1-M03 | Có (giữ) | 13/11/2026 |
| QLD2-W01 | Có | 13/11/2026 – đã demo, đã áp dụng v351 |
| QLD2-W02 | Có | 13/11/2026 – đã demo, đã áp dụng v351 |
| QLD2-W03 | Có | 13/11/2026 – đã demo, đã áp dụng v351 |
| QLD2-W04 | Có | 13/11/2026 – đã demo, đã áp dụng v351 |
| QLD2-W05 | Có | 13/11/2026 – đã demo, đã áp dụng v351 |
| QLD2-W06 | Có | 13/11/2026 – đã demo, đã áp dụng v351 |
| QLD2-W07 | Có | 13/11/2026 – đã demo, đã áp dụng v351 |
| QLD2-W08 | Có | 13/11/2026 – đã demo, đã áp dụng v351 |
| QLD2-W09 | Có | 13/11/2026 – đã demo, đã áp dụng v351 |
| QLD2-W10 | Có | 13/11/2026 – đã demo, đã áp dụng v351 |
| QLD2-W11 | Có | 13/11/2026 – đã demo, đã áp dụng v351 |
| QLD2-W12 | Có | 13/11/2026 – đã demo, đã áp dụng v351 |
| QLD2-W13 | Có | 13/11/2026 – đã demo, đã áp dụng v351 |
| QLD2-M01 | Có (giữ) | 13/11/2026 |
| QLD2-M02 | Không | 13/11/2026 – đã bỏ v351 |
| QLD2-M03 | Không | 13/11/2026 – đã bỏ v351 |
| QLD2-M04 | Không | 13/11/2026 – đã bỏ v351 |
| QLD2-M05 | Không | 13/11/2026 – đã bỏ v351 |
| QLD2-M06 | Không | 13/11/2026 – đã bỏ v351 |
| QLD3-W01 | Có | 13/11/2026 – đã demo, đã áp dụng v352 |
| QLD3-W02 | Có | 13/11/2026 – đã demo, đã áp dụng v352 |
| QLD3-W03 | Có | 13/11/2026 – đã demo, đã áp dụng v352 |
| QLD3-W04 | Có | 13/11/2026 – đã demo, đã áp dụng v352 |
| QLD3-W05 | Có | 13/11/2026 – đã demo, đã áp dụng v352 |
| QLD3-W06 | Có | 13/11/2026 – đã demo, đã áp dụng v352 |
| QLD3-W07 | Có | 13/11/2026 – đã demo, đã áp dụng v352 |
| QLD3-W08 | Có | 13/11/2026 – đã demo, đã áp dụng v352 |
| QLD3-W09 | Có | 13/11/2026 – đã demo, đã áp dụng v352 |
| QLD3-M01 | Có (giữ) | 13/11/2026 |
| QLD3-M02 | Có (giữ) | 13/11/2026 |
| QLD4-W01 | Có | 13/11/2026 – đã demo, đã áp dụng v353 |
| QLD4-W02 | Có | 13/11/2026 – đã demo, đã áp dụng v353 |
| QLD4-W03 | Có | 13/11/2026 – đã demo, đã áp dụng v353 |
| QLD4-W04 | Có | 13/11/2026 – đã demo, đã áp dụng v353 |
| QLD4-W05 | Có | 13/11/2026 – đã demo, đã áp dụng v353 |
| QLD4-W06 | Có | 13/11/2026 – đã demo, đã áp dụng v353 |
| QLD4-W07 | Có | 13/11/2026 – đã demo, đã áp dụng v353 |
| QLD4-W08 | Có | 13/11/2026 – đã demo, đã áp dụng v353 |
| QLD4-W09 | Có | 13/11/2026 – đã demo, đã áp dụng v353 |
| QLD4-W10 | Có | 13/11/2026 – đã demo, đã áp dụng v353 |
| QLD4-W11 | Có | 13/11/2026 – đã demo, đã áp dụng v353 |
| QLD4-W12 | Có | 13/11/2026 – đã demo, đã áp dụng v353 |
| QLD4-W13 | Có | 13/11/2026 – đã demo, đã áp dụng v353 |
| QLD4-W14 | Có | 13/11/2026 – đã demo, đã áp dụng v353 |
| QLD4-W15 | Có | 13/11/2026 – đã demo, đã áp dụng v353 |
| QLD4-M01 | Có (giữ) | 13/11/2026 |
| QLD4-M02 | Không | 13/11/2026 – đã bỏ v353 |
| QLD5-W01 | Có | 13/11/2026 – chờ demo |
| QLD5-W02 | Có | 13/11/2026 – chờ demo |
| QLD5-W03 | Có | 13/11/2026 – chờ demo |
| QLD5-W04 | Có | 13/11/2026 – chờ demo |
| QLD5-W05 | Có | 13/11/2026 – chờ demo |
| QLD5-W06 | Có | 13/11/2026 – chờ demo |
| QLD5-W07 | Có | 13/11/2026 – chờ demo |
| QLD5-W08 | Có | 13/11/2026 – chờ demo |
| QLD5-W09 | Có | 13/11/2026 – chờ demo |
| QLD5-W10 | Có | 13/11/2026 – chờ demo |
| QLD5-W11 | Có | 13/11/2026 – chờ demo |
| QLD5-W12 | Có | 13/11/2026 – chờ demo |
| QLD5-W13 | Có | 13/11/2026 – chờ demo |
| QLD5-W14 | Có | 13/11/2026 – chờ demo |
| QLD5-W15 | Có | 13/11/2026 – chờ demo |
| QLD5-W16 | Có | 13/11/2026 – chờ demo |
| QLD5-W17 | Có | 13/11/2026 – chờ demo |
| QLD6-W01 | Có | 13/11/2026 – chờ demo |
| QLD6-W02 | Có | 13/11/2026 – chờ demo |
| QLD6-W03 | Có | 13/11/2026 – chờ demo |
| QLD6-W04 | Có | 13/11/2026 – chờ demo |
| QLD6-W05 | Có | 13/11/2026 – chờ demo |
| QLD6-W06 | Có | 13/11/2026 – chờ demo |
| QLD6-W07 | Có | 13/11/2026 – chờ demo |
| QLD6-W08 | Có | 13/11/2026 – chờ demo |
| QLD6-M01 | Có (giữ) | 13/11/2026 |
| QLD6-M02 | Có (giữ) | 13/11/2026 |
| QLD6-M03 | Không | 13/11/2026 – đề xuất bỏ cho giống web (chọn 1 căn cứ) |
| QLD6-M04 | Không | 13/11/2026 – đề xuất bỏ cho giống web |
| QLD6-M05 | Có (giữ) | 13/11/2026 |

Tổng kết 13/11/2026: đã trả lời đủ 94 mã (báo cáo thực có 76 mã W, 18 mã M; con số 73/16 ghi trước đây đếm thiếu). Mã W: 75 Có (chờ demo), 1 Không (QLD1-W03). Mã M: 10 giữ, 8 đề xuất bỏ (QLD2-M02…M06, QLD4-M02, QLD6-M03, QLD6-M04).

---

## Nhóm 1 – Danh sách đơn và Chi tiết đơn (`/quan-ly-don`, `/quan-ly-don/$id`)
App: Danh sách đơn và tiến trình, các tab 6 loại đơn, Chi tiết đơn (các trạng thái).

Khớp: 6 loại đơn, lọc trạng thái, tìm kiếm, sắp xếp; dải "N đơn cần bạn xử lý", đánh dấu sao, tư cách người xem; trạng thái rỗng, xác nhận nộp thêm đơn; chi tiết có 5 tab, ký số và nộp đơn, đơn đã thụ lý, tạm ứng án phí, đơn bị trả lại.

### Web có – App chưa có
| Mã | Chức năng | Các bước xem trên Web | Nguồn | Mức chắc |
|---|---|---|---|---|
| QLD1-W01 | Wizard "Bổ sung tài liệu" của đơn 4 bước: Lý do (15–2000 ký tự), Tài liệu, Sửa nội dung, Ký gửi; có Lưu nháp. App đang đưa nút này sang Giao nộp tài liệu, chứng cứ của vụ án | 1) Có đơn khởi kiện đã gửi 2) [Vào] 3) Tab "Danh sách đơn" → "Bổ sung tài liệu cho hồ sơ" (đơn ở trạng thái Bổ sung đơn thì wizard tự mở) 4) Thấy 4 bước, ô "Lý do bổ sung tài liệu *", nút Lưu nháp; đã bổ sung trước đó thì hiện hộp "Đơn này đã được bổ sung hồ sơ" | quan-ly-don/tab-bo-sung-ho-so.tsx:22-27,269-323 | Chắc |
| QLD1-W02 | Tab Tài liệu chứng cứ: khối "Tòa án yêu cầu bổ sung tài liệu" có nút "Tải lên tài liệu bổ sung" và "Lưu"; ẩn khi quá hạn | 1) Đơn đang Bổ sung đơn, còn hạn 2) [Vào] → tab "Tài liệu chứng cứ" 3) Bấm "Tải lên tài liệu bổ sung", chọn tệp, bấm "Lưu" 4) Thấy "Đã bổ sung N tài liệu." | chi-tiet.tsx:2932-2990 | Chắc |
| QLD1-W03 | Nút "Tải Folder" tải cả nhóm tài liệu theo ngày nộp | 1) [Vào] → tab "Tài liệu chứng cứ" 2) Bấm "Tải Folder" ở tiêu đề nhóm ngày 3) Các tệp được tải về | chi-tiet.tsx:2730-2734 | Chắc |
| QLD1-W04 | Nút "Xem đơn" cho đơn liên quan đã nộp | 1) Đơn có đơn liên quan đã nộp 2) [Vào] → tab "Danh sách đơn" 3) Bấm "Xem đơn" 4) Hộp xem tệp mở | chi-tiet.tsx:1064-1190 | Chắc |
| QLD1-W05 | Hộp xác nhận khi tạo lần 2 cho BPKCTT, thay đổi/rút một phần, sửa đổi bổ sung (app chỉ có cho rút đơn) | 1) Đã gửi 1 đơn loại đó 2) [Vào] → tab "Danh sách đơn" 3) Bấm lại thẻ đó 4) Hiện hộp, ví dụ "Nộp thêm bản sửa đổi, bổ sung đơn?" | chi-tiet.tsx:1753-1786 | Chắc |
| QLD1-W06 | Dòng "Kết quả giải quyết" ở tab Thông tin chung | 1) Đơn đã có kết quả 2) [Vào] → "Thông tin chung" 3) Thấy nhãn kết quả và câu diễn giải | chi-tiet.tsx:2328-2337 | Chắc |
| QLD1-W07 | Khối "Khiếu nại văn bản, thông báo tố tụng", nút "Khiếu nại văn bản này" (khóa khi hết thời hiệu) | 1) Văn bản tống đạt mới nhất được ma trận cho phép khiếu nại 2) [Vào] → "Thông tin chung" 3) Bấm "Khiếu nại văn bản này" | chi-tiet.tsx:2369-2393 | Chắc |
| QLD1-W08 | Khối "Vụ án" (tên, ngày thụ lý) và khối "Tạm ứng án phí" (số tiền, trạng thái, hạn, ngày nộp) | 1) Đơn đã thụ lý hoặc đang chờ nộp tạm ứng 2) [Vào] → "Thông tin chung" 3) Thấy 2 khối | chi-tiet.tsx:2395-2454 | Chắc |
| QLD1-W09 | Thông báo bổ sung hồ sơ có 2 biến thể: đỏ "…Đã hết hạn" (khóa 2 nút); xanh "Đã nộp bản sửa đổi… Đang chờ Tòa án xem xét" | 1) Đơn RS-01 quá hạn, hoặc đã nộp bản sửa 2) [Vào] 3) Thấy thông báo tương ứng dưới tiêu đề | chi-tiet.tsx:718-790 | Chắc |
| QLD1-W10 | Chấm đỏ trên tab "Văn bản tống đạt" khi còn văn bản chưa xem | 1) Đơn có văn bản chưa xem 2) [Vào] 3) Tab có chấm đỏ "Có văn bản chưa xem" | chi-tiet.tsx:71-74 | Chắc |
| QLD1-W11 | Ô chọn loại ở tab phản tố: Tất cả loại / Phản tố / Yêu cầu độc lập | 1) Có đơn phản tố hoặc YCĐL 2) Quản lý đơn → tab "Đơn phản tố, yêu cầu độc lập" 3) Chọn "Phản tố" 4) Danh sách chỉ còn đơn phản tố | quan-ly-don/index.tsx:585-594 | Chắc |
| QLD1-W12 | Nút ở trạng thái rỗng theo tab: "Nộp đơn mới", hoặc "Xem danh mục vụ án" ở tab phản tố | 1) Tab có 0 đơn, không lọc 2) Mở tab 3) Thấy nút dưới "Bạn chưa có đơn nào" | quan-ly-don/index.tsx:681-689 | Cần xác nhận: tab không có đơn bị ẩn nên khó dựng tình huống |
| QLD1-W13 | Lỗi tải: danh sách (có Mã lỗi), chi tiết (Thử lại + Quay lại; "Không tìm thấy đơn này."), tab Danh sách đơn, Tài liệu, Văn bản (đính chính 13/11: không phải tab Lịch sử) | 1) Cho API lỗi 2) Mở /quan-ly-don hoặc chi tiết 3) Thấy "Không tải được danh sách đơn." / "Không tải được chi tiết đơn." và "Thử lại" | quan-ly-don/index.tsx:509-519; chi-tiet.tsx:1939-1960 | Chắc |
| QLD1-W14 | Nút thao tác bị khóa theo lý do từ backend; bấm thì hiện lý do | 1) Đơn có hành động bị khóa 2) Bấm nút ở cột Thao tác 3) Hiện thông báo lý do | quan-ly-don/index.tsx:305-307 | Cần xác nhận: cần dữ liệu backend |

### App có – Web không có
| Mã | Chức năng | Các bước xem trên app | Nguồn | Mức chắc |
|---|---|---|---|---|
| QLD1-M01 | Mục "Sao gửi tài liệu, chứng cứ cho đương sự khác" trong bảng chọn loại đơn (trên web nhóm này đang bị comment) | 1) Theo dõi vụ án, vụ việc → Danh sách đơn và tiến trình 2) Mở đơn → tab "Danh sách đơn" → "Tạo đơn liên quan đến vụ việc" 3) Thấy nhóm "Yêu cầu khác" | s2.js:571-575; web chi-tiet.tsx:1255-1261 | Chắc |
| QLD1-M02 | Thẻ đơn hiện mọi việc cần làm, mỗi việc có hạn riêng (web chỉ hiện việc đầu tiên) | 1) Danh sách đơn và tiến trình 2) Xem thẻ có nhiều việc | s5.js:273-296; web status.ts:177-192 | Chắc |
| QLD1-M03 | Nút "Xóa bộ lọc" khi không có đơn phù hợp | 1) Danh sách đơn 2) Gõ từ khóa không khớp 3) Thấy nút "Xóa bộ lọc" | s5.js:382-383 | Chắc |

---

## Nhóm 2 – Đơn phản tố, yêu cầu độc lập (chi tiết, bổ sung hồ sơ, thay đổi yêu cầu, rút đơn, khiếu nại trả lại đơn)
App: Chi tiết đơn phản tố, đơn phản tố bị trả lại, Bổ sung hồ sơ đơn phản tố (4 bước). Các nút rút, thay đổi, khiếu nại đang mở luồng của đơn khởi kiện.

Khớp: 5 khối thông tin, tiến trình 3 bước; banner "Đơn đã đến hệ thống Tòa án" và "Tòa án đã trả lại đơn"; wizard bổ sung hồ sơ phản tố 4 bước.

### Web có – App chưa có
| Mã | Chức năng | Các bước xem trên Web | Nguồn | Mức chắc |
|---|---|---|---|---|
| QLD2-W01 | Màn chi tiết riêng cho đơn yêu cầu độc lập (nhãn "Đơn yêu cầu độc lập", tư cách "Người có quyền lợi, nghĩa vụ liên quan") | 1) Có đơn YCĐL 2) Quản lý đơn → tab "Đơn phản tố, yêu cầu độc lập", chọn loại "Yêu cầu độc lập" 3) Bấm vào đơn 4) Thấy nhãn tím "Đơn yêu cầu độc lập" | chi-tiet-don-phan-to-ycdl/index.tsx:30-32 | Chắc |
| QLD2-W02 | Bổ sung hồ sơ đơn YCĐL (4 bước). Trên app nút này chỉ báo "đang phát triển" | 1) Đơn YCĐL ở RS-01 2) Mở đơn → "Bổ sung" 3) Mở wizard "Bổ sung hồ sơ đơn yêu cầu độc lập" | bo-sung-ho-so/index.tsx:28-30 | Chắc |
| QLD2-W03 | Banner theo trạng thái: chờ xử lý rút đơn; Tòa yêu cầu bổ sung (còn hạn / hết hạn); nộp tạm ứng (còn hạn / hết hạn); "Đơn chưa được gửi đến Tòa án"; "Còn lại N ngày để khiếu nại…" | 1) Đơn ở từng trạng thái tương ứng 2) Mở đơn 3) Banner hiện dưới đầu trang | chi-tiet-don-phan-to-ycdl/cau-hinh.ts:79-163 | Chắc |
| QLD2-W04 | Nút hành động theo ma trận: bị khóa (chưa có mã tiếp nhận, quá hạn) hiện mờ kèm lý do; nộp tạm ứng mở Cổng Dịch vụ công quốc gia | 1) Đơn RS-02 quá hạn 2) Mở đơn 3) Nút mờ, rê chuột thấy "Đã hết hạn nộp tạm ứng án phí." | nut-hanh-dong.tsx:27-55 | Chắc |
| QLD2-W05 | Hộp "Xác nhận nộp thêm đơn" khi đã nộp đơn phát sinh cùng loại | 1) Đã gửi 1 đơn rút / bổ sung / thay đổi 2) Bấm lại cùng nút 3) Hộp có "Tiếp tục nộp thêm" / "Huỷ" | chi-tiet-don-phan-to-ycdl/index.tsx:74-78,126-134 | Chắc |
| QLD2-W06 | Ô "Ngày gửi đơn" trong lưới thông tin đầu trang | 1) Mở đơn 2) Xem lưới 6 ô dưới tên | dau-trang.tsx:13-20 | Chắc |
| QLD2-W07 | "Tiếp tục soạn" ở bản nháp mở lại đúng wizard (app đang mở wizard sửa đơn khởi kiện) | 1) Lưu nháp một đơn phát sinh 2) Mở đơn → "Đơn phát sinh" → "Tiếp tục soạn ›" 3) Wizard mở lại đúng loại, đã điền dữ liệu nháp | cau-hinh.ts:254-268 | Chắc |
| QLD2-W08 | Chặn mở wizard khi đơn không còn quyền; màn "Không tìm thấy đơn" | 1) Mở thẳng …/rut-don của đơn RS-05 2) Hiện "Đơn không còn ở trạng thái được rút." rồi quay về chi tiết | use-wizard-phat-sinh.ts:43-53 | Cần xác nhận |
| QLD2-W09 | Bổ sung hồ sơ: bắt buộc ít nhất 1 tài liệu; có khung so sánh nội dung trước/sau | 1) Đơn RS-01 → "Bổ sung" 2) Bước 2 chưa có tệp, bấm "Tiếp" → "Tải lên tài liệu Tòa án yêu cầu bổ sung." 3) Bước 3 sửa nội dung thì hiện khung so sánh | bo-sung-ho-so/index.tsx:72-76 | Chắc |
| QLD2-W10 | Rút đơn phản tố/YCĐL: tên "Rút toàn bộ yêu cầu…" khi đơn đã vào vụ án; danh mục lý do riêng; ô "Trình bày" ≥10 ký tự; sau khi gửi khóa các đơn phát sinh khác | 1) Đơn RS-05 → nút rút 2) Bước 2 bỏ trống Trình bày → "Trình bày lý do rút (tối thiểu 10 ký tự)." | rut-don/index.tsx:52-77 | Chắc |
| QLD2-W11 | Thay đổi/rút một phần yêu cầu phản tố: chỉ chọn loại được phép, nạp sẵn nội dung cũ, có so sánh, báo lỗi khi không thay đổi gì; lý do theo danh mục | 1) Đơn RS-05 → "Thay đổi, bổ sung yêu cầu" 2) Giữ nguyên nội dung → "Bạn chưa thay đổi, bổ sung nội dung nào so với yêu cầu đã nộp." | thay-doi-yeu-cau/index.tsx:74-117 | Chắc |
| QLD2-W12 | Khiếu nại trả lại đơn phản tố/YCĐL: mở lại nháp; màn "Không thể khiếu nại việc trả lại đơn"; thủ tục và căn cứ theo loại đơn | 1) Đơn RS-23 → "Khiếu nại việc trả lại đơn" 2) Lưu nháp rồi mở lại thì dữ liệu còn 3) Đơn quá hạn thì hiện màn chặn | khieu-nai-tra-lai-don/index.tsx:46-170 | Cần xác nhận: app đang dùng màn khiếu nại của đơn khởi kiện |
| QLD2-W13 | Màn đã gửi có "Mã hồ sơ", "Trạng thái: Đã gửi", nút "Xem đơn liên quan" | 1) Gửi xong một wizard 2) Thấy bảng thông tin và nút | wizard/man-da-gui.tsx:15-39 | Chắc |

### App có – Web không có
| Mã | Chức năng | Các bước xem trên app | Nguồn | Mức chắc |
|---|---|---|---|---|
| QLD2-M01 | Nút "Thay đổi yêu cầu" ở đơn mới gửi (web chỉ có ở RS-05) | 1) Danh sách đơn → tab Phản tố → TN-20261028-0018 2) Khối "Đơn đã đến hệ thống Tòa án" có "Thay đổi yêu cầu" | s5.js:818 | Chắc |
| QLD2-M02 | Dòng "Nội dung yêu cầu" thứ tư trong khối Nội dung yêu cầu | 1) Chi tiết đơn phản tố → tab "Nội dung yêu cầu" | s5.js:820 | Cần xác nhận: có thể chỉ là dữ liệu mẫu |
| QLD2-M03 | Rút đơn: khối hệ quả và thẻ "Tiền tạm ứng án phí liên quan" | 1) Chi tiết đơn phản tố → "Rút yêu cầu phản tố" → bước 2 | s5.js:538-547 | Cần xác nhận: luồng dùng chung với đơn khởi kiện |
| QLD2-M04 | Thay đổi yêu cầu: chọn bằng ô tích, "Tóm tắt quá trình sự việc", "Thời điểm được thay đổi", khối hệ quả | 1) Chi tiết đơn phản tố → "Thay đổi yêu cầu" | s5.js:598-628 | Cần xác nhận: luồng của đơn khởi kiện |
| QLD2-M05 | Khiếu nại: thẻ "Đơn của bạn còn nội dung nào khác không?" và thẻ "Người khiếu nại" | 1) Đơn phản tố bị trả lại → "Khiếu nại việc trả lại đơn" → bước 2 | s5.js:1646-1657 | Cần xác nhận: luồng của đơn khởi kiện |
| QLD2-M06 | Màn đã gửi bổ sung hồ sơ có "Thời điểm gửi" | 1) Bổ sung hồ sơ phản tố → "Ký và gửi" | s5.js:2802-2805 | Chắc |

---

## Nhóm 3 – Kháng cáo (chi tiết, sửa đổi bổ sung, thay đổi/rút, trình bày quá hạn)
App: Chi tiết đơn kháng cáo, Sửa đơn kháng cáo (4 bước), Kháng cáo quá hạn (4 bước).

Khớp: 8 trường thông tin đầu trang, 4 khối; banner RS-16 có nút sửa đổi; wizard sửa đổi và wizard trình bày quá hạn trùng bước và trường với web.

### Web có – App chưa có
| Mã | Chức năng | Các bước xem trên Web | Nguồn | Mức chắc |
|---|---|---|---|---|
| QLD3-W01 | Luồng "Thay đổi, rút kháng cáo": chọn Thay đổi, bổ sung / Rút một phần / Rút toàn bộ → nội dung, lý do → ký gửi → màn kết quả theo loại | 1) Có đơn kháng cáo đã gửi 2) Quản lý đơn → tab Đơn kháng cáo → mở đơn 3) Bấm "Rút đơn" 4) Chọn 1 trong 3 thẻ ở "Bạn muốn làm gì với kháng cáo?" 5) Nhập nội dung và lý do 6) Ký số, tích cam đoan, "Gửi đơn" 7) Thấy "Đã gửi yêu cầu thành công." và màn kết quả | khang-cao-thay-doi-rut/index.tsx:71-250 | Chắc |
| QLD3-W02 | Hàng nút đầu trang theo ma trận: "Bổ sung" (mờ khi Tòa chưa yêu cầu), "Rút đơn", Tiếp tục soạn, Ký số, Xem vụ án; nút khóa có dòng lý do | 1) Đơn đã gửi, chưa có yêu cầu sửa 2) Mở chi tiết 3) Thấy "Bổ sung" mờ và "Rút đơn" | nut-hanh-dong.tsx:24-72 | Chắc |
| QLD3-W03 | Hộp "Nộp thêm bản sửa đổi, bổ sung đơn?" | 1) Đơn RS-16 đã có bản sửa đã gửi 2) Bấm "Bổ sung" 3) Hộp có "Tiếp tục nộp thêm" / "Huỷ" | chi-tiet-don-khang-cao/index.tsx:76-118 | Chắc |
| QLD3-W04 | Banner theo tình trạng: RS-06 "Kháng cáo quá hạn, cần giải trình"; RS-18 "Nộp tạm ứng án phí phúc thẩm" (mở Cổng Dịch vụ công quốc gia); ST-01, ST-01b, ST-02b; có nút X đóng | 1) Đơn ở tình trạng tương ứng 2) Mở chi tiết 3) Thấy banner và nút của banner | chi-tiet-don-khang-cao/cau-hinh.ts:166-221 | Cần xác nhận: prototype có thể chỉ vẽ 1 mẫu |
| QLD3-W05 | Tiến trình 3 bước Đã gửi → Đang xử lý → Đã xử lý | 1) Mở chi tiết đơn đã gửi 2) Thấy dải 3 bước dưới banner | chi-tiet-don-khang-cao/cau-hinh.ts:360-381 | Cần xác nhận |
| QLD3-W06 | Nút "Tải về" từng tài liệu đính kèm | 1) Mở chi tiết → "Tài liệu đính kèm" 2) Bấm "Tải về" | khoi-tai-lieu.tsx:29-62 | Chắc |
| QLD3-W07 | Văn bản gửi cho đương sự khác hiện "Không có trong Hộp thư của bạn" | 1) Mở chi tiết → "Văn bản tống đạt" 2) Thấy dòng đó | khoi-van-ban-toa-an.tsx:17-19 | Chắc |
| QLD3-W08 | "Tiếp tục soạn" mở đúng wizard; "Xem đơn" mở PDF | 1) Lưu nháp bản sửa hoặc bản trình bày quá hạn 2) Mở "Đơn phát sinh" → "Tiếp tục soạn ›" | chi-tiet-don-khang-cao/cau-hinh.ts:257-281 | Cần xác nhận |
| QLD3-W09 | "Không tìm thấy đơn kháng cáo" và lỗi tải có Mã lỗi, Thử lại | 1) Mở /chi-tiet-don-khang-cao/abc 2) Thấy câu báo và nút "Về danh sách đơn" | chi-tiet-don-khang-cao/index.tsx:35-131 | Cần xác nhận |

### App có – Web không có
| Mã | Chức năng | Các bước xem trên app | Nguồn | Mức chắc |
|---|---|---|---|---|
| QLD3-M01 | Nút ghim "Tạo đơn liên quan đến vụ việc" ở tab Đơn phát sinh (chưa làm) | 1) Chi tiết đơn kháng cáo → tab "Đơn phát sinh" → nút cuối màn | s5.js:779 | Chắc |
| QLD3-M02 | Nút phụ "Xem văn bản" trong khối việc cần làm | 1) Chi tiết đơn kháng cáo → mũi tên cạnh nút chính → "Xem văn bản" | s5.js:782 | Chắc |

---

## Nhóm 4 – Giám đốc thẩm, tái thẩm (chi tiết, sửa đổi bổ sung, rút đơn)
App: Chi tiết đơn giám đốc thẩm, tái thẩm; các luồng Sửa đổi bổ sung (4 bước) và Rút đơn (3 bước).

Khớp: 4 khối, lưới thông tin; banner yêu cầu sửa (RS-21); wizard rút đơn (danh mục lý do, "Lý do khác" ≥15 ký tự, hệ quả); wizard sửa đổi (nội dung 20–2000 ký tự, tài liệu từ Kho).

### Web có – App chưa có
| Mã | Chức năng | Các bước xem trên Web | Nguồn | Mức chắc |
|---|---|---|---|---|
| QLD4-W01 | Banner "Đơn đang lưu tạm" và nút Tiếp tục soạn cho đơn nháp | 1) Có đơn GĐT nháp 2) /quan-ly-don?kind=gdt → bấm đơn 3) Thấy banner xám và nút | chi-tiet-don-giam-doc-tham/cau-hinh.ts:163-170 | Chắc |
| QLD4-W02 | Hiển thị riêng cho đơn tái thẩm: nhãn "Đơn tái thẩm", "Ngày biết căn cứ · đã quá hạn N ngày", khối "Cách biết được căn cứ" | 1) Có đơn tái thẩm quá 365 ngày 2) Mở chi tiết 3) Thấy nhãn, dòng hạn và khối | dau-trang.tsx:29-34 | Chắc |
| QLD4-W03 | Khối "Biên nhận tiếp nhận điện tử", nút Xem tệp | 1) Đơn đã có biên nhận 2) Mở chi tiết → Nội dung đề nghị 3) Bấm Xem tệp | khoi-tai-lieu.tsx:58-71 | Chắc |
| QLD4-W04 | Văn bản tống đạt có nút Xem tệp ngay tại dòng; văn bản của người khác ghi "Không có trong Hộp thư của bạn" | 1) Mở chi tiết → "Văn bản tống đạt" | khoi-van-ban-toa-an.tsx:48-64 | Chắc |
| QLD4-W05 | Hộp "Nộp thêm bản sửa đổi, bổ sung đơn?" | 1) Đơn RS-21 đã có bản sửa 2) Bấm "Bổ sung" | chi-tiet-don-giam-doc-tham/index.tsx:78-120 | Chắc |
| QLD4-W06 | Nút bị khóa có dòng lý do (ví dụ "Bổ sung" quá hạn) | 1) Đơn RS-21 quá hạn 2) Mở chi tiết 3) Nút mờ, có dòng lý do | nut-hanh-dong.tsx:45-71 | Chắc |
| QLD4-W07 | Nút "Nộp tiền" (mở Cổng Dịch vụ công quốc gia) và "Đề nghị miễn, giảm án phí" | 1) Đơn có nghĩa vụ tài chính 2) Mở chi tiết 3) Thấy 2 nút | chi-tiet-don-giam-doc-tham/cau-hinh.ts:93-94 | Cần xác nhận: phụ thuộc dữ liệu ma trận |
| QLD4-W08 | "Tiếp tục soạn ›" mở đúng wizard theo loại nháp | 1) Lưu nháp rút đơn hoặc sửa đổi 2) Mở "Danh sách đơn" → "Tiếp tục soạn ›" | chi-tiet-don-giam-doc-tham/cau-hinh.ts:360-373 | Cần xác nhận |
| QLD4-W09 | "Không tìm thấy đơn đề nghị" và lỗi tải có Mã lỗi, Thử lại | 1) Mở id không tồn tại 2) Thấy câu báo và nút "Về danh sách đơn" | chi-tiet-don-giam-doc-tham/index.tsx:37-133 | Chắc |
| QLD4-W10 | Rút đơn: ô cam đoan bắt buộc trước khi gửi | 1) Rút đơn → bước "Xác nhận & ký gửi" 2) Chưa tích thì nút Gửi bị khóa | giam-doc-tham-rut-don/buoc-xem-lai.tsx:193-203 | Chắc |
| QLD4-W11 | Sửa đổi: ô cam đoan bắt buộc | 1) Wizard sửa đổi bước 4 2) Phải tích cam đoan và ký đủ thì Gửi mới mở | giam-doc-tham-sua-doi-bo-sung/buoc-xem-lai.tsx:410 | Chắc |
| QLD4-W12 | Sửa đổi bước 1: hạn "Vô thời hạn", "Quá hạn N ngày", tô đỏ khi còn ≤3 ngày | 1) Thông báo không có hạn hoặc đã quá hạn 2) Bước 1 xem ô hạn nộp | giam-doc-tham-sua-doi-bo-sung/buoc-thong-bao.tsx:51-145 | Chắc |
| QLD4-W13 | Mỗi tệp bắt buộc có tên và loại tài liệu | 1) Bước 3 tải tệp, để trống tên 2) Bấm Tiếp tục → "Tài liệu N: Vui lòng nhập tên tài liệu." | giam-doc-tham-sua-doi-bo-sung/index.tsx:268-271 | Cần xác nhận |
| QLD4-W14 | Rút đơn bị chặn khi đơn đã có kết quả | 1) Mở …/giam-doc-tham-rut-don của đơn RS-29 2) Thấy "Chỉ rút được đơn đề nghị chưa có kết quả giải quyết." | giam-doc-tham-rut-don/index.tsx:123-137 | Chắc |
| QLD4-W15 | Mở lại wizard thì nạp lại bản nháp, có thông báo | 1) Lưu nháp rút đơn 2) Mở lại 3) Thấy "Đã nạp bản nháp yêu cầu rút đơn bạn lưu trước đó." | giam-doc-tham-rut-don/index.tsx:68-79 | Cần xác nhận |

### App có – Web không có
| Mã | Chức năng | Các bước xem trên app | Nguồn | Mức chắc |
|---|---|---|---|---|
| QLD4-M01 | Nút "Rút đơn" ở trạng thái "Đơn đã đến hệ thống Tòa án" | 1) Danh sách đơn → tab Giám đốc thẩm, tái thẩm → TN-20261029-0020 2) Khối đầu màn có "Rút đơn" | s5.js:799 | Cần xác nhận: web chỉ cho rút ở RS-00/21/45/08 |
| QLD4-M02 | Sửa đổi bước 1: thẻ "Thông báo của Tòa án" có "Tòa án tiếp nhận" và "Hạn xử lý" | 1) Chi tiết đơn có yêu cầu sửa → "Sửa đổi, bổ sung đơn" → bước 1 | s5.js:2122-2123 | Chắc |

---

## Nhóm 5 – Các chức năng của đơn (miễn giảm án phí, rút đơn, BPKCTT, sửa đổi bổ sung, thay đổi/rút yêu cầu)
Khớp: cả 5 luồng có cùng số bước, trường chính, danh mục, ký số, cam đoan, Lưu nháp và màn chặn chính.

### Web có – App chưa có
| Mã | Chức năng | Các bước xem trên Web | Nguồn | Mức chắc |
|---|---|---|---|---|
| QLD5-W01 | Miễn giảm: cảnh báo "Bạn đã nộp đơn đề nghị miễn, giảm" (số đơn, mã, thời điểm) | 1) Đã gửi ≥1 đơn miễn giảm 2) [Vào] → "Danh sách đơn" → "Đề nghị miễn, giảm tạm ứng án phí" 3) Hộp có "Tiếp tục nộp" / "Quay lại" | mien-giam-an-phi/index.tsx:120-127 | Chắc |
| QLD5-W02 | Miễn giảm: khóa sửa sau khi ký số; nháp đã ký vẫn giữ chữ ký | 1) Bước 4 ký đủ 2) Quay lại bước 1–3 thì thấy thanh xanh, các ô bị khóa 3) Lưu nháp rồi vào lại vẫn khóa | mien-giam-an-phi/index.tsx:212-226 | Chắc |
| QLD5-W03 | Miễn giảm: mỗi tệp bắt buộc có tên và loại tài liệu | 1) Bước 3 tải tệp, để trống tên 2) Bấm "Tiếp theo" thì báo lỗi | buoc-tai-lieu.tsx:6-9 | Cần xác nhận |
| QLD5-W04 | Miễn giảm: khối đếm ngược "Còn X ngày", đỏ khi còn ≤3 ngày | 1) Bước 1 xem dưới "Nghĩa vụ tạm ứng án phí" | mien-giam-an-phi/index.tsx:51-73 | Cần xác nhận: có thể chỉ khác cách trình bày |
| QLD5-W05 | Rút đơn: chặn người không thuộc nhóm khởi kiện | 1) Tài khoản không phải người khởi kiện 2) Đi hết 3 bước, Gửi 3) Thấy "Chỉ người khởi kiện, đồng khởi kiện hoặc người đại diện được tạo đơn yêu cầu rút đơn." | coreapi RutDonService.java:96,125 | Cần xác nhận |
| QLD5-W06 | BPKCTT: khóa sửa sau ký số; nháp đã ký mở thẳng bước 4 | 1) Ký ở bước 4, Lưu nháp 2) Mở lại thì vào thẳng bước 4; quay lại thì các ô bị khóa | bpkctt/index.tsx:128-134 | Chắc |
| QLD5-W07 | BPKCTT: ghi chú "Biện pháp khác" khi chọn mã BPDS-17 | 1) Bước 1 chọn biện pháp khác 2) Bước 2 thấy hộp ghi chú dưới ô Lý do | bpkctt/buoc-noi-dung.tsx:105-109 | Chắc |
| QLD5-W08 | BPKCTT: mỗi tệp bắt buộc có tên và loại tài liệu | 1) Bước 3 để trống tên 2) Bấm "Tiếp theo" thì báo lỗi | bpkctt/index.tsx:199 | Cần xác nhận |
| QLD5-W09 | Sửa đổi bổ sung: đơn gốc là tệp tải lên thì có khung xem đơn cũ và ô "Nội dung đơn sau khi sửa đổi, bổ sung" (bắt buộc) | 1) Đơn nộp bằng tệp có sẵn, có yêu cầu sửa 2) Mở wizard → bước 2 3) Bỏ trống ô → "Vui lòng nhập nội dung đơn sau khi sửa đổi, bổ sung." | sua-doi-bo-sung/index.tsx:281-295 | Chắc |
| QLD5-W10 | Sửa đổi bổ sung: hạn "Quá hạn X ngày" hoặc "không quy định hạn" | 1) Thông báo quá hạn hoặc không có hạn 2) Xem bước 1 | sua-doi-bo-sung/buoc-thong-bao.tsx:115,121 | Cần xác nhận |
| QLD5-W11 | Sửa đổi bổ sung: mỗi tệp bắt buộc có tên và loại tài liệu | 1) Bước 3 để trống tên 2) "Tài liệu 1: Vui lòng nhập tên tài liệu." | sua-doi-bo-sung/index.tsx:456-460 | Cần xác nhận |
| QLD5-W12 | Thay đổi/rút yêu cầu: chặn khi đơn đã thụ lý | 1) Đơn đã có vụ án 2) Mở route 3) Thấy "Không thể tạo đơn thay đổi, rút yêu cầu khởi kiện", có mã vụ án và 2 nút | thay-doi-rut-yeu-cau/index.tsx:806-880 | Chắc |
| QLD5-W13 | Thay đổi/rút yêu cầu: chặn khi Tòa chưa tiếp nhận đơn | 1) Đơn chưa ở "Đã tiếp nhận" 2) Mở route 3) Thấy câu chặn | thay-doi-rut-yeu-cau/index.tsx:913-942 | Chắc |
| QLD5-W14 | Thay đổi/rút yêu cầu: bảng yêu cầu nhập tay (Nội dung, Giá trị kê khai, Mô tả, Thêm/Xóa dòng), bắt buộc ít nhất 1 dòng | 1) Đơn không lập bằng biểu mẫu điện tử 2) Bước 1 chọn "Thay đổi, bổ sung…" 3) Bước 2 thấy bảng; để trống → "Vui lòng nhập ít nhất một yêu cầu khởi kiện" | buoc-2-noi-dung-yeu-cau.tsx:207-245 | Chắc |
| QLD5-W15 | Thay đổi/rút yêu cầu: đơn gốc lập bằng biểu mẫu điện tử thì sửa trên biểu mẫu nạp sẵn | 1) Đơn lập bằng biểu mẫu điện tử 2) Bước 2 thấy biểu mẫu đã nạp | buoc-2-noi-dung-yeu-cau.tsx:92-125 | Cần xác nhận |
| QLD5-W16 | Thay đổi/rút yêu cầu: khóa sửa sau ký số | 1) Ký ở bước 5 2) Quay lại thì chỉ còn xem | thay-doi-rut-yeu-cau/index.tsx:1069-1165 | Chắc |
| QLD5-W17 | Thay đổi/rút yêu cầu: loại tài liệu bắt buộc | 1) Bước 4 tải tệp 2) Cột "Loại tài liệu" bắt buộc chọn | buoc-4-tai-lieu.tsx:151-152 | Cần xác nhận |

### App có – Web không có
Không có khác biệt.

---

## Nhóm 6 – Công nhận kết quả hòa giải thành (`/quan-ly-don/[$id/]cong-nhan-kq-hoa-giai-thanh`)
App: Đề nghị xem xét lại quyết định công nhận (vào từ chi tiết hồ sơ hòa giải thành). Trên web không có nút nào dẫn tới route này, phải gõ URL.

Khớp: căn cứ Điều 33 và nội dung trình bày; tài liệu, tạo đơn PDF rồi ký số; gửi Tòa án cấp trên trực tiếp.

### Web có – App chưa có
| Mã | Chức năng | Các bước xem trên Web | Nguồn | Mức chắc |
|---|---|---|---|---|
| QLD6-W01 | Chọn 1 trong nhiều quyết định công nhận (số, ngày, vụ việc, còn/quá hạn) | 1) Đăng nhập 2) Gõ /quan-ly-don/cong-nhan-kq-hoa-giai-thanh 3) Bước "Quyết định đề nghị xem xét lại" thấy danh sách quyết định 4) Chọn quyết định khác thì khối chi tiết đổi theo | cong-nhan-kq-hoa-giai-thanh/buoc-thong-bao.tsx:47-101 | Chắc |
| QLD6-W02 | Banner hạn 15 ngày "Còn N ngày (đến …)" / "Đã quá hạn N ngày", đỏ khi còn ≤3 ngày | 1) Như W01 bước 1–2 2) Chọn quyết định 3) Thấy banner dưới khối cảnh báo | cong-nhan-kq-hoa-giai-thanh/buoc-thong-bao.tsx:18-31,129-168 | Cần xác nhận |
| QLD6-W03 | Khối "Chi tiết quyết định": Số quyết định, Vụ việc, Hòa giải viên, Nội dung công nhận | 1) Như W01 2) Kéo xuống "Chi tiết quyết định" | cong-nhan-kq-hoa-giai-thanh/buoc-thong-bao.tsx:170-200 | Chắc |
| QLD6-W04 | Trình bày tối thiểu 30 ký tự, có bộ đếm | 1) Bấm "Tiếp tục", chọn căn cứ 2) Nhập dưới 30 ký tự 3) Thấy "Trình bày căn cứ cụ thể (tối thiểu 30 ký tự)." | cong-nhan-kq-hoa-giai-thanh/index.tsx:125-127 | Chắc |
| QLD6-W05 | Bắt buộc ít nhất 1 tài liệu | 1) Bước "Tài liệu kèm theo" không tải tệp 2) Bấm "Tiếp tục" 3) Thấy "Vui lòng tải lên ít nhất một tài liệu chứng minh căn cứ đề nghị." | cong-nhan-kq-hoa-giai-thanh/index.tsx:129-133 | Chắc |
| QLD6-W06 | Lưu nháp, tự nạp lại nháp, nhãn "Đang soạn nháp" | 1) Nhập dở → lưu nháp 2) Thấy thông báo thành công 3) Mở lại URL thì dữ liệu được nạp lại, có nhãn | cong-nhan-kq-hoa-giai-thanh/index.tsx:43-186 | Chắc |
| QLD6-W07 | Ô cam đoan bắt buộc trước "Ký & Gửi đơn" | 1) Bước "Xem lại & ký gửi" 2) Chưa tích thì nút bị khóa | cong-nhan-kq-hoa-giai-thanh/buoc-xem-lai.tsx:376-387 | Chắc |
| QLD6-W08 | Màn kết quả: Mã hồ sơ, Quyết định đề nghị, Trạng thái, nút "Về trang chủ" và "Xem đơn liên quan" | 1) Hoàn tất 4 bước, ký, cam đoan 2) "Ký & Gửi đơn" 3) Thấy màn "Đã gửi đơn đề nghị xem xét lại…" | cong-nhan-kq-hoa-giai-thanh/index.tsx:216-297 | Chắc |

### App có – Web không có
| Mã | Chức năng | Các bước xem trên app | Nguồn | Mức chắc |
|---|---|---|---|---|
| QLD6-M01 | Có lối vào trong app: thẻ việc cần làm "Đề nghị xem xét lại" ở hồ sơ hòa giải thành (web không có nút nào dẫn tới) | 1) Hòa giải, đối thoại → mở HG-2026-0009 2) Bấm "Đề nghị xem xét lại" | s5.js:1317 | Chắc |
| QLD6-M02 | Ô tích "Có thời gian bất khả kháng/trở ngại khách quan…" và ô lý do bắt buộc | 1) Mở màn như M01 2) Tích ô thì ô lý do mở cho nhập | s5.js:1416-1422 | Chắc |
| QLD6-M03 | Căn cứ chọn được nhiều (web chọn 1) | 1) Thẻ "Căn cứ đề nghị/kiến nghị — Điều 33" → tích từ 2 căn cứ trở lên | s5.js:1413-1423 | Chắc |
| QLD6-M04 | Trạng thái chưa có quyết định công nhận: cảnh báo và khóa nút Gửi | 1) Mở màn "Hòa giải – xem xét lại: chưa có quyết định công nhận" | s5.js:1418-1428 | Chắc |
| QLD6-M05 | Bắt buộc ký số tài liệu PDF đính kèm trước khi gửi | 1) Tải tài liệu → khối "Ký số tài liệu đính kèm" 2) Chưa ký thì nút Gửi bị khóa | s5.js:1268-1286 | Chắc |

---

## Lưu ý thêm
- App mở nhầm luồng:
  - Ở đơn phản tố, các nút rút / thay đổi / khiếu nại đang mở luồng của đơn khởi kiện (chữ ghi cứng "đơn khởi kiện"); gửi xong thì quay về Chi tiết đơn khởi kiện.
  - Nút "Sửa đổi, bổ sung đơn kháng cáo" ở Chi tiết đơn kháng cáo mở wizard sửa đơn khởi kiện. Chỉ khi đi từ danh sách đơn mới vào đúng wizard sửa đơn kháng cáo.
  - "Tiếp tục soạn" ở bản nháp đơn phát sinh luôn mở wizard sửa đơn khởi kiện.
- Quy tắc khác nhau:
  - Rút đơn khởi kiện: web bắt buộc ô Trình bày ≥15 ký tự với mọi lý do; app chỉ bắt buộc khi chọn "Lý do khác".
  - BPKCTT: web yêu cầu lý do ≥30 ký tự; lựa chọn "Không có đối tượng" chỉ hiện với biện pháp không bắt buộc đối tượng.
  - Khối "Cách biết được căn cứ": web chỉ hiện cho đơn tái thẩm, app đang hiện cho cả đơn giám đốc thẩm.
- Dữ liệu mẫu mâu thuẫn quy tắc web: màn Thay đổi, rút yêu cầu của app hiện một đơn đã có vụ án "Đang giải quyết", trong khi web chặn trường hợp này.
- Có thể trùng luồng: màn "Đề nghị xem xét lại" của app có lẽ ứng với luồng cùng nghiệp vụ trong `/hoa-giai-doi-thoai` hơn là route của nhóm 6.
- Web đang dùng dữ liệu giả: backend nhóm 6 trả về 2 quyết định ghi cứng.
- Chưa kiểm tra: chưa tra `tatc-mobile/src/services` nên chưa biết app thật đã gọi các API này chưa.
