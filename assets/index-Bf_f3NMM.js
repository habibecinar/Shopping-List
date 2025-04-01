(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const c of r)if(c.type==="childList")for(const s of c.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function t(r){const c={};return r.integrity&&(c.integrity=r.integrity),r.referrerPolicy&&(c.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?c.credentials="include":r.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function o(r){if(r.ep)return;r.ep=!0;const c=t(r);fetch(r.href,c)}})();let i=[];async function u(){try{i=(await(await fetch("https://dummyjson.com/products")).json()).products,l(i)}catch(e){console.error("Ürünleri çekerken hata oldu:",e)}}function l(e){const n=document.querySelector(".products");if(n.innerHTML="",e.length===0){n.innerHTML="<p>Ürün bulunamadı.</p>";return}e.forEach(t=>{const o=document.createElement("div");o.classList.add("product"),o.innerHTML=`
      <img src="${t.thumbnail}" alt="${t.title}" />
      <h2>${t.title}</h2>
      <p>Fiyat: ${t.price} TL</p>
      <button class="add-to-cart" data-name="${t.title}" data-price="${t.price}">Sepete Ekle</button>
    `,n.appendChild(o)}),document.querySelectorAll(".add-to-cart").forEach(t=>{t.addEventListener("click",function(){m(this.dataset.name,parseFloat(this.dataset.price))})})}function f(){const e=document.getElementById("search-input").value.toLowerCase();if(i.length===0){console.warn("Ürünler yüklenmeden arama yapılıyor!");return}const n=i.filter(t=>t.title.toLowerCase().includes(e));l(n)}let a=[];function m(e,n){let t=a.find(o=>o.name===e);t?t.quantity+=1:a.push({name:e,price:n,quantity:1}),d()}function d(){const e=document.getElementById("cart-items"),n=document.getElementById("total-price");e.innerHTML="";let t=0;a.forEach(o=>{let r=document.createElement("li");r.textContent=`${o.name} x ${o.quantity} / ${o.price*o.quantity} TL`;let c=document.createElement("button");c.textContent="X",c.style.marginLeft="10px",c.onclick=()=>p(o.name),r.appendChild(c),e.appendChild(r),t+=o.price*o.quantity}),n.textContent=t}function p(e){let n=a.findIndex(t=>t.name===e);n!==-1&&(a[n].quantity>1?a[n].quantity-=1:a.splice(n,1)),d()}document.addEventListener("DOMContentLoaded",function(){document.getElementById("search-button").addEventListener("click",f),document.getElementById("toggle-cart").addEventListener("click",function(){const e=document.getElementById("cart");e.style.display=e.style.display==="none"||e.style.display===""?"block":"none"}),u()});
