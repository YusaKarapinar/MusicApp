// Şarkılar listesini PHP'den al ve ekrana yazdır
function loadSongs() {
    const songsList = document.getElementById("songs-list");
    songsList.innerHTML = "<li>Şarkılar yükleniyor...</li>"; // Yükleniyor mesajı

    fetch('api/get-music-list.php')
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                songsList.innerHTML = `<li>${data.error}</li>`;
                return;
            }

            // Şarkıları listele
            songsList.innerHTML = ""; // Listeyi temizle
            data.files.forEach(file => {
                const li = document.createElement("li");
                li.textContent = file.replace('.mp3', ''); // Dosya adından .mp3 uzantısını kaldır
                li.addEventListener("click", () => playSong(file)); // Tıklanabilir yap
                songsList.appendChild(li);
            });
        })
        .catch(err => {
            console.error('Şarkılar yüklenemedi:', err);
            songsList.innerHTML = `<li>Şarkılar yüklenemedi.</li>`;
        });
}

// Şarkıyı çal
function playSong(file) {
    const audioPlayer = document.getElementById("audio-player");
    audioPlayer.src = `music/${file}`; // Şarkının dosya yolunu belirle
    audioPlayer.play();

    const playButton = document.getElementById("play-btn");
    playButton.innerHTML = '<i class="fas fa-pause"></i>'; // Oynatma butonunu değiştir
}

// Sayfa yüklendiğinde şarkıları yükle
window.addEventListener("DOMContentLoaded", loadSongs);
