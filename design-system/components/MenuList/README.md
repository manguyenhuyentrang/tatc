Danh sách chức năng kiểu cài đặt, chia nhóm (phương án F): màn Hồ sơ, Cá nhân và các bảng chọn từ đáy.

- Bên dùng cung cấp: `groups` = mảng các nhóm, mỗi nhóm `[{icon?, illustration?, label, description?, count?, danger?, onClick?}]` (hoặc `items` cho một nhóm).
- Mỗi nhóm là một thẻ trắng, các nhóm cách nhau 10px. Dòng cao tối thiểu 52px: biểu tượng nét 22px `ink-muted`, tên 16/24, mô tả (nếu có) 12px `ink-subtle`, số đếm viên `brand-tint`, mũi tên phải. Đường kẻ giữa các dòng thụt vào 52px.
- `danger`: chữ và biểu tượng `danger`, không có mũi tên (dùng cho "Đăng xuất", đặt nhóm riêng cuối cùng).
- Bảng chọn từ đáy (`Dialog variant="sheet"`) dùng `illustration` thay cho `icon`: icon minh họa 32px trong vòng tròn trắng 44px viền `border` (cùng kiểu ô dịch vụ Trang chủ), dòng cao tối thiểu 64px, đường kẻ thụt vào 74px. Màn Hồ sơ, Cá nhân vẫn dùng biểu tượng nét. Duyệt ngày 30/10/2026.
