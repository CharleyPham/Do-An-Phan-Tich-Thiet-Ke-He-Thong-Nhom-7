package com.example.demo.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Column; // Nhập thêm thư viện này

@Entity
@Table(name = "SlotChonCombo")
public class SlotCombo {
    @Id
    @Column(name = "maSlot") // Ép đúng chữ hoa chữ thường
    private String maSlot;          

    @Column(name = "maSanPham") // Ép đúng chữ hoa chữ thường
    private String maSanPham;       

    @Column(name = "tenSlot")
    private String tenSlot;         

    @Column(name = "soLuongBatBuocChon") // Ép đúng chữ hoa chữ thường giống trong ảnh DB
    private Integer soLuongBatBuocChon;

    public SlotCombo() {}

    // Getter và Setter
    public String getMaSlot() { return maSlot; }
    public void setMaSlot(String maSlot) { this.maSlot = maSlot; }

    public String getMaSanPham() { return maSanPham; }
    public void setMaSanPham(String maSanPham) { this.maSanPham = maSanPham; }

    public String getTenSlot() { return tenSlot; }
    public void setTenSlot(String tenSlot) { this.tenSlot = tenSlot; }

    public Integer getSoLuongBatBuoc() { return soLuongBatBuocChon; }
    public void setSoLuongBatBuoc(Integer soLuongBatBuoc) { this.soLuongBatBuocChon = soLuongBatBuoc; }
}