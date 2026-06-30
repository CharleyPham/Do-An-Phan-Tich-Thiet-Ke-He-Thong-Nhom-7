package com.example.demo.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "ChiTietHoaDon")
public class ChiTietHoaDon {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id; // ĐÂY LÀ @Id DUY NHẤT

    @Column(name = "maHoaDon", length = 50) // Đã xóa bỏ @Id cũ ở đây
    private String maHoaDon;

    @Column(name = "maGia", length = 50) // Đã xóa bỏ @Id cũ ở đây
    private String maGia;

    @Column(name = "soLuong")
    private Integer soLuong;

    @ManyToOne
    @JoinColumn(name = "maHoaDon", referencedColumnName = "maHoaDon", insertable = false, updatable = false)
    private HoaDon hoaDon;

    // --- GETTER & SETTER ---
    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public String getMaHoaDon() { return maHoaDon; }
    public void setMaHoaDon(String maHoaDon) { this.maHoaDon = maHoaDon; }

    public String getMaGia() { return maGia; }
    public void setMaGia(String maGia) { this.maGia = maGia; }

    public Integer getSoLuong() { return soLuong; }
    public void setSoLuong(Integer soLuong) { this.soLuong = soLuong; }

    public HoaDon getHoaDon() { return hoaDon; }
    public void setHoaDon(HoaDon hoaDon) { this.hoaDon = hoaDon; }
}