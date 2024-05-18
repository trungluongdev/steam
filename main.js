const BASE_URL = "https://steam-api-dot-cs-platform-306304.et.r.appspot.com"

async function getAllGames() {
    try {
        const url = `${BASE_URL}/games?limit=30`;
        const res = await fetch(url);
        const data = await res.json();
        console.log("data:", data);
        return data;
    } catch (error) {
        console.log("error:", error)
    }
    
}
// getAllGames();
async function loadAllGames() {
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
        cover.appendChild(Element);
    }) 
    } catch(error) {
        console.log("error:", error);
    };
};
loadAllGames();

// get Games base on category
async function getGamesByGenres() {
    try {
        const url = `${BASE_URL}/genres`;
        const res = await fetch(url);
        const data = await res.json();
        console.log("data:", data);
        return data;
    } catch (error) {
        console.log("error:", error)
    }
    
}

let btn = document.querySelector(".btn");
async function gameByCategory() {
    try {
        const data = await getGamesByGenres();
        let cover = document.querySelector(".container-game");
        cover.innerHTML = "";
        if (data.data.name == btn.textContent){
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
        cover.appendChild(Element);
        })};
    } catch (error) {
        console.log("error:", error);
    }
};
btn.addEventListener("click", gameByCategory)