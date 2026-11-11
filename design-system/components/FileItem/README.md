Một tệp trong danh sách tài liệu kèm theo, có ba trạng thái: đã tải, đang tải, lỗi.

- Bên dùng cung cấp: `name`, tùy chọn `meta` (dung lượng, loại, ngày), `status` (`done` mặc định, `uploading`, `error`), `progress` (0–100), `error` (câu lỗi), `onRemove`.
- Ô loại tệp lấy đuôi tên tệp (PDF, JPG…) trên nền `brand-tint`. Đang tải: thanh tiến độ `brand-800` trên `surface-sunken`. Lỗi: nền `danger-tint`, viền `danger`, dòng lỗi có biểu tượng cảnh báo.
- Nút xóa luôn có `aria-label` "Xóa <tên tệp>". Thường dùng qua `FileUpload`.
