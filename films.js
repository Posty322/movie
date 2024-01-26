document.addEventListener('DOMContentLoaded', function() {
    var filmContainers = document.querySelectorAll('.film-container');

    filmContainers.forEach(function(container) {
        container.addEventListener('click', function() {
            var filmId = this.getAttribute('filmid');
            var url = this.getAttribute('data-href') + '?filmid=' + filmId;
            window.location.href = url; // Перехід на вказану сторінку з filmid
        });
    });
});




function readCSV(url, containerId) {
    fetch(url)
        .then(response => response.text())
        .then(csvText => {
            createFilmContainers(csvText, containerId);
        })
        .catch(error => console.error('Помилка при завантаженні файлу:', error));
}

function createFilmContainers(csvText, containerId) {
    const films = csvText.split('\n');
    films.forEach(film => {
        const [imgLink, name, filmid] = film.split(',');
        if (imgLink && name && filmid) {
            const filmContainer = document.createElement('button');
            filmContainer.className = 'film-container';
            filmContainer.setAttribute('data-href', 'filmpage.html');
            filmContainer.setAttribute('filmid', filmid.trim());
            filmContainer.innerHTML = `
                <img src="${imgLink.trim()}" alt="${name.trim()}">
                <p>${name.trim()}</p>
            `;

            // Додавання обробника подій тут
            filmContainer.addEventListener('click', function() {
                window.location.href = this.getAttribute('data-href');
            });

            document.getElementById(containerId).appendChild(filmContainer);
        }
    });
}

// Масив об'єктів з файлами та контейнерами
const rawGitHubUrl = 'https://raw.githubusercontent.com/Posty322/movie/main/film.csv';
readCSV(rawGitHubUrl, 'films-container');
