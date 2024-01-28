document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("vod");

    if (id == films){
      const cvsfile = "https://raw.githubusercontent.com/Posty322/movie/main/filminfo.csv"
    }
    if (id == serials){
        const cvsfile = "2"
      }
    fetch(cvsfile)
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