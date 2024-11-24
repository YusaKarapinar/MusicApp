import { fetchYouTubeResults } from './api.js';
import { displayYouTubeResults } from './ui.js';

// Arama kutusu ve düğmesini seç
const searchBox = document.getElementById('search-box');
const searchButton = document.getElementById('search-btn');

// Arama butonuna tıklama olayını dinle
searchButton.addEventListener('click', () => {
    const query = searchBox.value.trim();
    if (query) {
        fetchYouTubeResults(query)
            .then(data => displayYouTubeResults(data.items))
            .catch(error => {
                document.getElementById('results-container').innerHTML = `<p>${error.message}</p>`;
            });
    }
});
