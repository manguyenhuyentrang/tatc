# Câu hỏi và trả lời – kết quả đối chiếu Web – prototype (sheet 1)

- Ngày hỏi: 21-11-2026
- Phiên bản prototype đã so: **v535** (dist 20-11-2026 16:20; ghi trong cột Ghi chú "Kết quả chạy … (prototype v535)")
- Web: tatc.congdichvu.web, nhánh develop, commit 37dcbba0
- Một số case nhắc "khối trống chung (v518)": quyết định cũ dùng một khối trống "Không tìm thấy kết quả phù hợp" cho mọi trường hợp rỗng.
- Nguồn: sheet 1 của 4 file trong `E:\TATC\Mobile\TestCase_Mobile`; chỉ lấy các case kết quả F/PE.

| Đợt | File | Số case F/PE | Ngày chạy |
|---|---|---|---|
| 1 | TATC_Mobile_TC_TrichLucBanSao.xlsx | 41 F | 20-11-2026 22:13 |
| 2 | TATC_Mobile_TC_NghiaVuTaiChinh.xlsx | 21 F | 20-11-2026 23:36 |
| 3 | TATC_Mobile_TC_HopThu.xlsx | 19 F, 1 PE | 21-11-2026 00:14 |
| 4 | TATC_Mobile_TC_VuAn.xlsx | 38 F | 21-11-2026 00:27 |

Trả lời ghi nguyên văn lựa chọn hoặc lời của người dùng.

---

## Đợt 1 – Trích lục, bản sao

### Nhóm 1A – Màn danh sách yêu cầu
| Câu | Case | Câu hỏi | Trả lời |
|---|---|---|---|
| 1A.1 | 1.3 | Chip "Tất cả" hiện tổng số; chip có số 0 vẫn hiện "0" như web? | sửa theo web. có demo |
| 1A.2 | 1.4 | Bỏ nút sắp xếp "Mới nhất / Cũ nhất" (web không có; prototype chọn cũng không đổi thứ tự)? | Bỏ theo web |
| 1A.3 | 1.5, 1.6 | Thêm làm mới danh sách và phân trang 10 yêu cầu/lần kèm "Hiển thị {từ}–{đến} trong {tổng} yêu cầu"? | app cuộn xuống để tải thêm |
| 1A.4 | 1.7, 1.12 | Trạng thái đang tải, lỗi (mã lỗi, Thử lại), rỗng: dùng câu riêng của web ("Chưa có yêu cầu nào", "Không có yêu cầu phù hợp"…) hay giữ khối trống chung v518? | sửa theo web. có demo |

### Nhóm 1B – Bản nháp và lối vào trình tự tạo yêu cầu
| Câu | Case | Câu hỏi | Trả lời |
|---|---|---|---|
| 1B.1 | 1.11, 1.20, 1.23 | "Tiếp tục soạn" nạp dữ liệu nháp và mở thẳng bước "Loại & hình thức nhận"; thẻ nháp thêm câu "Bản nháp chưa gửi — dữ liệu nhập đã được giữ."; màn chi tiết nháp thêm nút "Về danh sách"? | sửa theo web. có demo |
| 1B.2 | 1.23, 1.27 | Vào từ chi tiết vụ án: mở thẳng bước 2, chọn sẵn văn bản; bước 1 hiện khối "Thông tin vụ án đã chọn" + "Đổi vụ án khác" + cảnh báo vụ án chưa có bản án? | sửa theo web. có demo |
| 1B.3 | 1.49 | Danh sách có yêu cầu/bản nháp sao chụp; "Tiếp tục soạn" bản nháp sao chụp mở màn yêu cầu sao chụp? | sửa theo web. có demo |

### Nhóm 1C – Màn chi tiết yêu cầu
| Câu | Case | Câu hỏi | Trả lời |
|---|---|---|---|
| 1C.1 | 1.13 | Khối đầu: thêm nhãn "DVCQG: 1 · Nộp hồ sơ" cho nháp; nút "{mã} · Xem vụ án" mở đúng vụ án (đang mở nhầm DS-2026-0012); thêm trạng thái "Đã rút yêu cầu", "Đã giải quyết", "Chờ tòa án tiếp nhận"? | sửa theo web, có demo |
| 1C.2 | 1.14 | Dải bổ sung hồ sơ: thêm dải quá hạn, dòng "Bạn đã gửi bổ sung lúc …", hạn kèm giờ? | sửa theo web, có demo |
| 1C.3 | 1.17, 1.18 | Thêm nút "Quét QR để đối chiếu" ở kết quả đã cấp; khối Thông tin yêu cầu thêm "Tòa án giải quyết", "Loại văn bản", tên văn bản cạnh số hiệu? | sửa theo web, có demo |
| 1C.4 | 1.19 | Diễn biến xử lý dạng sự kiện như web (có "Hạn bổ sung", "Hạn thanh toán", đơn vị xử lý · Tòa án)? | sửa theo web, có demo |

### Nhóm 1D – Rút yêu cầu, nộp tài liệu bổ sung
| Câu | Case | Câu hỏi | Trả lời |
|---|---|---|---|
| 1D.1 | 1.21 | Rút yêu cầu: câu lỗi "Lý do rút không được chỉ chứa khoảng trắng.", lỗi chỉ hiện khi bấm xác nhận, rút xong ở lại màn chi tiết (đang về danh sách)? | sửa theo web, có demo |
| 1D.2 | 1.22 | Nộp tài liệu bổ sung: thẻ tệp đầy đủ (Tên, Loại tài liệu*, Xem/Thay/Xóa), "Chọn từ Kho dữ liệu cá nhân", "Đã đính kèm: n/10 tệp", ô giải trình đếm n/2000? | sửa theo web, có demo |

### Nhóm 1E – Trình tự tạo yêu cầu (bước 1–3)
| Câu | Case | Câu hỏi | Trả lời |
|---|---|---|---|
| 1E.1 | 1.24 | Thêm dòng phụ (mã vụ án, số văn bản / "Theo thông tin bản án tự khai") và nhãn nguồn; "Lưu nháp" chỉ ở bước "Xem lại & gửi" như web hay giữ ở mọi bước (chuẩn Soạn đơn)? | Thêm dòng phụ, giữ Lưu nháp |
| 1E.2 | 1.25 | Bước chọn văn bản: thêm Mở rộng/Thu gọn tất cả, nhãn trạng thái vụ án, nhãn Bản án/Quyết định, hiệu lực, Tòa án, văn bản không được cấp hiện mờ, "Không tìm thấy văn bản phù hợp." + "Xóa bộ lọc"? | Sửa theo web |
| 1E.3 | 1.26, 1.29 | Loại sản phẩm chọn sẵn theo văn bản, mô tả đủ số/ngày/cấp/hiệu lực/Tòa án, thẻ khóa kèm lý do; bước 2 hiện đúng theo lựa chọn bước 1? | Sửa theo web |
| 1E.4 | 1.26, 1.28–1.30, 1.32, 1.34, 1.35 | Bấm "Tiếp theo" kiểm tra bắt buộc như web (chưa chọn văn bản, số bản án, Tòa án, ghi chú ≥30 ký tự, người nhận/địa chỉ, mục đích, cam kết, giấy giới thiệu…); số bản giấy giới hạn 10/20, Tỉnh/Phường mở danh sách, giới hạn 250 ký tự? | Sửa theo web |

### Nhóm 1F – Tài liệu, tư cách, xem lại
| Câu | Case | Câu hỏi | Trả lời |
|---|---|---|---|
| 1F.1 | 1.31 | Tài liệu đính kèm: "Loại tài liệu" theo danh mục loại văn bản (thay "Loại giấy tờ" 4 mục), kho 20MB chọn nhiều tệp, "Đã đính kèm: n/9 tệp"? | Sửa theo web |
| 1F.2 | 1.33, 1.34 | Ô cam kết: bỏ ở luồng từ vụ án; tự khai thì ẩn khi tư cách "Đương sự trong vụ án", các tư cách khác bắt buộc tích? | Sửa theo web |
| 1F.3 | 1.36 | Bỏ bảng "Xem lại thông tin trước khi gửi đến Tòa án" ở bước 4 (web đã ẩn)? | Bỏ theo web |

### Nhóm 1G – Ký số, gửi yêu cầu
| Câu | Case | Câu hỏi | Trả lời |
|---|---|---|---|
| 1G.1 | 1.37 | Tên đơn theo loại ("Đơn yêu cầu cấp trích lục"/"…bản sao"); khối "Tài liệu đính kèm (n tệp)" nhãn "Đã ký" + Xem; trạng thái "Đang tạo đơn để ký số…", lỗi + "Thử lại"? | Sửa theo web |
| 1G.2 | 1.39 | Nút "Gửi yêu cầu" khóa đến khi đã ký và tích cam đoan? | Sửa theo web |
| 1G.3 | 1.40 | Sau gửi: giữ màn "Đã gửi yêu cầu" hay theo web (thông báo + mở chi tiết); bản sao không kèm cam kết 08 giờ; Lưu nháp báo kèm mã yêu cầu + "Bạn có thể tiếp tục chỉnh sửa và gửi sau."? | Giữ màn Đã gửi, sửa câu (bản sao không kèm cam kết 08 giờ; Lưu nháp kèm mã + câu web) |

### Nhóm 1H – Yêu cầu sao chụp
| Câu | Case | Câu hỏi | Trả lời |
|---|---|---|---|
| 1H.1 | 1.41 | Thêm "Căn cứ pháp lý" trong khối Vụ án; tiêu đề màn theo nguồn tài liệu? | Sửa theo web |
| 1H.2 | 1.42, 1.43 | Không chọn sẵn đương sự; thêm "Danh mục lấy từ hồ sơ vụ án.", "Đã chọn {n} đương sự", ghi chú Tòa án chốt phạm vi; thêm gợi ý "Nghiên cứu hồ sơ chuẩn bị phiên tòa"? | Sửa theo web |
| 1H.3 | 1.45, 1.46 | Thêm bước xem trước đơn trước khi ký (khung xem trước, Tải về, Chỉnh sửa, ký lại khi sửa); tổ chức có 2 ô ký theo thứ tự (cá nhân đại diện rồi tổ chức)? | Sửa theo web (gồm cả 6 lỗi hình thức nhận, case 1.44) |
| 1H.4 | 1.47, 1.48 | Thêm ô cam đoan + lỗi, nút "Hủy"; câu ghi nhận sau gửi "Yêu cầu sao chụp đã được ghi nhận…"? | Sửa theo web |

---

## Đợt 2 – Nghĩa vụ tài chính

### Nhóm 2A – Lối vào và điều hướng
| Câu | Case | Câu hỏi | Trả lời |
|---|---|---|---|
| 2A.1 | 1.2 | Sửa đích lối vào theo web: thư Thông báo nộp tiền → danh sách Nghĩa vụ tài chính; Việc cần làm / Thông báo / "Xem nghĩa vụ tài chính" ở vụ án → theo web (Cổng DVCQG / văn bản tống đạt) thay vì Chi tiết khoản TB-2026-0018? | Sửa theo web |
| 2A.2 | 1.24 | "Đề nghị miễn, giảm": khoản gắn đơn mở chi tiết đơn, khoản gắn vụ án mở đúng vụ án đó (đang luôn mở DS-2026-0012)? | Sửa theo web |
| 2A.3 | 1.26 | "Xem văn bản gốc trong Hộp thư tống đạt" mở đúng thông báo nộp tiền; khoản nộp thay chỉ hiện số định danh người phải nộp? | Sửa theo web |

### Nhóm 2B – Danh sách, tìm, lọc
| Câu | Case | Câu hỏi | Trả lời |
|---|---|---|---|
| 2B.1 | 1.3, 1.16 | Chỉ tiêu "Quá hạn hoặc còn ≤ 3 ngày" luôn hiện kể cả 0; tab Đã nộp có dòng "{n} khoản theo bộ lọc · Tổng đã nộp: {tiền}"? | Sửa theo web |
| 2B.2 | 1.4, 1.9 | Đổi nhóm giữ Loại khoản; thêm "Xóa bộ lọc" xóa mọi điều kiện kể cả từ khóa (thay/kèm "Nhập lại")? | Sửa theo web |
| 2B.3 | 1.5, 1.6, 1.8 | Tìm không phân biệt dấu và theo tên hồ sơ; bảng chọn hồ sơ có ô tìm khi trên 10 mục; lọc Ngày nộp lọc thật theo ngày thu/ngày miễn? | Sửa theo web |
| 2B.4 | 1.10, 1.15 | Thêm phân trang 10 khoản; bỏ nút "Đánh dấu quan trọng" trên thẻ khoản (web không có)? | Cuộn tải thêm, bỏ sao (bỏ nút Đánh dấu quan trọng) |

### Nhóm 2C – Trạng thái danh sách
| Câu | Case | Câu hỏi | Trả lời |
|---|---|---|---|
| 2C.1 | 1.11, 1.19, 1.21 | Dùng câu riêng của web: "Chưa phát sinh khoản nào phải nộp", rỗng theo nhóm + "Bỏ bớt bộ lọc…", màn đang tải "Đang tải nghĩa vụ tài chính…" – hay giữ khối trống chung v518? | Sửa theo web, có demo |

### Nhóm 2D – Chi tiết khoản và nộp tiền
| Câu | Case | Câu hỏi | Trả lời |
|---|---|---|---|
| 2D.1 | 1.22, 1.28 | Đầu màn thêm dòng "{họ tên} · {hồ sơ}" và nhãn loại khoản; lịch sử có ngày ở mỗi mốc? | Sửa theo web |
| 2D.2 | 1.29, 1.32 | Bước xác nhận: lỗi sao chép, nút "Tiếp tục sang Cổng DVCQG" có trạng thái đang xử lý, thông báo "Khoản chưa có số tiền phải nộp."? | Sửa theo web |
| 2D.3 | 1.31 | Thêm biến thể "Khoản không cần nộp" khi mở Nộp tiền cho khoản đã nộp/được miễn/chưa xác định số tiền? | Sửa theo web |
| 2D.4 | 1.33 | Tải biên lai: tên tệp "BienLai-{số}.pdf", lỗi "Không tải được biên lai.", "Khoản này chưa có tệp biên lai điện tử."? | Sửa theo web |

---

## Đợt 3 – Hộp thư tống đạt

### Nhóm 3A – Lối vào
| Câu | Case | Câu hỏi | Trả lời |
|---|---|---|---|
| 3A.1 | 1.1 | Trang chủ thêm thẻ "Hộp thư tống đạt" ("{tổng} văn bản", "Mở hộp thư →"); huy hiệu đếm theo thư mục Hộp thư (không tính văn bản đã lưu trữ)? | Sửa theo web |
| 3A.2 | 1.2 | Lối vào mở đúng văn bản được chọn; thêm lối vào từ văn bản ghim, Giấy triệu tập; danh sách có dòng lọc "văn bản được chọn từ liên kết"? | Sửa theo web |
| 3A.3 | 1.25 | Nút nộp tiền trong khối Khoản phải nộp mở danh sách Nghĩa vụ tài chính (đang mở nhầm khoản TB-2026-0018)? | Sửa theo web |

### Nhóm 3B – Danh sách văn bản
| Câu | Case | Câu hỏi | Trả lời |
|---|---|---|---|
| 3B.1 | 1.3, 1.4 | Ẩn số 0 ở thư mục và nhãn; chọn thư mục Quan trọng thì bỏ chọn nhãn? | Sửa theo web |
| 3B.2 | 1.7 | Thêm dòng "Đang lọc: {điều kiện} — {tổng} văn bản"; "Nhập lại" giữ Hồ sơ, vụ án như web? | Sửa theo web |
| 3B.3 | 1.8 | Thẻ văn bản thêm giờ gửi, " · {số hiệu}", biểu tượng kẹp giấy, chip "Đã đọc"/"Cần hành động"? | Sửa theo web |
| 3B.4 | 1.9, 1.10 | Bỏ nút Quan trọng/Lưu trữ trên thẻ và chế độ chọn nhiều "Đánh dấu đã đọc" (web không có)? | Bỏ theo web |

### Nhóm 3C – Trạng thái tải, lỗi, trống
| Câu | Case | Câu hỏi | Trả lời |
|---|---|---|---|
| 3C.1 | 1.5, 1.12, 1.13, 1.14, 1.17 | Thêm màn đang tải hộp thư/văn bản/bản số hóa; "Thử lại" tải lại; câu trống riêng theo trường hợp như web; định dạng không xem được kèm "Tải về"; bảng chọn hồ sơ có ô tìm khi trên 10 mục – hay giữ khối trống chung v518? | Sửa theo web, có demo |

### Nhóm 3D – Chi tiết văn bản
| Câu | Case | Câu hỏi | Trả lời |
|---|---|---|---|
| 3D.1 | 1.15, 1.18 | Thêm nút "In" (+ "Chưa có bản số hóa để in."); Tải xuống không hiện thông báo, nút Tải xuống ở màn xem tệp hoạt động? | Không thêm In (chỉ sửa Tải xuống: không thông báo khi thành công, nút Tải xuống ở màn xem tệp hoạt động) |
| 3D.2 | 1.16 | Bỏ nút mở vụ án ở dòng "Hồ sơ:"; mã đơn chỉ hiện khi văn bản gắn với đơn? | Sửa theo web |
| 3D.3 | 1.20 | Dòng "Bạn đã mở văn bản này lần đầu lúc…" hiện ngay sau lần mở đầu? | Sửa theo web |
| 3D.4 | 1.24, 1.29 | "Sửa đổi, bổ sung đơn khởi kiện" mở chức năng sửa đổi đơn đã nộp (không mở soạn đơn mới); thêm nút thủ tục vụ việc phá sản trên văn bản? | Sửa theo web |

---

## Đợt 4 – Vụ án

### Nhóm 4A – Danh sách vụ án
| Câu | Case | Câu hỏi | Trả lời |
|---|---|---|---|
| 4A.1 | 1.1 | Thêm thẻ "Vụ án của tôi" ({tổng} vụ, biểu đồ/chú giải) mở danh sách lọc sẵn trạng thái? | Sửa theo web |
| 4A.2 | 1.3 | Banner phiên tòa: "Xem vụ án →" mở tab Lịch phiên tòa; đã đóng thì không hiện lại đến phiên khác? | Sửa theo web |
| 4A.3 | 1.6, 1.7 | Lọc Cấp xét xử lọc thật theo cấp hiện tại; bỏ nút sắp xếp "Mới nhất/Cũ nhất"? | Sửa theo web |
| 4A.4 | 1.15–1.18 | Thêm phân trang/tải thêm 10 vụ án; trạng thái đang tải, lỗi (mã lỗi, Thử lại), rỗng theo câu web ("Bạn chưa có vụ án nào", Xóa bộ lọc) – hay giữ khối trống chung v518? | Sửa theo web, có demo (cuộn tải thêm 10 vụ) |

### Nhóm 4B – Thẻ vụ án
| Câu | Case | Câu hỏi | Trả lời |
|---|---|---|---|
| 4B.1 | 1.8, 1.9 | Thêm ô viết tắt loại án (màu theo loại) + chữ loại án; nút sao chép mã vụ án? | Sửa theo web |
| 4B.2 | 1.10, 1.11 | Bỏ nhãn tình trạng chi tiết; dòng thụ lý chỉ "Thụ lý: {ngày}" (bỏ số thụ lý), sửa ngày dd/mm/yyyy thành dd-mm-yyyy? | Sửa theo web |
| 4B.3 | 1.12, 1.13 | Thêm nhãn phiên theo trạng thái (Đang diễn ra/Đã kết thúc/Phiên tòa) và thanh tiến trình tố tụng? | Sửa theo web |
| 4B.4 | 1.14 | Bỏ khối "Việc cần làm" trên thẻ (có "Đề nghị hoãn phiên tòa" web đã ẩn)? | Bỏ theo web |

### Nhóm 4C – Đầu màn chi tiết vụ án
| Câu | Case | Câu hỏi | Trả lời |
|---|---|---|---|
| 4C.1 | 1.19 | Thêm nút sao chép mã, nhãn tình trạng chi tiết, "Xem bản án", "Xem quyết định đình chỉ"? | Sửa theo web |
| 4C.2 | 1.20, 1.21 | Thêm banner gợi ý hành động trên thanh tab; chấm đỏ "Có mục mới" trên tab? | Sửa theo web |
| 4C.3 | 1.22 | Banner tạm đình chỉ dùng câu giải thích của web + nút "Đề nghị tiếp tục giải quyết vụ án"? | Sửa theo web |
| 4C.4 | 1.24 | Nút nộp đơn phản tố/YCĐL/ý kiến có trạng thái khóa (mờ, lý do) khi không được phép? | Sửa theo web |

### Nhóm 4D – Tab Thông tin chung, Đơn, Cấp xét xử
| Câu | Case | Câu hỏi | Trả lời |
|---|---|---|---|
| 4D.1 | 1.25 | Thêm "In / xuất hồ sơ" và "Cung cấp tài liệu, chứng cứ theo yêu cầu của Tòa án" kèm hạn? | Sửa theo web |
| 4D.2 | 1.26 | Tab Đơn chia khối như web: "Đơn gốc của vụ án", "Đơn yêu cầu khác đã nộp", "Bản nháp của bạn", "Giao nộp / sao gửi / cung cấp tài liệu, chứng cứ"? | Sửa theo web |
| 4D.3 | 1.27 | Tạo đơn liên quan: thêm "Đề nghị miễn, giảm tạm ứng án phí", chip "Sau thụ lý"/"Trước & sau thụ lý", loại bị khóa kèm lý do? | Sửa theo web |
| 4D.4 | 1.28, 1.29 | Cấp xét xử: thêm giai đoạn tố tụng, phiên, lý do mở, chi tiết kết quả; bỏ khối cấp "Chưa phát sinh"? | Sửa theo web |

### Nhóm 4E – Lịch phiên tòa
| Câu | Case | Câu hỏi | Trả lời |
|---|---|---|---|
| 4E.1 | 1.30, 1.31 | Thẻ phiên theo web (Báo vắng mặt, Vào phòng chờ, Xem văn bản gốc, Chi tiết phiên, nhãn phản hồi, Tư cách, Giấy triệu tập, Điểm cầu, thay đổi lịch); bỏ nút "Đề nghị hoãn phiên"? | Sửa theo web |
| 4E.2 | 1.32 | Khối "Điểm cầu tham dự" chỉ hiện ở phiên trực tuyến? | Sửa theo web |
| 4E.3 | 1.33, 1.34 | Báo vắng mặt đủ theo web (cảnh báo hậu quả, ô Điều 227, xin hoãn, hết hạn, lỗi tệp và lỗi độ dài); bỏ nút "Từ kho dữ liệu cá nhân"? | Sửa theo web |
| 4E.4 | 1.35, 1.36 | Phòng chờ theo web (Chưa đến giờ/Đang diễn ra, giờ mở, lưu ý ghi âm, khóa nút khi chưa tới giờ); bỏ khối "Kiểm tra thiết bị"? | Sửa theo web |

### Nhóm 4F – Văn bản tống đạt, tài liệu, bản án, lịch sử
| Câu | Case | Câu hỏi | Trả lời |
|---|---|---|---|
| 4F.1 | 1.37 | Thêm nút kháng cáo trên văn bản có hành động kháng cáo và câu trống "Chưa có văn bản tống đạt nào cho vụ án này."? | Sửa theo web |
| 4F.2 | 1.38, 1.39 | Tài liệu, chứng cứ gom theo nguồn như web (thêm nguồn còn thiếu, tải/lỗi); bỏ ghi chú quyền tiếp cận và nút "Giao nộp tài liệu, chứng cứ" trong tab? | Sửa theo web |
| 4F.3 | 1.40, 1.41 | Tách 2 khối "Bản án" / "Quyết định của Tòa án", thêm số hiệu, chip cấp, hiệu lực, "Mở ở Hộp thư", trích lục theo từng dòng; bỏ chú thích Điều 219? | Sửa theo web |
| 4F.4 | 1.42 | Lịch sử vụ án đủ ngày, nhãn, "Chưa đọc", tên văn bản, cấp; bấm mốc mở văn bản gốc? | Sửa theo web |

---

## Tổng kết (21-11-2026)

- Đã hỏi và ghi trả lời đủ 76 câu (4 đợt, 21 nhóm); không còn câu "(chờ)".
- Phiên này chỉ đọc: chưa sửa prototype v535, chưa build, chưa đăng claude.ai.
- Câu người dùng yêu cầu **có demo trước khi áp dụng** (14 câu): 1A.1, 1A.4, 1B.1, 1B.2, 1B.3, 1C.1, 1C.2, 1C.3, 1C.4, 1D.1, 1D.2, 2C.1, 3C.1, 4A.4.
- Quyết định khác web hoặc theo cách riêng của app:
  - 1A.3, 2B.4, 4A.4: danh sách dùng cuộn xuống để tải thêm (không phân trang như web).
  - 1E.1: thêm dòng phụ và nhãn nguồn, nhưng **giữ "Lưu nháp" ở thanh tiêu đề mọi bước** (chuẩn Soạn đơn).
  - 1G.3: **giữ màn "Đã gửi yêu cầu"**, chỉ sửa câu chữ (bản sao không kèm cam kết 08 giờ; Lưu nháp kèm mã + câu web).
  - 3D.1: **không thêm nút "In"**; chỉ sửa Tải xuống.
- Còn lại: sửa theo web hoặc bỏ phần web không có, đúng nội dung từng câu.
