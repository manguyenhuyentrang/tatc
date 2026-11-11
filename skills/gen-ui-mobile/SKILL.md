---
name: "gen-ui-mobile"
description: "Dùng khi cần thiết kế lại hoặc cập nhật màn hình app mobile TATC theo một URL web: pull nhánh develop, áp design system Cổng Dịch vụ Tư pháp, cập nhật prototype trên Desktop."
---

# Gen_UI_Mobile – thiết kế màn mobile TATC từ URL web

## Quy tắc chung

- **Không chắc chắn thì hỏi lại người dùng** (dùng AskUserQuestion) trước khi quyết định: màn nào cần làm, trường nào hiển thị, nhãn chữ, vị trí trong luồng, có thêm component mới hay không, xung đột git, ghi đè file.
- Chỉ vẽ nội dung có thật trong mã nguồn hoặc trang web. Câu chữ còn thiếu thì để trong ngoặc vuông, ví dụ `[Câu lỗi khi chưa chọn Tòa án]`.
- Không bao giờ nhập tài khoản, mật khẩu. Nếu URL cần đăng nhập, đọc giao diện từ mã nguồn; nếu vẫn thiếu, nhờ người dùng tự đăng nhập hoặc gửi ảnh chụp màn hình.
- Không xóa file của người dùng. Trước khi sửa prototype phải tạo bản sao lưu.

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

## Bước 3. Thiết kế theo design system

Nguồn design system (đọc trước khi vẽ):
- Trang design system: https://claude.ai/artifact/1GbaHfiE2GAprpV1qBCwQ7 (đọc bằng Artifact action `read`: `project/README.md`, `project/tokens.json`, README từng component, `project/components/index.d.ts`).
- Tài liệu dự án "Mobile TATC": `claude/design-system-day-du.md` (bản đầy đủ) và `claude/design-system-chot-2026-10-30.md` (quyết định đã chốt).

Quy tắc đã chốt (bắt buộc):
- Chỉ dùng component của namespace `TuPhap` (React 18.3.1). Màu, chữ, khoảng cách lấy từ token, không viết mã màu trực tiếp.
- Cỡ chữ chỉ 10 · 12 · 14 · 16 · 20 · 24 (line-height 14/16/20/24/28/32); 3 độ đậm 400/500/700.
- Nút cỡ thường, ô nhập một dòng, ô chọn, ô tìm cao 46px; nút nhỏ 36px chỉ dùng trong dòng/thẻ.
- Không đặt thông tin trực tiếp trên nền trang: gom mỗi nhóm vào khối trắng (`Blk(title, children, {action, flush})`); bộ lọc gom vào `Filt(...)`; `Stepper` nằm trong `Steps(steps, cur)`.
- Màn chức năng con: `AppBar variant="plain"` nền trắng (quay lại, tiêu đề 16 đậm căn trái, thao tác chữ đỏ bên phải; luồng nhiều bước đặt "Lưu nháp" ở header). Màn trên thanh điều hướng (Hồ sơ, Hộp thư, Cá nhân) giữ header đỏ `variant="page"`. Trang chủ không có banner.
- Nhãn trạng thái viết chữ thường ("Đã nhập", "Chờ xử lý").
- Danh sách: `SearchToolbar` (phương án C) trong khối bộ lọc; thẻ `RecordCard`/`CaseCard` chạm cả thẻ để mở chi tiết. Trạng thái trống: `EmptyState` (khung nét đứt).
- Bảng chọn từ đáy: `Dialog variant="sheet"` + `MenuList` có `illustration`.
- **Cần component mới** (chưa có trong design system): đề xuất 3 phương án (trang so sánh) để người dùng chọn, chỉ thêm vào design system sau khi đã chọn. Không tự thêm.

## Bước 4. Cập nhật prototype

File: `C:\Users\trangmnh\Desktop\prototype-app-tatc.html` (một file HTML độc lập, chạy không cần mạng). Nếu đường dẫn khác hoặc không thấy file: hỏi người dùng.

1. Xin quyền thư mục Desktop nếu chưa có. Tạo bản sao lưu cạnh file: `prototype-app-tatc.bak-YYYYMMDD-HHmm.html`.
2. Cấu trúc file (các thẻ `<script>` nội tuyến theo thứ tự): `window.__LOGO/__VNEID` → React → ReactDOM → design system (`/* @ds-bundle ... */`, tạo `window.TuPhap`) → mã app (bắt đầu bằng `/* TATC mobile – màn hình vẽ lại bằng design system`). Mã app gồm:
   - Khung và hàm hỗ trợ: `Phone`, `Body`, `Nav`, `Main(active, title, children, actions)`, `Sub(title, children, footer, actions)`, `Bar`, `Btn`, `Card`, `Blk`, `Filt`, `Steps`, `Add`, `Rows`, `Head`, `Sec`, `SheetOver`, `HomeBg`, `MenuSheet`, `Note`, `Cards`, `Search`.
   - Dữ liệu và màn: `TASKS`, `SHEETS`, `NOTI_*`, `APPS`, `CASES`, `MAIL`… và các hàm màn (`Home`, `Records`, `Applications`, `CaseDetail`, `Sub1`…`Sub7`, …).
   - Phần prototype (bắt đầu bằng `/* File 2: prototype bấm được`): `SCR` (id → [tên, hàm vẽ]), `GROUPS2` (danh sách "Đi tới màn bất kỳ" theo nhóm), `BASE` (màn nền khi nhảy thẳng), `R` (luật bấm `[màn, nhãn, đích, vùng]`; nhãn bắt đầu bằng `=` là khớp đúng; đích: id, `back`, `tab:x`, `replace:x`, `reset:a,b`, `backTo:x`, `sheet:x`), `LOCAL`, `Proto`.
3. Thêm/sửa màn: viết hàm màn mới cạnh nhóm tương ứng, đăng ký vào `SCR` và `GROUPS2`, thêm `BASE` nếu cần, thêm luật vào `R` để nối luồng (từ màn gọi tới màn mới và từ màn mới đi tiếp). Sửa bằng script đọc-sửa-ghi trên file, không gõ lại toàn bộ file.
4. Kiểm tra trước khi ghi đè: mở file bằng trình duyệt không giao diện (Playwright) và xác nhận: không có lỗi JavaScript, nhảy được tới mọi màn trong danh sách, luồng mới bấm được từ đầu tới cuối. Chụp màn mới để tự xem lại một lần.
5. Ghi đè file trên Desktop (giữ bản sao lưu). Nếu file trên máy đã bị sửa sau lúc đọc, hỏi người dùng trước khi ghi.
6. Hỏi người dùng có muốn cập nhật cả trang prototype trên claude.ai (https://claude.ai/artifact/RsNHijiJbodLQbodMuAVsH) và bản duyệt (https://claude.ai/artifact/QyVS6ngwmdVEyPyvtfpEwU) hay không; chỉ cập nhật khi được đồng ý.

## Kết quả báo lại

- Commit đã pull, URL và route tương ứng.
- Danh sách màn đã thêm/sửa, luồng bấm mới.
- Đường dẫn file prototype đã cập nhật và file sao lưu.
- Câu chữ còn thiếu (trong ngoặc vuông) và các điểm cần người dùng quyết định.