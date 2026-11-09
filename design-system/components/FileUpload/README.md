Vùng thêm tài liệu kèm theo: khi chưa có tệp là khối nét đứt gộp ghi chú định dạng, nút tải lên và nút lấy từ kho dữ liệu; khi đã có tệp là danh sách `FileItem` cùng hàng tải thêm.

- Bên dùng cung cấp: `hint` (ghi chú định dạng), `onPick(files)`, tùy chọn `onLibrary` (mở hộp "Chọn tệp từ kho dữ liệu cá nhân"), `files`, `max` (mặc định 10), `accept`, `title`, `shortHint`, `uploadLabel`, `libraryLabel`.
- Chưa có tệp (phương án B, chọn ngày 30/10/2026): viền nét đứt 1.5px `border-strong`, vòng biểu tượng `brand-tint` + `icon-accent`, ghi chú `caption` màu `ink-subtle`, nút `primary` "Tải lên tài liệu bổ sung", nút `ghost` "Lấy từ kho dữ liệu cá nhân".
- Đã có tệp: dòng đếm "n / 10 tệp", danh sách `FileItem`, hàng tải thêm có nút + nền `brand-800`. Đủ `max` tệp: hàng tải thêm khóa, ghi "tối đa 10 tệp".
- Chữ dung lượng tệp, chữ đang tải và câu lỗi tệp quá lớn hệ thống chưa có: preview để trong ngoặc vuông, chờ cung cấp.
- `error`: khối nét đứt viền `danger`, nền `danger-tint`, dòng lỗi `danger` có biểu tượng cảnh báo ở cuối. `disabled`: nền `surface-sunken`, viền `border`, nút tải lên và nút kho dữ liệu khóa; khi đã có tệp thì hàng tải thêm khóa như lúc đủ `max`.
