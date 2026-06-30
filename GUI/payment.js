// ============================================================
//  PAYMENT.JS — Logic trang thanh toán (Hỗ trợ cấu trúc Combo tùy chỉnh)
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
    // Đọc trực tiếp từ localStorage để đồng bộ tuyệt đối dữ liệu mới
    const itemsTrongGio = JSON.parse(localStorage.getItem("gioHang")) || [];

    // Tính tổng tiền trực tiếp dựa trên cấu trúc thuộc tính giaDonVi mới
    const tongTien = itemsTrongGio.reduce((sum, i) => sum + (i.giaDonVi || 0) * (i.soLuong || 1), 0);

    const soTienEl = document.getElementById("payment-so-tien");
    if (soTienEl) {
        soTienEl.textContent = formatTien(tongTien);
    }

    // Nếu giỏ trống thì đá ngược về trang chủ chọn món
    if (itemsTrongGio.length === 0) {
        window.location.href = "index.html";
    }
});

// Hàm format tiền tệ VNĐ bổ trợ tránh lỗi crash script
 function formatTien(soTien) {
    return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(soTien);
}

// ============================================================
//  GỌI API THANH TOÁN (HÀNG THẬT)
// ============================================================
async function giaLapThanhCong() {
    const btnNhan = document.querySelector(".btn-chuyen-khoan");
    if (btnNhan) {
        btnNhan.disabled = true;
        btnNhan.textContent = "Đang xử lý...";
    }

    try {
        const itemsTrongGio = JSON.parse(localStorage.getItem("gioHang")) || [];

        // 1. Đóng gói giỏ hàng theo đúng chuẩn DTO (DatHangRequest) mà Spring Boot yêu cầu
        const requestBody = {
            phuongThucTT: "Chuyển khoản",
            chiTiet: itemsTrongGio.map(item => {

                // ==========================================
                // FIX LỖI: Tự động chuyển SP_ thành MG_
                // ==========================================
                let maGiaChuan = item.maSanPham;
                if (maGiaChuan && maGiaChuan.startsWith("SP_")) {
                    maGiaChuan = maGiaChuan.replace("SP_", "MG_");
                }

                // Khởi tạo object chi tiết món cơ bản
                let chiTietDonHang = {
                    id: maGiaChuan, // Truyền Mã Giá chuẩn xác để Backend tìm được
                    soLuong: item.soLuong || 1
                };

                // Nếu là món lẻ có kích cỡ, map thuộc tính size
                if (item.maSize) {
                    chiTietDonHang.size = item.maSize;
                }

                // ĐẶC BIỆT: Nếu là Combo và có mảng chỉnh sửa món con đi kèm
                if (item.isCombo && item.tuyChonCombo && item.tuyChonCombo.length > 0) {
                    // Ánh xạ mảng tùy chọn từ LocalStorage sang cấu trúc mảng DB Backend cần đón nhận
                    chiTietDonHang.tuyChinhCombo = item.tuyChonCombo.map(opt => ({
                        maSlot: opt.maSlot,                 // Ví dụ: SLOT_DRINK
                        maGiaSauDoi: opt.maGiaSauDoi,       // Ví dụ: MG_PEPSI_LON
                        phiPhuThuThucTe: opt.phiPhuThuThucTe // Ví dụ: 7000.00
                    }));
                } else {
                    chiTietDonHang.tuyChinhCombo = []; // Nếu không phải combo thì gửi mảng rỗng để chống null bên DTO
                }

                return chiTietDonHang;
            })
        };

        console.log("🚀 ĐANG GỬI REQUEST BODY LÊN BACKEND:", JSON.stringify(requestBody, null, 2));

        // 2. Gửi cục JSON sang Backend
        const response = await fetch("http://localhost:8081/api/hoadon/thanhtoan", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            throw new Error("Lỗi mạng: Không thể kết nối tới Server!");
        }

        // Đọc dữ liệu dạng Text trước rồi mới ép kiểu thành JSON để tránh lỗi phân tích chuỗi String thuần từ Backend
        const responseText = await response.text();
        const data = JSON.parse(responseText);

        // 3. Xử lý khi Server báo thành công
        if (data.status === "success" || data.maHoaDon) {
            // Hiện mã Hóa Đơn thật lấy từ SQL Server
            const ketQuaEl = document.getElementById("result-ma-don");
            if (ketQuaEl) ketQuaEl.textContent = data.maHoaDon;

            document.getElementById("overlay-thanh-cong").classList.add("show");
            
            // Chỉ cập nhật trạng thái nút bấm khi thực sự thành công
            if (btnNhan) {
                btnNhan.textContent = "Thanh toán thành công";
            }
        } else {
            giaLapThatBai();
            if (btnNhan) {
                btnNhan.disabled = false;
                btnNhan.textContent = "Xác nhận chuyển khoản";
            }
        }

    } catch (error) {
        console.error("Lỗi khi thanh toán:", error);
        giaLapThatBai();
        
        // Khôi phục lại trạng thái nút bấm nếu giao dịch thất bại để người dùng có thể ấn lại
        if (btnNhan) {
            btnNhan.disabled = false;
            btnNhan.textContent = "Xác nhận chuyển khoản";
        }
    }
}

function veMenuSauThanhToan() {
    localStorage.removeItem("gioHang"); // Xóa giỏ hàng tận gốc sau khi thanh toán xong
    window.location.href = "index.html";
}

// ============================================================
//  GIẢ LẬP THẤT BẠI
// ============================================================
function giaLapThatBai() {
    document.getElementById("overlay-that-bai").classList.add("show");
}

function dongPopupThatBai() {
    document.getElementById("overlay-that-bai").classList.remove("show");
}

function veMenu() {
    window.location.href = "index.html";
}