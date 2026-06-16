package com.example.demo.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "MaGia")
public class MaGia {

    @Id
    @Column(name = "maGia", length = 50)
    private String maGia;

    @Column(name = "maSanPham", length = 50)
    private String maSanPham;

    @Column(name = "maSize", length = 50)
    private String maSize;

    @Column(name = "gia")
    private Double gia;

    // --- GETTER & SETTER ---
    public String getMaGia() { return maGia; }
    public void setMaGia(String maGia) { this.maGia = maGia; }

    public String getMaSanPham() { return maSanPham; }
    public void setMaSanPham(String maSanPham) { this.maSanPham = maSanPham; }

    public String getMaSize() { return maSize; }
    public void setMaSize(String maSize) { this.maSize = maSize; }

    public Double getGia() { return gia; }
    public void setGia(Double gia) { this.gia = gia; }
}