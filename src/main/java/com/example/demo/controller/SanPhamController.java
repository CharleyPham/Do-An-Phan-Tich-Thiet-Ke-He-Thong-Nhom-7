package com.example.demo.controller;

import com.example.demo.dto.SanPhamChiTiet;
import com.example.demo.entity.SlotCombo;
import com.example.demo.repository.SanPhamRepository;
import com.example.demo.repository.SlotComboRepository;
import com.example.demo.repository.TuyChonMonComboRepository;


import java.util.Map;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/sanpham")
@CrossOrigin(origins = "*")
public class SanPhamController {

    private final SanPhamRepository sanPhamRepository;
    private final SlotComboRepository slotComboRepository;
    @Autowired
private TuyChonMonComboRepository tuyChonMonComboRepository;

    public SanPhamController(SanPhamRepository sanPhamRepository, SlotComboRepository slotComboRepository) {
        this.sanPhamRepository = sanPhamRepository;
        this.slotComboRepository = slotComboRepository;
    }

    // ==========================================
    // BỔ SUNG THÊM HÀM NÀY ĐỂ TRẢ VỀ DỮ LIỆU:
    // ==========================================
    @GetMapping
    public List<SanPhamChiTiet> layTatCaSanPham() {
        // Hàm này sẽ gọi xuống Repository để lấy danh sách SanPhamChiTiet từ SQL Server
        return sanPhamRepository.layToanBoMenu(); 
        
        // Lưu ý: Nếu trong repository của bạn đặt tên hàm lấy danh sách khác 
        // (ví dụ: findAll() hoặc một hàm custom Query nào đó), hãy đổi tên hàm cho đúng nhé!
    }

   // API lấy các slot lựa chọn của một món Combo dựa trên maSanPham
@GetMapping("/combo/{maSanPham}")
public List<SlotCombo> laySlotCuaCombo(@PathVariable String maSanPham) {
    // Hàm này sẽ vào bảng SlotChonCombo quét xem mã SP_CB3 có những slot nào và trả về
    return slotComboRepository.findByMaSanPham(maSanPham);
}


@GetMapping("/combo/{maSanPham}/options")
public List<Map<String, Object>> layOptionsCuaCombo(@PathVariable String maSanPham) {
    return tuyChonMonComboRepository.layChiTietTuyChonCuaCombo(maSanPham);
}

}