# Đề xuất UI bảng "Chọn loại đơn cần tạo" – Chi tiết đơn (25-11-2026)

- Prototype: v602, màn `appDetail` → tab Danh sách đơn → nút "Tạo đơn liên quan đến vụ việc" (hàm `DtTaoDon`, dữ liệu `DT_TAO`, `TAO_NGAN`, `TAO_IC`).
- Phiên này chỉ demo và chốt; áp dụng ở phiên chính. Ảnh demo nằm ở thư mục scratchpad\td: td-tao.png (A/B/C), td-taoA.png (kiểu biểu tượng), td-taoA2.png (màu).

## Chốt: PA A, biểu tượng A2, màu M1

- Bỏ nền xám của từng nhóm. Các dòng nằm phẳng trên nền trắng của bảng, giữa các dòng có đường kẻ `--border`, dòng cao tối thiểu 56px.
- Tên nhóm giữ bản ngắn (Khởi kiện, Biện pháp khẩn cấp, Án phí, lệ phí, Yêu cầu khác), cỡ 12/16, độ đậm 500, màu `--ink-muted`.
- Mỗi dòng gồm:
  - bên trái là ô biểu tượng vuông 40px bo góc 12px, nền `--tag-N-bg`, biểu tượng 20px màu `--tag-N-text`;
  - ở giữa là tên loại đơn, cỡ 14/20, độ đậm 500, màu `--ink`;
  - bên phải là mũi tên › màu `--ink-muted`.
- Biểu tượng giữ như `TAO_IC`: filePlus, pen, swap, logout, shield, wallet, send. Bỏ kiểu tờ đơn kèm huy hiệu.
- Màu theo nhóm (M1):

| Nhóm | Màu | Token |
|---|---|---|
| Khởi kiện | xanh dương | `--tag-9` |
| Biện pháp khẩn cấp | cam | `--tag-2` |
| Án phí, lệ phí | vàng | `--tag-3` |
| Yêu cầu khác | tím | `--tag-10` |

- Phương án đã demo nhưng không chọn:
  - PA B: tên nhóm đầy đủ kèm mô tả.
  - PA C: lưới 2 cột.
  - Kiểu biểu tượng A1, A3, A4, A5.
  - Màu: bộ màu A2 ban đầu (đỏ, xanh, vàng, lục), M2, M3, M4.

## Chi tiết vụ án: áp dụng cùng kiểu (chốt 25-11-2026, ảnh td-va.png cột 2 và 4)

- Các màn `caseDetailTao`, `caseDetailTaoKhoa`, `caseDetailTaoBd` (dữ liệu `VA_TAO`) đổi sang kiểu giống Chi tiết đơn: dòng phẳng, ô biểu tượng A2, màu M1.
- Giữ nguyên tên nhóm đầy đủ, nhãn giai đoạn ("Sau thụ lý", "Trước & sau thụ lý") và dòng lý do khóa.
- Loại bị khóa làm mờ như hiện tại và không có ›.
- Màu nhóm đổi theo M1: nhóm đỏ cũ thành `--tag-9`, xanh thành `--tag-2`, vàng thành `--tag-3`, lục thành `--tag-10`. "Đơn yêu cầu khác" và "Giao nộp và sao gửi tài liệu, chứng cứ" vẫn chung màu tím như hiện tại.
