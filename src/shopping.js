let allProducts = []; //Tüm ürünleri Burda tutuyoruz
//API'den veri çek
async function fetchProducts() {
  try {
    const response = await fetch("https://dummyjson.com/products");
    const data = await response.json();
    allProducts = data.products; //ürünleri sakla
    displayProducts(data.products); // Tüm ürünleri başlangıçta göster
    console.log(data);
  } catch {
    console.error("Ürünleri çekerken hata oldu");
  }
}

// Ürünleri HTML'ye ekle
function displayProducts(products) {
  const productContainer = document.querySelector(".products");

  products.forEach((product) => {
    const productElement = document.createElement("div");
    productElement.classList.add("product");

    productElement.innerHTML = `
     <img src="${product.thumbnail}" alt="${product.title}" />
      <h2>${product.title}</h2>
      <p>Fiyat: ${product.price} TL</p>
      <button onclick="addToCart('${product.title}', ${product.price})">Sepete Ekle</button> `;

    productContainer.appendChild(productElement);
  });
}
//Arama işlemi
function searchProducts() {
  const searchTerm = document
    .getElementById("search-input")
    .value.toLowerCase();
  const filteredProducts = allProducts.filter((product) => {
    const productName = product.title || ""; // Ürün adı varsa al, yoksa boş string kullan
    return productName.toLowerCase().includes(searchTerm);
  });
  displayProducts(filteredProducts);
}
// Butona tıklandığında fonksiyonu çağır
document.querySelector('#search-button').onclick =function() {
  searchProducts();

}
  


// **Sayfa tamamen yüklendikten sonra fetchProducts() fonksiyonunu çağır**
document.addEventListener("DOMContentLoaded", fetchProducts);

// Sepeti saklamak için bir dizi tanımla
let cart = [];

// Sepete ürün ekleyen fonksiyon
function addToCart(productName, productPrice) {
  // Sepette bu üründen var mı kontrol et
  let existingProduct = cart.find((item) => item.name === productName);

  if (existingProduct) {
    // Eğer ürün varsa miktarını artır
    existingProduct.quantity += 1;
  } else {
    // Eğer ürün yoksa yeni ürün ekle
    cart.push({ name: productName, price: productPrice, quantity: 1 });
  }

  // Sepeti güncelle
  updateCart();
}

// Sepeti güncelleyen fonksiyon
function updateCart() {
  const cartList = document.getElementById("cart-items");
  const totalPriceElement = document.getElementById("total-price");

  // Önce eski listeyi temizle
  cartList.innerHTML = "";

  // Toplam fiyatı hesaplamak için değişken
  let total = 0;

  // Her ürün için liste elemanı oluştur
  cart.forEach((item) => {
    let li = document.createElement("li");
    li.textContent = `${item.name} x ${item.quantity} / ${
      item.price * item.quantity
    } TL`;

    // Sepetten kaldırma butonu ekleyelim
    let removeButton = document.createElement("button");
    removeButton.textContent = "X";
    removeButton.style.marginLeft = "10px";
    removeButton.onclick = () => removeFromCart(item.name);

    li.appendChild(removeButton);
    cartList.appendChild(li);

    // Toplam fiyatı artır
    total += item.price * item.quantity;
  });

  // Toplam fiyatı ekrana yazdır
  totalPriceElement.textContent = total;
}

// Sepetten ürün çıkaran fonksiyon
function removeFromCart(productName) {
  cart = cart.filter((item) => item.name !== productName);
  updateCart();
}

// Sayfa tamamen yüklendiğinde butona tıklama eventini ekle
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("toggle-cart").addEventListener("click", function () {
    const cart = document.getElementById("cart");

    if (cart.style.display === "none" || cart.style.display === "") {
      cart.style.display = "block"; // Aç
    } else {
      cart.style.display = "none"; // Kapat
    }
  });
});
