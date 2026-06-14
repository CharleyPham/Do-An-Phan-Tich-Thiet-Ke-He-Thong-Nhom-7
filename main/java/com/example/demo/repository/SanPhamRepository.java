package com.example.demo.repository;

import com.example.demo.entity.SanPham;
import com.example.demo.dto.SanPhamChiTiet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SanPhamRepository extends JpaRepository<SanPham, String> {

    @Query(value = "SELECT sp.maSanPham, sp.tenSanPham, sp.maDanhMuc, mg.maSize, mg.Gia " +
            "FROM SanPham sp LEFT JOIN MaGia mg ON sp.maSanPham = mg.maSanPham",
            nativeQuery = true)
    List<SanPhamChiTiet> layToanBoMenu();
}