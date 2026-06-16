package com.example.demo.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.LocalDateTime;

@Entity
@Table(name = "HoaDon")
public class HoaDon {

    @Id
    @Column(name = "maHoaDon", length = 50)
    private String maHoaDon;

    @Column(name = "soThuTu")
    private Integer soThuTu;

    @Column(name = "phuongThucTT", length = 50)
    private String phuongThucTT;

    @Column(name = "ngayLap")
    private LocalDateTime ngayLap;

    // --- GETTER & SETTER ---
    public String getMaHoaDon() { return maHoaDon; }
    public void setMaHoaDon(String maHoaDon) { this.maHoaDon = maHoaDon; }

    public Integer getSoThuTu() { return soThuTu; }
    public void setSoThuTu(Integer soThuTu) { this.soThuTu = soThuTu; }

    public String getPhuongThucTT() { return phuongThucTT; }
    public void setPhuongThucTT(String phuongThucTT) { this.phuongThucTT = phuongThucTT; }

    public LocalDateTime getNgayLap() { return ngayLap; }
    public void setNgayLap(LocalDateTime ngayLap) { this.ngayLap = ngayLap; }
}