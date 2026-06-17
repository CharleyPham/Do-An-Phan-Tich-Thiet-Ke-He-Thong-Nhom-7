// ============================================================
//  DATA.JS — Dữ liệu món ăn cho hệ thống Self Restaurant
//  Để thêm ảnh: thay đường dẫn trong trường "img"
//  Ví dụ: img: "img/ga-ran.jpg"
// ============================================================

const MENU_DATA = {
  ga: [
    {
      id: "ga01",
      ten: "Gà Rán Giòn",
      img: "https://static.kfcvietnam.com.vn/images/items/lg/2-Fried-Chicken.jpg?v=0.1",
      gia: 50000,
      moTa: "Gà rán giòn rụm, thơm phức",
      loai: "ga"
    },
    {
      id: "ga02",
      ten: "Gà Nướng Mật Ong",
      img: "https://cellphones.com.vn/sforum/wp-content/uploads/2023/08/cach-lam-ga-nuong-mat-ong-8.jpg",
      gia: 65000,
      moTa: "Gà nướng thơm lừng vị mật ong",
      loai: "ga"
    },
    {
      id: "ga03",
      ten: "Cánh Gà Sốt Cay",
      img: "https://cdn.shopify.com/s/files/1/0617/2497/files/ga-chien-han-quoc_05c5a931-131e-49cc-a2ed-e607d5a0bb37.jpg?v=1621917693",       
      gia: 45000,
      moTa: "Cánh gà sốt cay đặc biệt",
      loai: "ga"
    },
    {
      id: "ga04",
      ten: "Đùi Gà Chiên Bơ",
      img: "https://afamilycdn.com/150157425591193600/2024/6/5/bi-quyet-lam-dui-ga-chien-bo-toi-thom-nuc-mui-thit-ga-mem-ngot-hap-dan2-09504977-1717571567323-17175715675101905516227.jpg",
      gia: 70000,
      moTa: "Đùi gà chiên bơ béo ngậy",
      loai: "ga"
    }
  ],

  nuoc: [
    {
      id: "nuoc01",
      ten: "Pepsi",
      img: "https://bizweb.dktcdn.net/thumb/1024x1024/100/437/181/products/589620f2-a149-47a1-8a4d-68a4bc9608d5.jpg?v=1680139250313",
      giaTheoSize: { be: 10000, vua: 15000, lon: 20000 },
      moTa: "Nước ngọt Pepsi mát lạnh",
      loai: "nuoc",
      coSize: true
    },
    {
      id: "nuoc02",
      ten: "7UP",
      img: "https://www.7up.com/images/simple-7up/image1.png",
      giaTheoSize: { be: 10000, vua: 15000, lon: 20000 },
      moTa: "Nước ngọt 7UP vị chanh",
      loai: "nuoc",
      coSize: true
    },
    {
      id: "nuoc03",
      ten: "Trà Đào",
      img: "https://horecavn.com/wp-content/uploads/2024/05/huong-dan-cong-thuc-tra-dao-cam-sa-hut-khach-ngon-kho-cuong_20240526180626.jpg",
      giaTheoSize: { be: 15000, vua: 20000, lon: 25000 },
      moTa: "Trà đào thơm mát",
      loai: "nuoc",
      coSize: true
    },
    {
      id: "nuoc04",
      ten: "Nước Cam",
      img: "https://suckhoedoisong.qltns.mediacdn.vn/324455921873985536/2022/2/19/cach-lam-nuoc-cam-ep-ngon-va-thom-ket-hop-voi-le-va-gung-5-1645248090817401855254.jpg",
      giaTheoSize: { be: 20000, vua: 25000, lon: 30000 },
      moTa: "Nước cam tươi nguyên chất",
      loai: "nuoc",
      coSize: true
    }
  ],

  combo: [
    {
      id: "combo01",
      ten: "Combo Đơn",
      img: "https://burgerking.vn/media/catalog/product/cache/1/image/1800x/040ec09b1e35df139433887a97daa66f/c/o/combo-burger-excheese.jpg",
      giaTheoSize: { be: 85000, vua: 89000, lon: 95000 },
      moTa: "1 Gà rán + 1 Nước (được chọn size)",
      loai: "combo",
      coSize: true
    },
    {
      id: "combo02",
      ten: "Combo Đôi",
      img: "https://jollibee.com.vn/media/catalog/product/cache/11f3e6435b23ab624dc55c2d3fe9479d/c/a/cap_doi_an_y__2g2m-compressed.jpg",
      giaTheoSize: { be: 140000, vua: 150000, lon: 165000 },
      moTa: "2 Gà rán + 2 Nước (được chọn size)",
      loai: "combo",
      coSize: true
    },
    {
      id: "combo03",
      ten: "Combo Gia Đình",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4sBs_LbJgYX0PlWA_ukcX4jR3aKeiEv-S0g&s",
      giaTheoSize: { be: 270000, vua: 280000, lon: 295000 },
      moTa: "4 Gà rán + 4 Nước (được chọn size) + Khoai tây",
      loai: "combo",
      coSize: true
    },
    {
      id: "combo04",
      ten: "Combo Tiệc",
      img: "https://static.kfcvietnam.com.vn/images/email/COMBO-95-CHEERFUL.jpg",
      giaTheoSize: { be: 420000, vua: 450000, lon: 490000 },
      moTa: "8 Gà rán + 8 Nước (được chọn size) + 2 Phần khoai",
      loai: "combo",
      coSize: true
    }
  ]
};

// ============================================================
//  CART — Lưu giỏ hàng trong localStorage
// ============================================================
const Cart = {
  getAll() {
    return JSON.parse(localStorage.getItem("cart") || "[]");
  },
  save(items) {
    localStorage.setItem("cart", JSON.stringify(items));
  },
  add(item) {
    const items = this.getAll();
    // Kiểm tra trùng: cùng id + cùng size
    const key = item.id + (item.size || "");
    const existed = items.find(i => (i.id + (i.size || "")) === key);
    if (existed) {
      existed.soLuong += item.soLuong;
    } else {
      items.push(item);
    }
    this.save(items);
  },
  remove(index) {
    const items = this.getAll();
    items.splice(index, 1);
    this.save(items);
  },
  clear() {
    localStorage.removeItem("cart");
  },
  tinhTong() {
    return this.getAll().reduce((sum, i) => sum + (i.gia || 0) * (i.soLuong || 1), 0);
  },
  soLuong() {
    return this.getAll().reduce((sum, i) => sum + (i.soLuong || 1), 0);
  }
};

// Format tiền VNĐ
function formatTien(so) {
  return so.toLocaleString("vi-VN") + "đ";
}

// Tạo mã đơn hàng
function taoMaDon() {
  const now = new Date();
  const dateStr = now.toISOString().slice(0,10).replace(/-/g,"");
  const rand = Math.floor(Math.random() * 9000) + 1000;
  return `#ORD-${dateStr}-${rand}`;
}