package com.example.demo.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "SanPham")
public class SanPham {
    @Id
    @Column(name = "maSanPham", length = 50)
    private String maSanPham;

    @Column(name = "maDanhMuc", length = 50)
    private String maDanhMuc;

    @Column(name = "tenSanPham", length = 200)
    private String tenSanPham;

    // --- GETTER & SETTER ---
    public String getMaSanPham() { return maSanPham; }
    public void setMaSanPham(String maSanPham) { this.maSanPham = maSanPham; }

    public String getMaDanhMuc() { return maDanhMuc; }
    public void setMaDanhMuc(String maDanhMuc) { this.maDanhMuc = maDanhMuc; }

    public String getTenSanPham() { return tenSanPham; }
    public void setTenSanPham(String tenSanPham) { this.tenSanPham = tenSanPham; }
}
