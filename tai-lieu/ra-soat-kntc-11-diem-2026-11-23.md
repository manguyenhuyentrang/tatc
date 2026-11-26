# Rà soát 11 điểm – màn Khiếu nại, tố cáo (23-11-2026)

- Prototype: **v577** (prototype-src cùng thời điểm). Web: `tatc.congdichvu.web` origin/develop **c900bfda** (23-11-2026).
- Mã web đã đọc: `khieu-nai-to-cao/index.tsx`, `tab-to-tung.tsx`, `loc-to-tung-modal.tsx`, `trang-thai-qla.ts`, `khieu-nai-hanh-chinh/index.tsx`, `buoc-soan.ts`, `quan-ly-don/chi-tiet-don-giam-doc-tham/cau-hinh.ts`. CSDL: `DM_TRANGTHAI`, `DM_TINHTRANG`.
- Phiên này chỉ rà soát, chưa sửa prototype.

**Lưu ý phạm vi:** chỉ điểm 1 thuộc tab **hành chính**. Điểm 2–11 đều thuộc tab **trong tố tụng** (`tab-to-tung.tsx`). Tab hành chính trên web không có lọc ngày, không có Xóa nháp, không có lần hai, không có chip Đang gửi/Gửi lỗi.

| # | Điểm | Kết luận | Chi tiết |
|---|---|---|---|
| 1 | Khối "Đơn chưa lưu" (HC) | Prototype đã có, chỉ thiếu ở testcase | v577 có 2 nhãn ("Đơn chưa lưu" / "… — đã ký số, chưa gửi"), "Đang ở bước n/5 · tên bước", tên thủ tục, "Tiếp tục khai" / "Tiếp tục gửi đơn" (màn `complaints`, `complaintsNhapKy`). Tên bước 2 trên web đổi theo loại đơn (KN "Cá nhân, đơn vị bị khiếu nại", TC "Người, đơn vị bị tố cáo", PAKN "Cơ quan, cá nhân liên quan"); prototype chỉ có ví dụ KN – dữ liệu mẫu, không phải lỗi. |
| 2 | Lọc "Ngày gửi" (TT) | **Đúng – lỗi prototype** | `KnTtLoc2` chỉ trả về số điều kiện (Từ/Đến ngày), danh sách không lọc theo ngày. |
| 3 | Giới hạn ngày (TT) | **Đúng một phần** | Prototype đã có: câu lỗi "“Từ ngày” không được sau “Đến ngày”." và khóa Áp dụng; Từ ngày max = Đến ngày. Thiếu: web chặn ngày sau hôm nay (Từ ngày max = Đến ngày hoặc hôm nay; Đến ngày max = hôm nay). |
| 4 | Xóa nháp (TT) | **Đúng – lỗi prototype** | `complaintsDraftDel` hỏi xác nhận → thanh "Đã xóa bản nháp." → quay lại danh sách vẫn còn thẻ nháp, số "Lưu nháp" không giảm. Web: xóa thật, làm mới danh sách và số đếm. |
| 5 | Thử lại khi lỗi | **Đúng – lỗi prototype** | `complaintsErr`, `complaintsTtErr`: nút Thử lại `onAction: noop`. Web gọi lại (refetch). |
| 6 | Nút lần hai, Tiếp tục soạn nháp lần hai khi hết điều kiện (TT) | **Không đúng – prototype đã như web** | Web: hai nút đều `disabled` (chỉ có tooltip khi rê chuột trên máy tính); thông báo lý do chỉ hiện khi bấm cả thẻ nháp (toast). Prototype: nút khóa; bấm thẻ nháp hiện thanh "Không còn điều kiện gửi lần hai. Bản nháp này không còn soạn tiếp hoặc nộp được, bạn có thể xóa nháp."; thẻ lần hai hiện dòng lý do. Điểm cân nhắc (không phải lệch web): trên điện thoại không có tooltip, bấm nút khóa không có phản hồi. |
| 7 | Liên kết "Đã gửi khiếu nại lần hai" (TT) | **Đúng – lỗi nặng hơn mô tả** | Kiểm trên v577 (`complaintsTtL2Da`): lớp chạm của thẻ (`ph-mail2-hit`) phủ **toàn bộ** liên kết (trái, giữa, phải) → bấm liên kết mở `complaintTtDone` (hồ sơ lần đầu). Đích gắn sẵn của liên kết là `complaintTt` – cũng không phải hồ sơ lần hai. Web: mở chi tiết hồ sơ lần hai (`/khieu-nai-to-cao/to-tung/{mã lần hai}`); prototype có sẵn màn `complaintTtL2`. Web đặt dòng này ngay dưới dòng vụ án/đơn gốc, prototype đặt cuối thẻ. |
| 8 | "Xóa bộ lọc" ở trạng thái rỗng (TT) | **Không sửa – đã chốt bỏ** | Quyết định chung 21-11: bỏ nút Xóa bộ lọc ở mọi danh sách, dùng ✕ ô tìm + Nhập lại trong Bộ lọc. |
| 9 | Chip "Đang gửi", "Gửi lỗi" (TT) | **Đúng một phần** | "Đang gửi": prototype hiện khi có hồ sơ hoặc đang chọn – đúng web (màn `complaintsTtGui`). "Gửi lỗi": prototype chỉ hiện khi đang chọn, không có điều kiện "có hồ sơ"; không có màn nào có hồ sơ Gửi lỗi. Web: hiện khi số > 0 hoặc đang chọn. |
| 10 | Trạng thái Tòa án, tình trạng trên thẻ TT (màu theo mã) | **Lệch web** | Xem bảng dưới. |
| 11 | Lỗi khi đã có dữ liệu cũ (TT) | **Đúng – prototype chưa có** | Web tố tụng: lỗi tải lại khi đang có danh sách → dải đỏ "[thông báo lỗi]" (mặc định "Không tải được danh sách hồ sơ."), không có Thử lại, danh sách cũ vẫn hiện. Prototype chỉ có lỗi toàn màn. (Tab HC web: khối lỗi có Thử lại, danh sách cũ vẫn hiện bên dưới.) |

## Điểm 10 – nhãn trên thẻ tố tụng

Web (`TrangThaiTongDat`): có trạng thái Tòa án thì hiện tên trạng thái Tòa án, màu theo mã ST; chưa có thì hiện trạng thái Cổng (Lưu nháp, Đang gửi, Đã gửi, Gửi lỗi). Tình trạng hiện nhãn thứ hai, màu theo mã RS; mã không có trong bảng màu → màu trung tính (xám).

| Mã (CSDL) | Tên (CSDL) | Màu web | Prototype v577 | Lệch |
|---|---|---|---|---|
| ST-02b | Đã gửi đơn | info (xanh dương) | "Đã gửi đơn" info | – |
| ST-03 | Đang xử lý đơn | cam `#B86A00` / `#FDF0DD` | "Đang xử lý" info | tên thiếu "đơn", màu sai |
| ST-04 | Đã xử lý đơn | success | "Đã xử lý" success | tên thiếu "đơn" |
| RS-00 | Tòa án đã nhận đơn | trung tính | info | màu |
| RS-46 | Đang xem xét, giải quyết khiếu nại | trung tính | info | màu |
| RS-49 | Đã giải quyết khiếu nại | trung tính | success | màu |
| CHUA_GUI (Cổng) | Lưu nháp | `#8A5A00` / `#FEF4E2` (vàng) | neutral | màu |
| DANG_GUI (Cổng) | Đang gửi | `#8A5A00` / `#FEF4E2` | warning | – |

Màu web là mã hex riêng; khi áp vào prototype dùng tông gần nhất của design system (warning / success / info / neutral).

> Đính chính điểm 10: chấm tình trạng `qd-tinh-info` của prototype đã là chữ xám (`--ink-muted`); tone `info` của design system cũng là xám. Chỉ "Đã giải quyết khiếu nại" (xanh lá) lệch màu tình trạng.

## Chốt phương án sửa (demo 23-11-2026, áp dụng ở phiên chính)

Ảnh demo ở `C:\Users\trangmnh\AppData\Local\Temp\claude\7fa6e392304388b5\5d485666-bb1a-4ea0-a1ce-a104ccbd9326\scratchpad\f\` (pk-*.png, pl-7.png, po-10.png, pp-11.png).

| # | Chốt |
|---|---|
| 2 | **Duyệt.** Bộ lọc tố tụng: "Áp dụng" lọc thật danh sách theo Ngày gửi (Từ ngày – Đến ngày), không chỉ đếm điều kiện. (pk-2) |
| 3 | **PA A – Ẩn.** Hai ô Từ ngày / Đến ngày đổi sang ô chọn ngày bánh xe (như Soạn đơn, `NgayChonO`/`NgayBanhXe`), định dạng DD-MM-YYYY; bảng chọn **không hiện** ngày, tháng sau hôm nay. Giữ câu lỗi “Từ ngày” không được sau “Đến ngày” và khóa Áp dụng. (pk-3) |
| 4 | **Duyệt.** Xác nhận Xóa nháp → về danh sách: thẻ nháp mất, số "Lưu nháp" trong Bộ lọc giảm, thanh "Đã xóa bản nháp.". (pk-4) |
| 5 | **Duyệt.** Bấm Thử lại ở màn lỗi tải danh sách → trạng thái đang tải → danh sách; áp cả tab hành chính và tố tụng. (pk-5) |
| 7 | **Giữ hiển thị như hiện tại, chỉ sửa lỗi.** Liên kết đỏ gạch chân "Đã gửi khiếu nại lần hai: …" giữ ở cuối thẻ; sửa để bấm được (nằm trên lớp chạm của thẻ) và mở **Chi tiết hồ sơ lần hai** (`complaintTtL2`), không mở hồ sơ lần đầu. Đã demo PA A (như web, dưới dòng Hồ sơ bị khiếu nại), PA C/D/E (thẻ việc xám, dải xanh lá, dòng thông tin) – không chọn. |
| 9 | **Duyệt.** Thêm dữ liệu mẫu một hồ sơ "Gửi lỗi" (không có tình trạng); Bộ lọc → Trạng thái hiện "Gửi lỗi · n" khi có hồ sơ gửi lỗi hoặc đang chọn (như web). (pk-9) |
| 10 | **PA G – mỗi trạng thái một màu, dùng bảng màu Tag của design system** (không theo web): Lưu nháp tím `--tag-10`; Đang gửi vàng `--tag-3`; Gửi lỗi đỏ `--tag-1`; Đã gửi đơn ngọc `--tag-7`; Đang xử lý đơn xanh dương `--tag-9`; Đã xử lý đơn lục `--tag-6` (nền `-bg`, chữ `-text`). Đổi tên "Đang xử lý" → **"Đang xử lý đơn"**, "Đã xử lý" → **"Đã xử lý đơn"**. Chấm tình trạng cùng màu trạng thái (`--tag-N`), chữ tình trạng xám. (po-10) Đã demo và người dùng bỏ: PA A–C (theo tone badge), PA D/E (đỏ đậm / viền đỏ), PA F. |
| 11 | **Duyệt (phương án người dùng đưa).** Tab tố tụng: đổi Bộ lọc / tìm kiếm mà tải lỗi → giữ ô tìm và Bộ lọc (giữ điều kiện đã chọn), phần danh sách thay bằng màn lỗi (tam giác chấm than, "[Thông báo lỗi của hệ thống]" / "Không tải được danh sách hồ sơ.", Thử lại). Không dùng dải đỏ trên danh sách cũ như web. (pp-11) |
| 1, 6, 8 | Không sửa prototype (xem bảng rà soát). |

> Đã áp vào prototype v578 ở phiên chính (23-11-2026): 8 lỗi 2, 3, 4, 5, 7, 9, 10, 11 theo bảng chốt; thêm 2 màn complaintsTtLocTaiLoi, complaintsTtTimTaiLoi cho lỗi 11.
