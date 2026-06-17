// ============================================================
//  CART.JS — Logic trang giỏ hàng (Bản chống lỗi dữ liệu)
// ============================================================

const defaultImages = {
  ga: "https://img.icons8.com/fluency/96/poultry-leg.png",
  nuoc: "https://img.icons8.com/fluency/96/soda-cup.png",
  combo: "https://img.icons8.com/fluency/96/take-away-food.png"
};

let indexDangXoa = -1;

// ============================================================
//  RENDER GIỎ HÀNG
// ============================================================
function renderGio() {
  const items = Cart.getAll();
  const list  = document.getElementById("cart-list");
  const trong = document.getElementById("gio-trong");
  const table = document.getElementById("cart-table");
  const btnTT = document.getElementById("btn-thanh-toan");

  list.innerHTML = "";

  // BẢO VỆ DỮ LIỆU: Lọc ra các item hợp lệ, bỏ qua các item cũ bị hỏng (thiếu giá)
  const validItems = items.filter(item => item && item.gia !== undefined && item.gia !== null);

  // Nếu lọc xong mà không còn item nào hợp lệ (hoặc giỏ thực sự trống)
  if (validItems.length === 0) {
    table.style.display = "none";
    trong.style.display = "block";
    btnTT.disabled = true;
    document.getElementById("tong-tien").textContent = "0đ";
    
    // Nếu có data lỗi trong bộ nhớ, tự động dọn dẹp luôn
    if (items.length > 0) Cart.clear();
    return;
  }

  table.style.display = "block";
  trong.style.display = "none";
  btnTT.disabled = false;

  validItems.forEach((item, idx) => {
    const row = document.createElement("div");
    row.className = "cart-row";
    row.style.animationDelay = `${idx * 0.06}s`;

    const sizeLabel = { be: "Bé", vua: "Vừa", lon: "Lớn" };
    const sizeText  = item.size ? sizeLabel[item.size] : "—";
    
    // Đảm bảo không bị lỗi toán học nếu thiếu dữ liệu
    const gia = item.gia || 0;
    const soLuong = item.soLuong || 1;
    const thanhTien = gia * soLuong;

    // Xử lý ảnh an toàn
    const loai = item.loai || 'ga';
    const fallbackImg = defaultImages[loai] || defaultImages.ga;
    const imgSrc = item.img ? item.img : fallbackImg;

    const imgHTML = `
      <div class="cart-mon-img">
         <img src="${imgSrc}" alt="${item.ten || 'Món'}" onerror="this.onerror=null; this.src='${fallbackImg}'" style="width: 100%; height: 100%; object-fit: cover;">
      </div>`;

    row.innerHTML = `
      <span class="cart-stt">${idx + 1}</span>

      <span class="cart-mon-info">
        ${imgHTML}
        <span class="cart-mon-ten">${item.ten || 'Món ăn'}</span>
      </span>

      <span style="font-size:13px; color:#6B7280;">${sizeText}</span>
      <span style="font-weight:700;">${soLuong}</span>
      <span class="cart-gia">${formatTien(gia)}</span>
      <span class="cart-gia">${formatTien(thanhTien)}</span>

      <button class="btn-xoa" onclick="moPopupXoa(${idx})" title="Xóa món này">
        🗑️
      </button>
    `;

    list.appendChild(row);
  });

  // Cập nhật tổng tiền an toàn
  const tongTien = validItems.reduce((sum, i) => sum + (i.gia || 0) * (i.soLuong || 1), 0);
  document.getElementById("tong-tien").textContent = formatTien(tongTien);
}

// ============================================================
//  POPUP XÓA
// ============================================================
function moPopupXoa(idx) {
  indexDangXoa = idx;
  const item = Cart.getAll()[idx];
  if(!item) return; // Bảo vệ nếu không tìm thấy món
  document.getElementById("xoa-ten-mon").textContent =
    `Bạn có muốn xóa "${item.ten || 'món này'}" khỏi giỏ hàng không?`;
  document.getElementById("overlay-xoa").classList.add("show");
}

function dongPopupXoa(e) {
  if (e && e.target !== document.getElementById("overlay-xoa")) return;
  _dongPopupXoa();
}

function _dongPopupXoa() {
  document.getElementById("overlay-xoa").classList.remove("show");
  indexDangXoa = -1;
}

function xacNhanXoa() {
  if (indexDangXoa < 0) return;
  Cart.remove(indexDangXoa);
  _dongPopupXoa();

  setTimeout(renderGio, 80);
}

// ============================================================
//  POPUP XÁC NHẬN THANH TOÁN
// ============================================================
function moPopupThanhToan() {
  const tongTien = Cart.getAll().reduce((sum, i) => sum + (i.gia || 0) * (i.soLuong || 1), 0);
  const amountEl = document.getElementById("confirm-total-amount");
  if (amountEl) {
    amountEl.textContent = formatTien(tongTien);
  }
  document.getElementById("overlay-xac-nhan-tt").classList.add("show");
}

function dongPopupThanhToan(e) {
  if (e && e.target !== document.getElementById("overlay-xac-nhan-tt")) return;
  _dongPopupThanhToan();
}

function _dongPopupThanhToan() {
  document.getElementById("overlay-xac-nhan-tt").classList.remove("show");
}

function tienHanhThanhToan() {
  const btn = document.querySelector("#overlay-xac-nhan-tt .btn-them-gio");
  if(btn) {
    btn.innerHTML = "Đang xử lý...";
    btn.style.opacity = "0.7";
    btn.disabled = true;
  }
  setTimeout(() => {
    window.location.href = "payment.html";
  }, 400);
}

// ============================================================
//  KHỞI ĐỘNG
// ============================================================
document.addEventListener("DOMContentLoaded", renderGio);