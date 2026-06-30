package com.example.demo.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Column;

@Entity
@Table(name = "SanPham") // Hoặc tên bảng thực tế của bạn trong SQL Server
public class SanPham {
    @Id
    @Column(name = "maSanPham")
    private String maSanPham;

    @Column(name = "tenSanPham")
    private String tenSanPham;

    @Column(name = "maDanhMuc")
    private String maDanhMuc;

    @Column(name = "isCombo")
    private Boolean isCombo;

    @Column(name = "tinhTrang")
    private Boolean tinhTrang;

    public SanPham() {}

    // Getter và Setter cho tất cả các trường
    public String getMaSanPham() { return maSanPham; }
    public void setMaSanPham(String maSanPham) { this.maSanPham = maSanPham; }

    public String getTenSanPham() { return tenSanPham; }
    public void setTenSanPham(String tenSanPham) { this.tenSanPham = tenSanPham; }

    public String getMaDanhMuc() { return maDanhMuc; }
    public void setMaDanhMuc(String maDanhMuc) { this.maDanhMuc = maDanhMuc; }

    public Boolean getIsCombo() { return isCombo; }
    public void setIsCombo(Boolean isCombo) { this.isCombo = isCombo; }

    public Boolean getTinhTrang() { return tinhTrang; }
    public void setTinhTrang(Boolean tinhTrang) { this.tinhTrang = tinhTrang; }
}