const apiKey = 'AIzaSyAwNoiHd6suxE_EOwCadE-G9DK_9N5cCw8'; // YouTube API Anahtarınızı buraya ekleyin

// YouTube'dan video sonuçlarını getir
export function fetchYouTubeResults(query) {
    const apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&key=${apiKey}&type=video&maxResults=10`;
    return fetch(apiUrl)
        .then(response => response.json());
}

// Videoyu MP3 olarak indirme isteği gönder
export function downloadMP3(videoId) {
    return fetch('/api/download.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ videoId })
    })
        .then(response => response.json());
}
