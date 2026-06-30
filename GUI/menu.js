// ============================================================
//  MENU.JS — Logic trang menu chính
// ============================================================

let tabHienTai = "ga";
let monDangChon  = null;
let soLuong      = 1;
let sizeDangChon = "be";
let optionsComboHienTai = [];

// ĐÃ SỬA: Link icon dùng cho Tab và Title
const tabIcons = {
    ga: "https://img.icons8.com/fluency/96/poultry-leg.png",
    burger: "https://img.icons8.com/fluency/96/hamburger.png",
    kem: "https://img.icons8.com/fluency/96/french-fries.png",
    nuoc: "https://img.icons8.com/fluency/96/soda-cup.png",
    combo: "https://img.icons8.com/fluency/96/take-away-food.png"
};
const tabNames = {
    ga: "Gà Rán",
    burger: "Burger & Cơm",
    kem: "Thức Ăn Kèm",
    nuoc: "Thức Uống",
    combo: "Combo Khuyến Mãi"
};

// ĐÃ SỬA: Ảnh mặc định khi món ăn bị thiếu ảnh
const defaultImages = {
    ga: "https://placehold.co/400x300/FFE5E8/E8192C?text=Gà+Rán",
    burger: "https://placehold.co/400x300/FFE5E8/E8192C?text=Burger",
    kem: "https://placehold.co/400x300/FFE5E8/E8192C?text=Ăn+Kèm",
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

    document.getElementById("title-icon").innerHTML = `<img src="${tabIcons[tab]}" style="width:26px; height:26px; object-fit:contain;">`;
    document.getElementById("title-text").textContent  = tabNames[tab];

    renderMon(tab);
}

// ============================================================
//  POPUP MÓN (TỰ ĐỘNG DỰNG Ô CHỌN KHI LÀ COMBO)
// ============================================================
function moPopup(mon, idx) {
    monDangChon  = mon;
    soLuong      = 1;
    sizeDangChon = "be";
    optionsComboHienTai = [];

    const popupImg = document.getElementById("popup-img");
    popupImg.innerHTML = "";
    const imgSrc = mon.img ? mon.img : defaultImages[tabHienTai];
    const img = document.createElement("img");
    img.src = imgSrc;
    img.className = "popup-real-img";
    img.style.cssText = "width: 100%; height: 100%; object-fit: cover; display: block;";
    popupImg.appendChild(img);

    document.getElementById("popup-ten").textContent   = mon.ten;
    document.getElementById("popup-mota").textContent  = mon.moTa;
    document.getElementById("sl-num").textContent       = "1";

    const comboContainer = document.getElementById("combo-slots-container");
    if (comboContainer) comboContainer.innerHTML = "";

    const sizeGroup = document.getElementById("size-group");

    if (mon.isCombo === true || mon.id.startsWith("SP_CB")) {
        if (sizeGroup) sizeGroup.style.display = "none";

        fetch(`http://localhost:8081/api/sanpham/combo/${mon.id}/options`)
            .then(res => res.json())
            .then(options => {
                optionsComboHienTai = options;

                if (!options || options.length === 0) {
                    if (comboContainer) {
                        comboContainer.innerHTML = `
              <div style="padding: 12px; color: #6b7280; font-size: 14px; text-align: center; background: #f3f4f6; border-radius: 8px;">
                Món ăn kèm phục vụ theo cấu hình chuẩn của cửa hàng.
              </div>`;
                    }
                    document.getElementById("popup-gia").textContent = formatTien(mon.gia);
                    return;
                }

                const cacMaSlotUnique = [...new Set(options.map(opt => opt.maSlot))];

                cacMaSlotUnique.forEach(maSlotHienTai => {
                    const slotDiv = document.createElement("div");
                    slotDiv.className = "combo-slot-block";
                    slotDiv.style.cssText = "margin-bottom: 14px; padding: 10px; background: #f9fafb; border-radius: 8px; border: 1px solid #e5e7eb;";

                    let tenSlotHienThi = "Lựa chọn đi kèm";
                    if (maSlotHienTai === "SLOT_DRINK") tenSlotHienThi = "Chọn Nước Uống";
                    if (maSlotHienTai === "SLOT_SIDE") tenSlotHienThi = "Chọn Đồ Ăn Kèm";

                    slotDiv.innerHTML = `<div class="slot-title" style="margin-bottom: 8px;"><strong style="color: #374151; font-size: 14px;">${tenSlotHienThi}</strong></div>`;

                    const optionsGroup = document.createElement("div");
                    optionsGroup.style.cssText = "display: flex; gap: 8px; flex-wrap: wrap;";

                    const optionsCuaSlot = options.filter(opt => opt.maSlot === maSlotHienTai);

                    optionsCuaSlot.forEach((opt, optIdx) => {
                        const label = document.createElement("label");
                        label.style.cssText = "border: 1px solid #d1d5db; padding: 6px 12px; border-radius: 6px; cursor: pointer; display: flex; align-items: center; gap: 6px; background: #fff; font-size: 13px;";

                        const radio = document.createElement("input");
                        radio.type = "radio";
                        radio.name = `slot_${maSlotHienTai}`;
                        radio.value = opt.maGia;
                        radio.dataset.phuthu = opt.phiPhuThu;

                        console.log("Dữ liệu gốc của tùy chọn:", opt);

                        // ĐÃ SỬA: Khớp chính xác mã định danh kích cỡ từ Database SQL Server
                        const maSizeUpper = opt.maSize ? opt.maSize.toUpperCase().trim() : "";
                        let textDuoiSize = ""; 

                        if (maSizeUpper === "SZ_L" || maSizeUpper === "L" || maSizeUpper === "SIZE_LON") {
                            textDuoiSize = " (Lớn)";
                        } else if (maSizeUpper === "SZ_R" || maSizeUpper === "R" || maSizeUpper === "SIZE_VUA") {
                            textDuoiSize = " (Vừa)";
                        } else if (maSizeUpper === "SZ_S" || maSizeUpper === "S" || maSizeUpper === "SIZE_BE") {
                            textDuoiSize = " (Nhỏ)";
                        } else {
                            // Trường hợp SZ_NONE hoặc rỗng thì giữ nguyên chuỗi trống, không hiển thị chữ nữa
                            textDuoiSize = ""; 
                        }

                        // Gán thông tin tên đầy đủ vào tập dữ liệu của thẻ radio
                        radio.dataset.tenmon = `${opt.tenSanPham}${textDuoiSize}`;

                        if (opt.isMacDinh === true || opt.isMacDinh === "True" || optIdx === 0) {
                            radio.checked = true;
                        }

                        radio.addEventListener("change", capNhatGiaComboPopup);
                        label.appendChild(radio);

                        // Xây dựng chuỗi text hiển thị trực quan lên màn hình giao diện
                        let textHienThi = `${opt.tenSanPham}${textDuoiSize}`;
                        if (opt.phiPhuThu > 0) {
                            textHienThi += ` (+${formatTien(opt.phiPhuThu)})`;
                        }

                        label.appendChild(document.createTextNode(textHienThi));
                        optionsGroup.appendChild(label);
                    });

                    slotDiv.appendChild(optionsGroup);
                    if (comboContainer) comboContainer.appendChild(slotDiv);
                });

                capNhatGiaComboPopup();
            })
            .catch(err => {
                console.error("Lỗi tải API tùy chọn Combo:", err);
                document.getElementById("popup-gia").textContent = formatTien(mon.gia);
            });

    } else {
        if (sizeGroup) sizeGroup.style.display = mon.coSize ? "flex" : "none";
        if (mon.coSize) {
            document.getElementById("gia-be").textContent  = formatTien(mon.giaTheoSize.be);
            document.getElementById("gia-vua").textContent = formatTien(mon.giaTheoSize.vua);
            document.getElementById("gia-lon").textContent = formatTien(mon.giaTheoSize.lon);
            capNhatGiaPopup();
        } else {
            document.getElementById("popup-gia").textContent = formatTien(mon.gia);
        }
    }

    document.getElementById("overlay").classList.add("show");
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
function thayDoiSL(phuongHuong) {
    soLuong += phuongHuong;
    if (soLuong < 1) soLuong = 1;
    document.getElementById("sl-num").textContent = soLuong;

    if (monDangChon.isCombo === true || monDangChon.id.startsWith("SP_CB")) {
        capNhatGiaComboPopup();
    } else {
        capNhatGiaPopup();
    }
}

function capNhatGiaComboPopup() {
    if (!monDangChon) return;

    let tongPhuThu = 0;
    const radiosDaChon = document.querySelectorAll("#combo-slots-container input[type='radio']:checked");

    radiosDaChon.forEach(radio => {
        tongPhuThu += parseFloat(radio.dataset.phuthu || 0);
    });

    const giaMotGoiCombo = monDangChon.gia + tongPhuThu;
    document.getElementById("popup-gia").textContent = formatTien(giaMotGoiCombo * soLuong);
}

// ============================================================
//  THÊM VÀO GIỎ
// ============================================================
function themVaGio() {
    if (!monDangChon) return;

    let itemGioHang = {
        maSanPham: monDangChon.id,
        tenSanPham: monDangChon.ten,
        soLuong: soLuong,
        isCombo: monDangChon.isCombo || monDangChon.id.startsWith("SP_CB"),
        tuyChonCombo: []
    };

    if (itemGioHang.isCombo) {
        const slotBlocks = document.querySelectorAll(".combo-slot-block");

        slotBlocks.forEach(block => {
            const radioChecked = block.querySelector("input[type='radio']:checked");

            if (radioChecked) {
                const maSlot = radioChecked.name.replace("slot_", "");
                const maGiaSauDoi = radioChecked.value;
                const phiPhuThuThucTe = parseFloat(radioChecked.dataset.phuthu) || 0;
                const tenMonHienThi = radioChecked.dataset.tenmon;

                itemGioHang.tuyChonCombo.push({
                    maSlot: maSlot,
                    maGiaSauDoi: maGiaSauDoi,
                    phiPhuThuThucTe: phiPhuThuThucTe,
                    tenMonHienThi: tenMonHienThi
                });
            }
        });

        let tongPhuThu = itemGioHang.tuyChonCombo.reduce((sum, opt) => sum + opt.phiPhuThuThucTe, 0);
        itemGioHang.giaDonVi = monDangChon.gia + tongPhuThu;
    } else {
        itemGioHang.maSize = sizeDangChon.toUpperCase();
        itemGioHang.giaDonVi = monDangChon.coSize ? monDangChon.giaTheoSize[sizeDangChon] : monDangChon.gia;
    }

    let gioHang = JSON.parse(localStorage.getItem("gioHang")) || [];
    gioHang.push(itemGioHang);
    localStorage.setItem("gioHang", JSON.stringify(gioHang));

    _dongPopup();
    capNhatBadge();
    hienToast(`Đã thêm ${itemGioHang.tenSanPham} vào giỏ!`);
}

// ============================================================
//  BADGE & TOAST
// ============================================================
function capNhatBadge() {
    const gioHang = JSON.parse(localStorage.getItem("gioHang")) || [];
    const count = gioHang.reduce((sum, item) => sum + item.soLuong, 0);
    document.getElementById("cart-badge").textContent = count;
}

let toastTimer;
function hienToast(msg) {
    const t = document.getElementById("toast");
    if (!t) return;
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove("show"), 2500);
}

// ============================================================
//  KẾT NỐI API TỪ BACKEND SPRING BOOT
// ============================================================
async function loadDataTuBackend() {
    try {
        const url = "http://localhost:8081/api/sanpham?nocache=" + new Date().getTime();
        const response = await fetch(url);
        const dataSQL = await response.json();

        // ĐÃ SỬA: Reset mảng cho đủ 5 danh mục
        MENU_DATA.ga = [];
        MENU_DATA.burger = [];
        MENU_DATA.kem = [];
        MENU_DATA.nuoc = [];
        MENU_DATA.combo = [];

        // ĐÃ SỬA: Bắt CHÍNH XÁC mã từ Database SQL Server
        const mapTab = {
            "DM_GA": "ga",
            "DM_BURGER": "burger",
            "DM_KEM": "kem",
            "DM_NUOC": "nuoc",
            "DM_COMBO": "combo"
        };

        // ĐÃ CẬP NHẬT: Nhận diện chuẩn kích cỡ R, L, S từ Database
        const mapSize = {
            "SIZE_BE": "be", "SIZE_S": "be", "S": "be",
            "SIZE_VUA": "vua", "SIZE_R": "vua", "R": "vua",
            "SIZE_LON": "lon", "SIZE_L": "lon", "L": "lon"
        };

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
                    giaTheoSize: { be: giaTien, vua: giaTien, lon: giaTien },
                    isCombo: row.isCombo === true || row.maSanPham.startsWith("SP_CB")
                };
            }

            if (row.maSize) {
                let sizeKey = mapSize[row.maSize] || "vua";
                gomNhom[id].giaTheoSize[sizeKey] = giaTien;

                if (giaTien > 0 && (gomNhom[id].giaTheoSize.be === 0 || giaTien < gomNhom[id].giaTheoSize.be)) {
                    gomNhom[id].giaTheoSize.be = giaTien;
                }
            } else {
                gomNhom[id].gia = giaTien;
            }
        });

        Object.values(gomNhom).forEach(item => {
            if (MENU_DATA[item.loai]) {
                MENU_DATA[item.loai].push(item);
            }
        });

        renderMon(tabHienTai);

    } catch (error) {
        console.error("Lỗi khi kết nối Backend:", error);
        hienToast("❌ Không thể kết nối với Máy chủ Database!");
    }
}

// ============================================================
//  KHỞI ĐỘNG HỆ THỐNG KHI MỞ TRANG
// ============================================================
document.addEventListener("DOMContentLoaded", () => {
    const btnThoat = document.querySelector(".btn-thoat");
    if (btnThoat) btnThoat.addEventListener("click", _dongPopup);

    loadDataTuBackend();
    capNhatBadge();
});