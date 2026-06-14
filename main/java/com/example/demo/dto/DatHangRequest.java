package com.example.demo.dto;

import java.util.List;

public class DatHangRequest {
    private String phuongThucTT;
    private List<MonDat> chiTiet;

    public String getPhuongThucTT() { return phuongThucTT; }
    public void setPhuongThucTT(String phuongThucTT) { this.phuongThucTT = phuongThucTT; }

    public List<MonDat> getChiTiet() { return chiTiet; }
    public void setChiTiet(List<MonDat> chiTiet) { this.chiTiet = chiTiet; }

    // Class con đại diện cho từng món ăn trong giỏ
    public static class MonDat {
        private String id;       // Tương ứng maSanPham (VD: SP_PEPSI)
        private String size;     // "be", "vua", "lon" hoặc null
        private Integer soLuong;

        public String getId() { return id; }
        public void setId(String id) { this.id = id; }

        public String getSize() { return size; }
        public void setSize(String size) { this.size = size; }

        public Integer getSoLuong() { return soLuong; }
        public void setSoLuong(Integer soLuong) { this.soLuong = soLuong; }
    }
}