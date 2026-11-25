# Status-color – bộ màu trạng thái, tình trạng (chốt 25-11-2026; 22 màu từ v605, đã áp cho Vụ án và Đơn)

> 25-11-2026 (v605): người dùng bỏ các màu hồng, tím (st-18 Tím xanh, st-19 Tím, st-20 Tím mận, st-21 Tím hồng, st-22 Hồng sen, st-23 Hồng đất, st-24 Đỏ hồng, st-29 Tím than). Không dùng lại các số này. Còn 22 màu: st-1…st-17, st-25…st-28, st-30.

Tên gọi: **Status-color**. Khi người dùng nói "Status-color" là nói bộ màu này (22 token `st-N` trong bảng dưới).

Người dùng chọn ngày 25-11-2026. Bộ màu này dùng để tô nhãn trạng thái và tình trạng trên các màn. **Mỗi trạng thái được gán cố định 1 màu.**

**Hiện trạng:**
- Bộ màu chưa đưa vào `tokens.css` và chưa áp vào prototype.
- Người dùng sẽ yêu cầu áp dụng sau. Không tự áp dụng.
- Cho đến lúc đó, prototype vẫn dùng 5 tông `success`, `warning`, `danger`, `info` và `neutral` của `StatusBadge`.

## Cách tạo bộ màu
- **Chữ (`--st-N`):** gồm 24 sắc chính và 6 tông trầm.
  - 24 sắc chính cách nhau 15° trên vòng màu, độ bão hòa HSL 55%.
  - 6 tông trầm là nâu socola, đỏ rượu, xanh navy, rêu đậm, tím than và xám xanh.
  - Độ sáng được hạ đến khi tương phản đạt từ 7,05:1 trở lên trên `surface-page` `#f1f3f6`, tức mức AAA.
- **Nền nhãn (`--st-N-tint`):** 6% màu chữ pha với trắng.
- **Viền (`--st-N-border`):** 20% màu chữ pha với trắng.
- **Chấm (`--st-N-dot`):** 85% màu chữ pha với trắng. Chấm luôn đi kèm chữ (luật UX-37).
- **Tương phản:** đã tính theo công thức WCAG 2.x.
  - Chữ đạt AAA trên trắng, trên `#f1f3f6` và trên nền nhãn của chính nó.
  - Chấm đạt từ 5,27:1 trở lên trên trắng.

| Token | Tên gọi | Chữ `--st-N` | Nền `-tint` | Viền `-border` | Chấm `-dot` | Chữ/trắng | Chữ/`#f1f3f6` | Chữ/nền nhãn | Chấm/trắng |
|---|---|---|---|---|---|---|---|---|---|
| st-1 | Đỏ gạch | `#942b2b` | `#f9f2f2` | `#ead5d5` | `#a44b4b` | 7,96 | 7,16 | 7,20 | 5,70 |
| st-2 | Đất nung | `#823d26` | `#f8f3f2` | `#e6d8d4` | `#955a47` | 7,94 | 7,14 | 7,22 | 5,48 |
| st-3 | Nâu cam | `#714921` | `#f6f4f2` | `#e3dbd3` | `#866442` | 7,84 | 7,06 | 7,15 | 5,36 |
| st-4 | Nâu vàng | `#61501c` | `#f6f5f1` | `#dfdcd2` | `#796a3e` | 7,86 | 7,07 | 7,20 | 5,32 |
| st-5 | Ô liu | `#535318` | `#f5f5f1` | `#ddddd1` | `#6d6d3b` | 8,02 | 7,22 | 7,34 | 5,38 |
| st-6 | Rêu | `#485719` | `#f4f5f1` | `#daddd1` | `#63703c` | 7,92 | 7,12 | 7,23 | 5,37 |
| st-7 | Xanh cốm | `#39591a` | `#f3f5f1` | `#d7ded1` | `#57723c` | 8,02 | 7,22 | 7,31 | 5,42 |
| st-8 | Lá mạ | `#2b5b1a` | `#f2f5f1` | `#d5ded1` | `#4b743c` | 8,03 | 7,23 | 7,31 | 5,44 |
| st-9 | Lục | `#1b5d1b` | `#f1f5f1` | `#d1dfd1` | `#3d753d` | 7,99 | 7,19 | 7,26 | 5,51 |
| st-10 | Lục bảo | `#1b5d2b` | `#f1f5f2` | `#d1dfd5` | `#3d754b` | 7,93 | 7,14 | 7,21 | 5,46 |
| st-11 | Ngọc lục | `#1b5d3c` | `#f1f5f3` | `#d1dfd8` | `#3d7559` | 7,84 | 7,06 | 7,13 | 5,40 |
| st-12 | Bạc hà | `#1a5b4b` | `#f1f5f4` | `#d1dedb` | `#3c7466` | 7,95 | 7,15 | 7,23 | 5,41 |
| st-13 | Mòng két | `#1a5959` | `#f1f5f5` | `#d1dede` | `#3c7272` | 8,02 | 7,22 | 7,31 | 5,47 |
| st-14 | Xanh hồ | `#1f586b` | `#f2f5f6` | `#d2dee1` | `#417181` | 7,88 | 7,08 | 7,19 | 5,38 |
| st-15 | Xanh biển | `#265482` | `#f2f5f8` | `#d4dde6` | `#476e95` | 7,86 | 7,07 | 7,18 | 5,34 |
| st-16 | Xanh thép | `#2f4ca2` | `#f3f4f9` | `#d5dbec` | `#4e67b0` | 7,85 | 7,06 | 7,14 | 5,40 |
| st-17 | Chàm | `#3b3bc6` | `#f3f3fc` | `#d8d8f4` | `#5858cf` | 7,99 | 7,19 | 7,25 | 5,66 |
| st-25 | Nâu socola | `#6b4a33` | `#f6f4f3` | `#e1dbd6` | `#816552` | 7,92 | 7,12 | 7,22 | 5,36 |
| st-26 | Đỏ rượu | `#893442` | `#f8f3f4` | `#e7d6d9` | `#9b525e` | 7,97 | 7,17 | 7,26 | 5,58 |
| st-27 | Xanh navy | `#345089` | `#f3f5f8` | `#d6dce7` | `#526a9b` | 7,91 | 7,12 | 7,24 | 5,39 |
| st-28 | Rêu đậm | `#305a45` | `#f3f5f4` | `#d6deda` | `#4f7361` | 7,85 | 7,06 | 7,17 | 5,31 |
| st-30 | Xám xanh | `#435460` | `#f4f5f5` | `#d9dddf` | `#5f6e78` | 7,85 | 7,06 | 7,19 | 5,27 |


## Khi người dùng yêu cầu áp dụng
1. **Bảng ánh xạ chưa chốt.** Liệt kê mọi nhãn trạng thái, tình trạng đang có trong `src/*.js` (tìm `StatusBadge`, `tone:`). Ngày 25-11-2026 có khoảng 40 nhãn, ví dụ Đã ký, Đã thụ lý, Chờ tiếp nhận, Chưa nộp, Chờ Tòa án xem xét, Yêu cầu bổ sung tài liệu, Đã trả lại đơn, Hết hạn xác nhận. Đề xuất bảng `nhãn → st-N` và hỏi người dùng duyệt.
2. **Gợi ý gán màu:**
   - Các nhãn cùng nghĩa dùng chung một màu, ví dụ "Đã ký" và "Đã ký số".
   - Các nhãn hay đứng cạnh nhau trên cùng một màn nên cách nhau ít nhất 3 bậc trong bảng.
   - Tránh gán vùng đỏ (st-1, st-24, st-26) cho trạng thái tốt và vùng lục (st-9 đến st-11) cho trạng thái xấu, vì người dùng quen đọc đỏ là lỗi và xanh lá là xong.
   - [Inference] st-17 Chàm nhìn rực hơn các màu còn lại. Nếu người dùng thấy chói thì hạ riêng màu này xuống độ bão hòa 45%.
3. **Giữ nguyên ngoài phạm vi:** lỗi nhập liệu dưới ô (`danger`), thông báo và màu thương hiệu `brand-*` không dùng bộ màu này.
4. **Quy trình:**
   - Demo trước, gồm bảng ánh xạ và vài màn mẫu (Danh sách đơn, Hộp thư, Chi tiết), đặt cạnh bản hiện tại.
   - Người dùng duyệt xong mới thêm token vào `tokens.json` và `tokens.css` (cả `design-system/` và `prototype-src/ds/`).
   - Sau đó mở rộng `StatusBadge` để nhận màu `st-N`, sửa `src/`, rồi theo quy trình 3B: sao lưu, dựng, kiểm tra, đăng claude.ai.


## Đã áp dụng (v605, 25-11-2026) – Vụ án và Đơn
- **Trạng thái** (nhãn nền `-tint`, viền `-border`, chữ `st-N`), mỗi trạng thái 1 màu cố định:
  - Vụ án: Đang giải quyết st-15 · Đã tuyên án – trong thời hạn kháng cáo st-13 · Bản án/quyết định có hiệu lực pháp luật st-9 · Đang xét lại (GĐT / tái thẩm) st-17 · Đang xử lý đơn st-27 · Đang xử lý st-16 · Đã giải quyết st-11 · Đã xử lý st-30.
  - **Đình chỉ và Tạm đình chỉ: cùng đỏ gạch st-1, nhãn nổi bật** – nền 16% màu chữ, viền 45% màu chữ, chữ đậm 700 (lớp `.st-dung`). Các trạng thái khác dùng tông lạnh, trầm để 2 nhãn này tách ra.
  - Đơn: Chưa gửi / Lưu tạm st-30 · Chờ ký số st-25 · Đã gửi đơn st-16 · Đang xử lý st-14 · Đã xử lý st-10.
- **Tình trạng** (chấm `-dot` + chữ `st-N`): dùng lại 21 màu `[1…17, 25, 26, 27, 28]` (bỏ st-30, để riêng cho trạng thái). Màu = `danh sách màu[(vị trí × 5) mod 21]`.
- Mã nguồn: `src/s5.js` (`SC_TT_VA`, `SC_DUNG`, `SC_TT_DON`, `SC_TINH_MAU`, `SC_DON_TT`, `ScNhan`, `ScTinh`, `ScBangMau`), `src/page.css` (`--st-N`, `-tint`, `-border`, `-dot`; `.st-tt`, `.st-ti`, `.st-dung`). Màn tra cứu: `vaBangMau`.
- Các chức năng khác (Khiếu nại, Trích lục, NVTC…) vẫn dùng 5 tông của `StatusBadge`. Chỉ áp tiếp khi người dùng yêu cầu.
