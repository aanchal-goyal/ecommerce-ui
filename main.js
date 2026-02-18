document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".card button");
  
    buttons.forEach(btn => {
      btn.addEventListener("click", () => {
        const card = btn.parentElement;
        const name = card.dataset.name;
        const price = Number(card.dataset.price);
  
        const existing = cart.find(item => item.name === name);
  
        if (existing) {
          existing.qty++;
        } else {
          cart.push({ name, price, qty: 1 });
        }
  
        updateCart(); // now works ✅
      });
    });
  });
  