document.addEventListener('DOMContentLoaded', function() {
    var filmContainers = document.querySelectorAll('.film-container');

    filmContainers.forEach(function(container) {
        container.addEventListener('click', function() {
            var url = this.getAttribute('data-href');
            window.location.href = url; // Перехід на вказану сторінку
        });
    });
});




function readCSV(url, containerId) {
    // Use a CORS proxy
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const targetUrl = url;

    fetch(proxyUrl + targetUrl)
        .then(response => response.text())
        .then(csvText => {
            createFilmContainers(csvText, containerId);
        })
        .catch(error => console.error('Error fetching the file:', error));
}

function createFilmContainers(csvText, containerId) {
    const films = csvText.split('\n');
    films.forEach(film => {
        const [imgLink, name] = film.split(',');
        if (imgLink && name) {
            const filmContainer = document.createElement('div');
            filmContainer.className = 'film-container';
            filmContainer.innerHTML = `
                <img src="${imgLink.trim()}" alt="${name.trim()}">
                <p>${name.trim()}</p>
            `;
            document.getElementById(containerId).appendChild(filmContainer);
        }
    });
}

// Масив об'єктів з файлами та контейнерами
const filesToLoad = [
    { url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRjZ7KrdfdJRSyFn80VrMS4su4n7k80s5kjx1A0hbEKL7pDQzUID2OQiWbrXmxTtfikHFr43v3lKFFj/pub?output=csv', containerId: 'films-container' },
   // { url: 'https://drive.google.com/uc?id=YOUR_CARTOON_FILE_ID', containerId: 'cartoons-container' }
];

filesToLoad.forEach(fileInfo => readCSV(fileInfo));
