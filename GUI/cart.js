// ============================================================
//  CART.JS — Logic trang giỏ hàng (Bản đọc trực tiếp LocalStorage)
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
  // ĐỌC TRỰC TIẾP: Không dùng qua đối tượng Cart ẩn nữa nhằm đồng bộ tuyệt đối với menu.js
  const items = JSON.parse(localStorage.getItem("gioHang")) || [];
  
  const list   = document.getElementById("cart-list");
  const trong = document.getElementById("gio-trong");
  const table = document.getElementById("cart-table");
  const btnTT = document.getElementById("btn-thanh-toan");

  list.innerHTML = "";

  // BẢO VỆ DỮ LIỆU: Kiểm tra thuộc tính giaDonVi đồng bộ với menu.js
  const validItems = items.filter(item => item && item.giaDonVi !== undefined && item.giaDonVi !== null);

  if (validItems.length === 0) {
    table.style.display = "none";
    trong.style.display = "block";
    if (btnTT) btnTT.disabled = true;
    document.getElementById("tong-tien").textContent = "0đ";
    
    if (items.length > 0) localStorage.removeItem("gioHang");
    return;
  }

  if (table) table.style.display = "block";
  if (trong) trong.style.display = "none";
  if (btnTT) btnTT.disabled = false;

  validItems.forEach((item, idx) => {
    const row = document.createElement("div");
    row.className = "cart-row";
    row.style.animationDelay = `${idx * 0.06}s`;

    const sizeLabel = { BE: "Bé", VUA: "Vừa", LON: "Lớn" };
    let sizeText = "—";
    let subInfoHTML = ""; 

    if (item.tuyChonCombo && item.tuyChonCombo.length > 0) {
      sizeText = "Combo";
      const chuoiTenMonCuaCombo = item.tuyChonCombo.map(opt => opt.tenMonHienThi).join(" + ");
      subInfoHTML = `<div style="font-size: 12px; color: #E8192C; font-weight: 500; margin-top: 4px; line-height: 1.4;">
                       🎁 Đã chọn: ${chuoiTenMonCuaCombo}
                     </div>`;
    } else if (item.monKem && item.monKem.length > 0) {
      sizeText = "Combo";
      subInfoHTML = `<div style="font-size: 12px; color: #E8192C; font-weight: 500; margin-top: 4px; line-height: 1.4;">
                       🎁 Đã chọn: ${item.monKem.join(" + ")}
                     </div>`;
    } else if (item.maSize) {
      sizeText = sizeLabel[item.maSize] || "Vừa";
    }
    
    const gia = item.giaDonVi || 0;
    const soLuong = item.soLuong || 1;
    const thanhTien = gia * soLuong;

    const loai = item.isCombo ? 'combo' : (item.maSize ? 'ga' : 'nuoc');
    const fallbackImg = defaultImages[loai] || defaultImages.ga;
    const imgSrc = item.img ? item.img : fallbackImg;

    const imgHTML = `
      <div class="cart-mon-img">
         <img src="${imgSrc}" alt="${item.tenSanPham || 'Món'}" onerror="this.onerror=null; this.src='${fallbackImg}'" style="width: 100%; height: 100%; object-fit: cover;">
      </div>`;

    row.innerHTML = `
      <span class="cart-stt">${idx + 1}</span>

      <span class="cart-mon-info">
        ${imgHTML}
        <span class="cart-mon-ten">
            ${item.tenSanPham || 'Món ăn'}
            ${subInfoHTML}
        </span>
      </span>

      <span style="font-size:13px; color:#6B7280; font-weight: 500;">${sizeText}</span>
      <span style="font-weight:700;">${soLuong}</span>
      <span class="cart-gia">${formatTien(gia)}</span>
      <span class="cart-gia">${formatTien(thanhTien)}</span>

      <button class="btn-xoa" onclick="moPopupXoa(${idx})" title="Xóa món này">
        🗑️
      </button>
    `;

    list.appendChild(row);
  });

  const tongTien = validItems.reduce((sum, i) => sum + (i.giaDonVi || 0) * (i.soLuong || 1), 0);
  document.getElementById("tong-tien").textContent = formatTien(tongTien);
}

// ============================================================
//  POPUP XÓA
// ============================================================
function moPopupXoa(idx) {
  indexDangXoa = idx;
  const items = JSON.parse(localStorage.getItem("gioHang")) || [];
  const item = items[idx];
  if(!item) return; 
  document.getElementById("xoa-ten-mon").textContent =
    `Bạn có muốn xóa "${item.tenSanPham || 'món này'}" khỏi giỏ hàng không?`;
  document.getElementById("overlay-xoa").classList.add("show");
}

function dongPopupXoa(e) {
  if (e && e.target !== document.getElementById("overlay-xoa")) return;
  _dongPopupXoa();
}

// Hàm bổ trợ đóng popup xóa
function _dongPopupXoa() {
  const popup = document.getElementById("overlay-xoa");
  if (popup) popup.classList.remove("show");
  indexDangXoa = -1;
}

function xacNhanXoa() {
  if (indexDangXoa < 0) return;
  
  let items = JSON.parse(localStorage.getItem("gioHang")) || [];
  items.splice(indexDangXoa, 1); // Xóa phần tử tại vị trí index
  
  if (items.length === 0) {
    localStorage.removeItem("gioHang");
  } else {
    localStorage.setItem("gioHang", JSON.stringify(items));
  }
  
  _dongPopupXoa();
  setTimeout(renderGio, 80);
}

// ============================================================
//  POPUP XÁC NHẬN THANH TOÁN
// ============================================================
function moPopupThanhToan() {
  const items = JSON.parse(localStorage.getItem("gioHang")) || [];
  const tongTien = items.reduce((sum, i) => sum + (i.giaDonVi || 0) * (i.soLuong || 1), 0);
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
  const popup = document.getElementById("overlay-xac-nhan-tt");
  if (popup) popup.classList.remove("show");
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