# Rà soát UX prototype TATC – 20/11/2026 (bản v531)

- **Phạm vi:** 788 màn, gồm mọi màn trong danh sách "Đi tới màn bất kỳ" (`SCR`), kể cả bảng từ đáy và các trạng thái.
- **Cách làm:** chạy `ux-audit.js` (skill gen-ui-mobile bản mới) trên `prototype-test.html` v531, chỉ đọc trang, **không sửa prototype**.
- **Luật:** mã `UX-n`, `APP-n` theo `references/ux-checklist.md` (lọc từ ui-ux-pro-max).
- **Số màn có ít nhất 1 lỗi bắt buộc:** 403/788.

## 1. Tổng hợp theo luật

| Mức | Mã | Vấn đề | Số chỗ | Số màn |
|---|---|---|---|---|
| Bắt buộc | APP-6 | Vùng chạm nhỏ hơn 44px | 1114 | 389 |
| Bắt buộc | UX-36 | Tương phản chữ thấp | 61 | 35 |
| Nên | UX-74 | Cỡ chữ ngoài thang design system (10·12·14·16·20·24) | 3170 | 333 |
| Xem lại | APP-26 | Chữ 10–11px (chỉ cho chú thích phụ) | 33 | 22 |
| Xem lại | UX-113 | Chữ bị cắt (…) – cần đường xem đầy đủ nếu là nội dung chính | 97 | 95 |

## 2. Mẫu lặp lại nhiều nhất (sửa một chỗ dùng chung là hết ở nhiều màn)

### Bắt buộc · APP-6 Vùng chạm nhỏ hơn 44px (1114 chỗ, 389 màn)

| Phần tử – chi tiết | Số màn | Màn ví dụ |
|---|---|---|
| button.tp-btn.tp-btn-secondary – 32×32px | 149 | `kc5`, `kcs3`, `kcs4` … |
| button.tp-btn.tp-btn-primary – 97×36px | 51 | `kc5`, `kcs4`, `kqh4` … |
| button.ph-rv2-tg – 336×20px | 38 | `kcs4`, `kqh4`, `pbs4` … |
| button.qh-icnut – 40×40px | 28 | `applications`, `applicationsGdt`, `applicationsErr` … |
| button.tp-btn.tp-btn-secondary – 120×36px | 24 | `applicationsErr`, `appTabErrDs`, `appTabErrTl` … |
| button.ph-ibar-sort.ib-sort2 – 77×28px | 22 | `notifications`, `applications`, `applicationsGdt` … |
| button.sf-pill – 91×36px | 17 | `applications`, `applicationsGdt`, `applicationsPtEmpty` … |
| button.tp-btn.tp-btn-secondary – 398×36px | 15 | `hearingDetailPost`, `waitingRoom`, `waitingRoomErr` … |
| button.tp-seg-on – 193×40px | 15 | `login`, `gx1`, `gx1Manual` … |
| button – 193×40px | 15 | `login`, `gx1`, `gx1Manual` … |
| button.tp-btn.tp-btn-secondary – 103×36px | 15 | `complaintForm`, `kqd1`, `khv1` … |
| button.ph-mail2-btn – 36×36px | 13 | `mailDetail`, `mailDetailGiu`, `mailDetailNoFile` … |
| … và 159 mẫu khác | | |

### Bắt buộc · UX-36 Tương phản chữ thấp (61 chỗ, 35 màn)

| Phần tử – chi tiết | Số màn | Màn ví dụ |
|---|---|---|
| span.vk-tag.q2-tag-PT – 4.09:1 (cần 4.5:1) | 11 | `ptDetail`, `ptDetailReturned`, `ptChoRut` … |
| span.tdx-lb – 2.31:1 (cần 4.5:1) | 7 | `appealDetail`, `ptChoRut`, `ptBsHet` … |
| span.vk-tag.q3-tag – 4.40:1 (cần 4.5:1) | 6 | `appealDetail`, `appealSua`, `appealQuaHan` … |
| span – 1.13:1 (cần 4.5:1) | 3 | `hearingDetailPost`, `hearingHistory`, `defenderViewNo` |
| span.knd-pill.knd-pill-tc – 4.02:1 (cần 4.5:1) | 3 | `complaints`, `complaintsNhap`, `complaintsNhapKy` |
| span – 2.93:1 (cần 4.5:1) | 2 | `commitForm`, `commitFormNew` |
| b – 2.93:1 (cần 4.5:1) | 2 | `commitForm`, `commitFormNew` |
| small.gd-agree-g – 4.35:1 (cần 4.5:1) | 2 | `commitForm`, `commitFormNew` |
| small – 3.20:1 (cần 4.5:1) | 2 | `appK_khangcao`, `complaintsTtL2Khoa` |
| p.ph-p.ph-muted – 3.88:1 (cần 4.5:1) | 2 | `bp2Ky`, `tr2Ky` |
| dt – 2.76:1 (cần 4.5:1) | 1 | `mg1Ky` |
| small – 3.88:1 (cần 4.5:1) | 1 | `bp2Ky` |
| … và 9 mẫu khác | | |

### Nên · UX-74 Cỡ chữ ngoài thang design system (10·12·14·16·20·24) (3170 chỗ, 333 màn)

| Phần tử – chi tiết | Số màn | Màn ví dụ |
|---|---|---|
| dt – 13px | 194 | `kc5`, `kcs4`, `kqh4` … |
| dd – 13px | 194 | `kc5`, `kcs4`, `kqh4` … |
| span.tp-num – 13px | 151 | `kc5`, `kcs4`, `kqh4` … |
| b – 18px | 58 | `applications`, `applicationsGdt`, `applicationsErr` … |
| b – 15px | 31 | `calList`, `appDetail`, `appDetailNdNhap` … |
| b.qc-t – 15px | 30 | `applications`, `applicationsGdt`, `mediation` … |
| h3 – 18px | 29 | `caseDetailHoan`, `calEvent`, `calDueClash` … |
| span – 13px | 21 | `kc4`, `ykc3`, `nyyk3` … |
| b – 13px | 14 | `hearingRules`, `psDonDetailDs`, `kqd1L` … |
| p – 13px | 13 | `kqd1L`, `khv1L`, `ktv1L` … |
| i – 13px | 13 | `complaintForm`, `kqd1`, `khv1` … |
| p.q2-err – 13px | 12 | `pbs2err`, `prd2err`, `gsgdt3Err` … |
| … và 55 mẫu khác | | |

### Xem lại · APP-26 Chữ 10–11px (chỉ cho chú thích phụ) (33 chỗ, 22 màn)

| Phần tử – chi tiết | Số màn | Màn ví dụ |
|---|---|---|
| span.ib-chip2-n.tp-num – 10px | 7 | `notifications`, `faq`, `faqNone` … |
| span.knd-pill.knd-pill-kn – 11px | 3 | `complaints`, `complaintsNhap`, `complaintsNhapKy` |
| span.knd-pill.knd-pill-tc – 11px | 3 | `complaints`, `complaintsNhap`, `complaintsNhapKy` |
| span.knd-pill.knd-pill-pakn – 11px | 3 | `complaintTt`, `complaintTtDone`, `complaintTtL2` |
| small – 10px | 2 | `calList`, `copyDetailDone` |
| small – 11px | 2 | `ptSus1`, `ptCan1` |
| span.knd-pill.knd-pill-rut – 11px | 2 | `complaintsNhap`, `complaintsNhapKy` |
| small – 11.5px | 1 | `calRemind` |
| span.tp-file-type – 10px | 1 | `cc2` |
| span.nd-file-ic – 11px | 1 | `psDonDetailDs` |
| p.pdf-qh – 10px | 1 | `attachment` |
| p.pdf-cq – 10px | 1 | `attachment` |
| … và 2 mẫu khác | | |

### Xem lại · UX-113 Chữ bị cắt (…) – cần đường xem đầy đủ nếu là nội dung chính (97 chỗ, 95 màn)

| Phần tử – chi tiết | Số màn | Màn ví dụ |
|---|---|---|
| span.tp-appbar-name – "Quyết định tố tụng trong vụ án" | 13 | `complaintForm`, `kqd1`, `kqd2` … |
| span.tp-appbar-name – "Hành vi vi phạm của cán bộ, cô" | 10 | `ktc1`, `ktc2`, `ktc3` … |
| span.tp-appbar-name – "Hành vi của người tiến hành tố" | 9 | `khv1`, `khv2`, `khv3` … |
| span.tp-appbar-name – "Đề nghị xem xét lại quyết định" | 8 | `hgReview`, `hgr1Nhap`, `hgr1Qua` … |
| span.tp-appbar-name – "Tố cáo hành vi vi phạm pháp lu" | 8 | `ktv1`, `ktv2`, `ktv3` … |
| span.tp-appbar-name – "Rút đơn yêu cầu mở thủ tục phá" | 5 | `ps05_1Khoa`, `ps05_1`, `ps05_2` … |
| span.tp-appbar-name – "Thay đổi, bổ sung yêu cầu phản" | 5 | `ptd2`, `ptd2err`, `ptd3` … |
| span.tp-appbar-name – "Trình bày lý do kháng cáo quá " | 4 | `kqh1`, `kqh2`, `kqh3` … |
| span.tp-appbar-name – "Đề nghị xem xét lại việc trả l" | 4 | `ps04_1`, `ps04_2`, `ps04_3` … |
| span.tp-appbar-name – "Rút đơn yêu cầu áp dụng thủ tụ" | 4 | `ps06_1`, `ps06_2`, `ps06_3` … |
| span.tp-appbar-name – "Thay đổi, bổ sung yêu cầu yêu " | 4 | `ytd2`, `ytd3`, `ytd4` … |
| span.tp-appbar-name – "Khiếu nại lần hai quyết định t" | 4 | `kqd1L`, `kqd2L`, `kqd3L` … |
| … và 12 mẫu khác | | |

## 3. Màn có nhiều lỗi bắt buộc nhất

| Màn | Tên | Số lỗi bắt buộc |
|---|---|---|
| `calPersonal` | Lịch tố tụng – Tháng | 39 |
| `calEmpty` | Lịch tố tụng – ngày không có sự kiện | 38 |
| `calWeek` | Lịch tố tụng – Tuần | 11 |
| `mailDetail` | Văn bản tống đạt | 10 |
| `mailDetailThay` | Văn bản tống đạt – đã có văn bản mới hơn (v345) | 10 |
| `mailDetailKhoa` | Văn bản tống đạt – nút bị khóa, không có lý do từ hệ thống | 10 |
| `bs4` | Bổ sung, sửa đổi hồ sơ – bước 4 xem lại và ký gửi | 9 |
| `appK_phanto` | Danh sách đơn – Đơn phản tố, yêu cầu độc lập | 9 |
| `pbs4` | Bổ sung hồ sơ đơn phản tố – 4 xem lại và ký gửi | 8 |
| `calList` | Lịch tố tụng – Danh sách | 8 |
| `calRemind` | Lịch – Nhắc lịch | 8 |
| `applicationsGdt` | Danh sách đơn – tab Giám đốc thẩm, tái thẩm | 8 |
| `ybs4` | Bổ sung hồ sơ đơn yêu cầu độc lập – 4 ký gửi | 8 |
| `ptd5` | Thay đổi, bổ sung yêu cầu phản tố – 5 ký gửi | 8 |
| `ytd5` | Thay đổi, bổ sung yêu cầu độc lập – 5 | 8 |
| `khc5` | Khiếu nại hành chính – bước 5, Xem lại và ký gửi | 8 |
| `ktc5` | Tố cáo – bước 5, Xem lại và ký gửi | 8 |
| `kpa5` | Kiến nghị, phản ánh – bước 5, Xem lại và ký gửi | 8 |
| `appK_khangcao` | Danh sách đơn – Đơn kháng cáo | 8 |
| `appK_gdt` | Danh sách đơn – Đơn giám đốc thẩm, tái thẩm | 8 |

## 4. Giới hạn của lần rà soát này

- Chỉ kiểm 7 loại lỗi tự động được (vùng chạm, tên đọc màn hình, nhãn ô nhập, alt ảnh, tương phản, cỡ chữ, chữ bị cắt). Các luật cần nhìn bằng mắt (UX-37 báo trạng thái chỉ bằng màu, UX-35 xác nhận thao tác không hoàn tác, APP-11 lối thoát bảng từ đáy…) chưa được kiểm.
- Vùng chạm tính theo khung phần tử và lớp `::before/::after` định vị tuyệt đối; nút được nới vùng chạm theo cách khác sẽ vẫn bị báo.
- Tương phản không tính trên chữ đặt trên ảnh nền; nền chuyển màu thì lấy điểm màu xấu nhất.
- Prototype chỉ có giao diện sáng, chưa kiểm chế độ tối; chưa thử phóng chữ hệ thống.
- Mỗi màn chỉ kiểm phần đang hiện trên khung điện thoại lúc mở (chưa cuộn).
