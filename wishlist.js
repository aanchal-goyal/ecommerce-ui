document.addEventListener("DOMContentLoaded", () => {
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  
    const buttons = document.querySelectorAll(".wishlist-btn");
  
    buttons.forEach((btn, index) => {
      if (wishlist.includes(index)) {
        btn.classList.add("active");
        btn.textContent = "❤️";
      }
  
      btn.addEventListener("click", () => {
        if (wishlist.includes(index)) {
          wishlist = wishlist.filter(i => i !== index);
          btn.classList.remove("active");
          btn.textContent = "♡";
        } else {
          wishlist.push(index);
          btn.classList.add("active");
          btn.textContent = "❤️";
        }
  
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
      });
    });
});
  