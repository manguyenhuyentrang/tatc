Danh sách văn bản trong Hộp thư tống đạt (phương án C, dòng kiểu hộp thư).

- Một thẻ chung, mỗi văn bản một dòng: chấm đỏ `court-red` bên trái khi chưa đọc; dòng đầu là Tòa án gửi (đậm khi chưa đọc) và thời gian; tiêu đề 16/24 tối đa 2 dòng (500 khi chưa đọc); dòng "Hạn xử lý … · Còn n ngày" màu theo `tone` (`warning` sắp hết hạn, `danger` quá hạn).
- Nút sao bên phải (40px) để đánh dấu Quan trọng; đã đánh dấu thì sao tô đặc `brand-text`. Chạm phần còn lại của dòng để mở văn bản.
- Bên dùng cung cấp: `items` = `[{from, time, title, deadline?, remain?, tone?, unread?, starred?, onClick?, onStar?}]`.
