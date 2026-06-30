package com.example.demo.repository;

import com.example.demo.entity.TuyChinhComboHoaDon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TuyChinhComboHoaDonRepository extends JpaRepository<TuyChinhComboHoaDon, Integer> {
}