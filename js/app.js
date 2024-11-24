const menuButton = document.getElementById("menu-btn");
const sidebar = document.getElementById("sidebar");
const closeButton = document.getElementById("close-btn");

// Menü açma
menuButton.addEventListener("click", () => {
    sidebar.classList.add("open"); // Menü açıldığında "open" sınıfı eklenir
});

// Menü kapama
closeButton.addEventListener("click", () => {
    sidebar.classList.remove("open"); // Menü kapandığında "open" sınıfı kaldırılır
});

// Menü dışına tıklayınca kapama
window.addEventListener("click", (e) => {
    if (!sidebar.contains(e.target) && !menuButton.contains(e.target)) {
        sidebar.classList.remove("open");
    }
});
