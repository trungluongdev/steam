const BASE_URL = "https://steam-api-dot-cs-platform-306304.et.r.appspot.com";

// Fetch all game data from API
let q = "";
async function getAllGames(query) {
    try {
        let url = `${BASE_URL}/games?limit=30`;
        if (query) {
            url += `&genres=${query}`;
        }
        if (q) {
            url += `&q=${q}`
        }
        const res = await fetch(url);
        const data = await res.json();
        return data;
    } catch (error) {
        console.log("error:", error);
    }
}
// End function----

// render game element
function renderGameElement(game) {
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
    return Element;
};
// End function

// load all game on UI
async function loadAllGames() {
    try {
        const data = await getAllGames();
        let cover = document.querySelector(".container-game");
        cover.innerHTML = "";
        data.data.forEach(game => {
            const gameElement = renderGameElement(game);
            cover.appendChild(gameElement);
        })

    } catch (error) {
        console.log("error:", error);
    };
};
// End function----

// ----fetch genres of game from API
async function getGenresList() {
    try {
        let url = `${BASE_URL}/genres?`;
        const res = await fetch(url);
        const data = await res.json();
        return data;
    } catch (error) {
        console.log("error:", error);
    }
};
// End function----

// Load genres of game on UI
// CapitalizeFirstLetter function
function capitalizeFirstLetter(string) {
    if (typeof string !== "string") {
        console.log("Invalid input for capitalization:", string);
        return "";
    }
    return string.charAt(0).toUpperCase() + string.slice(1);
}

async function loadGenresList() {
    try {
        const data = await getGenresList();
        let typeList = document.querySelector(".type-list");
        data.data.forEach(game => {
            let li = document.createElement("li");
            let button = document.createElement("button");
            button.classList.add("btn");
            button.textContent = capitalizeFirstLetter(game.name);
            li.appendChild(button);
            typeList.appendChild(li);
        })

    } catch (error) {
        console.log("error: ", error);
    }
}
// End function----

let loading = document.querySelector(".fui-loading-spinner-2");


// call function to load genres and all game on UI
setTimeout(loadGenresList, 1000);
setTimeout(loadAllGames, 700);
// End function



// get Games base on category

async function gameByGenres(genres) {
    try {
        const data = await getAllGames(genres);
        console.log(data);
        let cover = document.querySelector(".container-game");
        cover.innerHTML = "";
        data.data.forEach(game => {
            gameElement = renderGameElement(game);
            cover.appendChild(gameElement);
        })
    }
    catch (error) {
        console.log("error:", error);
    }
};
// End function


// call function to load game base on category
let btn = document.querySelectorAll(".btn");
btn.forEach(button => {
    button.addEventListener("click", (e) => {
        const genres = e.target.textContent.toLowerCase();
        console.log(genres);
        let cover = document.querySelector(".container-game");
        // setTimeout(() => gameByGenres(genres), 500);
        gameByGenres(genres);
    });
});
// End function

// search game function
async function searchGame() {
    q = search.value;
    const data = await getAllGames();
    let cover = document.querySelector(".container-game");
    cover.innerHTML = "";
    data.data.forEach(game => {
        const gameElement = renderGameElement(game);
        cover.appendChild(gameElement);
    })
}
// call function when users search game
const search = document.querySelector("#search-bar");
search.addEventListener("input", () => setTimeout(searchGame, 1000));
// End function