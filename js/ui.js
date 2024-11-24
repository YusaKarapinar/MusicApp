import { downloadMP3 } from './api.js';

export function displayYouTubeResults(videos) {
    const resultsContainer = document.getElementById('results-container');
    resultsContainer.innerHTML = ''; // Önceki sonuçları temizle

    videos.forEach(video => {
        const videoElement = document.createElement('div');
        videoElement.classList.add('video-result');
        videoElement.innerHTML = `
            <h3>${video.snippet.title}</h3>
            <a href="https://www.youtube.com/watch?v=${video.id.videoId}" target="_blank">
                <img src="${video.snippet.thumbnails.default.url}" alt="${video.snippet.title}">
            </a>
            <button class="download-btn" data-video-id="${video.id.videoId}">MP3 İndir</button>
        `;
        resultsContainer.appendChild(videoElement);
    });

    document.querySelectorAll('.download-btn').forEach(button => {
        button.addEventListener('click', () => {
            const videoId = button.getAttribute('data-video-id');
            downloadMP3(videoId)
                .then(data => alert(data.message || 'Dosya indirildi!'))
                .catch(error => alert('Bir hata oluştu!'));
        });
    });
}
