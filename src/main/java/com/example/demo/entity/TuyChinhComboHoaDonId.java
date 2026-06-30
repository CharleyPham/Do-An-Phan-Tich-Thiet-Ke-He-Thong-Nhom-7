package com.example.demo.entity;

import java.io.Serializable;
import java.util.Objects;

public class TuyChinhComboHoaDonId implements Serializable {
    private String maHoaDon;
    private String maCombo;
    private String maSlot;

    public TuyChinhComboHoaDonId() {}

    public TuyChinhComboHoaDonId(String maHoaDon, String maCombo, String maSlot) {
        this.maHoaDon = maHoaDon;
        this.maCombo = maCombo;
        this.maSlot = maSlot;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        TuyChinhComboHoaDonId that = (TuyChinhComboHoaDonId) o;
        return Objects.equals(maHoaDon, that.maHoaDon) &&
                Objects.equals(maCombo, that.maCombo) &&
                Objects.equals(maSlot, that.maSlot);
    }

    @Override
    public int hashCode() {
        return Objects.hash(maHoaDon, maCombo, maSlot);
    }
}