document.addEventListener('DOMContentLoaded', function() {
    // Отримання filmid з URL
    const urlParams = new URLSearchParams(window.location.search);
    const filmId = urlParams.get('filmid'); 

    fetch('path_to_your_filminfo.csv')
        .then(response => response.text())
        .then(csvText => {
            const filmData = parseCSV(csvText, filmId);
            if (filmData) {
                displayFilmData(filmData);
            } else {
                console.error('Фільм не знайдено.');
            }
        })
        .catch(error => console.error('Помилка при завантаженні файлу:', error));
});

function parseCSV(csvText, filmId) {
    const lines = csvText.split('\n');
    for (let line of lines) {
        const data = line.split(',');
        if (data[0].trim() === filmId) {
            return {
                id: data[0].trim(),
                title: data[1].trim(),
                country: data[3].trim(),
                production: data[4].trim(),
                scriptwriter: data[5].trim(),
                // інші поля...
            };
        }
    }
    return null;
}

function displayFilmData(filmData) {
    document.querySelector('.film-info h1').textContent = filmData.title;

    // Заповнюємо відповідні span елементи
    const genreSpan = document.querySelector('.film-info p span.medium-text:nth-child(2)');
    const countrySpan = document.querySelector('.film-info p span.medium-text:nth-child(4)');
    const productionSpan = document.querySelector('.film-info p span.medium-text:nth-child(6)');
    const scriptwriterSpan = document.querySelector('.film-info p span.medium-text:nth-child(8)');
    
    if (genreSpan) genreSpan.textContent = filmData.genre;
    if (countrySpan) countrySpan.textContent = filmData.country;
    if (productionSpan) productionSpan.textContent = filmData.production;
    if (scriptwriterSpan) scriptwriterSpan.textContent = filmData.scriptwriter;
    // Встановлення інших полів...
}

