Hệ thống thiết kế cho ứng dụng di động Cổng Dịch vụ Tư pháp. Màu chỉ lấy từ bộ màu chính thức của dự án (cộng màu trắng): đỏ chủ đạo, nền xám lạnh, trạng thái 4 lớp (chữ, nền, viền, chấm), vàng dùng hạn chế. Chữ dùng một họ phông Roboto. Bố cục màn hình và kiểu icon minh họa theo app My VN Post. Công dân dùng ứng dụng để nộp đơn khởi kiện dân sự, hành chính; theo dõi tiến trình tố tụng, xét xử, tống đạt điện tử; xin trích lục bản sao, gửi khiếu nại tố cáo và xem lịch tiếp dân.

**Trạng thái: đã chốt ngày 30/10/2026.** Màu đỏ chủ đạo `#A3131C`; phương án component đã chọn: Stepper C, FileUpload B, Tabs `underline`/`chip`, ProcessSteps `brand`/`light`, BottomNav có nút "Nộp đơn" ở giữa, HomeHeader có nhãn vai trò, Accordion thẻ riêng chọn bằng radio, RecordCard/CaseCard phương án D; AppBar: màn chức năng con dùng `variant="plain"` nền trắng (phương án A, 30/10/2026), màn trên thanh điều hướng giữ header đỏ; bỏ Breadcrumb; SearchToolbar C, EmptyState C, StatSummary tạm chọn B. Các câu chữ ở mục "Nội dung chờ cung cấp" chưa chốt.

**Cách cập nhật:** design system được bổ sung dần trong quá trình thiết kế. Mỗi component mới được đề xuất 3 phương án để chủ dự án chọn; chỉ thêm vào design system sau khi đã chọn.

## Nội dung và giọng văn

- Nhãn nút và menu dùng câu mệnh lệnh ngắn: "Đăng nhập bằng VNeID", "Nộp đơn", "Gửi đơn", "Tra cứu", "Xem hướng dẫn".
- Thông báo chính thức xưng "Ông/Bà". Dùng đúng thuật ngữ tố tụng: thụ lý, tống đạt, hòa giải, phiên tòa sơ thẩm, trích lục, bản án.
- Mô tả dịch vụ một câu, có dấu chấm: "Soạn và gửi đơn khởi kiện kèm tài liệu trực tuyến."
- Tiêu đề banner chào và tên cổng viết hoa toàn bộ ("TÒA ÁN ĐIỆN TỬ", "CỔNG DỊCH VỤ TƯ PHÁP"); mọi tiêu đề khác viết hoa chữ đầu câu ("Dịch vụ khác").
- Nhãn nhỏ trên tiêu đề và nhãn nhóm viết hoa, kiểu `overline`: "QUY TRÌNH", "BƯỚC 01 / 04", "HÔM NAY". Nhãn trạng thái luôn viết chữ thường: "Chờ xử lý", "Đã nhập", "Đang diễn ra" (chốt 30/10/2026).
- Ngày `dd/mm/yyyy`, giờ `HH:mm`; số tiền dùng dấu chấm phân cách nghìn và đơn vị "đ" ("300.000 đ"). Số thụ lý giữ đúng định dạng: "125/2026/TLST-DS". Tổng đài ghi liền: "19006126".
- Không dùng biểu tượng cảm xúc (emoji).

## Màu sắc

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

## Chữ

- Một họ phông: **Roboto** 400 / 500 / 700, có đủ dấu tiếng Việt. File phông nằm ở `fonts/` (Roboto 2.137, giấy phép Apache 2.0 ở `fonts/Roboto-LICENSE.txt`); Android có sẵn Roboto, iOS và web nhúng 3 file này.
- **Thang 6 cỡ: 10 · 12 · 14 · 16 · 20 · 24** (duyệt 30/10/2026). Line-height cố định theo cỡ: 10/14, 12/16, 14/20, 16/24, 20/28, 24/32; ngoại lệ duy nhất là số trong viên tròn (chấm đếm) giữ line-height bằng chiều cao viên. Không dùng cỡ nào khác.
- Tiêu đề: `display` 24/32 700 (Đăng nhập, Nộp đơn thành công, màn chào), `title-lg` 20/28 700 (lời chào, bottom sheet, hộp thoại, tiêu đề hồ sơ ở màn chi tiết), `title` 16/24 700 (tiêu đề AppBar màn con, vừa tiêu đề dài), `brand-name` 14/20 700 chữ hoa (tên cổng).
- Nội dung: `title-sm` 16/24 500 (tiêu đề thẻ, dòng danh sách, khối form, tiêu đề khối trắng dùng 16/24 700), `body-lg` 16/24 (chữ trong ô nhập, ô chọn, ô tìm; ô nhập 16px để iOS không tự phóng to), `button` 16/24 500, `body` 14/20, `label` 14/20 500, `caption` 12/16 (ngày giờ, chú thích, tên ô dịch vụ, nhãn BottomNav), `badge` 12/16 500.
- Nhãn và số: `overline` 12/16 500 chữ hoa giãn 0.6px (chỉ nhãn nhóm như "HÔM NAY"); `stat` 24/32 700; `code` 14/20 500 cho số thụ lý, mã đơn; `micro` 10/14 500 chỉ cho số và ký hiệu ngắn (số đếm, "PDF", nhãn tháng "T10"). Số liệu, ngày giờ, số tiền dùng số cùng độ rộng (`font-variant-numeric: tabular-nums`, lớp `tp-num`).
- **Nhãn trạng thái viết chữ thường** ("Đã nhập", "Đang diễn ra", "Chờ ký số"), không viết hoa toàn bộ. Chữ hoa chỉ dùng cho tên cổng và nhãn nhóm `overline`.
- Chỉ dùng 3 độ đậm 400, 500, 700. Hỗ trợ cỡ chữ hệ thống phóng to tới 200%.

## Bố cục, khoảng cách, hình khối

- Lưới 4px: `space-1` … `space-8`. Lề màn hình `space-4`; khoảng giữa thẻ `space-3`; giữa các khối trang chủ `space-4`.
- Bo góc: `radius-sm` 10px (nút nhỏ, tab), `radius-md` 13px (nút, ô nhập, dòng lựa chọn), `radius-lg` 16px (thẻ, banner), `radius-xl` 24px (mép nội dung đè header, bottom sheet), `radius-pill` (nhãn, số đếm).
- Nút cỡ thường, ô nhập một dòng, ô chọn và ô tìm kiếm cao `button-height` **46px** (thống nhất 30/10/2026); nút nhỏ `size="sm"` 36px chỉ dùng cho thao tác trong dòng, trong thẻ; ô nhập nhiều dòng cao theo nội dung. Vùng chạm tối thiểu `touch-min` 48px.
- **Không đặt thông tin trực tiếp trên nền trang** (`surface-page`). Mọi nhóm thông tin nằm trong khối trắng (kiểu thẻ: `surface`, viền `border`, `shadow-card`, `radius-lg`, đệm 16px): tiêu đề nhóm 16/24 700 + nội dung của nhóm trong cùng một khối. Bộ lọc (chip, ô tìm, số kết quả) gom vào một khối trắng đệm 12px. `Stepper` đặt trong khối trắng riêng ở đầu màn. Danh sách (`TaskList`, `NotificationList`, `MenuList`, `RecordCard`, `EventCard`) đặt trong khối thì bỏ khung riêng, nối dòng bằng đường kẻ `border`.
- Bóng: `shadow-card` cho thẻ, `shadow-float` cho thẻ nổi đè header và thanh cố định, `shadow-primary` dưới nút chính và thẻ "Nộp đơn khởi kiện", `shadow-panel` cho khối đỏ, `shadow-glow-red` dưới vòng icon đỏ.
- **Viền 1px** (chốt 02/11/2026): mọi viền của thành phần dùng 1px: thẻ, ô nhập, ô chọn, nút viền, ô đánh dấu, nút radio, chấm `Stepper`, `Accordion`, `Timeline`, `CaseProgress`, chip đang chọn của `Tabs`, ô hôm nay của `CalendarCard`, vùng tải tệp của `FileUpload`, khung `EmptyState`. Không dùng nét đứt: mọi viền là nét liền. Không thuộc quy tắc này: viền focus 2px, vạch vàng dưới header, góc khung `HeroBanner`, vòng tách quanh chấm/số đếm và vòng quay đang tải.
- Focus: viền đặc 2px `focus-ring` (`brand-800`) trên nền sáng, `white` trên nền đỏ.
- Chuyển cảnh tối đa 200ms; tắt khi hệ thống bật giảm chuyển động.

## Bố cục màn hình

Theo app My VN Post: header đỏ, phần nội dung bo góc đè lên mép dưới header, thẻ trắng nổi, nút hành động cố định ở đáy.

- **Trang chủ app TATC** (chốt 30/10/2026): `HomeHeader` đỏ (Quốc huy, tên cổng, nút Lịch, nút chuông, lời chào, nhãn vai trò) → thẻ 4 `ServiceTile` minh họa đè mép header → khối trắng "Việc cần làm" (liên kết "Xem tất cả" ở đầu khối, chip lọc, `TaskList`) → `BottomNav`. **Không dùng banner.**
- **Trang chủ cổng (bản web cũ)** (`HomeScreen`): `HomeHeader` (tên cổng, nút chuông có chấm vàng, lời chào, nhãn vai trò, thẻ tìm kiếm đè mép) → `BannerCarousel` (nút `gold`) → 2 `QuickAction` lớn ("Nộp đơn khởi kiện" `tone="red"`, "Hồ sơ của tôi" `tone="plain"`) → hàng `QuickAction` nhỏ → `SectionHeader variant="plain"` "Dịch vụ khác" + lưới 4 cột `ServiceTile` có icon minh họa (tối đa 8) → "Tin tức, thông báo" với 2 cột `NewsCard` → `ChatFab` → `BottomNav` 5 mục, mục giữa "Nộp đơn" là nút tròn đỏ nổi.
- **Đăng nhập**: màn flash nền đỏ (Quốc huy, nhãn "TÒA ÁN NHÂN DÂN TỐI CAO", tên cổng chữ hoa, thanh tải vàng) → đầu trang nền đỏ có `BackLink` "Về trang chủ", Quốc huy, tên cổng → khung trắng bo `radius-xl` đè mép: tiêu đề "Đăng nhập", `TextField` có `icon` (`idCard`, `lock`; mật khẩu có nút hiện/ẩn), `Button` khối, khi gửi dùng `loading` "Đang đăng nhập…".
- **Nộp đơn theo bước** (luồng Khiếu nại – kiến nghị): `AppBar` có Quốc huy và nút tài khoản → thẻ đầu gồm `Tag` loại đơn, tiêu đề `title-lg`, `Stepper` → thẻ form (`TextField`, `SelectField labelVisible`, `SegmentedControl`, `Checkbox`, `Notice`, `InfoList`, `FileUpload`) → `ActionBar` ở đáy. Chọn thủ tục dùng `Accordion`; chọn tệp từ kho và ký số dùng `Dialog`; màn kết quả dùng `InfoList variant="kv"` và `StatusBadge`.
- **Màn hình nhập nhiều bước** (`FilingScreen`): `AppBar variant="page"` → `tp-sheet` chứa các `FormSection` gập/mở có nhãn "Đã nhập" / "Chưa nhập" → trong khối dùng `SelectField`, `TextField`, `OptionItem` → `SummaryBar` cố định ở đáy (án phí + Lưu nháp + Gửi đơn).
- **Màn hình tra cứu, danh sách** (`ComplaintScreen`): `AppBar variant="page"` → `FilterCard` đè mép header → `Tabs variant="chip"` lọc nhanh → danh sách `RecordCard` cách nhau `space-3` (chạm cả thẻ để mở chi tiết) → `ChatFab`. `RecordCard` và `CaseCard` dùng chung một giao diện thẻ.
- **Chọn loại**: bấm hành động có nhiều loại (Nộp đơn) mở `SheetMenu` từ đáy, mỗi dòng có icon minh họa.

## Biểu tượng và hình ảnh

- Hai loại icon:
  - **Icon minh họa** (`TuPhap.Illustration`): nhiều màu, hình khối phẳng, mỗi icon vẽ đúng nội dung dịch vụ (đơn có bút và dấu đỏ cho Nộp đơn, lịch có búa cho Lịch xét xử, phong bì có dấu đã nhận cho Tống đạt…). Dùng cho dịch vụ, loại đơn, loại tài liệu: `ServiceTile`, `OptionItem`, `SheetMenu`, `ChatFab`. Đặt trong vòng tròn trắng 64px viền `border` ở lưới dịch vụ, trên nền `surface-sunken` trong `OptionItem`.
  - **Icon nét** (`TuPhap.Icon`): nét 1.8px, khung 24px, màu theo chữ. Dùng cho thao tác giao diện: quay lại, tìm, chuông, mũi tên, BottomNav, trong nút.
- Icon minh họa là nơi duy nhất được dùng màu ngoài bộ màu: nhiều màu nhưng trầm, trang nghiêm, luôn kèm chi tiết đỏ chủ đạo (`brand-800`, `brand-700`). Màu dùng: xám xanh `ink-muted`, `ink-subtle`; xanh lục `success-dot`; trắng; và nhóm riêng cho icon `illo-*`: giấy `illo-paper` (viền `illo-paper-stroke`), `illo-paper-back`, `illo-line`, xanh thép `illo-steel*`, xanh ngọc `illo-teal`, đất nung `illo-terracotta`, vàng đất `illo-ochre*` (dùng ít), tím mận `illo-plum*`, xanh lá xám `illo-sage`, gỗ `illo-wood*`, da `illo-skin`, tóc `illo-hair`. Nhóm `illo-*` không dùng cho giao diện. Không dùng vàng sáng, không màu rực.
- Thêm icon mới: khung 48×48, tối đa 4 màu, một vật chính (giấy, lịch, phong bì…) và một chi tiết nhận diện màu đỏ ở góc phải dưới (con dấu, búa, đồng hồ); giấy luôn có viền để tách khỏi vòng nền trắng.
- Quốc huy Tòa án (`assets/Logos/quoc-huy-toa-an.png`) đặt ở `HomeHeader`, AppBar trang chủ và màn hình chào. Không cắt, đổi màu hay thêm hiệu ứng.
- Ảnh trụ sở Tòa án (`assets/Images/hero-toa-an-dien-tu.png`) dùng trong `HeroBanner`, `BannerCarousel`, màn hình chào; luôn có lớp phủ đỏ dưới chữ.

## Trạng thái

Mọi thành phần bấm được có đủ trạng thái dưới đây; xem bảng ở nhóm preview "Trạng thái" (`StatesControls`, `StatesFields`, `StatesCards`, `StatesOnBrand`). Ứng dụng chạy trên điện thoại nên không có trạng thái di chuột.

- **Nhấn** (`:active`): thẻ, dòng danh sách, tab, nút biểu tượng trên nền sáng đổi nền `surface-sunken`; ô chọn và nút phân đoạn chưa chọn nền `border`; mục đang chọn (chip, radio) nền `brand-200`; khối đỏ (nút chính, QuickAction đỏ, nút "Nộp đơn" ở BottomNav, nút thêm tệp) nền đặc `brand-900`, bỏ bóng; nút trên nền đỏ nền `brand-900` (nhãn vai trò `brand-950`); liên kết chữ `brand-900` có gạch chân; ServiceTile vòng minh họa nền `brand-tint` viền `brand-200`, chữ `brand-text`.
- **Focus bàn phím** (`:focus-visible`): viền 2px `focus-ring` cách 2px; trên nền đỏ viền 2px `white`. Ô nhập khi focus nền `surface`, viền `focus-ring`.
- **Vô hiệu** (`disabled`): màu đặc, không dùng độ trong suốt. Nền `surface-sunken` (ô nhập, ô chọn: `border`), chữ và biểu tượng `ink-subtle`, bỏ bóng, con trỏ `not-allowed`; minh họa chuyển xám. Ô đánh dấu đã chọn mà vô hiệu: nền `ink-subtle`.
- **Lỗi** (`error`): viền `danger`, nền `danger-tint`, dòng báo lỗi 12px `danger` có biểu tượng cảnh báo dưới thành phần. Có ở `TextField`, `SelectField`, `Checkbox`, `FileUpload`, `FileItem`.
- **Đang tải** (`loading`): `Button` và `FilterCard` hiện vòng quay thay biểu tượng, giữ màu nút; `RecordCard`/`CaseCard` hiện khung xương nền `surface-sunken` nhấp nháy sang `border` (tắt khi người dùng bật giảm chuyển động); `FileItem` có thanh tiến độ.
- **Chỉ đọc** (`readOnly` của `TextField`): nền `surface`, viền liền 1px `border-strong`.
- Thuộc tính mới: `disabled` cho `LinkArrow`, `ServiceCard`, `QuickAction`, `NewsCard`, `ServiceTile`, `SelectField`, `OptionItem`, `SegmentedControl` (cả nhóm hoặc từng lựa chọn), `FileUpload`, mục của `Tabs`; `error` cho `Checkbox`, `FileUpload`; `loading` cho `FilterCard`, `RecordCard`, `CaseCard`.

## Thành phần

`Button`, `LinkArrow`, `TextField`, `SelectField`, `StatusBadge`, `Tabs`, `SectionHeader`, `HomeHeader`, `HeroBanner`, `BannerCarousel`, `QuickAction`, `ServiceTile`, `ServiceCard`, `NewsCard`, `CaseCard`, `RecordCard`, `FormSection`, `OptionItem`, `FilterCard`, `SummaryBar`, `SheetMenu`, `ProcessSteps`, `Timeline`, `AppBar`, `BottomNav`, `ChatFab`, `Icon`, `Illustration`; thêm ngày 30/10/2026 từ màn Đăng nhập và luồng nộp đơn: `Stepper`, `FileUpload`, `FileItem`, `Checkbox`, `SegmentedControl`, `BackLink`, `Tag`, `Notice`, `InfoList`, `ActionBar`, `Dialog`, `Accordion` (namespace `TuPhap`). `TextField` (biểu tượng đầu, nút xóa, hiện mật khẩu, bộ đếm), `Button` (`loading`), `SelectField` (nhãn hiện, bỏ chọn, danh sách xổ xuống), `AppBar` (nút tài khoản) được mở rộng. Ngày 30/10/2026 (lần 2): `Tabs` có 2 kiểu `underline`/`chip` (chọn loại trong form dùng `SegmentedControl`), `ProcessSteps` có 2 kiểu `brand`/`light`, `BottomNav` có mục `primary`, `HomeHeader` có nhãn vai trò, `Accordion` đổi sang thẻ riêng từng nhóm với nút radio; bỏ `Breadcrumb`. Ba màn hình mẫu: `HomeScreen`, `FilingScreen`, `ComplaintScreen`. Đọc README của từng thành phần trước khi dùng. Ngày 30/10/2026 (lần 3), cho bản thiết kế lại app TATC: `TaskList` (Việc cần làm, phương án C), `StatSummary`, `MenuList` (phương án F), `ProfileCard` (phương án A), `MailList` (phương án C), `NotificationList` (phương án F), `CalendarCard` (B + C), `EventCard` (B, nút theo C), `FinanceCard` (phương án E), `CaseProgress` (phương án C), `SearchToolbar` (phương án C), `RatingStars` (phương án B), `EmptyState` (phương án C); `HomeHeader` có nút Lịch (`onCalendar`). `StatSummary` tạm chọn kiểu `brand` (B), vẫn giữ kiểu `plain` (C) đến khi chốt; `SearchToolbar` và `EmptyState` chốt phương án C ngày 30/10/2026, đã bỏ kiểu còn lại. Biểu tượng mới: `filter`, `sort`, `briefcase`, `wallet`, `pen`, `logout`, `IconButton`, `InboxCard`, `ChoiceList`, `DocToolbar`, `IssuerInfo`, `DocumentPreview`, `DeadlineBlock`, `SignatureNote`, `UrgencySummary`, `TaskCard`, `DetailHeader`, `SignerList`.

## Mẫu màn app TATC (bổ sung 03/11/2026, cập nhật tới prototype v144)

Các thành phần lấy từ prototype app mobile đã chốt:

- **Tiêu đề màn chính** (Hồ sơ, Hộp thư tống đạt, Cá nhân): `AppBar variant="page"` 20/28 700.
- **Hộp thư tống đạt**: phần dính đầu khi cuộn gồm ô tìm + `IconButton` `funnel` (bảng "Bộ lọc hộp thư": Hồ sơ, vụ án · Tòa án ban hành · Thời gian gửi; Nhập lại | Áp dụng) + `IconButton` `grid` (bảng "Phân loại thư": `ChoiceList` nhóm Thư mục – Hộp thư / Quan trọng / Đã lưu trữ – và nhóm Nhãn văn bản; Áp dụng); dưới là chip trạng thái đọc (Tất cả / Chưa đọc / Đã đọc) bên trái, Sắp xếp `sortDesc` bên phải. Nút có chấm đỏ khi đang lọc; không có dòng "Đang lọc". Mỗi văn bản một `InboxCard`: chân thẻ "Hạn xử lý: ngày" + nhãn còn hạn theo mức (`qua`/`sap`/`an`), không có hạn thì không có chân thẻ. Cuộn tới cuối tự tải thêm 10 văn bản. Không có kết quả: `EmptyState variant="center"` + "Xóa bộ lọc".
- **Chi tiết văn bản tống đạt**: một khối đầu (nhãn + số hiệu + Quan trọng/Lưu trữ; tên; Tòa án + người ký; mã hồ sơ dạng nút viên `brand-tint`; thẻ tên tệp có Xem + Tải xuống); khối theo nhóm (mọi nút `secondary`); tài liệu đính kèm cùng kiểu thẻ tên tệp (không dòng "PDF · dung lượng"). Xem tệp mở màn xem PDF, lỗi thì báo "Không mở được bản số hóa. Vui lòng thử tải xuống hoặc liên hệ Tòa án." + Tải xuống. Mở văn bản = đã đọc.
- **Trang chủ – Việc cần làm** và **màn Việc cần làm**: cùng `TaskCard` (liên kết hành động căn trái, dòng hạn tô theo mức); màn Xem tất cả có `UrgencySummary` ở đầu, chip lọc `Tabs variant="chip"` dính dưới header khi cuộn.
- **Màn Hồ sơ**: `FeatureGrid` 2 cột × 3 hàng (6 `FeatureCard`), không số lượng, không mũi tên.
- **Chi tiết đơn / vụ án**: `DetailHeader` + thanh tab cuộn ngang dính đầu (đơn 6 tab, vụ án 8 tab).
- **Giao nộp tài liệu, chứng cứ** bước 3 Xem lại & ký số: `SignerList`; nút chính chỉ bật khi mọi người đã ký.
- Nút bật/tắt trên thẻ (Quan trọng, Lưu trữ): không viền, khi chọn chỉ tô nét biểu tượng `brand-800`, không tô đặc.
- Nhãn văn bản dùng bộ màu nhãn Trầm (mục dưới): nhãn loại trên `InboxCard` (`kindColor`) và chấm trong bảng Phân loại thư (`ChoiceList` `tag`) cùng một số màu.
- Trạng thái hạn (quá hạn / sắp hết hạn / trong hạn) dùng chung `danger` / `warning` / `success` ở Việc cần làm và Hộp thư (giữ nguyên, quyết định 03/11/2026).

## Mẫu mới từ prototype v145–v180 (bổ sung 04/11/2026)

Thành phần mới (namespace `TuPhap`): `ReminderBanner`, `AccountBanner`, `TaskRow`, `SourceSwitch`, `CommitCard`, `AttachmentSummary`, `CertificateCard`, `SignSessionCard`, `PlaceCard`, `DeadlineBar`, `MethodCard`. Đọc README từng thành phần trước khi dùng.

- **Trang chủ**: khối "Dịch vụ và hỗ trợ" 8 ô theo thứ tự Lịch, phiên tòa · Cấp trích lục · Khiếu nại · Phản ánh · Chữ ký số · Phương thức giao dịch · Đánh giá · Trợ giúp pháp lý (bỏ Nộp đơn khởi kiện). Dưới đó `ReminderBanner` nhắc cam kết giao dịch điện tử (nền `warning-tint`, viền `warning-border`, hình `yeuCau` bên phải, có nút X). Khối Việc cần làm dùng `TaskRow` (thẻ riêng, gọn 1 dòng); màn Xem tất cả giữ `TaskCard`.
- **Tab dưới**: "Hồ sơ" đổi tên "Theo dõi vụ án, vụ việc".
- **Cá nhân**: `AccountBanner` nổi trên header đỏ thay dòng "Thông tin tài khoản" trong menu.
- **Giao dịch điện tử**: `ReminderBanner` (không nút X) khi chưa cam kết → màn Cam kết giao dịch điện tử riêng (vai trò bằng `Checkbox` thường – không thẻ; khung điều khoản cuộn cao ~60% màn hình, phải đọc hết mới chọn thêm vai trò / tích đồng ý; quy định đính kèm nhiều tệp = `AttachmentSummary` → `Dialog variant="sheet"` liệt kê tệp + "Tải tất cả"); lịch sử = mỗi phiên một `CommitCard`.
- **Khiếu nại — Tố cáo**: `SourceSwitch` 2 nguồn (Hệ thống KNTC / QLA, hình 28px trái + nhãn phải), thẻ hồ sơ có `DeadlineBar`.
- **Phương thức giao dịch**: mỗi hồ sơ một `MethodCard`; luồng Tạm chuyển sang giấy / Chuyển giấy đến khi kết thúc 3 bước `Stepper`.
- **Quản lý chữ ký số** (3 tab Phương thức & chứng thư · Lịch sử ký · Hướng dẫn cài USB ký số): thẻ "Chữ ký của bạn" chọn nguồn bằng `SegmentedControl`, danh sách `CertificateCard` (chân thẻ 2 nút nhỏ chia đều "Kiểm lại" · "Xóa khỏi danh sách" – phương án A, 11/11/2026), lịch sử `SignSessionCard` (lọc Từ ngày/Đến ngày + bảng Đơn · Nguồn ký · Trạng thái). Trên điện thoại USB ký số hiện câu "chưa dùng được – vẫn ký từ xa".
- **Trợ giúp pháp lý** (2 tab Tra cứu điểm · Điều kiện miễn phí): khối tìm (Tên tổ chức + Tỉnh/Thành) + `PlaceCard`; điều kiện = khối lưu ý vàng + ô tìm diện + danh sách diện kèm "Giấy tờ chứng minh".
- **Trạng thái lỗi tải** dùng `EmptyState variant="center"` biểu tượng `alert` + "Thử lại" với câu đúng theo web (vd "Không tải được thông tin chữ ký số.").
- Khối nhắc / chọn đang bật dùng chung cặp `warning-tint` + `warning-border` (banner cam kết, thẻ nguồn KNTC, lưu ý Trợ giúp pháp lý).

## Bộ màu nhãn Trầm (chốt 03/11/2026)

Bộ 20 màu dùng chung để phân biệt **loại** (nhãn văn bản, nhóm, danh mục) ở mọi chức năng, không dùng cho trạng thái hay mức độ hạn (dùng `success`/`warning`/`danger`).

- 10 sắc độ từ đỏ gạch tới tím, bỏ dải hồng; mỗi sắc độ 2 độ sáng: màu 1–10 đậm, 11–20 sáng. Độ bão hòa thấp, hợp văn bản hành chính.
- Mỗi màu có 3 token: `tag-N` (chấm, chú giải; không dùng cho chữ), `tag-N-text` (chữ nhãn), `tag-N-bg` (nền nhãn). Chữ `tag-N-text` trên `tag-N-bg` đạt ≥ 6.8:1.
- Thành phần: `Tag color={N}`, `InboxCard kindColor={N}`, `ChoiceList` mục `tag: N`; lớp CSS `tp-tag-N` đặt sẵn 3 biến `--tag`, `--tag-text`, `--tag-bg` cho mẫu riêng.
- Một loại luôn giữ một số màu ở mọi màn; màu luôn đi kèm chữ. Màu 1 (đỏ gạch) và 11 gần màu lỗi: tránh đặt cạnh nhãn "Đã quá hạn".
- Loại mới lấy một màu chưa gán (xem bảng dưới), ưu tiên sắc độ khác các nhãn đứng cạnh.

Nhãn văn bản (mã `LOAI_VAN_BAN_NHOM` của web):

| Nhãn | Mã | Màu |
| --- | --- | --- |
| Thông báo | `THONG_BAO` | 3 |
| Quyết định | `QUYET_DINH` | 8 |
| Bản án | `BAN_AN` | 10 |
| Biên bản | `BIEN_BAN` | 6 |
| Giấy xác nhận | `GIAY_XAC_NHAN` | 5 |
| Giấy mời, triệu tập | `GIAYMOI_TT` | 9 |
| Đơn, yêu cầu | `DON_YEUCAU` | 2 |
| Hành chính | `NH_HC` | 7 |
| Hòa giải, đối thoại | `NH_HG` | 4 |
| Dân sự | `NH_DS` | 13 |
| Không có văn bản | `KHONG_VAN_BAN` | 15 |
| Chưa xác định | `CHUA_XAC_DINH` | 11 |
| Khác | `KHAC` | không màu (`surface-sunken` / `ink-muted`) |

Màu chưa gán (dự phòng): 1, 12, 14, 16, 17, 18, 19, 20.

## Nội dung chờ cung cấp

Hệ thống chưa có các câu chữ sau; preview của `FileItem` và `FileUpload` để trong ngoặc vuông: dung lượng tệp `[dung lượng]`, chữ khi đang tải `[đang tải]`, câu lỗi tệp quá lớn `[Tệp vượt quá 10 MB]`. Bảng trạng thái còn thiếu các câu lỗi: `[Câu lỗi khi chưa chọn Tòa án]`, `[Câu lỗi khi chưa đánh dấu cam đoan]`, `[Câu lỗi khi chưa tải tệp bắt buộc]`.
