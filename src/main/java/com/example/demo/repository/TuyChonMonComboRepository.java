package com.example.demo.repository;

import com.example.demo.entity.TuyChonMonCombo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Map;

@Repository
public interface TuyChonMonComboRepository extends JpaRepository<TuyChonMonCombo, String> {

    @Query(value = "SELECT tc.maSlot, tc.maGia, tc.phiPhuThu, tc.isMacDinh, sp.tenSanPham, mg.maSize " +
                   "FROM TuyChonMonComBo tc " +
                   "JOIN MaGia mg ON tc.maGia = mg.maGia " +
                   "JOIN SanPham sp ON mg.maSanPham = sp.maSanPham " +
                   "WHERE tc.maSlot IN (SELECT maSlot FROM SlotChonCombo WHERE maSanPham = :maSanPham)", 
           nativeQuery = true)
    List<Map<String, Object>> layChiTietTuyChonCuaCombo(@Param("maSanPham") String maSanPham);
}