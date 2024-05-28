const BASE_URL = "https://steam-api-dot-cs-platform-306304.et.r.appspot.com"

async function getAllGames() {
    try {
        const url = `${BASE_URL}/games?limit=30`;
        const res = await fetch(url);
        const data = await res.json();
        console.log("data:", data);
        return data;
    } catch (error) {
        console.log("error:", error);
    }
}
// getAllGames();
async function loadAllGames() {
    let loading = document.querySelector(".fui-loading-spinner-2");
    try {
        const data = await getAllGames();
        let cover = document.querySelector(".container-game");
        cover.innerHTML = "";
        data.data.forEach(game => {
            let Element = document.createElement("a");
            Element.classList.add("cover");
            let img = document.createElement("img");
            img.src = game.header_image;
            img.classList.add("img")
            let gameName = document.createElement("div");
            gameName.classList.add("game-name");
            let p = document.createElement("p");
            p.textContent = game.name;
            gameName.appendChild(p);
            Element.appendChild(img);
            Element.appendChild(gameName);
            Element.onclick = function () {

            };
            cover.appendChild(Element);
            loading.style.display = "none";
        })
    } catch (error) {
        console.log("error:", error);
    };
};
setTimeout(loadAllGames, 1000);

// get Games base on category
async function getGamesByGenres() {
    try {
        const url = `${BASE_URL}/genres?limit=30`;
        const res = await fetch(url);
        const data = await res.json();
        console.log("data:", data);
        return data;
    } catch (error) {
        console.log("error:", error)
    };

};
let btn = document.querySelectorAll(".btn");
async function gameByGenres(genres) {
    try {
        const data = await getAllGames();
        let cover = document.querySelector(".container-game");
        cover.innerHTML = "";

        data.data.forEach((game) => {
            if (game.genres.includes(genres)) {
                let Element = document.createElement("a");
                Element.classList.add("cover");
                let img = document.createElement("img");
                img.src = game.header_image;
                img.classList.add("img")
                let gameName = document.createElement("div");
                gameName.classList.add("game-name");
                let p = document.createElement("p");
                p.textContent = game.name;
                gameName.appendChild(p);
                Element.appendChild(img);
                Element.appendChild(gameName);
                Element.onclick = function () {
                    console.log(game.appid);
                };
                cover.appendChild(Element);

            }
        }
        )
    }
    catch (error) {
        console.log("error:", error);
    }
};

btn.forEach(button => {
    button.addEventListener("click", (e) => {
        genres = e.target.textContent.toLowerCase();
        gameByGenres(genres);
    });
});


// search function

const typeGame = async () => {
    const search = document.querySelector("#search-bar");
    try {
        let queryString = "";
        if (search.value) {
            queryString += `&steamspy_tags = ${search.value.toLowerCase()}`;
            return queryString;
            console.log(queryString);
        };

        const url = `${BASE_URL}/games?limit=30${queryString}`;

        const res = await fetch(url);
        const data = await res.json();
        console.log("data:", data);
        return data;

    } catch (err) {
        console.log("error:", err.message);
    }
}
typeGame()
const loadGameTyped = async () => {
    let loading = document.querySelector(".fui-loading-spinner-2");
    try {
        const data = await typeGame();

        let cover = document.querySelector(".container-game");
        cover.innerHTML = "";
        data.data.forEach(game => {
            let Element = document.createElement("a");
            Element.classList.add("cover");
            let img = document.createElement("img");
            img.src = game.header_image;
            img.classList.add("img")
            let gameName = document.createElement("div");
            gameName.classList.add("game-name");
            let p = document.createElement("p");
            p.textContent = game.name;
            gameName.appendChild(p);
            Element.appendChild(img);
            Element.appendChild(gameName);
            Element.onclick = function () {

            };
            cover.appendChild(Element);
            loading.style.display = "none";
        });
    } catch (err) {
        console.log("error:", err.message);
    }

};


search.addEventListener("input", loadGameTyped);