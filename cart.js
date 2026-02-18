let cart = []; // GLOBAL

document.addEventListener("DOMContentLoaded", () => {

  function saveCart() {
    localStorage.setItem("shop_cart", JSON.stringify(cart));
  }

  function loadCart() {
    const saved = localStorage.getItem("shop_cart");
    if (saved) cart = JSON.parse(saved);
  }

  window.updateCart = function () {   // 👈 MAKE GLOBAL
    cartItems.innerHTML = "";
    let total = 0;
    let totalItems = 0;

    cart.forEach((item, index) => {
      total += item.price * item.qty;
      totalItems += item.qty;

      const li = document.createElement("li");
      li.innerHTML = `
        <span>${item.name} - ₹${item.price}</span>
        <div>
          <button class="minus">−</button>
          <span>${item.qty}</span>
          <button class="plus">+</button>
          <button class="remove">❌</button>
        </div>
      `;

      li.querySelector(".minus").onclick = () => {
        item.qty--;
        if (item.qty === 0) cart.splice(index, 1);
        updateCart();
      };

      li.querySelector(".plus").onclick = () => {
        item.qty++;
        updateCart();
      };

      li.querySelector(".remove").onclick = () => {
        cart.splice(index, 1);
        updateCart();
      };

      cartItems.appendChild(li);
    });

    counter.innerText = totalItems;
    totalEl.textContent = `Total: ₹${total}`;
    saveCart();
  };

  const counter = document.getElementById("count");
  const cartPanel = document.getElementById("cart-panel");
  const cartBtn = document.getElementById("cart");
  const closeBtn = document.getElementById("close-cart");
  const cartItems = document.getElementById("cart-items");
  const totalEl = document.getElementById("total");

  cartBtn.onclick = () => cartPanel.classList.add("open");
  closeBtn.onclick = () => cartPanel.classList.remove("open");

  loadCart();
  updateCart();
});
