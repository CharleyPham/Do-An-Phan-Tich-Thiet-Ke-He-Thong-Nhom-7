// ============================================================
//  PAYMENT.JS — Logic trang thanh toán (Đã kết nối Backend)
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
  const tong = Cart.tinhTong();
  const soTienEl = document.getElementById("payment-so-tien");
  if (soTienEl) {
    soTienEl.textContent = formatTien(tong);
  }

  // Nếu giỏ trống thì đá về menu
  if (Cart.getAll().length === 0) {
    window.location.href = "index.html";
  }
});

// ============================================================
//  GỌI API THANH TOÁN (HÀNG THẬT)
// ============================================================
async function giaLapThanhCong() {
  const btnNhan = document.querySelector(".btn-chuyen-khoan"); // Nút thanh toán (cậu nhớ tự trỏ đúng tên class của nút bấm nhé)
  if (btnNhan) {
      btnNhan.disabled = true;
      btnNhan.textContent = "Đang xử lý...";
  }

  try {
      const itemsTrongGio = Cart.getAll();
      
      // 1. Đóng gói giỏ hàng theo đúng chuẩn DTO (DatHangRequest) mà Spring Boot yêu cầu
      const requestBody = {
          phuongThucTT: "Chuyển khoản", // Cậu có thể làm biến động nếu web có nhiều nút
          chiTiet: itemsTrongGio.map(item => ({
              id: item.id,
              size: item.size || null,
              soLuong: item.soLuong || 1
          }))
      };

      // 2. Gửi cục JSON sang Backend
      const response = await fetch("http://localhost:8080/api/hoadon/thanhtoan", {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
          throw new Error("Lỗi mạng: Không thể kết nối tới Server!");
      }

      const data = await response.json();

      // 3. Xử lý khi Server báo thành công
      if (data.status === "success") {
          // Hiện mã Hóa Đơn thật lấy từ SQL Server
          const ketQuaEl = document.getElementById("result-ma-don");
          if(ketQuaEl) ketQuaEl.textContent = data.maHoaDon; 
          
          document.getElementById("overlay-thanh-cong").classList.add("show");
      } else {
          giaLapThatBai();
      }

  } catch (error) {
      console.error("Lỗi khi thanh toán:", error);
      giaLapThatBai();
  } finally {
       if (btnNhan) {
           btnNhan.disabled = false;
           btnNhan.textContent = "Thanh toán thành công";
       }
  }
}

function veMenuSauThanhToan() {
  Cart.clear();   // Xóa giỏ hàng sau khi thanh toán xong
  window.location.href = "index.html";
}

// ============================================================
//  GIẢ LẬP THẤT BẠI (Dùng chung cho cả khi lỗi mạng)
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