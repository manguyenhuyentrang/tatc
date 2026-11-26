# Rà soát bảng từ đáy dạng danh sách chọn (droplist) – prototype v536

- Ngày: 21-11-2026
- Bản quét: `prototype/Prototype-TATC-v536.html` (mã nguồn `prototype-src/src`, 21-11-2026 02:01)
- Cách làm:
  - Chạy prototype trong Chrome chạy ngầm, mở lần lượt **869 màn** của danh sách SCR.
  - Trên mỗi màn, bấm từng ô chọn và ghi lại: ô đó có mở bảng từ đáy không, tiêu đề bảng, số mục, có ô tìm hay không.
  - Đối chiếu thêm mã nguồn cho các bảng chọn nằm trong bảng Bộ lọc và các bảng mở từ nút (lượt quét chỉ bấm ô chọn trên màn).
- Chỉ rà soát, không sửa prototype.
- Số mục là số mục của dữ liệu mẫu tại màn đó. "—" là dòng chọn tùy biến mà công cụ không đếm được.
- Thành phần mã:
  - `SelSheet`: mẫu bảng chọn chuẩn đã chốt ở NDKK 1.29.
  - `ChonDs`: ô chọn danh mục, cùng định dạng SelSheet.
  - `LvSheet` + `LvRows`: bảng chọn viết riêng.

## A. Ô chọn trên màn → bảng từ đáy (59 loại, quét thực tế)

### A1. Nộp đơn khởi kiện (Soạn đơn)
| Ô chọn | Tiêu đề bảng | Số mục | Ô tìm | Màn (ví dụ) | Thành phần |
|---|---|---|---|---|---|
| Loại việc cụ thể | Chọn loại việc cụ thể | 2–14 | có khi > 6 | sub1, sub1Doi, sub1Ln, sub1Tt, sub1Vds, sub1Hc, sub1Ps (8 màn) | CaseTypes |
| Loại việc chi tiết | Chọn loại việc chi tiết | 6 | không | sub1x | LvChiTiet |
| Địa chỉ thường trú / hiện tại / tạm trú – Tỉnh/TP | Chọn tỉnh/thành phố | 5 | không | sub2, sub3 và biến thể (7–22 màn mỗi ô) | AddrChon |
| Địa chỉ thường trú / hiện tại / tạm trú – Phường/Xã | Chọn phường/xã | 3–6 | không | như trên | AddrChon |
| Địa chỉ trụ sở – Tỉnh/TP, Phường/Xã | Chọn tỉnh/thành phố, Chọn phường/xã | 5 / 3 | không | sub3Cq, sub3Hc, sub3Ps, sub3Tc | AddrChon |
| Đặc điểm của người yêu cầu | Chọn đặc điểm của người yêu cầu | 12 | có | sub2Ps | ChonDs |
| Loại hình kinh doanh / Quy mô / Lĩnh vực | Chọn … | 4 / 3 / 5 | không | sub2PsTc, sub3Ps | ChonDs |
| Đặc điểm của tổ chức/doanh nghiệp/cơ quan yêu cầu / bị yêu cầu | Chọn đặc điểm … | 11 | có | sub2PsTc / sub3Ps | ChonDs |
| Ngành kinh tế | Chọn ngành kinh tế | 21 | có | sub2PsTc, sub3Ps | ChonDs |
| Tòa án nhận đơn | Chọn tòa án nhận đơn | 5–13 | có | sub6, sub6Lai và khc3, ktc3, kpa3, ktc3T… (18 màn) | ChonToaAn / SelSheet |
| Người đại diện ký | Chọn người đại diện ký | 1 | không | signTc | ChonDs |

### A2. Khiếu nại, tố cáo
| Ô chọn | Tiêu đề bảng | Số mục | Ô tìm | Màn (ví dụ) | Thành phần |
|---|---|---|---|---|---|
| Thủ tục | Chọn thủ tục | — | không | chooseTc (choose) | KnThuTucPa |
| Chọn đơn hoặc vụ án để xác định Tòa án nhận đơn | Chọn đơn hoặc vụ án | — | có | complaintForm, kqd1, kqd1Tong, kqd1Vb, kqd1Sap, kqd1Don | LvSheet riêng |
| Quyết định, văn bản còn trong thời hiệu khiếu nại | Chọn quyết định, văn bản | — | không | complaintForm, kqd1, kqd1Tong, kqd1Doi, kqd1Sap, kqd1Don | KqdVbPick |
| Vụ án liên quan | Chọn vụ án liên quan | — | có | khv1, ktv1, khv1Kg, ktv1Kg, khv1Het | KhvVaPick |
| Chức danh | Chọn chức danh | 6 | không | khv1, khv1Kg, khv1Doi, khv1Het | SelSheet |
| Tòa án đang giải quyết vụ án, vụ việc | Chọn tòa án đang giải quyết vụ án, vụ việc | 5 | có | khv1Kg | SelSheet |
| Tòa án nơi người bị tố cáo công tác | Chọn tòa án nơi người bị tố cáo công tác | 5 | có | ktv1Kg | SelSheet |
| Tư cách tố tụng của bạn | Chọn tư cách tố tụng của bạn | 6 | không | khv2Kg | SelSheet |
| Bộ lọc hồ sơ – Trạng thái / Loại việc | Trạng thái / Loại việc | 3 / 5 | không | complaintsTtLoc, complaintsTtLocErr | SelSheet |

### A3. Trích lục, bản sao
| Ô chọn | Tiêu đề bảng | Số mục | Ô tìm | Màn | Thành phần |
|---|---|---|---|---|---|
| Năm ban hành | Chọn năm ban hành | 37 | có | tl1k | SelSheet |
| Loại án | Chọn loại án | 12 | có | tl1k | SelSheet |
| Tòa án ban hành | Chọn tòa án ban hành | 5 | có | tl1k | SelSheet |
| Mục đích sử dụng | Chọn mục đích sử dụng | 6 | không | tl2, tl2k | SelSheet |
| Bạn yêu cầu với tư cách | Chọn bạn yêu cầu với tư cách | 5 | không | tl3k | SelSheet |
| Lý do rút yêu cầu | Chọn lý do rút yêu cầu | 4 | không | copyWithdraw | SelSheet |

### A4. Giám đốc thẩm, tái thẩm (tự khai bản án)
| Ô chọn | Tiêu đề bảng | Số mục | Ô tìm | Màn | Thành phần |
|---|---|---|---|---|---|
| Loại án | Chọn loại án | 5 | không | gx1Manual, tx1Manual | SelSheet |
| Tòa án ban hành | Chọn tòa án ban hành | 3 | có | gx1Manual, tx1Manual | SelSheet |
| Đối tượng | Chọn đối tượng | 3 | không | gx1Manual, tx1Manual | SelSheet |

### A5. Hòa giải, đối thoại
| Ô chọn | Tiêu đề bảng | Số mục | Ô tìm | Màn | Thành phần |
|---|---|---|---|---|---|
| Phạm vi lựa chọn Hòa giải viên | Chọn phạm vi lựa chọn Hòa giải viên | 2 | không | hgReplyView | SelSheet |
| Chọn Hòa giải viên | **Chọn chọn Hòa giải viên** (tiêu đề lặp chữ "Chọn") | 3 | không | hgReplyView | SelSheet |
| Căn cứ đề nghị thay đổi | Chọn căn cứ đề nghị thay đổi | 8 | không | hgChange, hgChangeDt | SelSheet |
| Phiên hòa giải đề nghị hoãn | Chọn phiên hòa giải đề nghị hoãn | 1 | không | hgDelay, hgDelayView (khóa ở hgDelayNoPhien) | SelSheet |
| Phiên đối thoại đề nghị hoãn | Chọn phiên đối thoại đề nghị hoãn | 1 | không | hgDelayDt | SelSheet |
| Lý do xin hoãn phiên hòa giải / đối thoại | Chọn lý do xin hoãn … | 5 | không | hgDelay, hgDelayNoPhien, hgDelayView / hgDelayDt | SelSheet |

### A6. Các đơn yêu cầu khác
| Ô chọn | Tiêu đề bảng | Số mục | Ô tìm | Màn | Thành phần |
|---|---|---|---|---|---|
| Lý do đề nghị hoãn phiên tòa | Chọn lý do đề nghị hoãn phiên tòa | 5 | không | dyc2_hoan | SelSheet |
| Chức danh người bạn yêu cầu thay đổi | Chọn chức danh người bạn yêu cầu thay đổi | 6 | không | dyc2_thtt | SelSheet |
| Căn cứ đề nghị hủy bỏ | Chọn căn cứ đề nghị hủy bỏ | 8 | không | bph2 | SelSheet |
| Biện pháp cần áp dụng | **Biện pháp cần áp dụng** (không có chữ "Chọn") | 4 | không | bp1 | SelSheet (tiêu đề riêng) |
| Diện đối tượng đề nghị miễn | **Diện đối tượng đề nghị miễn** (không có chữ "Chọn") | 9 | không | mg2 | SelSheet (tiêu đề riêng) |

### A7. Lịch, phiên tòa
| Ô chọn | Tiêu đề bảng | Số mục | Ô tìm | Màn | Thành phần |
|---|---|---|---|---|---|
| Lý do vắng mặt | Chọn lý do vắng mặt | 4 | không | attendAbsent, attendAbsentErr | SelSheet |

### A8. Đăng ký người bảo vệ
| Ô chọn | Tiêu đề bảng | Số mục | Ô tìm | Màn | Thành phần |
|---|---|---|---|---|---|
| Loại hồ sơ | Chọn loại hồ sơ | 3 | không | bvd1, bvd1Err | SelSheet |
| Đơn/vụ án đăng ký người bảo vệ | Chọn đơn/vụ án đăng ký người bảo vệ | 3 | không | bvd1, bvd1Err | SelSheet |
| Tư cách bảo vệ | Chọn tư cách bảo vệ | 4 | không | bvd2, bvn2, bvd2Xt, bvd2Err, bvn2Err, bvn2Ld | SelSheet |
| Đoàn luật sư | Chọn đoàn luật sư | 3 | có | bvd2, bvn2, bvd2Xt, bvd2Err, bvn2Err | SelSheet |
| Vai trò tố tụng | Chọn vai trò tố tụng | 4 | không | bvn2, bvn2Err, bvn2Ld | SelSheet |
| Tòa án nhận đăng ký | Chọn tòa án nhận đăng ký | 5 | có | bvn4 (khóa ở bvd4, defenderView…) | SelSheet |

### A9. Ký số và tiện ích khác
| Ô chọn | Tiêu đề bảng | Số mục | Ô tìm | Màn | Thành phần |
|---|---|---|---|---|---|
| Chứng thư ký số từ xa đã khai báo | Chọn chứng thư ký số từ xa đã khai báo | 2 | không | sign, signDelDef, signDelCert | SelSheet |
| Nhà cung cấp chứng thư số | Chọn nhà cung cấp chứng thư số | 4 | không | cert, certCa | SelSheet |
| Kỳ công bố | Chọn kỳ công bố | 3 | không | ratingsPublic, ratingsPublicLow | SelSheet |
| Tỉnh/Thành (Trợ giúp pháp lý) | **Chọn tỉnh/Thành** (viết hoa giữa câu) | 6 | có | aid, aidNone | SelSheet |

## B. Ô chọn nằm trong bảng Bộ lọc (mở bảng chọn chồng lên bảng lọc – theo mã nguồn)
| Bảng lọc | Ô chọn | Màn | Thành phần |
|---|---|---|---|
| Bộ lọc hộp thư | Hồ sơ, vụ án · Tòa án ban hành · Thời gian gửi | inbox, inboxErr, dycXem | IbPick |
| Bộ lọc (Nghĩa vụ tài chính) | Loại khoản · Hồ sơ, vụ án · Ngày nộp | finance, financeDone | IbPick |
| Bộ lọc (Vụ án / Vụ việc phá sản) | Loại án (Loại vụ việc) · Cấp xét xử · Trạng thái · Vai trò | cases, proceedings | IbPick (VA_LOC / VV_LOC) |
| Bộ lọc (Lịch) | Tòa án · Hình thức · Thời gian | calList, calWeek, calEvent… (9 màn) | SelSheet |
| Lọc lịch sử ký | Đơn · Trạng thái | sign, signHist… (9 màn) | SelSheet |
| Bộ lọc hồ sơ (Khiếu nại, tố cáo) | Trạng thái · Loại việc | complaints, complaintsTt… | SelSheet |

IbPick (s2.js:257) dùng LvSheet + LvRows với tiêu đề là tên ô chọn (không có chữ "Chọn"), khác định dạng SelSheet.

## C. Bảng chọn mở từ nút, không phải ô chọn (theo mã nguồn)
| Bảng | Nút mở | Màn | Thành phần |
|---|---|---|---|
| Sắp xếp | "Mới nhất" | Hộp thư (inbox) | InboxScr |
| Sắp xếp | nút sắp xếp ở thanh công cụ danh sách | 36 màn danh sách: copyList (Trích lục), faq, answer, applications, draftLoad… | StRow / StBoLoc |
| Sắp xếp | nút sắp xếp | Danh sách đơn (applications…) | QdSapSheet |
| Sắp xếp | "Mới nhất" | Vụ án (cases, casesEmpty, proceedings) | VaList |
| Xem loại đơn / Chọn loại đơn muốn xem | ô "Loại đơn" (bố cục A) | applications… | QdKindPick |
| Trạng thái hồ sơ | thẻ trạng thái | home, homeAll, records, complaints… | KnHcLoc / LichHome |
| Kiểu hiển thị | nút kiểu hiển thị | (chưa gắn màn nào trong SCR) | KnXemSheet |

Theo các câu trả lời compare 21-11-2026 (1A.2, 4A.3), bảng "Sắp xếp" ở Trích lục và Vụ án sẽ bỏ.

## D. Ô chọn không mở bảng (tĩnh hoặc khóa)
| Ô chọn | Tình trạng | Màn (ví dụ) |
|---|---|---|
| Quốc tịch | bấm không mở gì | accountOrgThem, sub3, sub3Trung, sub3Kt, sub3Mot (8 màn) |
| Giới tính (dạng ô chọn) | bấm không mở gì | accountOrgThem |
| Địa chỉ nhận – Tỉnh/TP, Phường/Xã | bấm không mở gì | tl2, tl2k |
| Địa chỉ liên hệ – Tỉnh/TP, Phường/Xã | bấm không mở gì | khc1, ktc1, kpa1, ktc1T |
| Địa chỉ hiện tại / trụ sở tổ chức – Tỉnh/Thành phố, Phường/Xã | bấm không mở gì | bvd2Xt, bvn2Ld |
| Tất cả loại tài liệu · Mọi lần gắn kèm (lọc kho dữ liệu) | bấm không mở gì | sub5Kho, sub5KhoLoi, sub5KhoRong |
| Chọn đơn hoặc vụ án / Quyết định, văn bản / Vụ án liên quan | không mở ở màn trạng thái đã chọn | kqd1Doi, kqd1Vb, khv1Doi, ktv1Doi |
| Quốc tịch, địa chỉ, Tòa án nhận đơn/đăng ký… (dữ liệu tài khoản) | khóa đúng thiết kế | sub2…, bvd1…, sub6x, bvd4… |

Ngoài ra trong mã còn các ô chọn tĩnh không gắn màn SCR nào (Sign, MethodForm, Aid bản cũ ở s3.js; đã có bản mới trong s5.js).

## E. Lưu ý khi quét
- 2 màn làm hỏng khung điện thoại khi mở bằng chuyển màn trực tiếp, nên không quét được: **bs4**, **dycCp**.
- Điểm khác định dạng mẫu SelSheet nên xem lại:
  - Tiêu đề lặp "Chọn chọn Hòa giải viên" (hgReplyView).
  - "Chọn tỉnh/Thành" viết hoa giữa câu (aid).
  - Hai bảng không có chữ "Chọn" ở tiêu đề: "Biện pháp cần áp dụng" (bp1), "Diện đối tượng đề nghị miễn" (mg2).
  - Các bảng IbPick trong Bộ lọc có tiêu đề là tên ô.
- Ô tìm: phần lớn có khi trên 10 mục (một số danh sách tòa án/đoàn luật sư bật sẵn ô tìm dù ít mục).
- Riêng "Loại việc cụ thể" có ô tìm khi trên 6 mục.

---

## F. Đề xuất kiểu theo ảnh mẫu "Trạng thái" – người dùng đã chốt (21-11-2026)

Ảnh mẫu: bảng "Trạng thái" của danh sách Trích lục (kiểu Phân loại thư, `ib-pl`). Phiên này chỉ đề xuất; **việc sửa chính thức làm ở phiên chính**.

| Câu | Nội dung | Chốt |
|---|---|---|
| 1 | Kiểu bảng chọn (so sánh Hiện tại / PA1 / PA2 / PA3 trên Mục đích sử dụng, Loại việc cụ thể, Tòa án nhận đơn) | **PA2**: dòng không kẻ; mục đang chọn nền xám (`--surface-sunken`) bo góc, chữ đậm màu thường (không đỏ), không dấu tích; chạm mục chỉ đánh dấu, bấm **"Áp dụng"** (nút chính toàn chiều ngang ở chân bảng) mới đóng và nhận giá trị |
| 2 | Tiêu đề bảng | **Chỉ tên ô** (bỏ chữ "Chọn"), vd "Mục đích sử dụng", "Tòa án nhận đơn" – thay quy tắc "Chọn …" ở NDKK 1.29; tự hết các lỗi "Chọn chọn Hòa giải viên", "Chọn tỉnh/Thành" |
| 3 | Phạm vi áp thêm | **Cả 3 nhóm**: a. ô chọn trong bảng Bộ lọc (chấp nhận 2 lần bấm Áp dụng); b. bảng Sắp xếp; c. Trạng thái hồ sơ, Xem loại đơn (số đếm đặt bên phải như ảnh mẫu) |

Phạm vi tổng: 59 loại ô chọn ở mục A + nhóm B, C. Giữ nguyên: ô tìm "Nhập để tìm" khi trên 10 mục (Loại việc cụ thể: trên 6), dòng mô tả xám dưới tên mục (Loại việc cụ thể). Chân bảng tối đa 2 nút (quy tắc chung).

Tham khảo khi làm ở phiên chính:
- CSS demo (chỉ phần nhìn, chưa có hành vi "Áp dụng"): `<style id="de-xuat-droplist">` trong bản sao `scratchpad/demo/v536-de-xuat.html` của phiên 5d485666 – lớp `html.pa-2`.
- Thành phần cần sửa: `LvRows` / `LvSheet` (s3.js), `SelSheet` (s3.js:1563), `ChonDs` (s3.js:2662), `IbPick` (s2.js:257), các bảng Sắp xếp (`InboxScr`, `StRow`, `StBoLoc`, `QdSapSheet`, `VaList`), `QdKindPick`, `KnHcLoc`, bảng chọn riêng (`AddrChon`, `CaseTypes`, `LvChiTiet`, `DocCard`, `TLSheet`, `ChonToaAn`, `KnThuTucPa`, `KqdVbPick`, `KhvVaPick`, chọn đơn hoặc vụ án).
- Kiểu có sẵn để đối chiếu: `.ib-pl-it`, `.ib-pl-on` (page.css) – bảng Trạng thái Trích lục, Phân loại thư.
