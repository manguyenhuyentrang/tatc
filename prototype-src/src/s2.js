/* Phần 2: Hồ sơ, Hộp thư tống đạt */
var REC_STATS = { title: 'Tổng quan hồ sơ', stats: [{ value: '06', label: 'Đơn đã nộp' }, { value: '02', label: 'Vụ án tham gia' }, { value: '01', label: 'Vụ việc tham gia' }] };
var REC_MENU = [[
  { icon: 'file', label: 'Danh sách đơn và tiến trình', description: 'Đơn khởi kiện, yêu cầu và các đơn khác' /* v274 */, count: '06' },
  { icon: 'message', label: 'Hòa giải, đối thoại', description: 'Vụ việc đang hòa giải trước khi thụ lý' },
  { icon: 'upload', label: 'Giao nộp tài liệu, chứng cứ', description: 'Giao nộp bổ sung tài liệu, chứng cứ' },
  { icon: 'shield', label: 'Đăng ký người bảo vệ', description: 'Người bảo vệ quyền và lợi ích hợp pháp của đương sự' }], [ /* v186: chọn C – sau Giao nộp */
  { icon: 'scale', label: 'Vụ án, vụ việc của tôi', description: 'Dân sự, hôn nhân và gia đình, kinh doanh thương mại...', count: '02' }, /* v275 */
  { icon: 'briefcase', label: 'Vụ việc phục hồi phá sản' /* v276 */, description: 'Phục hồi, phá sản doanh nghiệp, hợp tác xã', count: '01' },
  { icon: 'wallet', label: 'Nghĩa vụ tài chính', description: 'Tạm ứng án phí, lệ phí, chi phí tố tụng' /* v277 */ }]];
/* 03/11/2026: bỏ khối "Tổng quan hồ sơ" (số lượng hồ sơ); số đếm vẫn ở từng dòng chức năng */
/* 03/11/2026 (v138): mỗi chức năng 1 dòng, biểu tượng nét thay bằng ô minh họa tròn (như ô Dịch vụ trực tuyến ở Trang chủ); giữ 2 nhóm, mô tả, số hồ sơ, mũi tên */
/* v278 (chọn C, mục 5 cách 3, mục 6 = banAn): mỗi mục một biểu tượng riêng, sát nghĩa; khóa theo tên mới (v275, v276) */
var REC_ILLO = { 'Danh sách đơn và tiến trình': 'traCuuHoSo', 'Hòa giải, đối thoại': 'hoaGiai', 'Giao nộp tài liệu, chứng cứ': 'chungCu', 'Đăng ký người bảo vệ': 'nguoiBaoVe', 'Vụ án, vụ việc của tôi': 'canCongLy', 'Vụ việc phục hồi phá sản': 'banAn', 'Nghĩa vụ tài chính': 'taiChinh' };
var REC_MENU_IL = REC_MENU.map(function (g) { return g.map(function (x) { return Object.assign({}, x, { illustration: REC_ILLO[x.label], count: null }); }); }); /* v139: bỏ số lượng hồ sơ; v140: mỗi chức năng 1 thẻ riêng, bỏ mũi tên > */
/* 03/11/2026 (v144, phương án A): lưới 2 cột × 3 hàng, thẻ cao – ô minh họa 56px trên, tên 16/22, mô tả tối đa 3 dòng; thẻ giãn lấp màn */
function RecordsScr(p) {
  /* v196 (chọn A · Danh sách dòng); v202: dòng "Danh sách đơn và tiến trình" mở rộng để chọn loại đơn (tên + số đơn), chọn loại → danh sách đơn của loại đó */
  var mo = React.useState(false);
  return Main('records', 'Theo dõi vụ án, vụ việc', h('div', { className: 'rn-groups' }, REC_MENU.map(function (g, i) {
    return h('div', { key: i, className: 'rn-list', role: 'group', 'aria-label': i ? 'Vụ án, vụ việc và nghĩa vụ' : 'Đơn và thủ tục' }, g.map(function (x, j) {
      var ex = i === 0 && j === 0;
      var row = h('button', { key: x.label, type: 'button', className: 'rn-row' + (ex ? ' rn-row-ex' : ''), 'aria-expanded': ex ? mo[0] : undefined, onClick: ex ? function () { mo[1](!mo[0]); } : undefined },
        h('span', { className: 'tp-illo-circle rn-row-ic' }, h(T.Illustration, { name: REC_ILLO[x.label] })),
        h('span', { className: 'rn-row-tx' }, h('b', null, x.label), h('small', null, x.description)), h(T.Icon, { name: ex ? 'chevronDown' : 'chevronRight', className: ex && mo[0] ? 'rn-xoay' : '' }));
      if (!ex) return row;
      return h(F, { key: x.label }, row, mo[0] ? h('ul', { className: 'rn-sub', role: 'list', 'aria-label': 'Chọn loại đơn' }, QD_KIND.map(function (k) {
        return h('li', { key: k[0] }, h('button', { type: 'button', className: 'rn-sub-it', 'data-pt-go': 'appK_' + k[0] }, h('span', null, k[1]), h('span', { className: 'qk-cnt tp-num' }, qdDem(k[0]))));
      })) : null);
    }));
  })));
}
function Records(variant) { return h(RecordsScr, { variant: variant }); }

function Search(ph, count) { return h(T.SearchToolbar, { placeholder: ph, count: count, sortLabel: 'Mới nhất' }); }
var APPS = [
  { kind: 'Đơn khởi kiện', code: 'DS-2026-0021', codeLabel: 'Mã hồ sơ', status: 'Chờ ký số', statusTone: 'warning', title: 'Tranh chấp hợp đồng mua bán', meta: ['Hoàng Dương · Công ty An Phú'], note: ['pen', 'Thực hiện ký số trước khi gửi đơn'], date: 'Tiếp nhận: 22/10/2026' },
  { kind: 'Đơn khởi kiện', code: 'TN-20261020-0012', codeLabel: 'Mã hồ sơ', status: 'Đã gửi đơn', statusTone: 'info', title: 'Tranh chấp hợp đồng vay tài sản', meta: ['Hoàng Dương · Trần Văn Bình'], note: ['clock', 'Yêu cầu bổ sung tài liệu · Hạn bổ sung: 26/10/2026'], date: 'Tiếp nhận: 20/10/2026' }];
function Note(n) { return h('p', { className: 'tp-hs-note' + (n[2] ? '' : ' tp-hs-note-warning') }, h(T.Icon, { name: n[0] }), n[1]); }
function Cards(list) { return list.map(function (r, i) { return h(T.RecordCard, Object.assign({ key: i, court: COURT1, onClick: noop }, r), r.note ? Note(r.note) : null); }); }
function Applications(sv) {
  return Sub('Danh sách đơn và tiến trình', h(F, null,
    h(T.Tabs, { label: 'Loại đơn', items: [{ key: 'a', label: 'Đơn khởi kiện', count: 2 }, { key: 'b', label: 'Đơn yêu cầu việc dân sự', count: 1 }, { key: 'c', label: 'Đơn yêu cầu phá sản, phục hồi', count: 1 }, { key: 'd', label: 'Đơn phản tố, yêu cầu độc lập', count: 1 }] }),
    Filt(Search('Tìm số tiếp nhận, mã vụ án…', '2 đơn', sv)), Cards(APPS)), null, [{ icon: 'plus', label: 'Nộp đơn mới' }]);
}
function Timeline(cur, curSub, prev, prevSub) { return h(T.Timeline, { steps: [{ title: cur, date: curSub, state: 'current' }, { title: prev, date: prevSub, state: 'done' }] }); }
/* Chi tiết đơn (03/11/2026): thiết kế lại theo web – xem DonChiTiet */
function AppDetail() { return h(DonChiTiet); }
var MEDI = [
  { code: 'HG-2026-0018', status: 'Đang hòa giải', statusTone: 'warning', title: 'Tranh chấp quyền sử dụng đất', meta: ['Hoàng Dương · Lê Văn Hòa'], note: ['calendar', 'Lịch hòa giải: 26/10/2026 · 08:30', 'info'], date: 'Tiếp nhận: 18/10/2026' },
  { code: 'HG-2026-0009', status: 'Hòa giải thành', statusTone: 'success', title: 'Tranh chấp hợp đồng dân sự', meta: ['Hoàng Dương · Phạm Minh Đức'], date: 'Tiếp nhận: 09/10/2026' }];
function Mediation() {
  return Sub('Hòa giải, đối thoại', h(F, null, Filt(h(T.Tabs, { variant: 'chip', label: 'Sắp xếp', items: [{ key: 'a', label: 'Mặc định' }, { key: 'b', label: 'Hạn gần nhất' }, { key: 'c', label: 'Mới nhất' }, { key: 'd', label: 'Mã hồ sơ' }] }), P('2 hồ sơ', 'ph-muted')), Cards(MEDI)));
}
function MediationDetail() {
  return Sub('Chi tiết hòa giải, đối thoại', h(F, null, Head('Đang hòa giải', 'warning', 'HG-2026-0018', 'Tranh chấp quyền sử dụng đất'),
    Sec(1, 'Thông tin chung', Rows([['Mã hồ sơ', 'HG-2026-0018', 1], ['Tòa án', COURT1], ['Trạng thái', 'Đã gửi đơn'], ['Tình trạng giải quyết', 'Đang hòa giải'], ['Tư cách tham gia tố tụng', 'Người khởi kiện'], ['Ngày tiếp nhận hoặc thụ lý', '18/10/2026', 1], ['Hạn thực hiện', 'Lịch hòa giải: 26/10/2026 · 08:30', 1]]), true),
    Sec(2, 'Tiến trình hồ sơ', Timeline('Đang hòa giải', 'Lịch hòa giải: 26/10/2026 · 08:30', 'Tiếp nhận hồ sơ', '18/10/2026 · ' + COURT1)),
    Sec(3, 'Chức năng liên quan', h(T.Button, { variant: 'secondary', block: true, icon: 'message' }, 'Chức năng hòa giải, đối thoại'), true)));
}
var EVI_STEPS = ['Hồ sơ', 'Tài liệu', 'Xem lại và ký số'];
/* Giao nộp tài liệu, chứng cứ (03/11/2026): khung Soạn đơn (header + thanh tiến trình, khối 100%); chọn hồ sơ bằng danh sách dòng; tài liệu dùng chung thẻ Tài liệu của bước 5 */
var EVI_HS = [{ id: 'a', code: 'DS-2026-0012', name: 'Tranh chấp hợp đồng vay tài sản', desc: 'Sơ thẩm · ' + COURT1 + ' · Thụ lý 15/10/2026' }, { id: 'b', code: 'DS-2026-0018', name: 'Tranh chấp hợp đồng mua bán tài sản', desc: 'Sơ thẩm · Tạm đình chỉ · ' + COURT1 + ' · Thụ lý 12/10/2026' }];
function EviChon() {
  var v = React.useState('a');
  return Wz({ title: 'Giao nộp tài liệu, chứng cứ', steps: EVI_STEPS, n: 1, save: false, go: 'evidence2', body: FCard('Hồ sơ, vụ án nhận tài liệu', h(F, null,
    P('Chỉ hiện hồ sơ còn trong giai đoạn được giao nộp chứng cứ.', 'ph-muted'),
    h('div', { className: 'fx-search' }, Tf('Tìm hồ sơ', { icon: 'search', placeholder: 'Tìm theo mã hồ sơ, tên vụ án, Tòa án' })), h('p', { className: 'dm-meta' }, EVI_HS.length + ' hồ sơ'),
    h('div', { className: 'ph-boxlist' }, h(LvRows, { label: 'Hồ sơ, vụ án nhận tài liệu', cur: v[0], items: EVI_HS, onPick: v[1] }))), true) });
}
function Evidence1() { return h(EviChon); }
function EviTL(p) {
  return Wz({ title: 'Giao nộp tài liệu, chứng cứ', steps: EVI_STEPS, n: 2, save: false, go: 'evidence3', body: h(F, null,
    FCard('Hồ sơ đã chọn', RvKV([['Mã vụ án', h('span', { className: 'tp-num' }, 'DS-2026-0012')], ['Tên vụ án', 'Tranh chấp hợp đồng vay tài sản']]), true),
    p.err ? h('div', { className: 'ph-err-box', role: 'alert' }, h(T.Icon, { name: 'alert' }), h('p', null, 'Vui lòng đính kèm tài liệu và cung cấp đầy đủ tên tài liệu, ngày giao nộp.')) : null,
    h(TaiLieuCard, { title: 'Tài liệu, chứng cứ', desc: 'Định dạng PDF, JPG, PNG, DOCX · tối đa 10MB/tệp.', bat: [], bb0: {}, bs0: [] })) });
}
function Evidence2(err) { return h(EviTL, { err: !!err }); }
var CASES = [
  { kind: 'Dân sự', caseNo: 'DS-2026-0012', codeLabel: 'Mã vụ án', status: 'Đang giải quyết', statusTone: 'info', title: 'Tranh chấp hợp đồng vay tài sản', meta: ['Nguyên đơn · Sơ thẩm'], note: ['calendar', 'Phiên tòa: 28/10/2026 · 14:00', 'info'], date: 'Thụ lý: 15/10/2026', cur: 2, starred: true },
  { kind: 'Dân sự', caseNo: 'DS-2026-0018', codeLabel: 'Mã vụ án', status: 'Tạm đình chỉ', statusTone: 'warning', title: 'Tranh chấp hợp đồng mua bán tài sản', meta: ['Bị đơn · Sơ thẩm'], date: 'Thụ lý: 12/10/2026', cur: 1 }];
var STAGES = ['Thụ lý', 'Chuẩn bị xét xử', 'Xét xử', 'Kết thúc'];
function Cases(sv) {
  return Sub('Vụ án của tôi', h(F, null,
    h(T.EventCard, { day: '28', month: 'T10', kind: 'Phiên tòa sắp diễn ra', title: 'Vụ án DS-2026-0012', lines: [{ icon: 'clock', text: '28/10/2026 · 14:00' }], actions: [{ label: 'Xem vụ án', primary: true }] }),
    Filt(Search('Tìm mã vụ án, tên vụ án, mã đơn…', '2 vụ án', sv)),
    CASES.map(function (c, i) { return h(T.CaseCard, Object.assign({ key: i, court: COURT1, onStar: noop, onClick: noop }, c), c.note ? Note(c.note) : null, h(T.CaseProgress, { steps: STAGES, current: c.cur })); })));
}
/* Chi tiết vụ án (03/11/2026): thiết kế lại theo web – xem VuAnChiTiet */
function CaseDetail() { return h(VuAnChiTiet); }
function Proceedings() {
  return Sub('Vụ việc của tôi', h(F, null, Filt(Search('Tìm mã vụ việc, doanh nghiệp, MST…', '1 hồ sơ')),
    Cards([{ kind: 'Phá sản', code: 'PS-2026-0001', codeLabel: 'Mã hồ sơ', status: 'Đang giải quyết', statusTone: 'info', title: 'Công ty TNHH Thương mại Minh Phát', meta: ['MST: 0100000123', 'Tư cách tham gia: Chủ nợ'], date: 'Tiếp nhận: 15/10/2026' }])));
}
/* v251 (04/11/2026): Thông tin vụ việc theo UI chi tiết đơn khởi kiện – thay ở v308 */
/* v308 (11/11/2026): Chi tiết vụ việc phục hồi phá sản theo khung Chi tiết vụ án (phần đầu: mã · loại, tên, trạng thái + vai trò, dải cấp xét xử; 8 tab cùng thứ tự).
   Dữ liệu mẫu theo thẻ PS-2026-0001; nội dung riêng của phục hồi, phá sản chưa có nguồn để trong [ngoặc vuông]. Không có nút "Tạo đơn liên quan" (chưa có danh mục đơn cho vụ việc phá sản). */
var PS_TABS = [{ key: 'info', label: 'Thông tin chung' }, { key: 'don', label: 'Đơn trong vụ việc' }, { key: 'stages', label: 'Các cấp xét xử' }, { key: 'hearings', label: 'Lịch phiên tòa' }, { key: 'docs', label: 'Văn bản tống đạt' }, { key: 'evidence', label: 'Tài liệu, chứng cứ' }, { key: 'judgments', label: 'Bản án / Quyết định' }, { key: 'process', label: 'Lịch sử vụ việc' }];
function ProceedingDetail() {
  var ten = 'Yêu cầu mở thủ tục phá sản Công ty TNHH Thương mại Minh Phát', soTL = h('span', { className: 'tp-num' }, '1/2026/TLST-PS');
  return h(DtScreen, { title: 'Chi tiết vụ việc', tabLabel: 'Nội dung chi tiết vụ việc', tabs: PS_TABS, pre: null, headCls: 'dt-head-don',
    meta: h(F, null, h('span', { className: 'tp-num' }, 'PS-2026-0001'), ' · Phá sản'), name: ten,
    badges: h(F, null, h(T.StatusBadge, { tone: 'info', icon: false }, 'Đang giải quyết'), h('span', { className: 'dt-role' }, 'Tư cách của bạn: ', h('b', null, 'Chủ nợ'))),
    headExtra: h(T.CaseProgress, { label: 'Cấp xét xử', steps: ['Thụ lý', 'Sơ thẩm', 'Phúc thẩm'], current: 1 }),
    render: function (t) {
      if (t === 'info') return h(F, null,
        FCard('Các bên trong vụ việc', h(F, null, h('p', { className: 'dm-meta' }, '1 chủ nợ · 1 tổ chức, doanh nghiệp bị yêu cầu'),
          h(DtParty, { tat: 'CN', ten: 'Hoàng Dương', ban: true, vt: 'Chủ nợ', rows: [['Số CCCD', h('span', { className: 'tp-num' }, '001090012345')], ['Người đại diện / ủy quyền', '—'], ['Địa chỉ', 'Số 8 Phạm Hùng, Phường Từ Liêm, Thành phố Hà Nội']] }),
          h(DtParty, { tat: 'DN', ten: 'Công ty TNHH Thương mại Minh Phát', vt: 'Tổ chức, doanh nghiệp bị yêu cầu', rows: [['Mã số thuế', h('span', { className: 'tp-num' }, '0100000123')], ['Người đại diện theo pháp luật', '—'], ['Địa chỉ', '—']] }),
          h('p', { className: 'dt-note' }, h(T.Icon, { name: 'lock' }), 'Một số thông tin của đương sự khác được ẩn nhằm bảo vệ dữ liệu cá nhân.')), true),
        FCard('Tòa án & hội đồng xét xử', RvKV([['Tòa án đang giải quyết', COURT1], ['Thẩm phán / HĐXX', '—'], ['Cấp xét xử hiện tại', 'Sơ thẩm'], ['Số thụ lý giai đoạn hiện tại', soTL], ['Ngày thụ lý giai đoạn hiện tại', '15/10/2026']]), true),
        FCard('Định danh & tình trạng vụ việc', RvKV([['Mã định danh', h('span', { className: 'tp-num' }, 'PS-2026-0001')], ['Loại vụ việc', 'Phá sản'], ['Trạng thái vụ việc', 'Đang giải quyết'], ['Tình trạng', 'Đã mở thủ tục phá sản'], ['Tên vụ việc', ten]]), true),
        FCard('Nghĩa vụ tài chính', h('button', { type: 'button', className: 'vk-link', 'data-pt-go': 'finance' }, 'Xem nghĩa vụ tài chính', h(T.Icon, { name: 'chevronRight' })), true),
        FCard('Đơn gốc của bạn', h('button', { type: 'button', className: 'dt-link-row', 'data-pt-go': 'appK_phasan' }, h('span', null, h('b', null, 'Đơn yêu cầu mở thủ tục phá sản'), h('small', { className: 'tp-num' }, 'TN-20261008-0004')), h('span', { className: 'dt-link-t' }, 'Xem đơn', h(T.Icon, { name: 'chevronRight' }))), true));
      if (t === 'don') return FCard('Đơn trong vụ việc', h('ul', { className: 'qd-list dt-qc' },
        DonThe2({ loai: 'Đơn yêu cầu mở thủ tục phá sản', t: 'Yêu cầu mở thủ tục phá sản', tt: ['Đã thụ lý', 'success'], go: 'appK_phasan', rows: [['Loại đơn', 'Đơn yêu cầu mở thủ tục phá sản'], ['Mã tiếp nhận', h('span', { className: 'tp-num' }, 'TN-20261008-0004')], ['Ngày gửi', '08/10/2026']] })), true);
      if (t === 'stages') return h(F, null,
        FCard('Sơ thẩm · Đang giải quyết', RvKV([['Tòa án', COURT1], ['Số thụ lý', soTL], ['Ngày thụ lý', '15/10/2026'], ['Thẩm phán', '—'], ['Kết quả', '—']]), true),
        FCard('Phúc thẩm · Chưa phát sinh', P('Thông tin cấp phúc thẩm sẽ hiển thị khi vụ việc được thụ lý phúc thẩm.', 'ph-muted'), true));
      if (t === 'hearings') return FCard('Lịch phiên tòa', P('[Lịch phiên họp, hội nghị chủ nợ của vụ việc]', 'ph-muted'), true);
      if (t === 'docs') return FCard('Văn bản tống đạt từ Tòa án', VbCards([{ t: 'Quyết định mở thủ tục phá sản', so: '01/2026/QĐ-MTTPS', tg: '20/10/2026', moi: true }, { t: 'Thông báo thụ lý đơn yêu cầu mở thủ tục phá sản', so: '01/2026/TB-TLĐ', tg: '15/10/2026' }]), true);
      if (t === 'evidence') return FCard('Tài liệu, chứng cứ đã giao nộp · 2 tài liệu', h(F, null,
        h('p', { className: 'dt-grp-t' }, 'Nộp kèm đơn yêu cầu · 08/10/2026'), DtDocs([['Đơn yêu cầu mở thủ tục phá sản', 'Bản chính · Đã nộp lúc 08/10/2026 09:12'], ['Tài liệu chứng minh khoản nợ đến hạn', 'Bản sao có chứng thực · Đã nộp lúc 08/10/2026 09:12']], DOC_THE),
        h(T.Button, { variant: 'tint', icon: 'upload', className: 'ph-co-add', 'data-pt-go': 'evidence2' }, 'Giao nộp tài liệu, chứng cứ')), true);
      if (t === 'judgments') return FCard('Bản án / Quyết định', h(F, null,
        DtDocs([['Quyết định mở thủ tục phá sản', 'Ban hành ngày 20/10/2026 · ' + COURT1]], DOC_THE),
        h('button', { type: 'button', className: 'vk-link', 'data-pt-go': 'tl1' }, 'Yêu cầu cấp trích lục quyết định', h(T.Icon, { name: 'chevronRight' }))), true);
      return LsG1([['Quyết định mở thủ tục phá sản', '20/10/2026', 'Số 01/2026/QĐ-MTTPS'], ['Thông báo thụ lý đơn yêu cầu mở thủ tục phá sản', '15/10/2026', 'Số 01/2026/TB-TLĐ · ' + COURT1]]);
    } });
}
var FIN = { amountLabel: 'Còn phải nộp · 2 khoản', amount: '4.500.000 ₫', subs: [{ label: 'Quá hạn hoặc còn ≤ 3 ngày', value: '1 khoản' }, { label: 'Đã nộp · 1 khoản', value: '300.000 ₫' }] };
var FEES = [
  { kind: 'Chi phí tố tụng', status: 'Chưa nộp', amount: '1.500.000 ₫', title: 'Chi phí xem xét, thẩm định tại chỗ', code: 'TB-2026-0018', caseCode: 'DS-2026-0018', court: COURT1, deadline: '29/10/2026', remain: 'Còn 3 ngày', tone: 'warning' },
  { kind: 'Tạm ứng án phí sơ thẩm', status: 'Chưa nộp', amount: '3.000.000 ₫', title: 'Tạm ứng án phí vụ án dân sự', code: 'TB-2026-0012', caseCode: 'DS-2026-0012', court: COURT1, deadline: '30/10/2026', remain: 'Còn 4 ngày' }];
function Finance(variant) {
  return Sub('Nghĩa vụ tài chính', h(F, null, h(T.StatSummary, Object.assign({ variant: variant }, FIN)),
    h(T.Tabs, { label: 'Nhóm khoản', items: [{ key: 'a', label: 'Phải nộp', count: 2 }, { key: 'b', label: 'Đã nộp, được miễn', count: 2 }] }),
    Filt(Search('Mã thông báo, số văn bản, mã hồ sơ…', '2 khoản')),
    FEES.map(function (f, i) { return h(T.FinanceCard, Object.assign({ key: i }, f)); })));
}
function FinanceDetail() {
  return Sub('Chi tiết nghĩa vụ tài chính', h(F, null, h(T.FinanceCard, FEES[0]),
    Sec(1, 'Thông tin khoản phải nộp', h(F, null, Rows([['Loại khoản', 'Chi phí tố tụng'], ['Hồ sơ, vụ án', 'DS-2026-0018', 1], ['Tòa án', COURT1], ['Trạng thái', 'Chưa nộp'], ['Hạn nộp', '29/10/2026', 1]]),
      h(T.Notice, { icon: 'clock' }, 'Còn 3 ngày. Kiểm tra thông tin trong thông báo nộp tiền của Tòa án.')), true)));
}

/* ---------- Hộp thư tống đạt ---------- */
/* Hộp thư tống đạt – sửa theo ảnh mẫu (02/11/2026): tab sát mép, ô tìm + nút Lọc + nút đổi kiểu xem, dòng "20 văn bản" + Mới nhất; mỗi dòng thư: biểu tượng văn bản theo loại, thời gian (chấm đỏ nếu chưa đọc), Tòa án, tên văn bản (đậm nếu chưa đọc), hạn xử lý + nhãn còn hạn; nút Đánh dấu và Lưu trữ bên phải */
var MAIL = [
  { from: COURT1, time: '28-10-2026 08:15', title: 'Biên bản phiên họp kiểm tra việc giao nộp tài liệu, chứng cứ', deadline: '03-11-2026', remain: 'Còn 1 ngày', tone: 'warning', ic: 'g' },
  { from: 'Tòa án nhân dân khu vực 2 - Hà Nội', time: '28-10-2026 07:30', title: 'Thông báo về phiên họp hòa giải', deadline: '28-10-2026', remain: 'Đã quá hạn', tone: 'danger', unread: true, starred: true, ic: 'o' },
  { from: 'Tòa án nhân dân thành phố Hà Nội', time: '27-10-2026 16:20', title: 'Giấy xác nhận đã nhận tài liệu, chứng cứ', ic: 'n' },
  { from: COURT1, time: '27-10-2026 14:05', title: 'Quyết định đưa vụ án ra xét xử', deadline: '05-11-2026', remain: 'Còn 6 ngày', tone: 'success', starred: true, ic: 'r' },
  { from: 'Tòa án nhân dân khu vực 2 - Hà Nội', time: '26-10-2026 10:45', title: 'Giấy mời tham gia phiên họp đối thoại', deadline: '30-10-2026', remain: 'Hạn hôm nay', tone: 'warning', ic: 'n' },
  { from: 'Tòa án nhân dân thành phố Hà Nội', time: '26-10-2026 09:10', title: 'Thông báo kết quả xử lý đơn yêu cầu', ic: 'o' },
  { from: COURT1, time: '25-10-2026 15:30', title: 'Bản án hành chính sơ thẩm', deadline: '02-11-2026', remain: 'Còn 3 ngày', tone: 'warning', ic: 'r' },
  { from: 'Tòa án nhân dân khu vực 2 - Hà Nội', time: '24-10-2026 11:20', title: 'Biên bản giao nhận văn bản tố tụng', ic: 'g' },
  { from: 'Tòa án nhân dân thành phố Hà Nội', time: '23-10-2026 16:40', title: 'Quyết định tạm đình chỉ giải quyết vụ án', deadline: '27-10-2026', remain: 'Đã quá hạn', tone: 'danger', ic: 'r' },
  { from: COURT1, time: '22-10-2026 14:30', title: 'Thông báo nộp tiền tạm ứng án phí', deadline: '30-10-2026', remain: 'Hạn hôm nay', tone: 'warning', ic: 'o' }];
function MailRow(p) {
  var m = p.m, st = React.useState(!!m.starred);
  return h('li', { className: 'ph-mail2-it' + (m.unread ? ' ph-mail2-unread' : '') },
    h('button', { type: 'button', className: 'ph-mail2-hit', 'aria-label': (m.unread ? 'Chưa đọc. ' : '') + m.title }),
    h('span', { className: 'ph-mail2-ic ph-mail2-ic-' + m.ic, 'aria-hidden': 'true' }, h(T.Icon, { name: 'file' })),
    h('div', { className: 'ph-mail2-main' },
      h('p', { className: 'ph-mail2-time' }, m.unread ? h('i', { className: 'ph-mail2-dot', 'aria-hidden': 'true' }) : null, m.time),
      h('p', { className: 'ph-mail2-from' }, m.from),
      h('p', { className: 'ph-mail2-title' }, m.title),
      m.deadline ? h('p', { className: 'ph-mail2-due' }, h(T.Icon, { name: 'clock' }), 'Hạn xử lý: ' + m.deadline, h(T.StatusBadge, { tone: m.tone || 'neutral', icon: false }, m.remain)) : null),
    h('div', { className: 'ph-mail2-act' },
      h('button', { type: 'button', className: 'ph-mail2-btn' + (st[0] ? ' ph-mail2-on' : ''), 'aria-pressed': st[0], 'aria-label': 'Đánh dấu quan trọng', onClick: function () { st[1](!st[0]); } }, h(T.Icon, { name: 'star' })),
      h('button', { type: 'button', className: 'ph-mail2-btn', 'aria-label': 'Lưu trữ' }, h(T.Icon, { name: 'archive' }))));
}
/* ===== 03/11/2026: Hộp thư tống đạt – hoàn thiện theo web /hop-thu (screens/hop-thu/index.tsx, khoi-theo-nhom.tsx). Dữ liệu mẫu, ngày tham chiếu 02-11-2026.
   Danh sách (phương án C đã chọn): thư mục Hộp thư / Quan trọng / Đã lưu trữ (số đếm như web: chưa đọc, quan trọng, lưu trữ); ô tìm + Lọc (bảng từ đáy: Theo hồ sơ, Nhãn văn bản, Tình trạng đọc,
   Khoảng thời gian, Tòa án) + Đổi kiểu xem; dòng số văn bản + Sắp xếp (bảng từ đáy, 3 cách như web); "Đang lọc: … — n văn bản" + Xóa lọc; thẻ văn bản; tự tải thêm 10 văn bản khi cuộn; trạng thái trống theo thư mục.
   Chi tiết: nhãn + số hiệu, Tải xuống / In / Quan trọng / Lưu trữ; đơn vị ban hành, người ký, mã đơn; trích yếu; khung xem văn bản; khối theo nhóm (10 kiểu như web) hoặc khối "Xem hồ sơ";
   tài liệu đính kèm; dải chữ ký số; ghi nhận lần mở đầu. ===== */
var KV2 = 'Tòa án nhân dân khu vực 2 - Hà Nội', TPHN = 'Tòa án nhân dân thành phố Hà Nội';
var IB_TODAY = new Date(2026, 10, 2);
/* nhãn văn bản (LOAI_VAN_BAN_NHOM_META – danh sách thật lấy từ API danh mục biểu mẫu) */
var IB_NHAN = [['THONG_BAO', 'Thông báo'], ['QUYET_DINH', 'Quyết định'], ['BAN_AN', 'Bản án'], ['BIEN_BAN', 'Biên bản'], ['GIAY_XAC_NHAN', 'Giấy xác nhận'], ['GIAYMOI_TT', 'Giấy mời, triệu tập'], ['DON_YEUCAU', 'Đơn, yêu cầu']];
var IB_NHAN_TEN = {}; IB_NHAN.forEach(function (x) { IB_NHAN_TEN[x[0]] = x[1]; });
/* 03/11/2026: bộ màu nhãn Trầm của design system – mã nhãn → số màu (token tag-N, tag-N-text, tag-N-bg) */
var IB_MAU = { THONG_BAO: 3, QUYET_DINH: 8, BAN_AN: 10, BIEN_BAN: 6, GIAY_XAC_NHAN: 5, GIAYMOI_TT: 9, DON_YEUCAU: 2, NH_HC: 7, NH_HG: 4, NH_DS: 13, KHONG_VAN_BAN: 15, CHUA_XAC_DINH: 11 };
function ibTag(nh) { return IB_MAU[nh] ? ' ib-tag tp-tag-' + IB_MAU[nh] : ''; }
var IB_HS = [['DS-2026-0018', 'Tranh chấp hợp đồng mua bán tài sản'], ['DS-2026-0012', 'Tranh chấp quyền sử dụng đất'], ['HG-2026-0018', 'Hòa giải tranh chấp hợp đồng thuê nhà'], ['HC-2026-0003', 'Khiếu kiện quyết định hành chính'], ['DS-2026-0021', 'Tranh chấp hợp đồng vay tài sản']];
var IB_TOA = [COURT1, KV2, TPHN];
/* mỗi văn bản: t tên, so số hiệu, nh nhãn, from, time, va mã hồ sơ, doc đã đọc, star, han (dd-mm-yyyy), nhom (khối theo nhóm), dk tệp đính kèm */
var IB = [
  { t: 'Biên bản phiên họp kiểm tra việc giao nộp tài liệu, chứng cứ', so: '07/2026/BB-TA', nh: 'BIEN_BAN', from: COURT1, time: '28-10-2026 08:15', va: 'DS-2026-0018', doc: false, han: '03-11-2026', nhom: 'bo-sung', dk: true },
  { t: 'Thông báo về phiên họp hòa giải', so: '12/2026/TB-HG', nh: 'THONG_BAO', from: KV2, time: '28-10-2026 07:30', va: 'HG-2026-0018', star: true, han: '01-11-2026', nhom: 'hoa-giai' },
  { t: 'Giấy xác nhận đã nhận tài liệu, chứng cứ', so: '31/2026/XN-TA', nh: 'GIAY_XAC_NHAN', from: TPHN, time: '27-10-2026 16:20', va: 'DS-2026-0012', doc: true },
  { t: 'Quyết định đưa vụ án ra xét xử', so: '15/2026/QĐXXST-DS', nh: 'QUYET_DINH', from: COURT1, time: '27-10-2026 14:05', va: 'DS-2026-0012', doc: false, star: true, han: '08-11-2026', nhom: 'lich-phien', dk: true },
  { t: 'Giấy mời tham gia phiên họp đối thoại', so: '08/2026/GM-HG', nh: 'GIAYMOI_TT', from: KV2, time: '26-10-2026 10:45', va: 'HG-2026-0018', doc: true, han: '04-11-2026', nhom: 'lich-phien-tt' },
  { t: 'Thông báo kết quả xử lý đơn yêu cầu', so: '19/2026/TB-TA', nh: 'THONG_BAO', from: TPHN, time: '26-10-2026 09:10', va: 'DS-2026-0021', doc: false },
  { t: 'Bản án hành chính sơ thẩm', so: '25/2026/HC-ST', nh: 'BAN_AN', from: COURT1, time: '25-10-2026 15:30', va: 'HC-2026-0003', doc: true, han: '04-11-2026', nhom: 'ban-an', dk: true },
  { t: 'Biên bản giao nhận văn bản tố tụng', so: '05/2026/BB-GN', nh: 'BIEN_BAN', from: KV2, time: '24-10-2026 11:20', va: 'DS-2026-0018', doc: true },
  { t: 'Quyết định áp dụng biện pháp khẩn cấp tạm thời', so: '03/2026/QĐ-BPKCTT', nh: 'QUYET_DINH', from: TPHN, time: '23-10-2026 16:40', va: 'DS-2026-0021', doc: true, nhom: 'bpkctt' },
  { t: 'Thông báo nộp tiền tạm ứng án phí', so: '21/2026/TB-TUAP', nh: 'THONG_BAO', from: COURT1, time: '22-10-2026 14:30', va: 'DS-2026-0018', han: '02-11-2026', nhom: 'nop-tien' },
  { t: 'Thông báo thụ lý vụ án', so: '120/2026/TB-TLVA', nh: 'THONG_BAO', from: COURT1, time: '20-10-2026 09:00', va: 'DS-2026-0021', doc: true, nhom: 'thu-ly' },
  { t: 'Thông báo về việc đề nghị cho ý kiến', so: '22/2026/TB-TA', nh: 'THONG_BAO', from: TPHN, time: '18-10-2026 15:10', va: 'DS-2026-0012', doc: true, han: '07-11-2026', nhom: 'ykien-phanhoi' },
  { t: 'Quyết định công nhận sự thỏa thuận của các đương sự', so: '05/2026/QĐST-DS', nh: 'QUYET_DINH', from: KV2, time: '15-10-2026 10:30', va: 'HG-2026-0018', doc: true, nhom: 'quyet-dinh' },
  { t: 'Thông báo kháng cáo', so: '09/2026/TB-KC', nh: 'THONG_BAO', from: TPHN, time: '12-10-2026 14:00', va: 'HC-2026-0003', doc: true, han: '10-11-2026', nhom: 'phan-hoi' },
  { t: 'Giấy triệu tập đương sự', so: '17/2026/GTT-TA', nh: 'GIAYMOI_TT', from: COURT1, time: '10-10-2026 08:40', va: 'DS-2026-0018', doc: true },
  { t: 'Đơn yêu cầu của đương sự khác', so: '04/2026/ĐYC', nh: 'DON_YEUCAU', from: KV2, time: '08-10-2026 16:15', va: 'HG-2026-0018', doc: true },
  { t: 'Biên bản lấy lời khai của đương sự', so: '11/2026/BB-LK', nh: 'BIEN_BAN', from: TPHN, time: '05-10-2026 09:30', va: 'DS-2026-0012', doc: true, dk: true },
  { t: 'Thông báo về việc chuyển hồ sơ vụ án', so: '14/2026/TB-CHS', nh: 'THONG_BAO', from: TPHN, time: '01-10-2026 10:00', va: 'DS-2026-0021', doc: true },
  { t: 'Quyết định phân công Thẩm phán giải quyết vụ án', so: '30/2026/QĐ-PC', nh: 'QUYET_DINH', from: COURT1, time: '28-09-2026 14:20', va: 'DS-2026-0018', doc: true },
  { t: 'Giấy xác nhận đã nhận đơn khởi kiện', so: '02/2026/XN-ĐKK', nh: 'GIAY_XAC_NHAN', from: COURT1, time: '25-09-2026 08:05', va: 'DS-2026-0018', doc: true }];
IB.forEach(function (m) { m.arch = false; m.can = !!(m.nhom && m.han); });
function ibNgay(s) { var p = s.split(' ')[0].split('-'); return new Date(+p[2], +p[1] - 1, +p[0]); }
function ibCon(m) { return m.han ? Math.round((ibNgay(m.han) - IB_TODAY) / 86400000) : null; }
function ibDem(m) { var c = ibCon(m); if (c == null) return null; return { text: c < 0 ? 'Đã quá hạn' : c === 0 ? 'Hạn hôm nay' : 'Còn ' + c + ' ngày', muc: c <= 1 ? 'qua' : c <= 3 ? 'sap' : 'an', con: c }; }
function ibChip(m) { return !m.doc ? ['Chưa đọc', 'danger'] : m.can ? ['Cần hành động', 'warning'] : ['Đã đọc', 'neutral']; }
var IB_KHOANG = [['all', 'Mọi thời gian', 'mọi thời gian'], ['7', '7 ngày gần nhất', '7 ngày gần nhất'], ['30', '30 ngày gần nhất', '30 ngày gần nhất'], ['90', '90 ngày gần nhất', '90 ngày gần nhất'], ['nam', 'Trong năm nay', 'năm nay'], ['custom', 'Khoảng tùy chọn…', 'khoảng tùy chọn']];
var IB_SAP = [['new', 'Ngày gửi mới nhất', 'Mới nhất'], ['old', 'Ngày gửi cũ nhất', 'Cũ nhất'], ['deadline', 'Thời hạn xử lý gần nhất', 'Hạn gần nhất']];
var IB_LOC0 = { hs: '', nhan: '', doc: 'all', khoang: 'all', tu: '', den: '', toa: 'all' };
var IB_UI = { folder: 'inbox', loc: IB_LOC0, sap: 'new' }; /* giữ bộ lọc khi mở chi tiết rồi quay lại */
function ibIso(s) { var p = s.split(' ')[0].split('-'); return p[2] + '-' + p[1] + '-' + p[0]; }
function ibLocDs(loc, q, folder) {
  var kq = khongDau(q.trim());
  return IB.filter(function (m) {
    if (folder === 'archive' ? !m.arch : m.arch) return false;
    if (folder === 'starred' && !m.star) return false;
    if (loc.hs && m.va !== loc.hs) return false;
    if (loc.nhan && m.nh !== loc.nhan) return false;
    if (loc.doc === 'unread' && m.doc) return false;
    if (loc.doc === 'read' && !m.doc) return false;
    if (loc.toa !== 'all' && m.from !== loc.toa) return false;
    var d = ibNgay(m.time);
    if (loc.khoang === 'nam' && d.getFullYear() !== IB_TODAY.getFullYear()) return false;
    if (/^\d+$/.test(loc.khoang) && (IB_TODAY - d) / 86400000 > +loc.khoang) return false;
    if (loc.khoang === 'custom') { var iso = ibIso(m.time); if (loc.tu && iso < loc.tu) return false; if (loc.den && iso > loc.den) return false; }
    if (kq && khongDau([m.t, m.so, m.from, m.va, IB_NHAN_TEN[m.nh]].join(' ')).indexOf(kq) < 0) return false;
    return true;
  });
}
function ibSapXep(ds, sap) {
  var k = function (m) { return ibNgay(m.time).getTime() + (+m.time.slice(11, 13)) * 3600000 + (+m.time.slice(14, 16)) * 60000; };
  return ds.slice().sort(function (a, b) {
    if (sap === 'old') return k(a) - k(b);
    if (sap === 'deadline') { var x = a.han ? ibNgay(a.han).getTime() : Infinity, y = b.han ? ibNgay(b.han).getTime() : Infinity; return x === y ? k(b) - k(a) : x - y; }
    return k(b) - k(a);
  });
}
function ibTomTat(loc) {
  var r = [];
  if (loc.khoang !== 'all') { if (loc.khoang === 'custom') { if (loc.tu || loc.den) r.push((loc.tu ? loc.tu.split('-').reverse().join('/') : '…') + ' – ' + (loc.den ? loc.den.split('-').reverse().join('/') : '…')); } else r.push(IB_KHOANG.filter(function (x) { return x[0] === loc.khoang; })[0][2]); }
  if (loc.toa !== 'all') r.push(loc.toa);
  if (loc.hs) r.push(loc.hs);
  if (loc.nhan) r.push(IB_NHAN_TEN[loc.nhan].toLowerCase());
  if (loc.doc && loc.doc !== 'all') r.push(loc.doc === 'unread' ? 'chưa đọc' : 'đã đọc'); /* v211 */
  return r;
}
/* ô chọn mở bảng chọn xếp chồng (dùng trong bảng Lọc) */
function IbPick(p) {
  var o = React.useState(false), cur = p.items.filter(function (x) { return x.id === p.v; })[0];
  return h(F, null, h(T.SelectField, { label: p.label, labelVisible: true, value: cur ? cur.name : undefined, placeholder: p.placeholder, open: o[0], onClick: function () { o[1](true); } }),
    o[0] ? h(LvSheet, { host: p.host, title: p.label, onClose: function () { o[1](false); } }, h(LvRows, { label: p.label, cur: p.v, items: p.items, onPick: function (id) { p.onPick(id); o[1](false); } })) : null);
}
/* 03/11/2026: tách 2 bảng từ đáy theo ảnh người dùng gửi – nút Lọc → "Bộ lọc hộp thư" (Hồ sơ, vụ án · Tòa án ban hành · Thời gian gửi; Nhập lại | Áp dụng);
   nút ô lưới → "Phân loại thư" (Trạng thái đọc, Nhãn văn bản: biểu tượng / chấm màu nhãn + tên + số đếm + nút tròn; dòng đang chọn nền đỏ nhạt, chữ đậm; Áp dụng) */
function IbLocSheet(p) {
  var l = React.useState(p.loc), v = l[0], set = function (k, x) { var n = Object.assign({}, v); n[k] = x; l[1](n); };
  return h(LvSheet, { host: p.host, title: 'Bộ lọc hộp thư', onClose: p.onClose,
    foot: h(F, null, h(T.Button, { variant: 'secondary', onClick: function () { l[1](Object.assign({}, v, { doc: 'all', hs: '', toa: 'all', khoang: 'all', tu: '', den: '' })); } }, 'Nhập lại'), h(T.Button, { onClick: function () { p.onApply(v); } }, 'Áp dụng')) },
    h('div', { className: 'ib-loc' },
      h('div', null, h('p', { className: 'sf-h' }, 'Trạng thái đọc'), h('div', { className: 'sf-grid', role: 'radiogroup', 'aria-label': 'Trạng thái đọc' }, [['all', 'Tất cả'], ['unread', 'Chưa đọc'], ['read', 'Đã đọc']].map(function (o) {
        var on = v.doc === o[0];
        return h('button', { key: o[0], type: 'button', role: 'radio', 'aria-checked': on, className: 'ib-chip2' + (on ? ' ib-chip2-on' : ''), onClick: function () { set('doc', o[0]); } }, o[1], o[0] === 'unread' && p.chuaDoc ? h('span', { className: 'ib-chip2-n tp-num' }, p.chuaDoc) : null);
      }))), /* v211: trạng thái đọc vào bộ lọc */
      h(IbPick, { host: p.host, label: 'Hồ sơ, vụ án', v: v.hs, onPick: function (x) { set('hs', x); }, items: [{ id: '', name: 'Tất cả' }].concat(IB_HS.map(function (x) { return { id: x[0], name: x[0] + ' · ' + x[1] }; })) }),
      h(IbPick, { host: p.host, label: 'Tòa án ban hành', v: v.toa, onPick: function (x) { set('toa', x); }, items: [{ id: 'all', name: 'Tất cả' }].concat(IB_TOA.map(function (x) { return { id: x, name: x }; })) }),
      h(IbPick, { host: p.host, label: 'Thời gian gửi', v: v.khoang, onPick: function (x) { set('khoang', x); }, items: IB_KHOANG.map(function (x) { return { id: x[0], name: x[1] }; }) }),
      v.khoang === 'custom' ? h('div', { className: 'ib-loc-2' },
        Tf('Từ ngày', { labelVisible: true, type: 'date', value: v.tu, max: v.den || undefined, onChange: function (e) { set('tu', e.target.value); } }),
        Tf('Đến ngày', { labelVisible: true, type: 'date', value: v.den, min: v.tu || undefined, onChange: function (e) { set('den', e.target.value); } })) : null));
}
var IB_NHAN_AZ = IB_NHAN.slice().sort(function (a, b) { return a[1].localeCompare(b[1], 'vi'); });
function IbPlRow(p) {
  return h('li', null, h('button', { type: 'button', role: 'radio', 'aria-checked': p.on, className: 'ib-pl-it' + (p.on ? ' ib-pl-on' : ''), onClick: p.onPick },
    p.dot ? h('i', { className: 'ib-pl-dot' + ibTag(p.dot), 'aria-hidden': 'true' }) : h(T.Icon, { name: p.icon }),
    h('span', { className: 'ib-pl-t' }, p.label), h('span', { className: 'ib-pl-n tp-num' }, p.n)));
  /* 03/11/2026 (v137): bỏ nút radio bên phải; dòng chọn nhận biết bằng nền đỏ nhạt + chữ đậm */
}
/* 03/11/2026 (v120): bảng Phân loại thư = nhóm Thư mục (Hộp thư / Quan trọng / Đã lưu trữ, có số đếm) + nhóm Nhãn văn bản; trạng thái đọc ra màn chính (chip) */
var IB_FD = [['inbox', 'Hộp thư', 'mail'], ['starred', 'Quan trọng', 'star'], ['archive', 'Đã lưu trữ', 'archive']];
function ibDemFd() { return { inbox: IB.filter(function (m) { return !m.arch && !m.doc; }).length, starred: IB.filter(function (m) { return !m.arch && m.star; }).length, archive: IB.filter(function (m) { return m.arch; }).length }; }
function IbPlSheet(p) {
  var l = React.useState(p.loc), v = l[0], set = function (k, x) { var n = Object.assign({}, v); n[k] = x; l[1](n); }, fd = React.useState(p.folder), dem = ibDemFd();
  var nenNh = ibLocDs(Object.assign({}, v, { nhan: '' }), '', fd[0]);
  return h(LvSheet, { host: p.host, title: 'Phân loại thư', onClose: p.onClose, foot: h(T.Button, { block: true, onClick: function () { p.onApply(v, fd[0]); } }, 'Áp dụng') },
    h('div', { className: 'ib-pl' },
      h('p', { className: 'ib-pl-h' }, 'Thư mục'),
      h('ul', { className: 'ib-pl-list', role: 'radiogroup', 'aria-label': 'Thư mục' }, IB_FD.map(function (x) {
        return h(IbPlRow, { key: x[0], on: fd[0] === x[0], label: x[1], icon: x[2], n: dem[x[0]], onPick: function () { fd[1](x[0]); } });
      })),
      h('p', { className: 'ib-pl-h ib-pl-h2' }, 'Nhãn văn bản'),
      h('ul', { className: 'ib-pl-list', role: 'radiogroup', 'aria-label': 'Nhãn văn bản' },
        [h(IbPlRow, { key: 'all', on: !v.nhan, label: 'Tất cả nhãn', icon: 'file', n: nenNh.length, onPick: function () { set('nhan', ''); } })].concat(IB_NHAN_AZ.map(function (x) {
          return h(IbPlRow, { key: x[0], on: v.nhan === x[0], label: x[1], dot: x[0], n: nenNh.filter(function (m) { return m.nh === x[0]; }).length, onPick: function () { set('nhan', x[0]); } });
        })))));
}
var IB_RONG = { inbox: ['Chưa có văn bản tống đạt', 'Các thông báo, quyết định, giấy triệu tập từ Tòa án sẽ được gửi vào đây.'], starred: ['Chưa có văn bản quan trọng', 'Đánh dấu ★ một văn bản để ghim vào đây.'], archive: ['Mục lưu trữ trống', 'Văn bản bạn lưu trữ sẽ được chuyển vào đây, không bị xóa khỏi hệ thống.'] };
/* v256 (05/11/2026, chọn A): nhấn giữ thẻ 0,5 giây để vào chế độ chọn – ô vuông (checkbox) đầu thẻ, thẻ đã chọn nền xám; trong chế độ chọn bấm thẻ để tick / bỏ tick */
/* v283 (09/11/2026, chọn D có sửa): thông tin vụ án trên thẻ thư – [tên vụ án, hoặc tên đơn nếu tống đạt cho đơn chưa thụ lý; vai trò; số thụ lý; ngày thụ lý] theo mã hồ sơ (dữ liệu mẫu) */
var IB_VA = { 'DS-2026-0012': ['Tranh chấp hợp đồng vay tài sản', 'Nguyên đơn', '12/2026/TLST-DS', '15/10/2026'], 'DS-2026-0018': ['Tranh chấp hợp đồng mua bán tài sản', 'Bị đơn', '18/2026/TLST-DS', '02/10/2026'],
  'DS-2026-0021': ['Đơn khởi kiện – Tranh chấp hợp đồng dịch vụ', 'Người khởi kiện', null, null], 'HC-2026-0003': ['Khiếu kiện quyết định hành chính về đất đai', 'Người khởi kiện', '03/2026/TLST-HC', '05/10/2026'], 'HG-2026-0018': ['Đơn khởi kiện – Tranh chấp quyền sử dụng đất', 'Người khởi kiện', null, null] };
function IbVaInfo(m) { var v = IB_VA[m.va]; if (!v) return h('small', null, m.from + ' · ' + m.time);
  /* v285: dòng trên bỏ vai trò; ô xám hiển thị liền, đủ thông tin: Số TL - Ngày - Tên vụ án - Vai trò; đơn chưa thụ lý: Tên đơn - Vai trò */
  return h(F, null, h('small', null, m.from + ' · Tống đạt ' + m.time.split(' ')[0]),
    h('p', { className: 'ib-va' }, v[2] ? h(F, null, 'Số TL ', h('span', { className: 'tp-num' }, v[2]), ' - ', h('span', { className: 'tp-num' }, v[3]), ' - ') : null, v[0], ' - ', h('b', null, v[1]))); }
function MailCard(p) {
  var m = p.m, dem = ibDem(m), chip = ibChip(m), arch = p.folder === 'archive', chon = p.sel !== undefined;
  var tm = React.useRef(null), held = React.useRef(false), xy = React.useRef(null);
  var huy = function () { clearTimeout(tm.current); };
  /* v315 (11/11/2026, chọn K1 sau 4 vòng đề xuất): thẻ nổi không viền, bóng nhẹ; chưa đọc = chấm đỏ trước tiêu đề + chữ đậm (bỏ nhãn 'Chưa đọc');
     tiêu đề 16/24 tối đa 2 dòng; dòng Tòa án · Tống đạt ngày; thông tin vụ án thành các hàng có biểu tượng (Số TL - Ngày TL · Vụ án/Đơn · Tư cách);
     Hạn xử lý là dòng chữ màu theo mức hạn dưới đường kẻ (bỏ dải nền) */
  var va = IB_VA[m.va];
  return h('li', { className: 'ib-c ibk' + (m.doc ? '' : ' ib-un') + (chon ? ' ib-chon' : '') + (p.sel ? ' ib-chon-on' : '') },
    h('button', { type: 'button', className: 'ph-mail2-hit', role: chon ? 'checkbox' : undefined, 'aria-checked': chon ? !!p.sel : undefined, 'aria-label': (chon ? 'Chọn: ' : (m.doc ? '' : 'Chưa đọc. ')) + m.t, 'data-pt-go': chon ? undefined : 'mailDetail',
      onPointerDown: function (e) { if (chon || !p.onHold) return; held.current = false; xy.current = [e.clientX, e.clientY]; tm.current = setTimeout(function () { held.current = true; p.onHold(m); }, 500); },
      onPointerMove: function (e) { if (xy.current && Math.abs(e.clientX - xy.current[0]) + Math.abs(e.clientY - xy.current[1]) > 10) huy(); },
      onPointerUp: huy, onPointerLeave: huy, onPointerCancel: huy, onContextMenu: function (e) { e.preventDefault(); },
      onClickCapture: function (e) {
        if (held.current) { held.current = false; e.preventDefault(); e.stopPropagation(); return; }
        if (chon) { e.preventDefault(); e.stopPropagation(); p.onTick(m); return; }
        window.__ibSel = IB.indexOf(m);
      } }),
    chon ? h('span', { className: 'ib-ck', 'aria-hidden': 'true' }, p.sel ? h(T.Icon, { name: 'check' }) : null) : null,
    h('div', { className: 'ib-c-h' }, m.doc ? null : h(T.StatusBadge, { tone: 'danger', icon: false, className: 'ib-dadoc' }, 'Chưa đọc') /* v317: nhãn 'Chưa đọc' trước nhãn loại (theo ảnh mẫu), bỏ chấm đỏ */, h('span', { className: 'vk-tag' + ibTag(m.nh) }, IB_NHAN_TEN[m.nh]), h('span', { className: 'vk-code tp-num' }, m.va),
      h('span', { className: 'ib-c-act' },
        h('button', { type: 'button', className: 'ph-mail2-btn' + (m.star ? ' ph-mail2-on' : ''), 'aria-pressed': !!m.star, 'aria-label': 'Đánh dấu quan trọng', onClick: function () { m.star = !m.star; p.onDoi(); } }, h(T.Icon, { name: 'star' })),
        h('button', { type: 'button', className: 'ph-mail2-btn' + (arch ? ' ph-mail2-on' : ''), 'aria-label': arch ? 'Bỏ lưu trữ' : 'Lưu trữ', 'data-pt-go': 'snack:' + (arch ? 'Đã đưa văn bản trở lại Hộp thư.' : 'Đã lưu trữ văn bản.'), onClickCapture: function () { m.arch = !arch; p.onDoi(); } }, h(T.Icon, { name: 'archive' })))),
    h('b', null, m.t),
    h('small', null, m.from + ' · Tống đạt ', h('span', { className: 'tp-num' }, m.time.split(' ')[0])),
    va ? h('ul', { className: 'ibk-rows' },
      va[2] ? h('li', null, h(T.Icon, { name: 'file' }), h('span', null, 'Số TL ', h('b', { className: 'tp-num' }, va[2]), ' - ', h('span', { className: 'tp-num' }, va[3]))) : null,
      h('li', null, h(T.Icon, { name: 'scale' }), h('span', null, va[0])),
      h('li', null, h(T.Icon, { name: 'user' }), h('b', null, va[1]))) : null,
    /* 03/11/2026 (v125): bỏ nhãn trạng thái (Chưa đọc / Cần hành động / Đã đọc) ở chân thẻ, thay bằng "Hạn xử lý"; văn bản không có hạn thì không có chân thẻ (chưa đọc vẫn có chấm đỏ + chữ đậm) */
    dem ? h('div', { className: 'ib-c-due ib-c-due2' }, h('span', { className: 'ib-c-hxl' }, h(T.Icon, { name: 'clock' }), 'Hạn xử lý: ', h('b', { className: 'ib-c-hxl-d' }, m.han)), h('span', { className: 'ib-due ib-due-' + dem.muc }, dem.text)) : null); /* v284: in đậm hạn xử lý */
}
/* 03/11/2026 (v136): trạng thái trống Hộp thư (không tìm thấy / thư mục trống) – ở giữa màn theo ảnh mẫu, màu theo design system */
function IbEmpty(p) {
  return h('div', { className: 'ib-empty', role: 'status' }, h('span', { className: 'ib-empty-ico', 'aria-hidden': 'true' }, h(T.Icon, { name: p.icon || 'mail' })),
    h('h2', null, p.title), p.text ? h('p', null, p.text) : null /* v313: không có câu phụ thì bỏ dòng trống */, p.action ? h(T.Button, { variant: 'secondary', size: 'sm', className: 'ib-empty-act', onClick: p.onAction }, p.action) : null);
}
function InboxScr() {
  var fd = React.useState(IB_UI.folder), lc = React.useState(IB_UI.loc), sx = React.useState(IB_UI.sap), q = React.useState(''), sh = React.useState(null), n = React.useState(10), tai = React.useState(false), rr = React.useState(0);
  var anchor = React.useRef(null), host = useHost(anchor), end = React.useRef(null);
  IB_UI.folder = fd[0]; IB_UI.loc = lc[0]; IB_UI.sap = sx[0];
  var ds = ibSapXep(ibLocDs(lc[0], q[0], fd[0]), sx[0]), hien = ds.slice(0, n[0]), tt = (fd[0] !== 'inbox' ? [IB_FD.filter(function (x) { return x[0] === fd[0]; })[0][1].toLowerCase()] : []).concat(ibTomTat(lc[0])), soLoc = [lc[0].doc !== 'all', !!lc[0].hs, lc[0].toa !== 'all', lc[0].khoang !== 'all'].filter(Boolean).length, locOn = soLoc > 0, plOn = fd[0] !== 'inbox' || !!lc[0].nhan;
  var nenDoc = ibLocDs(Object.assign({}, lc[0], { doc: 'all' }), q[0], fd[0]), chuaDoc = nenDoc.filter(function (m) { return !m.doc; }).length;
  var coLoc = tt.length > 0 || !!q[0].trim();
  React.useEffect(function () { n[1](10); }, [fd[0], lc[0], sx[0], q[0]]);
  React.useEffect(function () { /* tự tải thêm 10 văn bản khi cuộn tới cuối danh sách */
    var el = end.current; if (!el || n[0] >= ds.length || typeof IntersectionObserver === 'undefined') return;
    var ob = new IntersectionObserver(function (e) { if (e[0].isIntersecting && !tai[0]) { tai[1](true); setTimeout(function () { n[1](function (x) { return x + 10; }); tai[1](false); }, 700); } });
    ob.observe(el); return function () { ob.disconnect(); };
  }, [n[0], ds.length, tai[0]]);
  var doi = function () { rr[1](rr[0] + 1); };
  /* v256: chế độ chọn nhiều thư – chon[0] = danh sách thư đã tick (null = không ở chế độ chọn); bảng thao tác tự mở mỗi lần tick, đóng bảng vẫn ở chế độ chọn */
  var chon = React.useState(null);
  /* v257 (chọn H): bỏ bảng thao tác – chỉ còn "Đánh dấu đã đọc" trên thanh ghim đáy thay thanh điều hướng */
  var chonGiu = function (m) { chon[1]([m]); };
  var chonTick = function (m) { var c = chon[0] || [], i = c.indexOf(m), n2 = i >= 0 ? c.filter(function (x) { return x !== m; }) : c.concat([m]); if (!n2.length) { chon[1](null); return; } chon[1](n2); };
  var chonLam = function (f, msg) { var c = chon[0] || []; c.forEach(f); chon[1](null); doi(); if (window.__ptSnack) window.__ptSnack(msg.replace('{n}', c.length)); };
  var sapCur = IB_SAP.filter(function (x) { return x[0] === sx[0]; })[0];
  /* 03/11/2026 (v136): không có văn bản phù hợp – ở giữa màn: biểu tượng, tiêu đề, mô tả, nút Xóa bộ lọc (xóa từ khóa, bộ lọc, nhãn, trạng thái đọc; thư mục về Hộp thư) */
  var rong = coLoc ? ['Không có văn bản phù hợp', 'Vui lòng điều chỉnh bộ lọc hoặc từ khóa tìm kiếm.'] : IB_RONG[fd[0]];
  var xoaLoc = function () { q[1](''); lc[1](IB_LOC0); fd[1]('inbox'); };
  var ct = h(F, null, h('span', { ref: anchor, hidden: true }),
    /* 03/11/2026 (v121): ô tìm + hàng trạng thái đọc / Sắp xếp cố định khi cuộn */
    h('div', { className: 'ib-stick' },
    h('div', { className: 'ph-ibar' },
      h('div', { className: 'fx-search' }, Tf('Tìm văn bản', { icon: 'search', placeholder: 'Tìm số hiệu, loại, tòa án, hồ sơ…', value: q[0], onChange: function (e) { q[1](e.target.value); }, onClear: function () { q[1](''); } })),
      h('button', { type: 'button', className: 'ph-ibar-btn' + (plOn ? ' ib-loc-on' : ''), 'aria-label': plOn ? 'Phân loại thư (đang lọc)' : 'Phân loại thư', onClick: function () { sh[1]('pl'); } }, h(T.Icon, { name: 'grid' }))),
    /* 03/11/2026 (v121): bỏ dòng "Đang lọc: … — n văn bản" + Xóa lọc; điều kiện lọc báo bằng chấm đỏ trên nút Bộ lọc / Phân loại thư */
    /* 03/11/2026 (v120): thay dòng "20 văn bản" – trái: chip trạng thái đọc (phương án B), phải: Sắp xếp */
    /* v211 (04/11/2026): như Danh sách đơn – trái: Sắp xếp, phải: nút "Bộ lọc" (số điều kiện đang lọc); trạng thái đọc chuyển vào bảng Bộ lọc; nút Phân loại thư (nhãn văn bản) vẫn bên phải ô tìm */
    h('div', { className: 'ib-docrow st-row sf-row' },
      h('button', { type: 'button', className: 'ph-ibar-sort ib-sort2', 'aria-label': 'Sắp xếp: ' + sapCur[2], onClick: function () { sh[1]('sap'); } }, h(T.Icon, { name: 'sortDesc' }), sapCur[2]),
      h('span', { className: 'sf-sp' }),
      h('button', { type: 'button', className: 'sf-pill' + (locOn ? ' sf-on' : ''), 'aria-label': locOn ? 'Bộ lọc, đang lọc ' + soLoc + ' điều kiện' : 'Bộ lọc', onClick: function () { sh[1]('loc'); } }, h(T.Icon, { name: 'filter' }), 'Bộ lọc', locOn ? h('span', { className: 'sf-badge tp-num', 'aria-hidden': 'true' }, soLoc) : null))),
    ds.length ? h('ul', { className: 'ib-cardlist' }, hien.map(function (m) { return h(MailCard, { key: m.so, m: m, folder: fd[0], onDoi: doi, sel: chon[0] ? chon[0].indexOf(m) >= 0 : undefined, onHold: chonGiu, onTick: chonTick }); }),
      n[0] < ds.length ? h('li', { ref: end, className: 'ph-loadmore ib-more', role: 'status' }, h('span', { className: 'tp-spinner', 'aria-hidden': 'true' }), h('span', null, 'Đang tải thêm văn bản…'))
        : ds.length > 10 ? h('li', { className: 'ib-het' }, 'Đã hiển thị hết ' + ds.length + ' văn bản') : null)
      : h(IbEmpty, { title: rong[0], text: rong[1], action: coLoc ? 'Xóa bộ lọc' : null, onAction: xoaLoc }),
    sh[0] === 'pl' && host ? h(IbPlSheet, { host: host, loc: lc[0], folder: fd[0], onClose: function () { sh[1](null); }, onApply: function (v, f) { lc[1](v); fd[1](f); sh[1](null); } }) : null,
    sh[0] === 'loc' && host ? h(IbLocSheet, { host: host, loc: lc[0], folder: fd[0], chuaDoc: chuaDoc, onClose: function () { sh[1](null); }, onApply: function (v) { lc[1](v); sh[1](null); } }) : null,
    sh[0] === 'sap' && host ? h(LvSheet, { host: host, title: 'Sắp xếp', onClose: function () { sh[1](null); } }, h(LvRows, { label: 'Sắp xếp', cur: sx[0], items: IB_SAP.map(function (x) { return { id: x[0], name: x[1] }; }), onPick: function (id) { sx[1](id); sh[1](null); } })) : null);
  /* v257: cùng khung với Main (AppBar · Body · thanh đáy) để danh sách không bị dựng lại khi vào/ra chế độ chọn */
  return h(Phone, { cls: 'ph-main' }, h(T.AppBar, { variant: 'page', title: 'Hộp thư tống đạt' }), h(Body, { cls: 'tp-sheet' }, ct),
    chon[0] ? h('div', { className: 'ib-chon-bar', role: 'toolbar', 'aria-label': 'Thao tác với văn bản đã chọn' },
      h('button', { type: 'button', className: 'tp-icon-btn', 'aria-label': 'Bỏ chọn', onClick: function () { chon[1](null); } }, h(T.Icon, { name: 'x' })),
      h('b', { role: 'status' }, 'Đã chọn ' + chon[0].length + ' văn bản'),
      h(T.Button, { size: 'sm', icon: 'check', onClick: function () { chonLam(function (m) { m.doc = true; }, 'Đã đánh dấu đã đọc {n} văn bản.'); } }, 'Đánh dấu đã đọc')) : Nav('inbox'));
}
function Inbox() { return h(InboxScr); }

/* ----- Chi tiết văn bản: khối theo nhóm (CAU_HINH_NHOM của web) ----- */
var IB_NHOM = {
  'nop-tien': ['Khoản phải nộp', 'wallet'], 'bo-sung': ['Yêu cầu sửa đổi, bổ sung hồ sơ', 'filePlus'], 'lich-phien': ['Lịch phiên', 'calendar'], 'lich-phien-tt': ['Lịch phiên', 'calendar'],
  'ban-an': ['Bản án, quyết định', 'scale'], 'phan-hoi': ['Yêu cầu trả lời', 'message'], 'thu-ly': ['Thông báo thụ lý', 'file'], 'hoa-giai': ['Hòa giải, đối thoại', 'swap'],
  bpkctt: ['Biện pháp khẩn cấp tạm thời', 'shield'], 'ykien-phanhoi': ['Ý kiến, phản hồi', 'message'], 'quyet-dinh': ['Quyết định', 'checkCircle'] };
/* facts, phòng họp, nút hành động [nhãn, đích] (nhãn nút trên web lấy từ trường `ten` của BE – ở đây là dữ liệu mẫu) */
var IB_KHOI = {
  'nop-tien': { f: [['Loại khoản', 'Tạm ứng án phí sơ thẩm'], ['Số tiền', '300.000 đồng'], ['Mã thông báo nộp tiền', 'TB-2026-001234', 1], ['Tình trạng', 'Chưa nộp']], b: [['Nộp tạm ứng án phí', 'financeDetail']] },
  'bo-sung': { f: [['Nội dung yêu cầu', 'Thiếu hoặc sai thông tin Người khởi kiện'], ['Hạn bổ sung', '03/11/2026']], b: [['Sửa đổi, bổ sung đơn khởi kiện', 'sub1'], ['Bổ sung tài liệu, chứng cứ', 'evidence1']] },
  'lich-phien': { f: [['Loại phiên', 'Phiên tòa'], ['Thời gian', '10/11/2026 · 08:00'], ['Hình thức', 'Trực tiếp và trực tuyến'], ['Địa điểm', 'Phòng xử án số 1, ' + COURT1]], ph: [['Đường dẫn', 'https://phonghop.toaan.gov.vn/p/ds20260012'], ['Mã phòng', '4815 2026', 1], ['Mật khẩu', 'TA2026', 1]], b: [['Xác nhận tham dự', 'sh:attendance'], ['Xem lịch phiên tòa', 'calMonth']] },
  'lich-phien-tt': { f: [['Loại phiên', 'Phiên đối thoại'], ['Thời gian', '06/11/2026 · 14:00'], ['Hình thức', 'Trực tuyến']], ph: [['Đường dẫn', 'https://phonghop.toaan.gov.vn/p/hg20260018'], ['Mã phòng', '2207 1846', 1], ['Mật khẩu', 'HG0018', 1]], b: [['Xác nhận tham dự', 'sh:attendance'], ['Xem lịch phiên họp', 'calMonth']] },
  'ban-an': { f: [['Số bản án', '25/2026/HC-ST', 1], ['Ngày tuyên án', '25/10/2026']], b: [['Nộp đơn kháng cáo', ''], ['Yêu cầu cấp trích lục / bản sao', 'tl1']] },
  'phan-hoi': { f: [['Việc có thể làm', 'Nộp văn bản ý kiến về kháng cáo']], b: [['Nộp ý kiến về kháng cáo', '']] },
  'thu-ly': { f: [['Số thụ lý', '120/2026/TLST-DS', 1], ['Ngày thụ lý', '20/10/2026'], ['Vụ án', 'DS-2026-0021', 1], ['Tư cách của bạn', 'Người khởi kiện']], b: [['Xem vụ án', 'caseDetail']], vo: true },
  'hoa-giai': { f: [['Nội dung', 'Mời tham gia phiên hòa giải tranh chấp hợp đồng thuê nhà'], ['Thời gian', '05/11/2026 · 08:30'], ['Địa điểm', 'Phòng hòa giải số 2, ' + KV2]], b: [['Trả lời lựa chọn hòa giải', ''], ['Chọn hòa giải viên', '']] },
  bpkctt: { f: [['Nội dung', 'Áp dụng biện pháp phong tỏa tài khoản của bị đơn'], ['Tình trạng', 'Đang có hiệu lực']], b: [['Xem vụ án', 'caseDetail']], vo: true },
  'ykien-phanhoi': { f: [['Số thụ lý', '98/2026/TLST-DS', 1], ['Ngày thụ lý', '10/10/2026'], ['Vụ án', 'DS-2026-0012', 1], ['Tư cách của bạn', 'Người có quyền lợi, nghĩa vụ liên quan']], b: [['Gửi ý kiến, phản hồi', ''], ['Xem vụ án', 'caseDetail']] },
  'quyet-dinh': { f: [['Số quyết định', '05/2026/QĐST-DS', 1], ['Ngày ban hành', '15/10/2026'], ['Nội dung', 'Công nhận sự thỏa thuận của các đương sự'], ['Tình trạng', 'Có hiệu lực pháp luật']], b: [['Xem vụ án', 'caseDetail']], vo: true } };
function IbKhoi(m) {
  var cf = IB_NHOM[m.nhom], k = IB_KHOI[m.nhom], dem = ibDem(m), het = dem && dem.con < 0;
  return h('section', { className: 'ph-blk ib-khoi' },
    h('div', { className: 'ib-khoi-h' }, h('h3', null, cf[0])), /* v131: bỏ ô biểu tượng ở tiêu đề khối theo nhóm */
    Rows(k.f),
    k.ph ? h('div', { className: 'ib-phong' }, h('p', null, 'Phòng họp trực tuyến'), Rows(k.ph)) : null,
    dem ? h('p', { className: 'ib-han' + (het ? ' ib-han-qua' : '') }, h(T.Icon, { name: 'clock' }), 'Hạn: ' + m.han.split('-').join('/') + ' · ' + (het ? 'đã quá ' + (-dem.con) + ' ngày' : dem.con === 0 ? 'hết hạn hôm nay' : 'còn ' + dem.con + ' ngày'))
      : k.vo ? h('p', { className: 'ib-han' }, h(T.Icon, { name: 'clock' }), 'Hạn: Vô thời hạn') : null,
    het ? h('p', { className: 'ib-het-han' }, 'Đã hết hạn — công dân không thể thực hiện. Vui lòng liên hệ Tòa án để được hướng dẫn.') : null,
    h('div', { className: 'ib-khoi-b' }, k.b.map(function (b, i) {
      return h(T.Button, { key: b[0], block: true, variant: 'secondary', disabled: !!het, /* v132: mọi nút trong khối theo nhóm dùng nền trắng (secondary) */ 'data-pt-go': het ? undefined : b[1] || undefined }, b[0]);
    })));
}
/* 03/11/2026 (v129): thẻ tên tệp – biểu tượng tệp, tên (v133: bỏ dòng định dạng · dung lượng), nút Xem (màn xem tệp) + Tải xuống; thay khung xem trực tiếp văn bản */
/* tệp mẫu không mở được (bản số hóa lỗi) – để xem trạng thái lỗi */
var IB_LOI_TEP = { 'Danh-sach-tai-lieu.pdf': 1 };
function IbFile(name, meta) {
  return h('div', { className: 'ib-file' }, h('span', { className: 'ib-file-ic', 'aria-hidden': 'true' }, h(T.Icon, { name: 'file' })),
    h('span', { className: 'ib-file-t' }, h('b', { className: 'tp-num' }, name), meta ? h('small', null, meta) : null),
    h('button', { type: 'button', className: 'ib-file-b', 'aria-label': 'Xem ' + name, 'data-pt-go': IB_LOI_TEP[name] ? 'attachmentErr' : 'attachment', onClickCapture: function () { window.__ibFile = name; } }, h(T.Icon, { name: 'eye' })),
    h('button', { type: 'button', className: 'ib-file-b', 'aria-label': 'Tải xuống ' + name, 'data-pt-go': 'snack:Đã tải xuống ' + name + '.' }, h(T.Icon, { name: 'download' })));
}
function MailDetailScr() {
  var m = window.__ibSel >= 1000 ? IB_X[window.__ibSel - 1000] : IB[window.__ibSel || 0], rr = React.useState(0), /* v246: chỉ số từ 1000 = văn bản trong tab Văn bản tống đạt của chi tiết đơn */ moLan = { current: m.moLan || (m.moLan = m.doc ? '28/10/2026 · 09:02' : '02/11/2026 · 09:15') };
  React.useEffect(function () { m.doc = true; }, []); /* mở văn bản = ghi nhận đã đọc */
  var doi = function () { rr[1](rr[0] + 1); };
  return Sub('Văn bản tống đạt', h(F, null,
    /* 03/11/2026 (v127): gộp khối tiêu đề + khối đơn vị ban hành thành 1 (phương án A): nhãn + số hiệu + nút Quan trọng / Lưu trữ (biểu tượng, như C) → tên → Tòa án · người ký (không biểu tượng) → Đơn liên quan; bỏ Tải xuống, In; v128: bỏ trích yếu */
    h('section', { className: 'ph-blk ib-dh ib-dh2' },
      h('div', { className: 'ib-c-h' }, h('span', { className: 'vk-tag' + ibTag(m.nh) }, IB_NHAN_TEN[m.nh]), h('span', { className: 'ib-so tp-num' }, m.so),
        h('span', { className: 'ib-c-act' },
          h('button', { type: 'button', className: 'ph-mail2-btn' + (m.star ? ' ph-mail2-on' : ''), 'aria-pressed': !!m.star, 'aria-label': 'Đánh dấu quan trọng', onClick: function () { m.star = !m.star; doi(); } }, h(T.Icon, { name: 'star' })),
          h('button', { type: 'button', className: 'ph-mail2-btn' + (m.arch ? ' ph-mail2-on' : ''), 'aria-pressed': !!m.arch, 'aria-label': m.arch ? 'Bỏ lưu trữ' : 'Lưu trữ', 'data-pt-go': 'snack:' + (m.arch ? 'Đã đưa văn bản trở lại Hộp thư.' : 'Đã lưu trữ văn bản.'), onClickCapture: function () { m.arch = !m.arch; doi(); } }, h(T.Icon, { name: 'archive' })))),
      h('h1', null, m.t),
      h('p', { className: 'ib-from2' }, h('b', null, m.from), h('small', null, 'Người ký ', h('strong', null, 'Nguyễn Văn An'), ' (Thẩm phán) · ' + m.time.slice(0, 10).split('-').join('/'))),
      /* v129 (phương án B): Đơn / vụ án liên quan thành 1 dòng chữ dưới người ký */
      /* v130: mã hồ sơ dạng nút viên (cùng dáng nhãn còn/quá hạn), nền brand-tint, chữ brand-text */
      h('p', { className: 'ib-hsl' }, 'Hồ sơ:', h('button', { type: 'button', className: 'ib-hs-pill tp-num', 'aria-label': 'Mở đơn ĐKK-2026-000123', 'data-pt-go': 'appDetail' }, 'ĐKK-2026-000123'), h('button', { type: 'button', className: 'ib-hs-pill tp-num', 'aria-label': 'Mở vụ án ' + m.va, 'data-pt-go': 'caseDetail' }, m.va)),
      IbFile(m.so.replace(/\//g, '-') + '.pdf')),
    m.nhom ? IbKhoi(m) : h('section', { className: 'ph-blk ib-cta' }, h('p', null, 'Xem chi tiết hồ sơ liên quan đến văn bản này.'), h(T.Button, { block: true, variant: 'secondary', 'data-pt-go': 'appDetail' }, 'Xem hồ sơ')),
    m.dk ? Blk('Tài liệu đính kèm', h('div', { className: 'ib-files' }, IbFile('Phu-luc-01.pdf'), IbFile('Danh-sach-tai-lieu.pdf'))) : null));
  /* 03/11/2026 (v126): bỏ dải chữ ký số và dòng ghi nhận lần mở đầu */
}
function MailDetail() { return h(MailDetailScr); }

/* 03/11/2026 (v131): màn xem tệp PDF (nút Xem trên thẻ tên tệp) – tên tệp ở header, nút Tải xuống; trang PDF cuộn dọc + số trang.
   Không mở được bản số hóa: thông báo theo câu chữ của web + nút Tải xuống */
function PdfPage(n) {
  return h('div', { key: n, className: 'pdf-page' }, n === 1 ? h(F, null, h('p', { className: 'pdf-qh' }, 'TÒA ÁN NHÂN DÂN KHU VỰC 1 - HÀ NỘI'), h('p', { className: 'pdf-cq' }, 'CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM'), h('p', { className: 'pdf-tt' }, 'QUYẾT ĐỊNH'), h('i'), h('i'), h('i')) : null,
    h('i'), h('i'), h('i'), h('i'), h('i'), h('i'), h('i'), h('span', { className: 'pdf-no tp-num' }, n + ' / 2'));
}
function Attachment() {
  var name = window.__ibFile || '15-2026-QĐXXST-DS.pdf';
  return Sub(name, h('div', { className: 'pdf-view' }, PdfPage(1), PdfPage(2)), null, [{ icon: 'download', label: 'Tải xuống', onClick: noop }]);
}
function AttachmentErr() {
  var name = window.__ibFile || 'Danh-sach-tai-lieu.pdf';
  return Sub(name, h('div', { className: 'pdf-err' }, h(T.Icon, { name: 'file' }), h('p', null, 'Không mở được bản số hóa. Vui lòng thử tải xuống hoặc liên hệ Tòa án.'),
    h(T.Button, { variant: 'secondary', icon: 'download', 'data-pt-go': 'snack:Đã tải xuống ' + name + '.' }, 'Tải xuống')));
}

/* ===== 03/11/2026: Chi tiết đơn, Chi tiết vụ án, Giao nộp tài liệu, chứng cứ – thiết kế lại theo web (/quan-ly-don/:id – quan-ly-don/chi-tiet.tsx; /vu-an/:id – vu-an/chi-tiet.tsx; /giao-nop-chung-cu – giao-nop-chung-cu/index.tsx) và design system đã chốt (khối 100%, nhãn trái – giá trị phải, bảng từ đáy, Ký số như bước 7). Dữ liệu mẫu. ===== */
/* khung màn chi tiết: header trắng + dải đầu trang (mã, tiêu đề, nhãn trạng thái) + thanh tab cuộn ngang + nội dung theo tab */
function DtScreen(o) {
  var tab = React.useState(o.tab0 || o.tabs[0].key); /* v207: mở sẵn tab */
  return h(Phone, { cls: 'ph-hd' }, h(T.AppBar, { variant: 'plain', title: o.title, onBack: noop }),
    h(Body, { cls: 'ph-plain ph-steps dt-body' },
      h('section', { className: 'dt-head' + (o.headCls ? ' ' + o.headCls : '') }, h('p', { className: 'dt-meta' }, o.meta), h('h1', null, o.name), o.badges ? h('div', { className: 'dt-badges' }, o.badges) : null, o.headExtra || null),
      o.pre ? h('section', { className: 'dt-pre' }, o.pre) : null, /* v245: khối nhắc việc đặt trước thanh tab */
      h('div', { className: 'dt-tabs' }, h(T.Tabs, { label: o.tabLabel, value: tab[0], onChange: tab[1], items: o.tabs })),
      o.top || null,
      o.render(tab[0], tab[1])),
    o.foot ? o.foot(tab[0]) : null); /* v243: thanh nút ghim cuối màn theo tab */
}
/* dòng tài liệu / văn bản: tên đậm, dòng phụ, nút xem chỉ biểu tượng */
/* v244: o.tai = thêm nút tải về (biểu tượng) bên phải nút xem */
function DtDocs(list, o) { /* v249: o.the = mỗi tài liệu một thẻ riêng */
  return h('ul', { className: 'ph-ky dt-docs' + (o && o.the ? ' dt-docs-the' : '') }, list.map(function (d) {
    return h('li', { key: d[0] + (d[1] || '') }, h('div', null, h('b', null, d[0]), d[1] ? h('small', null, d[1]) : null), d[2] || null, IcoBtn('eye', 'Xem ' + d[0]),
      o && o.tai ? IcoBtn('download', 'Tải về ' + d[0], 'snack:Đã tải về ' + (d[1] || d[0]).split(' · ')[0]) : null);
  }));
}
/* hộp việc cần làm (vàng): biểu tượng + nội dung + hạn + nút */
/* v233 (04/11/2026): khối việc cần làm ở chi tiết – chọn B: banner đỏ nhạt thương hiệu (như dải "đơn cần bạn xử lý"), hình chuông bên trái, tiêu đề + mô tả, hạn dạng pill vàng đậm, các nút cùng hàng */
/* v245: khối nhắc việc gọn (chọn E1) – tiêu đề + hạn bên trái, 1 nút bên phải; nền vàng nhạt viền mảnh, không viền màu trái */
function DtTodoGon(o) {
  return h('section', { className: 'tdg', role: 'status' }, h('div', { className: 'tdg-b' }, h('b', null, o.t), o.han ? h('small', null, o.han + (o.con ? ' · ' : ''), o.con ? h('strong', null, o.con) : null) : null), o.btn || null);
}
/* v252 (05/11/2026): khối hành động gắn với đơn ở đầu màn chi tiết đơn (như mẫu "Yêu cầu bổ sung tài liệu").
   o.t tên việc · o.han dòng nhỏ · o.con phần đậm · o.tone: 'warning' (việc có hạn, mặc định) | 'neutral' (hành động tùy chọn, thông tin) | 'danger' (quá hạn, bị trả lại)
   o.btn {l, go, v, ic, dis} nút chính bên phải · o.more [{l, go}] hành động phụ: nút mũi tên xuống mở bảng chọn từ đáy (tiêu đề = tên việc)
   o.two [{l, go, v}] khi không xác định được nút chính: 2 nút chia đôi ở hàng dưới · nhãn dài hiện một phần + "…" (đủ chữ ở title, aria-label) · không hiện dòng mô tả */
function DtViec(o) {
  var sh = React.useState(false), anchor = React.useRef(null), host = useHost(anchor);
  var bt = function (b) { return h(T.Button, { key: b.l, size: 'sm', variant: b.v || 'primary', icon: b.ic, disabled: b.dis, title: b.l, 'aria-label': b.l, 'data-pt-go': b.dis ? undefined : b.go }, h('span', { className: 'tdv-lb' }, b.l)); };
  return h('section', { className: 'tdg tdv tdv-' + (o.tone || 'warning'), role: 'status' }, h('span', { ref: anchor, hidden: true }),
    h('div', { className: 'tdg-b' }, h('b', null, o.t), o.han || o.con ? h('small', null, o.han || null, o.han && o.con ? ' · ' : null, o.con ? h('strong', null, o.con) : null) : null),
    o.btn ? h('div', { className: 'tdv-acts' }, bt(o.btn), o.more ? h(T.Button, { size: 'sm', variant: 'secondary', icon: 'chevronDown', className: 'tdv-more', 'aria-label': 'Hành động khác', 'aria-haspopup': 'dialog', onClick: function () { sh[1](true); } }) : null) : null,
    o.two ? h('div', { className: 'tdv-two' }, o.two.map(bt)) : null,
    sh[0] && host ? h(LvSheet, { host: host, title: o.t, onClose: function () { sh[1](false); } }, h('ul', { className: 'ph-lvr' }, o.more.map(function (m) {
      return h('li', { key: m.l }, h('button', { type: 'button', className: 'ph-lvr-it', 'data-pt-go': m.go }, h('span', { className: 'ph-lvr-tx' }, h('span', { className: 'ph-lvr-t' }, m.l)), h(T.Icon, { name: 'chevronRight' })));
    }))) : null);
}
function DtTodo(o) {
  return h('section', { className: 'ckb tdB dt-todo', role: 'status' }, h('span', { className: 'qbx-ic', 'aria-hidden': 'true' }, h(T.Illustration, { name: 'nhacViec' })),
    h('div', { className: 'tdB-b' }, h('b', null, o.t), o.d ? h('p', null, o.d) : null, o.han ? h('span', { className: 'tdB-pill' }, h(T.Icon, { name: 'clock' }), o.han) : null,
      o.btns ? h('div', { className: 'tdB-btns' }, o.btns) : null));
}
/* thẻ đương sự: ô chữ tắt, tên, vai trò (+ "Bạn"), thông tin nhãn trái – giá trị phải */
/* v232: mỗi đương sự luôn đủ nhãn Số CCCD (tổ chức: Mã số thuế) · Điện thoại · Địa chỉ (như web: CCCD/MST, ĐT, địa chỉ luôn hiện); thiếu → '-'; nhãn khác giữ sau */
function DtParty(p) {
  var rows = p.rows || [], std = [/tổ chức|công ty|ủy ban|ubnd|sở |chi cục/i.test(p.vt + ' ' + p.ten) ? 'Mã số thuế' : 'Số CCCD', 'Điện thoại', 'Địa chỉ'];
  var get = function (l) { var r = rows.filter(function (x) { return x[0] === l; })[0]; return r ? r[1] : null; };
  var full = std.map(function (l) { return [l, get(l)]; }).concat(rows.filter(function (x) { return std.indexOf(x[0]) < 0; }));
  /* v234: kiểu thẻ chứng thư – dòng vai trò nhỏ ở trên, tên đậm, nhãn "Bạn" bên phải; nhãn – giá trị thẳng cột, căn trái */
  return h('div', { className: 'sk-ct ctp dt-party' }, h('div', { className: 'sk-ct-h' }, h('div', null, h('small', null, p.vt), h('b', null, p.ten)), p.ban ? h(T.StatusBadge, { tone: 'info', icon: false }, 'Bạn') : null),
    h('dl', { className: 'sk-dl ct-dl' }, full.map(function (r) { return h(F, { key: r[0] }, h('dt', null, r[0]), h('dd', null, vd(r[1]))); })));
}
/* nhóm đơn liên quan có thể tạo (theo web TaoDonLienQuan) */
var DT_TAO = [
  ['Đơn liên quan đến khởi kiện', 'Bổ sung, sửa đổi, rút đơn và các điều chỉnh yêu cầu khởi kiện', [['Bổ sung tài liệu cho hồ sơ', 'evidence2'], ['Sửa đổi, bổ sung đơn theo yêu cầu của Tòa án', 'sd1'], ['Thay đổi, rút một phần yêu cầu khởi kiện', 'tr1'], ['Yêu cầu rút đơn khởi kiện', 'rd1']]],
  ['Đơn liên quan biện pháp khẩn cấp tạm thời', 'Áp dụng biện pháp khẩn cấp tạm thời', [['Đơn yêu cầu áp dụng biện pháp khẩn cấp tạm thời', 'bp1']]],
  ['Đơn liên quan án phí, lệ phí, chi phí tố tụng', 'Miễn, giảm tạm ứng án phí, lệ phí khi có thông báo của Tòa án', [['Đề nghị miễn, giảm tạm ứng án phí', 'mg1']]],
  ['Đơn yêu cầu khác', 'Sao gửi tài liệu, chứng cứ và các yêu cầu khác', [['Sao gửi tài liệu, chứng cứ cho đương sự khác', 'sg1']]]];
/* v242 (04/11/2026): khối "Tạo đơn liên quan" → nút "Tạo đơn liên quan đến vụ việc"; bấm nút mở bảng từ đáy "Chọn loại đơn cần tạo"
   (chọn C3 + D3): tên nhóm ngắn, mỗi nhóm một khối nền xám, mỗi dòng = biểu tượng tờ đơn + huy hiệu hành động màu theo nhóm + tên loại đơn; bấm dòng mở màn soạn */
var TAO_NGAN = ['Khởi kiện', 'Biện pháp khẩn cấp', 'Án phí, lệ phí', 'Yêu cầu khác'], TAO_MAU = ['do', 'xanh', 'vang', 'luc'];
var TAO_IC = { evidence2: 'filePlus', sd1: 'pen', tr1: 'swap', rd1: 'logout', bp1: 'shield', mg1: 'wallet', sg1: 'send' };
function TaoIc(id, gi) {
  return h('span', { className: 'td3 td-' + TAO_MAU[gi], 'aria-hidden': 'true' },
    h('svg', { viewBox: '0 0 40 40', className: 'td3-doc' }, h('path', { d: 'M9 4h15l7 7v23a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z', className: 'td3-p' }), h('path', { d: 'M24 4v7h7', className: 'td3-f' }),
      h('path', { d: 'M12 16h12M12 21h14M12 26h8', className: 'td3-l' })),
    h('span', { className: 'td3-b' }, h(T.Icon, { name: TAO_IC[id] })));
}
/* v243 (04/11/2026): nút ghim ở thanh cuối màn khi đang ở tab Danh sách đơn – chọn tab là luôn thấy nút, không phải cuộn */
function DtTaoDon() {
  var o = React.useState(false), anchor = React.useRef(null), host = useHost(anchor);
  return h(T.ActionBar, null, h('div', { className: 'tao-wrap tao-bar' }, h('span', { ref: anchor, hidden: true }),
    h(T.Button, { block: true, variant: 'tint', icon: 'plus', onClick: function () { o[1](true); } }, 'Tạo đơn liên quan đến vụ việc')),
    o[0] && host ? h(LvSheet, { host: host, title: 'Chọn loại đơn cần tạo', onClose: function () { o[1](false); } },
      h('div', { className: 'tc3' }, DT_TAO.map(function (g, i) {
        return h('section', { key: g[0] }, h('p', { className: 'tc-gh' }, TAO_NGAN[i]), h('ul', { className: 'tc3-l' }, g[2].map(function (x) {
          return h('li', { key: x[1] }, h('button', { type: 'button', className: 'tc3-it', 'data-pt-go': x[1] }, TaoIc(x[1], i), h('span', { className: 'tc-t' }, x[0])));
        })));
      }))) : null);
}

/* ---------- Chi tiết đơn (6 tab) ---------- */
var DON_TABS = [{ key: 'tt', label: 'Thông tin chung' }, { key: 'ds', label: 'Danh sách đơn' }, { key: 'tl', label: 'Tài liệu chứng cứ' }, { key: 'vb', label: 'Văn bản tống đạt' }, { key: 'ls', label: 'Lịch sử' }]; /* v247: bỏ tab Hòa giải đối thoại */
/* v247: lịch sử đơn – dữ liệu mẫu theo ảnh, ngày và Tòa án khớp đơn đang xem: [tên, thời điểm, mã tống đạt, nhãn trạng thái, màu nhãn] */
var DT_LS = [
  ['Thông báo yêu cầu sửa đổi, bổ sung đơn khởi kiện', '20/10/2026 16:02:21', 'TD-26-DS-0005', 'Yêu cầu sửa đổi, bổ sung đơn', 'cam'],
  ['Thông báo chuyển đơn khởi kiện', '20/10/2026 15:50:20', 'TD-25-DS-0004', 'Đã chuyển Tòa án khác', 'cam'],
  ['Giấy xác nhận đã nhận đơn khởi kiện', '20/10/2026 15:43:59', 'TD-24-DS-0003', 'Tòa án đã nhận đơn', 'xanh'],
  ['Thông báo nộp tiền tạm ứng chi phí tố tụng', '20/10/2026 15:14:41', 'TD-04-DS-0001', 'Chờ nộp tạm ứng chi phí tố tụng', 'cam'],
  ['Ngày nộp đơn', '20/10/2026 14:09:20'],
  ['Tạo đơn', '20/10/2026 14:09:07']]; /* v240 (04/11/2026): bỏ số lượng ở tab chi tiết đơn khởi kiện */
/* 03/11/2026 (v146): nhận p để vẽ các tình huống khác của đơn (chờ ký số, đã thụ lý, trả lại đơn, tạm ứng án phí) – xem s5.js */
/* v241 (04/11/2026): thẻ đơn trong tab Danh sách đơn – đồng bộ kiểu thẻ ở màn Danh sách đơn (chọn A): trạng thái trên cùng, tên đơn đậm, nhãn – giá trị; đơn nháp có khối Việc cần làm */
var DT_DONS = [
  { loai: 'Đơn khởi kiện · ban đầu', t: 'Tranh chấp hợp đồng vay tài sản', tt: ['Đã gửi đơn', 'info'], ma: 'TN-20261020-0012', ngay: ['Ngày gửi', '20/10/2026'] },
  { loai: 'Đơn bổ sung', t: 'Bổ sung tài liệu cho hồ sơ', tt: ['Bản nháp', 'neutral'], ma: null, ngay: ['Lưu nháp', '22/10/2026 · 10:15'], go: 'evidence2' }
];
function DtDonThe(d) {
  return h('li', { key: d.t, className: 'qd-c qc' },
    d.go ? h('button', { type: 'button', className: 'ph-mail2-hit', 'aria-label': 'Xem đơn: ' + d.t, 'data-pt-go': d.go }) : null,
    h('div', { className: 'qc-top' }, h(T.StatusBadge, { tone: d.tt[1], icon: false }, d.tt[0])),
    h('div', { className: 'qc-th' }, h('b', { className: 'qc-t' }, d.t)),
    h('dl', { className: 'qc-ben' }, [['Loại đơn', d.loai], ['Mã tiếp nhận', h('span', { className: 'tp-num' }, vd(d.ma))], d.ngay].map(function (r) { return h('div', { key: r[0] }, h('dt', null, r[0]), h('dd', null, r[1])); })),
    d.go ? h('div', { className: 'qd-c-f qc-vk vkx-box' }, h('p', { className: 'qc-vk-h vkx-h' }, 'Việc cần làm'), h('ul', { className: 'qc-vk-l' },
      h('li', { className: 'vk-card vka vkx vkx-none' }, h('button', { type: 'button', className: 'vka-b', 'data-pt-go': d.go }, h('span', { className: 'vka-tx' }, h('b', null, 'Tiếp tục soạn'), h('small', null, 'Không có thời hạn')))))) : null);
}
/* v246 (04/11/2026): tab Văn bản tống đạt – nhiều văn bản, thẻ cùng kiểu Hộp thư tống đạt (chọn F1, bỏ hạn xử lý): nhãn loại màu + số văn bản; chưa xem = chấm đỏ + chữ đậm; Tòa án · ngày giờ; bấm thẻ mở chi tiết văn bản. Dữ liệu mẫu 3 văn bản */
var DT_VB = [
  { nh: 'THONG_BAO', t: 'Thông báo yêu cầu sửa đổi, bổ sung đơn khởi kiện', so: '12/2026/TB-TA', tg: '22/10/2026 09:30', moi: true },
  { nh: 'THONG_BAO', t: 'Thông báo về việc nhận đơn khởi kiện', so: '09/2026/TB-TA', tg: '21/10/2026 15:10' },
  { nh: 'GIAY_XAC_NHAN', t: 'Giấy xác nhận đã nhận đơn khởi kiện trực tuyến', so: '45/2026/GXN-TA', tg: '21/10/2026 08:15' }];
/* bấm thẻ mở màn chi tiết văn bản đúng văn bản đó (IB_X, chỉ số 1000+); xem xong thẻ hết chấm đỏ */
var IB_X = DT_VB.map(function (v) { return { t: v.t, so: v.so, nh: v.nh, from: COURT1, time: v.tg.replace(/\//g, '-'), doc: !v.moi }; });
function DtVbThe(v, i) {
  var x = IB_X[i], moi = !x.doc;
  return h('li', { key: v.so, className: 'ib-c' + (moi ? ' ib-un' : '') },
    h('button', { type: 'button', className: 'ph-mail2-hit', 'aria-label': (moi ? 'Chưa xem. ' : '') + v.t, 'data-pt-go': 'mailDetail', onClickCapture: function () { window.__ibSel = 1000 + i; } }),
    h('div', { className: 'ib-c-h' }, h('span', { className: 'vk-tag' + ibTag(v.nh) }, IB_NHAN_TEN[v.nh]), h('span', { className: 'vk-code tp-num' }, v.so)),
    h('b', null, moi ? h('i', { className: 'ib-dot', 'aria-hidden': 'true' }) : null, v.t),
    h('small', null, COURT1 + ' · ' + v.tg));
}
/* v248: nhóm mốc lịch sử theo ngày + tên thứ trong tuần */
function lsThu(d) { var p = d.split('/'); return ['Chủ nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'][new Date(+p[2], +p[1] - 1, +p[0]).getDay()]; }
function lsNhom(list) { var g = []; list.forEach(function (x) { var d = x[1].split(' ')[0], c = g.filter(function (y) { return y.ngay === d; })[0]; if (!c) g.push(c = { ngay: d, l: [] }); c.l.push(x); }); return g; }
/* ===== v251 (04/11/2026): thành phần dùng chung khi áp UI đơn khởi kiện cho các đơn khác và các chức năng (vụ án, vụ việc, hòa giải, nghĩa vụ tài chính, người bảo vệ) ===== */
var DOC_THE = { tai: true, the: true }; /* tài liệu: mỗi tài liệu 1 thẻ + nút tải về */
/* ---- 1. thẻ văn bản tống đạt kiểu Hộp thư, dùng chung ---- */
function vbNh(t) { return /^Quyết định/.test(t) ? 'QUYET_DINH' : /^Bản án/.test(t) ? 'BAN_AN' : /^Biên bản/.test(t) ? 'BIEN_BAN' : /^Giấy (mời|triệu tập)/.test(t) ? 'GIAYMOI_TT' : /^Giấy/.test(t) ? 'GIAY_XAC_NHAN' : 'THONG_BAO'; }
function vbReg(v) { var i = -1; IB_X.forEach(function (x, k) { if (x.so === v.so && x.t === v.t) i = k; }); if (i < 0) { IB_X.push({ t: v.t, so: v.so, nh: v.nh || vbNh(v.t), from: v.from || COURT1, time: v.tg.replace(/\//g, '-'), doc: !v.moi }); i = IB_X.length - 1; } return i; }
function VbCards(list) {
  return h('ul', { className: 'vb1' }, list.map(function (v) {
    var i = vbReg(v), x = IB_X[i], moi = !x.doc;
    return h('li', { key: v.so + v.t, className: 'ib-c' + (moi ? ' ib-un' : '') },
      h('button', { type: 'button', className: 'ph-mail2-hit', 'aria-label': (moi ? 'Chưa xem. ' : '') + v.t, 'data-pt-go': 'mailDetail', onClickCapture: function () { window.__ibSel = 1000 + i; } }),
      h('div', { className: 'ib-c-h' }, h('span', { className: 'vk-tag' + ibTag(x.nh) }, IB_NHAN_TEN[x.nh]), h('span', { className: 'vk-code tp-num' }, v.so)),
      h('b', null, moi ? h('i', { className: 'ib-dot', 'aria-hidden': 'true' }) : null, v.t),
      h('small', null, x.from + ' · ' + v.tg));
  }));
}
/* ---- 2. dòng thời gian G1 dùng chung: [tên, 'dd/mm/yyyy[ hh:mm:ss]', dòng phụ, nhãn, màu] – không có giờ thì bỏ cột giờ ---- */
function LsG1(list) {
  var g = lsNhom(list);
  return h('section', { className: 'tp-sec-card tp-sec-open ls-card' }, h('div', { className: 'tp-sec-body' }, g.map(function (n, gi) {
    return h(F, { key: n.ngay }, h('p', { className: 'g1-day' }, lsThu(n.ngay) + ', ' + n.ngay), h('ol', { className: 'g1' }, n.l.map(function (x, i) {
      var tg = x[1].split(' ')[1];
      return h('li', { key: x[0] + x[1], className: (gi === 0 && i === 0 ? 'g1-now' : '') + (tg ? '' : ' g1-nt') },
        tg ? h('time', { className: 'g1-t tp-num' }, h('b', null, tg.slice(0, 5)), h('small', null, tg.slice(5))) : null,
        h('span', { className: 'g1-dot', 'aria-hidden': 'true' }), h('div', { className: 'g1-c' }, h('b', null, x[0]), x[2] ? h('small', null, x[2]) : null, x[3] ? h('span', { className: 'ls-pill ls-pill-' + (x[4] || 'cam') }, x[3]) : null));
    })));
  })));
}
/* ---- 3. thẻ đơn kiểu A dùng chung (rows tùy chọn, Việc cần làm chỉ khi nháp) ---- */
function DonThe2(d) {
  return h('li', { key: d.t + d.loai, className: 'qd-c qc' },
    d.go ? h('button', { type: 'button', className: 'ph-mail2-hit', 'aria-label': 'Xem đơn: ' + d.t, 'data-pt-go': d.go }) : null,
    h('div', { className: 'qc-top' }, h(T.StatusBadge, { tone: d.tt[1], icon: false }, d.tt[0])),
    h('div', { className: 'qc-th' }, h('b', { className: 'qc-t' }, d.t)),
    h('dl', { className: 'qc-ben' }, d.rows.map(function (r) { return h('div', { key: r[0] }, h('dt', null, r[0]), h('dd', null, vd(r[1]))); })),
    d.nhap ? h('div', { className: 'qd-c-f qc-vk vkx-box' }, h('p', { className: 'qc-vk-h vkx-h' }, 'Việc cần làm'), h('ul', { className: 'qc-vk-l' },
      h('li', { className: 'vk-card vka vkx vkx-none' }, h('button', { type: 'button', className: 'vka-b', 'data-pt-go': d.go }, h('span', { className: 'vka-tx' }, h('b', null, 'Tiếp tục soạn'), h('small', null, 'Không có thời hạn')))))) : null);
}
/* ---- 4. nút ghim "Tạo đơn liên quan" + bảng chọn C3/D3 dùng chung (p.snack: chưa có luồng – bấm báo đang phát triển; p.hl: nhóm làm nổi bật; p.open: mở sẵn) ---- */
function TaoBtn(p) {
  var o = React.useState(!!p.open), anchor = React.useRef(null), host = useHost(anchor), hlRef = React.useRef(null);
  React.useEffect(function () { if (!o[0] || !p.hl || !host) return; var t = setTimeout(function () { var e = hlRef.current, b = e && e.closest('.tp-dlg-body'); if (e && b) b.scrollTop = e.offsetTop - 8; }, 80); return function () { clearTimeout(t); }; }, [o[0], host]);
  return h(T.ActionBar, null, h('div', { className: 'tao-wrap tao-bar' }, h('span', { ref: anchor, hidden: true }),
    h(T.Button, Object.assign({ block: true, variant: 'tint', icon: 'plus' }, p.snack ? { 'data-pt-go': 'snack:' + p.snack } : { onClick: function () { o[1](true); } }), p.nhan || 'Tạo đơn liên quan đến vụ việc')),
    o[0] && host ? h(LvSheet, { host: host, title: 'Chọn loại đơn cần tạo', onClose: function () { o[1](false); } },
      h('div', { className: 'tc3' }, p.groups.map(function (g) {
        var hl = p.hl === g[0];
        return h('section', { key: g[0], ref: hl ? hlRef : undefined, className: hl ? 'tc3-hl' : null }, h('p', { className: 'tc-gh' }, g[0], hl ? h('span', { className: 'tc3-hl-t' }, ' · Nộp đơn đề nghị hoãn phiên tòa tại đây') : null), h('ul', { className: 'tc3-l' }, g[2].map(function (x) {
          return h('li', { key: x[0] }, h('button', { type: 'button', className: 'tc3-it', 'data-pt-go': x[1] }, h('span', { className: 'td3 td-' + g[1], 'aria-hidden': 'true' },
            h('svg', { viewBox: '0 0 40 40', className: 'td3-doc' }, h('path', { d: 'M9 4h15l7 7v23a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z', className: 'td3-p' }), h('path', { d: 'M24 4v7h7', className: 'td3-f' }), h('path', { d: 'M12 16h12M12 21h14M12 26h8', className: 'td3-l' })),
            h('span', { className: 'td3-b' }, h(T.Icon, { name: x[2] }))), h('span', { className: 'tc-t' }, x[0])));
        })));
      }))) : null);
}
function DonChiTiet(p) {
  p = p || {};
  return h(DtScreen, { title: 'Chi tiết đơn', tabLabel: 'Nội dung chi tiết đơn', tabs: DON_TABS, headCls: 'dt-head-don', /* v231: tên đơn 16px */
    foot: function (t) { return t === 'ds' ? h(DtTaoDon) : null; }, /* v243 */
    meta: p.meta || h(F, null, h('span', { className: 'tp-num' }, 'TN-20261020-0012'), ' · Ngày tạo 20/10/2026'),
    name: p.name || 'Đơn khởi kiện – Tranh chấp hợp đồng vay tài sản',
    badges: p.badges || h(F, null, h(T.StatusBadge, { tone: 'info', icon: false }, 'Đã gửi đơn'), h(T.StatusBadge, { tone: 'warning', icon: false }, 'Yêu cầu bổ sung tài liệu')),
    /* v245 (04/11/2026): khối "Yêu cầu bổ sung tài liệu" rút gọn (chọn E1, bỏ viền màu trái) và đặt trước thanh tab; các biến thể truyền top riêng giữ nguyên chỗ cũ */
    /* v252: mọi biến thể đưa hành động gắn với đơn lên khối đầu màn (p.viec); p.top chỉ còn là nội dung đầu tab */
    pre: p.viec ? h(DtViec, p.viec) : p.top !== undefined ? null : h(DtViec, { t: 'Yêu cầu bổ sung tài liệu', han: 'Hạn 26/10/2026', con: 'còn 3 ngày', btn: { l: 'Bổ sung tài liệu', go: 'evidence2' } }),
    top: p.top !== undefined ? p.top : null,
    render: function (t, setT) {
      if (t === 'tt') return h(F, null,
        FCard('Các bên trong đơn', h(F, null,
          h(DtParty, { tat: 'NK', ten: 'Hoàng Dương', ban: true, vt: 'Người khởi kiện · Cá nhân', rows: [['Số CCCD', h('span', { className: 'tp-num' }, '001090012345')], ['Điện thoại', '0912345678'], ['Địa chỉ', 'Số 8 Phạm Hùng, Phường Từ Liêm, Thành phố Hà Nội']] }),
          h(DtParty, { tat: 'BK', ten: 'Trần Văn Bình', vt: 'Người bị kiện · Cá nhân', rows: [['Địa chỉ', 'Số 12 Trần Thái Tông, Phường Cầu Giấy, Thành phố Hà Nội']] }),
          /* v237: demo người bị kiện là tổ chức (Mã số thuế, người đại diện theo pháp luật) và người có quyền lợi, nghĩa vụ liên quan */
          h(DtParty, { tat: 'BK', ten: 'Công ty TNHH Thương mại An Phú', vt: 'Người bị kiện · Tổ chức', rows: [['Mã số thuế', h('span', { className: 'tp-num' }, '0105987654')], ['Điện thoại', '024 3766 8899'], ['Địa chỉ', 'Số 45 Nguyễn Chí Thanh, Phường Láng, Thành phố Hà Nội'], ['Người đại diện theo pháp luật', 'Nguyễn Văn Phúc · Giám đốc']] }),
          h(DtParty, { tat: 'LQ', ten: 'Lê Thị Hoa', vt: 'Người có quyền lợi, nghĩa vụ liên quan · Cá nhân', rows: [['Số CCCD', h('span', { className: 'tp-num' }, '001192034567')], ['Điện thoại', '0987654321'], ['Địa chỉ', 'Số 3 ngõ 15 Duy Tân, Phường Cầu Giấy, Thành phố Hà Nội']] })), true),
        FCard('Nội dung yêu cầu', h(DtNoiDung, { kieu: p.nd || 'nhap' }), true), /* v238 */
        FCard('Tòa án xử lý đơn', RvKV([['Tòa án xử lý đơn', COURT1], ['Thẩm phán phụ trách', '—'], ['Số thụ lý', '—'], ['Mã vụ án', '—']]), true),
        FCard('Thông tin đơn & hồ sơ pháp lý', RvKV([['Số tiếp nhận', h('span', { className: 'tp-num' }, 'TN-20261020-0012')], ['Lĩnh vực', 'Dân sự'], ['Hình thức nộp', 'Trực tuyến qua Cổng DVTP'], ['Ngày tạo', '20/10/2026'], ['Ngày gửi', '20/10/2026'], ['Tòa tiếp nhận', '—'], ['Tài liệu đính kèm', '3 tài liệu'], ['Vụ án liên quan', '—'], ['Loại đơn', 'Đơn khởi kiện']]), true));
      if (t === 'ds') return FCard('Danh sách đơn trong vụ việc', h('ul', { className: 'qd-list dt-qc' }, DT_DONS.map(DtDonThe)), true); /* v241; v243: nút tạo đơn ghim ở thanh cuối màn (foot) */
      if (t === 'tl') return h(F, null,
        /* v244 (04/11/2026): bỏ chữ "Nộp ngày" ở tiêu đề (chỉ thứ + ngày), bỏ nút "Tải lên tài liệu bổ sung", thêm nút tải về bên phải nút xem */
        FCard('Thứ Ba, 20/10/2026', DtDocs([['Đơn khởi kiện', 'don-khoi-kien.pdf · PDF'], ['Hợp đồng vay tài sản', 'hop-dong-vay.pdf · Bản sao có chứng thực'], ['Giấy nhận tiền', 'giay-nhan-tien.jpg · Bản chính']], { tai: true, the: true }), true)); /* v249: mỗi tài liệu 1 thẻ */
      if (t === 'vb') return FCard('Văn bản tống đạt từ Tòa án', h('ul', { className: 'vb1' }, DT_VB.map(DtVbThe)), true); /* v246 */
      /* v247 (04/11/2026): bỏ tab Hòa giải đối thoại; tab Lịch sử bỏ tiêu đề khối và nút thu gọn/mở rộng, dòng thời gian theo ảnh mẫu (chấm đỏ, tên, ngày giờ, mã tống đạt · Tòa án, nhãn trạng thái) */
      /* v248 (04/11/2026): dòng thời gian kiểu G1 – ngày làm tiêu đề nhóm, giờ:phút đậm ở cột trái (giây nhỏ bên dưới), chấm nhỏ trên đường dọc (mốc mới nhất chấm đỏ, mốc cũ chấm rỗng xám), bên phải tên + mã · Tòa án + nhãn trạng thái (giữ màu cam/xanh) */
      return h('section', { className: 'tp-sec-card tp-sec-open ls-card' }, h('div', { className: 'tp-sec-body' }, lsNhom(DT_LS).map(function (g, gi) {
        return h(F, { key: g.ngay }, h('p', { className: 'g1-day' }, lsThu(g.ngay) + ', ' + g.ngay), h('ol', { className: 'g1' }, g.l.map(function (x, i) {
          var tg = x[1].split(' ')[1];
          return h('li', { key: x[0] + x[1], className: gi === 0 && i === 0 ? 'g1-now' : null }, h('time', { className: 'g1-t tp-num' }, h('b', null, tg.slice(0, 5)), h('small', null, tg.slice(5))),
            h('span', { className: 'g1-dot', 'aria-hidden': 'true' }), h('div', { className: 'g1-c' }, h('b', null, x[0]),
              x[2] ? h('small', null, h('span', { className: 'tp-num' }, x[2]), ' · ' + COURT1) : null, x[3] ? h('span', { className: 'ls-pill ls-pill-' + x[4] }, x[3]) : null));
        })));
      })));
    } });
}

/* ---------- Chi tiết vụ án (8 tab) ---------- */
var VA_TABS = [{ key: 'info', label: 'Thông tin chung' }, { key: 'don', label: 'Đơn trong vụ án' }, { key: 'stages', label: 'Các cấp xét xử' }, { key: 'hearings', label: 'Lịch phiên tòa' }, { key: 'docs', label: 'Văn bản tống đạt' }, { key: 'evidence', label: 'Tài liệu, chứng cứ' }, { key: 'judgments', label: 'Bản án / Quyết định' }, { key: 'process', label: 'Lịch sử vụ án' }];
/* 03/11/2026 (v149): nhận p.top (banner tạm đình chỉ / GĐT, TT) – xem s5.js */
/* v251 (04/11/2026): áp UI chi tiết đơn khởi kiện – tab không số, tên 16px, khối nhắc (p.top) trước tab, đơn dạng thẻ + nút ghim Tạo đơn liên quan (tab Đơn), văn bản kiểu Hộp thư, tài liệu dạng thẻ có xem + tải về, lịch sử nhóm theo ngày */
function VuAnChiTiet(p) {
  p = p || {};
  return h(DtScreen, { title: 'Chi tiết vụ án', tabLabel: 'Nội dung chi tiết vụ án', tabs: VA_TABS, pre: p.top || null, tab0: p.tab0, headCls: 'dt-head-don',
    foot: function (t) { return t === 'don' ? h(TaoBtn, { groups: VA_TAO_G, hl: p.noiBat === 'hoan-phien' ? 'Đơn yêu cầu khác' : null, open: p.noiBat === 'hoan-phien' }) : null; },
    meta: h(F, null, h('span', { className: 'tp-num' }, 'DS-2026-0012'), ' · Dân sự'),
    name: 'Tranh chấp hợp đồng vay tài sản',
    badges: h(F, null, h(T.StatusBadge, { tone: 'info', icon: false }, 'Đang giải quyết'), h('span', { className: 'dt-role' }, 'Tư cách của bạn: ', h('b', null, p.vaiTro || 'Nguyên đơn'))),
    headExtra: h(T.CaseProgress, { label: 'Cấp xét xử', steps: ['Thụ lý', 'Sơ thẩm', 'Phúc thẩm'], current: 1 }),
    render: function (t) {
      if (t === 'info') return h(F, null,
        FCard('Các bên đương sự', h(F, null, h('p', { className: 'dm-meta' }, '1 người khởi kiện · 1 người bị kiện · 1 người có quyền lợi, nghĩa vụ liên quan'),
          p.vaiTro ? h(DtParty, { tat: 'NĐ', ten: 'Nguyễn Văn Hùng', vt: 'Nguyên đơn', rows: [['Số CCCD', '—'], ['Địa chỉ', '—']] }) : null, h(DtParty, { tat: p.vaiTro === 'Bị đơn' ? 'BĐ' : p.vaiTro ? 'LQ' : 'NĐ', ten: 'Hoàng Dương', ban: true, vt: p.vaiTro || 'Nguyên đơn', rows: [['Số CCCD', h('span', { className: 'tp-num' }, '001090012345')], ['Người đại diện / ủy quyền', '—'], ['Người bảo vệ lợi ích hợp pháp', '—'], ['Địa chỉ', 'Số 8 Phạm Hùng, Phường Từ Liêm, Thành phố Hà Nội']] }),
          p.vaiTro === 'Bị đơn' ? null : h(DtParty, { tat: 'BĐ', ten: 'Trần Văn Bình', vt: 'Bị đơn', rows: [['Số CCCD', '—'], ['Người đại diện / ủy quyền', '—'], ['Địa chỉ', '—']] }),
          p.vaiTro && p.vaiTro !== 'Bị đơn' ? null : h(DtParty, { tat: 'LQ', ten: 'Lê Thị Hoa', vt: 'Người có quyền lợi, nghĩa vụ liên quan', rows: [['Số CCCD', '—'], ['Địa chỉ', '—']] }),
          h('p', { className: 'dt-note' }, h(T.Icon, { name: 'lock' }), 'Một số thông tin của đương sự khác được ẩn nhằm bảo vệ dữ liệu cá nhân.'),
          h('div', { className: 'dt-acts' }, ['Bổ sung đương sự', 'Đổi vai trò tố tụng', 'Đề nghị về chứng cứ, người tham gia tố tụng'].map(function (x) { return h(T.Button, { key: x, variant: 'secondary', size: 'sm' + x + '".' }, x); }))), true),
        FCard('Tòa án & hội đồng xét xử', RvKV([['Tòa án đang giải quyết', COURT1], ['Thẩm phán / HĐXX', 'Trần Văn Anh'], ['Cấp xét xử hiện tại', 'Sơ thẩm'], ['Số thụ lý giai đoạn hiện tại', h('span', { className: 'tp-num' }, '12/2026/TLST-DS')], ['Ngày thụ lý giai đoạn hiện tại', '15/10/2026']]), true),
        FCard('Định danh & tình trạng vụ án', RvKV([['Mã vụ án', h('span', { className: 'tp-num' }, 'DS-2026-0012')], ['Loại án', 'Dân sự'], ['Trạng thái vụ án', 'Đang giải quyết'], ['Số giai đoạn đã qua', '1 giai đoạn'], ['Quan hệ tranh chấp', 'Tranh chấp hợp đồng vay tài sản']]), true),
        FCard('Án phí', h(F, null, h('div', { className: 'dt-fee' }, h('div', null, h('b', null, 'Tạm ứng án phí sơ thẩm'), h('small', null, 'Hạn nộp 30/10/2026')), h('div', { className: 'dt-fee-r' }, h('b', { className: 'tp-num' }, '1.250.000 đ'), h(T.StatusBadge, { tone: 'warning', icon: false }, 'Chưa nộp'))),
          h('button', { type: 'button', className: 'vk-link', 'data-pt-go': 'financeDetail' }, 'Xem nghĩa vụ tài chính', h(T.Icon, { name: 'chevronRight' }))), true),
        FCard('Đơn gốc của bạn', h('button', { type: 'button', className: 'dt-link-row', 'data-pt-go': 'appDetail' }, h('span', null, h('b', null, 'Đơn khởi kiện'), h('small', { className: 'tp-num' }, 'TN-20261020-0012')), h('span', { className: 'dt-link-t' }, 'Xem đơn', h(T.Icon, { name: 'chevronRight' }))), true));
      if (t === 'don') return FCard('Đơn trong vụ án', h('ul', { className: 'qd-list dt-qc' },
        DonThe2({ loai: 'Đơn khởi kiện · ban đầu', t: 'Tranh chấp hợp đồng vay tài sản', tt: ['Đã thụ lý', 'success'], go: 'appDetail', rows: [['Loại đơn', 'Đơn khởi kiện · ban đầu'], ['Mã tiếp nhận', h('span', { className: 'tp-num' }, 'TN-20261020-0012')], ['Ngày gửi', '20/10/2026']] }),
        DonThe2({ loai: 'Giao nộp tài liệu, chứng cứ', t: 'Biên nhận BN-2026-0105', tt: ['Đã gửi', 'info'], rows: [['Loại đơn', 'Giao nộp tài liệu, chứng cứ'], ['Số tài liệu', '2 tài liệu'], ['Ngày gửi', '24/10/2026']] })), true);
      if (t === 'stages') return h(F, null,
        FCard('Sơ thẩm · Đang giải quyết', RvKV([['Tòa án', COURT1], ['Số thụ lý', h('span', { className: 'tp-num' }, '12/2026/TLST-DS')], ['Ngày thụ lý', '15/10/2026'], ['Thẩm phán', 'Trần Văn Anh'], ['Kết quả', '—']]), true),
        FCard('Phúc thẩm · Chưa phát sinh', P('Thông tin cấp phúc thẩm sẽ hiển thị khi vụ án được thụ lý phúc thẩm.', 'ph-muted'), true));
      if (t === 'hearings') return FCard('Lịch phiên tòa', h('div', { className: 'dt-hear' },
        h('div', { className: 'dt-hear-d' }, h('b', { className: 'tp-num' }, '28'), h('span', null, 'T10')),
        h('div', { className: 'dt-hear-b' }, h('div', { className: 'dt-don-h' }, h(T.StatusBadge, { tone: 'warning', icon: false }, 'Sắp diễn ra')), h('b', null, 'Phiên tòa sơ thẩm'), RvKV([['Thời gian', '14:00, 28/10/2026'], ['Hình thức', 'Trực tiếp'], ['Địa điểm', 'Phòng xử án số 2 – ' + COURT1]]),
          h('div', { className: 'dt-acts' }, h(T.Button, { size: 'sm', 'data-pt-go': 'attendReply' }, 'Xác nhận tham dự'), h(T.Button, { size: 'sm', variant: 'secondary', icon: 'pen' }, 'Đề nghị hoãn phiên')))), true);
      if (t === 'docs') return FCard('Văn bản tống đạt từ Tòa án', VbCards([{ t: 'Quyết định đưa vụ án ra xét xử', so: '25/2026/QĐXXST-DS', tg: '21/10/2026', moi: true }, { t: 'Thông báo thụ lý vụ án', so: '12/2026/TB-TLVA', tg: '15/10/2026' }]), true);
      if (t === 'evidence') return h(F, null,
        h('div', { className: 'ph-s1-note dt-info' }, h('p', null, 'Đương sự được quyền tiếp cận tài liệu, chứng cứ do bên khác nộp hoặc Tòa án thu thập, trừ tài liệu liên quan đến bí mật nhà nước, thuần phong mỹ tục, bí mật nghề nghiệp, bí mật kinh doanh, bí mật cá nhân, bí mật gia đình.')),
        FCard('Tài liệu, chứng cứ đã giao nộp · 4 tài liệu', h(F, null,
          h('p', { className: 'dt-grp-t' }, 'Nộp kèm đơn khởi kiện · 20/10/2026'), DtDocs([['Hợp đồng vay tài sản', 'Bản sao có chứng thực · Đã nộp lúc 20/10/2026 16:05'], ['Giấy nhận tiền', 'Bản chính · Đã nộp lúc 20/10/2026 16:05']], DOC_THE),
          h('p', { className: 'dt-grp-t' }, 'Giao nộp bổ sung · 24/10/2026'), DtDocs([['Sao kê chuyển khoản', 'Biên nhận BN-2026-0105'], ['Tin nhắn trao đổi', 'Biên nhận BN-2026-0105']], DOC_THE),
          h(T.Button, { variant: 'tint', icon: 'upload', className: 'ph-co-add', 'data-pt-go': 'evidence2' }, 'Giao nộp tài liệu, chứng cứ')), true),
        FCard('Tài liệu do Tòa án cung cấp · 0 tài liệu', h(F, null, P('Chưa có tài liệu, chứng cứ do Tòa án cung cấp.', 'ph-muted'),
          h(T.Button, { variant: 'tint', icon: 'plus', className: 'ph-co-add' }, 'Yêu cầu Tòa án thu thập chứng cứ')), true),
        FCard('Sao chụp tài liệu, chứng cứ', h(F, null, P('Đương sự và người bảo vệ quyền, lợi ích hợp pháp của đương sự có quyền yêu cầu sao chụp tài liệu, chứng cứ trong hồ sơ vụ án, trừ những tài liệu, chứng cứ không được phép sao chụp theo quy định pháp luật.', 'ph-muted'),
          h('div', { className: 'dt-acts dt-acts-col' }, h(T.Button, { variant: 'secondary', icon: 'copy', 'data-pt-go': 'caseCopy' }, 'Sao chụp tài liệu do đương sự khác xuất trình'), h(T.Button, { variant: 'secondary', icon: 'copy', 'data-pt-go': 'caseCopyCourt' }, 'Sao chụp tài liệu do Tòa án thu thập'))), true));
      if (t === 'judgments') return FCard('Bản án / Quyết định', h(F, null,
        DtDocs([['Quyết định đưa vụ án ra xét xử', 'Tuyên / ban hành ngày 21/10/2026 · ' + COURT1]], DOC_THE),
        h('button', { type: 'button', className: 'vk-link', 'data-pt-go': 'tl1' }, 'Yêu cầu cấp trích lục quyết định', h(T.Icon, { name: 'chevronRight' })),
        P('Trường hợp bản số hóa chưa sẵn sàng, Tòa án sẽ tống đạt bản giấy theo quy định (Điều 219 BLTTDS).', 'ph-muted dt-small')), true);
      return LsG1([['Quyết định đưa vụ án ra xét xử', '21/10/2026', 'Số 25/2026/QĐXXST-DS'], ['Thông báo thụ lý vụ án', '15/10/2026', 'Số 12/2026/TB-TLVA · ' + COURT1]]);
    } });
}

/* ---------- Giao nộp tài liệu, chứng cứ: bước 3 Xem lại & ký số + kết quả (theo web) ---------- */
function EviKy() {
  var ky = React.useState(false), sh = React.useState(false), anchor = React.useRef(null), host = useHost(anchor), da = ky[0];
  return Wz({ title: 'Giao nộp tài liệu, chứng cứ', steps: EVI_STEPS, n: 3, save: false, body: h(F, null, h('span', { ref: anchor, hidden: true }),
    FCard('Phiếu giao nộp', RvKV([['Hồ sơ, vụ án', h(F, null, h('span', { className: 'tp-num' }, 'DS-2026-0012'), ' · Tranh chấp hợp đồng vay tài sản')], ['Tòa án nhận', COURT1], ['Giai đoạn', 'Sơ thẩm'], ['Người giao nộp', 'Nguyên đơn'], ['Hình thức', 'Ký số cá nhân · nộp trực tuyến']]), true),
    FCard('Tài liệu giao nộp · 2', h('ol', { className: 'dt-num' }, h('li', null, h('b', null, 'Sao kê chuyển khoản'), h('small', null, 'sao-ke-chuyen-khoan.pdf')), h('li', null, h('b', null, 'Tin nhắn trao đổi'), h('small', null, 'tin-nhan.png'))), true),
    FCard('Biên bản giao nhận', h(F, null, Lead('Hệ thống tự lập, cần ký số trước khi giao nộp.'),
      h('ul', { className: 'ph-ky' },
        h('li', null, h('div', null, h('b', null, 'Biên bản giao nhận tài liệu, chứng cứ')), IcoBtn('eye', 'Xem biên bản')),
        h('li', null, h('span', { className: 'ph-ky-no' }, '1'), h('div', null, h('b', null, 'Hoàng Dương'), h('small', null, 'Người giao nộp'), da ? h('small', { className: 'ph-ky-da' }, KY_LUC) : null),
          da ? h(T.StatusBadge, { tone: 'success', icon: 'checkCircle' }, 'Đã ký') : h(T.Button, { size: 'sm', icon: 'pen', className: 'ph-ky-btn', onClick: function () { sh[1](true); } }, 'Ký số'))),
      da ? null : P('Cần ký số một lần cho biên bản và 2 tài liệu đính kèm trước khi giao nộp.', 'ph-muted dt-small'),
      Tf('Ghi chú gửi Tòa án', { multiline: true, placeholder: 'Không bắt buộc — VD: Văn bản xác nhận thường trú đang chờ UBND phường cấp, sẽ bổ sung trước 05/10/2026.' })), true, da ? 'signed' : 'unsigned'),
    h('div', { className: 'ph-commit' }, h(T.Checkbox, { label: 'Tôi cam đoan tài liệu, chứng cứ giao nộp là trung thực, bản điện tử đúng với bản gốc và chịu trách nhiệm trước pháp luật về tính hợp pháp của tài liệu.' })),
    sh[0] && host ? ReactDOM.createPortal(h(KySheet, { tep: ['bien-ban-giao-nhan.pdf', 'sao-ke-chuyen-khoan.pdf', 'tin-nhan.png'], onClose: function () { sh[1](false); }, onKy: function () { sh[1](false); ky[1](true); } }), host) : null),
    last: Btn('Ký số và giao nộp', 'primary', da ? { 'data-pt-go': 'replace:evidenceOk' } : { disabled: true, title: 'Cần ký số biên bản trước khi giao nộp' }) });
}
function Evidence3() { return h(EviKy); }
function EvidenceOk() {
  return h(Phone, { cls: 'ph-ok' },
    h(Body, { cls: 'ph-ok-b' },
      h('div', { className: 'ph-success' }, h('span', { className: 'ph-success-ico' }, h(T.Icon, { name: 'checkCircle' })), h('h2', null, 'Đã giao nộp 2 tài liệu'),
        P(h(F, null, 'Biên nhận điện tử số ', h('b', null, 'BN-2026-0105'), ' cho hồ sơ DS-2026-0012 đã gửi vào Hộp thư tống đạt. Thư ký Tòa án sẽ kiểm tra và xác nhận trong thời hạn [số ngày] ngày làm việc.'), 'ph-muted')),
      h('div', { className: 'ph-pd-warn dt-todo' }, h(T.Icon, { name: 'alert' }), h('div', null, h('p', null, h('b', null, 'Còn nghĩa vụ sao gửi cho đương sự khác')),
        h('p', { className: 'dt-todo-d' }, 'Theo Khoản 5 Điều 96 Bộ luật Tố tụng dân sự, người giao nộp tài liệu, chứng cứ phải sao gửi bản sao cho các đương sự khác. Nghĩa vụ chỉ hoàn tất khi đủ mọi đương sự phải nhận — Cổng theo dõi thủ tục người nhận.')))),
    h('div', { className: 'ph-col ph-ok-foot' }, Btn('Sao gửi cho đương sự khác', 'primary', { 'data-pt-go': 'sg1' }), Btn('Về chi tiết vụ án', 'secondary', { 'data-pt-go': 'reset:records,cases,caseDetail' }), Btn('Giao nộp tiếp', 'secondary', { 'data-pt-go': 'replace:evidence2' })));
}
/* v238 (04/11/2026): khối "Nội dung yêu cầu" ở chi tiết đơn theo 2 cách nhập ở bước 4 Soạn đơn – nhap: Cách nhập + nội dung đã nhập (thu gọn ~5 dòng, Xem đầy đủ / Thu gọn) + bản in đơn hệ thống tạo (đã ký số); file: Cách nhập + thẻ tệp đơn có sẵn (tên tài liệu, tệp · dung lượng, loại tài liệu, Đã ký số, Xem / Tải về) + ghi chú */
var DT_ND = ['Ngày 05/01/2026, tôi cho ông Trần Văn Bình vay 500.000.000 đồng, có hợp đồng vay tài sản và giấy nhận tiền do ông Bình ký. Hạn trả nợ là ngày 05/07/2026, lãi suất 0,8%/tháng.', 'Đến hạn, ông Bình chỉ trả 100.000.000 đồng tiền gốc. Tôi đã nhiều lần yêu cầu nhưng ông Bình không trả phần còn lại và tiền lãi.', 'Yêu cầu Tòa án giải quyết:', '1. Buộc ông Trần Văn Bình trả 400.000.000 đồng tiền gốc còn nợ;', '2. Buộc ông Trần Văn Bình trả tiền lãi chậm trả tính từ ngày 06/07/2026 đến ngày xét xử sơ thẩm.'];
function DtNoiDung(p) {
  var mo = React.useState(false);
  if (p.kieu === 'file') return h('div', { className: 'nd-v' },
    h('dl', { className: 'ph-rvkv' }, h('div', null, h('dt', null, 'Cách nhập nội dung'), h('dd', null, 'Tải đơn có sẵn'))),
    h('div', { className: 'nd-file' }, h('span', { className: 'nd-file-ic', 'aria-hidden': 'true' }, 'PDF'),
      h('div', { className: 'nd-file-tx' }, h('b', null, 'Đơn khởi kiện tự soạn'), h('small', null, 'don-khoi-kien-nguyen-minh-an.pdf · 1,2 MB'), h('small', null, 'Loại tài liệu: Đơn khởi kiện'),
        h(T.StatusBadge, { tone: 'success', icon: false }, 'Đã ký số')),
      h('div', { className: 'nd-file-b' }, IcoBtn('eye', 'Xem đơn'), IcoBtn('download', 'Tải về'))),
    h('p', { className: 'nd-note' }, h(T.Icon, { name: 'info' }), 'Nội dung đơn nằm trong tệp bạn đã tải lên. Mở tệp để xem đầy đủ.'));
  return h('div', { className: 'nd-v' },
    h('dl', { className: 'ph-rvkv' }, h('div', null, h('dt', null, 'Cách nhập nội dung'), h('dd', null, 'Nhập thông tin'))),
    h('div', { className: 'nd-text' + (mo[0] ? ' nd-open' : '') }, DT_ND.map(function (x, i) { return h('p', { key: i }, x); })),
    h('button', { type: 'button', className: 'vk-link nd-more', onClick: function () { mo[1](!mo[0]); } }, mo[0] ? 'Thu gọn' : 'Xem đầy đủ', h(T.Icon, { name: 'chevronDown', className: mo[0] ? 'nd-up' : undefined })),
    h('div', { className: 'nd-file nd-file-in' }, h('span', { className: 'nd-file-ic', 'aria-hidden': 'true' }, 'PDF'),
      h('div', { className: 'nd-file-tx' }, h('b', null, 'Bản in đơn khởi kiện'), h('small', null, 'Hệ thống tạo từ nội dung đã nhập · don-khoi-kien-TN-20261020-0012.pdf'), h(T.StatusBadge, { tone: 'success', icon: false }, 'Đã ký số')),
      h('div', { className: 'nd-file-b' }, IcoBtn('eye', 'Xem bản in đơn'))));
}
