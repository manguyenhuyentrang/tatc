# BẮT ĐẦU TỪ ĐÂY – Prototype app mobile TATC (Cổng Dịch vụ Tư pháp)

Bộ thư mục này chứa đủ thiết kế mới nhất để làm tiếp dự án từ **một tài khoản Claude khác**.

- Bản prototype mới nhất: **v310** (11/11/2026).
- Ngày xuất: 11/11/2026 (bản đầu v307; cập nhật lên v310 cùng ngày).
- Vị trí trên máy: `E:\TATC\Mobile\Design_System`

> Gửi Claude ở phiên mới: đọc hết tệp này trước khi làm việc. Mọi quy tắc ở mục 4 vẫn có hiệu lực.

---

## 1. Thư mục gồm những gì

| Thư mục | Nội dung | Dùng khi |
|---|---|---|
| `tai-lieu/` | `design-system-day-du.md` (bản đầy đủ), `design-system-chot-2026-10-30.md` (quyết định đã chốt + nhật ký v1–v310), `ghi-nho-du-an.md` (ghi nhớ của tài khoản cũ) | Tải lên Project ở tài khoản mới; đọc trước khi thiết kế |
| `skills/` | `gen-ui-mobile.zip` (gói skill để tải lên), `gen-ui-mobile/SKILL.md` (nội dung đọc được) | Cài skill ở tài khoản mới |
| `design-system/` | Design system TuPhap: `README.md`, `tokens.json`, `tokens.css`, `components/` (bundle.js, bundle.css, index.d.ts, README + preview từng component), `fonts/`, `vendor/` (React 18.3.1) | Tra cứu component, token; mở các tệp preview `.html` trực tiếp trên máy |
| `prototype-src/` | **Mã nguồn prototype** (`src/`), design system dùng khi dựng (`ds/` – chỉ có tệp cần để dựng: tokens, bundle, React; README và preview từng component xem ở `design-system/components/`), ảnh và phông (`assets/`), phần đầu/cuối của bản app (`app-shell/`), công cụ (`tools/`), bản dựng sẵn (`dist/`) | Sửa prototype |
| `prototype/` | `Prototype-TATC-v310.html` – bản mới nhất, chạy độc lập, mở bằng trình duyệt, không cần mạng (`Prototype-TATC-v307.html` là bản xuất trước, giữ lại) | Xem nhanh, gửi người khác |
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
3. Kiểm tra: `node tools/test_jump.js $PWD/dist/prototype-test.html` → kết quả đúng: `visited 488 empty [] errors []` (con số màn tăng khi thêm màn).
4. Phiên đầu tiên ở tài khoản mới: đăng `dist/artifact.html` bằng công cụ Artifact thành trang mới, tiêu đề **Prototype TATC Gen UI**. Ghi đường dẫn mới vào đầu 2 tài liệu Project. Các phiên sau: cập nhật đúng trang đó (không tạo trang mới).

### 3B. Mỗi lần sửa (vNNN = số phiên bản tiếp theo, bắt đầu từ v311)

1. **Sao lưu trước khi sửa**: chép `dist/artifact.html` hiện tại thành `backups/prototype-tatc-gen-ui-mobile.bak-YYYYMMDD-HHMM.html` (giờ Việt Nam; nếu trùng tên thêm `-b`). Thư mục `backups/` nằm trong `prototype-src/`.
2. Sửa tệp trong `src/` (không sửa trực tiếp tệp trong `dist/`).
3. Dựng: `python3 tools/build.py`
4. Kiểm tra: `node tools/test_jump.js $PWD/dist/prototype-test.html` → không có màn rỗng, không có lỗi.
5. Chụp màn để tự xem hoặc gửi người dùng: `node tools/shot.js $PWD/dist/prototype-test.html <id màn>[@cuộn] …` → ảnh trong `prototype-src/shots/`.
6. Đăng lại `dist/artifact.html` lên trang Prototype TATC Gen UI của tài khoản mới, kèm nhãn ngắn (ví dụ `v311 …`).
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

- Không còn việc đang làm dở.
- Chưa làm: chỉnh khung theo Samsung S26 Ultra (người dùng chọn giữ 430×932).
- Mục "Còn chờ quyết định" và "Còn chờ cung cấp" xem trong `tai-lieu/design-system-chot-2026-10-30.md`.
