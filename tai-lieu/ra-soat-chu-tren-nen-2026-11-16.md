# Rà soát chữ, trường thông tin nằm thẳng trên nền – prototype v387 (16/11/2026)

Quét 689 màn; 159 màn có chữ hoặc trường nằm thẳng trên nền xám. Không tính: trạng thái trống (biểu tượng + câu), hộp thoại, chân màn, dòng "Đang tải…" thoáng qua (inbox, method).

## N1 – Màn kết quả, màn chặn (66 màn)

Đề xuất: Khối nội dung (biểu tượng, tiêu đề, mô tả) và bảng mã/trạng thái, dòng ghi chú đặt trong dải trắng.

Màn: kcOk, kcsOk, kqhOk, ykcOk, ccOk, bptOk, bphOk, pbsOk, bsOk, evidenceOk, caseCopyOk, kctOk, kctOkrmp, kctOkrtb, ybsOk, prdOk, prdVAOk, yrdOk, ptdOk, ytdOk, pknOk, yknOk, mgOk, rdOk, sdOk, trOk, bpOk, sgOk, ptSusOk, ptCanOk, ratingOk, krOk, pxOk, yxOk, pykOk, yykOk, gxOk, txOk, grgdtOk, gsgdtOk, grttOk, gsttOk, success, tlOk, khcOk, ktcOk, kpaOk, bvOk, kvaOk, kvaOkTc, kvaOkL, kvaOkLTc, kvaOkErr, hgrOk, knSecondOk, knSecondTtOk, knNextOk, knOpinionOk, pknChan, financePayOpen, financePayClosed, ptSusNow, ptCanNow, grgdtChan, trChanThuLy, trChanChuaNhan

## N2 – Lời dẫn, dòng phụ đầu màn (46 màn)

Đề xuất: Đoạn dẫn ("Kiểm tra lại thông tin…", "Áp dụng với bản án…", trích yếu văn bản, căn cứ cam kết…) đặt trong dải trắng.

Màn: kc5, bpt1, bph1, pbs1, ybs1, prd1, prdVA1, yrd1, pkn1, ykn1, px6, yx6, pyk4, yyk4, gx1, gx1Manual, gx1Fixed, gx1Empty, gx5, gxAgain, tx1, tx1Manual, tx1Fixed, tx1Empty, tx5, txAgain, grgdt1, grtt1, grgdt1sua, grgdt1nhap, bvd4, bvd5, bvn4, bvn5, bvd4Nhap, bvd5KyLai, commitForm, commitFormNew, mediationDoc, mediationDocNoFile, cert, certCa, knSecond, knSecondTt, knNext, knOpinion

## N3 – Trường nhập nằm ngoài khối (19 màn)

Đề xuất: Ô nhập, ô chọn, khối sao đánh giá nằm ngoài khối được đặt trên dải trắng (các ô liền nhau nối thành một khối).

Màn: hgDelayNoPhien, hgChangeDt, hgDelayDt, hgChange, hgDelay, hgDelayView, ptSus1, ptCan1, rating, ratingErrDa, ratingErrHet, ratingErrHs, copySupp, copySuppLate, copyWithdraw, bvd1, bvn1, bvd1Err, bvn1Empty

## N4 – Dòng lỗi dưới khối tài liệu (7 màn)

Đề xuất: Dòng báo lỗi đặt ngay trong dải trắng của khối tài liệu.

Màn: pbs2err, gsgdt3Err, mg3Err, bp3Err, sd3Err, tr4Err, hgr3err

## N5 – Chọn loại đơn, nhóm thủ tục (5 màn)

Đề xuất: Mỗi nhóm (tiêu đề + các ô chọn) đặt trong dải trắng.

Màn: choose, chooseTc, sub1, sub1d, sub1Doi

## N6 – Lịch (8 màn)

Đề xuất: Ô tìm, số buổi, tiêu đề ngày/danh sách, trạng thái trống đặt trên dải trắng.

Màn: calPersonal, calWeek, calList, calEmpty, calEvent, calDue, calDueClash, calPast

## N7 – Khác (6 màn)

Đề xuất: Tiêu đề nhóm thông báo, số lần ký, số điểm trợ giúp, tiêu đề và ô chọn kỳ công bố đặt trên dải trắng.

Màn: notifications, signHist, signHistOpen, aid, ratingsPublic, ratingsPublicLow

---

# Bản sửa theo quy tắc mới (người dùng, 16/11/2026)

Chữ cố định (tiêu đề, lời dẫn, ghi chú, tiêu đề nhóm, số đếm) được để trên nền. Chỉ trường thông tin (ô nhập, ô chọn, ô chọn dạng thẻ, sao đánh giá, dữ liệu nhãn – giá trị) đặt trong khối trắng; các trường liền nhau dùng chung một khối. Kèm 7 màn có dòng lỗi gắn với khối tài liệu (pbs2err, gsgdt3Err, mg3Err, bp3Err, sd3Err, tr4Err, hgr3err).

Số màn có trường thông tin nằm trên nền: 74.

## Màn kết quả – bảng mã, trạng thái (40 màn)

kcsOk, kqhOk, pbsOk, bsOk, kctOk, kctOkrmp, kctOkrtb, ybsOk, prdOk, prdVAOk, yrdOk, ptdOk, ytdOk, pknOk, yknOk, mgOk, rdOk, sdOk, trOk, bpOk, krOk, grgdtOk, gsgdtOk, grttOk, gsttOk, success, tlOk, khcOk, ktcOk, kpaOk, kvaOk, kvaOkTc, kvaOkL, kvaOkLTc, kvaOkErr, hgrOk, knSecondOk, knSecondTtOk, knNextOk, knOpinionOk

## Lịch – ô tìm (8 màn)

calPersonal, calWeek, calList, calEmpty, calEvent, calDue, calDueClash, calPast

## Chọn loại đơn, nhóm thủ tục (5 màn)

choose, sub1Doi, sub1, sub1d, chooseTc

## Trường nhập nằm ngoài khối (21 màn)

hgDelayNoPhien, hgChangeDt, hgDelayDt, hgChange, hgDelay, hgDelayView, ptSus1, ptCan1, rating, ratingsPublic, ratingErrDa, ratingErrHet, ratingErrHs, ratingsPublicLow, knSecond, knSecondTt, knNext, knOpinion, copySupp, copySuppLate, copyWithdraw
