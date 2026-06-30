package com.example.demo.repository;

import com.example.demo.entity.SanPham;
import com.example.demo.dto.SanPhamChiTiet; // Hoặc package chứa Interface Projection của bạn
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface SanPhamRepository extends JpaRepository<SanPham, String> {

    // Lấy toàn bộ menu và map kèm theo giá, trạng thái hoạt động
    @Query(value = "SELECT sp.maSanPham, sp.tenSanPham, sp.maDanhMuc, mg.maSize, mg.Gia, sp.isCombo AS isCombo " +
                   "FROM SanPham sp " +
                   "LEFT JOIN MaGia mg ON sp.maSanPham = mg.maSanPham " +
                   "WHERE sp.tinhTrang = 1", // Chỉ lấy các món đang bán (True)
           nativeQuery = true)
    List<SanPhamChiTiet> layToanBoMenu();
}