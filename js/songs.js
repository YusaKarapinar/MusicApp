const menuButton = document.getElementById("menu-btn");
const sidebar = document.getElementById("sidebar");
const closeButton = document.getElementById("close-btn");
const songsSection = document.querySelector(".songs-section");

// Menü açma
menuButton.addEventListener("click", () => {
    sidebar.classList.add("open"); // Menü açıldığında "open" sınıfı eklenir
    songsSection.style.marginLeft = "250px"; // Şarkılarım listesi sağa kayar
});

// Menü kapama
closeButton.addEventListener("click", () => {
    sidebar.classList.remove("open"); // Menü kapandığında "open" sınıfı kaldırılır
    songsSection.style.marginLeft = "0"; // Şarkılarım listesi sola kayar
});
