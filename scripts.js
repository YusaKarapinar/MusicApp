// HTML elementlerine referanslar
const playButton = document.getElementById("play-btn");
const prevButton = document.getElementById("prev-btn");
const nextButton = document.getElementById("next-btn");
const progressBar = document.getElementById("progress-bar");
const audioPlayer = document.getElementById("audio-player");

const menuButton = document.getElementById("menu-btn");
const sidebar = document.getElementById("sidebar");
const closeButton = document.getElementById("close-btn");
const musicList = document.getElementById("music-list");

// Menü açma butonu
menuButton.addEventListener("click", () => {
    if (sidebar.style.left === "0px") {
        sidebar.style.left = "-250px"; // Menü kapalı
    } else {
        sidebar.style.left = "0"; // Menü açık
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

// Menüye tıklanması engelleniyor
sidebar.addEventListener("click", (e) => {
    e.stopPropagation();
});

// Başlat/Duraklat butonuna tıklanması
playButton.addEventListener("click", () => {
    if (audioPlayer.paused) {
        audioPlayer.play(); // Müzik çalmaya başla
        playButton.innerHTML = '<i class="fas fa-pause"></i>'; // Duraklat ikonu
    } else {
        audioPlayer.pause(); // Müzik duraklat
        playButton.innerHTML = '<i class="fas fa-play"></i>'; // Başlat ikonu
    }
});

// Geri butonuna tıklanması (5 saniye geri sar)
prevButton.addEventListener("click", () => {
    audioPlayer.currentTime -= 5;
});

// İleri butonuna tıklanması (5 saniye ileri sar)
nextButton.addEventListener("click", () => {
    audioPlayer.currentTime += 5;
});

// Progress bar'ı güncelleme
audioPlayer.addEventListener("timeupdate", () => {
    const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    progressBar.value = progress; // Progress bar'ı güncelle
});

// Progress bar'a tıklanarak zaman atlama
progressBar.addEventListener("input", () => {
    const newTime = (progressBar.value / 100) * audioPlayer.duration;
    audioPlayer.currentTime = newTime;
});

// Space tuşuna basıldığında müziği duraklat
window.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {  // Eğer Space tuşuna basıldıysa
        e.preventDefault(); // Sayfanın kaydırılmasını engelle
        if (!audioPlayer.paused) {
            audioPlayer.pause();  // Müzik duraklat
            playButton.innerHTML = '<i class="fas fa-play"></i>';  // Başlat ikonu
        }
    }
});

// Müzik dosyalarını listele
fetch('api/get-music-list.php')
    .then(response => response.json())
    .then(data => {
        data.forEach(file => {
            const li = document.createElement("li");
            li.textContent = file;
            li.addEventListener("click", () => {
                audioPlayer.src = `music/${file}`;
                audioPlayer.play();
                playButton.innerHTML = '<i class="fas fa-pause"></i>';
            });
            musicList.appendChild(li);
        });
    })
    .catch(err => console.error('Müzik dosyaları yüklenemedi:', err));
