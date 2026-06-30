package com.example.demo.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Column;

@Entity
@Table(name = "TuyChonMonComBo")
public class TuyChonMonCombo {
    @Id
    @Column(name = "maGia")
    private String maGia;

    @Column(name = "maSlot")
    private String maSlot;

    @Column(name = "phiPhuThu")
    private Double phiPhuThu;

    @Column(name = "isMacDinh")
    private Boolean isMacDinh;

    public TuyChonMonCombo() {}

    // Getters và Setters
    public String getMaGia() { return maGia; }
    public void setMaGia(String maGia) { this.maGia = maGia; }

    public String getMaSlot() { return maSlot; }
    public void setMaSlot(String maSlot) { this.maSlot = maSlot; }

    public Double getPhiPhuThu() { return phiPhuThu; }
    public void setPhiPhuThu(Double phiPhuThu) { this.phiPhuThu = phiPhuThu; }

    public Boolean getIsMacDinh() { return isMacDinh; }
    public void setIsMacDinh(Boolean isMacDinh) { this.isMacDinh = isMacDinh; }
}