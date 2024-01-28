function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

function readCSV(containerId) {
  const vod = getQueryParam('vod');
  let csvUrl;

  switch(vod) {
      case 'films':
          csvUrl = 'https://raw.githubusercontent.com/Posty322/movie/main/film.csv';
          break;
      case 'serials':
          csvUrl = 'https://example.com/path/to/your/second/csv/file.csv';
          break;
      // можна додати більше випадків тут
      default:
          csvUrl = 'https://raw.githubusercontent.com/Posty322/movie/main/film.csv';
  }

  fetch(csvUrl)
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
          filmContainer.setAttribute('data-href', `filmpage.html?id=id${filmid.trim()}`);
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

// ...

// Викликайте readCSV без параметра URL
readCSV('films-container');
