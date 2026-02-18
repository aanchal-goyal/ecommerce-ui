document.addEventListener("DOMContentLoaded", () => {
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
  
        card.style.display = (matchSearch && matchFilter) ? "block" : "none";
      });
    }
  
    searchInput.addEventListener("input", filterProducts);
    filterSelect.addEventListener("change", filterProducts);
});
  