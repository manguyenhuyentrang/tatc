Lịch tháng (ghép phương án B và C): nút chuyển Tháng / Tuần / Danh sách.

- Thẻ trắng; đầu thẻ là tháng 16/22 700 và 2 nút chuyển tháng. `mode="month"`: lưới 7 cột, ô 42px; `mode="week"`: dải 7 ô 52px nền `surface-sunken`; `mode="list"`: chỉ đầu thẻ và nút chuyển, danh sách `EventCard` đặt bên dưới.
- Ngày chọn: tròn đặc `brand-800` (tuần: cả ô đỏ, chấm vàng); hôm nay: viền 1.5px `brand-800`; ngày có lịch: chấm 5px `brand-800`; Chủ nhật chữ `brand-text`. Chân thẻ: chú thích chấm và liên kết "Hôm nay".
- Bên dùng cung cấp: `monthLabel`, `mode`, `onModeChange`, `offset` (số ô trống đầu tháng), `days`, `week` (7 ngày), `selected`, `today`, `eventDays`, `onSelect`, `onPrev`, `onNext`, `onToday`; `modes={false}` để ẩn nút chuyển (Lịch cá nhân).
