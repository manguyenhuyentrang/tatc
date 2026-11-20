---
name: "gen-ui-mobile"
description: "Dùng khi cần thiết kế lại hoặc cập nhật màn hình app mobile TATC theo một URL web: pull nhánh develop, áp design system Cổng Dịch vụ Tư pháp, cập nhật prototype trên Desktop. Dùng cả khi người dùng nhờ rà soát UX prototype TATC (vùng chạm, tương phản, cỡ chữ, nhãn đọc màn hình, xác nhận thao tác xóa/hủy/đăng xuất, hộp thoại có lối thoát) – skill có bộ luật lọc từ ui-ux-pro-max và hai script rà soát tự động."
---

# Gen_UI_Mobile – thiết kế màn mobile TATC từ URL web

## Quy tắc chung

- **Không chắc chắn thì hỏi lại người dùng** (dùng AskUserQuestion) trước khi quyết định: màn nào cần làm, trường nào hiển thị, nhãn chữ, vị trí trong luồng, có thêm component mới hay không, xung đột git, ghi đè file.
- Chỉ vẽ nội dung có thật trong mã nguồn hoặc trang web. Câu chữ còn thiếu thì để trong ngoặc vuông, ví dụ `[Câu lỗi khi chưa chọn Tòa án]`.
- Không bao giờ nhập tài khoản, mật khẩu. Nếu URL cần đăng nhập, đọc giao diện từ mã nguồn; nếu vẫn thiếu, nhờ người dùng tự đăng nhập hoặc gửi ảnh chụp màn hình.
- Không xóa file của người dùng. Trước khi sửa prototype phải tạo bản sao lưu.
- **UX trước, hình thức sau.** Người dùng đánh giá thiết kế theo trải nghiệm: dễ quét, rõ nhóm, rõ chỗ bấm, màu có nghĩa, không mất thông tin. Một thay đổi chỉ lạ mắt mà không giải quyết vấn đề nào thường bị loại. Bộ luật UX của dự án nằm trong `references/ux-checklist.md`; đọc mục 1–2 của tệp đó trước khi thiết kế.
- **Thứ tự ưu tiên khi luật xung đột:** yêu cầu của người dùng → quyết định đã chốt (`design-system-chot-2026-10-30.md`) → token và component TuPhap → luật UX lấy từ ui-ux-pro-max. Ví dụ: thang chữ 14/12px của design system thắng khuyến nghị 16px; nút nhỏ 36px giữ hình nhưng nới vùng chạm vô hình lên 44px.

## Đầu vào

- **URL web** của chức năng cần làm (ví dụ `https://dichvutuphap.uat.toaan.gov.vn/vu-an`). Nếu người dùng chưa đưa URL, hỏi trước khi làm.

## Bước 1. Lấy mã nguồn mới nhất

1. Thư mục mã nguồn: `E:\TATC\sourcecode\tatc.workspace` trên máy người dùng. Nếu thư mục chưa được kết nối với phiên, xin quyền truy cập thư mục này (một lần, nêu rõ lý do).
2. Kiểm tra trạng thái git: nhánh hiện tại, có thay đổi chưa commit hay không.
   - Đang ở nhánh khác `develop` hoặc có thay đổi chưa commit: **hỏi người dùng** trước khi chuyển nhánh hay pull. Không tự stash, reset hay bỏ thay đổi.
3. Chạy `git pull` để lấy code mới nhất nhánh `develop` (`git checkout develop` chỉ khi người dùng đồng ý).
4. Nếu pull lỗi (cần đăng nhập git, mạng chặn, xung đột): dừng lại, báo đúng lỗi và hỏi người dùng. Không tự sửa xung đột.
5. Báo ngắn: commit mới nhất (mã, ngày, tiêu đề).

## Bước 2. Đọc chức năng từ URL

1. Từ đường dẫn URL (ví dụ `/vu-an`), tìm route tương ứng trong mã nguồn (router, menu, tên component, trang). Nếu có nhiều chỗ khớp hoặc không tìm thấy: hỏi người dùng.
2. Ghi lại đầy đủ: tiêu đề màn, menu, tab, bộ lọc, trường thông tin (nhãn, bắt buộc hay không, kiểu dữ liệu, danh sách chọn), nút hành động, trạng thái, thông báo lỗi, màn chi tiết và luồng chuyển tiếp.
3. Đối chiếu với các màn đã có trong prototype (danh sách `GROUPS2` trong file). Hỏi người dùng nếu chưa rõ là **thêm màn mới** hay **sửa màn đã có**.
4. Trình bày cho người dùng danh sách màn sẽ thêm/sửa và luồng bấm trước khi vẽ (ngắn gọn). Chờ xác nhận nếu có điểm chưa chắc.

## Bước 2.5. Xác định vấn đề UX

Làm trước khi vẽ, để thiết kế bám vào vấn đề thật chứ không bám vào hình thức.

1. Xếp từng màn vào loại: danh sách, biểu mẫu nhiều bước, chi tiết, bảng từ đáy, trạng thái trống/lỗi/đang tải, điều hướng.
2. Với mỗi loại, mở mục tương ứng trong `references/ux-checklist.md` và chọn các luật áp được (ghi mã, ví dụ `UX-55` lỗi dưới ô, `APP-11` bảng từ đáy có lối thoát).
3. Nếu gặp vấn đề không có trong danh sách (ví dụ một kiểu tương tác lạ của web), tra sâu bằng ui-ux-pro-max (mục "Tra sâu" bên dưới).
4. Ghi lại 3–6 vấn đề UX chính của màn, kèm mã luật. Danh sách này dùng tiếp ở Bước 3 và Bước 4.5.

## Bước 3. Thiết kế theo design system

Nguồn design system (đọc trước khi vẽ):
- Trang design system: https://claude.ai/artifact/1GbaHfiE2GAprpV1qBCwQ7 (đọc bằng Artifact action `read`: `project/README.md`, `project/tokens.json`, README từng component, `project/components/index.d.ts`).
- Tài liệu dự án "Mobile TATC": `claude/design-system-day-du.md` (bản đầy đủ) và `claude/design-system-chot-2026-10-30.md` (quyết định đã chốt).

Quy tắc đã chốt (bắt buộc):
- Chỉ dùng component của namespace `TuPhap` (React 18.3.1). Màu, chữ, khoảng cách lấy từ token, không viết mã màu trực tiếp.
- Cỡ chữ chỉ 10 · 12 · 14 · 16 · 18 · 20 · 22 · 24 (line-height 14/16/20/24/26/28/28/32; thêm 18 và 22 ngày 20/11/2026); khối nhãn – giá trị: nhãn 12/20, giá trị 14/20; 3 độ đậm 400/500/700.
- Nút cỡ thường, ô nhập một dòng, ô chọn, ô tìm cao 46px; nút nhỏ 36px chỉ dùng trong dòng/thẻ.
- Không đặt thông tin trực tiếp trên nền trang: gom mỗi nhóm vào khối trắng (`Blk(title, children, {action, flush})`); bộ lọc gom vào `Filt(...)`; `Stepper` nằm trong `Steps(steps, cur)`.
- Chữ dài quá chỗ hiển thị thì cắt bằng "…" ở mọi màn (tiêu đề header, tên đơn, tên tệp, ô chọn, nhãn). Người dùng đã xem các cách khác (xuống 2 dòng, co chữ, tiêu đề lớn) và chọn giữ "…", nên không đề xuất lại.
- Chữ 10px chỉ cho số đếm trên chip/huy hiệu, chữ "PDF" trên biểu tượng tệp, nhãn tháng và chữ trong trang văn bản mô phỏng; mọi chữ nội dung khác tối thiểu 12px.
- Nhãn có nền màu (loại đơn, loại việc) dùng cặp token `--tag-N-bg` / `--tag-N-text` của design system để đủ tương phản; không tự pha màu chữ trên nền nhạt.
- Nút, biểu tượng bấm được nhỏ hơn 44px: giữ hình, nới vùng chạm vô hình lên 44×44px bằng `::after`/`::before` định vị tuyệt đối (prototype đã có đoạn mã gắn lớp `hit44` tự động cho mọi nút nhỏ trong khung điện thoại). Không phóng to hình nút.
- Thao tác không hoàn tác được (xóa nháp, hủy yêu cầu đã gửi, rút đơn, thu hồi, xóa chứng thư, đăng xuất) phải hỏi xác nhận bằng hộp thoại giữa màn: tiêu đề là câu hỏi ("Hủy yêu cầu chuyển phương thức?", "Đăng xuất?"), một câu nói rõ hệ quả, nút "Không"/"Hủy" bên trái và nút hành động bên phải. Rút đơn đi qua luồng nhiều bước có bước xem lại thì không cần hộp thoại thêm. Riêng "Xóa dòng yêu cầu" trong biểu mẫu soạn đơn vẫn xóa ngay (người dùng đã xem demo hỏi lại / Hoàn tác và chọn giữ nguyên, 20/11/2026).
- Màn chức năng con: `AppBar variant="plain"` nền trắng (quay lại, tiêu đề 20 đậm một dòng căn trái, thao tác chữ đỏ bên phải; luồng nhiều bước đặt "Lưu nháp" ở header). Màn trên thanh điều hướng (Hồ sơ, Hộp thư, Cá nhân) giữ header đỏ `variant="page"`. Trang chủ không có banner.
- Nhãn trạng thái viết chữ thường ("Đã nhập", "Chờ xử lý").
- Danh sách: `SearchToolbar` (phương án C) trong khối bộ lọc; thẻ `RecordCard`/`CaseCard` chạm cả thẻ để mở chi tiết. Trạng thái trống: `EmptyState` (khung nét đứt).
- Bảng chọn từ đáy: `Dialog variant="sheet"` + `MenuList` có `illustration`.
- **Cần component mới** (chưa có trong design system): đề xuất 3 phương án (trang so sánh) để người dùng chọn, chỉ thêm vào design system sau khi đã chọn. Không tự thêm.

Khi cần đưa nhiều phương án cho người dùng chọn:
- Mỗi phương án ghi một câu "giải quyết vấn đề UX nào", kèm mã luật ở Bước 2.5. Phương án nào không nói được điều này thì bỏ, vì người dùng đã nhiều lần loại các phương án chỉ đổi lưới, đổi màu thẻ hay xếp chồng thẻ.
- Làm gọn không được lược bớt thông tin: chỉ sắp xếp lại, căn lề, phân tầng chữ.
- Màu chỉ dùng token design system và phải mang nghĩa (trạng thái, mức hạn).
- Demo trước (ảnh so sánh cạnh bản hiện tại), hỏi người dùng chọn rồi mới sửa prototype.

## Bước 4. Cập nhật prototype

File: `C:\Users\trangmnh\Desktop\prototype-app-tatc.html` (một file HTML độc lập, chạy không cần mạng). Nếu đường dẫn khác hoặc không thấy file: hỏi người dùng.

1. Xin quyền thư mục Desktop nếu chưa có. Tạo bản sao lưu cạnh file: `prototype-app-tatc.bak-YYYYMMDD-HHmm.html`.
2. Cấu trúc file (các thẻ `<script>` nội tuyến theo thứ tự): `window.__LOGO/__VNEID` → React → ReactDOM → design system (`/* @ds-bundle ... */`, tạo `window.TuPhap`) → mã app (bắt đầu bằng `/* TATC mobile – màn hình vẽ lại bằng design system`). Mã app gồm:
   - Khung và hàm hỗ trợ: `Phone`, `Body`, `Nav`, `Main(active, title, children, actions)`, `Sub(title, children, footer, actions)`, `Bar`, `Btn`, `Card`, `Blk`, `Filt`, `Steps`, `Add`, `Rows`, `Head`, `Sec`, `SheetOver`, `HomeBg`, `MenuSheet`, `Note`, `Cards`, `Search`.
   - Dữ liệu và màn: `TASKS`, `SHEETS`, `NOTI_*`, `APPS`, `CASES`, `MAIL`… và các hàm màn (`Home`, `Records`, `Applications`, `CaseDetail`, `Sub1`…`Sub7`, …).
   - Phần prototype (bắt đầu bằng `/* File 2: prototype bấm được`): `SCR` (id → [tên, hàm vẽ]), `GROUPS2` (danh sách "Đi tới màn bất kỳ" theo nhóm), `BASE` (màn nền khi nhảy thẳng), `R` (luật bấm `[màn, nhãn, đích, vùng]`; nhãn bắt đầu bằng `=` là khớp đúng; đích: id, `back`, `tab:x`, `replace:x`, `reset:a,b`, `backTo:x`, `sheet:x`), `LOCAL`, `Proto`.
3. Thêm/sửa màn: viết hàm màn mới cạnh nhóm tương ứng, đăng ký vào `SCR` và `GROUPS2`, thêm `BASE` nếu cần, thêm luật vào `R` để nối luồng (từ màn gọi tới màn mới và từ màn mới đi tiếp). Sửa bằng script đọc-sửa-ghi trên file, không gõ lại toàn bộ file.
4. Kiểm tra trước khi ghi đè: mở file bằng trình duyệt không giao diện (Playwright) và xác nhận: không có lỗi JavaScript, nhảy được tới mọi màn trong danh sách, luồng mới bấm được từ đầu tới cuối. Chụp màn mới để tự xem lại một lần.
5. **Không ghi đè file prototype cũ.** Chỉ ghi khi người dùng đã cho phép, và ghi ra một file prototype mới cạnh file cũ, tên kèm ngày giờ (ví dụ `prototype-app-tatc-YYYYMMDD-HHmm.html`); file cũ giữ nguyên. Nếu file cũ trên máy đã bị sửa sau lúc đọc, báo người dùng trước khi tạo file mới.
6. Hỏi người dùng có muốn cập nhật cả trang prototype trên claude.ai (https://claude.ai/artifact/RsNHijiJbodLQbodMuAVsH) và bản duyệt (https://claude.ai/artifact/QyVS6ngwmdVEyPyvtfpEwU) hay không; chỉ cập nhật khi được đồng ý.

## Bước 4.5. Rà soát UX trước khi giao

Chạy sau bước kiểm tra 4.4 và trước khi báo kết quả.

1. **Rà soát tự động** các màn vừa thêm/sửa (cần Node 22+ và Google Chrome; script chỉ đọc trang, không sửa gì):
   ```bash
   node "<thư mục skill>/scripts/ux-audit.js" "<đường dẫn hoặc URL prototype>" <idMàn1>,<idMàn2> [--json]
   ```
   Script kiểm: vùng chạm < 44px (APP-6), phần tử bấm được thiếu tên đọc màn hình (APP-1), ô nhập thiếu nhãn (UX-43), ảnh thiếu alt (UX-38), tương phản chữ (UX-36), chữ < 12px và cỡ chữ ngoài thang (APP-26, UX-74). Không kiểm chữ bị cắt: TATC chốt dài quá thì hiển thị "…" (20/11/2026). Rà soát toàn bộ thì thêm `--scroll` để cuộn hết từng màn. Mặc định quét vùng `.pt-phone .ph`; prototype có cấu trúc khác thì truyền `--root "<bộ chọn>"`.
   Rà soát toàn bộ prototype (mọi màn trong `SCR`) thì luôn thêm `--scroll` và chia danh sách màn thành 5–6 phần chạy song song; mỗi phần chạy kèm `timeout` (ví dụ 15 phút) vì thỉnh thoảng một phần bị treo, khi đó dừng và chạy lại riêng phần đó.
   Sau đó **bấm thử** bằng script thứ hai:
   ```bash
   node "<thư mục skill>/scripts/ux-probe.js" "<đường dẫn hoặc URL prototype>" <idMàn1>,<idMàn2> [--json]
   ```
   Script tự bấm các nút xóa / rút / hủy / thu hồi / đăng xuất (cả phần phải cuộn) và báo nút nào làm ngay không hỏi xác nhận (UX-35), hộp thoại hay bảng từ đáy nào thiếu nút thoát (APP-11), chấm màu không kèm chữ (UX-37). Mục "Xem lại" cần chụp ảnh màn đó để tự xem trước khi báo.
2. **Xử lý kết quả – rà soát chỉ báo cáo, không tự sửa** (người dùng yêu cầu: không cập nhật prototype cũ, chỉ sửa khi được cho phép):
   - Liệt kê các mục "Bắt buộc" trước, kèm mã luật, phần tử, màn và đề xuất cách sửa theo `references/ux-checklist.md`. Mục trái quyết định đã chốt (ví dụ nút 36px) thì đề xuất theo cách xử lý ở mục 1 của tệp đó, không đổi hình.
   - Tách rõ mục phát sinh ở phần vừa làm với mục có từ trước ở phần không đụng tới.
   - Hỏi người dùng có cho sửa không. Chỉ khi được cho phép mới sửa, và ghi ra file prototype mới (không sửa đè file đã có), rồi chạy lại script trên file mới. Khi người dùng cho phép sửa thẳng vào file cũ thì làm theo lời họ, vẫn sao lưu trước.
   - Mục nào có nhiều cách sửa (ví dụ đổi cỡ chữ 13px về 12 hay 14, xóa dòng thì hỏi lại hay cho Hoàn tác): dựng demo trên bản thử, chụp ảnh cạnh bản hiện tại, để người dùng chọn rồi mới áp vào prototype. Áp đúng những mục người dùng chọn, mục không chọn thì giữ nguyên.
   - Số liệu "trước / sau" chỉ so được khi hai lần chạy dùng cùng một phiên bản script. Sửa script giữa chừng thì chạy lại bản cũ bằng script mới trước khi báo số.
3. **Kiểm bằng mắt** những luật script không tự kiểm được, áp cho màn vừa làm: nút gửi chống bấm hai lần (UX-32); có trạng thái đang tải, trống, lỗi có nút thử lại (UX-78, UX-79, UX-80); quay lại không mất dữ liệu (APP-9); xem ảnh các mục "Xem lại" của `ux-probe.js`.
4. **Chưa kiểm được** (nêu rõ trong báo cáo nếu người dùng chưa chốt): phóng to chữ hệ thống, màn hình hẹp (360px, 320px), chế độ tối.

## Tra sâu bằng ui-ux-pro-max (khi cần)

Skill ui-ux-pro-max cài ở `E:\TATC\.claude\skills\ui-ux-pro-max`. Dùng khi danh sách kiểm tra chưa có luật cho vấn đề đang gặp.

- Lệnh tra (tiếng Anh, 2–5 từ khóa, một ý mỗi lần; bật UTF-8 để không lỗi chữ trên Windows):
  ```bash
  python -X utf8 "E:/TATC/.claude/skills/ui-ux-pro-max/scripts/search.py" "<từ khóa>" --domain ux -n 3
  python -X utf8 "E:/TATC/.claude/skills/ui-ux-pro-max/scripts/search.py" "<từ khóa>" --domain web -n 3
  ```
  `--domain ux` là luật UX chung, `--domain web` là luật giao diện app native/mobile. Cần cách viết mã React cho prototype thì thêm một lệnh `--stack react` riêng.
- Không ra kết quả hoặc lệch chủ đề: tra lại một lần với từ khóa hẹp hơn. Vẫn không có thì nói rõ là không tìm thấy luật, không tự bịa.
- Kết quả bằng tiếng Anh: dịch ý, ghép với component/token TuPhap, ghi mã luật (`UX-n` theo cột No của `ux-guidelines.csv`, `APP-n` theo `app-interface.csv`).
- **Không dùng** `--design-system`, `--persist`, `--tokens` và các nhóm `style`, `color`, `typography`, `google-fonts`, `landing`, `gsap`: chúng sinh màu, font, tệp `MASTER.md` mới, trái với design system TuPhap. Nhóm `icons` chỉ để tham khảo ý nghĩa, biểu tượng vẫn chọn trong bộ TuPhap.
- Không thấy thư mục skill (phiên chạy ở máy hoặc thư mục khác): bỏ qua bước tra sâu, chỉ dùng `references/ux-checklist.md`, và nói rõ điều này trong báo cáo.

## Kết quả báo lại

- Commit đã pull, URL và route tương ứng.
- Danh sách màn đã thêm/sửa, luồng bấm mới.
- Đường dẫn file prototype đã cập nhật và file sao lưu.
- Vấn đề UX đã xử lý (kèm mã luật) và kết quả rà soát: số mục bắt buộc đã sửa, các mục còn lại cần người dùng quyết định.
- Câu chữ còn thiếu (trong ngoặc vuông) và các điểm cần người dùng quyết định.
