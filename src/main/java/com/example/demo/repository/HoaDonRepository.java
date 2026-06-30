package com.example.demo.repository;

import com.example.demo.entity.HoaDon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;

@Repository
public interface HoaDonRepository extends JpaRepository<HoaDon, String> {

    // Hàm này giúp Controller đếm xem hôm nay đã có bao nhiêu đơn hàng
    @Query("SELECT COALESCE(MAX(h.soThuTu), 0) FROM HoaDon h WHERE YEAR(h.ngayLap) = YEAR(?1) AND MONTH(h.ngayLap) = MONTH(?1) AND DAY(h.ngayLap) = DAY(?1)")
    Integer getMaxSoThuTuTrongNgay(LocalDateTime date);
}