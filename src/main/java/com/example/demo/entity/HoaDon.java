package com.example.demo.entity;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "HoaDon")
public class HoaDon {

    @Id
    @Column(name = "maHoaDon", length = 50)
    private String maHoaDon;

    @Column(name = "soThuTu")
    private Integer soThuTu;

    @Column(name = "tongTien")
    private BigDecimal tongTien;

    @Column(name = "phuongThucTT", length = 50)
    private String phuongThucTT;

    @Column(name = "ngayLap")
    private LocalDateTime ngayLap;

    // Thêm đoạn này để Hóa Đơn tự động lưu luôn các Chi Tiết
    @OneToMany(mappedBy = "hoaDon", cascade = jakarta.persistence.CascadeType.ALL)
    private java.util.List<ChiTietHoaDon> chiTietHoaDons = new java.util.ArrayList<>();

    // Thêm hàm Getter và Setter cho nó
    public java.util.List<ChiTietHoaDon> getChiTietHoaDons() {
        return chiTietHoaDons;
    }
    public void setChiTietHoaDons(java.util.List<ChiTietHoaDon> chiTietHoaDons) {
        this.chiTietHoaDons = chiTietHoaDons;
    }

    // --- GETTER & SETTER ---
    public String getMaHoaDon() { return maHoaDon; }
    public void setMaHoaDon(String maHoaDon) { this.maHoaDon = maHoaDon; }

    public Integer getSoThuTu() { return soThuTu; }
    public void setSoThuTu(Integer soThuTu) { this.soThuTu = soThuTu; }

    public String getPhuongThucTT() { return phuongThucTT; }
    public void setPhuongThucTT(String phuongThucTT) { this.phuongThucTT = phuongThucTT; }

    public BigDecimal getTongTien() { return tongTien; }
    public void setTongTien(BigDecimal tongTien) { this.tongTien = tongTien; }

    public LocalDateTime getNgayLap() { return ngayLap; }
    public void setNgayLap(LocalDateTime ngayLap) { this.ngayLap = ngayLap; }
}