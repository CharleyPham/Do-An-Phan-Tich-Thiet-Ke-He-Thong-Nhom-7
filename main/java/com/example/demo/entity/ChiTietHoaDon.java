package com.example.demo.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.Table;

@Entity
@Table(name = "ChiTietHoaDon")
@IdClass(ChiTietHoaDonId.class) // Gọi class bó khóa vào đây
public class ChiTietHoaDon {

    @Id
    @Column(name = "maHoaDon", length = 50)
    private String maHoaDon;

    @Id
    @Column(name = "maGia", length = 50)
    private String maGia;

    @Column(name = "soLuong")
    private Integer soLuong;

    // --- GETTER & SETTER ---
    public String getMaHoaDon() { return maHoaDon; }
    public void setMaHoaDon(String maHoaDon) { this.maHoaDon = maHoaDon; }

    public String getMaGia() { return maGia; }
    public void setMaGia(String maGia) { this.maGia = maGia; }

    public Integer getSoLuong() { return soLuong; }
    public void setSoLuong(Integer soLuong) { this.soLuong = soLuong; }
}