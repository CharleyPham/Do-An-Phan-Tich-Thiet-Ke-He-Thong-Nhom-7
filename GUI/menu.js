// ============================================================
//  MENU.JS — Logic trang menu chính
// ============================================================

let tabHienTai = "ga";
let monDangChon  = null;   
let soLuong      = 1;
let sizeDangChon = "be";   

// Link icon dùng cho Tab và Title
const tabIcons = { 
 ga: "https://img.icons8.com/fluency/96/poultry-leg.png",       // Đùi gà 3D
  nuoc: "https://img.icons8.com/fluency/96/soda-cup.png",        // Cốc nước 3D
  combo: "https://img.icons8.com/fluency/96/take-away-food.png"
};
const tabNames = { ga: "Gà", nuoc: "Nước", combo: "Combo" };

// Ảnh mặc định khi món ăn bị thiếu ảnh trong file data.js
const defaultImages = {
  ga: "https://placehold.co/400x300/FFE5E8/E8192C?text=Gà+Rán",
  nuoc: "https://placehold.co/400x300/FFE5E8/E8192C?text=Nước",
  combo: "https://placehold.co/400x300/FFE5E8/E8192C?text=Combo"
};

// ============================================================
//  RENDER MÓN ĂN
// ============================================================
function renderMon(tab) {
  const grid = document.getElementById("mon-grid");
  const danhSach = MENU_DATA[tab] || [];

  grid.innerHTML = "";

  danhSach.forEach((mon, idx) => {
    const card = document.createElement("div");
    card.className = "mon-card";
    card.style.animationDelay = `${idx * 0.07}s`;
    card.onclick = () => moPopup(mon, idx);

    // Xác định ảnh thật hoặc ảnh mặc định
    const imgSrc = mon.img ? mon.img : defaultImages[tab];

    const imgHTML = `
      <div class="mon-img">
        <img src="${imgSrc}"
             alt="${mon.ten}"
             onerror="this.onerror=null; this.src='${defaultImages[tab]}';">
      </div>
    `;

    let giaHienThi;
    if (mon.coSize) {
      giaHienThi = `Từ ${formatTien(mon.giaTheoSize.be)}`;
    } else {
      giaHienThi = formatTien(mon.gia);
    }

    card.innerHTML = `
      ${imgHTML}
      <div class="mon-info">
        <div class="mon-ten">${mon.ten}</div>
        <div class="mon-gia">${giaHienThi}</div>
      </div>
    `;

    grid.appendChild(card);
  });
}

// ============================================================
//  CHUYỂN TAB
// ============================================================
function chuyenTab(tab, el) {
  tabHienTai = tab;

  document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
  el.classList.add("active");

  // Cập nhật title bằng icon dạng ảnh
  document.getElementById("title-icon").innerHTML = `<img src="${tabIcons[tab]}" style="width:26px; height:26px; object-fit:contain;">`;
  document.getElementById("title-text").textContent  = tabNames[tab];

  renderMon(tab);
}

// ============================================================
//  POPUP MÓN
// ============================================================
function moPopup(mon, idx) {
  monDangChon  = mon;
  soLuong      = 1;
  sizeDangChon = "be";

  const popupImg = document.getElementById("popup-img");
  popupImg.innerHTML = ""; // Xóa ảnh cũ

  // Gắn ảnh vào popup
  const imgSrc = mon.img ? mon.img : defaultImages[tabHienTai];
  const img = document.createElement("img");
  img.src = imgSrc;
  img.className = "popup-real-img";
  img.alt = mon.ten;
  img.style.cssText = "position:absolute;inset:0;width:100%;height:100%;object-fit:cover;";
  img.onerror = () => { img.onerror = null; img.src = defaultImages[tabHienTai]; };
  
  popupImg.style.position = "relative";
  popupImg.appendChild(img);

  // Nội dung
  document.getElementById("popup-ten").textContent   = mon.ten;
  document.getElementById("popup-mota").textContent  = mon.moTa;
  document.getElementById("sl-num").textContent       = "1";

  // Hiển thị/ẩn chọn size
  const sizeGroup = document.getElementById("size-group");
  if (mon.coSize) {
    sizeGroup.style.display = "flex";
    document.getElementById("gia-be").textContent  = formatTien(mon.giaTheoSize.be);
    document.getElementById("gia-vua").textContent = formatTien(mon.giaTheoSize.vua);
    document.getElementById("gia-lon").textContent = formatTien(mon.giaTheoSize.lon);
    
    document.querySelectorAll(".size-btn").forEach(b => b.classList.remove("active"));
    document.querySelector(".size-btn[data-size='be']").classList.add("active");
    capNhatGiaPopup();
  } else {
    sizeGroup.style.display = "none";
    document.getElementById("popup-gia").textContent = formatTien(mon.gia);
  }

  document.getElementById("overlay").classList.add("show");
  document.body.style.overflow = "hidden";
}

function dongPopup(e) {
  if (e && e.target !== document.getElementById("overlay")) return;
  _dongPopup();
}

function _dongPopup() {
  document.getElementById("overlay").classList.remove("show");
  document.body.style.overflow = "";
  monDangChon = null;
}

// ============================================================
//  CHỌN SIZE
// ============================================================
function chonSize(size, el) {
  sizeDangChon = size;
  document.querySelectorAll(".size-btn").forEach(b => b.classList.remove("active"));
  el.classList.add("active");
  capNhatGiaPopup();
}

function capNhatGiaPopup() {
  if (!monDangChon) return;
  let gia = monDangChon.coSize ? monDangChon.giaTheoSize[sizeDangChon] : monDangChon.gia;
  document.getElementById("popup-gia").textContent = formatTien(gia * soLuong);
}

// ============================================================
//  THAY ĐỔI SỐ LƯỢNG
// ============================================================
function thayDoiSL(delta) {
  soLuong = Math.max(1, Math.min(99, soLuong + delta));
  document.getElementById("sl-num").textContent = soLuong;
  capNhatGiaPopup();
}

// ============================================================
//  THÊM VÀO GIỎ
// ============================================================
function themVaGio() {
  if (!monDangChon) return;

  let gia, tenHienThi;
  if (monDangChon.coSize) {
    gia = monDangChon.giaTheoSize[sizeDangChon];
    const sizeLabel = { be: "Bé", vua: "Vừa", lon: "Lớn" };
    tenHienThi = `${monDangChon.ten} (${sizeLabel[sizeDangChon]})`;
  } else {
    gia = monDangChon.gia;
    tenHienThi = monDangChon.ten;
  }

  Cart.add({
    id:       monDangChon.id,
    ten:      tenHienThi,
    img:      monDangChon.img,
    loai:     monDangChon.loai,
    size:     monDangChon.coSize ? sizeDangChon : null,
    gia:      gia,
    soLuong:  soLuong
  });

  capNhatBadge();
  _dongPopup();
  hienToast(`✅ Đã thêm "${tenHienThi}" vào giỏ!`);
}

// ============================================================
//  BADGE & TOAST
// ============================================================
function capNhatBadge() {
  document.getElementById("cart-badge").textContent = Cart.soLuong();
}

let toastTimer;
function hienToast(msg) {
  const t = document.getElementById("toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("show"), 2500);
}

// ============================================================
//  KẾT NỐI API TỪ BACKEND SPRING BOOT (BẢN CHỐNG LỖI NULL)
// ============================================================
async function loadDataTuBackend() {
  try {
    // Thêm đuôi thời gian để ép trình duyệt tải data mới nhất (Chống cache)
    const url = "http://localhost:8080/api/sanpham?nocache=" + new Date().getTime();
    const response = await fetch(url);
    const dataSQL = await response.json();

    MENU_DATA.ga = [];
    MENU_DATA.nuoc = [];
    MENU_DATA.combo = [];

    const mapTab = { "DM_MON_LE": "ga", "DM_NUOC": "nuoc", "DM_COMBO": "combo" };
    const mapSize = { "SIZE_BE": "be", "SIZE_VUA": "vua", "SIZE_LON": "lon" };
    
    // Tạm thời map mã SQL với ảnh trên mạng để giao diện không bị trống
    const mapAnh = {
        "SP_PEPSI": "https://bizweb.dktcdn.net/thumb/1024x1024/100/437/181/products/589620f2-a149-47a1-8a4d-68a4bc9608d5.jpg",
        "SP_KHOAI": "https://burgerking.vn/media/catalog/product/cache/1/image/1800x/040ec09b1e35df139433887a97daa66f/f/r/french-fries-2.jpg",
        "SP_CB3": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4sBs_LbJgYX0PlWA_ukcX4jR3aKeiEv-S0g&s",
        "SP_GA_RAN_1": "https://burgerking.vn/media/catalog/product/cache/1/image/1800x/040ec09b1e35df139433887a97daa66f/1/_/1_fried_chicken.jpg",
        "SP_BURGER_BO": "https://burgerking.vn/media/catalog/product/cache/1/image/1800x/040ec09b1e35df139433887a97daa66f/w/h/whopper-jr_2.jpg",
        "SP_TRA_DAO": "https://phuclong.com.vn/uploads/dish/bc73e9131ab3f1-trdo.png",
        "SP_CB1": "https://burgerking.vn/media/catalog/product/cache/1/image/1800x/040ec09b1e35df139433887a97daa66f/c/o/combo-1-nguoi-b_1_1.jpg",
        "SP_GA_CAY": "https://burgerking.vn/media/catalog/product/cache/1/image/1800x/040ec09b1e35df139433887a97daa66f/b/b/bbq-1-pc_2.jpg",
        "SP_GA_QUAY": "https://cdn.tgdd.vn/Files/2021/11/04/1395669/cach-lam-dui-ga-quay-tieu-thom-lung-da-gion-rum-hap-dan-202201081512406834.jpeg",
        "SP_7UP": "https://bizweb.dktcdn.net/thumb/1024x1024/100/437/181/products/7up.jpg?v=1642436814283",
        "SP_NUOC_CAM": "https://smoothiedays.com/wp-content/uploads/2020/05/cach-pha-nuoc-cam.jpg",
        "SP_CB2": "https://burgerking.vn/media/catalog/product/cache/1/image/1800x/040ec09b1e35df139433887a97daa66f/c/o/combo-2-nguoi-a_1_1.jpg",
        "SP_CB_PHADAO": "https://burgerking.vn/media/catalog/product/cache/1/image/1800x/040ec09b1e35df139433887a97daa66f/c/o/combo-4-nguoi-a_1_1.jpg"
    };

    let gomNhom = {};

    dataSQL.forEach(row => {
      let id = row.maSanPham;
      // KHIÊN CHỐNG LỖI: Nếu DB trả về null, giá sẽ tự động là 0đ
      let giaTien = row.gia || 0; 
      
      if (!gomNhom[id]) {
        gomNhom[id] = {
          id: row.maSanPham,
          ten: row.tenSanPham,
          img: mapAnh[row.maSanPham] || defaultImages[mapTab[row.maDanhMuc] || "ga"], 
          moTa: "Món ăn từ CSDL SQL Server", 
          loai: mapTab[row.maDanhMuc] || "ga",
          coSize: row.maSize != null,
          gia: giaTien,
          giaTheoSize: { be: giaTien, vua: giaTien, lon: giaTien } 
        };
      }

      // Xử lý nạp giá tiền theo từng Size
      if (row.maSize) {
        let sizeKey = mapSize[row.maSize] || "vua";
        gomNhom[id].giaTheoSize[sizeKey] = giaTien;
        
        // Thuật toán: Cập nhật giá rẻ nhất vào size bé để in ra chữ "Từ ...đ"
        if (giaTien > 0 && (gomNhom[id].giaTheoSize.be === 0 || giaTien < gomNhom[id].giaTheoSize.be)) {
            gomNhom[id].giaTheoSize.be = giaTien;
        }
      } else {
        gomNhom[id].gia = giaTien;
      }
    });

    // Đẩy dữ liệu vào mảng gốc
    Object.values(gomNhom).forEach(item => {
      if (MENU_DATA[item.loai]) {
        MENU_DATA[item.loai].push(item);
      }
    });

    renderMon(tabHienTai);
    console.log("🔥 ĐÃ NẠP DỮ LIỆU TỪ SQL SERVER THÀNH CÔNG:", MENU_DATA);

  } catch (error) {
    console.error("Lỗi khi kết nối Backend:", error);
    hienToast("❌ Không thể kết nối với Máy chủ Database!");
  }
} // HẾT HÀM GỌI DATA

// ============================================================
//  KHỞI ĐỘNG HỆ THỐNG KHI MỞ TRANG (GỘP CHUNG VÀO 1 CHỖ DUY NHẤT)
// ============================================================
document.addEventListener("DOMContentLoaded", () => {
  // Gắn sự kiện tắt popup cho nút X
  const btnThoat = document.querySelector(".btn-thoat");
  if (btnThoat) btnThoat.addEventListener("click", _dongPopup);

  // Kích hoạt lấy dữ liệu từ Backend
  loadDataTuBackend(); 
  
  // Cập nhật số lượng giỏ hàng
  capNhatBadge();      
});