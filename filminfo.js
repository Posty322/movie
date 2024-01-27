import WebTorrent from 'webtorrent'

// Потім ви можете використовувати WebTorrent в вашому JavaScript коді





document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");

    fetch("https://raw.githubusercontent.com/Posty322/movie/main/filminfo.csv")
        .then(response => response.text())
        .then(data => {
            const lines = data.split("\n");
            let movieData;

            for (const line of lines) {
                const fields = line.split(",");
                if (fields[0] === id) {
                    movieData = fields;
                    break;
                }
            }

            if (movieData) {
                document.getElementById("movieTitle").textContent = `${movieData[1]}`;
                document.getElementById("genre").textContent = `${movieData[2]}`;
                document.getElementById("country").textContent = `${movieData[3]}`;
                document.getElementById("company").textContent = `${movieData[4]}`;
                document.getElementById("author").textContent = `${movieData[5]}`;
                // Додайте інші поля за потребою
            } else {
                alert("Фільм не знайдено!");
            }
        })
        .catch(error => {
            console.error("Помилка під час завантаження файлу:", error);
        });
});


