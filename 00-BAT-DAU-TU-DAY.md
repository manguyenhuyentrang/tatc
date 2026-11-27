# BẮT ĐẦU TỪ ĐÂY – Prototype app mobile TATC (Cổng Dịch vụ Tư pháp)

Bộ thư mục này chứa đủ thiết kế mới nhất để làm tiếp dự án từ **một tài khoản Claude khác**.

- Bản prototype mới nhất: **v637** (26-11-2026) – xem mục "Cập nhật 26-11-2026" ngay dưới. (Số liệu v337 ở các mục sau là của lần xuất 12/11/2026.)
- Ngày xuất: 11/11/2026 (bản đầu v307, v310); cập nhật lại ngày 12/11/2026 lên v337.
- Từ v333 prototype có **2 luồng theo loại tài khoản**: chọn Cá nhân | Tổ chức ở màn Đăng nhập (mặc định Cá nhân; tải lại trang về Cá nhân). Tổ chức mẫu: "Công ty ABC", MST 0101234567, trụ sở Số 25 Láng Hạ, Phường Láng, Thành phố Hà Nội.
- Vị trí trên máy: `E:\TATC\Mobile\Design_System`

> Gửi Claude ở phiên mới: đọc hết tệp này trước khi làm việc. Mọi quy tắc ở mục 4 vẫn có hiệu lực.

## Cập nhật 26-11-2026 – đọc mục này trước (thay cho số liệu cũ ở các mục dưới)

**Trạng thái hiện tại**
- Prototype mới nhất: **v637** (27-11-2026) – `prototype/Prototype-TATC-v637.html`; trên claude.ai: https://claude.ai/artifact/PiFmwVA8Pbg2X9WMkswd7S (trang mới của tài khoản hiện tại, tạo 26-11-2026; v609 = Version 1, v610 = Version 2, v611 = Version 3, v612 = Version 4, v613 = Version 5, v614 = Version 6, v615 = Version 7, v616 = Version 8, v617 = Version 9, v618 = Version 10, v619 = Version 11, v620 = Version 12, v621 = Version 13, v622 = Version 14, v623 = Version 15, v624 = Version 16, v625 = Version 17, v626 = Version 18, v627 = Version 19, v628 = Version 20, v629 = Version 21, v630 = Version 22, v631 = Version 23, v632 = Version 24, v633 = Version 25, v634 = Version 26, v635 = Version 27, v636 = Version 28, v637 = Version 29). Trang của tài khoản khác: https://claude.ai/artifact/CKnVgGSByzDJD7vDSWCnDd (Version 596).
- Git: https://github.com/manguyenhuyentrang/tatc nhánh `main`, commit mới nhất `8bcc33b` (đã push 27-11-2026, đến v617; v618–v637 chưa push). Chỉ push phần đã chốt: `prototype-src/src`, `prototype-src/dist`, `prototype-app/index.html`, `prototype/Prototype-TATC-vNNN.html`, 2 tài liệu design system, `skills/`. Không push `de-xuat/`, `ra-soat-ux/`, `prototype-src/backups/`, `prototype-src/shots/`; tệp ghi chú khác trong `tai-lieu/` hỏi trước.
- Nhật ký từng phiên bản (đến v637): cuối `tai-lieu/design-system-chot-2026-10-30.md` và `tai-lieu/design-system-day-du.md`, dòng dạng `- vNNN (DD-MM-YYYY): …`, chèn ngay sau dòng phiên bản trước.
- Skill: `skills/gen-ui-mobile/` (có `references/bo-mau-trang-thai.md` – bộ màu **Status-color**, 22 màu) và `skills/gen-ui-mobile.zip`.
- Bộ nhớ Claude (quy tắc, quyết định của người dùng): bản sao ở `tai-lieu/ghi-nho-claude/` (đọc `MEMORY.md` trước). Ở tài khoản/phiên mới có thể nói "hãy ghi nhớ các tệp trong tai-lieu/ghi-nho-claude".
- Demo đề xuất (không phải bản chốt): `de-xuat/` (mới nhất: `demo-dau-man-vu-an-pa3-2026-11-26.html`, `demo-dau-man-vu-an-2026-11-26.html` (+ ảnh .png cùng tên), `demo-thoat-soan-don-2026-11-25.html`, `demo-thoat-soan-don-khac-2026-11-25.html`, `demo-mau-don-va-da-nhap-2026-11-25.html`, `demo-status-color*.html`).

**Quy trình hiện dùng mỗi lần sửa (thay mục 3B)**
1. Sao lưu: chép cả `prototype-src/src` thành `prototype-src/backups/src-bak-YYYYMMDD-HHMMSS`, giữ 5 bản mới nhất.
2. Sửa `src/` → `python tools/build.py` (trong `prototype-src`).
3. Kiểm tra lỗi: `cd prototype-src/tools/kiem-tra && timeout 110 node cdpeval.js "file:///E:/TATC/Mobile/Design_System/prototype-src/dist/prototype-test.html?t=$(date +%s)" "$(cat chk_all.js)"` → `"nerr":14` là chuẩn (14 lỗi có sẵn dạng `cn:sh:`/`tc:sh:`). Luôn thêm `?t=…` để tránh bản cũ trong bộ nhớ đệm. cdpeval treo/không in gì = mã chèn lỗi cú pháp (kiểm bằng `node --check`).
4. Chụp màn: `CDP_PORT=9444 timeout 150 node cdpshot2.js jobs.json thuMucAnh`, `jobs.json` = `[[tênẢnh, url, mãMàn, cuộn(0 | "end" | "css")], …]`.
5. Chuyển màn trong cdpeval: `window.__ptGo('reset:home,<mã màn>')`; hoặc mở url `…#a%2Fb%2Fc` (ngăn màn).
6. Lưu `prototype/Prototype-TATC-vNNN.html` (chép `dist/prototype-test.html`), chép `dist/app-index.html` → `prototype-app/index.html`, ghi nhật ký 2 tài liệu, đăng `dist/artifact.html` lên artifact trên (tài khoản hiện tại: PiFmwVA8Pbg2X9WMkswd7S; ở phiên mới phải `read` trang trước rồi publish kèm `url`) (bị từ chối "Repeat the identical Artifact call" thì gọi lại 1 lần).
7. Demo: chép `dist/prototype-test.html` sang `de-xuat/demo-…html`, chèn JS trước chuỗi `/* luật bấm: [màn`, thêm màn qua `SCR`/`BASE`/`GROUPS2.unshift`. Mẫu: `tools/kiem-tra/demo-mau/` (mới: `demo_dau_man_va*.js` – ghi đè hàm `VaHead` để demo). Lưu ý đặt tên lớp CSS mới: grep trước để không trùng lớp đã có (v610 suýt trùng `.va4-tl`).

**Việc đã chốt gần đây (v603–v609)**
- v603 Chọn loại đơn PA A/A2/M1; NVTC 1.2, 1.17, 1.18, 1.24. v604–v605 Status-color cho trạng thái/tình trạng Vụ án và Đơn (bỏ hồng, tím; Đình chỉ, Tạm đình chỉ cùng st-1 nhãn đậm).
- v606–v607 dòng "Đã nhập vào {mã}" vàng nhạt, cuối thẻ, chạm mở thẳng vụ án đích.
- v608–v609 bấm ‹ ở màn soạn: hộp "Thoát khi chưa hoàn tất?" (có Lưu nháp: Lưu nháp và thoát / Thoát, không lưu / ✕; không Lưu nháp: Ở lại / Thoát, không lưu).

**Việc đã chốt 26-11-2026 (v610–v617)** – chỉ màn Chi tiết vụ án, người dùng yêu cầu rõ
- v610 đầu màn (PA 3B, chọn sau 2 vòng demo): bỏ ô chữ viết tắt lĩnh vực; dòng mã hồ sơ · loại vụ án chữ thường 12px xám như Chi tiết đơn; khối xám 2 dòng có biểu tượng: "Tư cách của bạn" (người) + mới thêm "Lần thụ lý hiện tại" (cán cân; theo web `src/screens/vu-an/chi-tiet.tsx`: `cacLanThuLy[0].maVuAn ?? maVuAn`, chỉ hiện khi có mã hồ sơ; prototype dùng `v.ma`). Nhãn tình trạng giữ chấm + chữ (người dùng "tạm bỏ qua"). Mã: `VaHead` (s5.js), lớp `.va4-tcl`.
- v611 giãn khoảng cách khối xám – thanh Cấp xét xử 12px → 24px.
- v612 khối Các bên đương sự: bỏ dòng đếm "1 người khởi kiện · …"; thẻ đương sự: tên + nhãn "Bạn" cùng hàng bên trái, vai trò thành nhãn cùng kiểu "Bạn" ở góc phải (dài thì cắt "…"). Chỉ áp Chi tiết vụ án (`DtParty` có `vtNhan`); Chi tiết đơn, phá sản giữ kiểu cũ – đang chờ người dùng trả lời có áp cho 2 màn này không.
- v613 (case 1.30, sheet 1 `Mobile/TestCase_Mobile/TATC_Mobile_TC_VuAn.xlsx`): thẻ phiên trong tab Lịch phiên tòa – nhãn "Mở lại sau tạm ngừng" + "Lịch sử thay đổi lịch (n lần)" (màn mới `caseDetailHearChange`), nút "Chi tiết phiên", chữ theo web ("Chưa trả lời", "Đã xác nhận tham dự", "Hết hạn xác nhận.", "Vào phòng chờ trực tuyến", "Xem văn bản gốc"). Chỉ thẻ của tab (cờ `va5`); thẻ màn Lịch tố tụng giữ nguyên.
- v614: thanh Cấp xét xử ở đầu màn giãn rộng cân đối (cột 1fr 3fr 1fr, chỉ `.va4-head`).
- v615: thẻ đương sự theo kiểu khối Định danh (cột 30/5/65, chữ 14px, giá trị chữ thường); duyệt sau demo `de-xuat/demo-the-duong-su-2026-11-26.html`; áp mọi thẻ DtParty (vụ án, đơn, phá sản).
- v616: kết quả test sheet 1 Vụ án chạy lại 26-11 (40 P, 2 F trên v615) – đã bổ sung cả 2 F sau demo `de-xuat/demo-vu-an-1-30-1-38-2026-11-26.html`: 1.30 dòng "Điểm cầu tham dự" trên thẻ phiên trực tuyến; 1.38 nhóm tài liệu kèm đơn BPKCTT (đơn phái sinh của chính người dùng).
- v617: dòng mã định danh · loại án ở đầu màn in đậm (600).
- v618 (27-11): tab Đơn trong vụ án bỏ dòng mô tả "Gồm đơn bạn nộp qua Cổng và đơn Tòa án tiếp nhận trực tiếp".
- v619 (27-11): nhãn vai trò thẻ đương sự theo Status-color, nền đậm, PA D (Nguyên đơn Đỏ rượu st-26, Bị đơn Xanh thép st-16, Liên quan Ô liu st-5). Người dùng loại: nền đặc; màu nâu; demo `de-xuat/demo-vai-tro-*-2026-11-27.*`. **Đã hoàn tác ở v620.**
- v620 (27-11): hoàn tác v619 – nhãn vai trò về như v618; bản dựng trùng v618.
- v621 (27-11): thẻ đương sự Chi tiết vụ án gọn – họ tên + "Bạn", tư cách chữ xám dưới tên, chạm mở rộng tại chỗ (PA 2 kiểu 1; demo `de-xuat/demo-duong-su-gon-2026-11-27.*`).
- v622 (27-11): khối Các bên đương sự PA C3 – thẻ Bạn viền trái đỏ ở đầu, nhóm "Đương sự khác (n)" + dòng khóa, tiêu đề "Thao tác" (demo `de-xuat/demo-khoi-duong-su-*-2026-11-27.*`).
- v623 (27-11): bỏ vạch đỏ thẻ Bạn; thẻ Bạn luôn hiện đủ thông tin, không thu gọn.
- v624 (27-11): dòng khóa bảo vệ dữ liệu cá nhân đổi sang khung vàng nhạt (PA B, demo `de-xuat/demo-dong-khoa-mau-2026-11-27.*`).
- v625 (27-11): thẻ Bạn viền mảnh 1px như khối đương sự khác (bỏ bóng viền trong).
- v626 (27-11): bỏ dòng "Xem đơn TN-…" dưới Việc cần làm ở Chi tiết vụ án.
- v627 (27-11): Việc cần làm thu gọn theo PA B – ô "+n việc khác" nét đứt vàng, bung tại chỗ, "Thu gọn" cuối khối (demo `de-xuat/demo-viec-can-lam-2026-11-27.*`).
- v628 (27-11): khối Thao tác PA D – tiêu đề "Gửi đề nghị đến Tòa án", thẻ có mô tả và chữ "Lập đơn →" (demo `de-xuat/demo-thao-tac-2026-11-27.*`).
- v629 (27-11): bỏ thanh Cấp xét xử ở đầu Chi tiết vụ án (phá sản giữ nguyên).
- v630 (27-11): Chi tiết vụ án – "&" thành "và" ở 2 tiêu đề khối; màn chọn loại đơn từ vụ án còn "&", chờ quyết định.
- v631 (27-11): màn chọn loại đơn từ vụ án – "&" thành "và" ("Giao nộp và sao gửi…", "Trước và sau thụ lý").
- v632 (27-11): Vụ án, vụ việc của tôi – Thụ lý "ngày · Số thụ lý", lọc cấp theo ảnh, lọc "Đã nhập vào vụ án khác", thẻ khóa, nhãn cấp GĐT/ST lần 2, tab "Bản án, quyết định", lọc lần thụ lý ở 4 tab.
- v633 (27-11): khối Gửi đề nghị đến Tòa án – "Lập đơn →" thành biểu tượng (+) nền tròn nhạt.
- v634 (27-11): khối Gửi đề nghị đến Tòa án – bỏ dòng mô tả dưới tiêu đề.
- v635 (27-11): tab Các cấp xét xử – Giai đoạn tố tụng quay dọc timeline (đã qua chữ đen, chưa đến chữ xám).
- v636 (27-11): tab Các cấp xét xử – bỏ dòng phiên dưới Giai đoạn tố tụng.
- v637 (27-11): Chi tiết vụ án theo trang "Vụ án của tôi" bản 1.2 – 6 câu đã chốt (tab, Định danh, thẻ lần thụ lý, banner, nhóm đương sự vụ bị nhập, khóa nút).

**Rà soát kết quả test sheet 1 Vụ án (26-11-2026)**: file ghi 21 F (chạy 24-11 trên v582). Đối chiếu lại trên v612: 17 case không còn lỗi (đã sửa ở v583 hoặc web đã đổi, vd 1.26 web thay khối "Đơn gốc" bằng bảng ngày 23/11). Còn 4 case, người dùng quyết định: 1.1 không bổ sung (Trang chủ không có thẻ "Vụ án của tôi"), 1.9 giữ đã bỏ nút sao chép mã, 1.18 không thêm "Về danh sách" ở màn lỗi (giữ quy tắc 21/11; đã demo), 1.30 áp ở v613. File Excel chưa được ghi lại kết quả (chờ người dùng cho phép).

**Còn mở / ghi chú**
- Chờ trả lời: áp đầu thẻ đương sự kiểu v612 (tên + "Bạn" trái, vai trò nhãn phải) cho Chi tiết đơn và phá sản? (phần dòng nhãn–giá trị đã đồng nhất ở v615)
- Khác web, chưa sửa: web ghi "Vai trò của bạn", prototype ghi "Tư cách của bạn"; web có nút sao chép mã (prototype bỏ từ v583 theo duyệt cũ).
- Lỗi có từ trước (đã có ở v611): luồng Tổ chức, thẻ "Hoàng Dương" ở Các bên đương sự Chi tiết vụ án không đổi thành "Công ty ABC".
- `skills/gen-ui-mobile/SKILL.md` chưa ghi đường dẫn trang mới (người dùng chọn để nguyên).
- Bản đăng có liên kết tải tệp không chạy trong trình xem claude.ai (có từ bản cũ, chưa sửa).

**Không còn việc đang làm dở.** v610–v617 đã push git (commit 8bcc33b, 27-11-2026) (tệp đã sửa: `prototype-src/src`, `prototype-src/dist`, `prototype-app/index.html`, `prototype/Prototype-TATC-v610…v617.html`, 2 tài liệu design system, tệp này; mã demo mới ở `tools/kiem-tra/demo-mau/` chưa rõ có push – hỏi trước). Chưa push: các tệp ghi chú trong `tai-lieu/` (cau-tra-loi-*, ra-soat-*, de-xuat-*, demo-*) và thư mục `de-xuat/`, `ra-soat-ux/` – vẫn có trên máy.

---

## 1. Thư mục gồm những gì

| Thư mục | Nội dung | Dùng khi |
|---|---|---|
| `tai-lieu/` | `design-system-day-du.md` (bản đầy đủ), `design-system-chot-2026-10-30.md` (quyết định đã chốt + nhật ký v1–v337), `ghi-nho-du-an.md` (ghi nhớ của tài khoản cũ) | Tải lên Project ở tài khoản mới; đọc trước khi thiết kế |
| `skills/` | `gen-ui-mobile.zip` (gói skill để tải lên), `gen-ui-mobile/SKILL.md` (nội dung đọc được) | Cài skill ở tài khoản mới |
| `design-system/` | Design system TuPhap: `README.md`, `tokens.json`, `tokens.css`, `components/` (bundle.js, bundle.css, index.d.ts, README + preview từng component), `fonts/`, `vendor/` (React 18.3.1) | Tra cứu component, token; mở các tệp preview `.html` trực tiếp trên máy |
| `prototype-src/` | **Mã nguồn prototype** (`src/`), design system dùng khi dựng (`ds/` – chỉ có tệp cần để dựng: tokens, bundle, React; README và preview từng component xem ở `design-system/components/`), ảnh và phông (`assets/`), phần đầu/cuối của bản app (`app-shell/`), công cụ (`tools/`), bản dựng sẵn (`dist/`) | Sửa prototype |
| `prototype/` | `Prototype-TATC-v337.html` – bản mới nhất (chép từ `prototype-src/dist/prototype-test.html`), chạy độc lập, mở bằng trình duyệt, không cần mạng (`Prototype-TATC-v307.html`, `Prototype-TATC-v310.html` là bản xuất trước, giữ lại) | Xem nhanh, gửi người khác |
| `prototype-app/` | Server xem trên điện thoại (HTTP 8080, HTTPS 8443), cài thành app (PWA). Hướng dẫn: `HUONG-DAN.txt` | Xem trên điện thoại |

Các tệp trong `prototype-src/dist/` (tạo bằng `tools/build.py`):

- `artifact.html` – nội dung đăng lên claude.ai bằng công cụ Artifact (React tải từ cdnjs). Đã kiểm tra: giống từng byte với bản v310 đang đăng ở tài khoản cũ.
- `prototype-test.html` – bản đầy đủ, React nhúng sẵn; dùng để chạy kiểm tra.
- `app-index.html` – `index.html` cho `prototype-app/`.

---

## 2. Các bước bắt đầu ở tài khoản mới

1. **Tạo Project** trên claude.ai, đặt tên `Mobile TATC`. Tải lên 2 tệp trong `tai-lieu/`: `design-system-day-du.md` và `design-system-chot-2026-10-30.md` (giữ nguyên tên).
2. **Cài skill** `gen-ui-mobile`: vào phần Skills trong Settings của claude.ai, chọn tải skill lên, chọn `skills/gen-ui-mobile.zip`.
   - [Unverified] Tên menu có thể khác theo phiên bản ứng dụng (thường ở Settings → Capabilities → Skills).
3. **Mở Claude desktop → Cowork**, gắn phiên vào Project `Mobile TATC`, kết nối thư mục `E:\TATC\Mobile\Design_System`.
   - Khi cần đọc mã nguồn web để vẽ màn mới: kết nối thêm `E:\TATC\sourcecode\tatc.workspace`.
4. **Câu lệnh đầu tiên** gửi Claude:
   > Đọc E:\TATC\Mobile\Design_System\00-BAT-DAU-TU-DAY.md và làm theo.
5. **Việc Claude làm ở phiên đầu tiên** (mục 3A): dựng lại prototype, kiểm tra, đăng thành trang mới "Prototype TATC Gen UI" ở tài khoản mới, ghi đường dẫn mới vào 2 tài liệu Project và vào `skills/gen-ui-mobile/SKILL.md` (hỏi người dùng trước khi sửa skill).
6. **Tùy chọn – ghi nhớ**: nói với Claude "hãy ghi nhớ các điều trong tai-lieu/ghi-nho-du-an.md" để tài khoản mới có cùng ghi nhớ.

**Đường dẫn của tài khoản cũ** (tài khoản mới không mở được, trừ khi chủ tài khoản cũ chia sẻ):

- Prototype TATC Gen UI: https://claude.ai/artifact/CKnVgGSByzDJD7vDSWCnDd
- Trang design system: https://claude.ai/artifact/1GbaHfiE2GAprpV1qBCwQ7 → thay bằng thư mục `design-system/`
- Bản duyệt 74 màn (không cập nhật): https://claude.ai/artifact/QyVS6ngwmdVEyPyvtfpEwU
- Prototype app TATC (dừng ở v250, không cập nhật): https://claude.ai/artifact/RsNHijiJbodLQbodMuAVsH

---

## 3. Quy trình làm việc (cho Claude)

Vùng làm việc cloud của mỗi phiên là tạm thời. **Bản gốc luôn là thư mục `E:\TATC\Mobile\Design_System\prototype-src` trên máy người dùng.** Sửa xong phải ghi lại vào đó.

### 3A. Đầu phiên – dựng lại môi trường

1. Chép (stage) các tệp cần để dựng vào vùng làm việc cloud, giữ nguyên cấu trúc thư mục `prototype-src/`:
   - `src/`: `s1.js`, `s2.js`, `s3.js`, `s5.js`, `proto.js`, `page.css`, `proto.css`
   - `ds/tokens.json`, `ds/components/bundle.js`, `ds/components/bundle.css`, `ds/vendor/react.production.min.js`, `ds/vendor/react-dom.production.min.js`
   - `assets/`: `logo.png`, `vneid.png`, `splash.jpg`, `login-bg.jpg`, `hero.jpg`, `fonts/Roboto-Regular.woff2`, `fonts/Roboto-Medium.woff2`, `fonts/Roboto-Bold.woff2`
   - `app-shell/head.html`, `app-shell/tail.html`
   - `tools/build.py`, `tools/test_jump.js`, `tools/shot.js`
2. Dựng: `cd prototype-src && python3 tools/build.py`
3. Kiểm tra: `node tools/test_jump.js $PWD/dist/prototype-test.html` → kết quả đúng: `visited 499 empty [] errors []` ở v337 (con số màn tăng khi thêm màn; màn chào `splash` ít chữ là bình thường). Kiểm tra cả 2 luồng: chạy lại sau khi gọi `datLoaiTK('tc')` (luồng Tổ chức) trong trang.
4. Phiên đầu tiên ở tài khoản mới: đăng `dist/artifact.html` bằng công cụ Artifact thành trang mới, tiêu đề **Prototype TATC Gen UI**. Ghi đường dẫn mới vào đầu 2 tài liệu Project. Các phiên sau: cập nhật đúng trang đó (không tạo trang mới).

### 3B. Mỗi lần sửa (vNNN = số phiên bản tiếp theo, bắt đầu từ v311)

1. **Sao lưu trước khi sửa**: chép `dist/artifact.html` hiện tại thành `backups/prototype-tatc-gen-ui-mobile.bak-YYYYMMDD-HHMM.html` (giờ Việt Nam; nếu trùng tên thêm `-b`). Thư mục `backups/` nằm trong `prototype-src/`. Người dùng yêu cầu (11/11/2026): mỗi lần sửa đều sao lưu, **chỉ giữ 5 bản gần nhất** (xóa bản cũ hơn).
2. Sửa tệp trong `src/` (không sửa trực tiếp tệp trong `dist/`).
3. Dựng: `python3 tools/build.py`
4. Kiểm tra: `node tools/test_jump.js $PWD/dist/prototype-test.html` → không có màn rỗng, không có lỗi.
5. Chụp màn để tự xem hoặc gửi người dùng: `node tools/shot.js $PWD/dist/prototype-test.html <id màn>[@cuộn] …` → ảnh trong `prototype-src/shots/`.
6. Đăng lại `dist/artifact.html` lên trang Prototype TATC Gen UI của tài khoản mới, kèm nhãn ngắn (ví dụ `v311 …`). Người dùng yêu cầu tự đăng sau mỗi lần sửa đã kiểm tra xong, không cần hỏi lại.
7. Ghi lại vào máy người dùng (không ghi đè nếu người dùng vừa sửa tệp – dùng kiểm tra thời gian sửa tệp):
   - tệp `src/` đã đổi, 3 tệp `dist/`, bản sao lưu trong `backups/`;
   - `dist/app-index.html` chép thành `prototype-app/index.html` (điện thoại tự tải lại nếu server đang chạy).
8. Ghi nhật ký: thêm 1 dòng `- DD/MM/2026 (vNNN): <thay đổi>` vào cuối cả 2 tài liệu Project (`design-system-chot-2026-10-30.md`, `design-system-day-du.md`), rồi ghi lại 2 tài liệu vào `tai-lieu/`.
9. Báo người dùng bằng tiếng Việt, ngắn gọn, kèm đường dẫn bản sao lưu.

### 3C. Ghi chú kỹ thuật

- Bố cục mã: `s1.js` (khung điện thoại, thanh trạng thái, thanh điều hướng, thành phần dùng chung), `s2.js`, `s3.js`, `s5.js` (các màn), `proto.js` (khung prototype: danh sách màn `GROUPS2`, luật điều hướng `R`, ô "Đi tới màn bất kỳ"). Thứ tự nạp: s1, s2, s3, s5, proto.
- Nút bấm chuyển màn: luật `R` khớp nhãn nút → gán `data-pt-go`. Nút xử lý tại chỗ phải nằm trong danh sách `LOCAL` của `proto.js` (ví dụ `.acc-l`, `.acc-form .tp-select-btn`).
- Nền mờ `tp-scrim` kích hoạt quay lại màn trước; hộp riêng dùng `ph-scrim`.
- Thanh thông báo nổi: `window.__ptSnack('…')`.
- Khung điện thoại 430×932 (iPhone 14 Pro Max), co theo cửa sổ.
- Token màu không có `--brand`; đỏ chủ đạo dùng `--brand-800`, đỏ tươi `--court-red`.
- Dựng trên Windows: `build.py` mặc định ghi xuống dòng CRLF; bọc `builtins.open` để ép `newline='\n'` rồi chạy `runpy.run_path('tools/build.py', run_name='__main__')`.
- Bộ xử lý bấm của prototype chạy ở pha capture (`onClickCapture` trên `.pt-phone`): muốn chặn chuyển màn thì chỉ gắn `data-pt-go` khi hợp lệ, còn lại dùng lớp `pt-chk` (đã có trong `LOCAL`) + `onClick`. Luật `R` có thể trả về hàm (vd "Nộp đơn ngay" → `draftNoRep` với tổ chức, `draftAsk` với cá nhân).
- Loại tài khoản (v333): biến `LOAI_TK`, hàm `laTC()`, `datLoaiTK(v)` ở `s1.js`. Luồng Tổ chức có lớp thay dữ liệu hiển thị trong `proto.js` (`ttApply`, theo dõi bằng `MutationObserver` trên `document.body`): Hoàng Dương → Công ty ABC, CCCD → Mã số thuế, thường trú → Địa chỉ trụ sở, ẩn Ngày sinh/Giới tính/Quốc tịch/Ngày cấp/Nơi cấp của tổ chức.
- Mẫu danh sách chuẩn (v335–v336): thẻ theo `QdCard` của Danh sách đơn và tiến trình (hàng nhãn trạng thái + tình trạng · tên đậm · dòng nhãn – giá trị `qc-ben` · khối "Việc cần làm"); header kiểu `DsShell` (quay lại, tên màn, nút đỏ góc phải).

---

## 4. Quy tắc làm việc (giữ nguyên, áp dụng mọi phiên)

Lời người dùng, giữ nguyên câu chữ:

- "Không xóa file của người dùng. Trước khi sửa prototype phải tạo bản sao lưu."
- "tuyệt đối không được tự ý chốt rồi mới hỏi có đồng ý k"
- "phần nào k chắc chắn. hãy hỏi lại"
- Từ nay, khi có điều gì chưa chắc chắn, hỏi người dùng trước, không tự quyết định.

Cách hiểu các từ người dùng hay dùng:

- **"đề xuất"**: làm 3 phương án, có ảnh chụp từng phương án, hỏi bằng câu hỏi lựa chọn (AskUserQuestion). Không áp dụng vào prototype trước khi người dùng chọn.
- **"demo"**: làm bản cho xem rồi chờ người dùng quyết định.
- **"stop" / "dừng"**: dừng ngay và hoàn tác phần đang làm dở.
- **"app"**: hiểu là app Mobile.

Nội dung và thiết kế:

- Chỉ dùng nội dung có trong mã nguồn web, trang web hoặc ảnh người dùng gửi. Câu chữ còn thiếu để trong ngoặc vuông, ví dụ `[Câu lỗi khi chưa chọn Tòa án]`.
- Không đổi thứ tự trường của web khi chưa được yêu cầu.
- Cỡ chữ chỉ dùng 10 / 12 / 14 / 16 / 20 / 24. Ngoại lệ đã duyệt: 18px (tên cổng ở màn chào và màn Đăng nhập; tiêu đề bảng từ đáy 18/26); thẻ đơn và thẻ thư dùng 13px / 15px.
- Prototype không kiểm tra bắt buộc nhập; chỉ giữ dấu * để đánh dấu.
- Component mới cho design system: đề xuất 3 phương án; chỉ thêm sau khi người dùng chọn.

An toàn và nơi lưu:

- Không bao giờ nhập tài khoản, mật khẩu. Trang cần đăng nhập: đọc giao diện từ mã nguồn, hoặc nhờ người dùng tự đăng nhập / gửi ảnh chụp.
- Không lưu prototype vào Desktop. Chỉ làm và lưu trên trang "Prototype TATC Gen UI" (của tài khoản mới) và thư mục này.
- Lưu ý: `skills/gen-ui-mobile/SKILL.md` còn ghi "cập nhật prototype trên Desktop" và đường dẫn design system của tài khoản cũ. Quy tắc ở mục này thay thế các chỗ đó.

Trả lời:

- Tiếng Việt, ngắn gọn.
- Theo quy định của tổ chức (Reality Filter): điều chưa kiểm chứng phải ghi nhãn [Inference] / [Speculation] / [Unverified]; nói sai thì đính chính bằng "Correction: …".

---

## 5. Xem prototype trên điện thoại

1. Cần Node.js trên máy tính. HTTPS cần thêm OpenSSL (có sẵn trong Git for Windows).
2. Bấm đúp `prototype-app\start-all.bat` → mở 2 cửa sổ server (HTTP 8080, HTTPS 8443). Giữ 2 cửa sổ chạy.
3. Trên điện thoại (cùng mạng Wi-Fi nội bộ), mở `http://<IP máy tính>:8080/mobile-setup.html` và làm theo hướng dẫn.
4. Cài thành app (Android và iPhone) cần mở qua HTTPS 8443 và cài chứng chỉ `preview-ca.crt` một lần.
5. Chi tiết, xử lý khi đổi IP, gỡ bỏ: `prototype-app\HUONG-DAN.txt`.

- [Unverified] Địa chỉ IP trong `HUONG-DAN.txt` (10.15.73.21) là IP lúc cấu hình; IP máy có thể đã đổi.
- Thư mục `E:\TATC\sourcecode\tatc\prototype-app` (bản cũ) vẫn giữ nguyên; có thể dùng một trong hai.

---

## 6. Tình trạng khi xuất

- Cập nhật 12/11/2026 (v337): không còn việc đang làm dở. Thay đổi v311–v337 ghi ở cuối 2 tài liệu trong `tai-lieu/`; ảnh đề xuất và ảnh chụp trong `prototype-src/shots/`.
- Chưa làm: chỉnh khung theo Samsung S26 Ultra (người dùng chọn giữ 430×932).
- Mục "Còn chờ quyết định" và "Còn chờ cung cấp" xem trong `tai-lieu/design-system-chot-2026-10-30.md`.
