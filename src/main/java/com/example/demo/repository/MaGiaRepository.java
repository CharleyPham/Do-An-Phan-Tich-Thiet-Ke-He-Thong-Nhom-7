package com.example.demo.repository;

import com.example.demo.entity.MaGia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface MaGiaRepository extends JpaRepository<MaGia, String> {

    // Tìm mã giá khớp với Món và Size. Hàm ISNULL giúp xử lý mượt mà cả các món không có size.
    @Query(value = "SELECT TOP 1 * FROM MaGia WHERE maSanPham = :maSanPham AND ISNULL(maSize, '') = ISNULL(:maSize, '')", nativeQuery = true)
    MaGia timMaGia(@Param("maSanPham") String maSanPham, @Param("maSize") String maSize);
}