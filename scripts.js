const playButton = document.getElementById("play-btn");
const prevButton = document.getElementById("prev-btn");
const nextButton = document.getElementById("next-btn");
const progressBar = document.getElementById("progress-bar");
const audioPlayer = document.getElementById("audio-player");

// Menü açma butonu
const menuButton = document.getElementById("menu-btn");
const sidebar = document.getElementById("sidebar");
const closeButton = document.getElementById("close-btn");

// Menü açma ve kapama
menuButton.addEventListener("click", () => {
    if (sidebar.style.left === "0px") {
        // Menü zaten açık, kapat
        sidebar.style.left = "-250px";
    } else {
        // Menü kapalı, aç
        sidebar.style.left = "0";
    }
});

// Menü kapama butonu
closeButton.addEventListener("click", () => {
    sidebar.style.left = "-250px"; // Menü kapandığında geri kaydır
});

// Menü dışına tıklanarak menü kapanması
window.addEventListener("click", (e) => {
    if (!sidebar.contains(e.target) && !menuButton.contains(e.target)) {
        sidebar.style.left = "-250px"; // Menü dışına tıklanırsa kapansın
    }
});

// Menü içine tıklanırsa menüyü kapatmayacak şekilde kontrol ekle
sidebar.addEventListener("click", (e) => {
    e.stopPropagation(); // Menüye tıklanırsa kapanmaması için propagation'ı engelle
});

// Başlat butonuna tıklandığında
playButton.addEventListener("click", () => {
    if (audioPlayer.paused) {
        audioPlayer.play(); // Müzik çalmaya başla
        playButton.innerHTML = '<i class="fas fa-pause"></i>'; // Duraklat ikonu göster
    } else {
        audioPlayer.pause(); // Müzik duraklat
        playButton.innerHTML = '<i class="fas fa-play"></i>'; // Başlat ikonu göster
    }
});

// Geri butonuna tıklandığında (5 saniye geri sar)
prevButton.addEventListener("click", () => {
    audioPlayer.currentTime -= 5; // 5 saniye geri sar
});

// İleri butonuna tıklandığında (5 saniye ileri sar)
nextButton.addEventListener("click", () => {
    audioPlayer.currentTime += 5; // 5 saniye ileri sar
});

// Müzik çalmaya başladığında progress bar'ı güncelle
audioPlayer.addEventListener("timeupdate", () => {
    const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    progressBar.value = progress; // Progress bar'ı müzikle senkronize et
});

// Progress bar'a tıklanarak zaman atlama
progressBar.addEventListener("input", () => {
    const newTime = (progressBar.value / 100) * audioPlayer.duration;
    audioPlayer.currentTime = newTime; // Yeni saniyeye git
});
