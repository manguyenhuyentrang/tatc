Ô chọn dạng nút mở danh sách (bottom sheet hoặc danh sách xổ xuống), có mũi tên xuống.

- Bên dùng cung cấp: `placeholder` hoặc `value`, tùy chọn `required`, `icon` (ví dụ `calendar` cho khoảng ngày), `onClick` (mở `SheetMenu`, bộ chọn ngày hoặc danh sách), `label`.
- `labelVisible`: hiện `label` phía trên như `TextField` (dùng trong form nhiều trường). `onClear`: hiện nút bỏ chọn khi đã có giá trị. `open` + `options` + `onSelect`: danh sách xổ xuống ngay dưới ô, mục đang chọn chữ `brand-text` có dấu tích.
- Cùng kiểu ô điền với `TextField`: nền `surface-sunken`, viền `border`, cao 46px, bo `radius-md`; mũi tên và placeholder `ink-subtle`, biểu tượng đầu `icon-accent`. Khi mở: nền `surface`, viền 2px `focus-ring`.
- `error`: viền `danger`, nền `danger-tint`, dòng lỗi dưới ô (khi `labelVisible`). `disabled`: nền `border`, chữ và biểu tượng `ink-subtle`, ẩn nút bỏ chọn, không mở danh sách. Nhấn: nền `border`.
