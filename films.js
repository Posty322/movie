document.addEventListener("DOMContentLoaded", function() {
    const buttons = document.querySelectorAll(".film-container");
  
    buttons.forEach(function(button) {
      button.addEventListener("click", function() {
        const id = button.getAttribute("data-href");
  
        // Завантажуємо CSV файл
        fetch("https://raw.githubusercontent.com/Posty322/movie/main/filminfo.csv")
          .then(response => response.text())
          .then(data => {
            // Розділяємо CSV рядки
            const lines = data.split("\n");
  
            // Шукаємо дані для заданого id
            let movieData;
            for (const line of lines) {
              const fields = line.split(",");
              if (fields[0] === id) {
                movieData = fields;
                break;
              }
            }
  
            if (movieData) {
              // Відображаємо дані на сторінці filmpage.html
              const h1 = document.createElement("h1");
              h1.textContent = `${movieData[1]} (${id})`;
  
              const genre = document.createElement("p");
              genre.innerHTML = `<span class="large-text">Жанр:</span> <span class="medium-text">${movieData[2]}</span>`;
  
              const country = document.createElement("p");
              country.innerHTML = `<span class="large-text">Країна:</span> <span class="medium-text">${movieData[3]}</span>`;
  
              // Додавайте інші дані за потребою
  
              // Очищаємо контент сторінки filmpage.html
              const filmpage = document.getElementById("filmpage");
              filmpage.innerHTML = "";
  
              // Додаємо створені елементи на сторінку
              filmpage.appendChild(h1);
              filmpage.appendChild(genre);
              filmpage.appendChild(country);
            } else {
              alert("Фільм не знайдено!");
            }
          })
          .catch(error => {
            console.error("Помилка під час завантаження файлу:", error);
          });
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

// Масив об'єктів з файлами та контейнерами
const rawGitHubUrl = 'https://raw.githubusercontent.com/Posty322/movie/main/film.csv';
readCSV(rawGitHubUrl, 'films-container');
