package com.example.demo.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "DanhMuc")

public class DanhMuc {
    @Id
    @Column(name = "maDanhMuc", length = 50)
    private String maDanhMuc;

    @Column(name = "tenDanhMuc", length = 200)
    private String tenDanhMuc;

    // --- CÁC HÀM GETTER VÀ SETTER ---
    public String getMaDanhMuc() {
        return maDanhMuc;
    }

    public void setMaDanhMuc(String maDanhMuc) {
        this.maDanhMuc = maDanhMuc;
    }

    public String getTenDanhMuc() {
        return tenDanhMuc;
    }

    public void setTenDanhMuc(String tenDanhMuc) {
        this.tenDanhMuc = tenDanhMuc;
    }
}
