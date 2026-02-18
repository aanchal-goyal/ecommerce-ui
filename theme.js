document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.getElementById("theme-toggle");
    const savedTheme = localStorage.getItem("theme");
  
    if (savedTheme === "dark") {
      document.body.classList.add("dark");
      toggle.textContent = "☀️";
    }
  
    toggle.addEventListener("click", () => {
      document.body.classList.toggle("dark");
  
      const isDark = document.body.classList.contains("dark");
      toggle.textContent = isDark ? "☀️" : "🌙";
      localStorage.setItem("theme", isDark ? "dark" : "light");
    });
  });
  