# Rà soát sheet 1 – TATC_Mobile_TC_NghiaVuTaiChinh.xlsx (25-11-2026)

- Kết quả test 24-11-2026 trên prototype v582: 28 P, 5 F (1.2, 1.17, 1.18, 1.24, 1.33).
- Đã kiểm lại trên prototype **v589** và web `tatc.congdichvu.web` origin/develop **010c57c7**: các màn Nghĩa vụ tài chính chưa đổi, 4 lỗi vẫn còn.
- **1.33 không phải lỗi:** web chỉ hiện nút "Tải biên lai PDF" khi có tệp (`danh-sach.tsx:434`, `chi-tiet.tsx:193`), nên câu "Khoản này chưa có tệp biên lai điện tử." không bao giờ hiện. Testcase cần bỏ ý này và chấm P.
- **1.2:** prototype không có màn Quản lý thời hạn (`/quan-ly-thoi-han`). Đây là một chức năng riêng, không tính vào lỗi lối vào.
- Phiên này chỉ demo và chốt; áp dụng ở phiên chính.

## Chốt phương án (ảnh demo: scratchpad\nv\nv-*.png)

| # | Chốt |
|---|---|
| 1.2 | **Duyệt.** Nút nộp tiền ở Danh sách đơn (việc "Nộp tiền tạm ứng chi phí tố tụng") và mọi màn Chi tiết đơn (đơn thường, kháng cáo, phản tố, giám đốc thẩm/tái thẩm; ví dụ "Nộp tạm ứng án phí …" ở appDetailFee) mở thẳng Cổng DVCQG (`dvcqgExt`), không qua màn Nghĩa vụ tài chính (`finance`) hay màn Nộp tiền (`financePay`). Giao diện nút giữ nguyên. (nv-1.2) |
| 1.17 | **Duyệt.** Màn Đã nộp, được miễn (`financeDone`): bỏ nhãn "Đã nộp" trên thẻ khoản đã nộp (chỉ khoản được miễn có nhãn "Được miễn"); khoản được miễn ghi "Ngày miễn: {ngày} · Không phải nộp". (nv-1.17) |
| 1.18 | **Theo web.** Thẻ khoản ở nhóm Đã nộp, được miễn không chạm cả thẻ, chỉ bấm nút: khoản đã nộp có tệp biên lai chỉ có "Tải biên lai PDF" (không vào chi tiết); khoản được miễn có nút "Xem quyết định miễn" (cùng kiểu nút Tải biên lai, đặt cuối thẻ sau đường kẻ) mở Chi tiết khoản (`financeDetailExempt`); khoản khác có nút "Xem chi tiết". (nv-1.18) |
| 1.24 | **Duyệt.** Chi tiết khoản: khoản còn mở, cho phép miễn giảm, gắn vụ án hoặc đơn mà không có khối "Nộp tiền" (chưa nộp được, ví dụ `financeDetailUnknown`) thì đặt nút phụ (secondary) "Đề nghị miễn, giảm" rộng 100% trong khối Cách nộp, ngay sau câu hướng dẫn. Khoản gắn vụ án mở Chi tiết vụ án, khoản gắn đơn mở Chi tiết đơn (hiện nút ở khối Nộp tiền luôn mở `caseDetail`, cũng sửa theo quy tắc này). Khoản nộp được giữ nút ở khối Nộp tiền. (nv-1.24) |
| 1.33 | Không sửa prototype; sửa testcase (bỏ ý "chưa có tệp", chấm P). |

> Đã hỏi xong 4 lỗi F sheet 1 (25-11-2026). Chưa sửa prototype, chưa sửa file Excel testcase.
