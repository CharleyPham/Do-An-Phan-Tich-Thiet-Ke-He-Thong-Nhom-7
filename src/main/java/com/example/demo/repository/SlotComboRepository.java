package com.example.demo.repository;

import com.example.demo.entity.SlotCombo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface SlotComboRepository extends JpaRepository<SlotCombo, String> {
    // Tự động sinh câu lệnh tìm danh sách các Slot dựa theo mã sản phẩm Combo
    List<SlotCombo> findByMaSanPham(String maSanPham);
}