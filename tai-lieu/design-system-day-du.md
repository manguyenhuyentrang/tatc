# Design System – Cổng Dịch vụ Tư pháp (app mobile TATC)

| | |
|---|---|
| Phiên bản | Cập nhật 02/11/2026 (thêm mục 13: quy tắc rút ra từ màn Soạn đơn, bước 1–7); bản 30/10/2026 đồng bộ với trang design system bản 41 |
| Phạm vi | Ứng dụng di động Cổng Dịch vụ Tư pháp (TATC), khổ màn 390px, chỉ giao diện sáng |
| Mã nguồn | Namespace `TuPhap`, React 18.3.1 (UMD); tệp `components/bundle.js`, `components/bundle.css`, `tokens.css`, `components/index.d.ts` |
| Design system (trang) | https://claude.ai/artifact/1GbaHfiE2GAprpV1qBCwQ7 |
| Bản duyệt 74 màn | https://claude.ai/artifact/QyVS6ngwmdVEyPyvtfpEwU |
| Prototype | "Prototype TATC Gen UI": https://claude.ai/artifact/CKnVgGSByzDJD7vDSWCnDd (bản cũ, không cập nhật: https://claude.ai/artifact/RsNHijiJbodLQbodMuAVsH) |

> Các đường dẫn trên là trang riêng tư; người khác chỉ mở được sau khi chủ sở hữu chia sẻ.
>
> **Mục 13 (02/11/2026) thay các mục trước khi nội dung khác nhau.** Chi tiết từng quyết định: `claude/design-system-chot-2026-10-30.md`.

## Mục lục

- 1. Tổng quan
- 2. Nội dung và giọng văn
- 3. Màu sắc
- 4. Chữ
- 5. Khoảng cách, bo góc, kích thước, bóng
- 6. Bố cục màn hình
- 7. Biểu tượng và hình ảnh
- 8. Trạng thái tương tác
- 9. Thành phần
- 10. Quyết định đã chốt
- 11. Nội dung chờ cung cấp
- 12. Cách dùng trong mã
- 13. Cập nhật 02/11/2026 – quy tắc từ màn Soạn đơn

## 1. Tổng quan

Hệ thống thiết kế cho ứng dụng di động Cổng Dịch vụ Tư pháp. Màu chỉ lấy từ bộ màu chính thức của dự án (cộng màu trắng): đỏ chủ đạo, nền xám lạnh, trạng thái 4 lớp (chữ, nền, viền, chấm), vàng dùng hạn chế. Chữ dùng một họ phông Roboto. Bố cục màn hình và kiểu icon minh họa theo app My VN Post. Công dân dùng ứng dụng để nộp đơn khởi kiện dân sự, hành chính; theo dõi tiến trình tố tụng, xét xử, tống đạt điện tử; xin trích lục bản sao, gửi khiếu nại tố cáo và xem lịch tiếp dân.

**Trạng thái: đã chốt ngày 30/10/2026.** Màu đỏ chủ đạo `#A3131C`; phương án component đã chọn: Stepper C, FileUpload B, Tabs `underline`/`chip`, ProcessSteps `brand`/`light`, BottomNav có nút "Nộp đơn" ở giữa, HomeHeader có nhãn vai trò, Accordion thẻ riêng chọn bằng radio, RecordCard/CaseCard phương án D; AppBar: màn chức năng con dùng `variant="plain"` nền trắng (phương án A, 30/10/2026), màn trên thanh điều hướng giữ header đỏ; bỏ Breadcrumb; SearchToolbar C, EmptyState C, StatSummary tạm chọn B. Các câu chữ ở mục "Nội dung chờ cung cấp" chưa chốt.

**Cách cập nhật:** design system được bổ sung dần trong quá trình thiết kế. Mỗi component mới được đề xuất 3 phương án để chủ dự án chọn; chỉ thêm vào design system sau khi đã chọn.

## 2. Nội dung và giọng văn

- Nhãn nút và menu dùng câu mệnh lệnh ngắn: "Đăng nhập bằng VNeID", "Nộp đơn", "Gửi đơn", "Tra cứu", "Xem hướng dẫn".
- Thông báo chính thức xưng "Ông/Bà". Dùng đúng thuật ngữ tố tụng: thụ lý, tống đạt, hòa giải, phiên tòa sơ thẩm, trích lục, bản án.
- Mô tả dịch vụ một câu, có dấu chấm: "Soạn và gửi đơn khởi kiện kèm tài liệu trực tuyến."
- Tiêu đề banner chào và tên cổng viết hoa toàn bộ ("TÒA ÁN ĐIỆN TỬ", "CỔNG DỊCH VỤ TƯ PHÁP"); mọi tiêu đề khác viết hoa chữ đầu câu ("Dịch vụ khác").
- Nhãn nhỏ trên tiêu đề và nhãn nhóm viết hoa, kiểu `overline`: "QUY TRÌNH", "BƯỚC 01 / 04", "HÔM NAY". Nhãn trạng thái luôn viết chữ thường: "Chờ xử lý", "Đã nhập", "Đang diễn ra" (chốt 30/10/2026).
- Ngày `dd/mm/yyyy`, giờ `HH:mm`; số tiền dùng dấu chấm phân cách nghìn và đơn vị "đ" ("300.000 đ"). Số thụ lý giữ đúng định dạng: "125/2026/TLST-DS". Tổng đài ghi liền: "19006126".
- Không dùng biểu tượng cảm xúc (emoji).

## 3. Màu sắc

Giao diện chỉ dùng bộ màu chính thức của dự án và màu trắng. Không thêm màu khác. Chỉ có giao diện sáng.

- **Đỏ.** `brand-800` = `#A3131C` là đỏ chủ đạo (chốt ngày 30/10/2026): header, nút, tab đang chọn, thanh bước, liên kết. Thang đỏ tính lại từ màu này: `brand-950` `#63070D`, `brand-900` `#830D14`, `brand-700` `#BA3030`, `brand-200` `#FFC6C0`, `brand-50` `#FFF2F0`. Header và khối đỏ dùng gradient `brand-950` → `brand-800`. Nút chính và thẻ "Nộp đơn khởi kiện" dùng gradient `brand-700` → `brand-900`; nhấn đổi sang `primary-pressed`. Banner trang chủ dùng gradient `brand-800` → `brand-banner`. `court-red` chỉ cho số đếm, huy hiệu (nhãn "Mới") và dấu * bắt buộc.
- **Vàng: hạn chế.** Chỉ dùng đúng 5 vai trò (vai trò thứ 5 là sao đã chọn của `RatingStars`, duyệt ngày 30/10/2026): `court-gold` cho đường viền dưới header, chấm thông báo và nhãn nhấn nhỏ trên nền đỏ ("QUY TRÌNH", "BƯỚC 01 / 04", nhãn banner); `gold-banner` cho nút trên banner trang chủ; `gold-soft` (qua `on-brand-muted`) cho chữ phụ trên nền đỏ. Không dùng vàng cho nền thẻ, biểu tượng, tiêu đề hay viền trang trí.
- **Trắng.** `white` cho nền thẻ (`surface`), bottom sheet, vòng icon minh họa, và cho chữ, biểu tượng trên nền đỏ.
- **Nền, chữ, viền.** Nền trang `surface-page`; thẻ `surface` viền `border` bóng `shadow-card`; ô nhập nền `surface-sunken`; `Tabs` gạch dưới và `BottomNav` nền `surface`. Chữ chính `ink`, chữ cấp hai `ink-muted`, chữ phụ `ink-subtle`.
- **Nền đỏ nhạt.** `brand-tint` (`brand-50`, `#FFF2F0`) tách khỏi nền Lỗi `danger-tint` (`#FDF4F3`): nhãn loại đơn `Tag`, mục đang chọn (chip `Tabs`, mục radio `Accordion`), ô biểu tượng, bước hiện tại của `Stepper`; viền đi kèm `brand-200`. Chữ trên nền này dùng `on-brand-tint` (`brand-950`) hoặc `brand-text`.
- **Trạng thái.** Mỗi trạng thái có 4 lớp: chữ, nền `*-tint`, viền `*-border`, chấm `*-dot`. `success` = Đã thụ lý, Đã tống đạt, Hoàn thành, Đã nhập. `warning` = Chờ xử lý, Chờ bổ sung, Sắp đến hạn. `danger` = Trả lại đơn, Quá hạn, lỗi nhập liệu. `info` = Đang xử lý, Đã tiếp nhận, dùng bộ xám trung tính (`ink-muted`, `surface-sunken`, `border`, `ink-subtle`). Luôn kèm chữ, không phân biệt trạng thái chỉ bằng màu.
- **Độ trong suốt.** Chỉ dùng trong bóng đổ (`shadow-*`), lớp phủ sau bottom sheet (`scrim`) và lớp phủ đỏ trên ảnh banner. Nút, chip, thẻ trên nền đỏ dùng màu đặc (`brand-700`, `brand-900`) và `white`.
- **Độ tương phản.** Mọi cặp chữ/nền đạt 4.5:1. Ngoại lệ giữ theo bộ màu: viền ô nhập `border` chỉ 1.2:1 với nền thẻ (ô nhập nhận diện nhờ nền `surface-sunken` và nhãn), dấu * `court-red` trên `surface-sunken` đạt 4.3:1.
- Gradient chỉ dùng ở header, nút chính, thẻ "Nộp đơn khởi kiện", banner và khối Quy trình.

### 3.1. Bảng màu (token)

**Thang đỏ thương hiệu**

| Token | Giá trị | Dùng cho |
|---|---|---|
| `brand-950` | `#63070d` | Đỏ sẫm nhất: đầu gradient header, cuối gradient banner; chữ trên nền đỏ nhạt `brand-tint` (12.3:1). |
| `brand-900` | `#830d14` | Đỏ đậm: cuối gradient nút; nền nút, thanh, thẻ đặc trên nền đỏ; trạng thái nhấn. Chữ trắng 10.3:1. |
| `brand-banner` | = `brand-950` (`#63070d`) | Đỏ sẫm banner: cuối gradient banner trang chủ (cùng mã `brand-950`). |
| `brand-800` | `#a3131c` | Đỏ chủ đạo (chốt 30/10/2026): header, nút, tab đang chọn, thanh bước, liên kết. Chữ trắng trên nền này 7.9:1; chữ màu này trên `surface` 7.9:1, trên `surface-page` 7.1:1, trên `brand-tint` 7.2:1. |
| `brand-700` | `#ba3030` | Đỏ sáng: đầu gradient nút; nền nút chuông, viền các khối đặc trên nền đỏ. Chữ trắng 5.9:1. |
| `brand-200` | `#ffc6c0` | Viền đỏ nhạt: viền nhãn loại đơn và mục đang chọn trên nền `brand-tint`. |
| `brand-50` | `#fff2f0` | Đỏ nhạt nhất của thang #A3131C; dùng qua `brand-tint`. |
| `court-red` | `#da251d` | Đỏ tươi: số đếm, huy hiệu (nhãn "Mới"), dấu * bắt buộc. Chữ trắng trên nền này 4.9:1. Dấu * trên `surface-sunken` đạt 4.3:1 (giữ theo bộ màu). |

**Vàng và trắng**

| Token | Giá trị | Dùng cho |
|---|---|---|
| `court-gold` | `#ffcd00` | Vàng, chỉ dùng cho: đường viền dưới header, chấm thông báo, nhãn nhấn nhỏ trên nền đỏ (5.2:1 trên `brand-800`). |
| `gold-banner` | `#ffc800` | Vàng, chỉ dùng cho nút trên banner trang chủ. Chữ trên nền này dùng `on-gold` (10.2:1). |
| `gold-soft` | `#ffe9a8` | Vàng nhạt, chỉ dùng cho chữ phụ trên nền đỏ (7.8:1 trên `brand-800`, 13.2:1 trên `brand-950`). |
| `white` | `#ffffff` | Trắng: nền thẻ, bottom sheet, vòng icon minh họa; chữ và biểu tượng trên nền đỏ. |
| `on-gold` | = `brand-950` (`#63070d`) | Chữ trên nút banner `gold-banner`. |

**Nền, chữ, viền**

| Token | Giá trị | Dùng cho |
|---|---|---|
| `surface-page` | `#f1f3f6` | Nền trang. |
| `surface` | = `white` (`#ffffff`) | Nền thẻ, header phụ, bottom sheet, thanh tóm tắt. |
| `surface-sunken` | `#eef1f5` | Nền ô nhập, thanh tab, BottomNav, nút `tonal`, ô icon trong `OptionItem`. |
| `border` | `#e3e8ef` | Viền thẻ, viền ô nhập, đường kẻ, viền vòng icon. Viền ô nhập 1.2:1 với nền thẻ (giữ theo bộ màu); ô nhập nhận diện nhờ nền `surface-sunken` và nhãn. |
| `ink` | `#0e1626` | Chữ chính trên `surface`, `surface-page`, `surface-sunken`, `brand-tint` (16:1 trở lên). |
| `ink-muted` | `#3b4660` | Chữ cấp hai: mô tả thẻ, nhãn trường, giá trị phụ (8.3:1 trở lên). |
| `ink-subtle` | `#5d6b86` | Chữ phụ: placeholder, ngày giờ, nhãn BottomNav chưa chọn (4.7:1 trên `surface-sunken`, 4.8:1 trên `surface-page`). |
| `border-strong` | = `ink-subtle` (`#5d6b86`) | Viền checkbox, radio, vòng bước sắp tới: đạt 4.7:1 trở lên trên mọi nền. |

**Trạng thái**

| Token | Giá trị | Dùng cho |
|---|---|---|
| `success` | `#1f6f5c` | Chữ trạng thái thành công: Đã thụ lý, Đã tống đạt, Hoàn thành, Đã nhập (5.6:1 trên `success-tint`). |
| `success-tint` | `#f2f7f5` | Nền nhãn thành công. |
| `success-border` | `#d3e6de` | Viền nhãn thành công. |
| `success-dot` | `#2f8f74` | Chấm trạng thái thành công; chấm bước đã xong trên dòng thời gian. |
| `warning` | `#8c5a00` | Chữ trạng thái cảnh báo: Chờ xử lý, Chờ bổ sung, Sắp đến hạn (5.5:1 trên `warning-tint`). |
| `warning-tint` | `#fbf6ec` | Nền nhãn cảnh báo. |
| `warning-border` | `#eedfbf` | Viền nhãn cảnh báo. |
| `warning-dot` | `#b07d00` | Chấm trạng thái cảnh báo. |
| `danger` | `#b42318` | Chữ trạng thái lỗi: Trả lại đơn, Quá hạn, lỗi nhập liệu (6.1:1 trên `danger-tint`). |
| `danger-tint` | `#fdf4f3` | Nền nhãn lỗi, nền ô nhập bị lỗi. |
| `danger-border` | `#f3d4d0` | Viền nhãn lỗi. |
| `danger-dot` | `#d9443a` | Chấm trạng thái lỗi. |
| `info` | = `ink-muted` (`#3b4660`) | Chữ trạng thái đang xử lý (Đang xử lý, Đã tiếp nhận) theo bộ xám trung tính. |
| `info-tint` | = `surface-sunken` (`#eef1f5`) | Nền nhãn đang xử lý. |
| `info-border` | = `border` (`#e3e8ef`) | Viền nhãn đang xử lý. |
| `info-dot` | = `ink-subtle` (`#5d6b86`) | Chấm trạng thái đang xử lý. |

**Vai trò (bí danh)**

| Token | Giá trị | Dùng cho |
|---|---|---|
| `primary` | = `brand-800` (`#a3131c`) | Màu nút chính khi không dùng gradient. |
| `primary-pressed` | = `brand-900` (`#830d14`) | Nền nút chính khi nhấn. |
| `on-primary` | = `white` (`#ffffff`) | Chữ và biểu tượng trên nút chính và mọi nền đỏ `brand-*`. |
| `on-brand` | = `white` (`#ffffff`) | Chữ chính trên header, banner và khối đỏ. |
| `on-brand-muted` | = `gold-soft` (`#ffe9a8`) | Chữ phụ trên header, banner và khối đỏ. |
| `brand-text` | = `brand-800` (`#a3131c`) | Chữ liên kết, mục đang chọn ở BottomNav, nút phụ; trên `surface`, `surface-page`, `surface-sunken`, `brand-tint` (6.9:1 trở lên). |
| `brand-tint` | = `brand-50` (`#fff2f0`) | Nền đỏ nhạt thương hiệu: nhãn loại đơn `Tag`, mục đang chọn (chip `Tabs`, radio `Accordion`), ô biểu tượng, nút Đánh dấu đã chọn, bước hiện tại. Tách khỏi nền lỗi `danger-tint`. |
| `on-brand-tint` | = `brand-950` (`#63070d`) | Chữ trên `brand-tint`. |
| `icon-accent` | = `court-red` (`#da251d`) | Biểu tượng nét trên `brand-tint` và trong thẻ (4.5:1 trên `brand-tint`). |
| `focus-ring` | = `brand-800` (`#a3131c`) | Vòng focus đặc 2px trên nền sáng; trên nền đỏ dùng `white`. |
| `scrim` | `rgba(14, 22, 38, 0.5)` | Lớp phủ sau bottom sheet và hộp thoại (`ink` 50%). |

**Chỉ dùng trong icon minh họa**

| Token | Giá trị | Dùng cho |
|---|---|---|
| `illo-paper` | `#f7f9fc` | Chỉ dùng trong icon minh họa: mặt giấy (luôn có viền `illo-paper-stroke`). |
| `illo-paper-stroke` | `#9aa8bb` | Chỉ dùng trong icon minh họa: viền tờ giấy. |
| `illo-paper-back` | `#dce3ec` | Chỉ dùng trong icon minh họa: tờ giấy phía sau, trang sách bóng. |
| `illo-line` | `#c3ccd8` | Chỉ dùng trong icon minh họa: dòng chữ trên giấy. |
| `illo-steel` | `#5b7ba6` | Chỉ dùng trong icon minh họa: màn hình, phong bì, thẻ căn cước. |
| `illo-steel-light` | `#d3dfee` | Chỉ dùng trong icon minh họa: mặt kính, nền ảnh, dòng trên thẻ. |
| `illo-steel-dark` | `#45628a` | Chỉ dùng trong icon minh họa: mặt tối của vật xanh thép, nét chữ ký. |
| `illo-teal` | `#3e8e86` | Chỉ dùng trong icon minh họa: bóng hướng dẫn, đồng hồ, tai nghe, ô lịch đánh dấu, bóng thoại phụ. |
| `illo-terracotta` | `#c8743f` | Chỉ dùng trong icon minh họa: bút, tiêu đề đơn, bóng thoại phụ. |
| `illo-ochre` | `#d2a24c` | Chỉ dùng trong icon minh họa: bìa hồ sơ, đồng xu, dấu trang, chip thẻ (dùng ít). |
| `illo-ochre-dark` | `#b0832f` | Chỉ dùng trong icon minh họa: mặt tối của bìa hồ sơ, đồng xu. |
| `illo-plum` | `#7a5c8e` | Chỉ dùng trong icon minh họa: tiêu đề bản trích lục, giấy ủy quyền. |
| `illo-plum-light` | `#e2d8ea` | Chỉ dùng trong icon minh họa: tờ giấy phía sau màu tím nhạt. |
| `illo-sage` | `#5e8f6a` | Chỉ dùng trong icon minh họa: đồi trong ảnh chứng cứ, tiêu đề biên lai. |
| `illo-wood` | `#a8693a` | Chỉ dùng trong icon minh họa: búa gỗ. |
| `illo-wood-dark` | `#7e4e2b` | Chỉ dùng trong icon minh họa: cán và đai búa gỗ. |
| `illo-skin` | `#e6c6aa` | Chỉ dùng trong icon minh họa: da người, ngòi bút. |
| `illo-hair` | `#3a2d26` | Chỉ dùng trong icon minh họa: tóc. |

## 4. Chữ

- Một họ phông: **Roboto** 400 / 500 / 700, có đủ dấu tiếng Việt. File phông nằm ở `fonts/` (Roboto 2.137, giấy phép Apache 2.0 ở `fonts/Roboto-LICENSE.txt`); Android có sẵn Roboto, iOS và web nhúng 3 file này.
- **Thang 6 cỡ: 10 · 12 · 14 · 16 · 20 · 24** (duyệt 30/10/2026). Line-height cố định theo cỡ: 10/14, 12/16, 14/20, 16/24, 20/28, 24/32; ngoại lệ duy nhất là số trong viên tròn (chấm đếm) giữ line-height bằng chiều cao viên. Không dùng cỡ nào khác.
- Tiêu đề: `display` 24/32 700 (Đăng nhập, Nộp đơn thành công, màn chào), `title-lg` 20/28 700 (lời chào, bottom sheet, hộp thoại, tiêu đề hồ sơ ở màn chi tiết), `title` 16/24 700 (tiêu đề AppBar màn con, vừa tiêu đề dài), `brand-name` 14/20 700 chữ hoa (tên cổng).
- Nội dung: `title-sm` 16/24 500 (tiêu đề thẻ, dòng danh sách, khối form, tiêu đề khối trắng dùng 16/24 700), `body-lg` 16/24 (chữ trong ô nhập, ô chọn, ô tìm; ô nhập 16px để iOS không tự phóng to), `button` 16/24 500, `body` 14/20, `label` 14/20 500, `caption` 12/16 (ngày giờ, chú thích, tên ô dịch vụ, nhãn BottomNav), `badge` 12/16 500.
- Nhãn và số: `overline` 12/16 500 chữ hoa giãn 0.6px (chỉ nhãn nhóm như "HÔM NAY"); `stat` 24/32 700; `code` 14/20 500 cho số thụ lý, mã đơn; `micro` 10/14 500 chỉ cho số và ký hiệu ngắn (số đếm, "PDF", nhãn tháng "T10"). Số liệu, ngày giờ, số tiền dùng số cùng độ rộng (`font-variant-numeric: tabular-nums`, lớp `tp-num`).
- **Nhãn trạng thái viết chữ thường** ("Đã nhập", "Đang diễn ra", "Chờ ký số"), không viết hoa toàn bộ. Chữ hoa chỉ dùng cho tên cổng và nhãn nhóm `overline`.
- Chỉ dùng 3 độ đậm 400, 500, 700. Hỗ trợ cỡ chữ hệ thống phóng to tới 200%.

### 4.1. Kiểu chữ (token)

Họ phông: `Roboto, system-ui, -apple-system, "Segoe UI", Arial, sans-serif`.

| Nhóm | Kiểu | Cỡ/dòng | Độ đậm | Giãn chữ | Mẫu | Dùng cho |
|---|---|---|---|---|---|---|
| Tiêu đề | `display` | 24/32 | 700 | 0 | Đăng nhập | Tiêu đề màn lớn: Đăng nhập, Nộp đơn thành công, màn chào. |
| Tiêu đề | `title-lg` | 20/28 | 700 | 0 | Việc cần làm | Lời chào trang chủ, tiêu đề phần ("Việc cần làm"), tiêu đề bottom sheet, hộp thoại, tiêu đề hồ sơ ở màn chi tiết. |
| Tiêu đề | `title` | 16/24 | 700 | 0 | Phương thức giao dịch điện tử | Tiêu đề AppBar màn con (16 đậm để vừa tiêu đề dài). |
| Tiêu đề | `brand-name` | 14/20 | 700 | 0.3px | CỔNG DỊCH VỤ TƯ PHÁP | Tên cổng trên header; chữ hoa. |
| Nội dung | `title-sm` | 16/24 | 500 | 0 | Tranh chấp hợp đồng vay tài sản | Tiêu đề thẻ, dòng danh sách, khối form, Accordion. |
| Nội dung | `body-lg` | 16/24 | 400 | 0 | Nhập số căn cước hoặc mã số thuế | Chữ trong ô nhập, ô chọn, ô tìm kiếm; nội dung dài. |
| Nội dung | `button` | 16/24 | 500 | 0 | Nộp đơn trực tuyến | Chữ nút cỡ thường. |
| Nội dung | `body` | 14/20 | 400 | 0 | Tòa án nhân dân khu vực 1 - Hà Nội | Dòng thông tin trong thẻ, mô tả, Notice, giá trị InfoList. |
| Nội dung | `label` | 14/20 | 500 | 0 | Số điện thoại | Nhãn ô nhập, tab, chip lọc, liên kết, nút nhỏ. |
| Nội dung | `caption` | 12/16 | 400 | 0 | Tiếp nhận: 20/10/2026 | Ngày giờ, chú thích, trợ giúp ô nhập, mô tả dòng menu, tên ô dịch vụ, nhãn BottomNav, nhãn InfoList. |
| Nội dung | `badge` | 12/16 | 500 | 0 | Đã nhập | StatusBadge, Tag, nhãn loại hồ sơ, chip vai trò; chữ thường, không viết hoa toàn bộ. |
| Nhãn và số | `overline` | 12/16 | 500 | 0.6px | HÔM NAY | Nhãn nhóm chữ hoa: "HÔM NAY", "QUY TRÌNH". Không dùng cho nhãn trạng thái. |
| Nhãn và số | `stat` | 24/32 | 700 | 0 | 1.250.000 đ | Số tiền, số liệu tổng quan, ngày trong ô sự kiện; số cùng độ rộng. |
| Nhãn và số | `code` | 14/20 | 500 | 0 | DS-2026-0021 | Số thụ lý, mã hồ sơ; số cùng độ rộng. |
| Nhãn và số | `micro` | 10/14 | 500 | 0 | T10 | Chỉ số và ký hiệu ngắn (tối đa 4 ký tự): số trên chấm đếm, "PDF", nhãn tháng "T10". Không dùng cho câu chữ. |

## 5. Khoảng cách, bo góc, kích thước, bóng

- Lưới 4px: `space-1` … `space-8`. Lề màn hình `space-4`; khoảng giữa thẻ `space-3`; giữa các khối trang chủ `space-4`.
- Bo góc: `radius-sm` 10px (nút nhỏ, tab), `radius-md` 13px (nút, ô nhập, dòng lựa chọn), `radius-lg` 16px (thẻ, banner), `radius-xl` 24px (mép nội dung đè header, bottom sheet), `radius-pill` (nhãn, số đếm).
- Nút cỡ thường, ô nhập một dòng, ô chọn và ô tìm kiếm cao `button-height` **46px** (thống nhất 30/10/2026); nút nhỏ `size="sm"` 36px chỉ dùng cho thao tác trong dòng, trong thẻ; ô nhập nhiều dòng cao theo nội dung. Vùng chạm tối thiểu `touch-min` 48px.
- **Không đặt thông tin trực tiếp trên nền trang** (`surface-page`). Mọi nhóm thông tin nằm trong khối trắng (kiểu thẻ: `surface`, viền `border`, `shadow-card`, `radius-lg`, đệm 16px): tiêu đề nhóm 16/24 700 + nội dung của nhóm trong cùng một khối. Bộ lọc (chip, ô tìm, số kết quả) gom vào một khối trắng đệm 12px. `Stepper` đặt trong khối trắng riêng ở đầu màn. Danh sách (`TaskList`, `NotificationList`, `MenuList`, `RecordCard`, `EventCard`) đặt trong khối thì bỏ khung riêng, nối dòng bằng đường kẻ `border`.
- Bóng: `shadow-card` cho thẻ, `shadow-float` cho thẻ nổi đè header và thanh cố định, `shadow-primary` dưới nút chính và thẻ "Nộp đơn khởi kiện", `shadow-panel` cho khối đỏ, `shadow-glow-red` dưới vòng icon đỏ.
- Focus: viền đặc 2px `focus-ring` (`brand-800`) trên nền sáng, `white` trên nền đỏ.
- Chuyển cảnh tối đa 200ms; tắt khi hệ thống bật giảm chuyển động.

### Khoảng cách

| Token | Giá trị | Dùng cho |
|---|---|---|
| `space-1` | `4px` | Khoảng cách biểu tượng – chữ trong nhãn. |
| `space-2` | `8px` | Khoảng cách nhãn – ô nhập; biểu tượng – chữ trong liên kết. |
| `space-3` | `12px` | Khoảng cách giữa các nút; giữa các thẻ trong danh sách. |
| `space-4` | `16px` | Lề màn hình; khoảng cách giữa các khối trang chủ. |
| `space-5` | `20px` | Padding thẻ bước quy trình; khoảng hàng lưới dịch vụ. |
| `space-6` | `24px` | Padding ngang banner; khoảng cách giữa các phần lớn. |
| `space-8` | `32px` | Khoảng cách đầu màn hình chào. |

### Bo góc

| Token | Giá trị | Dùng cho |
|---|---|---|
| `radius-sm` | `10px` | Nút nhỏ, tab, chip trong header. |
| `radius-md` | `13px` | Nút, ô nhập, ô biểu tượng, dòng lựa chọn. |
| `radius-lg` | `16px` | Thẻ, banner, thẻ bước. |
| `radius-xl` | `24px` | Mép trên phần nội dung đè header, bottom sheet, banner chào. |
| `radius-pill` | `999px` | Nhãn trạng thái, số đếm, chip lọc `Tabs`, nhãn vai trò. |

### Kích thước

| Token | Giá trị | Dùng cho |
|---|---|---|
| `touch-min` | `48px` | Chiều cao tối thiểu của vùng chạm. |
| `button-height` | `46px` | Chiều cao nút cỡ thường, ô nhập một dòng, ô chọn, ô tìm kiếm (thống nhất 46px, duyệt 30/10/2026). Nút nhỏ giữ 36px; ô nhập nhiều dòng cao theo nội dung. |
| `appbar-height` | `56px` | Chiều cao AppBar, chưa tính đường vàng 2px. |
| `bottomnav-height` | `64px` | Chiều cao BottomNav, chưa tính vùng an toàn. |
| `icon-box` | `48px` | Ô vuông chứa biểu tượng dịch vụ. |
| `illo-circle` | `64px` | Vòng nền icon minh họa trong lưới dịch vụ. |
| `fab-size` | `56px` | Nút nổi Hỗ trợ trực tuyến. |

### Bóng

| Token | Giá trị | Dùng cho |
|---|---|---|
| `shadow-card` | `0 1px 2px rgba(14, 22, 38, 0.04), 0 2px 8px rgba(14, 22, 38, 0.05)` | Thẻ trắng trên `surface-page` (`ink` trong suốt). |
| `shadow-float` | `0 8px 24px rgba(14, 22, 38, 0.1)` | Thẻ tìm kiếm, thẻ bộ lọc đè header; nút nổi Hỗ trợ; thanh tóm tắt cuối màn hình. |
| `shadow-primary` | `0 6px 16px rgba(163, 19, 28, 0.28)` | Bóng dưới nút chính (`brand-800` trong suốt). |
| `shadow-panel` | `0 18px 44px rgba(99, 7, 13, 0.28)` | Banner chào và khối Quy trình màu đỏ. |
| `shadow-nav` | `0 -1px 0 #e3e8ef` | Đường kẻ `border` trên BottomNav. |
| `shadow-glow-red` | `0 6px 14px rgba(163, 19, 28, 0.3)` | Bóng dưới vòng icon đỏ trên thẻ hành động nhanh. |

## 6. Bố cục màn hình

Theo app My VN Post: header đỏ, phần nội dung bo góc đè lên mép dưới header, thẻ trắng nổi, nút hành động cố định ở đáy.

- **Trang chủ app TATC** (chốt 30/10/2026): `HomeHeader` đỏ (Quốc huy, tên cổng, nút Lịch, nút chuông, lời chào, nhãn vai trò) → thẻ 4 `ServiceTile` minh họa đè mép header → khối trắng "Việc cần làm" (liên kết "Xem tất cả" ở đầu khối, chip lọc, `TaskList`) → `BottomNav`. **Không dùng banner.**
- **Trang chủ cổng (bản web cũ)** (`HomeScreen`): `HomeHeader` (tên cổng, nút chuông có chấm vàng, lời chào, nhãn vai trò, thẻ tìm kiếm đè mép) → `BannerCarousel` (nút `gold`) → 2 `QuickAction` lớn ("Nộp đơn khởi kiện" `tone="red"`, "Hồ sơ của tôi" `tone="plain"`) → hàng `QuickAction` nhỏ → `SectionHeader variant="plain"` "Dịch vụ khác" + lưới 4 cột `ServiceTile` có icon minh họa (tối đa 8) → "Tin tức, thông báo" với 2 cột `NewsCard` → `ChatFab` → `BottomNav` 5 mục, mục giữa "Nộp đơn" là nút tròn đỏ nổi.
- **Đăng nhập**: màn flash nền đỏ (Quốc huy, nhãn "TÒA ÁN NHÂN DÂN TỐI CAO", tên cổng chữ hoa, thanh tải vàng) → đầu trang nền đỏ có `BackLink` "Về trang chủ", Quốc huy, tên cổng → khung trắng bo `radius-xl` đè mép: tiêu đề "Đăng nhập", `TextField` có `icon` (`idCard`, `lock`; mật khẩu có nút hiện/ẩn), `Button` khối, khi gửi dùng `loading` "Đang đăng nhập…".
- **Nộp đơn theo bước** (luồng Khiếu nại – kiến nghị): `AppBar` có Quốc huy và nút tài khoản → thẻ đầu gồm `Tag` loại đơn, tiêu đề `title-lg`, `Stepper` → thẻ form (`TextField`, `SelectField labelVisible`, `SegmentedControl`, `Checkbox`, `Notice`, `InfoList`, `FileUpload`) → `ActionBar` ở đáy. Chọn thủ tục dùng `Accordion`; chọn tệp từ kho và ký số dùng `Dialog`; màn kết quả dùng `InfoList variant="kv"` và `StatusBadge`.
- **Màn hình nhập nhiều bước** (`FilingScreen`): `AppBar variant="page"` → `tp-sheet` chứa các `FormSection` gập/mở có nhãn "Đã nhập" / "Chưa nhập" → trong khối dùng `SelectField`, `TextField`, `OptionItem` → `SummaryBar` cố định ở đáy (án phí + Lưu nháp + Gửi đơn).
- **Màn hình tra cứu, danh sách** (`ComplaintScreen`): `AppBar variant="page"` → `FilterCard` đè mép header → `Tabs variant="chip"` lọc nhanh → danh sách `RecordCard` cách nhau `space-3` (chạm cả thẻ để mở chi tiết) → `ChatFab`. `RecordCard` và `CaseCard` dùng chung một giao diện thẻ.
- **Chọn loại**: bấm hành động có nhiều loại (Nộp đơn) mở `SheetMenu` từ đáy, mỗi dòng có icon minh họa.

### 6.1. Khung màn hình app TATC (chốt 30/10/2026)

- **Trang chủ**: `HomeHeader` đỏ (Quốc huy, tên cổng, nút Lịch, nút chuông, lời chào, nhãn vai trò) → thẻ 4 `ServiceTile` minh họa đè mép header → khối trắng "Việc cần làm" (liên kết "Xem tất cả" ở đầu khối, chip lọc, `TaskList`) → `BottomNav`. Không dùng banner.
- **Màn trên thanh điều hướng** (Hồ sơ, Hộp thư tống đạt, Cá nhân): `AppBar variant="page"` đỏ, tiêu đề giữa; nội dung bo góc `radius-xl` đè mép header; `BottomNav` ở đáy.
- **Màn chức năng con** (mọi màn còn lại): `AppBar variant="plain"` nền trắng, mũi tên quay lại, tiêu đề 16/24 700 căn trái, thao tác chữ đỏ bên phải; nội dung bắt đầu ngay trên nền trang; thanh nút `ActionBar` cố định ở đáy nếu có.
- **Luồng nhập nhiều bước** (Nộp đơn khởi kiện 7 bước, Giao nộp tài liệu, Khai đơn khiếu nại): khối trắng chứa `Stepper` ở đầu → các khối trắng/`FormSection` của bước → `ActionBar` "Quay lại" + "Tiếp theo"; "Lưu nháp" đặt ở header.
- **Danh sách**: khối bộ lọc trắng (`Tabs` chip hoặc `SearchToolbar`, số kết quả) → các thẻ `RecordCard`/`CaseCard`/`FinanceCard` cách nhau `space-3`; chạm cả thẻ để mở chi tiết.
- **Chi tiết hồ sơ**: thẻ đầu (trạng thái, mã, tiêu đề 20/28 700) → `FormSection` "1. Thông tin chung", "2. Tiến trình…", "3. Chức năng liên quan".
- **Bảng chọn từ đáy**: `Dialog variant="sheet"` + `MenuList` có icon minh họa; chạm nền tối để đóng.
- **Quy tắc khối trắng**: không đặt thông tin trực tiếp trên nền trang; mỗi nhóm (tiêu đề 16/24 700 + nội dung) nằm trong một khối `surface` viền `border` bóng `shadow-card` bo `radius-lg` đệm 16px.

## 7. Biểu tượng và hình ảnh

- Hai loại icon:
  - **Icon minh họa** (`TuPhap.Illustration`): nhiều màu, hình khối phẳng, mỗi icon vẽ đúng nội dung dịch vụ (đơn có bút và dấu đỏ cho Nộp đơn, lịch có búa cho Lịch xét xử, phong bì có dấu đã nhận cho Tống đạt…). Dùng cho dịch vụ, loại đơn, loại tài liệu: `ServiceTile`, `OptionItem`, `SheetMenu`, `ChatFab`. Đặt trong vòng tròn trắng 64px viền `border` ở lưới dịch vụ, trên nền `surface-sunken` trong `OptionItem`.
  - **Icon nét** (`TuPhap.Icon`): nét 1.8px, khung 24px, màu theo chữ. Dùng cho thao tác giao diện: quay lại, tìm, chuông, mũi tên, BottomNav, trong nút.
- Icon minh họa là nơi duy nhất được dùng màu ngoài bộ màu: nhiều màu nhưng trầm, trang nghiêm, luôn kèm chi tiết đỏ chủ đạo (`brand-800`, `brand-700`). Màu dùng: xám xanh `ink-muted`, `ink-subtle`; xanh lục `success-dot`; trắng; và nhóm riêng cho icon `illo-*`: giấy `illo-paper` (viền `illo-paper-stroke`), `illo-paper-back`, `illo-line`, xanh thép `illo-steel*`, xanh ngọc `illo-teal`, đất nung `illo-terracotta`, vàng đất `illo-ochre*` (dùng ít), tím mận `illo-plum*`, xanh lá xám `illo-sage`, gỗ `illo-wood*`, da `illo-skin`, tóc `illo-hair`. Nhóm `illo-*` không dùng cho giao diện. Không dùng vàng sáng, không màu rực.
- Thêm icon mới: khung 48×48, tối đa 4 màu, một vật chính (giấy, lịch, phong bì…) và một chi tiết nhận diện màu đỏ ở góc phải dưới (con dấu, búa, đồng hồ); giấy luôn có viền để tách khỏi vòng nền trắng.
- Quốc huy Tòa án (`assets/Logos/quoc-huy-toa-an.png`) đặt ở `HomeHeader`, AppBar trang chủ và màn hình chào. Không cắt, đổi màu hay thêm hiệu ứng.
- Ảnh trụ sở Tòa án (`assets/Images/hero-toa-an-dien-tu.png`) dùng trong `HeroBanner`, `BannerCarousel`, màn hình chào; luôn có lớp phủ đỏ dưới chữ.

### 7.1. Icon nét (47)

`home`, `file`, `filePlus`, `scale`, `route`, `send`, `copy`, `message`, `calendar`, `bell`, `user`, `search`, `chevronRight`, `arrowLeft`, `check`, `clock`, `alert`, `x`, `info`, `grid`, `building`, `upload`, `arrowRight`, `lock`, `checkCircle`, `mail`, `phone`, `shield`, `mapPin`, `swap`, `plus`, `folder`, `chevronLeft`, `menu`, `chevronDown`, `eye`, `eyeOff`, `trash`, `idCard`, `star`, `archive`, `filter`, `sort`, `briefcase`, `wallet`, `pen`, `logout`

### 7.2. Icon minh họa (38)

`nopDon`, `traCuuHoSo`, `lichXetXu`, `xetXuTrucTuyen`, `tongDat`, `trichLuc`, `khieuNai`, `lichTiepDan`, `huongDan`, `anPhi`, `banAn`, `hoTro`, `chungCu`, `uyQuyen`, `cccd`, `chat`, `hanhChinh`, `yeuCau`, `phaSan`, `hoaGiai`, `banSao`, `saoChup`, `toCao`, `lichHen`, `doiLich`, `lichHuy`, `doiNguoi`, `vangMat`, `hoan`, `xemXet`, `huongDanSD`, `hoiDap`, `tinTuc`, `danhGia`, `nhacViec`, `caiDat`, `quaHan`, `phanTo`

Bộ icon minh họa nhiều màu cho dịch vụ, mỗi icon vẽ đúng nội dung của dịch vụ. Cách vẽ theo app My VN Post; màu trang nghiêm, trung tính, hợp với đỏ chủ đạo.

- Bên dùng cung cấp: `name` (một trong `TuPhap.illustrationNames`), tùy chọn `label` khi icon đứng một mình và mang nghĩa.
- Ánh xạ nội dung: `nopDon` (giấy + bút + dấu đỏ) = Nộp đơn khởi kiện; `traCuuHoSo` (bìa hồ sơ + kính lúp) = Tra cứu hồ sơ; `lichXetXu` (lịch + búa) = Lịch xét xử; `xetXuTrucTuyen` (màn hình + cán cân) = Xét xử trực tuyến; `tongDat` (phong bì + dấu đã nhận) = Văn bản tống đạt; `trichLuc` (hai bản giấy + con dấu) = Trích lục bản sao; `khieuNai` (bóng thoại có dấu chấm than) = Khiếu nại, tố cáo; `lichTiepDan` (người + đồng hồ) = Lịch tiếp dân; `huongDan` (bóng hỏi) = Hướng dẫn; `anPhi` (biên lai + đồng xu đ) = Án phí, lệ phí; `banAn` (sách luật + cán cân) = Bản án, quyết định; `hoTro` (tai nghe) = Tổng đài hỗ trợ; `chungCu` (ảnh + kẹp giấy) = Tài liệu, chứng cứ; `uyQuyen` (giấy có chữ ký + dấu) = Giấy ủy quyền; `cccd` (thẻ căn cước) = Giấy tờ tùy thân; `chat` = Hỗ trợ trực tuyến.
- Khung 48×48, hình khối phẳng, tối đa 4 màu mỗi icon, nhiều màu nhưng trầm: mỗi icon có một màu chủ đạo riêng (đất nung `illo-terracotta` cho Nộp đơn, vàng đất `illo-ochre` cho hồ sơ và án phí, xanh thép `illo-steel` cho tống đạt và giấy tờ, xanh ngọc `illo-teal` cho hướng dẫn, tiếp dân, hỗ trợ, tím mận `illo-plum` cho trích lục và ủy quyền) và luôn có chi tiết đỏ `brand-800`/`brand-700` (con dấu, lịch, bóng thoại). Vật kim loại dùng `ink-muted`; dấu đã nhận dùng `success-dot`; giấy `illo-paper` luôn có viền `illo-paper-stroke`.
- Nhóm màu `illo-*` chỉ dùng trong icon, không dùng cho giao diện. Không dùng vàng sáng hay màu rực.
- Kích thước: 44px trong vòng tròn trắng `illo-circle` viền `border` (lưới chức năng), 40px trong `OptionItem`, 34px trong `SheetMenu` và `ChatFab`.
- Icon minh họa chỉ dùng cho dịch vụ và loại tài liệu. Thao tác giao diện (quay lại, tìm, đóng, mũi tên) vẫn dùng `Icon` nét.
- Bổ sung ngày 30/10/2026 cho các bảng chọn từ đáy: `hanhChinh` (trụ sở) = Khởi kiện hành chính; `yeuCau` (bảng kẹp + dấu xong) = Yêu cầu giải quyết việc dân sự; `phaSan` (cặp + mũi tên đi lên) = Phục hồi, phá sản; `hoaGiai` (hai bên + bóng thoại) = Hòa giải, đối thoại; `banSao` = Cấp bản sao; `saoChup` (máy sao chụp) = Sao chụp tài liệu; `toCao` (loa) = Tố cáo; `lichHen` (lịch + dấu xanh) = Lịch, xác nhận lịch; `doiLich` (lịch + mũi tên đổi) = Thay đổi lịch hẹn; `lichHuy` (lịch + dấu x) = Từ chối tham dự; `doiNguoi` = Thay đổi hòa giải viên; `vangMat` = Báo vắng mặt; `hoan` (đồng hồ cát + tạm dừng) = Đề nghị hoãn; `xemXet` (văn bản + kính lúp) = Xem xét lại; `huongDanSD` (điện thoại + video) = Hướng dẫn sử dụng; `hoiDap` = Câu hỏi thường gặp; `tinTuc` (tờ báo) = Tin tức; `danhGia` (mặt cười + sao) = Đánh giá hài lòng; `nhacViec` (chuông) = Thông báo nhắc việc; `caiDat` (bánh răng + đồng hồ) = Cài đặt báo trước; `quaHan` (đồng hồ + chấm than) = Việc quá hạn; `phanTo` (hai văn bản ngược chiều) = Đơn phản tố, yêu cầu độc lập.
- Kích thước bổ sung: 32px trong vòng tròn 44px của `MenuList` (bảng chọn từ đáy).

## 8. Trạng thái tương tác

Mọi thành phần bấm được có đủ trạng thái dưới đây; xem bảng ở nhóm preview "Trạng thái" (`StatesControls`, `StatesFields`, `StatesCards`, `StatesOnBrand`). Ứng dụng chạy trên điện thoại nên không có trạng thái di chuột.

- **Nhấn** (`:active`): thẻ, dòng danh sách, tab, nút biểu tượng trên nền sáng đổi nền `surface-sunken`; ô chọn và nút phân đoạn chưa chọn nền `border`; mục đang chọn (chip, radio) nền `brand-200`; khối đỏ (nút chính, QuickAction đỏ, nút "Nộp đơn" ở BottomNav, nút thêm tệp) nền đặc `brand-900`, bỏ bóng; nút trên nền đỏ nền `brand-900` (nhãn vai trò `brand-950`); liên kết chữ `brand-900` có gạch chân; ServiceTile vòng minh họa nền `brand-tint` viền `brand-200`, chữ `brand-text`.
- **Focus bàn phím** (`:focus-visible`): viền 2px `focus-ring` cách 2px; trên nền đỏ viền 2px `white`. Ô nhập khi focus nền `surface`, viền `focus-ring`.
- **Vô hiệu** (`disabled`): màu đặc, không dùng độ trong suốt. Nền `surface-sunken` (ô nhập, ô chọn: `border`), chữ và biểu tượng `ink-subtle`, bỏ bóng, con trỏ `not-allowed`; minh họa chuyển xám. Ô đánh dấu đã chọn mà vô hiệu: nền `ink-subtle`.
- **Lỗi** (`error`): viền `danger`, nền `danger-tint`, dòng báo lỗi 12px `danger` có biểu tượng cảnh báo dưới thành phần. Có ở `TextField`, `SelectField`, `Checkbox`, `FileUpload`, `FileItem`.
- **Đang tải** (`loading`): `Button` và `FilterCard` hiện vòng quay thay biểu tượng, giữ màu nút; `RecordCard`/`CaseCard` hiện khung xương nền `surface-sunken` nhấp nháy sang `border` (tắt khi người dùng bật giảm chuyển động); `FileItem` có thanh tiến độ.
- **Chỉ đọc** (`readOnly` của `TextField`): nền `surface`, viền nét đứt `border-strong`.
- Thuộc tính mới: `disabled` cho `LinkArrow`, `ServiceCard`, `QuickAction`, `NewsCard`, `ServiceTile`, `SelectField`, `OptionItem`, `SegmentedControl` (cả nhóm hoặc từng lựa chọn), `FileUpload`, mục của `Tabs`; `error` cho `Checkbox`, `FileUpload`; `loading` cho `FilterCard`, `RecordCard`, `CaseCard`.

## 9. Thành phần

`Button`, `LinkArrow`, `TextField`, `SelectField`, `StatusBadge`, `Tabs`, `SectionHeader`, `HomeHeader`, `HeroBanner`, `BannerCarousel`, `QuickAction`, `ServiceTile`, `ServiceCard`, `NewsCard`, `CaseCard`, `RecordCard`, `FormSection`, `OptionItem`, `FilterCard`, `SummaryBar`, `SheetMenu`, `ProcessSteps`, `Timeline`, `AppBar`, `BottomNav`, `ChatFab`, `Icon`, `Illustration`; thêm ngày 30/10/2026 từ màn Đăng nhập và luồng nộp đơn: `Stepper`, `FileUpload`, `FileItem`, `Checkbox`, `SegmentedControl`, `BackLink`, `Tag`, `Notice`, `InfoList`, `ActionBar`, `Dialog`, `Accordion` (namespace `TuPhap`). `TextField` (biểu tượng đầu, nút xóa, hiện mật khẩu, bộ đếm), `Button` (`loading`), `SelectField` (nhãn hiện, bỏ chọn, danh sách xổ xuống), `AppBar` (nút tài khoản) được mở rộng. Ngày 30/10/2026 (lần 2): `Tabs` có 2 kiểu `underline`/`chip` (chọn loại trong form dùng `SegmentedControl`), `ProcessSteps` có 2 kiểu `brand`/`light`, `BottomNav` có mục `primary`, `HomeHeader` có nhãn vai trò, `Accordion` đổi sang thẻ riêng từng nhóm với nút radio; bỏ `Breadcrumb`. Ba màn hình mẫu: `HomeScreen`, `FilingScreen`, `ComplaintScreen`. Đọc README của từng thành phần trước khi dùng. Ngày 30/10/2026 (lần 3), cho bản thiết kế lại app TATC: `TaskList` (Việc cần làm, phương án C), `StatSummary`, `MenuList` (phương án F), `ProfileCard` (phương án A), `MailList` (phương án C), `NotificationList` (phương án F), `CalendarCard` (B + C), `EventCard` (B, nút theo C), `FinanceCard` (phương án E), `CaseProgress` (phương án C), `SearchToolbar` (phương án C), `RatingStars` (phương án B), `EmptyState` (phương án C); `HomeHeader` có nút Lịch (`onCalendar`). `StatSummary` tạm chọn kiểu `brand` (B), vẫn giữ kiểu `plain` (C) đến khi chốt; `SearchToolbar` và `EmptyState` chốt phương án C ngày 30/10/2026, đã bỏ kiểu còn lại. Biểu tượng mới: `filter`, `sort`, `briefcase`, `wallet`, `pen`, `logout`.

### Nền tảng

#### Icon

Bộ biểu tượng nét 24px cho thao tác giao diện.

- Bên dùng cung cấp: `name` (một trong `TuPhap.iconNames`), tùy chọn `label` khi biểu tượng đứng một mình và mang nghĩa.
- Nét 1.8px, đầu tròn, màu `currentColor`. 18px trong nút, 20–22px trong ô nhập, AppBar và BottomNav.
- Dịch vụ, loại đơn, loại tài liệu dùng `Illustration` thay vì icon nét.
- `star` (Đánh dấu; khi đã đánh dấu tô đặc bằng `fill: currentColor`) và `archive` (Lưu trữ) dùng trong `RecordCard`, `CaseCard`.

```ts
export interface IconProps { name: IconName; label?: string; className?: string }
export declare function Icon(props: IconProps): React.ReactElement;
```

#### Illustration

Bộ icon minh họa nhiều màu cho dịch vụ, mỗi icon vẽ đúng nội dung của dịch vụ. Cách vẽ theo app My VN Post; màu trang nghiêm, trung tính, hợp với đỏ chủ đạo.

- Bên dùng cung cấp: `name` (một trong `TuPhap.illustrationNames`), tùy chọn `label` khi icon đứng một mình và mang nghĩa.
- Ánh xạ nội dung: `nopDon` (giấy + bút + dấu đỏ) = Nộp đơn khởi kiện; `traCuuHoSo` (bìa hồ sơ + kính lúp) = Tra cứu hồ sơ; `lichXetXu` (lịch + búa) = Lịch xét xử; `xetXuTrucTuyen` (màn hình + cán cân) = Xét xử trực tuyến; `tongDat` (phong bì + dấu đã nhận) = Văn bản tống đạt; `trichLuc` (hai bản giấy + con dấu) = Trích lục bản sao; `khieuNai` (bóng thoại có dấu chấm than) = Khiếu nại, tố cáo; `lichTiepDan` (người + đồng hồ) = Lịch tiếp dân; `huongDan` (bóng hỏi) = Hướng dẫn; `anPhi` (biên lai + đồng xu đ) = Án phí, lệ phí; `banAn` (sách luật + cán cân) = Bản án, quyết định; `hoTro` (tai nghe) = Tổng đài hỗ trợ; `chungCu` (ảnh + kẹp giấy) = Tài liệu, chứng cứ; `uyQuyen` (giấy có chữ ký + dấu) = Giấy ủy quyền; `cccd` (thẻ căn cước) = Giấy tờ tùy thân; `chat` = Hỗ trợ trực tuyến.
- Khung 48×48, hình khối phẳng, tối đa 4 màu mỗi icon, nhiều màu nhưng trầm: mỗi icon có một màu chủ đạo riêng (đất nung `illo-terracotta` cho Nộp đơn, vàng đất `illo-ochre` cho hồ sơ và án phí, xanh thép `illo-steel` cho tống đạt và giấy tờ, xanh ngọc `illo-teal` cho hướng dẫn, tiếp dân, hỗ trợ, tím mận `illo-plum` cho trích lục và ủy quyền) và luôn có chi tiết đỏ `brand-800`/`brand-700` (con dấu, lịch, bóng thoại). Vật kim loại dùng `ink-muted`; dấu đã nhận dùng `success-dot`; giấy `illo-paper` luôn có viền `illo-paper-stroke`.
- Nhóm màu `illo-*` chỉ dùng trong icon, không dùng cho giao diện. Không dùng vàng sáng hay màu rực.
- Kích thước: 44px trong vòng tròn trắng `illo-circle` viền `border` (lưới chức năng), 40px trong `OptionItem`, 34px trong `SheetMenu` và `ChatFab`.
- Icon minh họa chỉ dùng cho dịch vụ và loại tài liệu. Thao tác giao diện (quay lại, tìm, đóng, mũi tên) vẫn dùng `Icon` nét.
- Bổ sung ngày 30/10/2026 cho các bảng chọn từ đáy: `hanhChinh` (trụ sở) = Khởi kiện hành chính; `yeuCau` (bảng kẹp + dấu xong) = Yêu cầu giải quyết việc dân sự; `phaSan` (cặp + mũi tên đi lên) = Phục hồi, phá sản; `hoaGiai` (hai bên + bóng thoại) = Hòa giải, đối thoại; `banSao` = Cấp bản sao; `saoChup` (máy sao chụp) = Sao chụp tài liệu; `toCao` (loa) = Tố cáo; `lichHen` (lịch + dấu xanh) = Lịch, xác nhận lịch; `doiLich` (lịch + mũi tên đổi) = Thay đổi lịch hẹn; `lichHuy` (lịch + dấu x) = Từ chối tham dự; `doiNguoi` = Thay đổi hòa giải viên; `vangMat` = Báo vắng mặt; `hoan` (đồng hồ cát + tạm dừng) = Đề nghị hoãn; `xemXet` (văn bản + kính lúp) = Xem xét lại; `huongDanSD` (điện thoại + video) = Hướng dẫn sử dụng; `hoiDap` = Câu hỏi thường gặp; `tinTuc` (tờ báo) = Tin tức; `danhGia` (mặt cười + sao) = Đánh giá hài lòng; `nhacViec` (chuông) = Thông báo nhắc việc; `caiDat` (bánh răng + đồng hồ) = Cài đặt báo trước; `quaHan` (đồng hồ + chấm than) = Việc quá hạn; `phanTo` (hai văn bản ngược chiều) = Đơn phản tố, yêu cầu độc lập.
- Kích thước bổ sung: 32px trong vòng tròn 44px của `MenuList` (bảng chọn từ đáy).

```ts
export interface IllustrationProps { name: IllustrationName; label?: string; className?: string }
export declare function Illustration(props: IllustrationProps): React.ReactElement;
```

### Điều hướng

#### Accordion

Danh mục gập/mở có mục chọn được, dùng cho màn "Chọn thủ tục".

- Mỗi nhóm là một thẻ riêng: nền `surface`, viền `border`, bóng `shadow-card`, bo `radius-lg`, các thẻ cách nhau `space-2`. Đầu nhóm cao 52px: tên 16/24 500 `ink`, số đếm ("3 thủ tục") 13px `ink-muted`, mũi tên xoay khi mở.
- Mục trong nhóm là nút radio cao `touch-min`: vòng 20px viền 1.5px `border-strong`; mục đang chọn vòng đặc `brand-800` (lõi trắng), nền `brand-tint`, chữ `brand-text` 500. Một lần chỉ chọn 1 mục trên toàn danh mục.
- Bên dùng cung cấp: `groups` = `[{key, title, meta?, items: [{key, label}]}]`, `value` (mục đang chọn), `onSelect`, tùy chọn `defaultOpen`/`open`, `onToggle`.

```ts
export interface AccordionGroup { key: string; title: string; meta?: string; items: { key: string; label: string }[] }
export interface AccordionProps { groups: AccordionGroup[]; value?: string; onSelect?: (key: string) => void; defaultOpen?: string[]; open?: string[]; onToggle?: (open: string[]) => void }
export declare function Accordion(props: AccordionProps): React.ReactElement;
```

#### AppBar

Thanh tiêu đề: gradient `brand-950` → `brand-800`, đường vàng `court-gold` 2px ở đáy, tên cổng Roboto 700 chữ hoa.

- Bên dùng cung cấp: `title`, tùy chọn `subtitle` (chữ `on-brand-muted`), `logoSrc` (Quốc huy, chỉ trang chủ), `onBack`, `actions` = `[{icon, label, onClick, dot?}]`, `{text, onClick}` (thao tác chữ, chỉ dùng với `plain`) hoặc `{avatar, label, onClick}` (nút tài khoản: chữ viết tắt trên nền `gold-soft`, chữ `brand-950`), tối đa 3.
- `variant="page"`: header đỏ của các màn trên thanh điều hướng (Hồ sơ, Hộp thư, Cá nhân): cùng gradient, tiêu đề `title` căn giữa, phần nội dung `tp-sheet` bo góc `radius-xl` đè lên mép dưới.
- `variant="plain"` (header màn chức năng con, chốt phương án A ngày 30/10/2026): nền `surface`, đường kẻ `border` và `shadow-card` ở đáy, cao 56px. Nút quay lại mũi tên `chevronLeft` 24px màu `ink`; tiêu đề `title` 16/24 700 `ink` căn trái, một dòng, cắt "…" khi dài; thao tác bên phải là chữ `brand-text` 16/24 500 (ví dụ "Lưu nháp") hoặc nút biểu tượng 44px. Nội dung bên dưới bắt đầu ngay trên nền trang, không đè mép. Dùng cho mọi màn con, trừ Trang chủ và các màn trên thanh điều hướng. Luồng nhập nhiều bước đặt "Lưu nháp" ở header; thanh đáy chỉ còn "Quay lại" và "Tiếp theo".
- `label` của mỗi action là bắt buộc. Chấm thông báo: `court-gold` trên nền đỏ, `court-red` trên nền trắng.

```ts
export interface AppBarAction { icon?: IconName; /** Text action shown in brand red on `variant="plain"`, e.g. "Lưu nháp". */ text?: string; label?: string; onClick?: () => void; dot?: boolean; /** Initials for the account button, e.g. "TR". */ avatar?: string }
export interface AppBarProps { title: string; subtitle?: string; variant?: 'brand' | 'plain' | 'page'; logoSrc?: string; onBack?: () => void; actions?: AppBarAction[] }
export declare function AppBar(props: AppBarProps): React.ReactElement;
```

#### BackLink

Liên kết quay lại đặt trên nền đỏ ở đầu màn hình đăng nhập.

- Bên dùng cung cấp: `children` (ví dụ "Về trang chủ"), `href` hoặc `onClick`.
- Chữ `on-brand-muted` Roboto 500 14px, biểu tượng mũi tên trái 18px, vùng chạm cao `touch-min`. Focus: viền 2px `white`. Chỉ đặt trên nền đỏ `brand-*`.

```ts
export declare function BackLink(props: { href?: string; onClick?: () => void; children: React.ReactNode }): React.ReactElement;
```

#### BottomNav

Thanh điều hướng chính cố định ở đáy, 5 mục, mục giữa là nút "Nộp đơn".

- Bên dùng cung cấp: `items` = `[{key, icon, label, primary?, onClick?}]`, `active`, `onChange`.
- Nền `surface`, đường kẻ trên `shadow-nav`. Mục chưa chọn biểu tượng 24px và chữ `ink-subtle`; mục đang chọn chữ và biểu tượng `brand-text`, không có gạch ở mép trên (bỏ ngày 30/10/2026). Nhãn 12px 500.
- Mục có `primary: true` là nút tròn 52px nổi lên trên thanh: gradient `brand-700` → `brand-900`, biểu tượng `on-primary`, bóng `shadow-primary` và vòng 4px màu `surface`; nhãn `brand-text`. Mục này là hành động, không phải trang, nên không có trạng thái đang chọn; bấm gọi `onClick` (nếu không có thì gọi `onChange`).
- Năm mục chuẩn (chốt 30/10/2026): Trang chủ, Hồ sơ, Nộp đơn (`primary`), Hộp thư, Cá nhân. Thông báo mở từ nút chuông, Lịch mở từ nút Lịch trên `HomeHeader`. Bên dùng cộng vùng an toàn của thiết bị.

```ts
export interface BottomNavItem { key: string; icon: IconName; label: string; primary?: boolean; onClick?: () => void }
export interface BottomNavProps { items: BottomNavItem[]; active: string; onChange?: (key: string) => void }
export declare function BottomNav(props: BottomNavProps): React.ReactElement;
```

#### MenuList

Danh sách chức năng kiểu cài đặt, chia nhóm (phương án F): màn Hồ sơ, Cá nhân và các bảng chọn từ đáy.

- Bên dùng cung cấp: `groups` = mảng các nhóm, mỗi nhóm `[{icon?, illustration?, label, description?, count?, danger?, onClick?}]` (hoặc `items` cho một nhóm).
- Mỗi nhóm là một thẻ trắng, các nhóm cách nhau 10px. Dòng cao tối thiểu 52px: biểu tượng nét 22px `ink-muted`, tên 16/24, mô tả (nếu có) 12px `ink-subtle`, số đếm viên `brand-tint`, mũi tên phải. Đường kẻ giữa các dòng thụt vào 52px.
- `danger`: chữ và biểu tượng `danger`, không có mũi tên (dùng cho "Đăng xuất", đặt nhóm riêng cuối cùng).
- Bảng chọn từ đáy (`Dialog variant="sheet"`) dùng `illustration` thay cho `icon`: icon minh họa 32px trong vòng tròn trắng 44px viền `border` (cùng kiểu ô dịch vụ Trang chủ), dòng cao tối thiểu 64px, đường kẻ thụt vào 74px. Màn Hồ sơ, Cá nhân vẫn dùng biểu tượng nét. Duyệt ngày 30/10/2026.

```ts
export declare function MenuList(props: { groups?: MenuItem[][]; items?: MenuItem[] }): React.ReactElement;
```

#### ServiceTile

Ô dịch vụ trong lưới "Dịch vụ khác" trên trang chủ: icon minh họa trong vòng tròn trắng 64px viền `border`, tên dịch vụ tối đa 2 dòng. Đặt trong lưới `tp-tile-grid tp-tile-grid-illo` 4 cột.

- Bên dùng cung cấp: `illustration` (xem `Illustration`), `label`, `onClick`, tùy chọn `count` (số việc mới, nền `court-red`).
- Vẫn nhận `icon` (Icon nét trong ô vuông `brand-tint`) cho danh sách dày đặc, nhưng trang chủ dùng `illustration`.
- Tối đa 8 ô; dịch vụ khác vào "Tất cả".
- `disabled`: chữ `ink-subtle`, vòng nền `surface-sunken`, minh họa chuyển xám. Nhấn: vòng nền `brand-tint` viền `brand-200`, chữ `brand-text`.

```ts
export interface ServiceTileProps { illustration?: IllustrationName; icon?: IconName; label: string; count?: number; onClick?: () => void; disabled?: boolean }
export declare function ServiceTile(props: ServiceTileProps): React.ReactElement;
```

#### SheetMenu

Bottom sheet danh sách lựa chọn có icon minh họa, ví dụ "Chọn loại đơn" khi bấm Nộp đơn.

- Bên dùng cung cấp: `title`, `items` = `[{illustration, label, description?, onClick}]`, tối đa 6 mục.
- Hiển thị trên lớp phủ `scrim`; vuốt xuống hoặc chạm ngoài để đóng.

```ts
export declare function SheetMenu(props: { title?: string; items: SheetMenuItem[] }): React.ReactElement;
```

#### Stepper

Thanh bước của màn hình nhập nhiều bước: chấm số nối đường kẻ, bước đã xong có dấu tích, bước đang làm có vòng đỏ, kèm dòng "Bước n · Tên bước".

- Bên dùng cung cấp: `steps` (tên các bước, theo đúng thứ tự), `current` (bước đang làm, đếm từ 1).
- Bước đã xong: nền `brand-800`, dấu tích `on-primary`. Bước đang làm: nền `brand-tint`, vòng 2px `brand-800`, số `brand-text`. Bước sau: nền `surface`, vòng `border-strong`, số `ink-subtle`. Đường nối 2px: `brand-800` sau bước đã xong, còn lại `border`.
- Dòng dưới: "Bước n" `ink-subtle`, tên bước kiểu `label` màu `ink`. Tên từng bước có trong chữ ẩn cho trình đọc màn hình.
- Đặt trong thẻ đầu màn hình, dưới `Tag` loại đơn và tiêu đề `title-lg`. Đã chọn phương án C ngày 30/10/2026.

```ts
export interface StepperProps { steps: string[]; current: number }
export declare function Stepper(props: StepperProps): React.ReactElement;
```

#### Tabs

Thanh tab có 2 kiểu, đặt bằng `variant`.

- `underline` (mặc định): thanh nền `surface` có đường kẻ dưới `border`, cuộn ngang khi nhãn dài. Tab cao `touch-min`, chữ `ink-muted`; tab đang chọn chữ `brand-text` và gạch dưới 3px `brand-800`. Số đếm là chữ thường `ink-subtle` cạnh nhãn. Dùng để chuyển giữa các phần của một màn.
- `chip`: các viên bo `radius-pill` cao 40px, viền `border`. Viên đang chọn nền `brand-tint`, viền 1.5px `brand-800`, chữ `brand-text`, có dấu tích. Số đếm là viên nhỏ nền `surface-sunken`; trên viên đang chọn đổi sang nền `brand-800` chữ `on-primary`. Dùng để lọc nhanh danh sách (Tất cả / Khiếu nại / Tố cáo).
- Bên dùng cung cấp: `items` = `[{key, label, count?}]`, tùy chọn `variant`, `value` + `onChange` hoặc `defaultValue`, `label` (tên nhóm cho trình đọc màn hình).
- Chọn loại trong form (Dân sự / Hành chính) dùng `SegmentedControl`, không dùng Tabs. Không dùng thay BottomNav.
- Mục có `disabled`: chữ `ink-subtle`, không bấm được (chip nền `surface-sunken`). Nhấn: nền `surface-sunken`; chip đang chọn nền `brand-200`.

```ts
export interface TabItem { key: string; label: string; count?: number; disabled?: boolean }
export interface TabsProps { items: TabItem[]; value?: string; defaultValue?: string; onChange?: (key: string) => void; label?: string; variant?: 'underline' | 'chip' }
export declare function Tabs(props: TabsProps): React.ReactElement;
```

### Nhập liệu

#### Checkbox

Ô đánh dấu có nhãn, dùng cho lựa chọn có/không và lời cam đoan trước khi gửi đơn.

- Bên dùng cung cấp: `label` (hoặc `children`), `checked`/`onChange` hoặc `defaultChecked`, tùy chọn `disabled`, `error`.
- Ô 22px bo 6px, viền 1.5px `border-strong`; đã chọn nền `brand-800`, dấu tích `on-primary`. Nhãn kiểu `body` màu `ink`; cả nhãn bấm được. Focus: viền 2px `focus-ring`.
- `error`: viền ô `danger`, nền `danger-tint`, dòng lỗi `danger` dưới nhãn (gắn `aria-describedby`). `disabled`: ô nền `border`, nhãn `ink-subtle`; đã chọn mà khóa thì ô nền `ink-subtle`. Nhấn: viền ô `brand-800`.

```ts
export declare function Checkbox(props: CheckboxProps): React.ReactElement;
```

#### FileItem

Một tệp trong danh sách tài liệu kèm theo, có ba trạng thái: đã tải, đang tải, lỗi.

- Bên dùng cung cấp: `name`, tùy chọn `meta` (dung lượng, loại, ngày), `status` (`done` mặc định, `uploading`, `error`), `progress` (0–100), `error` (câu lỗi), `onRemove`.
- Ô loại tệp lấy đuôi tên tệp (PDF, JPG…) trên nền `brand-tint`. Đang tải: thanh tiến độ `brand-800` trên `surface-sunken`. Lỗi: nền `danger-tint`, viền `danger`, dòng lỗi có biểu tượng cảnh báo.
- Nút xóa luôn có `aria-label` "Xóa <tên tệp>". Thường dùng qua `FileUpload`.

```ts
export interface FileItemProps { name: string; meta?: string; status?: 'done' | 'uploading' | 'error'; progress?: number; error?: string; onRemove?: () => void }
export declare function FileItem(props: FileItemProps): React.ReactElement;
```

#### FileUpload

Vùng thêm tài liệu kèm theo: khi chưa có tệp là khối nét đứt gộp ghi chú định dạng, nút tải lên và nút lấy từ kho dữ liệu; khi đã có tệp là danh sách `FileItem` cùng hàng tải thêm.

- Bên dùng cung cấp: `hint` (ghi chú định dạng), `onPick(files)`, tùy chọn `onLibrary` (mở hộp "Chọn tệp từ kho dữ liệu cá nhân"), `files`, `max` (mặc định 10), `accept`, `title`, `shortHint`, `uploadLabel`, `libraryLabel`.
- Chưa có tệp (phương án B, chọn ngày 30/10/2026): viền nét đứt 1.5px `border-strong`, vòng biểu tượng `brand-tint` + `icon-accent`, ghi chú `caption` màu `ink-subtle`, nút `primary` "Tải lên tài liệu bổ sung", nút `ghost` "Lấy từ kho dữ liệu cá nhân".
- Đã có tệp: dòng đếm "n / 10 tệp", danh sách `FileItem`, hàng tải thêm có nút + nền `brand-800`. Đủ `max` tệp: hàng tải thêm khóa, ghi "tối đa 10 tệp".
- Chữ dung lượng tệp, chữ đang tải và câu lỗi tệp quá lớn hệ thống chưa có: preview để trong ngoặc vuông, chờ cung cấp.
- `error`: khối nét đứt viền `danger`, nền `danger-tint`, dòng lỗi `danger` có biểu tượng cảnh báo ở cuối. `disabled`: nền `surface-sunken`, viền `border`, nút tải lên và nút kho dữ liệu khóa; khi đã có tệp thì hàng tải thêm khóa như lúc đủ `max`.

```ts
export interface FileUploadProps { hint?: string; shortHint?: string; title?: string; files?: FileItemProps[]; max?: number; accept?: string; multiple?: boolean; uploadLabel?: string; libraryLabel?: string; onPick?: (files: File[]) => void; onLibrary?: () => void; disabled?: boolean; error?: string }
export declare function FileUpload(props: FileUploadProps): React.ReactElement;
```

#### FilterCard

Thẻ bộ lọc tra cứu đè lên header trang: ô tìm kiếm, các ô chọn (khoảng ngày, trạng thái) và nút Tra cứu.

- Bên dùng cung cấp: `placeholder`, `children` (các `SelectField`), `onSubmit`, tùy chọn `submitLabel`.
- Đặt ngay dưới `AppBar variant="page"`, kéo lên `-26px` để đè mép header.
- `loading`: nút Tra cứu hiện vòng xoay, không bấm lại được.

```ts
export interface FilterCardProps { placeholder?: string; submitLabel?: string; onSubmit?: () => void; children?: React.ReactNode; loading?: boolean }
export declare function FilterCard(props: FilterCardProps): React.ReactElement;
```

#### FormSection

Khối form gập/mở theo app VN Post: mỗi bước nhập là một thẻ, có nhãn trạng thái "Đã nhập" / "Chưa nhập" (chữ thường) và mũi tên.

- Bên dùng cung cấp: `title`, `status` (`done` | `todo`), `children` (các trường), tùy chọn `defaultOpen` hoặc `open` + `onToggle`.
- Mỗi lúc chỉ mở một khối. Khi khối đủ thông tin thì tự gập lại và chuyển `status` sang `done`.
- Thứ tự cho đơn khởi kiện: Người khởi kiện → Người bị kiện → Nội dung khởi kiện → Tài liệu kèm theo.

```ts
export interface FormSectionProps { title: string; status?: 'done' | 'todo'; defaultOpen?: boolean; open?: boolean; onToggle?: (open: boolean) => void; children?: React.ReactNode }
export declare function FormSection(props: FormSectionProps): React.ReactElement;
```

#### OptionItem

Dòng lựa chọn có icon minh họa, tiêu đề, mô tả và ô tích, như "Dịch vụ cộng thêm" của app VN Post. Dùng cho tài liệu kèm theo, dịch vụ cộng thêm.

- Bên dùng cung cấp: `illustration`, `title`, `meta` (yêu cầu, định dạng hoặc phí), `checked`, `onChange`, tùy chọn `onInfo` (mở giải thích).
- Ô icon bên trái nền `surface-sunken`. Khi được chọn: viền `brand-text` 2px; ô tích màu `brand-800`.
- `disabled`: nền `surface-sunken`, chữ `ink-subtle`, minh họa chuyển xám, ô tích khóa. Nhấn: nền `surface-sunken`.

```ts
export interface OptionItemProps { illustration: IllustrationName; title: string; meta?: string; checked?: boolean; onChange?: (checked: boolean) => void; onInfo?: () => void; disabled?: boolean }
export declare function OptionItem(props: OptionItemProps): React.ReactElement;
```

#### RatingStars

Chọn mức độ hài lòng 1–5 (phương án B, ngôi sao).

- 5 nút 48px, sao 34px. Đã chọn: tô `court-gold`, viền `warning-dot`; chưa chọn: viền `border-strong`. Đây là vai trò thứ 5 của màu vàng, được duyệt ngày 30/10/2026.
- Bên dùng cung cấp: `value`, `onChange`, tùy chọn `label`, `required`, `max`.

```ts
export declare function RatingStars(props: { value?: number; max?: number; label?: string; required?: boolean; onChange?: (v: number) => void }): React.ReactElement;
```

#### SearchToolbar

Ô tìm kiếm kèm lọc và sắp xếp ở đầu danh sách (phương án C, chốt 30/10/2026).

- Ô tìm cả chiều ngang, cùng kiểu ô điền `TextField` (cao 46px). Dưới là hàng chip: "Lọc · n" (nền `brand-tint`, viền `brand-800` khi có bộ lọc đang bật) và chip thứ tự đang dùng (`sortLabel`, ví dụ "Mới nhất"). Chip cao 36px.
- Dòng đếm kết quả `count` 12/16 `ink-muted` ở dưới cùng.
- Đặt cả thanh trong khối trắng bộ lọc ở đầu danh sách.
- Bên dùng cung cấp: `placeholder`, tùy chọn `defaultValue`, `count`, `filterCount`, `sortLabel`, `onFilter`, `onSort`.

```ts
export interface SearchToolbarProps { placeholder: string; defaultValue?: string; count?: string; filterCount?: number; sortLabel?: string; onFilter?: () => void; onSort?: (() => void) | false }
export declare function SearchToolbar(props: SearchToolbarProps): React.ReactElement;
```

#### SegmentedControl

Nút chuyển giữa hai hoặc ba lựa chọn loại trừ nhau, đổi bộ trường nhập bên dưới.

- Bên dùng cung cấp: `options` = `[{value, label}]`, `value`/`onChange` hoặc `defaultValue`, `label` (tên nhóm cho trình đọc màn hình).
- Nền `surface-sunken` bo `radius-md`; mục đang chọn nền `surface`, chữ `brand-text`, viền `border` và bóng `shadow-card`; mục khác chữ `ink-muted`. Cao 40px trong khung 48px.
- `disabled` (cả nhóm) hoặc `disabled` trong từng lựa chọn: chữ `ink-subtle`; cả nhóm khóa thì mục đang chọn nền `border`, bỏ bóng. Nhấn mục chưa chọn: nền `border`.

```ts
export interface SegmentedOption { value: string; label: string; disabled?: boolean }
export interface SegmentedControlProps { options: SegmentedOption[]; value?: string; defaultValue?: string; onChange?: (value: string) => void; label?: string; disabled?: boolean }
export declare function SegmentedControl(props: SegmentedControlProps): React.ReactElement;
```

#### SelectField

Ô chọn dạng nút mở danh sách (bottom sheet hoặc danh sách xổ xuống), có mũi tên xuống.

- Bên dùng cung cấp: `placeholder` hoặc `value`, tùy chọn `required`, `icon` (ví dụ `calendar` cho khoảng ngày), `onClick` (mở `SheetMenu`, bộ chọn ngày hoặc danh sách), `label`.
- `labelVisible`: hiện `label` phía trên như `TextField` (dùng trong form nhiều trường). `onClear`: hiện nút bỏ chọn khi đã có giá trị. `open` + `options` + `onSelect`: danh sách xổ xuống ngay dưới ô, mục đang chọn chữ `brand-text` có dấu tích.
- Cùng kiểu ô điền với `TextField`: nền `surface-sunken`, viền `border`, cao 46px, bo `radius-md`; mũi tên và placeholder `ink-subtle`, biểu tượng đầu `icon-accent`. Khi mở: nền `surface`, viền 2px `focus-ring`.
- `error`: viền `danger`, nền `danger-tint`, dòng lỗi dưới ô (khi `labelVisible`). `disabled`: nền `border`, chữ và biểu tượng `ink-subtle`, ẩn nút bỏ chọn, không mở danh sách. Nhấn: nền `border`.

```ts
export interface SelectFieldProps { placeholder?: string; value?: string; required?: boolean; icon?: IconName; label?: string; onClick?: () => void; labelVisible?: boolean; onClear?: () => void; open?: boolean; options?: (string | { label: string; value?: string })[]; onSelect?: (option: string | { label: string; value?: string }) => void; error?: string; disabled?: boolean }
export declare function SelectField(props: SelectFieldProps): React.ReactElement;
```

#### TextField

Ô nhập có nhãn, chú thích và lỗi cho các form nộp đơn, khiếu nại, đăng nhập.

- Bên dùng cung cấp: `label` (bắt buộc, luôn hiển thị), `value`/`onChange` hoặc `defaultValue`, tùy chọn `help`, `error`, `required`, `multiline`, `icon` (biểu tượng đầu ô, ví dụ `idCard`, `lock`), `onClear` (hiện nút xóa khi có nội dung), `type="password"` (tự có nút hiện/ẩn mật khẩu; tắt bằng `revealable={false}`), `showCount` cùng `maxLength`/`minLength` (bộ đếm "204 / tối thiểu 50 ký tự" và "204 / 2000").
- Kiểu ô điền: nền `surface-sunken`, viền `border`, cao 46px (một dòng); nhiều dòng cao theo nội dung, bo `radius-md`, placeholder `ink-subtle`. Khi focus: nền `surface`, viền 2px `focus-ring`. Biểu tượng đầu, nút xóa, nút mắt màu `ink-subtle`; nút xóa và nút mắt có vùng chạm 48px và `aria-label`.
- Lỗi: viền `danger`, nền `danger-tint`, dòng lỗi màu `danger` có biểu tượng cảnh báo; viết lỗi nói rõ cách sửa ("Vui lòng nhập mật khẩu.").
- Dấu * bắt buộc màu `court-red`.
- `disabled`: nền `border`, chữ, nhãn và biểu tượng `ink-subtle`, ẩn nút xóa. `readOnly`: nền `surface`, viền nét đứt `border-strong`, ẩn nút xóa. Xem bảng `StatesFields`.

```ts
export declare function TextField(props: TextFieldProps): React.ReactElement;
```

### Danh sách

#### MailList

Danh sách văn bản trong Hộp thư tống đạt (phương án C, dòng kiểu hộp thư).

- Một thẻ chung, mỗi văn bản một dòng: chấm đỏ `court-red` bên trái khi chưa đọc; dòng đầu là Tòa án gửi (đậm khi chưa đọc) và thời gian; tiêu đề 16/24 tối đa 2 dòng (500 khi chưa đọc); dòng "Hạn xử lý … · Còn n ngày" màu theo `tone` (`warning` sắp hết hạn, `danger` quá hạn).
- Nút sao bên phải (40px) để đánh dấu Quan trọng; đã đánh dấu thì sao tô đặc `brand-text`. Chạm phần còn lại của dòng để mở văn bản.
- Bên dùng cung cấp: `items` = `[{from, time, title, deadline?, remain?, tone?, unread?, starred?, onClick?, onStar?}]`.

```ts
export declare function MailList(props: { items: MailItemData[] }): React.ReactElement;
```

#### NotificationList

Danh sách thông báo trong Trung tâm thông báo (phương án F: cùng kiểu dòng với `MailList`). Sửa ngày 30/10/2026: hệ thống không phân loại thông báo, nên bỏ nhãn nhóm và biểu tượng màu.

- Vòng biểu tượng 32px trung tính, nền `surface-sunken`, biểu tượng `ink-muted`; mặc định biểu tượng chuông, mọi thông báo dùng chung.
- Chưa đọc: chấm `court-red` 10px ở góc trên phải vòng biểu tượng (viền trắng 2px) và tiêu đề đậm 500. Đã đọc: không chấm, tiêu đề 400.
- Dòng đầu: tiêu đề 16/24 và giờ bên phải; dưới là mô tả 1 dòng và mã hồ sơ. Nhóm theo ngày bằng nhãn `overline` "HÔM NAY", "HÔM QUA" đặt ngoài thẻ.
- Không có số đếm, không có nút "Xem thông báo cũ hơn": cuộn đến cuối danh sách thì tự tải thêm, hiện vòng xoay ở cuối trong lúc tải.
- `group` (tùy chọn) chỉ dùng khi hệ thống có phân loại; mặc định không truyền.
- Bên dùng cung cấp: `items` = `[{icon?, group?, time, title, description?, code?, unread?, onClick?}]`.

```ts
export declare function NotificationList(props: { items: NotificationData[] }): React.ReactElement;
```

#### TaskList

Khối "Việc cần làm" trên Trang chủ (phương án C, chọn 30/10/2026).

- Bên dùng cung cấp: `items` = `[{day, month, title, code?, remain?, status?, tone?, onClick?}]`. Bộ lọc phía trên dùng `Tabs variant="chip"`.
- Một thẻ chung, các việc ngăn bằng đường kẻ. Bên trái là khối ngày hạn 48px (ngày 20/24 700, tháng 10px, tháng "T10"): nền `surface-sunken`; `tone="warning"` nền `warning-tint` số `warning`; `tone="danger"` nền `danger-tint`.
- Giữa: tiêu đề 16/24 500, mã hồ sơ 12px `ink-subtle`, dòng "Còn n ngày · trạng thái" 12px 500 có biểu tượng đồng hồ, màu theo `tone`. Mũi tên phải `ink-subtle`. Cả dòng bấm được.

```ts
export declare function TaskList(props: { items: TaskItemData[] }): React.ReactElement;
```

### Thẻ

#### CaseCard

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

```ts
export interface CaseCardProps {
  caseNo: string; title: string; codeLabel?: string; kind?: string;
  status?: string; statusTone?: StatusBadgeProps['tone'];
  court?: string; meta?: string[]; date?: string; starred?: boolean; onStar?: () => void; onArchive?: () => void; onClick?: () => void; loading?: boolean; children?: React.ReactNode;
}
export declare function CaseCard(props: CaseCardProps): React.ReactElement;
```

#### EventCard

Thẻ sự kiện lịch: phiên tòa, phiên họp, phiên hòa giải, phiên đối thoại, tiếp công dân (bố cục B, nút theo C).

- Khối ngày 52px nền `brand-tint` chữ `brand-text` bên trái; loại sự kiện 12px 500 `brand-text`; tên 16/24 500; các dòng có biểu tượng (giờ, địa điểm, mã hồ sơ, Tòa án) 13px `ink-muted`; nhãn trạng thái xác nhận.
- Nút dưới nội dung, cỡ `sm`: hành động chính `primary` (Xác nhận / báo vắng, Vào phòng chờ), hành động phụ `secondary` (Xem giấy triệu tập).
- Bên dùng cung cấp: `day`, `month`, `kind`, `title`, `lines` = `[{icon, text}]`, `status`, `statusTone`, `actions` = `[{label, primary?, icon?, onClick?}]`.

```ts
export interface EventCardProps { day: string; month: string; kind?: string; title: string; lines?: { icon: IconName; text: string }[]; status?: string; statusTone?: Tone; actions?: { label: string; primary?: boolean; icon?: IconName; onClick?: () => void }[] }
export declare function EventCard(props: EventCardProps): React.ReactElement;
```

#### FinanceCard

Thẻ khoản phải nộp trong Nghĩa vụ tài chính (phương án E, kiểu biên lai; phần hạn nộp đã sửa theo góp ý ngày 30/10/2026).

- Phần trên: loại khoản 12px 500 `brand-text` và nhãn trạng thái; số tiền 24/32 700 `brand-text`; tên khoản 16/24 500.
- Đường xé nét đứt `border` 2px có 2 khuyết tròn màu nền trang.
- Phần dưới: bên trái mã thông báo, mã hồ sơ, Tòa án (12px `ink-subtle`); bên phải ô hạn nộp gộp "Hạn nộp / ngày / Còn n ngày": nền `surface-sunken`, `tone="warning"` (còn ≤ 3 ngày) nền `warning-tint` chữ `warning`, `tone="danger"` (quá hạn) nền `danger-tint`.
- Chạm cả thẻ để mở chi tiết. Bên dùng cung cấp: `kind`, `amount`, `title`, `code`, `caseCode`, `court`, `status`, `statusTone`, `deadline`, `remain`, `tone`, `deadlineLabel?` (ví dụ "Ngày xác nhận" cho khoản đã nộp), `onClick`.

```ts
export interface FinanceCardProps { kind: string; amount: string; title: string; code?: string; caseCode?: string; court?: string; status?: string; statusTone?: Tone; deadlineLabel?: string; deadline?: string; remain?: string; tone?: Tone; onClick?: () => void }
export declare function FinanceCard(props: FinanceCardProps): React.ReactElement;
```

#### InfoList

Danh sách nhãn – giá trị chỉ đọc: thông tin người gửi lấy từ tài khoản, bảng xem lại trước khi gửi, kết quả gửi đơn.

- Bên dùng cung cấp: `items` = `[{label, value, mono?}]`, `variant`.
- `box`: nền `surface-sunken`, nhãn `caption` `ink-subtle`, giá trị đậm 500 (thông tin chỉ đọc). `rows`: các dòng ngăn bằng `border` (màn Xem lại). `kv`: nhãn trái, giá trị phải (màn kết quả).
- `mono` cho mã hồ sơ, số định danh: số cùng độ rộng (`tp-num`).

```ts
export interface InfoItem { label: string; value: React.ReactNode; mono?: boolean }
export interface InfoListProps { items: InfoItem[]; variant?: 'box' | 'rows' | 'kv' }
export declare function InfoList(props: InfoListProps): React.ReactElement;
```

#### NewsCard

Thẻ tin tức, thông báo dạng ảnh vuông, đặt 2 cột.

- Bên dùng cung cấp: `imageSrc`, `title` (tối đa 2 dòng), tùy chọn `date`, `tag` ("Mới": huy hiệu nền `court-red`, chữ `white`), `onClick`.
- Ảnh do Tòa án cung cấp; không chèn chữ quan trọng lên ảnh.
- `disabled`: chữ `ink-subtle`, ảnh chuyển xám. Nhấn: tiêu đề `brand-text`, ảnh có viền trong 3px `brand-200`.

```ts
export interface NewsCardProps { imageSrc?: string; title: string; date?: string; tag?: string; onClick?: () => void; disabled?: boolean }
export declare function NewsCard(props: NewsCardProps): React.ReactElement;
```

#### RecordCard

Thẻ một hồ sơ hoặc văn bản trong danh sách (đơn khiếu nại, kiến nghị; văn bản tống đạt).

- Bên dùng cung cấp: tùy chọn `kind`, `title`, `code` + `codeLabel` (mặc định "Mã hồ sơ"), `court`, `meta` (mảng chuỗi, ví dụ "Người ký: …"), `date` (gồm cả nhãn, ví dụ "Ngày ký: 28-10-2026"), `status` + `statusTone`, `caseRef` = `{code, title, label?}`, `starred` + `onStar`, `onArchive`, `onClick`, `loading`.
- Giao diện chung với `CaseCard` (phương án D gọn; nhãn loại kiểu chữ đỏ nhỏ của bản trước): thẻ nền `surface`, viền `border`, bóng `shadow-card`, bo `radius-lg`, đệm 14px 16px.
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

```ts
export interface CaseRef { code: string; title?: string; /** Default "Vụ án". */ label?: string }
export interface RecordCardProps { code?: string; codeLabel?: string; kind?: string; title?: string; court?: string; /** Extra info between court and date, e.g. "Người ký: …". */ meta?: string[]; date?: string; status?: string; statusTone?: StatusBadgeProps['tone']; caseRef?: CaseRef; starred?: boolean; onStar?: () => void; onArchive?: () => void; onClick?: () => void; loading?: boolean; /** Extra content under the status, e.g. CaseProgress. */ children?: React.ReactNode }
export declare function RecordCard(props: RecordCardProps): React.ReactElement;
```

#### ServiceCard

Thẻ dịch vụ: nền trắng, dải trên 3px `brand-800`, ô biểu tượng, tiêu đề, mô tả, liên kết "Xem hướng dẫn".

- Bên dùng cung cấp: `icon`, `title`, `description` (một câu), `onClick`, tùy chọn `linkLabel`.
- Dùng trong màn hình "Tất cả dịch vụ" và kết quả tìm kiếm dịch vụ; xếp dọc, cách nhau `space-3`.
- `disabled`: nền `surface-sunken`, dải trên `border-strong`, chữ `ink-subtle`, bỏ bóng. Nhấn: nền `surface-sunken`.

```ts
export interface ServiceCardProps { icon: IconName; title: string; description?: string; linkLabel?: string; onClick?: () => void; disabled?: boolean }
export declare function ServiceCard(props: ServiceCardProps): React.ReactElement;
```

### Phản hồi

#### EmptyState

Trạng thái chưa có dữ liệu (phương án C, chốt 30/10/2026): khung nét đứt một hàng.

- Khung viền nét đứt 1.5px `border-strong`, bo `radius-md`, nền `surface`, đệm 14px. Ô biểu tượng 40px nền `brand-tint`, biểu tượng `icon-accent`; câu thông báo 14/20 500 `ink`.
- Nếu có `actionLabel`: nút `secondary` cỡ nhỏ (36px) ở hàng dưới, căn phải.
- Dùng cho mọi chỗ trống: trong khối trắng, trong form, trong trang xem tệp.
- Bên dùng cung cấp: `text` (hoặc `children`), tùy chọn `icon`, `actionLabel`, `actionIcon`, `onAction`.

```ts
export interface EmptyStateProps { icon?: IconName; text?: string; children?: React.ReactNode; actionLabel?: string; actionIcon?: IconName; onAction?: () => void }
export declare function EmptyState(props: EmptyStateProps): React.ReactElement;
```

### Trạng thái

#### Notice

Khối lưu ý ngắn trong form, nhắc quy định trước khi người dùng nhập.

- Bên dùng cung cấp: `children` (một hoặc hai câu), tùy chọn `icon` (mặc định `info`).
- Nền `surface-sunken` bo `radius-md`, chữ `body-sm` màu `ink-muted`, biểu tượng `ink-subtle`. Không dùng cho lỗi (lỗi đi theo trường nhập).

```ts
export declare function Notice(props: { icon?: IconName; role?: string; children: React.ReactNode }): React.ReactElement;
```

#### StatesCards

Bảng trạng thái của thẻ và dòng danh sách: mặc định, nhấn, focus, đang tải (khung xương), vô hiệu, đã chọn.

#### StatesControls

Bảng trạng thái của nút, liên kết, tab, nút phân đoạn và ô đánh dấu: mặc định, nhấn, focus, đã chọn, lỗi, đang tải, vô hiệu.

#### StatesFields

Bảng trạng thái của ô nhập, ô chọn và vùng tải tệp: mặc định, focus, đã nhập, lỗi, chỉ đọc, vô hiệu.

#### StatesOnBrand

Bảng trạng thái của nút đặt trên nền đỏ (AppBar, HomeHeader, BackLink): nhấn nền `brand-900` (nhãn vai trò `brand-950`), focus viền trắng.

#### StatusBadge

Nhãn trạng thái theo bộ màu 4 lớp: chữ, nền `*-tint`, viền `*-border`, chấm `*-dot`.

- Bên dùng cung cấp: `children` (tên trạng thái), `tone`, tùy chọn `icon` (thay chấm bằng biểu tượng) hoặc `icon={false}` (bỏ chấm), `variant`.
- Ánh xạ: `success` = Đã thụ lý, Đã tống đạt, Hoàn thành; `info` = Đang xử lý, Đã tiếp nhận (bộ xám trung tính); `warning` = Chờ xử lý, Chờ bổ sung, Sắp đến hạn; `danger` = Trả lại đơn, Quá hạn; `neutral` = Nháp, Chưa nhập, Đã hủy; `brand` = Mới (huy hiệu nền `court-red`, chữ `white`).
- `variant="outline"`: chữ thường 12/16 500, bo 6px; dùng trong `FormSection` ("Đã nhập" / "Chưa nhập"). Nhãn trạng thái luôn viết chữ thường.
- Không phân biệt trạng thái chỉ bằng màu: chữ trạng thái là bắt buộc.

```ts
export interface StatusBadgeProps { variant?: 'fill' | 'outline'; tone?: 'success' | 'info' | 'warning' | 'danger' | 'neutral' | 'brand'; icon?: IconName | false; children: React.ReactNode }
export declare function StatusBadge(props: StatusBadgeProps): React.ReactElement;
```

#### Tag

Nhãn loại đơn hoặc loại thủ tục, đặt trên tiêu đề màn hình.

- Bên dùng cung cấp: `children` (tên loại, ví dụ "Kiến nghị, phản ánh").
- Viên bo `radius-pill`, nền `brand-tint`, viền `brand-200`, chữ `brand-text` 12px đậm 500. Không dùng để báo trạng thái xử lý (dùng `StatusBadge`).

```ts
export declare function Tag(props: { children: React.ReactNode }): React.ReactElement;
```

### Hành động

#### ActionBar

Thanh nút cố định ở đáy màn hình nhập nhiều bước.

- Bên dùng cung cấp: `children` là 1–3 `Button`, chia đều chiều ngang; nút chính đặt cuối (phải).
- Nền `surface`, đường kẻ trên `shadow-nav`, lề `space-3` `space-4` `space-4`. Bước đầu: "Hủy" + "Tiếp tục"; bước giữa: "Quay lại" + "Tiếp tục"; bước cuối: "Quay lại" + "Lưu nháp" + "Gửi đơn".

```ts
export declare function ActionBar(props: { children: React.ReactNode }): React.ReactElement;
```

#### Button

Nút bấm. Nút chính màu đỏ chủ đạo: gradient `brand-700` → `brand-900`, chữ trắng `on-primary`, Roboto 500.

- Bên dùng cung cấp: `children` (động từ + đối tượng: "Gửi đơn", "Tra cứu", "Nộp đơn ngay"), `onClick`, tùy chọn `icon`, `block`, `size`, `disabled`.
- `variant`:
  - `primary`: gradient đỏ, bóng `shadow-primary`; nhấn đổi sang `primary-pressed`. Một nút `primary` mỗi màn hình.
  - `secondary`: nền `surface`, viền và chữ `brand-text`. Cho hành động phụ cạnh nút chính ("Xem tất cả").
  - `tonal`: nền `surface-sunken`, viền `border`, chữ `ink`. Cho "Lưu nháp", "Hủy bỏ".
  - `ghost`: chỉ chữ `brand-text`. Cho hành động nhẹ trong thẻ ("Tải tài liệu").
  - `light`: nền `white`, chữ `brand-800`. Nút chính khi đặt trên nền đỏ (banner chào: "Đăng nhập bằng VNeID").
  - `outline-light`: chỉ đặt trên nền đỏ: nền trong, viền và chữ `white`.
  - `gold`: nền `gold-banner`, chữ `on-gold`. Chỉ dùng cho nút trên banner trang chủ (`BannerCarousel`); không dùng ở nơi khác để hạn chế màu vàng.
- Cao `button-height` (46px), bo `radius-md`. `size="sm"` cao 36px, bo `radius-sm`, chỉ dùng cho thao tác trong dòng, trong thẻ.
- Không đặt nút `primary` đỏ trên nền đỏ; trên nền đỏ dùng `light` hoặc `outline-light`.
- `loading`: thay biểu tượng bằng vòng xoay, đổi chữ theo thao tác ("Đang đăng nhập…"), giữ màu nút, `aria-busy="true"`, không bấm lại được.
- `disabled`: nền `surface-sunken`, viền `border`, chữ `ink-subtle`, bỏ bóng. Nhấn: `primary` nền `primary-pressed`; `secondary`, `ghost`, `light` nền `brand-tint`; `tonal` nền `border`. Xem bảng `StatesControls`.

```ts
export declare function Button(props: ButtonProps): React.ReactElement;
```

#### ChatFab

Nút nổi Hỗ trợ trực tuyến ở góc phải dưới, icon minh họa hai bóng thoại.

- Bên dùng cung cấp: `onClick`, tùy chọn `label`, `style` (vị trí).
- Cách mép phải `space-4`, cách BottomNav hoặc SummaryBar `space-5`. Không che nút hành động.

```ts
export declare function ChatFab(props: { label?: string; onClick?: () => void; style?: React.CSSProperties }): React.ReactElement;
```

#### LinkArrow

Liên kết hành động có mũi tên, ví dụ "Xem hướng dẫn →", "Tất cả →".

- Bên dùng cung cấp: `children`, `href` hoặc `onClick`.
- Chữ `label` (14px 500), màu `brand-text`. Đặt ở chân thẻ hoặc cạnh tiêu đề phần.
- `disabled`: chữ `ink-subtle`, không bấm được. Nhấn: chữ `brand-900` có gạch chân.

```ts
export interface LinkArrowProps { href?: string; onClick?: () => void; disabled?: boolean; children: React.ReactNode }
export declare function LinkArrow(props: LinkArrowProps): React.ReactElement;
```

#### QuickAction

Thẻ hành động nhanh trên trang chủ: hai thẻ lớn 2 cột, bên dưới là hàng thẻ nhỏ.

- Bên dùng cung cấp: `icon` (Icon nét), `title`, tùy chọn `subtitle` (chỉ khi `size="lg"`), `tone` (`red` | `plain`), `size` (`lg` | `md`), `onClick`.
- `red`: nền gradient `brand-700` → `brand-900`, chữ `on-brand`, phụ đề `on-brand-muted`, vòng icon `white` với biểu tượng `brand-800`, bóng `shadow-primary`. Chỉ dùng cho hành động quan trọng nhất: "Nộp đơn khởi kiện".
- `plain` (mặc định): nền `surface` viền `border`, vòng icon gradient đỏ với biểu tượng trắng, bóng `shadow-glow-red`. Dùng cho "Hồ sơ của tôi" và các thẻ nhỏ `size="md"` (Liên kết VNeID, Lịch của tôi).
- Bố trí trong `tp-qa-grid` (2 cột, cách `space-3`).
- `disabled`: nền `surface-sunken`, chữ `ink-subtle`, vòng icon nền `border`, bỏ bóng. Nhấn: `plain` nền `surface-sunken`; `red` nền đặc `brand-900`, bỏ bóng.

```ts
export interface QuickActionProps { icon: IconName; title: string; subtitle?: string; tone?: 'red' | 'plain'; size?: 'lg' | 'md'; onClick?: () => void; disabled?: boolean }
export declare function QuickAction(props: QuickActionProps): React.ReactElement;
```

#### SummaryBar

Thanh cố định ở đáy màn hình form: dòng "XEM THÔNG TIN ÁN PHÍ" gập/mở, tổng tiền, hai nút Lưu nháp / Gửi đơn.

- Bên dùng cung cấp: `total`, `rows` = `[{label, value}]`, `primaryLabel`, `primaryDisabled`, `onPrimary`, tùy chọn `secondaryLabel`, `onSecondary`, `title`, `defaultOpen`.
- Nút chính bị vô hiệu cho đến khi mọi `FormSection` bắt buộc đã `done`.
- Nút phụ dùng biến thể `tonal` (nền `surface-sunken`).

```ts
export interface SummaryBarProps { title?: string; total?: string; rows?: { label: string; value: string }[]; primaryLabel?: string; primaryDisabled?: boolean; onPrimary?: () => void; secondaryLabel?: string; onSecondary?: () => void; defaultOpen?: boolean }
export declare function SummaryBar(props: SummaryBarProps): React.ReactElement;
```

### Bố cục

#### BannerCarousel

Băng chuyền banner trang chủ, vuốt ngang: nền gradient `brand-800` → `brand-banner`, ảnh mờ dần ở nửa phải, nút vàng, chấm trang.

- Bên dùng cung cấp: `slides` = `[{title, eyebrow?, description?, imageSrc?, cta?, onClick?}]`, 2–5 slide.
- `cta` hiện thành `Button variant="gold" size="sm"` (`gold-banner`), ví dụ "Nộp đơn ngay". Đây là chỗ duy nhất dùng nút vàng. Nhãn `eyebrow` màu `court-gold`, mô tả `on-brand-muted`.
- Tỉ lệ 343:168, bo `radius-lg`. Chấm trang màu `white`: chấm đang xem kéo dài 18px, các chấm khác 6px.
- Chỉ dùng cho thông báo, tính năng mới; không đặt thông tin bắt buộc người dân phải đọc vào banner.

```ts
export declare function BannerCarousel(props: { slides: BannerSlide[] }): React.ReactElement;
```

#### Dialog

Hộp thoại phủ màn hình: bottom sheet cho danh sách chọn, hộp giữa màn hình cho một thao tác ngắn như ký số.

- Bên dùng cung cấp: `title`, `children`, `onClose`, tùy chọn `variant` (`sheet` mặc định, `center`), `description`, `footer` (các `Button`), `open`.
- Lớp phủ `scrim`; hộp nền `surface`, bóng `shadow-float`; `sheet` bo `radius-xl` mép trên, `center` bo `radius-lg`. Nút đóng có `aria-label` "Đóng". `inline` đặt hộp trong khung cha (dùng cho preview, màn hình mẫu).

#### HeroBanner

Banner màn hình chào: ảnh trụ sở Tòa án, lớp phủ đỏ (`brand-banner` → `brand-950`), góc khung `white`, tiêu đề `display` màu `on-brand` chữ hoa.

- Bên dùng cung cấp: `title` (ngắn, tự viết hoa: "Tòa án điện tử"), `description` (chữ `on-brand-muted`), `actions` (một `Button variant="light"` + một `Button variant="outline-light"`), tùy chọn `imageSrc` (`assets/Images/hero-toa-an-dien-tu.png`), `note`, `stats` = `[{value, label}]` tối đa 3.
- Khung số liệu nền đặc `brand-900`, viền và vạch chia `brand-700`; số `on-brand`, nhãn `on-brand-muted`.
- Chỉ một banner, ở màn hình chào khi chưa đăng nhập. Sau đăng nhập dùng `HomeHeader` + `BannerCarousel`.
- Chữ luôn nằm trên lớp phủ đỏ; không đặt chữ lên vùng sáng của ảnh.

```ts
export interface HeroStat { value: string; label: string }
export interface HeroBannerProps { title: string; description?: string; imageSrc?: string; actions?: React.ReactNode; note?: string; stats?: HeroStat[] }
export declare function HeroBanner(props: HeroBannerProps): React.ReactElement;
```

#### HomeHeader

Phần đầu trang chủ: nền đỏ (gradient `brand-950` → `brand-800`, viền dưới `court-gold`), thẻ tìm kiếm trắng đè lên mép dưới.

- Hàng trên: Quốc huy, tên cổng chữ hoa 14px 700 (`brand`, mặc định "Cổng dịch vụ tư pháp"), nút chuông nền `brand-700` có chấm `court-gold` khi `unread`.
- Lời chào `greeting` 20/26 700 màu `on-brand`. Dưới lời chào là nhãn vai trò `role` (viên cao 32px, nền `brand-900` viền `brand-700`) và `subtitle` (mức định danh, `on-brand-muted`).
- Tài khoản có nhiều vai trò: đặt `canSwitchRole` và `onRoleClick`. Nhãn vai trò thành nút có mũi tên xuống, bấm mở danh sách vai trò (bên dùng tự mở `SheetMenu`). Tài khoản chỉ 1 vai trò: bỏ `canSwitchRole`, nhãn là chữ tĩnh, không mũi tên.
- Bên dùng cung cấp: `greeting`, tùy chọn `brand`, `role`, `canSwitchRole`, `onRoleClick`, `subtitle`, `logoSrc`, `unread`, `onBell`, `searchPlaceholder`/`onSearch`.
- Thẻ tìm kiếm là nút mở màn tìm kiếm, không phải ô nhập trực tiếp. Nội dung ngay dưới cách thẻ tìm kiếm `space-4`.
- `onCalendar`: hiện nút Lịch (cùng kiểu nút chuông) bên trái nút chuông, mở màn Lịch. Dùng vì nút giữa `BottomNav` là "Nộp đơn" (chọn 30/10/2026).

```ts
export interface HomeHeaderProps { greeting: string; /** Shows the calendar button next to the bell. */ onCalendar?: () => void; brand?: string; role?: string; canSwitchRole?: boolean; onRoleClick?: () => void; subtitle?: string; logoSrc?: string; unread?: boolean; onBell?: () => void; searchPlaceholder?: string; onSearch?: () => void }
export declare function HomeHeader(props: HomeHeaderProps): React.ReactElement;
```

#### ProcessSteps

Khối "Quy trình" hướng dẫn chung, danh sách 1 cột. Có 2 kiểu, đặt bằng `variant`.

- `brand` (mặc định): nền gradient `brand-950` → `brand-800`, bóng `shadow-panel`. Mỗi bước là một dòng nền `brand-900` viền `brand-700` bo `radius-md`: số lớn "01" 22/28 700 màu `court-gold`, ô biểu tượng 36px nền `brand-800` biểu tượng `white`, tiêu đề `on-brand`, mô tả `on-brand-muted`. Nhãn "QUY TRÌNH" màu `court-gold`.
- `light`: thẻ `surface` viền `border` bóng `shadow-card`. Số bước trong vòng tròn 32px nền `brand-800` chữ `on-primary`, nối nhau bằng đường dọc 2px `brand-200`. Nhãn "QUY TRÌNH" màu `brand-text`, tiêu đề `ink`, mô tả `ink-muted`. Kiểu này không dùng biểu tượng.
- Bên dùng cung cấp: `title`, `steps` = `[{icon?, title, description?}]` (2–6 bước), tùy chọn `variant`, `eyebrow`.
- Chỉ dùng cho hướng dẫn chung; tiến trình của một hồ sơ cụ thể dùng `Timeline`, bước của form dùng `Stepper`.

```ts
export interface ProcessStep { icon?: IconName; title: string; description?: string }
export interface ProcessStepsProps { title: string; eyebrow?: string; steps: ProcessStep[]; variant?: 'brand' | 'light' }
export declare function ProcessSteps(props: ProcessStepsProps): React.ReactElement;
```

#### ProfileCard

Thẻ tài khoản đầu màn Cá nhân (phương án A, cùng cách hiển thị với `HomeHeader`).

- Nền gradient `brand-950` → `brand-800`, viền dưới `court-gold` 2px, bo `radius-lg`. Ảnh chữ viết tắt 48px nền `gold-soft` chữ `brand-950`; tên 20/28 700 trắng; nút tròn 40px nền `brand-700` mở Thông tin tài khoản.
- Hàng dưới: nhãn vai trò như HomeHeader (`canSwitchRole`: nút có mũi tên, mở danh sách vai trò; không có: nhãn tĩnh) và `subtitle` (ví dụ "Định danh VNeID") màu `on-brand-muted`.
- Bên dùng cung cấp: `name`, `initials`, tùy chọn `role`, `canSwitchRole`, `onRoleClick`, `subtitle`, `onOpen`.

```ts
export interface ProfileCardProps { name: string; initials: string; role?: string; canSwitchRole?: boolean; onRoleClick?: () => void; subtitle?: string; onOpen?: () => void; openLabel?: string }
export declare function ProfileCard(props: ProfileCardProps): React.ReactElement;
```

#### SectionHeader

Tiêu đề phần: nhãn nhỏ chữ hoa, tiêu đề Roboto 700, tùy chọn đường kẻ có dấu thoi đỏ.

- Bên dùng cung cấp: `title`, tùy chọn `eyebrow` (1–2 từ: "Dịch vụ", "Quy trình"), `align="center"`, `tone="dark"` (trên nền đỏ), `action` (thường là `LinkArrow`), `variant`.
- Mặc định: nhãn `overline` màu `brand-text`, tiêu đề `title-lg`. Căn giữa thì có hai đường kẻ `border` với dấu thoi `brand-800`.
- `variant="plain"`: chỉ tiêu đề `title-lg` (20/28 700), dùng giữa các khối trên trang chủ ("Dịch vụ khác", "Tin tức, thông báo").
- `tone="dark"`: nhãn `court-gold` (nhãn nhấn trên nền đỏ), tiêu đề `on-brand`.

```ts
export interface SectionHeaderProps { variant?: 'serif' | 'plain'; title: string; eyebrow?: string; align?: 'start' | 'center'; tone?: 'light' | 'dark'; action?: React.ReactNode }
export declare function SectionHeader(props: SectionHeaderProps): React.ReactElement;
```

#### StatSummary

Khối tổng quan số liệu: Tổng quan hồ sơ, Nghĩa vụ tài chính. Có 2 kiểu, chọn kiểu cuối cùng sau khi xem trên màn hình.

- `variant="brand"` (phương án B, mặc định): nền gradient `brand-950` → `brand-800`, bóng `shadow-panel`; số 28/36 700 trắng, nhãn `on-brand-muted`; các cột ngăn bằng vạch `brand-700`.
- `variant="plain"` (phương án C): thẻ trắng; mỗi số liệu là ô nền `surface-sunken`, số `brand-text`; số tiền đặt trong dải `brand-tint`.
- Bên dùng cung cấp: `title?`, `stats` = `[{value, label, onClick?}]` (mỗi số bấm được để mở danh sách tương ứng), hoặc `amountLabel` + `amount` + `subs` = `[{label, value}]` cho nghĩa vụ tài chính.

```ts
export interface StatSummaryProps { variant?: 'brand' | 'plain'; title?: string; stats?: { value: string; label: string; onClick?: () => void }[]; amountLabel?: string; amount?: string; subs?: { label: string; value: string }[] }
export declare function StatSummary(props: StatSummaryProps): React.ReactElement;
```

### Dữ liệu

#### CalendarCard

Lịch tháng (ghép phương án B và C): nút chuyển Tháng / Tuần / Danh sách.

- Thẻ trắng; đầu thẻ là tháng 16/22 700 và 2 nút chuyển tháng. `mode="month"`: lưới 7 cột, ô 42px; `mode="week"`: dải 7 ô 52px nền `surface-sunken`; `mode="list"`: chỉ đầu thẻ và nút chuyển, danh sách `EventCard` đặt bên dưới.
- Ngày chọn: tròn đặc `brand-800` (tuần: cả ô đỏ, chấm vàng); hôm nay: viền 1.5px `brand-800`; ngày có lịch: chấm 5px `brand-800`; Chủ nhật chữ `brand-text`. Chân thẻ: chú thích chấm và liên kết "Hôm nay".
- Bên dùng cung cấp: `monthLabel`, `mode`, `onModeChange`, `offset` (số ô trống đầu tháng), `days`, `week` (7 ngày), `selected`, `today`, `eventDays`, `onSelect`, `onPrev`, `onNext`, `onToday`; `modes={false}` để ẩn nút chuyển (Lịch cá nhân).

```ts
export interface CalendarCardProps { monthLabel: string; mode?: 'month' | 'week' | 'list'; modes?: boolean; onModeChange?: (m: string) => void; offset?: number; days?: number; week?: number[]; selected?: number; today?: number; eventDays?: number[]; legend?: string; onSelect?: (d: number) => void; onPrev?: () => void; onNext?: () => void; onToday?: () => void }
export declare function CalendarCard(props: CalendarCardProps): React.ReactElement;
```

#### CaseProgress

Tiến trình vụ án trong thẻ Vụ án của tôi (phương án C, chấm nối đường).

- Các giai đoạn chia đều chiều ngang: đã qua là chấm 22px đặc `brand-800` có dấu tích, nối bằng đường 2px `brand-800`; hiện tại là chấm viền `brand-800` có lõi đỏ và quầng `brand-tint`, nhãn `brand-text` 500; chưa tới là vòng `border-strong`, nhãn `ink-subtle`.
- Bên dùng cung cấp: `steps` (ví dụ Thụ lý, Chuẩn bị xét xử, Xét xử, Kết thúc), `current` (chỉ số từ 0).

```ts
export declare function CaseProgress(props: { steps: string[]; current: number; label?: string }): React.ReactElement;
```

### Màn hình mẫu

#### ComplaintScreen

Màn hình mẫu: Tra cứu khiếu nại, tố cáo với thẻ bộ lọc đè lên header và danh sách thẻ đơn, bố cục theo màn "Góp ý - khiếu nại" của VN Post.

#### FilingScreen

Màn hình mẫu: Nộp đơn khởi kiện theo các khối gập/mở, tài liệu kèm theo và thanh án phí cố định ở đáy, bố cục theo màn "Giao hàng trong nước" của VN Post.

#### HomeScreen

Màn hình mẫu: Trang chủ sau khi đăng nhập, bố cục theo app VN Post (lời chào, tìm kiếm, banner, hành động nhanh, lưới dịch vụ, tin tức, nút hỗ trợ, BottomNav).

### Hồ sơ

#### Timeline

Dòng thời gian tiến trình tố tụng của một vụ việc.

- Bên dùng cung cấp: `steps` = `[{title, date?, description?, state}]`; `state` là `done`, `current` hoặc `upcoming`; tùy chọn `currentLabel`.
- `done`: chấm `success-dot` có dấu tích trắng, đường nối `success-dot`. `current`: chấm `brand-800` có vòng `brand-tint` và nhãn 12/16 500 `brand-text` "Đang diễn ra" (chữ thường). `upcoming`: vòng viền `border-strong`, tiêu đề `ink-muted`.
- Ngày giờ dùng số cùng độ rộng, màu `ink-subtle`; ngày dự kiến ghi rõ "Dự kiến".

```ts
export interface TimelineStep { title: string; date?: string; description?: string; state: 'done' | 'current' | 'upcoming' }
export interface TimelineProps { steps: TimelineStep[]; currentLabel?: string }
export declare function Timeline(props: TimelineProps): React.ReactElement;
```

## 10. Quyết định đã chốt

### Cách cập nhật
- Design system được bổ sung dần trong quá trình thiết kế.
- Khi có component mới: đề xuất 3 phương án thiết kế (file HTML so sánh) để chủ dự án chọn; chỉ thêm vào design system sau khi đã chọn.

### Quyết định đã chốt
- Đỏ chủ đạo `brand-800` = #A3131C; thang đỏ tính lại: 950 #63070D, 900 #830D14, 700 #BA3030, 200 #FFC6C0, 50 #FFF2F0. Phông Roboto 400/500/700. Màn mobile 390px.
- Stepper: phương án C. FileUpload: phương án B (khi đã chọn tệp: hiện đủ trạng thái).
- Tabs: 2 kiểu `underline` (mặc định) và `chip` (lọc danh sách). Chọn loại trong form dùng SegmentedControl.
- ProcessSteps: 2 kiểu `brand` (khối đỏ, 1 cột) và `light` (dòng thời gian dọc).
- BottomNav: 5 mục Trang chủ, Hồ sơ, [Nộp đơn], Hộp thư, Cá nhân; mục giữa "Nộp đơn" là nút tròn đỏ nổi. Mục đang chọn không còn gạch đỏ mép trên (bỏ 30/10/2026).
- HomeHeader: nhãn vai trò dưới lời chào; nhiều vai trò thì bấm được (có mũi tên), 1 vai trò thì nhãn tĩnh; có nút Lịch cạnh nút chuông.
- Accordion: mỗi nhóm một thẻ riêng, chọn thủ tục bằng radio.
- Breadcrumb: bỏ.
- RecordCard và CaseCard: giữ 2 tên, dùng chung giao diện phương án D (gọn): nhãn loại chữ đỏ nhỏ (không nền), nút Đánh dấu/Lưu trữ, tiêu đề, mã số có nút sao chép, một dòng thông tin gộp, trạng thái, vùng mở rộng (dòng nhắc việc hoặc CaseProgress), chân thẻ vụ án (chỉ là thông tin đi kèm, không liên kết). Chạm bất kỳ đâu trên thẻ để mở chi tiết; không có nút "Chi tiết"; không có dòng tệp.
- Trạng thái component: nhấn, focus, vô hiệu (màu đặc, không trong suốt), lỗi, đang tải (khung xương thẻ), chỉ đọc.
- Component thêm cho app TATC: TaskList C, StatSummary B (tạm chọn), MenuList F, ProfileCard A, MailList C, NotificationList F, CalendarCard B+C, EventCard B (nút kiểu C), FinanceCard E, CaseProgress C, SearchToolbar C, RatingStars B, EmptyState C.

### Quyết định ngày 30/10/2026 (lần duyệt màn hình)
- **Cỡ chữ**: chỉ dùng 10 · 12 · 14 · 16 · 20 · 24; line-height 10/14, 12/16, 14/20, 16/24, 20/28, 24/32. Tiêu đề AppBar màn con 16 đậm; tên ô dịch vụ 12; 10px chỉ cho số đếm, "PDF", nhãn tháng.
- **Chiều cao**: nút cỡ thường, ô nhập một dòng, ô chọn, ô tìm kiếm = 46px. Nút nhỏ giữ 36px (thao tác trong dòng, trong thẻ). Ô nhập nhiều dòng cao theo nội dung.
- **Nhãn trạng thái** viết chữ thường ("Đã nhập", không phải "ĐÃ NHẬP").
- **Bố cục**: không đặt thông tin trực tiếp trên nền trang; gom theo nhóm vào khối nền trắng (tiêu đề nhóm 16/24 đậm + nội dung). Bộ lọc gom vào một khối; Stepper nằm trong khối riêng.
- **Trang chủ app**: bỏ banner; header đỏ → thẻ 4 dịch vụ → khối "Việc cần làm".
- **Đăng nhập**: theo bố cục app hiện tại, giữ kiểu header đỏ của design system; nút "Tài khoản định danh điện tử" viền đỏ có logo VNeID.
- **Bảng chọn từ đáy**: mọi dòng dùng icon minh họa nhiều màu (22 icon mới).
- **Thông báo**: không phân loại nhãn; biểu tượng chuông xám chung, chưa đọc là chấm đỏ; bỏ số đếm, bỏ cài đặt thông báo, bỏ nút "Xem thông báo cũ hơn" (tự tải khi cuộn đến cuối).
- **Header màn chức năng con**: phương án A (nền trắng, mũi tên quay lại, tiêu đề 16 đậm căn trái, thao tác chữ đỏ bên phải; luồng nộp đơn đặt "Lưu nháp" ở header). Màn trên thanh điều hướng (Hồ sơ, Hộp thư, Cá nhân) giữ header đỏ.
- **SearchToolbar C** (ô tìm cả hàng + chip Lọc, Sắp xếp) và **EmptyState C** (khung nét đứt một hàng): chốt, đã bỏ kiểu B.
- **Đang chờ**: StatSummary (tạm chọn B).

## 11. Nội dung chờ cung cấp

Hệ thống chưa có các câu chữ sau; preview của `FileItem` và `FileUpload` để trong ngoặc vuông: dung lượng tệp `[dung lượng]`, chữ khi đang tải `[đang tải]`, câu lỗi tệp quá lớn `[Tệp vượt quá 10 MB]`. Bảng trạng thái còn thiếu các câu lỗi: `[Câu lỗi khi chưa chọn Tòa án]`, `[Câu lỗi khi chưa đánh dấu cam đoan]`, `[Câu lỗi khi chưa tải tệp bắt buộc]`.

## 12. Cách dùng trong mã

```html
<link rel="stylesheet" href="tokens.css">
<link rel="stylesheet" href="components/bundle.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/react/18.3.1/umd/react.production.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.3.1/umd/react-dom.production.min.js"></script>
<script src="components/bundle.js"></script>
<script>
  var T = window.TuPhap, h = React.createElement;
  ReactDOM.createRoot(document.getElementById('root')).render(
    h(T.AppBar, { variant: 'plain', title: 'Nộp đơn khởi kiện', onBack: function () {}, actions: [{ text: 'Lưu nháp' }] }));
</script>
```

- Mọi màu, cỡ chữ, khoảng cách lấy từ biến CSS trong `tokens.css` (ví dụ `var(--brand-800)`, `var(--space-4)`, `var(--button-height)`), không viết mã màu trực tiếp.
- Kiểu dữ liệu đầy đủ của props nằm trong `components/index.d.ts`.

## 13. Cập nhật 02–03/11/2026 – quy tắc từ màn Soạn đơn

Mục này gom các quy tắc đã chốt khi làm lại màn Soạn đơn (nộp đơn khởi kiện, bước 1–7) trên prototype "Prototype TATC Gen UI". Khi khác các mục 1–12, theo mục này. Các thành phần ghi "mức app" chưa đưa vào design system chính thức; muốn đưa vào thì đề xuất 3 phương án để chủ dự án chọn.

### 13.1. Ô nhập, ô chọn, nút – toàn app

- **Ô nhập, ô chọn, ô tìm**: nền `surface`, viền liền 1px `border`, bo 6px, cao 46px, chữ trong ô 14/20. Nhấn chọn không đổi màu viền. Ô khóa và ô chỉ đọc: nền `surface-sunken`, không có hiệu ứng khi chạm. Thay mô tả nền `surface-sunken`, viền focus 2px, chỉ đọc viền nét đứt ở mục 8, `TextField`, `SelectField`.
- **Icon trong ô** (lịch, tìm kiếm, mũi tên ô chọn): đặt bên phải ô; chữ bắt đầu sát lề trái. Ngoại lệ: màn Đăng nhập giữ icon ở đầu ô.
- **Chữ gợi ý (placeholder)**: ô nhập "Nhập + tên trường" ("Nhập Nơi cấp"); ô chọn, ô ngày "Chọn + tên trường" ("Chọn Ngày cấp"). Giữ các gợi ý riêng đã có: "12 số", "(nếu có)", "(nếu là doanh nghiệp)", "Nhập tên loại việc".
- **Viết tắt**: "Tỉnh/Thành phố" viết "Tỉnh/TP" ở mọi nhãn và gợi ý.
- **Chữ trên nút**: mọi nút 14/20, độ đậm 500 (nút 46px, nút nhỏ 36px, ô tải tệp, "Thay tệp"). Thay `button` 16/24 ở mục 4.
- **Nút "+ Thêm …"** (`Button variant="tint"`): nền trắng, viền 1px `brand-text`, chữ `brand-text`, cao 36px, bo 6px, rộng vừa chữ.
- **Viền**: không dùng nét đứt ở bất kỳ đâu; mọi viền là nét liền 1px, kể cả viền trạng thái đang chọn. Thay nét đứt của `FileUpload`, `EmptyState`, chỉ đọc. Ngoại lệ: ô tải tệp trong màn Soạn đơn dùng viền nét đứt 1px `border` (02/11/2026).
- **Nút radio và ô đánh dấu**: khung 18 × 18px, chấm radio 8px, dấu tích 12px, ô đánh dấu bo 4px, cách chữ 12px; radio của `Accordion` cùng quy tắc. Thay ô 22px ở `Checkbox`, vòng 20px ở `Accordion`. Nút radio (`Radio`) là thành phần mức app: vòng viền `border-strong`; chọn thì viền và chấm `brand-800`; khóa thì nền xám.
- **Nhóm địa chỉ** (phương án B, mọi bộ địa chỉ: thường trú, hiện tại, tạm trú, trụ sở): một nhãn nhóm (dấu * ở nhãn nhóm) → hàng 2 ô chọn "Tỉnh/TP" | "Phường/Xã" không có nhãn riêng → ô "Địa chỉ chi tiết". Khoảng cách trong nhóm 8px. Ô lọc Tỉnh/TP ở màn Trợ giúp pháp lý không thuộc quy tắc này.
- **Bố trí trường**: giữ đúng thứ tự trường của web; chỉ ghép 2 cột ở các cặp đã chốt (Họ và tên | Số điện thoại; Số CCCD | Ngày cấp; Ngày sinh | Quốc tịch; Tỉnh/TP | Phường/Xã). Giới tính dùng radio Nam / Nữ / Khác.

### 13.2. Bảng từ đáy, popup, thông báo

- **Bảng từ đáy** (`Dialog variant="sheet"`): cao tối đa 4/5 chiều cao màn; nội dung ngắn thì co theo nội dung; khi dài, tiêu đề và thanh nút đứng yên, phần giữa cuộn. Tiêu đề 18/26 700 (ngoại lệ thang chữ, chủ dự án yêu cầu 02/11/2026). Không có câu mô tả dưới tiêu đề ở các bảng nhập người.
- **Popup xác nhận giữa màn**: vòng biểu tượng 48px → tiêu đề → mô tả → 2 nút "Hủy" (`tonal`) + nút chính. Xóa: biểu tượng thùng rác trên nền `brand-tint`, nút "Xóa", mô tả "<Tên> sẽ bị xóa khỏi danh sách …". Xác nhận đơn: biểu tượng cảnh báo trên nền `warning-tint`, nút "Đồng ý".
- **Lưu nháp**: bấm "Lưu nháp" ở header thì về Trang chủ và hiện thanh tối nổi ở đáy (nền `ink`, chữ trắng, tích xanh) "Đã lưu nháp đơn." (luồng khác: "Đã lưu nháp."), tự ẩn sau 3 giây – áp cho mọi luồng có Lưu nháp (03/11/2026).
- Không hiện thanh cuộn ở mọi màn (vẫn cuộn được).

### 13.3. Luồng nhập nhiều bước (Soạn đơn)

- **Header**: `AppBar variant="plain"` cao 120px gồm thanh trạng thái 44px; tiêu đề "Soạn đơn" 20/28 700; viền dưới 1px `border` + `shadow-card`. "Lưu nháp" ở header bước 1–6; bước 7 (đơn đã xác nhận) không có.
- **Thanh tiến trình** (phương án C, mức app): dải trắng riêng sát ngay dưới header; 7 đoạn cao 4px, không bo góc, cách nhau 2px, lề trái phải 16px; đoạn đã qua và đang làm `brand-800`, chưa tới `surface-sunken`. Dòng dưới: "n. Tên bước" 14/20 700 + "Bước n/7" 12/16 bên phải; dòng tiếp "Tiếp theo: <bước sau>" (bước 7: "Bước cuối"). Kẻ 1px `border` dưới dải. Không bấm được. Thay `Stepper` trong luồng này.
- **7 bước**: Loại đơn, Người khởi kiện, Người bị kiện, Nội dung, Tài liệu, Xem lại, Ký số.
- **Khối nội dung rộng 100%** (phương án A): khối trắng kéo hết chiều ngang; bỏ bo góc, viền hai bên và bóng; các khối cách nhau 8px nền `surface-page`, khối đầu cũng cách dải tiến trình 8px; nội dung trong khối lề 16px. Chữ và nút không thuộc khối vẫn lề 16px; ô cam kết đặt trong dải trắng riêng. Thay quy tắc khối bo `radius-lg` ở mục 5, 6.1 cho luồng này.
- **Khối gập/mở** (`FormSection`): không còn nhãn "Đã nhập" / "Chưa nhập". Chỉ khối Ký số (bước 7) có nhãn "Chưa ký số" (xám) / "Đã ký số" (xanh, dấu tích).
- **Đầu khối có tiêu đề 2 dòng** (03/11/2026): đầu `FormSection` đệm trên dưới 16px; khối 1 dòng vẫn cao 56px; chữ cách nội dung khối 16px.
- **Danh sách người** (đồng khởi kiện, người bị kiện, người liên quan, người làm chứng): dòng đếm "n …" 12/16 xám ngay trên danh sách (ẩn khi chưa có ai); thẻ tóm tắt thu gọn: số thứ tự tròn đỏ, tên đậm, dòng phụ, mũi tên mở/thu gọn, nút thùng rác 32px (bước 3, từ 03/11/2026: bỏ số tròn, tên, dòng phụ – thẻ chỉ còn nhãn vai trò + STT đậm "Người bị kiện 1", "Người liên quan 1", "Người làm chứng 1"; bước 2 và 6 giữ kiểu cũ); chạm thẻ để mở form. Thêm mới → thẻ mở sẵn và cuộn tới (chỉ cuộn vùng nội dung, header đứng yên). Xóa → popup xác nhận. Danh sách bắt buộc có ít nhất 1 người thì ẩn nút xóa khi chỉ còn 1. Không dùng ô tìm và "Thu gọn tất cả" của web.
- **Thẻ người đại diện**: không số thứ tự, không thu gọn; Họ tên (đậm), Số định danh/Số CCCD (tổ chức: Mã số thuế/MSDN), Thời hạn, nút xóa.
- **Ô tải tài liệu** (mức app): 2 ô vuông một hàng "Tải lên từ thiết bị" / "Từ kho dữ liệu", viền nét đứt xám, vòng biểu tượng 36px nền `brand-tint`, biểu tượng và chữ căn giữa; chỉ một nguồn thì một ô cả hàng (có dòng mô tả nhỏ). Ghi chú định dạng chữ xám. Có tệp → thẻ tài liệu: tích xanh, tên tài liệu (sửa được), tên tệp chữ xanh, Loại tài liệu*, nút Xem / "Thay tệp" (Tải từ thiết bị, Lấy từ kho dữ liệu cá nhân) / Xóa.
- **Kho dữ liệu cá nhân**: bảng chồng "Chọn tệp từ kho dữ liệu cá nhân"; thẻ tệp 3 dòng (tên tài liệu / loại · ngày / "Nguồn: …"), nút Xem chỉ biểu tượng 32px viền xám; bộ lọc "Tất cả loại tài liệu", "Mọi lần gắn kèm"; hơn 10 tệp thì phân trang 10 tệp/trang.

### 13.4. Nội dung từng bước (theo web `/nop-don-khoi-kien`, cập nhật 03/11/2026)

- **Bước 1 – Loại đơn**: các mục đặt phẳng trên nền trắng, hiện lần lượt: Loại thủ tục, Lĩnh vực (hàng chọn ngang 4 ô minh họa + ô chú thích điều khoản), Loại việc cụ thể, câu hỏi phân định (nếu có), Loại việc chi tiết (nếu có). Đơn soạn dở: popup "Bạn có một đơn đang soạn dở gần đây." (Tiếp tục / Bắt đầu mới).
  - Loại việc cụ thể: ô chọn "— Chọn loại việc cụ thể —" → bảng từ đáy "Chọn loại việc cụ thể" (ô "Tìm nhanh loại việc" khi trên 6 mục; danh sách dòng ký hiệu điều luật đỏ + tên + mô tả). Không hiện mô tả dưới ô chọn. Danh mục theo web (DM_PHANLOAIDON, Khởi kiện vụ án): Dân sự 14, Hôn nhân và gia đình 8, Lao động 10, Kinh doanh thương mại 5.
  - Câu hỏi phân định (Đ.26.4 ↔ Đ.30.2): khung nền `surface-sunken`, câu hỏi 14/20 700 + mô tả 12/16, Có / Không (`SegmentedControl`, chưa chọn sẵn); trả lời lệch → khung cảnh báo `warning-tint` + câu cảnh báo + nút viền cả hàng "Chuyển sang …" (đổi cả lĩnh vực và loại việc).
  - Loại việc chi tiết*: chỉ hiện khi loại việc có danh mục con (Đ.26.4, Đ.30.2: 6 mục sở hữu trí tuệ; Đ.32.3: 4 mục); ô chọn → bảng từ đáy "Chọn loại việc chi tiết". Đổi lĩnh vực / loại việc thì xóa lựa chọn chi tiết.
- **Bước 2 – Người khởi kiện**: khối "Danh sách người khởi kiện" kiểu bước 3 (03/11/2026): dòng đếm "n người khởi kiện", thẻ gập/mở chỉ nhãn + STT – "Người khởi kiện 1" là người đăng nhập (mở sẵn, không xóa; trường lấy từ định danh khóa), nút "+ Thêm người khởi kiện" trong khối mở bảng tra CCCD/MST → thẻ "Người khởi kiện 2, 3…" điền sẵn, khóa trường, có nút xóa (popup "Xóa người khởi kiện?"); trước đây là khối "Người khởi kiện" (trường lấy từ định danh khóa) + người đại diện theo ủy quyền (bảng từ đáy, xác minh, tài liệu minh chứng); khối "Danh sách người đồng khởi kiện" (bảng từ đáy Đối tượng + Số CCCD/MST; sau Đồng ý điền sẵn và khóa trường như người khởi kiện).
  - Người khởi kiện / người đồng khởi kiện là **Tổ chức** (03/11/2026, theo web plDescs nhánh tổ chức): nút chia đoạn Cá nhân | Tổ chức đổi bộ trường; Tên tổ chức / doanh nghiệp*, Mã số thuế / MSDN*, nhóm Địa chỉ trụ sở* (khóa – lấy từ tài khoản / tra cứu MST); "Có người đại diện hợp pháp (Đại diện theo ủy quyền và đại diện theo pháp luật)" → khung "Người đại diện theo pháp luật" (thẻ người đã chọn: tên, CCCD · chức vụ, nút xóa; nút "+ Thêm người đại diện theo pháp luật" → bảng từ đáy chọn nhiều người chưa chọn, dòng chọn chữ đỏ + dấu tích, đáy Hủy | "Thêm (n)"; không bắt buộc) + khung "Người đại diện theo ủy quyền" (+ Thêm người đại diện).
- **Bước 3 – Người bị kiện**: 3 khối. "Danh sách người bị kiện" (người thứ nhất mở sẵn): Cá nhân/Tổ chức + trường theo web (Cá nhân: Họ và tên* | SĐT, Email, Số giấy tờ (nút tiền tố CCCD / CMND / Hộ chiếu → bảng "Chọn loại giấy tờ"), Ngày cấp | Nơi cấp, Ngày sinh | Quốc tịch, Giới tính, 3 nhóm địa chỉ (thường trú bắt buộc), Nghề nghiệp, Nơi làm việc; Tổ chức: Tên tổ chức* | Mã số thuế, địa chỉ trụ sở*, SĐT | Email) + "Có người đại diện hợp pháp". "Danh sách người có quyền lợi, nghĩa vụ liên quan": radio Có / Không (mặc định chưa chọn); Có → thẻ "Người liên quan n" + "Mối quan hệ / Lý do liên quan"*. "Danh sách người làm chứng" ban đầu trống; bấm "Thêm người làm chứng" mới hiện thẻ (Họ và tên*, Địa chỉ*, Nội dung có thể làm chứng).
- **Bước 4 – Nội dung**: khối "Nội dung đơn" + câu mô tả theo web; "Nhập thông tin" / "Tải đơn có sẵn". Nhập thông tin: chỉ 1 ô nhập nhiều dòng "Nội dung đơn"* (khác web). Tải đơn có sẵn: 1 ô tải "Tải lên từ thiết bị", "Định dạng PDF, DOCX · tối đa 10MB/tệp."; chọn tệp → bảng từ đáy "Tài liệu đơn có sẵn" như bước 5 (dòng tệp + "Thay tệp" – chỉ tải từ thiết bị, Tên tài liệu*, Loại giấy tờ* → bảng chồng "Chọn loại giấy tờ", Xóa | Hủy | Lưu); lưu xong ô tải ẩn, hiện 1 thẻ tài liệu như bước 5 (tích xanh, tên, "tệp · loại giấy tờ", nút bút sửa); xóa thì hiện lại ô tải (03/11/2026).
- **Bước 5 – Tài liệu** (phương án S1, 03/11/2026): khối "Tài liệu & chứng cứ", "Định dạng PDF, JPG, PNG, DOCX · tối đa 10MB/tệp.".
  - Mỗi tài liệu một thẻ riêng (viền 1px, bo `radius-md`, cách nhau 8px): biểu tượng trạng thái 32px (tải lên đỏ / tích xanh), Loại văn bản* (tài liệu bắt buộc) hoặc tên tài liệu bổ sung, dòng phụ "tên tệp · Loại giấy tờ" / "Chưa tải lên" / chữ đỏ "Chưa chọn loại giấy tờ"; có tệp: nút sửa chỉ biểu tượng bút xám 32px; chưa có: "Tải lên" (menu Tải từ thiết bị / Lấy từ kho dữ liệu cá nhân). Ô nét đứt "Tải lên tài liệu bổ sung" / "Từ kho dữ liệu cá nhân" nằm trên màn. Nút "Tải lên" và "Thay tệp" không có mũi tên (03/11/2026); mục trong menu vẫn là "Tải từ thiết bị" / "Lấy từ kho dữ liệu cá nhân".
  - Chọn xong tệp hoặc bấm sửa → bảng từ đáy "Tài liệu bắt buộc" / "Tài liệu bổ sung": "Loại văn bản: …" dưới tiêu đề (chỉ tài liệu bắt buộc); dòng tệp + "Thay tệp"; Tên tài liệu (khóa với tài liệu bắt buộc – tạm lấy tên tệp; bổ sung: nhập, bắt buộc); Loại giấy tờ* (Bản chính / Bản sao có chứng thực / Bản sao không có chứng thực / Khác; ô chọn → bảng từ đáy chồng "Chọn loại giấy tờ" (danh sách dòng phương án B, mục đã chọn chữ `brand-text` đậm + dấu tích), chọn xong tự đóng về bảng tài liệu, nút Lưu mở); đáy Xóa (biểu tượng) | Hủy | Lưu (khóa tới khi đủ). Không có nút Xem.
- **Bước 6 – Xem lại**: khối cha "Xem lại & Xác nhận" gồm 5 khối con viền xám gập/mở, mặc định mở (cả thẻ người bên trong): Loại việc, Thông tin người khởi kiện, Thông tin người bị kiện, Nội dung đơn, Tài liệu đính kèm (n tệp). Đầu khối con: mũi tên + tiêu đề + nút sửa chỉ biểu tượng bút xám 32px (về đúng bước). Thông tin dạng nhãn trái 12/16 xám – giá trị phải 14/20 chữ thường (mỗi hàng đệm 8px, kẻ 1px); Nội dung đơn chỉ hiện nội dung, căn đều 2 lề; tài liệu: tên, "tệp · loại", nút xem chỉ biểu tượng xám. Khối riêng "Gợi ý tòa án có thẩm quyền" + Tòa án nhận đơn*; ô cam kết; "Xác nhận" → popup "Xác nhận đơn?" → bước 7.
- **Bước 7 – Ký số**: khối "Ký số" (Chưa ký số / Đã ký số): mô tả theo web, "Đơn khởi kiện" + nút xem chỉ biểu tượng, người cần ký (số tròn, tên, vai trò) + "Ký số" → bảng "Ký số hồ sơ (n tệp)": danh sách tệp, "Ký từ xa" / "USB ký số", danh sách nhà cung cấp chữ ký số chọn một, Đóng | Ký (khóa tới khi chọn). Ký xong: "Đã ký lúc …", nhãn "Đã ký", "Nộp đơn" (không biểu tượng) mở. Khối "Tài liệu đính kèm (n tệp)" + nút xem chỉ biểu tượng.
- **Nộp đơn thành công** (phương án C): màn kết quả toàn trang, không header, nền trắng, nội dung giữa màn: vòng tích xanh, "Đã gửi đơn thành công", mô tả theo web; khung viền 3 hàng nhãn trái – giá trị phải (Mã tiếp nhận đỏ đậm, Thời điểm gửi, Trạng thái "Đã gửi đơn" tông info); đáy "Xem tại Quản lý đơn" (đỏ) trên, "Về trang chủ" (viền) dưới.

### 13.4a. Thành phần mức app dùng lại (03/11/2026)

- **Bảng chọn danh sách dòng** (phương án B): trong bảng từ đáy, mỗi mục một dòng cao ≥ 48px, kẻ 1px `border`, không radio, không viền thẻ; chữ 14/20 500 (+ mô tả 12/16 xám nếu có); mục đang chọn chữ `brand-text` 700 + dấu tích 20px bên phải; chạm là chọn và đóng bảng. Dùng cho Loại việc cụ thể, Loại việc chi tiết.
- **Danh sách nhãn trái – giá trị phải**: nhãn 12/16 `ink-subtle` (tối đa 45% bề ngang, nằm trên cùng), giá trị 14/20 400 căn phải, xuống dòng khi dài; hàng đệm 8px, kẻ 1px. Dùng ở bước 6 và màn Nộp đơn thành công.
- **Nút sửa / xem chỉ biểu tượng**: `Button variant="secondary" size="sm"` 32px, viền và biểu tượng xám (`pen`, `eye`), không chữ.
- **Thẻ tài liệu + bảng nhập tài liệu** (bước 5) và **câu hỏi phân định** (bước 1): xem 13.4.
- **Ô chọn mở bảng từ đáy** (03/11/2026): `SelectField` 46px → bảng từ đáy dùng danh sách dòng phương án B; có ô tìm khi trên 10 mục (bảng thủ tục: trên 6 mục) và luôn có ở danh mục Tòa án. Chọn xong tự đóng. Dùng cho Mục đích sử dụng, Năm ban hành, Loại án, Tòa án ban hành, Tòa án nhận đơn, Tư cách người yêu cầu, Thủ tục.
- **Thẻ chọn một trên màn**: thẻ viền 1px, tên 14/20 700 + mô tả 12/16; mục đang chọn nền `brand-tint`, viền `brand-800`. Dùng cho Loại sản phẩm cần cấp, Loại văn bản, Hình thức nhận bản giấy.
- **Danh sách dòng trong khung viền**: danh sách dòng phương án B đặt trong khung viền 1px bo `radius-md`, lề trong 12px; dùng khi chọn trực tiếp trên màn (vụ án, văn bản còn thời hiệu, hồ sơ giao nộp).
- **Nhóm vụ án gập/mở**: thẻ viền, đầu thẻ tên vụ án đậm + 2 dòng phụ 12/16 + mũi tên; mở ra là danh sách dòng văn bản.
- **Bộ đếm số lượng**: nhãn trái, cụm "− n +" bên phải (nút 36px, viền 1px); "−" khóa khi bằng 1.
- **Dải tên thủ tục**: dải trắng rộng 100% đầu nội dung các bước khiếu nại, tố cáo: nhãn `Tag` loại đơn + tên thủ tục 16/24 700.
- **Thẻ đã xác minh**: nền `success-tint`, viền `success-border`, biểu tượng khiên, dòng đậm + mô tả 12/16.
- **Bước cuối "Xem lại & ký gửi"** dùng chung: khối xem lại (nhãn trái – giá trị phải) + khối "Ký số" (nhãn Chưa ký số / Đã ký số, bảng "Ký số hồ sơ (n tệp)" như bước 7) + khối tài liệu đính kèm (nếu có) + ô cam đoan; nút gửi khóa tới khi ký.
- **Màn kết quả toàn trang** dùng chung (phương án C của Nộp đơn thành công): vòng tích xanh, tiêu đề 24/32, mô tả, khung nhãn trái – giá trị phải, 2 nút (đỏ trên, viền dưới).

### 13.4b. Các luồng khác dùng khung Soạn đơn (03/11/2026)

Mọi luồng nhiều bước dùng chung: header `AppBar plain` + "Lưu nháp" (trừ Giao nộp tài liệu) + thanh tiến trình (số đoạn bằng số bước) + khối nội dung rộng 100% + thanh đáy "Quay lại" | "Tiếp theo ›" (bước 1 chỉ "Tiếp theo"). Màn một khối (Rút đơn, Chỉnh sửa liên hệ, Xác thực, Rà soát, Thông tin tài khoản) dùng khối 100% không có thanh tiến trình; thông tin chỉ đọc dạng nhãn trái – giá trị phải.

- **Cấp trích lục, bản sao** (theo web `/trich-luc/moi`, 4 bước: Chọn bản án / quyết định → Loại & hình thức nhận → Tư cách người yêu cầu → Xem lại & gửi). Bước 1: tab "Từ vụ án của tôi" (ô tìm, dòng đếm "n vụ án / n bản án, quyết định", nhóm vụ án gập/mở, chọn văn bản → "Loại sản phẩm cần cấp"* thẻ chọn một) / "Nhập thông tin bản án" (Loại văn bản* thẻ chọn một, Số bản án / quyết định*, Năm ban hành, Loại án, Tòa án ban hành*, Tên các bên đương sự). Bước 2: loại văn bản cần cấp (tự khai) hoặc ghi chú phần cần trích; Hình thức nhận kết quả (bộ đếm Số lượng bản giấy, Gửi qua bưu chính / Nhận tại Bộ phận một cửa; bưu chính → Tên người nhận* | Số điện thoại*, nhóm Địa chỉ nhận*); Tài liệu đính kèm (nếu có) dùng thẻ tài liệu bước 5; Mục đích sử dụng* (+ Chi tiết khi "Mục đích khác" hoặc tự khai). Bước 3: thẻ đã xác minh (từ vụ án) hoặc ô chọn "Bạn yêu cầu với tư cách"* (tự khai) + ô cam kết. Bước 4: xem lại & ký gửi, nút "Gửi yêu cầu" → màn kết quả "Đã gửi yêu cầu".
- **Chọn thủ tục khiếu nại, tố cáo** (theo web `/khieu-nai-to-cao/chon-thu-tuc`, kiểu bước 1 Soạn đơn): câu dẫn "Bạn muốn khiếu nại hoặc tố cáo việc gì?" → Nhóm thủ tục* (hàng 4 ô minh họa: Trong vụ án của tôi, Khiếu nại hành chính, Tố cáo, Kiến nghị, phản ánh; ô chú thích "<tên nhóm> · n thủ tục") → Thủ tục* (ô chọn → bảng "Chọn thủ tục") → ô chú thích nền xám: mô tả, nhãn trái – giá trị phải (Cơ quan giải quyết, Thời hiệu, Thời hạn giải quyết, Căn cứ pháp lý), "Hồ sơ cần có". Nút đáy "Bắt đầu khai đơn" khóa tới khi chọn thủ tục. Danh mục 16 thủ tục theo web.
- **Khiếu nại hành chính / Tố cáo / Kiến nghị, phản ánh** (5 bước: Người gửi đơn → Cá nhân, đơn vị bị khiếu nại / Người, đơn vị bị tố cáo / Cơ quan, cá nhân liên quan → Nội dung và nơi nhận → Tài liệu kèm theo → Xem lại và ký gửi). Bước 1: thông tin định danh nhãn trái – giá trị phải, Số điện thoại liên hệ*, nhóm Địa chỉ liên hệ*, ô đánh dấu "Có người khác cùng …" → danh sách thẻ "Người cùng đứng đơn n". Bước 2: Cá nhân / Cơ quan, tổ chức + trường. Bước 3: ô chú thích "Mỗi đơn chỉ một loại nội dung…", Tiêu đề*, Tòa án nhận đơn*, Nội dung* + dòng đếm ký tự. Bước 4: thẻ tài liệu; tố cáo thêm khối "Tùy chọn của đơn tố cáo" (Gửi đơn nặc danh / Đề nghị áp dụng biện pháp bảo vệ – loại trừ nhau; nặc danh → khung cảnh báo). Kết quả: "Đã gửi đơn …", Xem chi tiết hồ sơ / Về danh sách hồ sơ.
- **Trong vụ án, vụ việc của tôi** (Quyết định tố tụng, Hành vi của người tiến hành tố tụng, Tố cáo hành vi vi phạm pháp luật; 4 bước: Đối tượng & thời hiệu → Nội dung & người khiếu nại / tố cáo → Tài liệu, chứng cứ → Xem lại & ký gửi). Bước 1: khối "Thủ tục bạn đã chọn" (Gửi tới, Thời hạn giải quyết + liên kết "Đổi thủ tục") + khối đối tượng: chọn vụ án (danh sách dòng trong khung viền, có "Không gắn vụ án" → Tòa án + số hồ sơ), văn bản còn thời hiệu (quyết định tố tụng) hoặc người có hành vi + ngày biết được hành vi / người bị tố cáo. Bước 2: nội dung theo thủ tục + khối "Người … & tư cách" (thông tin lấy từ vụ án). Bước 3: tài liệu hệ thống tự tạo (biểu tượng khóa) + thẻ tài liệu; tố cáo bắt buộc ít nhất 1 chứng cứ.
- **Giao nộp tài liệu, chứng cứ** (3 bước: Hồ sơ → Tài liệu → Xem lại và ký số; không Lưu nháp): bước 1 chọn hồ sơ bằng danh sách dòng trong khung viền; bước 2 khối "Hồ sơ đã chọn" + thẻ tài liệu bước 5; lỗi hiện khung `danger-tint` phía trên khối tài liệu.
- **Khai đơn khiếu nại, tố cáo** (màn cũ) thay bằng bước 1 luồng Quyết định tố tụng.
### 13.5. Quy tắc làm việc

- Không tự chốt rồi mới hỏi; điểm nào chưa rõ phải hỏi và chờ trả lời. Thay đổi giao diện mới thì làm trang demo (thường 3 phương án) trước khi áp dụng.
- Không đổi thứ tự trường của web khi chưa được yêu cầu.
- Câu chữ chưa có trong nguồn để trong ngoặc vuông, ví dụ `[Nội dung đơn]`, `[Loại tài liệu]`, `[Họ và tên]`.
- Prototype không kiểm tra bắt buộc nhập; chỉ giữ dấu * để đánh dấu.
- 03/11/2026 (v114): Hộp thư tống đạt áp dụng phương án C (demo https://claude.ai/artifact/MVQ1oJEkp8WbbKHg86xhDV): thư mục dạng nút chia đoạn có số đếm (Tất cả 20 / Quan trọng 3 / Lưu trữ 0); ô tìm + Lọc + Đổi kiểu xem; dòng "20 văn bản" + sắp xếp Mới nhất; mỗi văn bản một thẻ, viền trái màu theo hạn (đỏ quá hạn, vàng sắp hết hạn, xanh còn hạn, xám không hạn), nhãn loại văn bản + mã vụ án, nút sao (bật/tắt) và lưu trữ, chấm chưa đọc, dòng "Hạn xử lý"; chạm thẻ mở Văn bản tống đạt.
- 03/11/2026 (v115): Hộp thư – thẻ văn bản bỏ viền trái màu theo hạn (chỉ còn viền 1px như thẻ thường; mức hạn thể hiện qua nhãn "Còn n ngày / Đã quá hạn"); nút sao / lưu trữ bỏ viền.
- 03/11/2026 (v116): Hộp thư tống đạt hoàn thiện theo web /hop-thu (screens/hop-thu/index.tsx, khoi-theo-nhom.tsx; bản mã nguồn trên máy, chưa pull). Danh sách: thư mục Hộp thư / Quan trọng / Đã lưu trữ (số đếm như web: chưa đọc, quan trọng, lưu trữ); nút Lọc mở bảng từ đáy "Lọc văn bản" (Theo hồ sơ, Nhãn văn bản dạng chip có số đếm, Tình trạng đọc Tất cả/Chưa đọc/Đã đọc có số đếm, Khoảng thời gian 6 lựa chọn + Từ ngày/Đến ngày, Tòa án; Đặt lại | Áp dụng; nút Lọc có chấm đỏ khi đang lọc); dòng "Đang lọc: … — n văn bản" + Xóa lọc; Sắp xếp mở bảng từ đáy (Ngày gửi mới nhất / cũ nhất / Thời hạn xử lý gần nhất); tự tải thêm 10 văn bản khi cuộn, cuối danh sách "Đã hiển thị hết n văn bản"; trạng thái trống theo thư mục / theo bộ lọc. Thẻ: chân thẻ = nhãn trạng thái (Chưa đọc / Cần hành động / Đã đọc) bên trái, ngày hạn + nhãn còn/quá hạn bên phải (bỏ chữ "Hạn xử lý:"). Chi tiết "Văn bản tống đạt": nhãn + số hiệu + tên, 4 nút Tải xuống / In / Quan trọng / Lưu trữ (Bỏ lưu trữ); đơn vị ban hành + người ký (chức vụ) + ngày, Đơn liên quan; trích yếu; khung xem văn bản; khối theo nhóm đủ 10 kiểu của web (Khoản phải nộp, Yêu cầu sửa đổi bổ sung hồ sơ, Lịch phiên + Phòng họp trực tuyến, Bản án quyết định, Yêu cầu trả lời, Thông báo thụ lý, Hòa giải đối thoại, Biện pháp khẩn cấp tạm thời, Ý kiến phản hồi, Quyết định) gồm thông tin, dòng Hạn (còn / quá / vô thời hạn), nút hành động (khóa khi quá hạn + câu "Đã hết hạn — công dân không thể thực hiện…"); văn bản không thuộc nhóm có khối "Xem hồ sơ"; Tài liệu đính kèm; dải "Đã ký số bởi … · CKS hợp lệ · Tống đạt điện tử …"; ghi nhận "Bạn đã mở văn bản này lần đầu lúc …". Mở văn bản = đã đọc.
- 03/11/2026 (v117): Hộp thư – nút sao / lưu trữ trên thẻ sát nhau hơn (nút rộng 30px, không khoảng cách); khi chọn chỉ tô đỏ nét biểu tượng, không tô đặc.
- 03/11/2026 (v118): Hộp thư – tách 2 bảng từ đáy theo ảnh người dùng gửi: nút Lọc → "Bộ lọc hộp thư" (Hồ sơ, vụ án · Tòa án ban hành · Thời gian gửi + Từ ngày/Đến ngày khi chọn khoảng tùy chọn; mặc định "Tất cả"; Nhập lại | Áp dụng); nút ô lưới (thay "Đổi kiểu xem") → "Phân loại thư" (Trạng thái đọc: Tất cả / Đã đọc / Chưa đọc; Nhãn văn bản: Tất cả nhãn + các nhãn theo ABC có chấm màu theo web; mỗi dòng biểu tượng/chấm + tên + số đếm + nút tròn, dòng chọn nền đỏ nhạt chữ đậm; Áp dụng). Mỗi nút có chấm đỏ khi điều kiện của nó khác mặc định; giữ dòng "Đang lọc … · Xóa lọc".
- 03/11/2026: Cập nhật trang design system (https://claude.ai/artifact/1GbaHfiE2GAprpV1qBCwQ7, bản 49): bundle đồng bộ với prototype v118; thêm 12 thành phần IconButton, InboxCard, ChoiceList, DocToolbar, IssuerInfo, DocumentPreview, DeadlineBlock, SignatureNote, UrgencySummary, TaskCard, DetailHeader, SignerList (README + preview mỗi thành phần); README thêm mục "Mẫu màn app TATC". Không tạo được file Figma: Figma chưa cho phép kết nối trong loại phiên này.
- 03/11/2026 (v119): Chọn bộ màu nhãn A · Trầm (demo https://claude.ai/artifact/LQhtrmQtUfMYd9nA39EEQP), thêm vào design system (bản 50) thành 20 màu × 3 token tag-N / tag-N-text / tag-N-bg, dùng chung cho mọi chức năng (Tag color, InboxCard kindColor, ChoiceList tag). Hộp thư: nhãn loại văn bản trên thẻ và trang chi tiết đổi màu theo màu nhãn (nền tag-N-bg, chữ tag-N-text); chấm màu bảng Phân loại thư dùng tag-N. Bảng màu nhãn: Thông báo 3, Quyết định 8, Bản án 10 (tím, bỏ hồng), Biên bản 6, Giấy xác nhận 5, Giấy mời triệu tập 9, Đơn yêu cầu 2, Hành chính 7, Hòa giải đối thoại 4, Dân sự 13, Không có văn bản 15, Chưa xác định 11; dự phòng 1, 12, 14, 16–20.
- 03/11/2026 (v120): Hộp thư – bỏ thanh thư mục ở đầu màn; thư mục (Hộp thư / Quan trọng / Đã lưu trữ, có số đếm) chuyển vào bảng "Phân loại thư" thành nhóm đầu, trên nhóm Nhãn văn bản (demo https://claude.ai/artifact/UjSkVdBMF9JqmLV2MHxVsk). Dòng "20 văn bản" thay bằng hàng: trái chip trạng thái đọc Tất cả / Chưa đọc (số đếm nền đỏ) / Đã đọc (phương án B, demo https://claude.ai/artifact/GL5aY7AWndRiNob5irKUmK), phải Sắp xếp có chữ. Bảng Phân loại thư bỏ nhóm Trạng thái đọc. Đang xem thư mục khác Hộp thư hoặc lọc nhãn: dòng "Đang lọc: … — n văn bản" + Xóa lọc (đưa về Hộp thư, giữ trạng thái đọc), nút ô lưới có chấm đỏ.
- 03/11/2026 (v121): Hộp thư – bỏ dòng "Đang lọc: … — n văn bản" + Xóa lọc (điều kiện lọc chỉ báo bằng chấm đỏ trên nút Bộ lọc / Phân loại thư; bỏ lọc bằng Nhập lại hoặc chọn lại Hộp thư / Tất cả nhãn); ô tìm + hàng chip trạng thái đọc / Sắp xếp cố định ở đầu danh sách khi cuộn (nền surface-page).
- 03/11/2026 (v122): Hộp thư – thanh công cụ màu xám (phương án B, demo https://claude.ai/artifact/Sdhp7JDaKD5zxzjK2LNEef): nút Bộ lọc / Phân loại thư nền trắng không viền, biểu tượng ink-muted; số chưa đọc viên surface-sunken chữ ink-muted; Sắp xếp ink-muted. Biểu tượng (demo https://claude.ai/artifact/PY9Nbf47tCnuCAh1Ri41En): Bộ lọc = phễu `funnel` (B), Sắp xếp = 3 vạch ngắn dần + mũi tên xuống `sortDesc` (A), Phân loại thư giữ `grid`. Design system bản 51: thêm icon funnel, sortDesc; IconButton màu xám không viền.
- 03/11/2026 (v123): Hộp thư – nút Bộ lọc / Phân loại thư theo ảnh mẫu: viền 1px border, bo 8px, nền trắng, biểu tượng 24px nét 1.8 màu đỏ đậm brand-900 (#830d14). Số chưa đọc và Sắp xếp giữ xám. Design system bản 52: IconButton cùng kiểu.
- 03/11/2026 (v124): Hộp thư – biểu tượng Bộ lọc / Phân loại thư chọn C (demo https://claude.ai/artifact/PeWUtsL4818WmhNLuohMNA): 22px, nét 1.4, màu đỏ chủ đạo brand-800; nút giữ nền trắng, viền 1px border, bo 8px. Design system bản 53: IconButton cùng kiểu.
- 03/11/2026 (v125): Hộp thư – chân thẻ bỏ nhãn trạng thái (Chưa đọc / Cần hành động / Đã đọc), thay bằng "🕒 Hạn xử lý: dd-mm-yyyy" bên trái + nhãn còn/quá hạn bên phải; văn bản không có hạn không có chân thẻ; chưa đọc vẫn báo bằng chấm đỏ + chữ đậm.
- 03/11/2026 (v126): Chi tiết văn bản tống đạt – bỏ dải "Đã ký số bởi … · CKS hợp lệ · Tống đạt điện tử …" và dòng "Bạn đã mở văn bản này lần đầu lúc …"; màn kết thúc ở khối Tài liệu đính kèm (hoặc khối theo nhóm). Mở văn bản vẫn ghi nhận đã đọc.
- 03/11/2026 (v127): Chi tiết văn bản tống đạt – gộp khối tiêu đề và khối đơn vị ban hành thành 1 (phương án A, demo https://claude.ai/artifact/K6jPeUrWoLzLPYRPM71ZMQ): nhãn + số hiệu + nút Quan trọng / Lưu trữ dạng biểu tượng bên phải (như C) → tên văn bản → tên Tòa án (không biểu tượng) + người ký · ngày → trích yếu → ô Đơn liên quan. Bỏ nút Tải xuống, In (mở văn bản qua khung xem bên dưới).
- 03/11/2026 (v128): Chi tiết văn bản tống đạt – bỏ dòng trích yếu "V/v … trong hồ sơ …" ở khối đầu.
- 03/11/2026 (v129): Đổi tên tài khoản mẫu "Nguyễn Minh An" thành "Hoàng Dương" (chữ viết tắt HD) ở mọi màn. Chi tiết văn bản tống đạt (phương án B, demo https://claude.ai/artifact/SKWUijMkycDgnRwSnAFz6T; ban đầu chọn C rồi đổi B): bỏ khung xem trực tiếp văn bản; cuối khối đầu là thẻ tên tệp (biểu tượng tệp, tên, PDF · dung lượng, nút Xem → màn xem tệp, nút Tải xuống); Tài liệu đính kèm cùng kiểu thẻ; Đơn / vụ án liên quan thành 1 dòng chữ "Hồ sơ: ĐKK-… · DS-… ›" dưới người ký (chạm mã đơn → chi tiết đơn, mã vụ án → chi tiết vụ án). Design system: thêm icon `download`.
- 03/11/2026 (v130): Chi tiết văn bản tống đạt – mã hồ sơ liên quan (mã đơn, mã vụ án) hiển thị dạng nút viên cùng dáng nhãn còn/quá hạn: bo tròn, nền brand-tint, chữ brand-text 12/16 500; bỏ mũi tên.
- 03/11/2026 (v131): Chi tiết văn bản tống đạt – nút Xem trên thẻ tên tệp mở màn xem tệp PDF (header là tên tệp + nút Tải xuống; các trang PDF cuộn dọc, số trang). Tệp không mở được: màn thông báo "Không mở được bản số hóa. Vui lòng thử tải xuống hoặc liên hệ Tòa án." + nút Tải xuống (mẫu: Danh-sach-tai-lieu.pdf; màn mới attachmentErr). Đồng nhất nút biểu tượng: Quan trọng / Lưu trữ và Xem / Tải xuống đều 36×36, biểu tượng 20px, liền nhau. Bỏ ô biểu tượng ở tiêu đề khối theo nhóm (Lịch phiên, Hòa giải đối thoại…).
- 03/11/2026 (v132): Chi tiết văn bản tống đạt – mọi nút hành động trong khối theo nhóm (Sửa đổi bổ sung đơn, Bổ sung tài liệu, Xác nhận tham dự, Nộp tạm ứng án phí…) và nút Xem hồ sơ dùng nền trắng (secondary: viền và chữ đỏ), không còn nút đỏ nền đặc.
- 03/11/2026 (v133): Thẻ tên tệp (văn bản tống đạt và tài liệu đính kèm) bỏ dòng "PDF · dung lượng"; chỉ còn biểu tượng tệp, tên tệp, nút Xem, Tải xuống.
- 03/11/2026 (v134): Tiêu đề header đỏ của 3 màn trên thanh điều hướng (Hồ sơ, Hộp thư tống đạt, Cá nhân) tăng từ 16/24 lên 20/28, đậm 700. Design system bản 55: AppBar variant page cùng cỡ.
- 03/11/2026 (v135): Bảng Phân loại thư – tên dòng (thư mục, nhãn văn bản) giảm từ 16/24 xuống 14/20.
- 03/11/2026 (v136): Hộp thư – trạng thái trống hiển thị giữa màn: biểu tượng thư 48px `ink-subtle`, tiêu đề 18/26 700, mô tả 14/20 `ink-muted`. Không tìm thấy: "Không có văn bản phù hợp" / "Vui lòng điều chỉnh bộ lọc hoặc từ khóa tìm kiếm." + nút secondary "Xóa bộ lọc" (xóa từ khóa, bộ lọc, nhãn, trạng thái đọc; thư mục về Hộp thư). Thư mục trống dùng cùng kiểu, không có nút.
- 03/11/2026 (v137): Bảng Phân loại thư bỏ nút radio bên phải (dòng chọn: nền `brand-tint`, chữ đậm, biểu tượng và số đếm đỏ); dòng cao 40px (trước 46px), không khe giữa các dòng.
- 03/11/2026 (v137): Trạng thái trống Hộp thư thu gọn: biểu tượng thư 32px, tiêu đề 14/20 700, mô tả 12/16, nút "Xóa bộ lọc" cỡ sm (cao 36px, như các nút trong nội dung).
- 03/11/2026 (v138): Màn Hồ sơ – mỗi chức năng 1 dòng (MenuList, giữ 2 nhóm, mô tả, số hồ sơ, mũi tên); biểu tượng nét thay bằng ô minh họa tròn 44px như Dịch vụ trực tuyến: Danh sách đơn `nopDon`, Hòa giải `hoaGiai`, Giao nộp `chungCu`, Vụ án `banAn`, Vụ việc `phaSan`, Nghĩa vụ tài chính `anPhi`.
- 03/11/2026 (v139): Màn Hồ sơ bỏ số lượng hồ sơ (06, 02, 01) ở các dòng chức năng; còn ô minh họa, tên, mô tả, mũi tên.
- 03/11/2026 (v140): Màn Hồ sơ – mỗi chức năng là 1 thẻ trắng riêng (bo góc lớn, đổ bóng thẻ, cách nhau 8px, giữa 2 nhóm 16px); bỏ mũi tên ">".
- 03/11/2026 (v141): Việc cần làm – giữ bộ màu trạng thái hiện có (`danger` / `warning` / `success`), không đổi màu. Khối Việc cần làm ở Trang chủ dùng cùng thẻ với màn Xem tất cả (ô biểu tượng theo mức, nhãn loại việc, mã hồ sơ, tiêu đề, dòng hạn, liên kết hành động; 3 việc đầu) thay cho TaskList ô ngày. Dòng hạn tô theo mức ở cả hai màn: quá hạn `danger`, sắp hết hạn `warning`, trong hạn `success` (trước đây chữ xám) – cùng màu nhãn hạn trên thẻ Hộp thư; "Không có thời hạn" `ink-subtle`.
- 03/11/2026 (v142): Thẻ Việc cần làm (Trang chủ và màn Xem tất cả) – liên kết hành động (Xem văn bản, Bổ sung hồ sơ, Nộp tạm ứng…) căn trái, trước đây căn phải.
- 03/11/2026 (v143): Màn Việc cần làm (Xem tất cả) – thanh lọc nhóm (Tất cả, Tống đạt, Hồ sơ và đơn…) cố định dưới header khi cuộn lên; bỏ dòng "n việc cần làm".
- 03/11/2026 (v144): Màn Hồ sơ – phương án A: 6 chức năng xếp lưới 2 cột × 3 hàng (bỏ chia nhóm), thẻ trắng cao tối thiểu 178px: ô minh họa tròn 56px trên, tên 16/22 500, mô tả 12/16 `ink-muted` tối đa 3 dòng; không số lượng, không mũi tên. Thứ tự giữ như web: Danh sách đơn và tiến trình, Hòa giải đối thoại, Giao nộp tài liệu chứng cứ, Vụ án của tôi, Vụ việc của tôi, Nghĩa vụ tài chính.
- 03/11/2026 (DS v56–v57): Design system đồng bộ prototype v135–v144: thêm `FeatureCard` + `FeatureGrid` (màn Hồ sơ lưới 2 cột); `EmptyState variant="center"` (biểu tượng 32px, tiêu đề 14/20 700, mô tả 12/16, nút secondary sm "Xóa bộ lọc"); `ChoiceList` bỏ nút radio, dòng 40px, tên 14/20; `TaskCard` liên kết hành động căn trái, dòng hạn mức trong hạn `success`, `deadlineMuted` cho "Không có thời hạn"; `MenuList` không còn dùng cho màn Hồ sơ; README mục "Mẫu màn app TATC" viết lại theo prototype hiện tại.
- 03/11/2026 (v145): Nghĩa vụ tài chính vẽ lại đầy đủ theo web /nghia-vu-tai-chinh: danh sách (dòng phụ "Bao gồm tạm ứng án phí, tạm ứng lệ phí."; StatSummary Còn phải nộp / Quá hạn hoặc còn ≤ 3 ngày / Đã nộp; phần dính đầu: tab Phải nộp · Đã nộp, được miễn + ô tìm "Mã thông báo, số văn bản, mã hồ sơ" + nút Bộ lọc (Hồ sơ, vụ án; Ngày nộp – chỉ nhóm đã xong; Nhập lại | Áp dụng) + chip Loại khoản có số đếm; thẻ FinanceCard + ghi chú màu (sắp/quá hạn, được giảm, chưa xác định số tiền) + nút Nộp tiền / Xem chi tiết; nhóm đã xong: ngày nộp, kênh, số biên lai, Tải biên lai PDF / Xem quyết định miễn, dòng "Tổng đã nộp"), trống và lỗi tải (EmptyState center), chi tiết khoản (khối đầu: loại, trạng thái, còn hạn, tên, người + hồ sơ, số tiền + bằng chữ; ghi chú theo tình huống; khối Nộp tiền + Đề nghị miễn, giảm; khối Biên lai; Thông tin khoản + "Đây là khoản gì?" + Xem văn bản gốc; Lịch sử khoản), Nộp tiền 2 bước (xác nhận khoản có sao chép mã → Đã mở Cổng DVCQG) và "Khoản đã được Tòa án xác nhận". Thêm 13 màn (129 màn). Bundle design system trong prototype đồng bộ bản 57.
- 03/11/2026 (v146): Danh sách đơn và tiến trình vẽ lại theo web /quan-ly-don: dòng phụ "Theo dõi trạng thái và việc cần làm cho tất cả đơn bạn đã tạo." + nút + (Nộp đơn mới) trên header; phần dính đầu: tab loại đơn cuộn ngang (chỉ tab có đơn, tab GĐT luôn hiện), ô tìm "Tìm số tiếp nhận, mã vụ án,…" + nút Sắp xếp (Mới nhất / Mã tiếp nhận), chip trạng thái Tất cả · Chưa gửi · Chờ ký số · Đã gửi đơn · Đang giải quyết · Đã giải quyết (bỏ Chờ ký số ở tab phản tố); dải "N đơn cần bạn xử lý — …" (Xem ngay → / Xem tất cả, Đóng); thẻ đơn (ô lĩnh vực, tên loại việc, tóm tắt nguyên đơn/bị đơn, sao đánh dấu, vai trò, mã tiếp nhận · ngày gửi, trạng thái + tình trạng giải quyết, hạn thực hiện, nút thao tác viền trắng – khóa khi quá hạn, "Xem đơn" khi không có thao tác); trống theo tab + nút "Đề nghị Tái thẩm"/"Đề nghị Giám đốc thẩm"; hộp thoại "Xác nhận nộp thêm đơn". Chi tiết đơn thêm 6 tình huống: chờ ký số (Tiến độ ký số – SignerList, "Chờ đủ chữ ký để nộp đơn" / "Nộp đơn"), đã thụ lý (khối đỏ "VỤ ÁN ĐÃ THỤ LÝ" + Xem chi tiết Vụ án), nộp tạm ứng án phí (còn hạn: Thanh toán qua Cổng DVCQG + Đề nghị miễn, giảm; quá hạn: chỉ thông báo đỏ), trả lại đơn (Lập lại đơn từ phần hợp lệ ✓/✗, Lập đơn mới từ đơn này, Khiếu nại việc trả lại đơn). 138 màn.
- 03/11/2026 (v147): Danh sách đơn – 6 luồng đơn liên quan (mục "Tạo đơn liên quan" ở Chi tiết đơn) vẽ theo web, cùng khung Soạn đơn (thanh bước, Lưu nháp, Quay lại / Tiếp theo; bước cuối ký số + cam đoan, nút gửi chỉ bật khi đã ký; màn kết quả): Đề nghị miễn, giảm tạm ứng án phí (4 bước; danh mục Điều 12 / Điều 13 NQ 326; quá hạn / không có quyền), Yêu cầu rút đơn khởi kiện (3 bước; 5 lý do RD-1..5; hệ quả; xác nhận "Tạo thêm yêu cầu rút đơn?"), Sửa đổi, bổ sung đơn theo yêu cầu của Tòa án (4 bước; chưa có yêu cầu), Thay đổi, rút một phần yêu cầu khởi kiện (5 bước; TD-01/TD-02, hệ quả, cam đoan), Yêu cầu áp dụng biện pháp khẩn cấp tạm thời (4 bước; đối tượng, biện pháp bảo đảm; chưa thể yêu cầu), Sao gửi tài liệu, chứng cứ (6 bước; tự sao gửi / đề nghị Tòa án hỗ trợ). Nút ở Chi tiết đơn và banner tạm ứng án phí trỏ đúng luồng. Danh mục biện pháp BPKCTT, lý do thay đổi/rút lấy từ API nên để trong [ ]. 175 màn.
- 03/11/2026 (v148): Danh sách đơn – chi tiết đơn kháng cáo (lưới thông tin vụ án/văn bản bị kháng cáo/tư cách; dải việc cần làm "Tòa án yêu cầu sửa đổi, bổ sung đơn kháng cáo"; khối Nội dung kháng cáo · Văn bản tống đạt · Đơn phát sinh · Lịch sử đơn), đơn giám đốc thẩm, tái thẩm (lưới thông tin bản án; Nội dung đề nghị · Văn bản tống đạt · Danh sách đơn · Lịch sử), đơn phản tố/YCĐL (tiến trình 3 bước Gửi đơn → Xem xét đơn → Kết quả; Rút yêu cầu / Thay đổi yêu cầu; trả lại đơn + khiếu nại). Thẻ ở danh sách trỏ đúng màn. Luồng con riêng của kháng cáo/GĐT/phản tố tạm dùng khung chung (sửa đổi, rút, thay đổi). 179 màn.
- 03/11/2026 (v149): Vụ án của tôi vẽ lại theo web /vu-an: danh sách (dải "Phiên tòa sắp diễn ra" + Xem vụ án; ô tìm "Tìm theo mã vụ án, tên vụ án, mã đơn…" + Bộ lọc Loại án / Cấp xét xử / Trạng thái / Vai trò; thẻ vụ án: ô loại án, mã + sao chép, loại án, sao theo dõi, trạng thái, vai trò, chuỗi cấp xét xử ✓/đang, Tòa án, ngày thụ lý, nhãn phiên tòa, hạn kháng cáo; trống/không phù hợp), chi tiết thêm tình huống tạm đình chỉ (Điều 214, 215 BLTTDS) và xem xét lại GĐT/TT, mục "Tạo đơn liên quan — giai đoạn sau thụ lý" theo web (rút đơn, thay đổi/rút một phần, BPKCTT áp dụng/thay đổi/hủy bỏ, chi phí tố tụng, đơn yêu cầu khác, giao nộp, sao gửi), Yêu cầu sao chụp tài liệu, chứng cứ (đương sự khác / Tòa án thu thập: chọn đương sự, lý do + gợi ý nhanh, nhận bản giấy tại Tòa án / qua bưu chính + địa chỉ, xem trước & ký số, Lưu nháp, Gửi yêu cầu → đã gửi). Nút "Chia sẻ quyền xem" web đang tạm ẩn nên chưa vẽ. 185 màn.
- 03/11/2026 (v150): Phương thức giao dịch điện tử (web /phuong-thuc-giao-dich + wizard-chuyen-phuong-thuc): danh sách theo hồ sơ (tìm + chip trạng thái PT-01..04 có đếm; thẻ pt-c: loại · mã, tên, Tòa án, Tống đạt qua, nhãn trạng thái + vai trò, thao tác theo trạng thái: Tạm chuyển sang giấy / Chuyển giấy đến khi kết thúc / Hủy yêu cầu / Tiếp tục điện tử / ghi chú PT-04); 3 trạng thái rỗng/lỗi; wizard 3 bước (Lý do chuyển → Phương thức thay thế → Xem lại và xác nhận) cho tạm chuyển và chuyển giấy đến khi kết thúc; kết quả chờ Tòa duyệt / áp dụng ngay. Bỏ màn methodDetail/methodForm cũ (web không có màn chi tiết). Nhãn PT-03 dùng tone neutral, PT-04 danger.
- 03/11/2026 (v151): Câu hỏi thường gặp (web /faq): 2 tab (Câu hỏi thường gặp / Góp ý của tôi + đếm; khách không có tab); tìm không dấu + chip chủ đề (Tất cả chủ đề…); nhóm theo chủ đề (faq-nhom: tên in hoa + n câu hỏi); câu hỏi dạng gập/mở (faq-q: ô ? vàng, Cập nhật ngày, câu hỏi, đoạn xem trước 180 ký tự, Xem chi tiết →/Thu gọn, mũi tên xoay), mỗi lúc mở 1; khối phản hồi Hữu ích / Cần cải thiện (góp ý 10–1000 ký tự, lỗi theo web), nhắc đăng nhập khi là khách, trạng thái đã phản hồi; Góp ý của tôi dạng thẻ (mã, ngày, câu hỏi, nội dung); rỗng/lỗi. IbEmpty thêm tham số icon. Nội dung câu hỏi mẫu lấy theo đường đi trong prototype (web lấy từ API).
- 03/11/2026 (v152): Đánh giá mức độ hài lòng (web /danh-gia-hai-long): 4 tab cuộn ngang (Chờ đánh giá + đếm / Đánh giá đã gửi / Đánh giá Cổng dịch vụ / Kết quả công khai) + dòng tóm tắt; khối Vụ án / Đơn (dg-khoi: biểu tượng, tên + số, mô tả, ô tìm riêng); thẻ hồ sơ chờ (nhãn loại, tên, mã, Tòa án, Có kết quả · Hạn đánh giá, nút Đánh giá dịch vụ); màn chấm sao (sao chung bắt buộc + nhãn mức, tiêu chí dạng dòng sao nhỏ, nhận xét ≤500, ẩn danh; hộp thoại web → màn riêng) → Cảm ơn; Đã gửi (điểm TB, thẻ phiếu: sao, ngày, Ẩn danh, góp ý nền xám, chip tiêu chí); Đánh giá Cổng theo kỳ (form / phiếu đã gửi / sửa) + Kết quả các kỳ; Kết quả công khai (chọn kỳ, 4 ô chỉ số, thanh điểm tiêu chí, Theo Tòa án / Theo loại hồ sơ dạng danh sách có thanh %); khách: khung mời đăng nhập. Tên tiêu chí là mẫu (web lấy từ API). Proto: window.__ptSnack để màn gọi thanh thông báo.
- 03/11/2026 (v153): Hòa giải đối thoại (web /hoa-giai-doi-thoai): danh sách thẻ kiểu Quản lý đơn (ô HG vàng / DT xanh, vụ việc, A vs B, mã tiếp nhận · Tòa án, nhãn trạng thái + chấm tình trạng, hạn theo hành động, Xem chi tiết) + tìm + bảng Tình trạng (có đếm) + bảng Sắp xếp (Mặc định / Hạn xử lý gần nhất / Mới nhất / Mã hồ sơ) + rỗng; chi tiết 2 tab (Tiến trình / Thông báo-Tống đạt): Việc bạn cần làm (đối tượng, văn bản, thời hạn, nút theo ma trận), nút phụ (lịch, biên bản, vụ án liên quan), mốc tiến trình dạng dòng văn bản (mốc đang chờ trả lời nền vàng), đổi thứ tự; văn bản tống đạt 3 mục; Trả lời lựa chọn (Đồng ý/Không đồng ý, ý kiến đồng nguyên đơn + báo thống nhất, phạm vi → Tòa án → Hòa giải viên/Thẩm phán chỉ định, lý do, ghi chú, Tạo đơn để ký số → Ký số, Lưu lựa chọn / Gửi Tòa án); Đề nghị thay đổi HGV, hoãn phiên (+ xem lại), xem xét lại QĐ công nhận (Điều 33). Proto: data-pt-snack = thanh thông báo khi đi tiếp.
- 03/11/2026 (v154): Theo dõi yêu cầu cấp trích lục, bản sao (web /trich-luc): danh sách (nút Tạo yêu cầu mới, tìm, chip 6 trạng thái có đếm; thẻ: nhãn loại Trích lục/Bản sao (+n bản giấy), nhãn trạng thái, loại văn bản + số, vụ án · Tòa án, mã · ngày gửi · dự kiến trả, dải việc cần làm vàng: Bổ sung hồ sơ / Nghĩa vụ tài chính → Thanh toán / nháp → Tiếp tục soạn); chi tiết 6 tình huống (đang giải quyết, bổ sung, nghĩa vụ TC, đã cấp + khối kết quả ký số Xem trước/Tải xuống, từ chối, nháp + xác nhận xóa) gồm đầu thẻ (mã, nhãn, bước DVCQG, tên, Xem vụ án, dự kiến trả), Hồ sơ bạn đã gửi, Thông tin yêu cầu, Diễn biến xử lý + Bước tiếp theo; Nộp tài liệu bổ sung (tệp/giải trình ≥30, liên hệ mới, Ký số và gửi bổ sung); Rút yêu cầu (lý do, khác ≥30, cam kết). Sheet Trích lục: Theo dõi yêu cầu → danh sách. QdConfirm thêm danger/snack.
- 03/11/2026 (v155): Theo dõi đơn khiếu nại, tố cáo (web /khieu-nai-to-cao): màn chính (Nộp đơn mới + 2 thẻ nguồn Hành chính · Hệ thống KNTC / Trong tố tụng · Hệ thống QLA có số hồ sơ); tab tố tụng: 4 ô tổng quan bấm để lọc (Tổng hồ sơ/Đang xử lý/Đã có kết quả/Quá hạn xử lý), tìm + bảng Bộ lọc (loại việc, từ–đến ngày), chip Tất cả/Lưu nháp/Đã gửi/Gửi lỗi, thẻ hồ sơ (mã + thủ tục, tóm tắt, đơn gốc, loại việc · mã QLA, trạng thái Tòa + tình trạng, thanh thời hạn đã gửi x/y ngày, Khiếu nại lần hai · còn n ngày, nháp: Xóa nháp/Tiếp tục soạn); tab hành chính: thẻ (loại đơn, mã, nhóm trạng thái, tóm tắt, chủ đơn, ngày gửi · cơ quan, dải hạn); chi tiết hành chính (tiến trình giải quyết theo nhóm trạng thái, nội dung, người bị KN/TC, tài liệu, thông tin xử lý, thủ tục & căn cứ, hành động tiếp theo, bảo vệ người tố cáo, Rút đơn); chi tiết tố tụng 3 tab; Rút đơn 2 bước (hình thức toàn bộ/một phần, lý do, xác nhận); Khiếu nại lần hai, Tố cáo tiếp, Cho ý kiến dự thảo kết luận (ký số và gửi); Khiếu nại việc trả lại đơn 4 bước (Điều 194) nối từ chi tiết đơn bị trả lại.
- 03/11/2026 (v156): Tab Cá nhân – phương án H (kết hợp E + F, người dùng chọn sau 2 vòng demo A–C, D–F, G–H): header đỏ giữ tiêu đề 'Cá nhân'; thông tin tài khoản tách thành banner thẻ trắng nằm trong header (ảnh chữ tắt tròn 56 nền brand-800, tên 16/24 700, chip vai trò có mũi tên, logo VNeID + 'Định danh VNeID' màu success, 'Số định danh' che, chữ 'Xem ›' bên phải; bấm cả thẻ → Thông tin tài khoản, chip vai trò bấm riêng); bỏ dòng 'Thông tin tài khoản' khỏi menu.
- 03/11/2026 (v157): Trang chủ – khối 'Dịch vụ trực tuyến' đổi tên thành 'Dịch vụ và hỗ trợ'; bỏ ô Nộp đơn khởi kiện (đã có banner Nộp đơn ngay); thêm ô 'Đánh giá' (minh họa danhGia) ở vị trí cuối → màn Đánh giá mức độ hài lòng; vẫn lưới 4 × 2.
- 03/11/2026 (v158): Trang chủ – khối Dịch vụ và hỗ trợ: ô Trợ giúp pháp lý chuyển xuống vị trí cuối (thứ tự: Lịch, phiên tòa · Cấp trích lục, bản sao · Khiếu nại, tố cáo · Phản ánh, kiến nghị · Chữ ký số · Phương thức giao dịch · Đánh giá · Trợ giúp pháp lý).
- 03/11/2026 (v159): Tab Hồ sơ đổi tên thành 'Theo dõi vụ án, vụ việc' (tiêu đề màn + nhãn thanh điều hướng); Trang chủ – đổi chỗ Trợ giúp pháp lý và Đánh giá: ô Đánh giá ở vị trí cuối, Trợ giúp pháp lý thứ 7.
- 03/11/2026 (v160): Việc cần làm (Trang chủ + Xem tất cả) – thẻ gọn kiểu A nhưng mỗi việc 1 thẻ riêng (người dùng chọn sau demo A/B/C): biểu tượng 32 nền theo mức hạn, tên 1 dòng 14/20 600 (cắt …), dòng phụ 12/16 'loại · mã · Còn n ngày' (hạn tô màu success/warning/danger, đậm), mũi tên phải; bấm cả thẻ mở việc; bỏ dòng hạn riêng và liên kết hành động riêng.
- 03/11/2026 (v161): Sửa lỗi – bấm tab Theo dõi vụ án, vụ việc trên thanh điều hướng không chuyển màn (quy tắc điều hướng còn khớp nhãn cũ 'Hồ sơ'); đã đổi theo nhãn mới.
- 03/11/2026 (v162): Cá nhân / Giao dịch điện tử (web /giao-dich-dien-tu): tiêu đề 'Giao dịch điện tử' + mô tả NQ 01/2026; dải vàng 'Bạn chưa xác nhận cam kết giao dịch điện tử' (Xác nhận cam kết ngay → cuộn tới khối cam kết); khối 'Cam kết lại giao dịch điện tử' (nhãn Quy định áp dụng; chưa chọn vai trò → dòng hướng dẫn; khung cuộn nội dung điều khoản theo vai trò đang xem + quy định đính kèm Tải file; danh sách vai trò dạng ô tích, vai trò không có cam kết áp dụng bị khóa kèm lời nhắc; phải đọc hết điều khoản vai trò đang chọn mới chọn vai trò khác; ô 'Tôi đã đọc, hiểu và cam kết tuân thủ Quy chế…' chỉ mở khi cuộn hết; nút Xác nhận lại); khối 'Lịch sử giao dịch điện tử' dạng danh sách (mã, thời gian, tên điều khoản + ngày, vai trò, 'Điều khoản cam kết' → bảng Danh sách quyết định/nghị quyết). 4 tình huống: commit / commitNone / commitOk / commitRegs. Thông báo cam kết ở Trang chủ → commitNone.
- 03/11/2026 (v163): Giao dịch điện tử – bỏ dòng mô tả dưới tiêu đề ('Quản lý cam kết và trạng thái giao dịch điện tử với Tòa án theo Nghị quyết 01/2026/NQ-HĐTP.').
  + (v163) Khối Cam kết lại: đưa phần chọn vai trò lên trước, nội dung điều khoản hiển thị sau (dòng hướng dẫn đổi thành 'ở trên'/'bên dưới' cho khớp vị trí); mô tả dưới tiêu đề khối căn đều 2 lề.
  + (v163) Lời nhắc dưới ô xác nhận đổi thành 'Vui lòng đọc hết nội dung điều khoản trước khi xác nhận.'
  + (v163) Nút Xác nhận lại bỏ biểu tượng.
- 03/11/2026 (v164): Lịch sử giao dịch điện tử – mỗi phiên ký cam kết 1 thẻ (phương án A, người dùng chọn): đầu thẻ 'Phiên ký dd/mm/yyyy · hh:mm:ss' + nhãn 'Mới nhất' cho phiên gần nhất; tên điều khoản (đậm, theo dữ liệu: 'CAM KẾT THỰC HIỆN CÁC ĐIỀU KIỆN PHÁP LÝ KHI GIAO DỊCH ĐIỆN TỬ VỚI TÒA ÁN'); 'Mã giao dịch CK-… · Điều khoản ngày …'; chip vai trò xác nhận; cuối thẻ ngăn vạch mảnh: '⤓ Tải quyết định/nghị quyết (n)' → bảng Danh sách quyết định/nghị quyết. Trường thông tin theo bảng web (Mã giao dịch, Tên điều khoản + ngày, Vai trò xác nhận, Thời gian xác nhận, Thao tác).
- 03/11/2026 (v165): Giao dịch điện tử – khi cần ký (chưa cam kết / cần xác nhận lại) hiện khối nhắc giống Trang chủ (Notice reminder: minh họa uyQuyen, 'Bạn chưa hoàn thiện cam kết giao dịch điện tử', mô tả theo tình huống, nút 'Xác nhận cam kết ngay') thay cho khối cam kết trong trang; nút mở màn riêng 'Cam kết giao dịch điện tử' (mô tả căn đều; thẻ 'Giao dịch điện tử với vai trò *' → thẻ 'Điều khoản cam kết' (khung cuộn + quy định đính kèm) → ô xác nhận (mở khi đọc hết) → nút cuối màn 'Xác nhận lại' hoặc 'Xác nhận cam kết' lần đầu) → về trang đã xác nhận đủ + thanh thông báo. Thông báo cam kết ở Trang chủ vào thẳng màn Cam kết (lần đầu). Người dùng duyệt sau demo.
- 03/11/2026 (v166): Đồng nhất màn Cam kết giao dịch điện tử theo bản lần đầu (người dùng chọn): Cá nhân > Cam kết giao dịch điện tử mở trang tình huống 'chưa xác nhận cam kết' → Xác nhận cam kết ngay → màn Cam kết lần đầu (vai trò Công dân, Luật sư; nút Xác nhận cam kết), giống hệt lối vào từ Trang chủ. Tình huống ký lại (commit, commitForm) chỉ còn trong menu nhảy màn, ghi '(tình huống phụ)'.
- 03/11/2026 (v167): Lịch sử giao dịch điện tử – bỏ dòng đầu thẻ 'Phiên ký … · giờ' và nhãn 'Mới nhất'; tên điều khoản hiển thị chữ thường (sentence case) thay vì in hoa.
- 03/11/2026 (v168): Khối nhắc 'Bạn chưa hoàn thiện cam kết giao dịch điện tử' (Trang chủ + trang Giao dịch điện tử) đổi minh họa từ uyQuyen (trùng ô Chữ ký số) sang yeuCau (bảng kê có dấu tích) – người dùng chọn sau demo 3 phương án.
- 03/11/2026 (v169): Khối nhắc cam kết giao dịch điện tử (Trang chủ + trang Giao dịch điện tử) – bỏ dòng mô tả xám, chỉ còn minh họa, tiêu đề, nút 'Xác nhận cam kết ngay' (và nút đóng ở Trang chủ).
- 03/11/2026 (v170): Khối nhắc cam kết giao dịch điện tử đổi sang dạng banner (phương án F): nền đỏ nhạt (brand-tint), tiêu đề + nút nhỏ "Xác nhận cam kết ngay" bên trái, hình minh họa yeuCau lớn bên phải; nút đóng chỉ ở Trang chủ. Dùng chung component CkBanner cho Trang chủ và trang Giao dịch điện tử.
- 03/11/2026 (v171): Hình trong banner nhắc cam kết đổi sang minh họa phẳng đơn sắc tông đỏ (phương án C: văn bản + nét chữ ký + khiên tích, dùng brand-200/brand-700, không viền) để khác kiểu minh họa của các ô Dịch vụ và hỗ trợ. Component CkArt trong s1.
- 03/11/2026 (v172): Hoàn tác v171 theo yêu cầu người dùng – hình trong banner nhắc cam kết quay lại minh họa bảng kê có dấu tích (yeuCau) như v170; bỏ CkArt.
- 03/11/2026 (v173): Banner nhắc cam kết giao dịch điện tử đổi nền sang vàng nhạt (phương án A): background --warning-tint, viền --warning-border; áp dụng Trang chủ và trang Giao dịch điện tử.
- 04/11/2026 (v174): Màn Cam kết giao dịch điện tử – chọn vai trò đổi sang checkbox thường (DS Checkbox), bỏ dạng thẻ có viền/nền; vai trò khóa (K1) hiển thị checkbox disabled + ghi chú nghiêng; logic đọc hết điều khoản giữ nguyên.
- 04/11/2026 (v175): Màn Cam kết giao dịch điện tử – quy định đính kèm có thể nhiều tệp (phương án C): dưới điều khoản chỉ hiện 1 dòng tóm tắt "n quy định đính kèm · Áp dụng từ … · Chạm để xem và tải"; chạm mở bảng dưới đáy "Quy định đính kèm" liệt kê từng tệp (loại tệp, tên, ngày áp dụng, dung lượng, nút tải icon) + nút "Tải tất cả (n)". Dữ liệu mẫu 3 tệp.
- 04/11/2026 (v176): Khung đọc điều khoản cam kết (.gd-dk-sc) tăng chiều cao tối đa từ 260px lên ~60% màn hình: max-height:min(60vh,506px) (506 = 60% khung 844).
- 04/11/2026 (v177): Màn Khiếu nại — Tố cáo – 2 thẻ nguồn (Hệ thống KNTC / QLA): thẻ đang chọn đổi sang style banner GDĐT (nền --warning-tint, viền 1px --warning-border, bỏ viền vàng đậm 2px); thêm hình minh họa trái 28px (70% của 40px) – hành chính: hanhChinh, tố tụng: banAn – nhãn hệ thống bên phải cùng hàng.
- 04/11/2026 (v178): Quản lý chữ ký số theo web /quan-ly-chu-ky-so (đọc mã nguồn screens/quan-ly-chu-ky-so): 3 tab Phương thức & chứng thư · Lịch sử ký · Hướng dẫn cài USB ký số. Tab 1: khối "Phương thức ký mặc định" (thẻ "Chữ ký của bạn", chip Mặc định/Chưa đặt mặc định, chọn nguồn Ký số từ xa/USB ký số bằng SegmentedControl, ô chọn chứng thư, Xóa mặc định + Lưu mặc định) + khối "Chứng thư số của bạn" (nút Khai báo chứng thư, thẻ chứng thư: nguồn·CA, chủ thể, CA cấp, nhãn Còn hạn/Sắp hết hạn/Hết hạn, Số serial/Hiệu lực/Dùng gần nhất/Kiểm tra gần nhất, Kiểm lại · Xóa khỏi danh sách). Tab 2: Từ ngày/Đến ngày + bảng lọc Đơn/Nguồn ký/Trạng thái, thẻ phiên ký (thời gian, đơn, nhãn Thành công/Ký một phần/Thất bại/Hết thời gian chờ/Đang chờ, lý do, phương thức, tư cách, n/m tệp, Xem tệp → danh sách tệp Đã ký/Lỗi + Xem). Tab 3: trên điện thoại hiện câu "chưa dùng được USB ký số – vẫn ký từ xa". Màn Khai báo chứng thư số (nguồn, nhà cung cấp, Hủy / Kiểm tra & khai báo). Popup xóa mặc định / xóa chứng thư. Màn mới: signNone, signErr, signDelDef, signDelCert, signHist, signHistOpen, signHistEmpty, signHistBad, signGuide, certCa, certUsb. Test art/t_sk.js.
- 04/11/2026 (v179): Trợ giúp pháp lý theo web /tro-giup-phap-ly (công khai, đọc mã nguồn screens/tro-giup-phap-ly): 2 tab Tra cứu điểm (số lượng) · Điều kiện miễn phí. Tab điểm: khối "Tìm điểm trợ giúp pháp lý" (Tên tổ chức – ô tìm không dấu, Tỉnh/Thành – Tất cả), dòng đếm "n điểm · tỉnh · “từ khóa”", thẻ điểm (loại tổ chức, tên, địa chỉ, chip lĩnh vực, Xem chi tiết; chạm cả thẻ), rỗng "Không tìm thấy điểm trợ giúp pháp lý phù hợp" + Xoá bộ lọc. Chi tiết điểm: Loại tổ chức, Địa chỉ, Người đại diện, Số điện thoại (gọi), Giờ làm việc, Lĩnh vực trợ giúp, "Hoạt động từ", nút Xem vị trí & chỉ đường. Tab điều kiện: khối lưu ý vàng + nút Tra cứu điểm trợ giúp, ô tìm diện, danh sách diện + "Giấy tờ chứng minh" (mặc định "Liên hệ điểm trợ giúp pháp lý để được hướng dẫn"), rỗng "Không tìm thấy diện phù hợp" + Xoá tìm kiếm, lỗi tải. Màn mới: aidNone, aidCond, aidCondNone, aidCondErr. Dữ liệu điểm để ngoặc vuông (lấy từ DM_DIEM_TGPL). Test art/t_tg.js.
- 04/11/2026 (v180): Đánh giá hài lòng – rà soát lại với mã nguồn /danh-gia-hai-long (không đổi so với lúc làm v152; popup.tsx không được dùng). Bổ sung trạng thái lỗi tải từng tab theo web: "Không tải được danh sách hồ sơ chờ đánh giá." / "Không tải được đánh giá đã gửi." / "Không tải được thông tin đánh giá Cổng." / "Không tải được kết quả đánh giá." + Thử lại (màn ratingsErr). Các luồng khác giữ như v152.
- 04/11/2026 (DS v58 · prototype v181): Cập nhật trang design system (DS v58): thêm 11 thành phần từ prototype v145–v180 – ReminderBanner (khối nhắc cam kết nền vàng, hình phải, X tùy chọn), AccountBanner (banner tài khoản tab Cá nhân), TaskRow (Việc cần làm gọn 1 dòng ở Trang chủ), SourceSwitch (2 thẻ nguồn KNTC/QLA), CommitCard (lịch sử cam kết GDĐT), AttachmentSummary (dòng tóm tắt nhiều tệp đính kèm → sheet), CertificateCard, SignSessionCard (Quản lý chữ ký số), PlaceCard (điểm trợ giúp pháp lý), DeadlineBar (thanh thời hạn KNTC), MethodCard (thẻ phương thức giao dịch); mỗi thành phần có README + preview, index.d.ts bổ sung kiểu; README mục "Mẫu mới từ prototype v145–v180". Prototype v181 nhúng bundle DS mới (màn chưa đổi). Còn dùng thành phần sẵn có: Accordion (FAQ gập/mở), RatingStars (chấm sao), Checkbox (chọn vai trò), EmptyState center (lỗi tải).
- 04/11/2026 (v182): Đơn phản tố + đơn yêu cầu độc lập + nộp ý kiến theo web /nop-don-phan-to, /nop-don-yeu-cau-doc-lap, /nop-y-kien-phan-to, /nop-y-kien-yeu-cau-doc-lap (đọc mã nguồn): wizard 6 bước Giải thích · Thông tin vụ án · Các bên · Nội dung yêu cầu · Tài liệu · Xem lại & gửi (ký số bắt buộc + cam đoan), màn gửi thành công (Mã đơn, Thời điểm gửi), 4 màn chặn (qua giai đoạn / không có quyền / đã có bản án / quá hạn), cảnh báo chưa nộp tạm ứng án phí; ý kiến 4 bước Thông báo của Tòa án · Ý kiến (Đồng ý toàn bộ / một phần / Không đồng ý; 10–1000 và 20–2000 ký tự) · Tài liệu · Xem lại & ký gửi, hộp "Bạn đã nộp ý kiến trước đó". Lối vào: chi tiết vụ án theo vai trò (bị đơn: Nộp đơn phản tố; người có QL, NV liên quan: Nộp đơn yêu cầu độc lập; cả hai: "Nộp ý kiến tố tụng" mở bảng chọn đơn), đang có đơn chờ → thông báo. VuAnChiTiet nhận vaiTro. 45 màn mới (nhóm "Phản tố, yêu cầu độc lập"). Test art/t_px.js.
- 04/11/2026 (v183): Đề nghị giám đốc thẩm / tái thẩm theo web /nop-don-giam-doc-tham, /nop-don-tai-tham (đọc mã nguồn): wizard 5 bước Bản án, quyết định (Từ vụ án của tôi | Nhập thông tin bản án; mặc định theo vụ án đã chọn; không có bản án có hiệu lực) · Căn cứ đề nghị (Điều 326 / Điều 352 BLTTDS; tái thẩm thêm "Thời điểm biết được căn cứ" + hạn 01 năm) · Nội dung đề nghị (20–2000 ký tự + cảnh báo không tạm dừng thi hành án) · Tài liệu kèm theo (Thành phần hồ sơ + tài liệu bổ sung) · Xem lại & ký số (ký số CHƯA bắt buộc theo web – KyGuiDon thêm kyTuyChon), màn gửi thành công (Mã tiếp nhận, Bản án đề nghị, Trạng thái), hộp "Đã nộp đơn cho bản án này". Lối vào: Quản lý đơn tab GĐT, nút Đề nghị Giám đốc thẩm / Đề nghị Tái thẩm. 24 màn mới. Test art/t_gx.js.
- 04/11/2026 (v184): Rút đơn / sửa đổi, bổ sung đơn đề nghị GĐT, tái thẩm theo web quan-ly-don/:id/giam-doc-tham-rut-don và giam-doc-tham-sua-doi-bo-sung (đọc mã nguồn). Rút đơn 3 bước Đơn cần rút · Lý do & hệ quả (hệ quả theo loại đơn/tình trạng, thêm "Yêu cầu sửa đổi, bổ sung đang mở" khi RS-21; lý do từ danh mục LYDO_RUTDONGDT – để ngoặc vuông; "Lý do khác" bắt buộc trình bày ≥15 ký tự) · Xác nhận & ký gửi. Sửa đổi, bổ sung 4 bước Bản án, vụ án & thông báo (đơn đang có yêu cầu, hạn 30 ngày, hậu quả) · Nội dung (20–2000 ký tự) · Tài liệu · Xem lại & ký nộp; màn đã gửi. Chi tiết đơn GĐT: nút Rút đơn; biến thể gdtDetailFix (Yêu cầu sửa đổi, bổ sung đơn) có nút Sửa đổi, bổ sung đơn + Rút đơn. 25 màn mới. Test art/t_gr.js.
- 04/11/2026 (v185): Khiếu nại, tố cáo trong vụ án theo web /khieu-nai-to-cao/nop-don-trong-vu-an?kind=&tongDatId= (đọc mã nguồn trong-vu-an/qd, hv-tc, chung). Quyết định tố tụng: vụ án đã chọn thu gọn 1 dòng + Đổi vụ án / Giữ vụ án hiện tại; văn bản chia nhóm Còn trong thời hiệu (đếm) · Đã nộp đơn khiếu nại (mờ, kèm mã hồ sơ) · Đã hết thời hiệu (thu gọn) · Chưa mở khiếu nại qua Cổng; "Thủ tục bạn đã chọn" = Gửi tới + Thời hiệu (qd), chỉ Gửi tới (hv, tc); mở từ Hộp thư (kqd1Tong, chọn sẵn văn bản); chưa có vụ án (kqd1Empty). Khiếu nại/tố cáo lần hai (?hoSoGocMa=): khối hồ sơ lần đầu thay phần chọn, Gửi tới Tòa án cấp trên, tài liệu "Đơn … lần 2" (kqd/khv/ktv 1L–4L). Không gắn vụ án (khv/ktv 1Kg–4Kg): Tòa án, số hồ sơ khai, "Chính tôi tự khiếu nại", Tư cách tố tụng của bạn (bắt buộc) → người bảo vệ phải tải giấy tờ chứng minh tư cách. Hết thời hiệu hành vi (khv1Het): trở ngại khách quan + lý do ≥20 ký tự. Tố cáo: giữ bí mật danh tính mặc định bật + mô tả. Xem lại theo web (Loại việc, Tòa án, Ngày biết, Thủ tục áp dụng, Tư cách, Bảo vệ người tố cáo). Màn đã gửi: Mã hồ sơ, Mã tiếp nhận tại Tòa án, Vụ án, Cơ quan giải quyết, Trạng thái + Thời hạn giải quyết; biến thể tố cáo, lần hai, gửi lỗi. Sửa lỗi: chữ hướng dẫn ô nhập (helper→help) trước đây không hiện. Nút "Khiếu nại lần hai" (tố tụng) nay vào kqd1L; bản nháp "KN Hành vi" vào khv1. 27 màn mới.
- 04/11/2026 (v186): Đăng ký người bảo vệ theo web /dang-ky-nguoi-bao-ve (đọc mã nguồn index, bieu-mau, khoi-nhap, tong-hop, buoc-ky, quy-tac, ban-xem). Lối vào: Theo dõi vụ án, vụ việc › thẻ "Đăng ký người bảo vệ" đặt sau Giao nộp tài liệu, chứng cứ (chọn C; minh họa uyQuyen). Danh sách: nút Đăng ký người bảo vệ, tìm mã đăng ký/mã hồ sơ/người bảo vệ, chip Tất cả · Đã gửi đăng ký · Chấp nhận · Từ chối (có đếm), thẻ (mã, trạng thái, mã hồ sơ, Tòa án, người bảo vệ, bảo vệ cho, tư cách, ngày gửi; nháp có Tiếp tục soạn), "Hiển thị n / N đăng ký", màn trống. Biểu mẫu 5 bước, 2 luồng theo Người thực hiện đăng ký (Tôi là đương sự | Tôi là người bảo vệ; đổi thì về bước 1 luồng kia): đương sự = Thông tin người đăng ký (Loại hồ sơ, Đơn/vụ án, thẻ hồ sơ, thông tin người đăng ký chỉ xem) · Người bảo vệ (CCCD, họ tên, ngày sinh → Xác thực → giới tính, quốc tịch, dân tộc, địa chỉ) + Tư cách bảo vệ (Luật sư / Trợ giúp viên / Đại diện lao động – chỉ hành chính / Công dân Việt Nam, trường con theo tư cách) · Tải tài liệu chứng minh (tên file + loại Bản gốc/Bản photo/Bản chụp – TaiLieuCard thêm tùy chọn loai) · Xem lại (4 nhóm + Gửi Tòa án có thẩm quyền, khóa) · Ký số (Xem đăng ký, Xem bản in, Người ký, Nộp đăng ký); người bảo vệ = Thông tin người bảo vệ · Thông tin đương sự (mã nhập tự do, ô hành chính, đương sự được bảo vệ, vai trò tố tụng) + Tư cách · … · Xem lại có chọn Tòa án nhận đăng ký. Màn Nộp đăng ký thành công; xem đăng ký Đã gửi / Chấp nhận / Từ chối (lý do từ chối, ngày gửi, ngày có kết quả, đã ký số, xem bản đã ký). 25 màn mới. Test art/t_bv.js. Sửa lỗi đóng gói: bản v185 chứa trùng mã s5 (thừa ~330 KB, không đổi hành vi) – v186 đã bỏ phần trùng, deploy.py thêm kiểm tra chống trùng.
- 04/11/2026 (v187): Hộp thư tống đạt – thẻ thư rộng 100% màn hình, chọn A · Danh sách liền mạch: danh sách tràn hết bề ngang (bỏ lề 16px hai bên; ô tìm, nút lọc, chip giữ nguyên), các thư nối liền trên nền trắng, ngăn bằng đường kẻ mảnh, không bo góc; thư chưa đọc nền đỏ nhạt (--brand-tint) + vạch đỏ 3px bên trái (--brand-800), vẫn giữ chấm đỏ + chữ đậm; bỏ đường kẻ trên dòng Hạn xử lý; nút ★/lưu trữ nền trong suốt. Phương án B (khối tràn viền cách 8px) không chọn.
- 04/11/2026 (v188): Theo dõi vụ án, vụ việc gom 2 nhóm thẻ không tiêu đề, tách bằng khoảng cách 24px (nhóm 1: Danh sách đơn và tiến trình, Hòa giải đối thoại, Giao nộp tài liệu chứng cứ, Đăng ký người bảo vệ; nhóm 2: Vụ án của tôi, Vụ việc của tôi, Nghĩa vụ tài chính). Hộp thư tống đạt: thư chưa đọc bỏ nền đỏ nhạt và vạch đỏ trái – chỉ còn chấm đỏ + chữ đậm.
- 04/11/2026 (v189): Cá nhân – đổi nhãn mục "Thay đổi phương thức giao dịch điện tử" thành "Phương thức giao dịch điện tử" (FAQ cập nhật theo); tiêu đề màn bên trong giữ nguyên.
- 04/11/2026 (v190): Trang chủ › Dịch vụ và hỗ trợ sắp xếp lại 7 ô: Đăng ký lịch tiếp dân (bổ sung, mở bảng chọn Tiếp công dân) · Lịch, phiên tòa · Cấp trích lục, bản sao · Khiếu nại, tố cáo | Chữ ký số · Phương thức giao dịch · Trợ giúp pháp lý. Bỏ ô Phản ánh, kiến nghị. Bỏ ô Đánh giá – dùng mục "Đánh giá mức độ hài lòng" ở Cá nhân.
- 04/11/2026 (v191): Việc cần làm (màn riêng) – thẻ mới theo ảnh: ô biểu tượng trái (màu theo mức hạn), nhãn loại chip xám + mã hồ sơ, tiêu đề đậm, dòng "Còn n ngày · hạn dd/mm/yyyy" tô theo mức, kẻ mảnh, liên kết hành động đỏ có mũi tên (Xem văn bản, Bổ sung hồ sơ, Nộp tạm ứng…); thẻ ở Trang chủ giữ nguyên. Trang chủ › Dịch vụ và hỗ trợ bỏ thêm 3 ô Chữ ký số, Phương thức giao dịch, Trợ giúp pháp lý – còn 4 ô: Đăng ký lịch tiếp dân · Lịch, phiên tòa · Cấp trích lục, bản sao · Khiếu nại, tố cáo.
- 04/11/2026 (v192): Trang chủ › ô Đăng ký lịch tiếp dân – bỏ thao tác mở bảng chọn Tiếp công dân; bấm ô chỉ hiện thông báo "Chức năng đang được phát triển".
- 04/11/2026 (v193): Trang chủ (và Việc cần làm – xem tất cả) › ô Cấp trích lục, bản sao vào thẳng màn Theo dõi yêu cầu trích lục, bản sao (copyList); ô Khiếu nại, tố cáo vào thẳng màn danh sách Khiếu nại — Tố cáo (complaints) – không qua bảng chọn. Bảng chọn ở tab Nộp đơn giữ nguyên.
- 04/11/2026 (v194): Danh sách đơn và tiến trình (cả tab Giám đốc thẩm, tái thẩm) – bỏ dòng mô tả "Theo dõi trạng thái và việc cần làm cho tất cả đơn bạn đã tạo."
- 04/11/2026 (v195): Hàng trạng thái + sắp xếp dùng chung StRow, cùng kiểu Hộp thư tống đạt (chip nhỏ 32px bên trái, cuộn ngang khi nhiều, số đếm xám – không hiện ở "Tất cả", nút chữ "Mới nhất" có biểu tượng bên phải mở bảng chọn Sắp xếp). Áp cho: Danh sách đơn và tiến trình (bỏ nút sắp xếp biểu tượng cạnh ô tìm; sắp xếp Mới nhất / Mã tiếp nhận), Cấp trích lục bản sao, Khiếu nại tố cáo trong tố tụng, Đăng ký người bảo vệ, Trung tâm thông báo (Tất cả / Chưa đọc / Đã đọc; nút Đánh dấu tất cả đã đọc xuống dòng dưới). Không đổi: chip phân loại (Việc cần làm, Nghĩa vụ tài chính, Loại lịch, Phương thức, Tin tức, FAQ) và chip sắp xếp của Hòa giải.
- 04/11/2026 (v196): Theo dõi vụ án, vụ việc – chọn A · Danh sách dòng (B lưới 2 cột thẻ gọn, C lưới ô dịch vụ 4 cột không chọn): giữ 2 nhóm v188, mỗi nhóm 1 khối trắng bo góc; mỗi chức năng 1 dòng – minh họa tròn 44px, tên 15/21 đậm vừa + mô tả 12/16 xám, mũi tên >; kẻ mảnh giữa các dòng; cả màn vừa 1 khung không cần cuộn.
- 04/11/2026 (v197): Cá nhân – chữ các mục menu (Cam kết giao dịch điện tử … Đăng xuất) 14px/20px (trước 16px/24px).
- 04/11/2026 (v198): Danh sách đơn và tiến trình – thay thanh tab loại đơn bằng bộ lọc, chọn C: thanh "Đang xem: <loại đơn> · n đơn" có biểu tượng phễu + liên kết "Đổi loại đơn" (trên ô tìm) → bảng "Xem loại đơn": 6 loại, mỗi loại có mô tả ngắn dễ hiểu cho công dân + số đơn. Áp cho mọi biến thể màn (đơn khởi kiện, GĐT tái thẩm, xác nhận thêm). Phương án A (ô chọn) và B (lưới thẻ) không chọn.
- 04/11/2026 (v199): Lịch, phiên tòa thiết kế lại theo web /lich (đọc mã nguồn lich/index.tsx, phien-toa.tsx, modals, components/phien-vu-an-section, cai-dat-thong-bao-nhan, canh-bao-hoan-khan-cap, canh-bao-trung-lich) – bỏ hẳn thiết kế cũ (Lịch cá nhân / Phiên tòa, phiên họp, bảng chọn Tham dự và Lịch và nhắc việc). Màn "Quản lý lịch, phiên tòa" 4 tab: Lịch, phiên tòa (ô tìm, chip 5 loại sự kiện bật/tắt, CalendarCard Tháng/Tuần/Danh sách, khung "Ngày dd/mm/yyyy · n việc trong ngày" với thẻ viền trái màu loại – loại, giờ, tiêu đề, hình thức · địa điểm · tòa án, nút Xem giấy triệu tập / Vào phòng chờ / Xem phiếu hẹn; Danh sách sự kiện trong kỳ; bảng Chi tiết sự kiện lịch) · Buổi phải dự (cảnh báo phiên hôm nay bị hoãn, tìm + bộ lọc Tòa án/Hình thức/Thời gian, thẻ phiên: loại, trạng thái, vụ án, tư cách, giờ + đếm ngược, hình thức, tòa án, giấy triệu tập, trạng thái phản hồi, nút Phản hồi tham dự / Vào phòng chờ / Xem giấy triệu tập; cảnh báo khẩn hoãn; cảnh báo trùng lịch) · Phiên đã diễn ra (Đã tham dự/Đã hoãn/Vắng mặt, kết quả, Xem quyết định/biên bản/thông báo hoãn) · Nhắc lịch (nhắc trước 1/3/5/7 ngày theo nhãn văn bản, Lưu cài đặt). Chi tiết phiên tòa (thông tin, văn bản ấn định, tham dự trực tuyến – mã phòng, mật khẩu, nội quy, phản hồi tham dự, lịch sử tố tụng; biến thể hoãn khẩn), Phản hồi tham dự (có mặt + điểm cầu / báo vắng + lý do, chi tiết ≥50 ký tự, tài liệu ≤3 tệp), Phòng chờ trực tuyến (kiểm tra camera, micrô, đường truyền). Màu 5 loại sự kiện dùng bảng màu nhãn DS (tp-tag 9, 8, 10, 1, 6). 20 màn (thay 3 màn cũ + 2 bảng chọn). Test art/t_lc.js.
- 04/11/2026 (v200): Bảng "Xem loại đơn" – bỏ dòng mô tả; mỗi dòng chỉ còn tên loại đơn + số đơn (ô số xám bên phải, trước dấu chọn).
- 04/11/2026 (v201): Bảng "Xem loại đơn" – bỏ dấu tích ở loại đơn đang chọn; loại đang chọn vẫn tô chữ đỏ.
- 04/11/2026 (v202): Theo dõi vụ án, vụ việc – dòng "Danh sách đơn và tiến trình" bấm để mở rộng/thu gọn (mũi tên xoay), hiện 6 loại đơn (tên + số đơn, cùng kiểu bảng Xem loại đơn); chọn loại → màn Danh sách đơn của loại đó (thanh "Đang xem" đã chọn sẵn, vẫn đổi được loại). 6 màn appK_<loại>.
- 04/11/2026 (v203): Danh sách đơn và tiến trình – chọn A: gộp chọn loại đơn vào header (nút quay lại · dòng nhỏ "Danh sách đơn và tiến trình" · tên loại đơn 18px đậm + ▾, tối đa 2 dòng, không hiện số lượng; bấm mở bảng Xem loại đơn) và nút chính "+ Nộp đơn" bên phải đúng chuẩn DS (Button primary, cao 46px = button-height, đệm 22px). Bỏ thanh "Đang xem" có biểu tượng phễu và nút + trên thanh tiêu đề cũ. Áp cho mọi màn danh sách đơn (theo loại, GĐT tái thẩm, xác nhận nộp thêm). Phương án B (ô chọn + nút nổi) và C (ô chọn + nút cùng hàng) không chọn.
- 04/11/2026 (v204): Danh sách đơn – nút "+ Nộp đơn" trên header chuyển sang cỡ sm của DS (cao 36px, đệm 16px, bo radius-sm).
- 04/11/2026 (v205): Nút "Lưu nháp" trên thanh tiêu đề mọi luồng soạn đơn → chuyển về danh sách của chức năng, kèm thanh thông báo. Nộp đơn khởi kiện và đơn phát sinh từ chi tiết đơn khởi kiện (miễn giảm án phí, rút đơn, sửa đơn, thay đổi/rút yêu cầu, BPKCTT, khiếu nại trả lại đơn) → Danh sách đơn và tiến trình · Đơn khởi kiện. Đề nghị GĐT/tái thẩm, rút/sửa đổi bổ sung đơn GĐT/tái thẩm → · Đơn giám đốc thẩm, tái thẩm. Phản tố, YCĐL, ý kiến về phản tố/YCĐL → · Đơn phản tố, yêu cầu độc lập. Thông báo "Đã lưu nháp đơn.". Trích lục, bản sao → Theo dõi yêu cầu ("Đã lưu nháp yêu cầu."). Khiếu nại/tố cáo/kiến nghị hành chính → Khiếu nại — Tố cáo (hành chính); khiếu nại, tố cáo trong tố tụng → danh sách trong tố tụng. Đăng ký người bảo vệ → danh sách đăng ký. Sao gửi tài liệu và yêu cầu sao chụp hồ sơ không đổi (không phải luồng soạn đơn).
- 04/11/2026 (v206): Danh sách đơn và tiến trình – đưa trạng thái đơn vào bộ lọc, chọn B: bỏ hàng chip trạng thái; thay bằng nút "Bộ lọc" (biểu tượng phễu, viền tròn, cao 36px) mở bảng từ đáy "Bộ lọc" gồm nhóm "Trạng thái đơn" dạng chip có số đơn (Tất cả, Chưa gửi, Chờ ký số, Đã gửi đơn, Đang giải quyết, Đã giải quyết) + chân bảng Xóa lọc (phụ) / Áp dụng (chính); chỉ lọc khi bấm Áp dụng, đóng bảng không đổi. Khi đang lọc: nút Bộ lọc nền brand-tint viền đỏ + huy hiệu số 1, bên cạnh có chip trạng thái ✕ để bỏ lọc nhanh. "Sắp xếp" giữ bên phải. Chỉ áp cho danh sách đơn (mọi loại đơn); các danh sách khác (trích lục, đăng ký người bảo vệ, thông báo…) giữ hàng chip. Phương án A (ô "Trạng thái: … ▾") và C (ô chung "Lọc và sắp xếp") không chọn.
- 04/11/2026 (v207): Hành động theo trạng thái – theo bảng map "Hanh_dong_theo_trang_thai" (122 dòng, 4 nhóm). (1) Trạng thái đơn đổi tên theo bảng map: ST-03 "Đang xử lý", ST-04 "Đã xử lý" (chip bộ lọc, thẻ đơn, chi tiết đơn, hòa giải, KNTC). (2) Dữ liệu demo đủ hành động: Danh sách đơn (khởi kiện DS/HC, việc dân sự, kháng cáo, phản tố, YCĐL, GĐT/TT – tình trạng RS theo tên bảng map); Vụ án của tôi (thêm 18 vụ án HC + 21 vụ án DS theo GS-xx); Vụ việc của tôi vẽ lại kiểu thẻ vụ án (13 vụ việc DS + phá sản); Hòa giải đối thoại (12 hồ sơ RS-03/10/11/13/14/15/31); KNTC trong tố tụng (RS-46 Xem Lịch, RS-49 Khiếu nại lên Chánh án). Dòng «Giữ nguyên» của vụ án: trạng thái "Đang xử lý đơn", tình trạng "Tòa án đã nhận đơn". (3) Thẻ hiện TẤT CẢ hành động của tình trạng (1 nút: bên phải chân thẻ; nhiều nút: xếp dọc rộng hết thẻ, nhãn theo bảng map); các "Xem Lịch" (002/003/005/036/037/040) gộp 1 nút. Nút nộp tiền bị khóa khi quá hạn. (4) Nối màn: nghĩa vụ tài chính → Nghĩa vụ tài chính; sửa đổi bổ sung → Sửa đơn theo yêu cầu; khiếu nại trả lại đơn/BPKCTT/rút gọn → Khiếu nại QĐ tố tụng (từ tống đạt); 008 → Khiếu nại lần hai; GĐT/TT → Đề nghị GĐT/TT; sửa đổi GĐT → Sửa đổi bổ sung đơn GĐT; phản tố/YCĐL → Đơn phản tố/YCĐL; 025 → Giao nộp tài liệu; hòa giải → trả lời lựa chọn/đổi HGV/hoãn phiên/xem xét lại; Xem Lịch → chi tiết phiên tòa (sắp/đã hoãn) hoặc chi tiết sự kiện lịch. Báo "Chức năng đang được phát triển": 029, 030, 031, 035, 047, 048, 050, 051, 052, 053, 054. (5) Màn mới vẽ theo web: Nộp đơn kháng cáo (5 bước), Sửa đơn kháng cáo theo yêu cầu (4 bước), Trình bày lý do kháng cáo quá hạn (4 bước), Nộp ý kiến đối với kháng cáo – YCNEUYEKIEN (4 bước), Cung cấp tài liệu, chứng cứ theo yêu cầu – Mẫu 12-DS (3 bước), Đề nghị thay đổi / hủy bỏ BPKCTT (4 bước mỗi loại), Bổ sung hồ sơ đơn phản tố (4 bước), kèm màn đã gửi; Đề nghị hoãn phiên tòa → Chi tiết vụ án mở tab Đơn trong vụ án, cuộn tới và làm nổi nhóm "Đơn yêu cầu khác". Lưu nháp các luồng mới về danh sách tương ứng.
- 04/11/2026 (v208): Danh sách đơn và tiến trình – nút chính trên header bỏ biểu tượng "+", đổi nhãn thành "Nộp đơn mới" (giữ Button primary cỡ sm 36px).
- 04/11/2026 (v209): Danh sách đơn – dải "n đơn cần bạn xử lý" đổi theo kiểu khối Cam kết giao dịch điện tử, chọn B: nền vàng nhạt (warning-tint), viền vàng (warning-border), bo radius-lg; hình minh họa chuông (Illustration nhacViec, 44px) bên trái; một đoạn chữ (tiêu đề đậm + mô tả xám) kèm liên kết "Xem ngay →"; nút đóng ✕ góc trên phải như khối cam kết. A (nút đỏ + hình lớn bên phải) và C (hình đồng hồ) không chọn.
- 04/11/2026 (v210): Danh sách đơn – đổi vị trí: "Sắp xếp" (Mới nhất) sang trái, nút "Bộ lọc" sang phải; chip trạng thái đang lọc (✕) nằm ngay trước nút Bộ lọc.
- 04/11/2026 (v211): Hộp thư tống đạt – hàng lọc/sắp xếp như Danh sách đơn: trái "Sắp xếp" (Mới nhất), phải nút "Bộ lọc" (phễu, huy hiệu số điều kiện đang lọc). Bỏ hàng chip trạng thái đọc; "Trạng thái đọc" (Tất cả / Chưa đọc n / Đã đọc) chuyển vào đầu bảng "Bộ lọc hộp thư" (Nhập lại xóa cả trạng thái đọc). Bỏ nút phễu cạnh ô tìm; nút Phân loại thư (nhãn văn bản) vẫn bên phải ô tìm.
- 04/11/2026 (v212): Hộp thư tống đạt – icon nút Phân loại thư (nhãn văn bản) cạnh ô tìm đổi sang màu xám (ink-muted), đồng bộ với icon tìm kiếm và nút Bộ lọc; khi đang lọc vẫn có chấm đỏ.
- 04/11/2026 (v213): Thẻ đơn ở Danh sách đơn và tiến trình – sắp lại thứ tự: hàng 1 Trạng thái đơn · Tình trạng đơn · Mã tiếp nhận (bên phải, xuống dòng khi dài) → Tên đơn (15px đậm) + ☆ → các bên dạng 2 cột (Nguyên đơn:, Bị đơn: / Người yêu cầu:…; đơn kháng cáo, phản tố… hiện dòng mô tả) → khối "Việc cần làm": mỗi hành động một thẻ riêng kiểu Việc cần làm ở Trang chủ (biểu tượng theo loại việc, tên việc, "Hạn xử lý · Còn n ngày" màu theo mức hạn, ›), mỗi việc có hạn riêng; Ký số và Tiếp tục soạn cũng thành thẻ việc ("Không có thời hạn"); việc nộp tiền quá hạn bị khóa mờ. Bỏ ô lĩnh vực (DS/HC…), nhãn vai trò và ngày gửi trên thẻ. Đơn không có việc vẫn có nút "Xem đơn".
- 04/11/2026 (v214): Việc cần làm trên thẻ đơn – làm nổi, chọn A: tiêu đề "Việc cần làm" kèm huy hiệu đỏ số việc; mỗi thẻ việc tô nền + viền theo mức hạn (xanh success-tint: còn lâu, vàng warning-tint: sắp hết hạn, đỏ danger-tint: quá hạn, xám: không có thời hạn); hạn ghi dưới tên việc. B (khối nền đỏ nhạt + pill hạn) và C (việc đầu dạng nút đỏ đặc) không chọn.
- 04/11/2026 (v215): Danh sách đơn – thêm 2 đơn khởi kiện mẫu có 2 việc cùng lúc, mỗi việc một hạn riêng (DS: Nộp tạm ứng án phí còn 3 ngày + Nộp tạm ứng chi phí tố tụng còn 9 ngày; HC: Sửa đổi, bổ sung đơn còn 2 ngày + Nộp tạm ứng án phí quá hạn 1 ngày – khóa); khóa việc nộp tiền theo hạn riêng của từng việc. Bỏ huy hiệu số việc cạnh tiêu đề "Việc cần làm". Cột nhãn các bên co theo nhãn dài nhất (Người khởi kiện:, Người bị kiện: không xuống dòng).
- 04/11/2026 (v216): Danh sách đơn – rà dữ liệu theo bảng map (nhóm Đơn): mỗi tình trạng RS của từng loại đơn = 1 thẻ đơn, có đủ các việc của tình trạng đó, mỗi việc 1 thẻ và 1 hạn riêng (bổ sung hạn cho RS-05 phản tố/YCĐL và GĐT/TT phiên tòa hoãn); giữ các đơn chưa có tình trạng xử lý (lưu nháp, chờ ký số, đã gửi chờ xem xét) và 2 đơn mẫu 2 việc. Bỏ mũi tên › ở các thẻ việc cần làm trên thẻ đơn.
- 04/11/2026 (v217): Danh sách đơn – dải "n đơn cần bạn xử lý" đổi màu, chọn A: nền đỏ nhạt thương hiệu (brand-50 #FFF2F0), viền brand-200 (#FFC6C0) để không trùng màu vàng của trạng thái Chờ ký số / hạn sắp hết. B (tím nhạt) và C (trắng + vạch đỏ trái) không chọn.
- 04/11/2026 (v218): Thẻ việc cần làm trên thẻ đơn – bỏ biểu tượng việc bên trái; còn tên việc + "Hạn xử lý · …" trên nền màu theo mức hạn.
- 04/11/2026 (v219): Thẻ đơn – nhãn trạng thái đơn bỏ dấu chấm; nút ☆ đánh dấu quan trọng chuyển về góc phải hàng trạng thái (chọn A; B góc phải trên thẻ, C trước tên đơn không chọn); mã tiếp nhận xuống dòng riêng "Mã tiếp nhận: …" trước tên đơn. Hàng trạng thái luôn 1 dòng: tình trạng dài cắt bằng "…" (xem đủ ở chi tiết đơn).
- 04/11/2026 (v220): Thẻ đơn – đổi vị trí: tên đơn ngay dưới hàng trạng thái, dòng "Mã tiếp nhận: …" xuống dưới tên đơn (trước các bên).
- 04/11/2026 (v221): Thẻ đơn – "Mã tiếp nhận" đưa vào cùng khối nhãn – giá trị với các bên (cột nhãn xám 13px, giá trị đậm vừa 13px, thẳng cột), đồng nhất kiểu chữ với Nguyên đơn / Bị đơn.
- 04/11/2026 (v222): Thẻ đơn – đơn đã đánh dấu quan trọng: biểu tượng ☆ tô vàng đặc (#F5B400, viền #E0A100); chưa đánh dấu giữ ☆ viền xám.
- 04/11/2026 (v223): ☆ đã đánh dấu trên thẻ đơn – viền và nền cùng màu vàng #F5B400.
- 04/11/2026 (v224): Danh sách đơn – bảng "Bộ lọc": nhóm Trạng thái đơn đổi từ chip sang danh sách dòng (tên trái, số đơn phải dạng pill xám; dòng đang chọn chữ đỏ đậm + dấu tích; ngăn bằng đường kẻ mảnh); vẫn chỉ lọc khi bấm Áp dụng, Xóa lọc về Tất cả.
- 04/11/2026 (v225): Thẻ đơn – bỏ nút "Xem đơn" ở đơn không có việc cần làm (trùng với bấm vào thẻ để xem chi tiết).
- 04/11/2026 (v226): Thẻ đơn yêu cầu việc dân sự – bổ sung dòng "Người bị yêu cầu" dưới "Người yêu cầu" (cùng khối nhãn – giá trị); việc không có người bị yêu cầu (thuận tình ly hôn) hiện "—".
- 04/11/2026 (v227): Thẻ đơn yêu cầu phá sản, phục hồi – nhãn "Doanh nghiệp" đổi thành "Tổ chức, doanh nghiệp bị yêu cầu". Cột nhãn khối các bên rộng tối đa ~45% thẻ, nhãn dài tự xuống dòng.
- 04/11/2026 (v228): Thẻ đơn – mọi loại đơn hiển thị thông tin dạng nhãn – giá trị đồng nhất: kháng cáo / phản tố / YCĐL (Vụ án, Số thụ lý nếu có, Tòa án), GĐT/TT (Bản án, Tòa án). Bổ sung dòng "Vai trò" ngay sau Mã tiếp nhận cho mọi thẻ (Người khởi kiện, Người đồng khởi kiện, Người yêu cầu, Chủ nợ, Người kháng cáo, Bị đơn, Người có quyền lợi, nghĩa vụ liên quan, Người đề nghị).
- 04/11/2026 (v229): Thẻ đơn – thứ tự dòng: Mã tiếp nhận → Vụ án (hoặc Bản án với GĐT/TT) → Vai trò → Số thụ lý / các bên; bỏ dòng Tòa án.
- 04/11/2026 (v230): Thẻ đơn phản tố – bỏ dòng Số thụ lý (còn Mã tiếp nhận → Vụ án → Vai trò).
- 04/11/2026 (v231): Chi tiết đơn (khởi kiện, việc dân sự…) – tên đơn ở đầu trang giảm từ 18px xuống 16px (dòng 24px); chi tiết vụ án và các màn chi tiết khác giữ 18px.
- 04/11/2026 (v232): Logic chung mọi màn chi tiết (đơn các loại, vụ án, vụ việc, hòa giải, khiếu nại tố cáo, trích lục, nghĩa vụ tài chính, đăng ký người bảo vệ…): luôn hiển thị đủ nhãn; giá trị trống (null, rỗng, "—") hiển thị gạch ngắn "-" (áp trong khối nhãn – giá trị RvKV / InfoList và thẻ đơn). Khối "Các bên trong đơn / vụ án": mỗi đương sự luôn đủ Số CCCD (tổ chức: Mã số thuế) · Điện thoại · Địa chỉ như web, thiếu thì "-". Thay toàn bộ chữ mẫu trong ngoặc vuông trên các màn chi tiết bằng dữ liệu mẫu cụ thể (nội dung kháng cáo, căn cứ GĐT, lý do trả lại đơn / tạm đình chỉ, quyết định kháng nghị, nội dung khiếu nại – tố cáo, khoản phải nộp, điểm TGPL, số biên nhận…).
- 04/11/2026 (v233): Khối việc cần làm ở đầu các màn chi tiết (đơn khởi kiện, kháng cáo, phản tố, hòa giải, khiếu nại…) – chọn B: banner đỏ nhạt thương hiệu (brand-50, viền brand-200, như dải "đơn cần bạn xử lý"), hình minh họa chuông 44px bên trái, tiêu đề 14px đậm + mô tả 13px xám, hạn dạng pill vàng đậm (warning) có biểu tượng đồng hồ, các nút cùng hàng. A (thẻ việc tô màu theo hạn) và C (dải hạn trên đầu) không chọn.
- 04/11/2026 (v234): Mọi màn chi tiết – khối nhãn – giá trị theo mẫu thẻ chứng thư số: nhãn xám 13px cột trái (tự co, tối đa 42%), giá trị 13px đậm vừa căn trái thẳng cột, khoảng cách dòng 6px, bỏ đường kẻ giữa các dòng (áp RvKV và InfoList rows; không áp cho bước soạn đơn có thanh bước và màn kết quả). Thẻ đương sự (Các bên trong đơn / vụ án): bỏ ô chữ tắt; dòng vai trò nhỏ xám ở trên, tên 15px đậm, nhãn "Bạn" bên phải; các dòng Số CCCD / Điện thoại / Địa chỉ… cùng kiểu nhãn – giá trị.
- 04/11/2026 (v235): Mobile không có USB ký số – bỏ mọi phần liên quan USB và thiết kế lại ký số: (1) Bảng ký số (mọi luồng ký): bỏ chọn "Ký từ xa / USB ký số"; tiêu đề "Ký số từ xa (n tệp)", danh sách tệp, nhóm "Nhà cung cấp chữ ký số" chọn sẵn nhà cung cấp mặc định (nhãn "Mặc định"), ghi chú chỉ hỗ trợ ký số từ xa; bấm Ký → bước "Xác nhận ký trên ứng dụng" (biểu tượng điện thoại, "Đã gửi yêu cầu ký đến …", hướng dẫn mở ứng dụng ký số của nhà cung cấp, pill đếm ngược 5 phút, Hủy yêu cầu / Tôi đã xác nhận). (2) Quản lý chữ ký số: còn 2 tab "Chứng thư số" · "Lịch sử ký" (bỏ tab và màn Hướng dẫn cài USB ký số); thêm ghi chú "Ký số từ xa trên điện thoại"; khối "Chứng thư ký mặc định" bỏ chọn nguồn ký; lọc lịch sử bỏ "Nguồn ký". (3) Khai báo chứng thư: chỉ ký số từ xa – nhà cung cấp + "Tài khoản ký số từ xa" (số điện thoại / mã định danh đã đăng ký); bỏ màn khai báo USB. (4) Hướng dẫn sử dụng: "Hướng dẫn cài USB ký số" → "Hướng dẫn ký số từ xa".
- 04/11/2026 (v236): Khối việc cần làm ở đầu các màn chi tiết – thêm lề trái/phải 16px (trên 12px, dưới 4px); nền đổi sang vàng nhạt (warning-tint) + viền vàng mảnh (warning-border), chọn A (B vạch vàng trái, C vàng ấm + hạn đỏ không chọn); pill hạn vàng đậm giữ nguyên; nút dài tự xuống dòng trong khối.
- 04/11/2026 (v237): Chi tiết đơn – khối "Các bên trong đơn" thêm dữ liệu mẫu: người bị kiện là tổ chức (Công ty TNHH Thương mại An Phú – Mã số thuế, Điện thoại, Địa chỉ, Người đại diện theo pháp luật) và người có quyền lợi, nghĩa vụ liên quan (Lê Thị Hoa – Số CCCD, Điện thoại, Địa chỉ). Thẻ đương sự: cột nhãn tối đa 40%, nhãn dài tự xuống dòng.
- 04/11/2026 (v238): Chi tiết đơn – khối "Nội dung yêu cầu" hiển thị theo 2 cách nhập ở bước 4 Soạn đơn: (1) Nhập thông tin: dòng "Cách nhập nội dung: Nhập thông tin", nội dung đã nhập trong khung nền xám (thu gọn ~5 dòng, mờ dần, "Xem đầy đủ / Thu gọn"), thẻ "Bản in đơn khởi kiện" do hệ thống tạo (PDF, Đã ký số, nút Xem); (2) Tải đơn có sẵn: dòng "Cách nhập nội dung: Tải đơn có sẵn", thẻ tệp (biểu tượng PDF, tên tài liệu, tên tệp · dung lượng, Loại tài liệu, Đã ký số, nút Xem / Tải về) + ghi chú "Nội dung đơn nằm trong tệp bạn đã tải lên". Dữ liệu trộn: chi tiết mặc định / chờ ký số / tạm ứng án phí → Nhập thông tin; đã thụ lý / trả lại đơn / án phí quá hạn → Tải đơn có sẵn; thêm 2 màn xem riêng từng cách.
- 04/11/2026 (v239): Sửa lỗi màn chi tiết (đơn, vụ án, kháng cáo…): khi cuộn xuống, thanh tab dính sát thanh tiêu đề (top -8px bù đệm trên của vùng cuộn), không còn hở lộ nội dung giữa tiêu đề và tab.
- 04/11/2026 (v240): Chi tiết đơn khởi kiện: bỏ số lượng ở các tab (Danh sách đơn, Tài liệu chứng cứ, Văn bản tống đạt); các màn chi tiết khác giữ nguyên.
- 04/11/2026 (v241): Chi tiết đơn khởi kiện, tab Danh sách đơn: thẻ đơn đồng bộ kiểu thẻ ở màn Danh sách đơn (chọn A) – nhãn trạng thái trên cùng, tên đơn đậm, nhãn – giá trị (Loại đơn, Mã tiếp nhận, Ngày gửi/Lưu nháp); đơn nháp có khối Việc cần làm "Tiếp tục soạn"; bấm thẻ nháp mở màn soạn. Chỉ áp dụng màn này.
- 04/11/2026 (v242): Chi tiết đơn khởi kiện, tab Danh sách đơn: bỏ khối "Tạo đơn liên quan", thay bằng nút "+ Tạo đơn liên quan đến vụ việc". Bấm nút mở bảng từ đáy "Chọn loại đơn cần tạo" (chọn C3 + D3): tên nhóm ngắn (Khởi kiện / Biện pháp khẩn cấp / Án phí, lệ phí / Yêu cầu khác), bỏ mô tả nhóm; mỗi nhóm một khối nền xám; mỗi dòng = biểu tượng tờ đơn + huy hiệu tròn màu theo nhóm (đỏ / xanh dương / vàng / xanh lục) có biểu tượng hành động riêng (bổ sung, sửa, đổi, rút, khiên, ví, gửi) + tên loại đơn; bấm dòng mở màn soạn tương ứng. Không dùng lại hình minh họa của trang chủ, menu.
- 04/11/2026 (v243): Chi tiết đơn khởi kiện, tab Danh sách đơn: nút "+ Tạo đơn liên quan đến vụ việc" ghim ở thanh cuối màn (không cuộn theo nội dung), chỉ hiện khi đang chọn tab Danh sách đơn; các tab khác không có thanh này.
- 04/11/2026 (v244): Chi tiết đơn khởi kiện, tab Tài liệu chứng cứ: tiêu đề nhóm chỉ còn thứ + ngày ("Thứ Ba, 20/10/2026", bỏ chữ "Nộp ngày"); bỏ nút "Tải lên tài liệu bổ sung"; mỗi tài liệu thêm nút tải về (chỉ biểu tượng) bên phải nút xem. Các danh sách tài liệu khác giữ nguyên.
- 04/11/2026 (v245): Chi tiết đơn khởi kiện (đơn đang yêu cầu bổ sung tài liệu): khối nhắc việc rút gọn (chọn E1, bỏ viền màu trái) và đặt trước thanh tab, liền phần đầu: nền vàng nhạt viền mảnh; trái = tiêu đề đậm + "Hạn 26/10/2026 · còn 3 ngày" (chữ vàng đậm); phải = nút "Bổ sung tài liệu". Bỏ đoạn mô tả, hình chuông và nút "Xem văn bản" (văn bản xem ở tab Văn bản tống đạt). Các biến thể chi tiết đơn khác và các màn chi tiết khác giữ khối cũ dưới thanh tab.
- 04/11/2026 (v246): Chi tiết đơn khởi kiện, tab Văn bản tống đạt: danh sách nhiều văn bản dùng thẻ cùng kiểu Hộp thư tống đạt (chọn F1, bỏ hạn xử lý): nhãn loại văn bản màu + số văn bản; chưa xem = chấm đỏ + tên in đậm; dòng Tòa án · ngày giờ tống đạt; bấm thẻ mở màn chi tiết đúng văn bản đó, xem xong thẻ hết chấm đỏ. Dữ liệu mẫu 3 văn bản (TB yêu cầu sửa đổi, bổ sung 12/2026/TB-TA; TB nhận đơn 09/2026/TB-TA; Giấy xác nhận đã nhận đơn trực tuyến 45/2026/GXN-TA).
- 04/11/2026 (v247): Chi tiết đơn khởi kiện: bỏ tab "Hòa giải đối thoại" (còn 5 tab). Tab Lịch sử: bỏ tiêu đề khối và nút thu gọn/mở rộng; dòng thời gian theo ảnh mẫu – chấm đỏ có viền nhạt + đường dọc xám; mỗi mốc: tên đậm, ngày giờ (giây), mã tống đạt · Tòa án, nhãn trạng thái (cam: Yêu cầu sửa đổi, bổ sung đơn / Đã chuyển Tòa án khác / Chờ nộp tạm ứng chi phí tố tụng; xanh dương: Tòa án đã nhận đơn). Dữ liệu mẫu 6 mốc theo ảnh, ngày 20/10/2026 và Tòa án nhân dân khu vực 1 - Hà Nội cho khớp đơn.
- 04/11/2026 (v248): Chi tiết đơn khởi kiện, tab Lịch sử: dòng thời gian kiểu G1 – ngày làm tiêu đề nhóm ("Thứ Ba, 20/10/2026", tự tính thứ, nhiều ngày thì nhiều nhóm); cột trái giờ:phút đậm, giây nhỏ bên dưới; chấm nhỏ trên đường dọc (mốc mới nhất chấm đỏ có quầng nhạt, mốc cũ chấm rỗng viền xám); bên phải tên mốc, mã tống đạt · Tòa án, nhãn trạng thái giữ màu cam/xanh như v247.
- 04/11/2026 (v249): Chi tiết đơn khởi kiện, tab Tài liệu chứng cứ: mỗi tài liệu một thẻ riêng (viền mảnh, bo góc, nền trắng, cách nhau 10px) thay cho các dòng ngăn bằng đường kẻ; nội dung thẻ và nút xem / tải về giữ nguyên.
- 04/11/2026 (v250): Mọi bước "Xem lại…" trong các luồng soạn đơn (39 màn: bước 6 đơn khởi kiện, Xem lại & ký gửi / ký số / gửi / ký nộp của kháng cáo, GĐT, tái thẩm, phản tố, yêu cầu độc lập, ý kiến, khiếu nại, tố cáo, BPKCTT, miễn giảm án phí, trích lục, người bảo vệ…): khối nhãn – giá trị đổi sang kiểu như màn chi tiết (v234) – cột nhãn xám bên trái, giá trị căn trái thẳng cột, chữ 13px, không đường kẻ giữa các dòng. Nhận diện bằng tên bước có chữ "Xem lại" (lớp ph-stepbar-xl). Các bước "Xác nhận & ký gửi" của luồng rút đơn chưa đổi.
- 04/11/2026 (v250 – nơi lưu): Theo yêu cầu, từ bản v250 không ghi prototype vào Desktop nữa (file và các bản sao lưu cũ trên Desktop giữ nguyên). Bản hiện tại lưu ở vùng làm việc cloud (prototype-app-tatc.html, có sao lưu prototype-app-tatc.bak-20261104-2333.html) và cập nhật trang "Prototype app TATC" (RsNHijiJbodLQbodMuAVsH) cùng trang "Prototype TATC Gen UI" (CKnVgGSByzDJD7vDSWCnDd).
- 04/11/2026 (nơi lưu, chốt): Từ giờ chỉ làm việc và lưu trên trang "Prototype TATC Gen UI" (https://claude.ai/artifact/CKnVgGSByzDJD7vDSWCnDd; file nguồn trong vùng làm việc cloud: prototype-tatc-gen-ui-mobile.html, sao lưu trước mỗi lần sửa). Không ghi Desktop, không cập nhật trang "Prototype app TATC" (RsNHijiJbodLQbodMuAVsH, dừng ở v250) và bản duyệt (QyVS6ngwmdVEyPyvtfpEwU).
- 05/11/2026 (v251): Áp UI đơn khởi kiện (danh sách, phần đầu chi tiết, nội dung tab, nút "Tạo đơn liên quan") cho các đơn còn lại và các chức năng; giữ nội dung riêng từng loại. Chi tiết đơn kháng cáo / GĐT / phản tố: tab không số đếm, tên đơn 16px, việc cần làm gọn đặt trước tab (DtTodoGon), đơn phát sinh dạng thẻ DonThe2, văn bản tống đạt kiểu hộp thư (VbCards), tài liệu mỗi tệp một thẻ có nút xem + tải về, lịch sử timeline G1 (LsG1); kháng cáo có nút ghim "Tạo đơn liên quan đến vụ việc" ở tab đơn phát sinh, bấm báo "Chức năng đang được phát triển" (luồng làm sau). Vụ án / Vụ việc của tôi: thẻ 5–6 dòng kiểu QdCard, sắp xếp + Bộ lọc dạng pill, dải nhắc phiên tòa; chi tiết dùng cùng khung, tab Đơn có nút ghim mở bảng chọn loại đơn (tên nhóm đầy đủ, nhóm "Đơn yêu cầu khác" được tô và tự cuộn tới ở biến thể hoãn phiên tòa); lịch sử không cột giờ. Hòa giải đối thoại: thẻ kiểu QdCard, việc cần làm "Trả lời lựa chọn hòa giải" đặt trước tab, các thao tác phụ chuyển vào tab Tiến trình, tiến trình dạng G1, thông báo kiểu hộp thư. Đăng ký người bảo vệ: thẻ kiểu QdCard, màn xem có phần đầu như chi tiết đơn. Nghĩa vụ tài chính: thẻ kiểu QdCard, chip loại khoản chuyển vào bảng Bộ lọc, chi tiết dùng khung DtScreen (Thông tin chung / Lịch sử) với việc cần làm "Nộp tiền". Không đổi: Giao nộp tài liệu chứng cứ (không có màn danh sách/chi tiết, mở thẳng luồng soạn); Việc dân sự dùng chung màn chi tiết đơn khởi kiện. Sao lưu: prototype-tatc-gen-ui-mobile.bak-20261105-0013.html.
- 05/11/2026 (v252): Khối hành động gắn với đơn đặt ở đầu màn như mẫu "Yêu cầu bổ sung tài liệu" (dưới nhãn trạng thái, trước hàng tab) cho mọi màn chi tiết đơn trong Danh sách đơn và tiến trình (khởi kiện: chờ ký số, đủ chữ ký, tạm ứng án phí, quá hạn, trả lại đơn, đã thụ lý; kháng cáo; GĐT đã gửi / yêu cầu sửa; phản tố đã gửi / trả lại). Màn chi tiết vụ án không đổi (theo lựa chọn). Quy tắc khối (DtViec): nút chính bên phải; hành động phụ vào nút mũi tên xuống (chevronDown có sẵn, không thêm biểu tượng mới) mở bảng chọn từ đáy, tiêu đề bảng = tên việc; chưa xác định nút chính thì hiện cả 2 nút chia đôi ở hàng dưới (trả lại đơn, phản tố đã gửi); nhãn dài hiện một phần kèm "…" (đủ chữ ở title/aria-label); ẩn dòng mô tả; màu theo mức độ: vàng = việc có hạn, xám = hành động tùy chọn/thông tin (đủ chữ ký, đã thụ lý, GĐT/phản tố đã gửi), đỏ = quá hạn/bị trả lại. Kháng cáo, GĐT, phản tố (chọn C): phần đầu chỉ còn mã, tên, nhãn + khối (+ tiến trình 3 bước của phản tố); bảng thông tin chuyển vào đầu tab thứ nhất, tên khối tạm "[Thông tin đơn]". Hiện lại các nút phụ bị ẩn từ v251: Xem văn bản (kháng cáo), Rút đơn (GĐT yêu cầu sửa), Thay đổi yêu cầu (phản tố). Banner đỏ "Vụ án đã thụ lý" và khối việc cần làm sau tab của tạm ứng án phí, trả lại đơn được thay bằng khối đầu màn; danh sách người ký và khối "Lập lại đơn từ phần hợp lệ" giữ ở tab. Sao lưu: prototype-tatc-gen-ui-mobile.bak-20261105-0050.html.
- 05/11/2026 (v253): Màn Cá nhân – header theo ảnh mẫu người dùng gửi (chọn S2): bỏ tiêu đề "Cá nhân"; nền ảnh trang chủ phủ lớp đỏ; ảnh chữ tắt 80px viền trắng, tên 24px chữ trắng, chip vai trò (Công dân ▾). Bỏ khỏi header: Định danh VNeID, số định danh, "Xem ›" (xem ở màn Thông tin tài khoản). "Thông tin tài khoản" (biểu tượng user) thành dòng đầu menu, mở màn Thông tin tài khoản. Sao lưu: prototype-tatc-gen-ui-mobile.bak-20261105-1024.html.
- 05/11/2026 (v254): Màn Cá nhân – thu nhỏ ảnh chữ tắt ở header 80→48px (chữ 16px, viền trắng 3px) và tên tài khoản 24→16px; chip vai trò giữ nguyên. Sao lưu: prototype-tatc-gen-ui-mobile.bak-20261105-1026.html.
- 05/11/2026 (v255): Màn Cá nhân – tăng khoảng cách giữa ảnh chữ tắt và tên/vai trò ở header 12→16px. Sao lưu: prototype-tatc-gen-ui-mobile.bak-20261105-1027.html.
- 05/11/2026 (v256): Hộp thư tống đạt – nhấn giữ thẻ thư 0,5 giây để vào chế độ chọn (chọn A): ô vuông (checkbox) đầu thẻ, thẻ đã chọn nền xám (surface-sunken), ẩn nút sao/lưu trữ trên thẻ; bảng chọn từ đáy tự mở "Đã chọn N văn bản" với Đánh dấu đã đọc, Đánh dấu quan trọng, Lưu trữ (thư mục Lưu trữ: Bỏ lưu trữ). Đóng bảng vẫn ở chế độ chọn; bấm thẻ để tick/bỏ tick, mỗi lần tick bảng mở lại; bỏ tick hết hoặc làm xong một thao tác thì thoát chế độ chọn và báo snack (câu mới: "Đã đánh dấu đã đọc N văn bản." …). Sao lưu: prototype-tatc-gen-ui-mobile.bak-20261105-1038.html.
- 05/11/2026 (v257): Hộp thư tống đạt – chế độ chọn thư (nhấn giữ) chỉ còn thao tác "Đánh dấu đã đọc" (bỏ Đánh dấu quan trọng, Lưu trữ); bỏ bảng chọn từ đáy của v256, thay bằng thanh ghim đáy (chọn H) thế chỗ thanh điều hướng khi đang chọn: nút ✕ (bỏ chọn) · "Đã chọn N văn bản" · nút "Đánh dấu đã đọc". Bỏ tick hết hoặc bấm ✕ thì thoát chế độ chọn, thanh điều hướng hiện lại. Sao lưu: prototype-tatc-gen-ui-mobile.bak-20261105-1047.html.
- 05/11/2026 (v258): Hộp thư tống đạt – thẻ thư đã chọn đổi từ nền xám (trùng nền trang) sang nền đỏ nhạt brand-tint, viền brand-200 (màu "mục đang chọn" của token). Sao lưu: prototype-tatc-gen-ui-mobile.bak-20261105-1052.html.
- 05/11/2026 (v259): Hộp thư tống đạt – thẻ thư đã chọn không tô màu nền, không viền (bỏ nền đỏ nhạt của v258); chỉ ô tick đỏ báo đã chọn. Sao lưu: prototype-tatc-gen-ui-mobile.bak-20261105-1057.html.
- 05/11/2026 (v260): Thanh điều hướng hiện tên dưới biểu tượng (labels): Trang chủ · Hồ sơ · Hộp thư · Cài đặt. Tab 2 (màn Theo dõi vụ án, vụ việc) đặt tên "Hồ sơ" (đã chọn); tab Cá nhân đổi tên "Cài đặt", biểu tượng người → menu 3 gạch có sẵn (đã chọn). Tiêu đề các màn giữ nguyên. Sao lưu: prototype-tatc-gen-ui-mobile.bak-20261105-1102.html.
- 05/11/2026 (v261): Thanh điều hướng cao hơn 64→76px; biểu tượng + tên căn giữa theo chiều dọc (bỏ đệm lệch 8px trên / 6px dưới). Sao lưu: prototype-tatc-gen-ui-mobile.bak-20261105-1107.html.
- 05/11/2026 (v262): Màn Cài đặt (Cá nhân) – đổi chỗ 2 khối menu: khối Câu hỏi thường gặp / Đánh giá mức độ hài lòng lên trước khối Đổi mật khẩu / Đăng ký lại thiết bị. Sao lưu: prototype-tatc-gen-ui-mobile.bak-20261105-1108-v261.html.
- 05/11/2026 (v263): Danh sách đơn – loại Đơn giám đốc thẩm, tái thẩm: 2 nút "+ Đề nghị Tái thẩm" và "+ Đề nghị Giám đốc thẩm" trên 1 hàng (trước xếp 2 hàng), mỗi nút giãn theo độ dài chữ, đệm 8px. Sao lưu: prototype-tatc-gen-ui-mobile.bak-20261105-1110.html.
- 05/11/2026 (v264): Danh sách Hòa giải, đối thoại – bỏ dòng mô tả dưới tiêu đề ("Theo dõi trạng thái và tiến trình cho các vụ việc hòa giải, đối thoại trước khi thụ lý."). Sao lưu: prototype-tatc-gen-ui-mobile.bak-20261105-1112.html.
- 05/11/2026 (v265): Bảng Bộ lọc trạng thái (dùng chung: Danh sách đơn, Hòa giải đối thoại, Đăng ký người bảo vệ) theo kiểu Phân loại thư: nhãn nhóm xám, dòng tên + số, dòng đang chọn nền xám (surface-sunken, như nền trang) chữ đậm đen, không dấu tích; chân bảng chỉ còn nút "Áp dụng" (bỏ "Xóa lọc" – bỏ lọc bằng chọn "Tất cả"). Sao lưu: prototype-tatc-gen-ui-mobile.bak-20261105-1119.html.
- 05/11/2026 (v266): Trung tâm thông báo đổi tên chức năng thành "Thông báo" (tiêu đề màn, tên màn, câu hướng dẫn ở cài đặt nhắc hạn) và vẽ lại: giữ hàng chip Tất cả / Chưa đọc / Đã đọc + Mới nhất; nhóm Hôm nay / Hôm qua là nhãn xám; danh sách tràn mép, không biểu tượng đầu thẻ; chưa đọc = chấm đỏ trước tên + chữ đậm; giờ bên phải; mô tả 1 dòng; mã hồ sơ dạng nhãn xám; bỏ "Đánh dấu tất cả đã đọc". Nhấn giữ 0,5 giây để chọn (ô tick đầu dòng), thanh ghim đáy "✕ · Đã chọn N thông báo · Đánh dấu đã đọc" như Hộp thư. Đích bấm từng thông báo chuyển từ luật R sang NOTI_GO. Sao lưu: prototype-tatc-gen-ui-mobile.bak-20261105-1136.html.
- 05/11/2026 (v267): Màn chào (splash) – bỏ dòng "Tòa án nhân dân tối cao"; tên đổi thành "CỔNG DỊCH VỤ TƯ PHÁP TÒA ÁN". Màn Đăng nhập chưa đổi. Sao lưu: prototype-tatc-gen-ui-mobile.bak-20261105-1508.html.
- 05/11/2026 (v268): Màn Đăng nhập – dòng chân màn "Phiên bản: v1.0.0 (1)" thay bằng "Tòa án nhân dân tối cao". Sao lưu: prototype-tatc-gen-ui-mobile.bak-20261105-1509.html.
- 05/11/2026 (v269): Màn chào – tên "CỔNG DỊCH VỤ TƯ PHÁP TÒA ÁN" giảm từ 24px xuống 18px (line-height 24px) theo yêu cầu; 18px nằm ngoài thang cỡ chữ đã chốt (10/12/14/16/20/24). Sao lưu: prototype-tatc-gen-ui-mobile.bak-20261105-1509-b.html.
- 05/11/2026 (v270): Màn Đăng nhập – sửa như màn chào: bỏ dòng "Tòa án nhân dân tối cao" ở phần đầu, tên đổi thành "CỔNG DỊCH VỤ TƯ PHÁP TÒA ÁN" in hoa 700 18px/24px (ngoài thang cỡ chữ, theo yêu cầu). Chân màn vẫn là "Tòa án nhân dân tối cao" (v268). Sao lưu: prototype-tatc-gen-ui-mobile.bak-20261105-1510.html.
- 05/11/2026 (v271): Màn Đăng nhập – ô Tài khoản đổi gợi ý (placeholder) từ "Nhập số căn cước hoặc mã số thuế" thành "Số định danh cá nhân hoặc tổ chức". Sao lưu: prototype-tatc-gen-ui-mobile.bak-20261105-1512.html.
- 05/11/2026 (v272): Cam kết giao dịch điện tử – bỏ dòng "N quy định đính kèm · Áp dụng từ … · Chạm để xem và tải" dưới điều khoản cam kết (bảng Quy định đính kèm không còn lối mở); Lịch sử giao dịch điện tử – bỏ nút "Tải quyết định/nghị quyết (n)" ở từng thẻ. Sao lưu: prototype-tatc-gen-ui-mobile.bak-20261105-1540.html.
- 05/11/2026 (v273): Theo dõi vụ án, vụ việc (tab Hồ sơ) – mô tả mục "Danh sách đơn và tiến trình" đổi thành "Đơn khởi kiện, yêu cầu dân sự và các đơn khác". Sao lưu: prototype-tatc-gen-ui-mobile.bak-20261105-1614.html.
- 05/11/2026 (v274): Mô tả mục "Danh sách đơn và tiến trình" đổi tiếp thành "Đơn khởi kiện, yêu cầu và các đơn khác". Sao lưu: prototype-tatc-gen-ui-mobile.bak-20261105-1615.html.
- 05/11/2026 (v275): Theo dõi vụ án, vụ việc – mục "Vụ án của tôi" đổi tên thành "Vụ án, vụ việc của tôi", mô tả "Dân sự, hôn nhân và gia đình, kinh doanh thương mại..." (luật bấm cập nhật theo tên mới). Mục "Vụ việc của tôi" và tiêu đề các màn vụ án giữ nguyên. Sao lưu: prototype-tatc-gen-ui-mobile.bak-20261105-1622.html.
- 05/11/2026 (v276): Theo dõi vụ án, vụ việc – mục "Vụ việc của tôi" đổi tên thành "Vụ việc phục hồi phá sản" (mô tả giữ nguyên; luật bấm cập nhật). Tiêu đề màn khi mở vẫn là "Vụ việc của tôi". Sao lưu: prototype-tatc-gen-ui-mobile.bak-20261105-1623.html.
- 05/11/2026 (v277): Theo dõi vụ án, vụ việc – mô tả mục "Nghĩa vụ tài chính" đổi thành "Tạm ứng án phí, lệ phí, chi phí tố tụng". Sao lưu: prototype-tatc-gen-ui-mobile.bak-20261105-1623-b.html.
- 05/11/2026 (v278): Màn Theo dõi vụ án, vụ việc – bộ biểu tượng mới, mỗi mục một hình, sát nghĩa (chọn C; mục 5 cách 3; mục 6 dùng banAn): Danh sách đơn và tiến trình = traCuuHoSo; Hòa giải, đối thoại = hoaGiai; Giao nộp tài liệu, chứng cứ = chungCu; Đăng ký người bảo vệ = nguoiBaoVe (mới: người + khiên đỏ có dấu tích); Vụ án, vụ việc của tôi = canCongLy (mới: cân công lý + búa); Vụ việc phục hồi phá sản = banAn; Nghĩa vụ tài chính = taiChinh (mới: ví xanh + đồng xu "đ"). Ba hình minh họa mới thêm vào bundle design system của prototype (TuPhap.Illustration). Đồng thời sửa lỗi từ v275–v276: 2 mục đổi tên bị mất hình (hiện hình dự phòng) do bảng biểu tượng khóa theo tên cũ. Sao lưu: prototype-tatc-gen-ui-mobile.bak-20261105-1634.html.
- 05/11/2026 (v279): Nghĩa vụ tài chính – khối tổng hợp đầu màn thay khối đỏ StatSummary bằng kiểu D (đã chọn): thẻ trắng; trái "Còn phải nộp · N khoản" + số tiền 24px; phải "Đã nộp · N khoản" + số tiền xanh; thanh tiến độ đã nộp / (còn phải nộp + đã nộp); dòng đỏ "N khoản quá hạn hoặc còn ≤ 3 ngày" (ẩn khi 0). Sao lưu: prototype-tatc-gen-ui-mobile.bak-20261105-1645.html.
- 05/11/2026 (v280): Nghĩa vụ tài chính – bỏ dòng mô tả "Bao gồm tạm ứng án phí, tạm ứng lệ phí." dưới tiêu đề (cả các màn trống / lỗi dùng chung dòng này). Sao lưu: prototype-tatc-gen-ui-mobile.bak-20261105-1647.html.
- 09/11/2026 (v281): Sau đăng nhập (bấm Đăng nhập hoặc Tài khoản định danh điện tử), tài khoản chưa ký cam kết → hiện ngay hộp giữa màn Trang chủ: hình minh họa, "Bạn chưa hoàn thiện cam kết giao dịch điện tử", câu "Xác nhận cam kết theo (các) vai trò tham gia tố tụng để nộp đơn và nhận tống đạt văn bản điện tử.", nút "Xác nhận cam kết ngay" → màn Cam kết (lần đầu). Lớp phủ che cả thanh điều hướng, bấm ra ngoài không làm gì → không dùng được chức năng khác. Nút ✕ tạm giữ để đi tiếp trong prototype (đóng thì không hiện lại đến lần đăng nhập sau). Nhảy thẳng tới Trang chủ từ danh sách màn không hiện hộp. Sao lưu: prototype-tatc-gen-ui-mobile.bak-20261109-0905.html.
- 09/11/2026 (v282): Hộp yêu cầu ký cam kết sau đăng nhập – tiêu đề xuống dòng "Bạn chưa hoàn thiện / cam kết giao dịch điện tử", nút đổi thành "Ký cam kết ngay". Bỏ khối nhắc cam kết (banner đỏ nhạt) ở Trang chủ. Sửa: bấm "Ký cam kết ngay" tắt hẳn hộp (trước đó cờ không được xóa). Sao lưu: prototype-tatc-gen-ui-mobile.bak-20261109-0910.html.
- 09/11/2026 (v283): Hộp thư tống đạt – thẻ thư thêm thông tin vụ án (chọn D có sửa): dòng "Tòa án · Tống đạt dd-mm-yyyy · vai trò"; ô nền xám gồm "Số TL … · Thụ lý dd/mm/yyyy" (vụ việc chưa thụ lý: "Chưa thụ lý") và tên vụ án, hoặc tên đơn nếu văn bản tống đạt cho đơn chưa thụ lý (1 dòng, cắt "…"). Dữ liệu vụ án lấy theo mã hồ sơ (IB_VA, dữ liệu mẫu). Sao lưu: prototype-tatc-gen-ui-mobile.bak-20261109-0924.html.
- 09/11/2026 (v284): Thẻ thư Hộp thư tống đạt – in đậm ngày hạn xử lý (`.ib-c-hxl-d` 700, màu --ink).
- 09/11/2026 (v285): Thẻ thư Hộp thư – dòng trên bỏ vai trò (Tòa án · Tống đạt ngày); ô xám hiển thị liền, đủ thông tin: Số TL - Ngày thụ lý - Tên vụ án - **Vai trò** (vai trò đậm 500); đơn chưa thụ lý: Tên đơn - Vai trò (bỏ số + ngày).
- 09/11/2026 (v286): Thẻ thư Hộp thư – ô xám in thường toàn bộ text (400), bỏ đậm vai trò.
- 09/11/2026 (v287): Đổi "Lịch, phiên tòa" thành "Lịch tố tụng": ô Trang chủ ('Lịch\\ntố tụng'), tiêu đề màn (trước là 'Quản lý lịch, phiên tòa'), tab đầu, tên màn trong proto, luật R '=Lịch tố tụng'.
- 09/11/2026 (v288): Thông tin tài khoản – bỏ thẻ hồ sơ đỏ (ProfileCard), đổi 'Định danh · Chỉ đọc' thành 'Định danh', bỏ khối 'Vai trò sử dụng'.
- 09/11/2026 (v289): Thông tin tài khoản – giả lập đủ thông tin, không che (dùng ME_MAU: ngày sinh, giới tính Nam, số định danh 001090012345, nơi thường trú/ở hiện tại, SĐT 0912345678, email); 2 khối tĩnh AccSec (`.acc-sec`), bỏ nút thu gọn/mở rộng.
- 09/11/2026 (v290): Thông tin tài khoản theo mã nguồn web /tai-khoan (nhánh main, file ngày 20/10/2026; không pull được): tab demo Cá nhân / Tổ chức; tiêu đề 'Hồ sơ cá nhân' / 'Hồ sơ tổ chức'; khối 'Thông tin cá nhân' (Định danh · Chỉ đọc, nhãn 'Số định danh cá nhân (CCCD)'; Thông tin liên hệ sửa tại chỗ → hộp 'Xác thực hai yếu tố' nhập mã 6 số); 'Thông tin tổ chức' (Pháp nhân: Tên tổ chức, Mã số thuế, Địa chỉ trụ sở, Giấy phép hoạt động); 'Người đại diện pháp luật' (thẻ người + kỳ hiệu lực, trạng thái Đang hiệu lực/Hết hiệu lực cuối hôm nay/Chưa tới hiệu lực/Hết hiệu lực; Thêm, Bổ nhiệm lại, Sửa hiệu lực, Thu hồi + cảnh báo người cuối); 'Xác thực hai yếu tố' (Ngày bật, Mã dự phòng còn lại, Đổi thiết bị → QR → 10 mã dự phòng, Sinh lại mã dự phòng, Bật khi chưa bật, cảnh báo ≤2 mã). Bỏ luồng contact → verify → review. Màn mới: accountSua, accountOtp, accountQr, accountMaDp, accountTat2, accountSapHet, accountOrg, accountOrgThem. Lớp CSS `.acc-*`; nút cục bộ `.acc-l` trong LOCAL. Dữ liệu mẫu.
- 09/11/2026 (v291): Thêm người đại diện / Bổ nhiệm lại – ghép 2 trường một hàng (Two/fx-2): Số căn cước + Ngày sinh; Giới tính + Quốc tịch; Chức vụ + Số điện thoại; Hiệu lực từ + Hiệu lực đến. Họ và tên, Email giữ cả hàng.
- 09/11/2026 (v292): Xác thực hai yếu tố – bỏ icon nút 'Đổi thiết bị'; demo màn tài khoản bắt đầu từ chưa bật (Bật → quét QR → 10 mã dự phòng → Xong → Đã bật); trạng thái giữ ở màn, đổi tab Cá nhân/Tổ chức không mất. Màn accountTat2 thay bằng accountDaBat.
- 09/11/2026 (v293): Bật xác thực hai yếu tố – không dùng bảng từ đáy; nút 'Bật xác thực hai yếu tố' mở màn riêng (account2faBat: khối 'Quét mã QR bằng ứng dụng Authenticator' + ô mã 6 số → khối '[Mã dự phòng]' 10 mã, tích đã lưu, Xong) → quay lại màn tài khoản trạng thái Đã bật (ngày 09/11/2026, 10/10 mã; cờ window.__accBat). Đổi thiết bị, Sinh lại mã dự phòng giữ trong khối.
- 09/11/2026 (v294): Thông báo nổi (.ph-snack) đẩy sát đáy mọi màn: cách đáy màn hình 24px (trước 96px), chấp nhận che thanh tab/nút chân trong lúc hiện.
- 09/11/2026 (v295): Màn Bật xác thực hai yếu tố – chọn B: 2 bước xếp dọc trên cùng một màn (1. Cài ứng dụng, quét mã QR – gộp cài ứng dụng + quét QR + nhập mã; 2. Lưu mã dự phòng); số tròn đỏ cho bước đang làm, bước xong thu gọn có dấu tích xanh + 'Đã xong', bước chưa tới chữ mờ; lớp `.acc-st*`. Sửa token màu `--brand` (không tồn tại) thành `--court-red` cho liên kết Android/iOS và ô tích.
- 09/11/2026 (v296): Ô thông báo '10 mã dự phòng đã được tạo…' – chọn A: nền --warning-tint, biểu tượng --warning-dot, chữ giữ màu cũ.
- 09/11/2026 (v297): Thông tin liên hệ (cá nhân + tổ chức) – 'Chỉnh sửa' mở bảng từ đáy 'Thông tin liên hệ' (Số điện thoại, Địa chỉ email; Hủy / Lưu thay đổi) thay cho sửa tại chỗ; Lưu thay đổi → hộp nhập mã 6 số → đóng bảng, cập nhật giá trị, báo 'Đã lưu thông tin liên hệ.'
- 09/11/2026 (v298): Hộp nhập mã 6 số (AccOtp – lưu liên hệ, đổi thiết bị, sinh lại mã) – ẩn nhãn 'Mã 6 chữ số trên ứng dụng Authenticator' (giữ cho trình đọc màn hình, lớp .acc-nolbl); ô hiện chữ gợi ý. Ô mã trên màn Bật xác thực giữ nhãn.
- 09/11/2026 (v299): Màn Giao dịch điện tử – bỏ khối nhắc 'Bạn chưa hoàn thiện cam kết giao dịch điện tử / Xác nhận cam kết ngay' (CkBanner); màn chỉ còn Lịch sử giao dịch điện tử. (Đề xuất 3 kiểu thẻ người đại diện đã dừng theo yêu cầu, không áp dụng.)
- 09/11/2026 (v300): Thẻ thư Hộp thư tống đạt – thư đã đọc có nhãn 'Đã đọc' (StatusBadge neutral) đặt trước nhãn loại văn bản; thư chưa đọc không có nhãn, giữ chấm đỏ + chữ đậm.
- 09/11/2026 (v301): Thẻ thư Hộp thư tống đạt – bỏ nhãn 'Đã đọc'; thư chưa đọc có nhãn đỏ 'Chưa đọc' (StatusBadge danger) trước nhãn loại văn bản; vẫn giữ chấm đỏ + chữ đậm.
- 09/11/2026 (v302): Thẻ thư Hộp thư tống đạt – chọn C1 (sau 2 vòng đề xuất A/B/C → C1/C2/C3): thẻ rời bo góc viền xám, cách nhau 8px trên nền trang (không còn danh sách tràn mép); nhãn loại văn bản dạng viền màu (màu theo loại, nền trong); chân thẻ 'Hạn xử lý' là dải tràn mép đáy thẻ tô màu theo mức hạn (đỏ/vàng/xanh, chữ cùng màu, nhãn còn hạn thành chữ đậm); thẻ không có hạn không có dải; giữ nguyên thứ tự và nhóm thông tin. Chế độ chọn: chừa 44px cho ô tích, dải hạn vẫn tràn mép; nhãn loại không xuống dòng, mã hồ sơ cắt '…'.
- 09/11/2026 (v303): Thẻ thư Hộp thư tống đạt – chọn D3a (theo thẻ đơn khởi kiện, sau demo D1/D2/D3 → D3 giữ nhóm cũ → bỏ ô xám): khung thẻ như thẻ đơn (radius-lg, shadow-card + viền 1px, padding 14), nhãn loại văn bản nền màu (bỏ kiểu viền C1), mã hồ sơ 500 12px, tên văn bản 700 15px cho mọi thư, bỏ chấm đỏ trước tên (thư chưa đọc chỉ còn nhãn đỏ 'Chưa đọc'), sao bật màu vàng #F5B400 như thẻ đơn; dòng 'Tòa án · Tống đạt' 13px xám; dòng vụ án (Số TL - Ngày - Tên vụ án/đơn - Vai trò) 13px chữ thường, không còn ô xám; giữ dải 'Hạn xử lý' tràn mép đáy thẻ màu theo mức hạn; chế độ chọn chừa 46px.
- 09/11/2026 (v304): Thẻ thư Hộp thư – đồng nhất dòng 'Tòa án · Tống đạt' và dòng vụ án: 400 12px/16px, màu --ink-muted (#3B4660).
- 09/11/2026 (v305): Thẻ vụ án (Vụ án / Vụ việc của tôi – VaCard) – dòng thông tin: Mã định danh (thay Mã vụ án), Số - Ngày thụ lý (vd 12/2026/TLST-DS - 15/10/2026; số thụ lý mẫu suy từ mã, cấp hiện tại, lĩnh vực – vaSoTL), Tư cách (thay Vai trò), Cấp xét xử, Tòa án; giữ Phiên tòa và dòng hạn khi có.
- 09/11/2026 (v306): Thẻ vụ án – giá trị các dòng thông tin in thường (400, lớp .va-ben); thẻ đơn giữ 500.
- 09/11/2026 (v307): Khung điện thoại theo iPhone 14 Pro Max: màn 430×932 (trước 390×844), viền khung 454px, bo góc màn 40px; .ph mặc định 430×932; mốc màn hẹp 480px.
- 11/11/2026 (v308): Tab Hồ sơ – tiêu đề màn theo tên mục: "Vụ án của tôi" → "Vụ án, vụ việc của tôi", "Vụ việc của tôi" → "Vụ việc phục hồi phá sản" (chỉ tiêu đề; nút, câu trống, tên màn trong ô Đi tới màn giữ nguyên; "Hòa giải đối thoại" giữ nguyên). Vụ việc phục hồi phá sản: danh sách chỉ còn hồ sơ phục hồi, phá sản (5 hồ sơ mẫu PS-2026-0001…0005, thẻ như Vụ án, vụ việc của tôi: trạng thái + tình trạng + sao, tên vụ việc, Mã định danh, Số - Ngày thụ lý, Tư cách, Cấp xét xử, Tòa án, Việc cần làm); bộ lọc riêng (Loại vụ việc: Phục hồi / Phá sản; Vai trò: Chủ nợ / Người yêu cầu / Người lao động); 13 vụ việc dân sự (VDS-…) chuyển sang Vụ án, vụ việc của tôi (mở Chi tiết vụ án), bộ lọc Vụ án bỏ loại "Phá sản". Chi tiết vụ việc (proceedingDetail) làm theo khung Chi tiết vụ án: tiêu đề "Chi tiết vụ việc", phần đầu mã · loại, tên, trạng thái + "Vai trò của bạn", dải cấp xét xử; 8 tab Thông tin chung · Đơn trong vụ việc · Các cấp xét xử · Lịch phiên tòa · Văn bản tống đạt · Tài liệu, chứng cứ · Bản án / Quyết định · Lịch sử vụ việc; không có nút Tạo đơn liên quan; lịch phiên họp để [ngoặc vuông]. Tên vụ việc, tình trạng, số văn bản là dữ liệu mẫu. Sao lưu: prototype-tatc-gen-ui-mobile.bak-20261111-1428.html.
- 11/11/2026 (v309): Vụ án, vụ việc của tôi – nút X trên dải "Phiên tòa sơ thẩm sắp diễn ra" chỉ ẩn thông báo, ở lại màn (trước đó nhãn "Đóng" khớp luật quay lại nên X đưa về màn Hồ sơ); nhãn đọc màn hình đổi thành "Đóng thông báo". Sao lưu: prototype-tatc-gen-ui-mobile.bak-20261111-1435.html.
- 11/11/2026 (v310): Cài đặt › Cam kết giao dịch điện tử mở thẳng màn Giao dịch điện tử đã xác nhận, có Lịch sử giao dịch điện tử (3 phiên mẫu), thay cho tình huống "chưa xác nhận cam kết" (lịch sử trống, vẫn có trong ô Đi tới màn). Lối vào màn Cam kết lần đầu từ Trang chủ không đổi. Sao lưu: prototype-tatc-gen-ui-mobile.bak-20261111-1440.html.
- 11/11/2026 (v311): Quản lý chữ ký số › thẻ chứng thư số – chân thẻ chọn phương án A (đề xuất A/B/C): 2 nút nhỏ 36px chia đôi thay 2 liên kết chữ căn phải; "Kiểm lại" Button secondary (icon swap), "Xóa khỏi danh sách" Button secondary viền border-strong, chữ danger (icon trash), vẫn mở popup xác nhận xóa. Lớp .sk-ct-btns / .sk-del-btn (page.css). Chưa cập nhật component CertificateCard trong design system.
- 11/11/2026 (v312): Design system – CertificateCard áp phương án A như prototype v311: chân thẻ hành động là Button size="sm" variant="secondary" chia đều (gap 8px); hành động danger viền border-strong, chữ danger, nhấn nền surface-sunken (lớp .tp-cert-btns / .tp-cert-btn-danger). API giữ nguyên (actions: label, icon, danger, onClick); SignSessionCard không đổi. Đã sửa design-system/components/bundle.js, bundle.css, CertificateCard/README.md, design-system/README.md; đồng bộ prototype-src/ds; sao lưu tại design-system/backups/20261111-1523/.
- 11/11/2026 (v313): Phương thức giao dịch điện tử – đọc lại web /phuong-thuc-giao-dich (bundle đang chạy 10.15.73.100:5180; repo tatc.workspace mọi nhánh chưa có route này). (1) Wizard Tạm chuyển giấy / Giấy đến khi kết thúc kiểm tra thật khi bấm Tiếp tục (bỏ quy tắc "không kiểm tra bắt buộc nhập" cho riêng chức năng này): bước 1 lý do rỗng hoặc toàn khoảng trắng → "Vui lòng nhập lý do chuyển phương thức.", chưa tích → "Vui lòng xác nhận bạn đã hiểu hậu quả."; bước 2 chọn Bưu chính mà địa chỉ rỗng → "Vui lòng nhập địa chỉ nhận văn bản."; lỗi chỉ hiện sau khi bấm, tự ẩn khi đã nhập; lý do tối đa 300 ký tự (đếm n/300); bước 2 bỏ nút mờ và lỗi hiện sẵn. Giá trị giữ giữa các bước (PT_WZ_ST); bấm từ thẻ hồ sơ thì làm mới. (2) Bước 3 hiện đúng phương thức thay thế + địa chỉ và lý do đã nhập; bỏ dòng Hồ sơ (web không có). (3) Không tìm thấy: chỉ "Không tìm thấy hồ sơ phù hợp." (bỏ câu phụ và Xóa bộ lọc). (4) Danh sách 4 hồ sơ mỗi lần như pageSize web, cuộn tới cuối tự tải thêm ("Đang tải hồ sơ…"). Nút kiểm tra tại chỗ dùng lớp .pt-chk (thêm vào LOCAL của proto.js).
- 11/11/2026 (v314): Hộp thư tống đạt – thẻ thư thêm viền: chọn phương án A "viền xám" (đề xuất A viền xám đậm / B viền đỏ nhạt brand-200 / C vạch trái 4px theo mức hạn): viền liền 1px border-strong (#5D6B86), bỏ bóng (trước: viền giả box-shadow 0 0 0 1px border + shadow-card). Sửa .ib-cardlist .ib-c trong page.css.
- 11/11/2026 (v315): Hộp thư tống đạt – thẻ thư thiết kế lại, chọn K1 "hàng biểu tượng" (sau các vòng đề xuất A–C viền, D–F, G–I, I2, J1–J3, K1–K3): thẻ nổi không viền, bóng shadow-card, bo 16, cách nhau 12px; đầu thẻ nhãn loại + mã hồ sơ + Quan trọng/Lưu trữ; chưa đọc = chấm đỏ court-red trước tiêu đề + chữ đậm (bỏ nhãn "Chưa đọc"); tiêu đề 16/24 tối đa 2 dòng; dòng "Tòa án · Tống đạt ngày"; thông tin vụ án tách thành hàng có biểu tượng dưới đường kẻ: file "Số TL … - ngày TL" · scale tên vụ án/đơn · user tư cách (đậm); Hạn xử lý là dòng chữ màu theo mức hạn dưới đường kẻ (bỏ dải nền màu). Giữ chế độ nhấn giữ để chọn. Sửa MailCard (s2.js), lớp .ibk/.ibk-rows/.ibk-dot (page.css).
- 11/11/2026 (v316): Thẻ thư Hộp thư tống đạt (K1) – tiêu đề 14/20 (trước 16/24; thư chưa đọc vẫn đậm 700); các hàng thông tin vụ án đều in thường 400 (Số TL và Tư cách bỏ đậm).
- 11/11/2026 (v317): Thẻ thư Hộp thư tống đạt – trạng thái chưa đọc theo ảnh mẫu người dùng gửi (sau đề xuất U1 nền đỏ nhạt / U2 nhãn đỏ đặc / U3 viền đỏ nhạt): nhãn "Chưa đọc" StatusBadge danger (nền đỏ nhạt, chữ đỏ) đặt trước nhãn loại văn bản + tiêu đề đậm; bỏ chấm đỏ trước tiêu đề. Dữ liệu mẫu thêm 3 thư chưa đọc (Biên bản phiên họp kiểm tra việc giao nộp tài liệu, chứng cứ; Quyết định đưa vụ án ra xét xử; Thông báo kết quả xử lý đơn yêu cầu) → 5 thư chưa đọc xen kẽ thư đã đọc.
- 11/11/2026 (v318): Phương thức giao dịch điện tử – (1) bỏ đoạn mô tả đầu màn "Mỗi đơn, vụ án chọn phương thức điện tử hoặc giấy độc lập (Điều 4.5 NQ 01/2026)…" (người dùng yêu cầu); (2) nút trên thẻ hồ sơ chọn P1 (đề xuất P1 xếp chồng / P2 nút rộng + liên kết chữ / P3 chân thẻ 2 ô): nút nhỏ 36px rộng hết thẻ, xếp dọc cách 8px – nút chính trên (Tạm chuyển sang giấy viền đỏ; Tiếp tục điện tử đỏ đặc), "Chuyển giấy đến khi kết thúc" là nút viền xám đậm border-strong chữ danger bên dưới (thay liên kết chữ); Chờ Tòa duyệt: dòng ⏱ "Còn n ngày Tòa trả lời" chữ warning (thay viên vàng) + nút Hủy yêu cầu rộng. Lớp .pt-btns/.pt-btn-dg/.pt-info (page.css).
- 11/11/2026 (v319): Thẻ đơn (Quản lý đơn / danh sách đơn) – nhãn "Vai trò" đổi thành "Tư cách" (dòng sau Mã tiếp nhận). Các chỗ khác có chữ "Vai trò" (Vai trò của bạn, Vai trò tố tụng, bộ lọc Vai trò, Vai trò giao dịch điện tử…) giữ nguyên.
- 11/11/2026 (v320): "Vai trò của bạn" đổi thành "Tư cách của bạn" ở mọi chỗ (5 chỗ trong mã: Thông tin vụ án và các biến thể tạm đình chỉ / xem xét lại / đề nghị hoãn, Thông tin vụ việc, chi tiết vụ án theo tư cách bị đơn / người có QL, NV liên quan, ý kiến phản tố / YCĐL đã nộp, Nộp đơn kháng cáo, Ý kiến về kháng cáo – 13 màn). "Vai trò tố tụng" (Đăng ký người bảo vệ) và các chữ "vai trò" khác giữ nguyên.
- 12/11/2026 (v321): Hộp "Bạn có một đơn đang soạn dở gần đây." (Nộp đơn khởi kiện – draftAsk) thêm nút đóng X ở góc phải trên (tp-icon-btn 44px, aria-label "Đóng"): bấm đóng hộp, quay lại màn trước.
- 12/11/2026 (v322): Nhãn "Chưa đọc" trên thẻ thư Hộp thư tống đạt – nền đỏ chủ đạo brand-800 (#A3131C), viền cùng màu, chữ trắng (tương phản ~7,4:1; trước: nền danger-tint, chữ danger).
- 12/11/2026 (v323): Nộp đơn khởi kiện – luồng tài khoản tổ chức chưa có người đại diện theo pháp luật (theo web /nop-don-khoi-kien, GD.NGUOI_DAI_DIEN): màn mới draftNoRep – hộp chặn trên Trang chủ, hiện trước hộp đơn soạn dở: biểu tượng khiên trong vòng đỏ nhạt, tiêu đề "Chưa có người đại diện theo pháp luật", mô tả "Tổ chức chưa có người đại diện theo pháp luật đang có hiệu lực. Vui lòng khai báo người đại diện trong Hồ sơ tổ chức trước khi nộp đơn.", 1 nút "Khai báo người đại diện" → Thông tin tài khoản – Tổ chức (accountOrg; web /tai-khoan). Như web: không có nút đóng, nền mờ không đóng hộp. Trang chủ "Nộp đơn ngay" → draftNoRep; các lối khác (thẻ Nộp đơn khởi kiện, Nộp đơn mới) vẫn vào hộp đơn soạn dở.
- 12/11/2026 (v324): Nộp đơn khởi kiện – 3 hộp xác nhận cùng kiểu hộp đơn soạn dở, chọn bộ biểu tượng M3 (đề xuất M1/M2/M3 sau C1/C2/C3): hình minh họa trong vòng đỏ nhạt + huy hiệu đỏ, chữ căn giữa, nút đỏ trên + nút xám dưới. (1) "Chưa có người đại diện theo pháp luật": hình cccd + huy hiệu cảnh báo, thêm nút "Bỏ qua" (xám) → hiện tiếp hộp đơn soạn dở rồi đi tiếp luồng (người dùng yêu cầu; web không có). (2) "Đổi loại việc?" (theo web KD): ở bước 1 đơn soạn dở (sub1d) đổi Loại thủ tục / Lĩnh vực / Loại việc cụ thể → hộp; Tiếp tục = áp dụng, Hủy = giữ nguyên; hình xemXet + cảnh báo. (3) "Đổi cách nhập nội dung đơn?" (theo web): bước 4 đổi giữa Nhập thông tin / Tải đơn có sẵn khi cách đang dùng đã có nội dung → hộp; Tiếp tục = đổi và xóa nội dung cách cũ, Hủy = giữ; hình banSao + cảnh báo. Màn mới để xem nhanh: sub1Doi, sub4Doi. Hàm chung IlloBadge, XnDoi (s3.js).
- 12/11/2026 (v325): Nộp đơn – Bước 3: chặn trùng đương sự (theo web lw/uw/gw), chọn phương án T1 (đề xuất T1 lỗi dưới ô / T2 + khóa Tiếp theo / T3 + thẻ viền đỏ): ô Số giấy tờ của người bị kiện / người có QL, NV liên quan trùng người khởi kiện hoặc người đồng khởi kiện (Bước 2) → "Người này đã có ở bước Người khởi kiện (là người khởi kiện hoặc người đại diện) — không được xuất hiện lại ở bước Bị kiện/Người liên quan."; trùng đương sự khác ở Bước 3 → "Số giấy tờ này đã được dùng cho một đương sự khác trong đơn — mỗi người chỉ được xuất hiện 1 lần."; ô viền đỏ nền đỏ nhạt + dòng lỗi có biểu tượng; chỉ kiểm tra khi đủ độ dài số; "Tiếp theo" vẫn đỏ nhưng khi còn lỗi không sang Bước 4, cuộn tới ô lỗi. Màn xem nhanh sub3Trung. (Mã số thuế tổ chức: chưa làm – ô MST bước 3 là ô nhập thường.)
- 12/11/2026 (v326): Nộp đơn – Bước 1: loại việc không phù hợp loại tài khoản, chọn phương án K1 như web (đề xuất K1 thông báo nổi / K2 dòng khóa + thông báo / K3 dòng khóa + lỗi dưới dòng): bấm loại việc không phù hợp → thanh thông báo nổi, không chọn được, bảng chọn vẫn mở. Câu theo web: "Bạn không thể tạo đơn với loại việc này" (loại việc chi tiết không dành cho loại tài khoản đang đăng nhập); "Loại đơn này chỉ dành cho cơ quan có thẩm quyền." (loại việc chỉ cho cơ quan). Dữ liệu mẫu (web lấy từ danh mục): loại việc chi tiết "Bí mật kinh doanh" (Đ.26.4) – không dành cho tài khoản cá nhân; loại việc cụ thể VA-DS-7 (Đ.26.7) – chỉ dành cho cơ quan. Biến LVCT_CHAN, LV_CO_QUAN (s3.js).
- 12/11/2026 (v327): Nộp đơn – Bước 4 "Nhập thông tin" đổi theo trường web (thay 1 ô Nội dung đơn chọn 02/11/2026): Thời điểm phát sinh vụ việc* (ngày, gợi ý "Là mốc đối chiếu thời hiệu khởi kiện"), Tóm tắt quá trình sự việc* ("Mô tả theo trình tự thời gian (tối thiểu 100 ký tự)"), Căn cứ pháp lý (tùy chọn); khối "Yêu cầu Tòa án giải quyết*" chọn Y1 thẻ con (đề xuất Y1/Y2 thẻ gọn mở-thu/Y3 danh sách liền): mỗi yêu cầu 1 thẻ "Yêu cầu n" + nút xóa (aria "Xóa dòng yêu cầu"), Nội dung yêu cầu*, Giá trị kê khai (VNĐ) (ngăn cách nghìn bằng dấu chấm, gợi ý "Yêu cầu không tính tiền thì để trống"), Mô tả chi tiết yêu cầu; nút "Thêm nội dung yêu cầu"; "TỔNG GIÁ TRỊ KÊ KHAI: n đ" (— khi 0). Bước 6 khối Nội dung đơn theo web: Thời điểm phát sinh (trống → —), Tóm tắt sự việc, Căn cứ pháp lý (nếu có), Yêu cầu n "nội dung — n VNĐ / không kê khai giá trị", Tổng giá trị kê khai n VNĐ (chỉ khi > 0, chỉ hiển thị); không có yêu cầu → "Nội dung yêu cầu: —". "Đổi cách nhập… → Tiếp tục" xóa cả các trường mới. Màn xem nhanh sub4Yc (2 yêu cầu 100.000.000 + 50.000.000). Prototype luôn hiện Thời điểm phát sinh (web: loại việc dùng biểu mẫu điện tử thì không có các trường này).
- 12/11/2026 (v328): Nộp đơn – Bước 6 hộp "Xác nhận đơn?": biểu tượng đổi sang kiểu hộp đơn soạn dở (hình minh họa đơn nopDon trong vòng đỏ nhạt + huy hiệu cảnh báo đỏ); xác nhận lại đơn đã có người ký mà danh sách đương sự phía nguyên đơn đã thay đổi → thêm khối cảnh báo vàng (chọn W2, đề xuất W1 khối đỏ nhạt / W2 khối vàng / W3 dòng chữ đỏ): biểu tượng cảnh báo + "Danh sách đương sự phía nguyên đơn đã thay đổi so với lần xác nhận trước và đã có người ký — toàn bộ chữ ký hiện có sẽ mất hiệu lực và cần ký lại từ đầu." (cụm "toàn bộ chữ ký hiện có sẽ mất hiệu lực" đậm đỏ; câu theo web). Nút giữ nguyên (Hủy | Đồng ý cạnh nhau). Màn xem nhanh sub6Lai (prototype không lưu trạng thái ký nên chỉ xem qua màn này).
- 12/11/2026 (v329): Danh sách đơn và tiến trình – thẻ đơn: dòng "Mã tiếp nhận" thêm ngày tiếp nhận sau mã, dạng "TN-20261020-0012 - 20/10/2026" (người dùng yêu cầu); đơn nháp chưa có mã (—) thì không thêm ngày.
- 12/11/2026 (v330): Nộp đơn – Bước 7 Ký số khi người khởi kiện là tổ chức, chọn O1 (đề xuất O1 nhóm 2 dòng / O2 bước dọc / O3 thanh tiến độ + 1 nút; theo web jD/sie/oie): khung nhóm (biểu tượng tòa nhà + tên tổ chức + nhãn "cần 2 chữ ký"), dòng 1 "Chữ ký cá nhân đại diện" + nút "Ký số đại diện", dòng 2 "Chữ ký tổ chức" + nút "Ký số tổ chức" (khóa, biểu tượng ổ khóa, ghi "Cần chữ ký của cá nhân đại diện trước." tới khi đại diện ký xong); ký xong mỗi dòng hiện "Đã ký" + thời điểm; ký đủ 2 thì bật "Nộp đơn". Trạng thái: hồ sơ đang có người ký → khối vàng "Hồ sơ đang có người ký, hệ thống đang xử lý — vui lòng chờ rồi thử lại." và khóa các nút; tải lỗi → "Không tải được tiến độ ký. Vui lòng thử lại." (chữ đỏ có biểu tượng). Màn xem nhanh: sub7Tc, sub7TcBan, sub7TcLoi. Màn Bước 7 cá nhân (sub7) giữ nguyên.
- 12/11/2026 (v331): Soạn đơn – nhóm địa chỉ (AddrG: Địa chỉ thường trú / hiện tại / tạm trú…) tách mỗi ô một dòng: Tỉnh/TP, Phường/Xã, Địa chỉ chi tiết xếp dọc rộng hết khung (trước: Tỉnh/TP và Phường/Xã cùng một hàng). Hàm dùng chung nên áp dụng cả 4 chỗ dùng AddrG ở s5.js.
- 12/11/2026 (v332): Mở đơn nháp (Danh sách đơn và tiến trình) – chọn L3 (đề xuất L1 toàn màn giữa màn / L2 khung xương / L3 hộp trên danh sách; câu theo web): bấm thẻ đơn nháp ("Tranh chấp hợp đồng thuê nhà", Tiếp tục soạn) → ở lại danh sách, hộp giữa màn vòng quay "Đang tải đơn để chỉnh sửa…", tải xong tự vào Bước 1 đơn soạn dở (sub1d); lỗi → hộp cùng kiểu hộp đơn soạn dở (hình minh họa đơn + huy hiệu cảnh báo) "Không tải được đơn để chỉnh sửa." + "Thử lại" (đỏ, tải lại) / "Về Quản lý đơn" (xám, đóng hộp về danh sách). Màn: draftLoad, draftLoadErr (nền applications).
- 12/11/2026 (v333): Chia 2 luồng theo loại tài khoản (theo web loaiTaiKhoan = DoanhNghiep): Đăng nhập thêm thanh chọn Cá nhân | Tổ chức trên ô Tài khoản (mặc định Cá nhân); danh sách chọn màn giữ nguyên, nội dung màn đổi theo loại đã chọn. Tổ chức: tên mẫu "Công ty ABC" (giữ MST 0101234567 + trụ sở Số 25 Láng Hạ) – Trang chủ/Cá nhân: tên, avatar CA, nhãn "Tổ chức"; Thông tin tài khoản bỏ tab demo, hiện Hồ sơ cá nhân/Hồ sơ tổ chức theo loại; Nộp đơn ngay → hộp chưa có người đại diện chỉ với tổ chức (cá nhân → hộp đơn soạn dở); bước 1 loại việc "Bí mật kinh doanh" chỉ chặn cá nhân; bước 2 người khởi kiện mặc định Tổ chức (Công ty ABC); bước 7 ký 2 chữ ký (đại diện + tổ chức); Chữ ký số: chứng thư mặc định theo tư cách "Cá nhân đại diện" (Họ tên · Chức vụ) + "Tổ chức"; Giao nộp: "Ký số tổ chức"; Khiếu nại hành chính/Tố cáo/Kiến nghị: Người gửi đơn = Tên tổ chức, Mã số thuế / mã định danh, Địa chỉ trụ sở, Người đại diện theo pháp luật, Chức vụ người đại diện, bỏ "Có người khác cùng…", xem lại "Tổ chức gửi đơn"; Trích lục bước 3 + Sao chụp tài liệu: thêm khối "Giấy giới thiệu / Công văn" (Số / ký hiệu, Ngày ký; bắt buộc khi tư cách Cơ quan nhà nước thực hiện công vụ và tự nhập bản án); các màn khác: lớp dữ liệu thay Hoàng Dương → Công ty ABC, CCCD → Mã số thuế, thường trú → Địa chỉ trụ sở, ẩn Ngày sinh/Giới tính/Quốc tịch/Ngày cấp/Nơi cấp của tổ chức.
- 12/11/2026 (v334): Luồng Tổ chức – sửa 3 chỗ câu chữ (đề xuất 3 phương án, chọn P1 / P1 / theo web): (1) câu khối Ký số theo web soạn đơn KNTC "…được ký một lần bằng chữ ký số cá nhân của bạn."; (2) Chữ ký số: chứng thư theo tư cách ký – Cá nhân đại diện dùng chứng thư NGUYỄN VĂN BÌNH (VNPT-CA), Tổ chức dùng CÔNG TY ABC (Viettel-CA), ô chứng thư mặc định chọn theo nhóm; danh sách "Chứng thư số của bạn" chia nhóm "Cá nhân đại diện · Nguyễn Văn Bình" / "Tổ chức" (web U5/Dhe; dữ liệu mẫu); (3) dòng người ký ở các màn ký dùng chung (KyGui: trích lục, khiếu nại tố cáo…; KyGuiDon: đơn liên quan, phản tố…; Giao nộp tài liệu) đổi thành khối "Công ty ABC – cần 2 chữ ký" (Ký số đại diện → Ký số tổ chức) như web (rO → jD/sie), giống bước 7 nộp đơn.
- 12/11/2026 (v335): Phương thức giao dịch điện tử – đề xuất P1 thẻ riêng / P2 một khối / P3 nhóm theo phương thức (theo design system: bộ lọc trong khối trắng, MethodCard); người dùng chọn sắp xếp thẻ tương tự Danh sách đơn và tiến trình: hàng đầu nhãn phương thức (+ tình trạng "Còn n ngày Tòa trả lời" khi Chờ Tòa duyệt), tên hồ sơ đậm, các dòng nhãn – giá trị Đơn/Vụ án/Vụ việc (mã) · Tòa án · Tư cách (thay chip vai trò) · Tống đạt qua (khi có), vạch kẻ rồi nút thao tác như v318; ô tìm, chip lọc, tự tải thêm 4 hồ sơ giữ nguyên.
- 12/11/2026 (v336): Lấy Danh sách đơn và tiến trình làm chuẩn – làm lại 2 màn Cấp trích lục, bản sao (Theo dõi yêu cầu) và Khiếu nại — Tố cáo (nguồn KNTC hành chính + QLA trong tố tụng): header kiểu Danh sách đơn (quay lại, tên màn, nút đỏ góc phải "Tạo yêu cầu mới" / "Nộp đơn mới"; bỏ nút đỏ rộng và dòng mô tả); thẻ kiểu QdCard: hàng nhãn trạng thái + tình trạng (vd Đang giải quyết · Yêu cầu bổ sung; Đã giải quyết · Đã cấp), tên đậm (tên vụ án / nội dung đơn), dòng nhãn – giá trị (Mã yêu cầu/Mã hồ sơ + ngày gửi, Loại yêu cầu/Loại đơn, Văn bản, Thủ tục, vụ án liên quan, Mã QLA, Người gửi, Tòa án, Dự kiến trả), khối "Việc cần làm" (Bổ sung hồ sơ, Thực hiện nghĩa vụ tài chính (lệ phí, án phí), Tiếp tục soạn / Xóa nháp); ô tìm, chip trạng thái, thẻ nguồn KNTC/QLA, ô tổng hồ sơ, thanh thời hạn và nút thao tác QLA giữ nguyên.
- 12/11/2026 (v337): Cài đặt (menu Cá nhân) – mục đầu "Thông tin tài khoản" đổi tên theo loại tài khoản: cá nhân "Hồ sơ cá nhân", tổ chức "Hồ sơ tổ chức" (vẫn mở màn Hồ sơ tương ứng).
- 12/11/2026 (v338): So sánh web (/faq, /danh-gia-hai-long, develop @ 3a125483) với app; thiết kế lại 2 màn Câu hỏi thường gặp và Đánh giá mức độ hài lòng theo khung Danh sách đơn và tiến trình (tự chọn 1 phương án theo yêu cầu): header kiểu Danh sách đơn; ô tìm + chip lọc dính đầu (FAQ: chủ đề kèm số câu hỏi; Đánh giá: Tất cả / Vụ án / Đơn thay 2 khối có ô tìm riêng); mỗi mục một thẻ – FAQ: nhãn nhóm chủ đề in hoa, thẻ câu hỏi (Cập nhật ngày · câu hỏi đậm · đoạn xem trước · Xem chi tiết/Thu gọn · khối phản hồi hữu ích ngăn vạch kẻ), Góp ý của tôi (câu hỏi · Mã · Ngày gửi · Nội dung góp ý); Chờ đánh giá (Chờ đánh giá · Hạn đánh giá; Mã hồ sơ, Loại, Tòa án, Có kết quả; Việc cần làm "Đánh giá dịch vụ"); Đánh giá đã gửi (sao + Ẩn danh; Mã hồ sơ, Loại, Tòa án, Ngày đánh giá; nhận xét + sao từng tiêu chí). Bổ sung luồng web có mà app chưa có: gửi đánh giá hồ sơ lỗi "Bạn đã đánh giá hồ sơ này." / "Hồ sơ đã hết thời hạn đánh giá." / "Hồ sơ chưa hoàn thành hoặc không tồn tại." (về danh sách + thông báo; màn ratingErrDa/Het/Hs), đánh giá Cổng lỗi "Bạn đã đánh giá Cổng trong kỳ này. Hãy sửa đánh giá đã gửi." / "Kỳ đánh giá đã kết thúc, không sửa được phiếu." (ratingsPortalDaCo/Dong), Kết quả công khai – khối Cổng dưới ngưỡng lượt chỉ còn tiêu đề (ratingsPublicLow). Câu chữ thiếu: [Không có hồ sơ chờ đánh giá], [Bạn chưa gửi đánh giá nào].
- 12/11/2026 (v339): Câu hỏi thường gặp sắp xếp theo chủ đề (PA B người dùng chọn): mỗi chủ đề 1 khối (biểu tượng · tên · số câu hỏi), câu hỏi là dòng gọn; chạm câu hỏi mở chi tiết dạng bảng từ đáy (chủ đề, ngày cập nhật, câu trả lời, Hữu ích / Cần cải thiện). Biểu tượng chủ đề: web/CSDL chưa có trường biểu tượng [Cần bổ sung ở web], tạm gán theo chủ đề mẫu. 505 màn × 2 luồng không lỗi.
- 12/11/2026 (v339b): Đánh giá mức độ hài lòng: bỏ dòng tóm tắt (số hồ sơ chờ · đã gửi · đánh giá Cổng) dưới thanh tab và câu mô tả ở tab Chờ đánh giá. 505 màn × 2 luồng không lỗi.
- 12/11/2026 (v340): Đánh giá mức độ hài lòng › Chờ đánh giá: thay khối "Việc cần làm" bằng chân thẻ: "Hạn đánh giá: dd/mm/yyyy" bên trái + nút đỏ nhỏ "Đánh giá" bên phải (PA B người dùng chọn). 505 màn × 2 luồng không lỗi.
- 12/11/2026 (v340b): Thẻ Chờ đánh giá: bỏ "Hạn đánh giá" ở hàng trên cùng (chỉ còn nhãn Chờ đánh giá); hạn chỉ hiện ở chân thẻ cạnh nút Đánh giá. 505 màn × 2 luồng không lỗi.
- 12/11/2026 (v341): Thẻ Chờ đánh giá: nhãn mã theo loại hồ sơ (Đơn → "Mã tiếp nhận", Vụ án → "Mã định danh"); "Loại" chuyển thành thẻ (StatusBadge tone neutral) cạnh nhãn trạng thái, bỏ dòng Loại. 505 màn × 2 luồng không lỗi.
- 12/11/2026 (v341b): Thẻ Đánh giá đã gửi áp dụng như Chờ đánh giá: nhãn mã theo loại (Đơn → Mã tiếp nhận, Vụ án → Mã định danh); Loại thành thẻ xám ở hàng đầu (trước sao, Ẩn danh), bỏ dòng Loại. 505 màn × 2 luồng không lỗi.
- 12/11/2026 (v342): Phương thức giao dịch điện tử: nút "Chuyển giấy đến khi kết thúc" bỏ style riêng (viền xám, chữ đỏ danger), dùng chung kiểu secondary như "Tạm chuyển sang giấy" (viền + chữ đỏ #A3131C). 505 màn × 2 luồng không lỗi.
- 12/11/2026 (v343): Quản lý chữ ký số › thẻ chứng thư: nút "Xóa khỏi danh sách" bỏ style riêng (viền xám đậm, chữ đỏ danger), dùng chung kiểu secondary như "Kiểm lại" (viền + chữ đỏ #A3131C). 505 màn × 2 luồng không lỗi.
- 12/11/2026 (v344): Quản lý chữ ký số › Lịch sử ký: chạm vào vùng thẻ mở bảng từ đáy "Danh sách tệp đã ký" (giữ kiểu danh sách cũ: ô nền xám, Đã ký/Lỗi, Xem); bỏ nút Xem tệp/Thu gọn, thêm dấu › cạnh số tệp. Màn signHistOpen mở sẵn bảng. 505 màn × 2 luồng không lỗi.
- 12/11/2026 (v345): Hộp thư tống đạt bổ sung theo so sánh web /hop-thu (develop @ ae854d37), người dùng duyệt từng mã: HT-W05 tên việc cần làm trên dòng hạn xử lý của thẻ thư; HT-W06 lỗi tải danh sách (inboxErr) và lỗi tải văn bản (mailDetailErr); HT-W07 mở từ Việc cần làm giữ chưa đọc (mailDetailGiu); HT-W09 trích yếu [Trích yếu văn bản]; HT-W10 chưa có bản số hóa (mailDetailNoFile) + "Không tải được tệp."; HT-W11 dải "Đã ký số bởi … · CKS hợp lệ · Tống đạt điện tử …"; HT-W12 dòng "Bạn đã mở văn bản này lần đầu lúc …"; HT-W13 nút khóa vì có văn bản mới hơn (mailDetailThay); HT-W14 "việc bạn có thể làm" ngoài nhóm + hết hạn nộp (mailDetailViec, mailDetailViecHet); HT-W15 gợi ý theo loại văn bản (mailCtaBs/Ap/Tt/Kq/NoHs); HT-M05 bỏ "Xem vụ án" ở khối BPKCTT và Quyết định. Không áp dụng: W01–W04, W08. 517 màn × 2 luồng không lỗi.
- 12/11/2026 (v346): Chi tiết văn bản tống đạt: khối "Đã ký số / mở lần đầu" đổi sang PA B trong khối trắng tách nền – 3 dòng chữ nhỏ có biểu tượng: "Đã ký số bởi … · CKS hợp lệ" (xanh), "Tống đạt điện tử …", "Bạn đã mở văn bản này lần đầu lúc …" (xám). 517 màn × 2 luồng không lỗi.
- 12/11/2026 (v347): Chi tiết văn bản tống đạt: trích yếu 14px in thường (trước in đậm 600). 517 màn × 2 luồng không lỗi.
- 12/11/2026 (v348): Hòa giải, đối thoại bổ sung theo so sánh web /hoa-giai-doi-thoai (develop @ ae854d37, coreapi @ 554bcb14), người dùng duyệt từng mã. Chi tiết theo khung Chi tiết đơn (PA B): khối việc gọn (tên việc · hạn · nút chính · nút mở hành động khác) + dòng "Đối tượng xử lý · Theo văn bản", 2 tab Tiến trình | Thông báo/Tống đạt (số chưa đọc). HG-W01 lỗi tải danh sách; W02 lỗi chi tiết (mã không hợp lệ, lỗi tải, không tìm thấy); W03 tab thông báo: chưa đọc nổi bật, "Chưa có bản số hóa", rỗng, lỗi; W04 đối tượng xử lý + theo văn bản; W05 hết hạn khóa nút; W06 Vào phòng họp trực tuyến (khóa khi chưa có đường dẫn); W07 nút Xem ở từng mốc, mốc "Đã trả lời — Đồng ý", rỗng; W08 văn bản: phòng họp trực tuyến, chưa có bản số hóa; W09 trạng thái ý kiến đồng nguyên đơn; W10 khóa sau ký + "Sửa … và ký lại"; W11 tổ chức ký đại diện → ký tổ chức; W12 tài liệu đính kèm (Xem · Thay tệp · Xóa, 20 tệp/20MB) + ký số tài liệu PDF; W13 hoãn phiên khi chưa có phiên; W14 xem xét lại khi chưa có QĐ, "Sinh năm [năm sinh]"; W15 hồ sơ Đối thoại (nhãn đối thoại, đối thoại viên). HG-M01 bỏ nút ★; HG-M02 đề nghị/rút đơn chỉ trong khối việc. 17 màn mới. 534 màn × 2 luồng không lỗi.
- 12/11/2026 (v349): Đăng ký người bảo vệ theo khung Danh sách đơn và tiến trình (người dùng chọn): header có nút "Đăng ký mới" góc phải (bỏ nút đỏ rộng), chip trạng thái thêm Lưu nháp, bỏ nút ★; thẻ: nhãn trạng thái · tiêu đề "Tư cách + tên người bảo vệ" · Mã đăng ký, Hồ sơ liên quan, Ngày gửi · Việc cần làm "Tiếp tục soạn" khi lưu nháp. Chi tiết đăng ký theo khung Chi tiết đơn: 2 tab Thông tin đăng ký | Kết quả xử lý, khối lý do khi bị từ chối. 534 màn × 2 luồng không lỗi.
- 13/11/2026 (v350): Quản lý đơn nhóm 1 theo so sánh web /quan-ly-don (develop @ ae854d37), người dùng duyệt demo. W01 trình tự "Bổ sung, sửa đổi hồ sơ" 4 bước (bs1–bs4, bsOk; hộp "Đơn này đã được bổ sung hồ sơ") thay cho Giao nộp tài liệu ở chi tiết đơn; W02 khối "Tòa án yêu cầu bổ sung tài liệu" ở tab Tài liệu chứng cứ (Tải lên → danh sách tệp + Lưu; quá hạn đỏ, ẩn nút); W04 thẻ đơn đã nộp có "Xem đơn", bấm thẻ mở tệp đơn; W05 hộp xác nhận nộp thêm (sửa đổi bổ sung, thay đổi rút một phần, BPKCTT); W06 dòng kết quả giải quyết (nhãn + diễn giải); W07 khối "Khiếu nại văn bản, thông báo tố tụng" (khóa khi hết thời hiệu); W08 khối Vụ án và Tạm ứng án phí ở tab Thông tin chung; W09 khối bổ sung hồ sơ hết hạn (đỏ, khóa 2 nút) và đã nộp bản sửa (xanh); W10 chấm đỏ tab Văn bản tống đạt; W11 chip Tất cả loại / Phản tố / Yêu cầu độc lập ở tab phản tố; W12 nút theo loại đơn khi chưa có đơn (Xem danh mục vụ án / Đề nghị GĐT, tái thẩm / Nộp đơn mới); W13 lỗi tải danh sách (Mã lỗi), chi tiết (Thử lại + Quay lại), không tìm thấy đơn, lỗi tab Danh sách đơn / Tài liệu / Văn bản; W14 việc bị khóa có biểu tượng khóa, bấm báo lý do. 22 màn mới.
- 13/11/2026 (v351): Quản lý đơn nhóm 2 – đơn phản tố, yêu cầu độc lập theo so sánh web /quan-ly-don (develop @ ae854d37), người dùng duyệt demo. W01 màn chi tiết riêng đơn yêu cầu độc lập (ycDetail; nhãn "Đơn yêu cầu độc lập", tư cách Người có quyền lợi, nghĩa vụ liên quan; danh sách mở đúng màn); W02 bổ sung hồ sơ đơn YCĐL 4 bước (ybs1–ybs4); W03 khối đầu màn theo trạng thái (chờ xử lý rút đơn, Tòa yêu cầu bổ sung / hết hạn, nộp tạm ứng / hết hạn, chưa gửi chờ ký số, đã đến hệ thống, trả lại đơn còn / hết hạn khiếu nại); W04 nút theo ma trận, nút khóa mờ có biểu tượng khóa, bấm báo lý do (DtViec b.khoa, tone info); W05 hộp "Xác nhận nộp thêm đơn"; W06 thông tin đơn thêm Ngày gửi đơn, Mã tiếp nhận; W07 Đơn phát sinh: đã gửi bấm xem đơn, nháp Tiếp tục soạn mở đúng trình tự; W08 báo "Đơn không còn ở trạng thái được rút.", không tìm thấy đơn, lỗi tải; W09 bổ sung hồ sơ bắt buộc ≥1 tài liệu + so sánh trước/sau; W10 rút đơn / rút toàn bộ yêu cầu 3 bước riêng (prd, prdVA, yrd); W11 thay đổi / rút một phần yêu cầu 5 bước riêng (ptd, ytd); W12 khiếu nại trả lại đơn 3 bước riêng (pkn, ykn) + màn "Không thể khiếu nại việc trả lại đơn"; W13 màn đã gửi dùng chung (Mã hồ sơ, Đơn liên quan, Trạng thái, Xem đơn liên quan). Bỏ M02 dòng Nội dung yêu cầu thứ tư, M03–M05 (luồng riêng không còn khối của đơn khởi kiện), M06 Thời điểm gửi. Góp ý mới: Mobile không xem tệp trực tiếp trong màn – mọi nút Xem tệp (IcoBtn con mắt, DtDocs, khối Ký số, thư viện tệp, dòng tài liệu tải lên) mở màn xem tệp (attachment); bỏ 3 ô xem văn bản nhúng (DocumentPreview). 57 màn mới.
- 13/11/2026 (v352): Quản lý đơn nhóm 3 – Kháng cáo theo so sánh web /quan-ly-don (develop @ ae854d37), người dùng duyệt demo. W01 trình tự "Thay đổi, rút kháng cáo" 3 bước (kct1–kct3, kctOk; chọn Thay đổi, bổ sung / Rút một phần / Rút toàn bộ; vào từ nút Rút đơn); W02 hàng nút theo ma trận ở khối đầu màn: Bổ sung (khóa khi Tòa chưa yêu cầu, có dòng lý do), Rút đơn; Bổ sung mở đúng Sửa đơn kháng cáo (kcs1, trước mở nhầm sd1); W03 hộp "Nộp thêm bản sửa đổi, bổ sung đơn?"; W04 khối đầu màn theo tình trạng (quá hạn cần giải trình, nộp tạm ứng án phí phúc thẩm, đang lưu tạm, chờ ký số, đã đến hệ thống) có nút X đóng; W05 tiến trình Đã gửi đơn → Đang xử lý đơn → Đã xử lý đơn; W06 nút Tải về tài liệu đính kèm; W07 văn bản của đương sự khác ghi "Không có trong Hộp thư của bạn"; W08 Đơn phát sinh: đã gửi bấm xem đơn, nháp Tiếp tục soạn mở đúng trình tự (kcs1, kqh1); W09 không tìm thấy đơn kháng cáo, lỗi tải có Mã lỗi. Thẻ kháng cáo ở danh sách mở đúng trạng thái (appealSua, appealQuaHan, appealTamUng). DtViec thêm o.note, o.dong. 18 màn mới.
- 13/11/2026 (v353): Quản lý đơn nhóm 4 – Giám đốc thẩm, tái thẩm theo so sánh web /quan-ly-don (develop @ ae854d37), người dùng duyệt demo. W01 khối "Đơn đang lưu tạm" + Tiếp tục soạn; W02 đơn tái thẩm riêng (gdtTt; nhãn "Đơn tái thẩm", Ngày biết căn cứ · đã quá hạn N ngày, khối Cách biết được căn cứ chỉ ở đơn tái thẩm; danh sách mở đúng màn); W03 khối Biên nhận tiếp nhận điện tử có nút Xem; W04 văn bản tống đạt có nút Xem tại dòng, văn bản người khác ghi "Không có trong Hộp thư của bạn"; W05 hộp "Nộp thêm bản sửa đổi, bổ sung đơn?"; W06 nút khóa có dòng lý do; W07 nút Nộp tiền + Đề nghị miễn, giảm án phí; W08 Danh sách đơn: nháp Tiếp tục soạn mở đúng trình tự; W09 không tìm thấy / lỗi tải; W10, W11 ô cam đoan bắt buộc ở Rút đơn, Sửa đổi bổ sung; W12 sửa đổi bước 1 banner hạn (Còn N ngày / ≤3 ngày đỏ / Quá hạn / Vô thời hạn) – bỏ M02 thẻ "Thông báo của Tòa án"; W13 tệp bắt buộc tên + loại tài liệu; W14 rút đơn bị chặn khi đã có kết quả; W15 nạp lại bản nháp rút đơn có thông báo. 13 màn mới.
- 13/11/2026 (v354): Quản lý đơn nhóm 1 theo chuẩn Soạn đơn (người dùng duyệt demo; luồng giữ theo web). Trình tự "Bổ sung, sửa đổi hồ sơ" giữ tiêu đề tên chức năng, đầu mỗi bước có thẻ loại đơn + mã, tên đơn (KnTT); bước 2 Tài liệu dùng khối bước 5 Soạn đơn (TaiLieuCard: dòng tệp ✓ tên, tệp · loại, nút sửa; 2 ô Tải lên / Kho dữ liệu); bước 4 Xem lại gồm khối con gập/mở có nút sửa về đúng bước (RvKhoi) + khối Ký số, Tài liệu đính kèm kiểu bước 7 + cam đoan; màn đã gửi kiểu "Đã gửi đơn thành công" (Mã tiếp nhận, Đơn liên quan, Thời điểm gửi, Trạng thái). Hộp "Đơn này đã được bổ sung hồ sơ" và các hộp xác nhận nộp thêm (W05) dùng kiểu hộp thoại có hình của Soạn đơn (SdDlg). Khối "Tòa án yêu cầu bổ sung tài liệu" ở tab Tài liệu chứng cứ dùng khối bước 5 (nhãn hạn, nội dung yêu cầu, dòng tệp, 2 ô tải lên, Lưu khi đã chọn tệp; quá hạn ẩn tải lên).
