Ô nhập có nhãn, chú thích và lỗi cho các form nộp đơn, khiếu nại, đăng nhập.

- Bên dùng cung cấp: `label` (bắt buộc, luôn hiển thị), `value`/`onChange` hoặc `defaultValue`, tùy chọn `help`, `error`, `required`, `multiline`, `icon` (biểu tượng đầu ô, ví dụ `idCard`, `lock`), `onClear` (hiện nút xóa khi có nội dung), `type="password"` (tự có nút hiện/ẩn mật khẩu; tắt bằng `revealable={false}`), `showCount` cùng `maxLength`/`minLength` (bộ đếm "204 / tối thiểu 50 ký tự" và "204 / 2000").
- Kiểu ô điền: nền `surface-sunken`, viền `border`, cao 46px (một dòng); nhiều dòng cao theo nội dung, bo `radius-md`, placeholder `ink-subtle`. Khi focus: nền `surface`, viền 2px `focus-ring`. Biểu tượng đầu, nút xóa, nút mắt màu `ink-subtle`; nút xóa và nút mắt có vùng chạm 48px và `aria-label`.
- Lỗi: viền `danger`, nền `danger-tint`, dòng lỗi màu `danger` có biểu tượng cảnh báo; viết lỗi nói rõ cách sửa ("Vui lòng nhập mật khẩu.").
- Dấu * bắt buộc màu `court-red`.
- `disabled`: nền `border`, chữ, nhãn và biểu tượng `ink-subtle`, ẩn nút xóa. `readOnly`: nền `surface`, viền nét đứt `border-strong`, ẩn nút xóa. Xem bảng `StatesFields`.
