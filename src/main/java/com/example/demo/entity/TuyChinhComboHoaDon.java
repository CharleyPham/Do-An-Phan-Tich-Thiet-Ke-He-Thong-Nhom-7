package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.math.BigDecimal;

@Entity
@Table(name = "TuyChinhComboHoaDon")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TuyChinhComboHoaDon {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id; // ĐÂY LÀ @Id DUY NHẤT

    @Column(name = "maHoaDon", length = 50) // Đã xóa bỏ @Id cũ ở đây
    private String maHoaDon;

    @Column(name = "maCombo", length = 50) // Đã xóa bỏ @Id cũ ở đây
    private String maCombo;

    @Column(name = "maSlot", length = 50) // Đã xóa bỏ @Id cũ ở đây
    private String maSlot;

    @Column(name = "maGiaSauDoi", length = 50)
    private String maGiaSauDoi;

    @Column(name = "phiPhuThuThucTe")
    private BigDecimal phiPhuThuThucTe;

    // Tự viết bổ sung Getter và Setter cho ID để đảm bảo Lombok không bị lỗi trong một số môi trường
    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }
}