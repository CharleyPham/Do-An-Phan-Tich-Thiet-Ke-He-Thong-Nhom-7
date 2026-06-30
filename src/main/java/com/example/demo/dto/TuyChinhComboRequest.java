package com.example.demo.dto;

import java.math.BigDecimal;

public class TuyChinhComboRequest {
        private String maSlot;          // VD: SLOT_DRINK, SLOT_SIDE
        private String maGiaSauDoi;     // VD: MG_PEPSI_LON, MG_KHOAI_LON
        private BigDecimal phiPhuThuThucTe; // Số tiền cộng thêm (VD: 7000.00)
        private Integer maTuyChinh;     // Thứ tự tùy chỉnh (VD: 1, 2)

        public String getMaSlot() { return maSlot; }
        public void setMaSlot(String maSlot) { this.maSlot = maSlot; }

        public String getMaGiaSauDoi() { return maGiaSauDoi; }
        public void setMaGiaSauDoi(String maGiaSauDoi) { this.maGiaSauDoi = maGiaSauDoi; }

        public BigDecimal getPhiPhuThuThucTe() { return phiPhuThuThucTe; }
        public void setPhiPhuThuThucTe(BigDecimal phiPhuThuThucTe) { this.phiPhuThuThucTe = phiPhuThuThucTe; }

        public Integer getMaTuyChinh() { return maTuyChinh; }
        public void setMaTuyChinh(Integer maTuyChinh) { this.maTuyChinh = maTuyChinh; }
    }