let allProducts = []; // Tüm ürünleri burada tutuyoruz

// API'den veri çek
async function fetchProducts() {
  try {
    const response = await fetch("https://dummyjson.com/products");
    const data = await response.json();
    allProducts = data.products; // Ürünleri sakla
    displayProducts(allProducts); // Tüm ürünleri başlangıçta göster
  } catch (error) {
    console.error("Ürünleri çekerken hata oldu:", error);
  }
}

// Ürünleri ekrana yazdır
function displayProducts(products) {
  const productContainer = document.querySelector(".products");
  productContainer.innerHTML = ""; // Önce mevcut ürünleri temizle

  if (products.length === 0) {
    productContainer.innerHTML = "<p>Ürün bulunamadı.</p>";
    return;
  }

  products.forEach((product) => {
    const productElement = document.createElement("div");
    productElement.classList.add("product");

    productElement.innerHTML = `
      <img src="${product.thumbnail}" alt="${product.title}" />
      <h2>${product.title}</h2>
      <p>Fiyat: ${product.price} TL</p>
      <button class="add-to-cart" data-name="${product.title}" data-price="${product.price}">Sepete Ekle</button>
    `;

    productContainer.appendChild(productElement);
  });

  // Ürün ekleme butonlarına event listener ekle
  document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", function () {
      addToCart(this.dataset.name, parseFloat(this.dataset.price));
    });
  });
}

// Arama işlemi
function searchProducts() {
  const searchTerm = document
    .getElementById("search-input")
    .value.toLowerCase();

  if (allProducts.length === 0) {
    console.warn("Ürünler yüklenmeden arama yapılıyor!");
    return;
  }

  const filteredProducts = allProducts.filter((product) =>
    product.title.toLowerCase().includes(searchTerm)
  );

  displayProducts(filteredProducts);
}

// Sepet işlemleri
let cart = [];

function addToCart(productName, productPrice) {
  let existingProduct = cart.find((item) => item.name === productName);

  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({ name: productName, price: productPrice, quantity: 1 });
  }

  updateCart();
}

function updateCart() {
  const cartList = document.getElementById("cart-items");
  const totalPriceElement = document.getElementById("total-price");
  cartList.innerHTML = "";

  let total = 0;

  cart.forEach((item) => {
    let li = document.createElement("li");
    li.textContent = `${item.name} x ${item.quantity} / ${
      item.price * item.quantity
    } TL`;

    let removeButton = document.createElement("button");
    removeButton.textContent = "X";
    removeButton.style.marginLeft = "10px";
    removeButton.onclick = () => removeFromCart(item.name);

    li.appendChild(removeButton);
    cartList.appendChild(li);

    total += item.price * item.quantity;
  });

  totalPriceElement.textContent = total;
}

function removeFromCart(productName) {
  let productIndex = cart.findIndex((item) => item.name === productName);

  if (productIndex !== -1) {
    if (cart[productIndex].quantity > 1) {
      cart[productIndex].quantity -= 1;
    } else {
      cart.splice(productIndex, 1);
    }
  }

  updateCart();
}

// Sayfa tamamen yüklendiğinde eventleri ekle
document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("search-button")
    .addEventListener("click", searchProducts);
  document.getElementById("toggle-cart").addEventListener("click", function () {
    const cart = document.getElementById("cart");
    cart.style.display =
      cart.style.display === "none" || cart.style.display === ""
        ? "block"
        : "none";
  });

  fetchProducts();
});
