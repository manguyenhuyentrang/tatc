Danh mục gập/mở có mục chọn được, dùng cho màn "Chọn thủ tục".

- Mỗi nhóm là một thẻ riêng: nền `surface`, viền `border`, bóng `shadow-card`, bo `radius-lg`, các thẻ cách nhau `space-2`. Đầu nhóm cao 52px: tên 16/24 500 `ink`, số đếm ("3 thủ tục") 13px `ink-muted`, mũi tên xoay khi mở.
- Mục trong nhóm là nút radio cao `touch-min`: vòng 20px viền 1.5px `border-strong`; mục đang chọn vòng đặc `brand-800` (lõi trắng), nền `brand-tint`, chữ `brand-text` 500. Một lần chỉ chọn 1 mục trên toàn danh mục.
- Bên dùng cung cấp: `groups` = `[{key, title, meta?, items: [{key, label}]}]`, `value` (mục đang chọn), `onSelect`, tùy chọn `defaultOpen`/`open`, `onToggle`.
