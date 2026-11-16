# Việc cần làm – Danh sách đơn và tiến trình (v379, 16/11/2026)

Nguồn hành động: DM_HANHDONG có đường dẫn (CSDL 10.14.142.30), bỏ "Xem đơn". Trạng thái, tình trạng: hành động ma trận theo `Hanh_dong_theo_trang_thai (1).xlsx` (DM-03); hành động khác theo DM_TINHTRANG_HANHDONG + DM_TINHTRANG; "suy ra" = không có trong hai nguồn. Hạn là dữ liệu mẫu để thể hiện 3 màu thẻ việc.

| Thẻ | Tab | Mã hành động | Việc cần làm | Hạn mẫu | Trạng thái | Tình trạng đơn | Tình trạng vụ án | Mở màn | Nguồn |
|---|---|---|---|---|---|---|---|---|---|
| 1 | Đơn khởi kiện | ACTION_021 | Sửa đổi, bổ sung đơn khởi kiện | Còn 5 ngày | Đang xử lý | Yêu cầu sửa đổi, bổ sung đơn | — | sd1 | DM-03 |
| 1 | Đơn khởi kiện | BO_SUNG_SUA_DOI_DON | Bổ sung | Không có thời hạn | Đang xử lý | Yêu cầu sửa đổi, bổ sung đơn | — | appYcFiles | CSDL |
| 2 | Đơn khởi kiện | KY_DON | Ký đơn | Không có thời hạn | Chờ ký số | Chờ đủ chữ ký của các nguyên đơn | — | appDetailSign | CSDL |
| 3 | Đơn khởi kiện | TIEP_TUC_SOAN | Tiếp tục soạn | Không có thời hạn | Chưa gửi | Lưu tạm | — | sub1 | CSDL |
| 5 | Đơn khởi kiện | ACTION_010 | Cung cấp tài liệu, chứng cứ theo yêu cầu của Tòa án | Còn 2 ngày | Đang xử lý | Đã thụ lý | Yêu cầu bổ sung tài liệu, chứng cứ | cc1 | DM-03 |
| 6 | Đơn khởi kiện | BO_SUNG_TAI_LIEU_CHUNG_CU | Bổ sung tài liệu, chứng cứ | Không có thời hạn | Đang xử lý | Đã thụ lý | Yêu cầu bổ sung tài liệu, chứng cứ | appYcFiles | CSDL |
| 7 | Đơn khởi kiện | ACTION_017 | Nộp tiền tạm ứng án phí | Quá hạn 1 ngày | Đang xử lý | Chờ nộp tạm ứng án phí / lệ phí | — | finance | DM-03 |
| 8 | Đơn khởi kiện | ACTION_022 | Nộp tiền tạm ứng chi phí tố tụng | Còn 5 ngày | Đang xử lý | Chờ nộp tạm ứng chi phí tố tụng | — | finance | DM-03 |
| 9 | Đơn yêu cầu việc dân sự | ACTION_034 | Nộp lệ phí giải quyết việc dân sự | Còn 2 ngày | Đang xử lý | Chờ nộp tạm ứng án phí / lệ phí | — | finance | DM-03 |
| 10 | Đơn kháng cáo | ACTION_018 | Nộp tiền tạm ứng án phí phúc thẩm và nộp biên lai cho Tòa án | Quá hạn 1 ngày | Đang xử lý | Chờ nộp tạm ứng án phí phúc thẩm | — | finance | DM-03 |
| 11 | Đơn khởi kiện | ACTION_015 | Khiếu nại việc trả lại đơn khởi kiện | Còn 5 ngày | Đã xử lý | Đã trả lại đơn | — | kqd1Tong | DM-03 |
| 12 | Đơn khởi kiện | ACTION_008 | Khiếu nại lên Chánh án Tòa án trên một cấp trực tiếp | Còn 2 ngày | Đã xử lý | Đã giải quyết khiếu nại — giữ nguyên việc trả lại đơn | — | kqd1L | DM-03 |
| 13 | Đơn yêu cầu việc dân sự | ACTION_026 | Khiếu nại việc trả lại đơn yêu cầu | Quá hạn 1 ngày | Đã xử lý | Đã trả lại đơn | — | kqd1Tong | DM-03 |
| 14 | Đơn khởi kiện | ACTION_129 | Khiếu nại quyết định về biện pháp khẩn cấp tạm thời | Còn 5 ngày | Đang xử lý | Đã thụ lý | — | kqd1Tong | DM-03 |
| 15 | Đơn khởi kiện | ACTION_130 | Khiếu nại quyết định đưa vụ án ra xét xử theo thủ tục rút gọn | Còn 2 ngày | Đang xử lý | Đã thụ lý | Đã có QĐ đưa ra xét xử theo thủ tục rút gọn | kqd1Tong | DM-03 |
| 16 | Đơn khởi kiện | ACTION_132 | Khiếu nại văn bản, thông báo tố tụng khác (dân sự 15 ngày, hành chính 10 ngày) | Quá hạn 1 ngày | Đang xử lý | Đã thụ lý | Đã thụ lý — chuẩn bị xét xử | kqd1Tong | suy ra |
| 17 | Đơn khởi kiện | ACTION_133 | Khiếu nại quyết định chuyển hồ sơ vụ việc cho Tòa án khác (3 ngày làm việc) | Còn 5 ngày | Đang xử lý | Đã chuyển Tòa án khác | — | kqd1Tong | suy ra |
| 18 | Đơn khởi kiện | ACTION_004 | Kháng cáo bản án, quyết định sơ thẩm | Còn 2 ngày | Đã xử lý | Đã xét xử — có bản án / quyết định | Đã tuyên án / ra quyết định sơ thẩm | kc1 | DM-03 |
| 19 | Đơn khởi kiện | NOP_DON_KHANG_CAO | Nộp đơn kháng cáo | Không có thời hạn | Đã xử lý | Đã xét xử — có bản án / quyết định | Đã tuyên án / ra quyết định sơ thẩm | kc1 | CSDL |
| 20 | Đơn yêu cầu việc dân sự | ACTION_006 | Kháng cáo quyết định giải quyết việc dân sự | Quá hạn 1 ngày | Đã xử lý | Đã xét xử — có bản án / quyết định | Đã tuyên án / ra quyết định sơ thẩm | kc1 | DM-03 |
| 21 | Đơn khởi kiện | ACTION_007 | Kháng cáo quyết định tạm đình chỉ | Còn 5 ngày | Đang xử lý | Đã thụ lý | Tạm đình chỉ | kc1 | DM-03 |
| 22 | Đơn khởi kiện | KHANG_CAO_QD_TAM_DINH_CHI | Kháng cáo quyết định tạm đình chỉ | Không có thời hạn | Đang xử lý | Đã thụ lý | Tạm đình chỉ | kc1 | CSDL |
| 23 | Đơn khởi kiện | ACTION_014 | Kháng cáo quyết định đình chỉ | Còn 2 ngày | Đang xử lý | Đã thụ lý | Đình chỉ | kc1 | DM-03 |
| 24 | Đơn khởi kiện | KHANG_CAO_QD_DINH_CHI | Kháng cáo quyết định đình chỉ | Không có thời hạn | Đang xử lý | Đã thụ lý | Đình chỉ | kc1 | CSDL |
| 25 | Đơn khởi kiện | ACTION_033 | Kháng cáo quyết định đình chỉ giải quyết việc dân sự | Quá hạn 1 ngày | Đang xử lý | Đã thụ lý | Đình chỉ | kc1 | DM-03 |
| 26 | Đơn khởi kiện | KHANG_CAO_QD_CONG_NHAN | Kháng cáo quyết định công nhận | Không có thời hạn | Đã xử lý | Hòa giải thành — đã công nhận | Đã công nhận sự thỏa thuận | kc1 | CSDL |
| 27 | Đơn kháng cáo | ACTION_016 | Làm lại hoặc sửa đổi, bổ sung đơn kháng cáo | Còn 5 ngày | Đang xử lý | Yêu cầu làm lại / sửa đổi đơn kháng cáo | — | kcs1 | DM-03 |
| 28 | Đơn kháng cáo | SUA_DOI_DON_KHANG_CAO | Làm lại / sửa đổi đơn kháng cáo | Không có thời hạn | Đang xử lý | Yêu cầu làm lại / sửa đổi đơn kháng cáo | — | kc1 | CSDL |
| 29 | Đơn kháng cáo | ACTION_020 | Trình bày lý do và xuất trình chứng cứ về việc kháng cáo quá hạn | Còn 2 ngày | Đang xử lý | Đang xem xét lý do kháng cáo quá hạn | — | kqh1 | DM-03 |
| 30 | Đơn kháng cáo | ACTION_009 | Gửi văn bản nêu ý kiến về nội dung kháng cáo | Quá hạn 1 ngày | Đang xử lý | Vụ án có kháng cáo | — | ykc1 | DM-03 |
| 31 | Đơn khởi kiện | ACTION_011 | Trả lời lựa chọn hòa giải - vụ việc dân sự | Còn 5 ngày | Đang xử lý | Chờ lựa chọn hòa giải / đối thoại (lần 1) | — | hgReply | DM-03 |
| 32 | Đơn khởi kiện | CHON_HOA_GIAI_VIEN | Chọn Hòa giải viên | Không có thời hạn | Đang xử lý | Chờ lựa chọn hòa giải / đối thoại (lần 1) | — | hgReply | CSDL |
| 33 | Đơn khởi kiện | TRA_LOI_LUA_CHON_HOA_GIAI | Trả lời lựa chọn hòa giải | Không có thời hạn | Đang xử lý | Chờ lựa chọn hòa giải / đối thoại (lần 2) | — | hgChange | CSDL |
| 34 | Đơn khởi kiện | ACTION_012 | Đề nghị thay đổi hòa giải viên | Còn 2 ngày | Đang xử lý | Đã chỉ định Hòa giải viên | — | hgChange | DM-03 |
| 35 | Đơn khởi kiện | ACTION_128 | Đề nghị hoãn phiên hòa giải | Quá hạn 1 ngày | Đang xử lý | Đang hòa giải / đối thoại tiền tố tụng | — | hgDelay | DM-03 |
| 36 | Đơn khởi kiện | ACTION_200 | Tham gia phiên tòa trực tuyến | Không có thời hạn | Đang xử lý | Đã xếp lịch phiên hòa giải | — | snack:Đang mở phòng họp trực tuyến | CSDL |
| 37 | Đơn khởi kiện | XEM_LICH_PHIEN_HOP | Xem lịch phiên họp | Không có thời hạn | Đang xử lý | Chờ phiên họp ghi nhận kết quả hòa giải | — | mediationDetail | CSDL |
| 38 | Đơn khởi kiện | ACTION_027 | Đề nghị xem xét kết quả công nhận hòa giải | Còn 5 ngày | Đã xử lý | Công nhận kết quả hòa giải tiền tố tụng — kết thúc | — | hgReview | DM-03 |
| 39 | Đơn khởi kiện | ACTION_013 | Trả lời bằng lựa chọn hòa giải - vụ việc hành chính | Còn 2 ngày | Đang xử lý | Chờ lựa chọn hòa giải / đối thoại (lần 1) | — | hgReply | DM-03 |
| 40 | Đơn khởi kiện | ACTION_023 | Đề nghị thay đổi đối thoại viên | Quá hạn 1 ngày | Đang xử lý | Đã chỉ định Hòa giải viên | — | hgChange | DM-03 |
| 41 | Đơn khởi kiện | ACTION_002, ACTION_003, ACTION_005, ACTION_036, ACTION_037, ACTION_040 | Xem Lịch | Còn 5 ngày | Đang xử lý | Đã thụ lý | Phiên tòa hoãn | calEvent | DM-03 |
| 42 | Đơn khởi kiện | HOAN_PHIEN_TOA | Đề nghị hoãn phiên tòa | Còn 2 ngày | Đang xử lý | Đã thụ lý | Đã có QĐ đưa vụ án ra xét xử | caseDetailHoan | DM-03 |
| 43 | Đơn khởi kiện | XEM_LICH_PHIEN_TOA | Xem lịch phiên tòa | Không có thời hạn | Đang xử lý | Đã thụ lý | Đã có QĐ đưa vụ án ra xét xử | caseDetail | CSDL |
| 44 | Đơn khởi kiện | XEM_LICH_PHIEN_TOA_MOI | Xem lịch phiên tòa mới | Không có thời hạn | Đang xử lý | Đã thụ lý | Phiên tòa hoãn | caseDetail | CSDL |
| 45 | Đơn khởi kiện | XEM_LICH_PHIEN_TOA_PHUC_THAM | Xem lịch phiên tòa phúc thẩm | Không có thời hạn | Đang xử lý | Đã thụ lý | Đã có QĐ đưa ra xét xử phúc thẩm | caseDetail | CSDL |
| 46 | Đơn khởi kiện | XEM_VU_AN | Xem vụ án | Không có thời hạn | Đang xử lý | Đã thụ lý | [Tình trạng vụ án] | caseDetail | suy ra |
| 47 | Đơn khởi kiện | ACTION_042 | Nộp đơn phản tố | Quá hạn 1 ngày | Đang xử lý | Đã thụ lý | Đã thụ lý — chuẩn bị xét xử | px1 | DM-03 |
| 48 | Đơn phản tố, YCĐL | ACTION_049 | Sửa đổi, bổ sung đơn phản tố | Còn 5 ngày | Đang xử lý | Yêu cầu sửa đổi, bổ sung đơn | — | pbs1 | DM-03 |
| 49 | Đơn khởi kiện | ACTION_045 | Đề nghị thay đổi biện pháp khẩn cấp tạm thời | Còn 2 ngày | Đang xử lý | Đã thụ lý | — | bpt1 | DM-03 |
| 50 | Đơn khởi kiện | ACTION_046 | Đề nghị hủy bỏ biện pháp khẩn cấp tạm thời | Quá hạn 1 ngày | Đang xử lý | Đã thụ lý | — | bph1 | DM-03 |
| 51 | Đơn khởi kiện | ACTION_001 | Đề nghị xem xét theo thủ tục giám đốc thẩm | Còn 5 ngày | Đã xử lý | Hòa giải thành — đã công nhận | Đã công nhận sự thỏa thuận | gx1 | DM-03 |
| 52 | Đơn GĐT, tái thẩm | ACTION_019 | Sửa đổi, bổ sung đơn đề nghị giám đốc thẩm / tái thẩm | Còn 2 ngày | Đang xử lý | Yêu cầu sửa đổi, bổ sung đơn đề nghị | — | gsgdt1 | DM-03 |
| 53 | Đơn yêu cầu việc dân sự | ACTION_028 | Sửa đổi, bổ sung đơn yêu cầu | Quá hạn 1 ngày | Đang xử lý | Yêu cầu sửa đổi, bổ sung đơn | — | sd1 | DM-03 |
| 54 | Đơn khởi kiện | XEM_KET_QUA | Xem kết quả | Không có thời hạn | Đã xử lý | [Tình trạng đã xử lý của đơn] | — | appTabVb | suy ra |
