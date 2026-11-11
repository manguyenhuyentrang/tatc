Thẻ khoản phải nộp trong Nghĩa vụ tài chính (phương án E, kiểu biên lai; phần hạn nộp đã sửa theo góp ý ngày 30/10/2026).

- Phần trên: loại khoản 12px 500 `brand-text` và nhãn trạng thái; số tiền 24/32 700 `brand-text`; tên khoản 16/24 500.
- Đường xé nét đứt `border` 2px có 2 khuyết tròn màu nền trang.
- Phần dưới: bên trái mã thông báo, mã hồ sơ, Tòa án (12px `ink-subtle`); bên phải ô hạn nộp gộp "Hạn nộp / ngày / Còn n ngày": nền `surface-sunken`, `tone="warning"` (còn ≤ 3 ngày) nền `warning-tint` chữ `warning`, `tone="danger"` (quá hạn) nền `danger-tint`.
- Chạm cả thẻ để mở chi tiết. Bên dùng cung cấp: `kind`, `amount`, `title`, `code`, `caseCode`, `court`, `status`, `statusTone`, `deadline`, `remain`, `tone`, `deadlineLabel?` (ví dụ "Ngày xác nhận" cho khoản đã nộp), `onClick`.
