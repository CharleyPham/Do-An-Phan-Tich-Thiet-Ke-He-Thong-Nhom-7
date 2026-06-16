package com.example.demo.entity;

import java.io.Serializable;
import java.util.Objects;

public class ChiTietHoaDonId implements Serializable {
    private String maHoaDon;
    private String maGia;

    public ChiTietHoaDonId() {}

    public ChiTietHoaDonId(String maHoaDon, String maGia) {
        this.maHoaDon = maHoaDon;
        this.maGia = maGia;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ChiTietHoaDonId that = (ChiTietHoaDonId) o;
        return Objects.equals(maHoaDon, that.maHoaDon) && Objects.equals(maGia, that.maGia);
    }

    @Override
    public int hashCode() {
        return Objects.hash(maHoaDon, maGia);
    }
}