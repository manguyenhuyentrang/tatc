Phần đầu trang chủ: nền đỏ (gradient `brand-950` → `brand-800`, viền dưới `court-gold`), thẻ tìm kiếm trắng đè lên mép dưới.

- Hàng trên: Quốc huy, tên cổng chữ hoa 14px 700 (`brand`, mặc định "Cổng dịch vụ tư pháp"), nút chuông nền `brand-700` có chấm `court-gold` khi `unread`.
- Lời chào `greeting` 20/26 700 màu `on-brand`. Dưới lời chào là nhãn vai trò `role` (viên cao 32px, nền `brand-900` viền `brand-700`) và `subtitle` (mức định danh, `on-brand-muted`).
- Tài khoản có nhiều vai trò: đặt `canSwitchRole` và `onRoleClick`. Nhãn vai trò thành nút có mũi tên xuống, bấm mở danh sách vai trò (bên dùng tự mở `SheetMenu`). Tài khoản chỉ 1 vai trò: bỏ `canSwitchRole`, nhãn là chữ tĩnh, không mũi tên.
- Bên dùng cung cấp: `greeting`, tùy chọn `brand`, `role`, `canSwitchRole`, `onRoleClick`, `subtitle`, `logoSrc`, `unread`, `onBell`, `searchPlaceholder`/`onSearch`.
- Thẻ tìm kiếm là nút mở màn tìm kiếm, không phải ô nhập trực tiếp. Nội dung ngay dưới cách thẻ tìm kiếm `space-4`.
- `onCalendar`: hiện nút Lịch (cùng kiểu nút chuông) bên trái nút chuông, mở màn Lịch. Dùng vì nút giữa `BottomNav` là "Nộp đơn" (chọn 30/10/2026).
- **Cập nhật 02/11/2026 (Trang chủ app TATC):** `brand={false}` bỏ hàng Quốc huy + "Cổng dịch vụ tư pháp"; lời chào 16/24 đậm lên cùng hàng với nút chuông. Không truyền `onCalendar` nên không có nút Lịch.
