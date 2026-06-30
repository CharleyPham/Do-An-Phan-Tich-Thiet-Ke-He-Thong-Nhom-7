package com.example.demo.controller;

import com.example.demo.entity.HoaDon;
import com.example.demo.entity.ChiTietHoaDon;
import com.example.demo.entity.TuyChinhComboHoaDon;
import com.example.demo.entity.MaGia;
import com.example.demo.repository.HoaDonRepository;
import com.example.demo.repository.ChiTietHoaDonRepository;
import com.example.demo.repository.MaGiaRepository;
import com.example.demo.repository.TuyChinhComboHoaDonRepository;
import com.example.demo.dto.DatHangRequest;
import com.example.demo.dto.TuyChinhComboRequest;

import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/hoadon")
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.POST, RequestMethod.GET})
public class HoaDonController {

    private final HoaDonRepository hoaDonRepository;
    private final ChiTietHoaDonRepository chiTietHoaDonRepository;
    private final MaGiaRepository maGiaRepository;
    private final TuyChinhComboHoaDonRepository tuyChinhComboHoaDonRepository;

    public HoaDonController(HoaDonRepository hoaDonRepository,
                            ChiTietHoaDonRepository chiTietHoaDonRepository,
                            MaGiaRepository maGiaRepository,
                            TuyChinhComboHoaDonRepository tuyChinhComboHoaDonRepository) {
        this.hoaDonRepository = hoaDonRepository;
        this.chiTietHoaDonRepository = chiTietHoaDonRepository;
        this.maGiaRepository = maGiaRepository;
        this.tuyChinhComboHoaDonRepository = tuyChinhComboHoaDonRepository;
    }

    @PostMapping("/thanhtoan")
    @Transactional
    public ResponseEntity<String> thanhToan(@RequestBody DatHangRequest request) {

        System.out.println("--- BẮT ĐẦU XỬ LÝ THANH TOÁN (TÍNH TỔNG TIỀN) ---");
        HoaDon hd = new HoaDon();
        String maHD = "HD_" + System.currentTimeMillis();
        hd.setMaHoaDon(maHD);
        hd.setPhuongThucTT(request.getPhuongThucTT());

        LocalDateTime thoiGianHienTai = LocalDateTime.now();
        hd.setNgayLap(thoiGianHienTai);

        Integer sttMoiNhat = hoaDonRepository.getMaxSoThuTuTrongNgay(thoiGianHienTai);
        if (sttMoiNhat == null) {
            sttMoiNhat = 0;
        }
        hd.setSoThuTu(sttMoiNhat + 1);

        // Khởi tạo biến lưu tổng tiền đơn hàng
        BigDecimal tongTienDonHang = BigDecimal.ZERO;

        // BƯỚC 1: Gán tạm tổng tiền bằng 0 và LƯU TRƯỚC HoaDon để tạo bản ghi khóa chính dưới Database
        hd.setTongTien(BigDecimal.ZERO);
        hoaDonRepository.saveAndFlush(hd);

        for (DatHangRequest.MonDat mon : request.getChiTiet()) {

            // Thử tìm kiếm trực tiếp bằng Id nhận được từ Frontend
            MaGia maGiaObj = maGiaRepository.findById(mon.getId()).orElse(null);

            // NẾU TÌM BẰNG ID KHÔNG RA -> CHUYỂN SANG TÌM THEO SẢN PHẨM & SIZE (Dành cho các sản phẩm có chọn Kích thước)
            if (maGiaObj == null && mon.getSize() != null && !mon.getSize().isEmpty()) {
                String maSanPham = mon.getId();
                
                if (maSanPham.startsWith("MG_")) {
                    maSanPham = maSanPham.replace("MG_", "SP_");
                }
                
                String sizeFE = mon.getSize().toUpperCase();

                String maSizeDB = "SIZE_" + sizeFE;
                if (sizeFE.equals("BE")) {
                    maSizeDB = "SIZE_S";
                } else if (sizeFE.equals("VUA")) {
                    maSizeDB = "SIZE_R";
                } else if (sizeFE.equals("LON")) {
                    maSizeDB = "SIZE_L";
                }

                maGiaObj = maGiaRepository.findByMaSanPhamAndMaSize(maSanPham, maSizeDB);

                if (maGiaObj == null) {
                    String shortSize = sizeFE.equals("BE") ? "S" : (sizeFE.equals("VUA") ? "R" : "L");
                    maGiaObj = maGiaRepository.findByMaSanPhamAndMaSize(maSanPham, shortSize);
                }

                if (maGiaObj == null) {
                    maGiaObj = maGiaRepository.findByMaSanPhamAndMaSize(maSanPham, "SIZE_" + sizeFE);
                }
            }

            // SỬA LỖI KHÓA NGOẠI (FOREIGN KEY) DỰ PHÒNG
            if (maGiaObj == null) {
                String maSanPhamGoc = mon.getId();
                if (maSanPhamGoc.startsWith("MG_")) {
                    maSanPhamGoc = maSanPhamGoc.replace("MG_", "SP_");
                }

                System.out.println("CẢNH BÁO: Không tìm thấy giá đúng Size cho sản phẩm: " + maSanPhamGoc + ". Tiến hành tìm kiếm mã giá thay thế hợp lệ dưới Database...");

                maGiaObj = maGiaRepository.findByMaSanPhamAndMaSize(maSanPhamGoc, "SIZE_R");
                if (maGiaObj == null) maGiaObj = maGiaRepository.findByMaSanPhamAndMaSize(maSanPhamGoc, "SIZE_S");
                if (maGiaObj == null) maGiaObj = maGiaRepository.findByMaSanPhamAndMaSize(maSanPhamGoc, "SIZE_L");
                if (maGiaObj == null) maGiaObj = maGiaRepository.findByMaSanPhamAndMaSize(maSanPhamGoc, "R");
                if (maGiaObj == null) maGiaObj = maGiaRepository.findByMaSanPhamAndMaSize(maSanPhamGoc, "S");
                if (maGiaObj == null) maGiaObj = maGiaRepository.findByMaSanPhamAndMaSize(maSanPhamGoc, "L");
            }

            if (maGiaObj == null) {
                System.err.println("LỖI NGHIÊM TRỌNG: Mã sản phẩm '" + mon.getId() + "' chưa được gán bất kỳ mức giá nào trong bảng MaGia! Bỏ qua món này để tránh lỗi hệ thống.");
                continue;
            }

            // --- ĐOẠN XỬ LÝ TÍNH TOÁN GIÁ TIỀN CHO DÒNG SẢN PHẨM HIỆN TẠI ---
            BigDecimal giaCoSoMonAn = BigDecimal.valueOf(maGiaObj.getGia());
            BigDecimal phuThuCuaDong = BigDecimal.ZERO;

            // Lưu dữ liệu vào bảng ChiTietHoaDon (Gọi an toàn vì bản ghi cha đã tồn tại)
            ChiTietHoaDon cthd = new ChiTietHoaDon();
            cthd.setMaHoaDon(maHD);
            cthd.setMaGia(maGiaObj.getMaGia());
            cthd.setSoLuong(mon.getSoLuong());

            chiTietHoaDonRepository.saveAndFlush(cthd);

            // Xử lý lưu các tùy chỉnh món con đi kèm nếu mặt hàng là Combo có chỉnh sửa
            if (mon.getTuyChinhCombo() != null && !mon.getTuyChinhCombo().isEmpty()) {
                for (TuyChinhComboRequest tcDto : mon.getTuyChinhCombo()) {
                    TuyChinhComboHoaDon entity = new TuyChinhComboHoaDon();
                    entity.setMaHoaDon(maHD);
                    entity.setMaCombo(maGiaObj.getMaGia());
                    entity.setMaSlot(tcDto.getMaSlot());
                    entity.setMaGiaSauDoi(tcDto.getMaGiaSauDoi());
                    entity.setPhiPhuThuThucTe(tcDto.getPhiPhuThuThucTe());

                    tuyChinhComboHoaDonRepository.saveAndFlush(entity);

                    // Cộng dồn phí phụ thu thực tế của tùy chọn Combo (nếu có)
                    if (tcDto.getPhiPhuThuThucTe() != null) {
                        phuThuCuaDong = phuThuCuaDong.add(tcDto.getPhiPhuThuThucTe());
                    }
                }
            }

            // Tính toán tiền để cộng dồn vào hóa đơn lớn
            BigDecimal giaCuoiCungCuaMon = giaCoSoMonAn.add(phuThuCuaDong);
            BigDecimal thanhTienCuaDong = giaCuoiCungCuaMon.multiply(BigDecimal.valueOf(mon.getSoLuong()));
            tongTienDonHang = tongTienDonHang.add(thanhTienCuaDong);
        }

        // BƯỚC 2: Cập nhật lại giá trị tổng tiền thực tế tính được vào thực thể HoaDon ban đầu
        hd.setTongTien(tongTienDonHang);
        
        // Tiến hành ghi đè (UPDATE) bản ghi hóa đơn hoàn chỉnh xuống Database
        hoaDonRepository.saveAndFlush(hd);

        System.out.println("--- XỬ LÝ THANH TOÁN THÀNH CÔNG HÓA ĐƠN: " + maHD + " | TỔNG TIỀN: " + tongTienDonHang + " ---");
        return ResponseEntity.ok("{\"status\": \"success\", \"maHoaDon\": \"" + maHD + "\"}");
    }
}