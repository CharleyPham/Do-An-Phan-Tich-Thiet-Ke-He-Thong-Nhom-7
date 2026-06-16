package com.example.demo.controller;

import com.example.demo.dto.DatHangRequest;
import com.example.demo.entity.ChiTietHoaDon;
import com.example.demo.entity.HoaDon;
import com.example.demo.entity.MaGia;
import com.example.demo.repository.ChiTietHoaDonRepository;
import com.example.demo.repository.HoaDonRepository;
import com.example.demo.repository.MaGiaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Map;

@RestController
@RequestMapping("/api/hoadon")
@CrossOrigin(origins = "*")
public class HoaDonController {

    @Autowired
    private HoaDonRepository hoaDonRepository;

    @Autowired
    private ChiTietHoaDonRepository chiTietHoaDonRepository;

    @Autowired
    private MaGiaRepository maGiaRepository;

    @PostMapping("/thanhtoan")
    public String thanhToan(@RequestBody DatHangRequest request) {   // sửa tên thanhToan  thành tạo Hóa đơn
        // 1. Lưu thông tin chung vào bảng HoaDon
        HoaDon hd = new HoaDon();
        String maHD = "HD_" + System.currentTimeMillis(); // Tạo mã hóa đơn dựa trên thời gian thực
        hd.setMaHoaDon(maHD);
        hd.setPhuongThucTT(request.getPhuongThucTT());
        hd.setNgayLap(LocalDateTime.now());
        hd.setSoThuTu((int)(Math.random() * 100) + 1); // Cấp số thứ tự lấy đồ từ 1 đến 100

        hoaDonRepository.save(hd);

        // Từ điển dịch Size từ Frontend (chữ thường) sang SQL (Viết hoa)
        Map<String, String> mapSize = Map.of(
                "be", "SIZE_BE",
                "vua", "SIZE_VUA",
                "lon", "SIZE_LON"
        );

        // 2. Lưu từng món vào bảng ChiTietHoaDon
        for (DatHangRequest.MonDat mon : request.getChiTiet()) {
            String maSizeSQL = (mon.getSize() != null) ? mapSize.get(mon.getSize()) : null;

            // Nhờ Repository tra cứu xem SP_PEPSI + SIZE_LON thì ra mã giá gì
            MaGia maGiaObj = maGiaRepository.timMaGia(mon.getId(), maSizeSQL);

            if (maGiaObj != null) {
                ChiTietHoaDon cthd = new ChiTietHoaDon();
                cthd.setMaHoaDon(maHD);
                cthd.setMaGia(maGiaObj.getMaGia());
                cthd.setSoLuong(mon.getSoLuong());

                chiTietHoaDonRepository.save(cthd);
            }
        }

        // Trả về báo cáo thành công kèm mã hóa đơn cho Frontend in ra màn hình
        return "{\"status\": \"success\", \"maHoaDon\": \"" + maHD + "\"}";
    }
}