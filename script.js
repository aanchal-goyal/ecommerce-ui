function saveCart() {
  localStorage.setItem("shop_cart", JSON.stringify(cart));
}
  
function loadCart() {
  const saved = localStorage.getItem("shop_cart");
  if (saved) cart = JSON.parse(saved);
}  

let count = 0;
let cart = [];
const buttons = document.querySelectorAll(".card button");
const counter = document.getElementById("count");
const cartPanel = document.getElementById("cart-panel");
const cartBtn = document.getElementById("cart");
const closeBtn = document.getElementById("close-cart");
const cartItems = document.getElementById("cart-items");
const totalEl = document.getElementById("total");

// --- Search & Filter Setup ---
const searchInput = document.getElementById("search");
const filterSelect = document.getElementById("filter");
const products = document.querySelectorAll(".card");

function filterProducts() {
  const search = searchInput.value.toLowerCase();
  const category = filterSelect.value;

  products.forEach(card => {
    const name = card.dataset.name.toLowerCase();
    const cat = card.dataset.category;

    const matchSearch = name.includes(search);
    const matchFilter = category === "all" || cat === category;

    // Show or hide card
    card.style.display = (matchSearch && matchFilter) ? "block" : "none";
  });
}

searchInput.addEventListener("input", filterProducts);
filterSelect.addEventListener("change", filterProducts);


loadCart();
updateCart();

buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    const card = btn.parentElement;
    const name = card.dataset.name;
    const price = Number(card.dataset.price);

    const existing = cart.find(i => i.name === name);
    if (existing) {
      existing.qty++;
    } else {
      cart.push({ name, price, qty: 1 });
    }

    count++;
    counter.innerText = count;
    updateCart();
  });
});

cartBtn.onclick = () => cartPanel.classList.add("open");
closeBtn.onclick = () => cartPanel.classList.remove("open");

function updateCart() {
    cartItems.innerHTML = "";
    let total = 0;
    let totalItems = 0;
  
    cart.forEach((item, index) => {
      total += item.price * item.qty;
      totalItems += item.qty;
  
      const li = document.createElement("li");
      li.style.display = "flex";
      li.style.justifyContent = "space-between";
      li.style.alignItems = "center";
      li.style.gap = "8px";
  
      const text = document.createElement("span");
      text.textContent = `${item.name} - ₹${item.price}`;
  
      const qtyBox = document.createElement("div");
      qtyBox.style.display = "flex";
      qtyBox.style.alignItems = "center";
      qtyBox.style.gap = "5px";
  
      const minus = document.createElement("button");
      minus.textContent = "−";
  
      const qty = document.createElement("span");
      qty.textContent = item.qty;
  
      const plus = document.createElement("button");
      plus.textContent = "+";
  
      const removeBtn = document.createElement("button");
      removeBtn.textContent = "❌";
  
      minus.onclick = () => {
        item.qty--;
        if (item.qty <= 0) cart.splice(index, 1);
        updateCart();
      };
  
      plus.onclick = () => {
        item.qty++;
        updateCart();
      };
  
      removeBtn.onclick = () => {
        cart.splice(index, 1);
        updateCart();
      };
  
      qtyBox.append(minus, qty, plus);
      li.append(text, qtyBox, removeBtn);
      cartItems.appendChild(li);
    });
  
    counter.innerText = totalItems;
    totalEl.textContent = `Total: ₹${total}`;
  
    if (!document.getElementById("checkout")) {
      const checkout = document.createElement("button");
      checkout.id = "checkout";
      checkout.textContent = "Checkout";
      checkout.style.background = "#22c55e";
      checkout.style.color = "white";
      checkout.style.border = "none";
      checkout.style.padding = "10px";
      checkout.style.width = "100%";
      checkout.style.marginTop = "10px";
      checkout.style.borderRadius = "6px";
      checkout.onclick = () => {
        alert("Checkout successful (demo)!");
        cart = [];
        updateCart();
        cartPanel.classList.remove("open");
      };
      cartPanel.appendChild(checkout);
    }
    saveCart();

  }

  const chatBtn = document.getElementById("chatbot-btn");
const chatbot = document.getElementById("chatbot");
const closeChat = document.getElementById("close-chat");
const sendBtn = document.getElementById("send-btn");
const chatInput = document.getElementById("chat-input");
const chatBody = document.getElementById("chat-body");

chatBtn.onclick = () => chatbot.style.display = "flex";
closeChat.onclick = () => chatbot.style.display = "none";

sendBtn.onclick = sendMessage;

function sendMessage() {
  const text = chatInput.value.trim();
  if (!text) return;

  addMessage("You", text);
  respond(text.toLowerCase());
  chatInput.value = "";
}

function addMessage(sender, text) {
  const div = document.createElement("div");
  div.innerHTML = `<strong>${sender}:</strong> ${text}`;
  chatBody.appendChild(div);
}

function respond(text) {
  let reply = "";

  if (text.includes("hello") || text.includes("hi")) {
    reply = "Hello 👋 I can help you find products!";
  }

  else if (text.includes("headphones")) {
    reply = "We have Headphones Black, White, and Pro. Use search or filter to see them.";
  }

  else if (text.includes("shoes")) {
    reply = "We offer Running Shoes, Casual Shoes, and Sports Shoes.";
  }

  else if (text.includes("phone")) {
    reply = "Smart Phone Lite, X, and Pro are available.";
  }

  else if (text.includes("cart")) {
    reply = "Click the 🛒 icon to open your cart.";
  }

  else if (text.includes("price")) {
    reply = "Prices range from ₹999 to ₹12999.";
  }

  else if (text.includes("help")) {
    reply = "You can search products, filter categories, and add items to cart.";
  }

  else {
    reply = "Try asking about shoes, phones, headphones, or cart.";
  }

  setTimeout(() => addMessage("Bot", reply), 400);
}

  