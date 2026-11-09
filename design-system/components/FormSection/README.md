Khối form gập/mở theo app VN Post: mỗi bước nhập là một thẻ, có nhãn trạng thái "Đã nhập" / "Chưa nhập" (chữ thường) và mũi tên.

- Bên dùng cung cấp: `title`, `status` (`done` | `todo`), `children` (các trường), tùy chọn `defaultOpen` hoặc `open` + `onToggle`.
- Mỗi lúc chỉ mở một khối. Khi khối đủ thông tin thì tự gập lại và chuyển `status` sang `done`.
- Thứ tự cho đơn khởi kiện: Người khởi kiện → Người bị kiện → Nội dung khởi kiện → Tài liệu kèm theo.
